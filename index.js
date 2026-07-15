// ==========================================
// 📋 コマンドの「名前」「説明(description)」「処理」をセットで定義
// ==========================================
const COMMANDS_LIST = [
  // --- システム・基本ツール系 ---
  {
    name: 'ping',
    description: 'Botが生きているか確認します。',
    execute: () => ({ content: '🏓 Pong! Botは正常に動作しています。' })
  },
  {
    name: 'help',
    description: '利用可能なコマンドの一覧を表示します。',
    execute: () => ({ content: '📚 **Botコマンドヘルプ**\n以下のコマンドが利用可能です！\n`/now`, `/avatar`, `/server_info`, `/user_info`, `/ping` を試してみてね！' })
  },
  
  // --- 【新設】現在の状況を表示するコマンド ---
  {
    name: 'now',
    description: '現在のキャンバスの状況を画像として生成し、表示します。',
    // 外部APIからの画像取得に3秒以上かかることがあるため、
    // Discordの応答タイムアウト(3秒)を回避するために deferred 応答を使う
    deferred: true,
    execute: async () => {
      // 注目の中心タイル(1879, 785)をダイレクトに取得して返します。
      const tileX = 1879;
      const tileY = 785;
      const targetUrl = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;
      
      try {
        const imageRes = await fetch(targetUrl);
        if (!imageRes.ok) throw new Error('タイルの取得に失敗しました');
        const imageBuffer = await imageRes.arrayBuffer();

        return {
          content: `🖼 **現在の状況（座標: ${tileX}, ${tileY} 付近）**`,
          file: {
            buffer: imageBuffer,
            name: 'current_status.png',
            type: 'image/png'
          }
        };
      } catch (err) {
        return { content: `❌ 画像の取得中にエラーが発生しました: ${err.message}` };
      }
    }
  },

  // --- 実用・解析系 ---
  {
    name: 'avatar',
    description: '指定したメンバー（または自分）のアイコン画像を大きく表示します。',
    options: [{ type: 6, name: 'user', description: 'アイコンを見たいメンバーを選択（空欄なら自分）', required: false }],
    execute: (options, user, interaction) => {
      const targetUser = interaction.data.resolved?.users?.[options?.[0]?.value] || user;

      let avatarUrl;
      if (targetUser.avatar) {
        // アニメーションアイコン(hashが"a_"で始まる)ならgif、それ以外はpng
        const ext = targetUser.avatar.startsWith('a_') ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${targetUser.id}/${targetUser.avatar}.${ext}?size=1024`;
      } else {
        // 独自アイコン未設定の場合はDiscordのデフォルトアイコンを使用
        const defaultIndex = targetUser.discriminator && targetUser.discriminator !== '0'
          ? Number(targetUser.discriminator) % 5
          : Number((BigInt(targetUser.id) >> 22n) % 6n);
        avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
      }

      return { content: `📸 **${targetUser.username}** のアイコン画像はこちら！\n${avatarUrl}` };
    }
  },
  {
    name: 'server_info',
    description: 'このDiscordサーバーのてんこ盛り詳細情報を解析して表示します。',
    execute: (options, currentUser, interaction) => {
      const guildId = interaction.guild_id || '不明';
      let dateCreated = '不明';
      if (guildId !== '不明') {
        const snowflakeBin = BigInt(guildId);
        const timestampUnix = Number((snowflakeBin >> 22n) + 1420070400000n);
        dateCreated = new Date(timestampUnix).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      }
      const channelId = interaction.channel_id || '不明';

      return {
        content: [
          '📊 **サーバー詳細解析**',
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `🆔 **サーバーID**\n\`${guildId}\``,
          `📅 **サーバー作成日**\n${dateCreated}`,
          `💬 **実行チャンネル名/ID**\n<#${channelId}> (ID: \`${channelId}\`)`,
          `📈 **サーバー規模**\nテキスト・ボイスチャンネル等、システム連携完了`,
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `*Requested by ${currentUser.username}*`
        ].join('\n')
      };
    }
  },
  {
    name: 'user_info',
    description: '指定したメンバー（または自分）のてんこ盛りな詳細解析データを表示します。',
    options: [{ type: 6, name: 'user', description: '解析したいメンバーを選択（空欄なら自分）', required: false }],
    execute: (options, currentUser, interaction) => {
      const targetId = options?.[0]?.value || currentUser.id;
      const targetUser = interaction.data.resolved?.users?.[targetId] || currentUser;
      const memberDetails = interaction.data.resolved?.members?.[targetId] || interaction.member;

      const snowflakeBin = BigInt(targetUser.id);
      const timestampUnix = Number((snowflakeBin >> 22n) + 1420070400000n);
      const dateCreated = new Date(timestampUnix).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

      let dateJoined = '不明';
      if (memberDetails?.joined_at) {
        dateJoined = new Date(memberDetails.joined_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      }

      const rolesCount = memberDetails?.roles?.length || 0;
      const permissionsBit = BigInt(memberDetails?.permissions || '0');
      
      const keyPerms = [];
      if ((permissionsBit & 0x00000008n) === 0x00000008n) keyPerms.push('管理者');
      if ((permissionsBit & 0x00000020n) === 0x00000020n) keyPerms.push('サーバー管理');
      if ((permissionsBit & 0x00002000n) === 0x00002000n) keyPerms.push('メッセージ管理');
      if ((permissionsBit & 0x00400000n) === 0x00400000n) keyPerms.push('メンバーミュート');
      if ((permissionsBit & 0x04000000n) === 0x04000000n) keyPerms.push('役職の管理');
      const permsDisplay = keyPerms.length > 0 ? keyPerms.join(', ') : '一般権限';

      const colorCode = targetUser.accent_color ? `#${targetUser.accent_color.toString(16).padStart(6, '0')}` : '#000000';

      return {
        content: [
          '🔍 **ユーザー詳細解析**',
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `👤 **ユーザー名**\n${targetUser.username}`,
          `🆔 **ユーザーID**\n\`${targetUser.id}\``,
          `🤖 **ボット**\n${targetUser.bot ? 'はい' : 'いいえ'}`,
          `📅 **アカウント作成日**\n${dateCreated}`,
          `📥 **サーバー参加日**\n${dateJoined}`,
          `🏅 **役職数**\n${rolesCount}個の役職を所持`,
          `🛡️ **主要権限**\n${permsDisplay}`,
          `🎨 **色コード**\n\`${colorCode}\``,
          `💎 **サーバーブースト**\n${memberDetails?.premium_since ? 'ブースト中⚡' : 'なし'}`,
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `*Requested by ${currentUser.username}*`
        ].join('\n')
      };
    }
  }
];

// ==========================================
// 🔒 署名検証システム
// ==========================================
async function verifyDiscordSignature(request, publicKey) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.clone().text();

  if (!signature || !timestamp) return false;

  try {
    const pubKeyBuf = new Uint8Array(publicKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const sigBuf = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const dataBuf = new TextEncoder().encode(timestamp + body);

    const cryptoKey = await crypto.subtle.importKey(
      'raw', pubKeyBuf, { name: 'NODE-ED25519', namedCurve: 'NODE-ED25519' },
      false, ['verify']
    );
    return await crypto.subtle.verify('NODE-ED25519', cryptoKey, sigBuf, dataBuf);
  } catch (e) {
    return false;
  }
}

// ==========================================
// ⚙️ メイン処理
// ==========================================
// FormDataかJSONかを自動判定してDiscordへ返信/編集する共通処理
function buildReplyBody(replyResult) {
  if (replyResult.file) {
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({ content: replyResult.content }));
    const blob = new Blob([replyResult.file.buffer], { type: replyResult.file.type });
    formData.append('files[0]', blob, replyResult.file.name);
    return { body: formData, headers: {} };
  }
  return {
    body: JSON.stringify({ content: replyResult.content }),
    headers: { 'Content-Type': 'application/json' },
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // コマンド登録用URL
    if (url.pathname === '/register') {
      const registerUrl = `https://discord.com/api/v10/applications/${env.DISCORD_APPLICATION_ID}/commands`;
      const cleanCommands = COMMANDS_LIST.map(({ name, description, options }) => ({ name, description, options }));
      
      const response = await fetch(registerUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bot ${env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanCommands),
      });

      if (response.ok) {
        return new Response('🎉 厳選された新コマンド構成がDiscordに登録されました！', { status: 200 });
      } else {
        const errorText = await response.text();
        return new Response(`❌ 登録エラー: ${errorText}`, { status: 400 });
      }
    }

    // 署名検証
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    const isValid = await verifyDiscordSignature(request, env.DISCORD_PUBLIC_KEY);
    if (!isValid) return new Response('Invalid request signature', { status: 401 });

    const interaction = await request.json();
    
    // PING (Discordからの死活監視用)
    if (interaction.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // コマンド実行
    if (interaction.type === 2) {
      const commandName = interaction.data.name;
      const options = interaction.data.options;
      const user = interaction.member?.user || interaction.user;

      const matchedCommand = COMMANDS_LIST.find(cmd => cmd.name === commandName);

      if (!matchedCommand || typeof matchedCommand.execute !== 'function') {
        return new Response(
          JSON.stringify({ type: 4, data: { content: "未実装のコマンドです。" } }),
          { headers: { 'content-type': 'application/json' } }
        );
      }

      // 外部通信などで3秒(Discordの応答期限)を超える可能性があるコマンドは、
      // 先に「考え中...」を返してから、後でWebhook経由で本来の返信に編集する
      if (matchedCommand.deferred) {
        ctx.waitUntil((async () => {
          let replyResult;
          try {
            replyResult = await matchedCommand.execute(options, user, interaction);
          } catch (err) {
            replyResult = { content: `❌ エラーが発生しました: ${err.message}` };
          }

          const followupUrl = `https://discord.com/api/v10/webhooks/${env.DISCORD_APPLICATION_ID}/${interaction.token}/messages/@original`;
          const { body, headers } = buildReplyBody(replyResult);
          await fetch(followupUrl, { method: 'PATCH', body, headers });
        })());

        return new Response(
          JSON.stringify({ type: 5 }), // DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
          { headers: { 'content-type': 'application/json' } }
        );
      }

      // 通常コマンド：すぐに実行して即レスポンス
      let replyResult;
      try {
        replyResult = await matchedCommand.execute(options, user, interaction);
      } catch (err) {
        replyResult = { content: `❌ エラーが発生しました: ${err.message}` };
      }

      if (replyResult.file) {
        const formData = new FormData();
        formData.append('payload_json', JSON.stringify({ type: 4, data: { content: replyResult.content } }));
        const blob = new Blob([replyResult.file.buffer], { type: replyResult.file.type });
        formData.append('files[0]', blob, replyResult.file.name);
        return new Response(formData);
      }

      return new Response(
        JSON.stringify({ type: 4, data: { content: replyResult.content } }),
        { headers: { 'content-type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
