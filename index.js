import { Jimp } from 'jimp';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 例として、/now というパスにアクセスがあったら画像を合成して返す
    if (url.pathname === '/now') {
      try {
        const WORLD_W = 3000;
        const WORLD_H = 4000;
        const TILE_SIZE = 1000;

        // 1. ベースとなる背景画像（3000x4000）を生成
        // #99B7FF は RGB(153, 183, 255) -> Jimpのカラーコード表記に変換
        const baseImage = new Jimp({
          width: WORLD_W,
          height: WORLD_H,
          color: 0x99B7FFFF // RGBA
        });

        // 2. すべてのタイル画像を非同期で並行ダウンロード
        const fetchPromises = [];

        for (let y = 0; y < 4; y++) {
          for (let x = 0; x < 3; x++) {
            const tileX = x + 1878;
            const tileY = y + 784;
            const tileUrl = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;

            // 各タイルをダウンロードしてベース画像に重ね合わせるタスク
            const p = fetch(tileUrl)
              .then(res => {
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
                return res.arrayBuffer();
              })
              .then(buffer => Jimp.read(Buffer.from(buffer)))
              .then(tileImage => {
                // 指定の位置にタイルを貼り付け
                baseImage.composite(tileImage, x * TILE_SIZE, y * TILE_SIZE);
              })
              .catch(err => {
                console.error(`タイルの取得・描画に失敗 (${tileX}, ${tileY}):`, err);
                // 1枚失敗しても全体を止めないよう、エラーをキャッチしてスルー
              });

            fetchPromises.push(p);
          }
        }

        // すべてのタイルの合成を待つ
        await Promise.all(fetchPromises);

        // 3. Discord送信用に軽量化（任意：容量を減らすために50%にリサイズ）
        // baseImage.resize({ w: 1500, h: 2000 });

        // PNG形式のバッファに変換
        const outputBuffer = await baseImage.getBuffer('image/png');

        // 4. 画像レスポンスを返却
        return new Response(outputBuffer, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'no-cache', // 常に最新を返したいのでキャッシュさせない
          },
        });

      } catch (error) {
        return new Response(`画像生成エラー: ${error.message}`, { status: 500 });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};
