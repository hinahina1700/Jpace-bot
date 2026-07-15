// ==========================================
// 🎨 wplace標準カラーパレット (画像から抽出、2026/06/23時点 ver.001)
// key: 内部識別子（そのままロール検索やautocompleteのvalueに使う）
// ==========================================
const WPLACE_COLORS = [
  { key: 'black', name: 'black', hex: '000000' },
  { key: 'dark_gray', name: 'dark gray', hex: '3C3C3C' },
  { key: 'gray', name: 'gray', hex: '787878' },
  { key: 'light_gray', name: 'light gray', hex: 'D2D2D2' },
  { key: 'white', name: 'white', hex: 'FFFFFF' },
  { key: 'deep_red', name: 'deep red', hex: '600018' },
  { key: 'red', name: 'red', hex: 'ED1C24' },
  { key: 'orange', name: 'orange', hex: 'FF7F27' },
  { key: 'gold', name: 'gold', hex: 'F6AA09' },
  { key: 'yellow', name: 'yellow', hex: 'F9DD3B' },
  { key: 'light_yellow', name: 'light yellow', hex: 'FFFABC' },
  { key: 'dark_green', name: 'dark green', hex: '0EB968' },
  { key: 'green', name: 'green', hex: '13E67B' },
  { key: 'light_green', name: 'light green', hex: '87FF5E' },
  { key: 'dark_teal', name: 'dark teal', hex: '0C816E' },
  { key: 'teal', name: 'teal', hex: '10AEA6' },
  { key: 'light_teal', name: 'light teal', hex: '13E1BE' },
  { key: 'dark_blue', name: 'dark blue', hex: '28509E' },
  { key: 'blue', name: 'blue', hex: '4093E4' },
  { key: 'cyan', name: 'cyan', hex: '60F7F2' },
  { key: 'indigo', name: 'indigo', hex: '6B50F6' },
  { key: 'light_indigo', name: 'light indigo', hex: '99B1FB' },
  { key: 'dark_purple', name: 'dark purple', hex: '780C99' },
  { key: 'purple', name: 'purple', hex: 'AA38B9' },
  { key: 'light_purple', name: 'light purple', hex: 'E09FF9' },
  { key: 'dark_pink', name: 'dark pink', hex: 'CB007A' },
  { key: 'pink', name: 'pink', hex: 'EC1F80' },
  { key: 'light_pink', name: 'light pink', hex: 'F38DA9' },
  { key: 'dark_brown', name: 'dark brown', hex: '684634' },
  { key: 'brown', name: 'brown', hex: '95682A' },
  { key: 'beige', name: 'beige', hex: 'F8B277' },
  { key: 'medium_gray', name: 'medium gray', hex: 'AAAAAA' },
  { key: 'dark_red', name: 'dark red', hex: 'A50E1E' },
  { key: 'light_red', name: 'light red', hex: 'FA8072' },
  { key: 'dark_orange', name: 'dark orange', hex: 'E45C1A' },
  { key: 'dark_goldenrod', name: 'dark goldenrod', hex: '9C8431' },
  { key: 'goldenrod', name: 'goldenrod', hex: 'C5AD31' },
  { key: 'light_goldenrod', name: 'light goldenrod', hex: 'E8D45F' },
  { key: 'dark_olive', name: 'dark olive', hex: '4A6B3A' },
  { key: 'olive', name: 'olive', hex: '5A944A' },
  { key: 'light_olive', name: 'light olive', hex: '84C573' },
  { key: 'dark_cyan', name: 'dark cyan', hex: '0F799F' },
  { key: 'light_cyan', name: 'light cyan', hex: 'BBFAF2' },
  { key: 'dark_indigo', name: 'dark indigo', hex: '4D31B8' },
  { key: 'dark_slate_blue', name: 'dark slate blue', hex: '4A4284' },
  { key: 'slate_blue', name: 'slate blue', hex: '7A71C4' },
  { key: 'light_slate_blue', name: 'light slate blue', hex: 'B5AEF1' },
  { key: 'dark_peach', name: 'dark peach', hex: '9B5249' },
  { key: 'peach', name: 'peach', hex: 'D18078' },
  { key: 'light_peach', name: 'light peach', hex: 'FAB6A4' },
  { key: 'dark_tan', name: 'dark tan', hex: '7B6352' },
  { key: 'tan', name: 'tan', hex: '9C846B' },
  { key: 'light_tan', name: 'light tan', hex: 'D6B594' },
  { key: 'dark_beige', name: 'dark beige', hex: 'D18051' },
  { key: 'light_beige', name: 'light beige', hex: 'FFC5A5' },
  { key: 'dark_stone', name: 'dark stone', hex: '6D643F' },
  { key: 'stone', name: 'stone', hex: '948C6B' },
  { key: 'light_stone', name: 'light stone', hex: 'CDC59E' },
  { key: 'dark_slate', name: 'dark slate', hex: '333941' },
  { key: 'slate', name: 'slate', hex: '6D758D' },
  { key: 'light_slate', name: 'light slate', hex: 'B3B9D1' },
];

// パネル表示用：画像と同じ「横の並び順(行)」を再現するためのグループ定義
const WPLACE_COLOR_ROWS = [
  ['black', 'dark_gray', 'gray', 'light_gray', 'white', 'deep_red', 'red', 'orange'],
  ['gold', 'yellow', 'light_yellow', 'dark_green', 'green', 'light_green', 'dark_teal', 'teal'],
  ['light_teal', 'dark_blue', 'blue', 'cyan', 'indigo', 'light_indigo', 'dark_purple', 'purple'],
  ['light_purple', 'dark_pink', 'pink', 'light_pink', 'dark_brown', 'brown', 'beige'],
  ['medium_gray', 'dark_red', 'light_red', 'dark_orange', 'dark_goldenrod', 'goldenrod', 'light_goldenrod', 'dark_olive'],
  ['olive', 'light_olive', 'dark_cyan', 'light_cyan', 'dark_indigo', 'dark_slate_blue', 'slate_blue'],
  ['light_slate_blue', 'dark_peach', 'peach', 'light_peach', 'dark_tan', 'tan', 'light_tan'],
  ['dark_beige', 'light_beige', 'dark_stone', 'stone', 'light_stone', 'dark_slate', 'slate', 'light_slate'],
];

// パネル表示用に近い色の四角い絵文字を選ぶ（簡易的な視覚表現）
const SWATCH_EMOJIS = [
  { emoji: '⬛', rgb: [0, 0, 0] },
  { emoji: '⬜', rgb: [255, 255, 255] },
  { emoji: '🟥', rgb: [237, 28, 36] },
  { emoji: '🟧', rgb: [255, 127, 39] },
  { emoji: '🟨', rgb: [249, 221, 59] },
  { emoji: '🟩', rgb: [19, 230, 123] },
  { emoji: '🟦', rgb: [64, 147, 228] },
  { emoji: '🟪', rgb: [170, 56, 185] },
  { emoji: '🟫', rgb: [149, 104, 42] },
];

function hexToRgb(hex) {
  const int = parseInt(hex, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function nearestSwatchEmoji(hex) {
  const [r, g, b] = hexToRgb(hex);
  let best = SWATCH_EMOJIS[0];
  let bestDist = Infinity;
  for (const s of SWATCH_EMOJIS) {
    const d = (r - s.rgb[0]) ** 2 + (g - s.rgb[1]) ** 2 + (b - s.rgb[2]) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best.emoji;
}

// ==========================================
// 🔧 Discord REST API 呼び出し用ヘルパー
// ==========================================
async function discordApi(env, endpoint, options = {}) {
  const res = await fetch(`https://discord.com/api/v10${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  return res;
}

// ==========================================
// 📋 コマンドの「名前」「説明(description)」「処理」をセットで定義
// ==========================================
const COMMANDS_LIST = [
  // --- システム・基本ツール系 ---
  {
    name: 'ping',
    description: 'Botの応答速度を確認します。',
    execute: (options, user, interaction) => {
      // interactionのsnowflake IDから作成時刻を逆算し、Discord→Bot間の応答遅延を算出
      const createdMs = Number((BigInt(interaction.id) >> 22n) + 1420070400000n);
      const latencyMs = Date.now() - createdMs;
      return { content: `🏓 Pong！\n⏱️ 応答速度: \`${latencyMs}ms\`` };
    }
  },
  {
    name: 'help',
    description: '利用可能なコマンドの一覧を表示します。',
    execute: () => ({ content: '📚 **Botコマンドヘルプ**\n以下のコマンドが利用可能です！\n`/now`, `/avatar`, `/server_info`, `/user_info`, `/add_role`, `/color_panel`, `/role_directory`, `/color_match`, `/ping` を試してみてね！' })
  },
  
  // --- 【新設】現在の状況を表示するコマンド ---
  {
    name: 'now',
    description: '指定した座標(省略時はデフォルト座標)のwplaceタイル画像を表示します。',
    options: [
      { type: 4, name: 'x', description: 'タイルX座標（省略時: 1879 / 0〜2047）', required: false },
      { type: 4, name: 'y', description: 'タイルY座標（省略時: 785）', required: false },
    ],
    // 外部APIからの画像取得に3秒以上かかることがあるため、
    // Discordの応答タイムアウト(3秒)を回避するために deferred 応答を使う
    deferred: true,
    execute: async (options) => {
      const tileX = options?.find(o => o.name === 'x')?.value ?? 1879;
      const tileY = options?.find(o => o.name === 'y')?.value ?? 785;
      const targetUrl = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;

      try {
        const imageRes = await fetch(targetUrl);
        if (!imageRes.ok) {
          // ステータスコードを表示することで「座標が存在しない(404等)」ことが分かるようにする
          return {
            content:
              `❌ タイル画像の取得に失敗しました (HTTP ${imageRes.status})\n` +
              `座標: (${tileX}, ${tileY})\n` +
              `URL: ${targetUrl}\n` +
              `座標が範囲外か、まだ何も描かれていないタイルの可能性があります。\n` +
              `\`/now x:<X> y:<Y>\` で自分の知っている座標を指定してみてください。`,
          };
        }
        const imageBuffer = await imageRes.arrayBuffer();

        return {
          content: `🖼 **wplaceタイル（座標: ${tileX}, ${tileY}）**`,
          file: {
            buffer: imageBuffer,
            name: `tile_${tileX}_${tileY}.png`,
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
  },

  // --- 【新設】カラーロール系 ---
  {
    name: 'add_role',
    description: 'wplace標準カラーから色を選んで、自分だけのカラーロールを作成・付与します。',
    options: [
      {
        type: 3, // STRING
        name: 'color',
        description: 'wplaceカラーを選択（入力すると候補が絞り込まれます）',
        required: true,
        autocomplete: true,
      },
      {
        type: 3, // STRING
        name: 'name',
        description: 'ロールの名前を入力',
        required: true,
      },
    ],
    // ロール一覧取得→作成→付与と複数回のAPI通信が必要なため、3秒制限を避けてdeferする
    deferred: true,
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) return { content: '❌ このコマンドはサーバー内でのみ使用できます。' };

      const colorKey = options?.find(o => o.name === 'color')?.value;
      const roleName = options?.find(o => o.name === 'name')?.value?.trim();
      const colorInfo = WPLACE_COLORS.find(c => c.key === colorKey);

      if (!colorInfo) {
        return { content: '❌ 無効なカラーです。候補一覧から選択し直してください。' };
      }
      if (!roleName || roleName.length > 100) {
        return { content: '❌ ロール名は1〜100文字で入力してください。' };
      }

      const colorInt = parseInt(colorInfo.hex, 16);

      // 既存の同名・同色ロールがあれば使い回し、なければ新規作成
      const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
      if (!rolesRes.ok) {
        return { content: '❌ ロール一覧の取得に失敗しました。Botに「ロールの管理」権限があるか確認してください。' };
      }
      const guildRoles = await rolesRes.json();
      let role = guildRoles.find(r => r.name === roleName && r.color === colorInt);

      if (!role) {
        const createRes = await discordApi(env, `/guilds/${guildId}/roles`, {
          method: 'POST',
          body: JSON.stringify({ name: roleName, color: colorInt, mentionable: true }),
        });
        if (!createRes.ok) {
          const errText = await createRes.text();
          return { content: `❌ ロールの作成に失敗しました:\n\`${errText}\`\nBotの権限とロール階層をご確認ください。` };
        }
        role = await createRes.json();
      }

      const assignRes = await discordApi(env, `/guilds/${guildId}/members/${user.id}/roles/${role.id}`, {
        method: 'PUT',
      });
      if (!assignRes.ok) {
        const errText = await assignRes.text();
        return { content: `⚠️ ロール <@&${role.id}> は作成済みですが、付与に失敗しました:\n\`${errText}\`` };
      }

      const swatch = nearestSwatchEmoji(colorInfo.hex);
      return {
        content: `✅ ${swatch} <@&${role.id}> (**${colorInfo.name}** \`#${colorInfo.hex}\`) を作成し、付与しました！`,
      };
    },
  },
  {
    name: 'color_panel',
    description: 'wplace標準カラーパレットを、画像と同じ並び順のパネル形式で表示します。',
    execute: () => {
      // 画像の行(横並び)順そのままにフィールド化する
      const fields = WPLACE_COLOR_ROWS.map((rowKeys, i) => {
        const line = rowKeys
          .map(key => {
            const c = WPLACE_COLORS.find(cc => cc.key === key);
            return `${nearestSwatchEmoji(c.hex)}\`${c.hex}\``;
          })
          .join(' ');
        return { name: `Row ${i + 1}`, value: line, inline: false };
      });

      return {
        embeds: [{
          title: '🎨 カラーパネル（wplace標準色 / 画像と同じ並び順）',
          description: '各色の名前は `/add_role` の色選択候補（入力補完）から確認できます。',
          fields,
          color: 0x2b2d31,
          footer: { text: `全${WPLACE_COLORS.length}色 ・ /add_role で好きな色のロールを作成できます` },
        }],
      };
    },
  },
  {
    name: 'role_directory',
    description: 'サーバー内で実際に作成されているwplaceカラーロールの一覧（ディレクトリ）を表示します。',
    deferred: true,
    execute: async (options, currentUser, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) return { content: '❌ このコマンドはサーバー内でのみ使用できます。' };

      const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
      if (!rolesRes.ok) {
        return { content: '❌ ロール一覧の取得に失敗しました。Botの権限をご確認ください。' };
      }
      const guildRoles = await rolesRes.json();

      const matchedEntries = WPLACE_COLORS
        .map(c => {
          const role = guildRoles.find(r => r.color === parseInt(c.hex, 16));
          return role ? { color: c, role } : null;
        })
        .filter(Boolean);

      if (matchedEntries.length === 0) {
        return { content: '📋 まだwplaceカラーのロールはありません。`/add_role` で最初のロールを作ってみましょう！' };
      }

      const lines = matchedEntries.map(({ color, role }) =>
        `${nearestSwatchEmoji(color.hex)} \`#${color.hex}\` **${color.name}** → <@&${role.id}>`
      );

      const chunkSize = 20;
      const embeds = [];
      for (let i = 0; i < lines.length; i += chunkSize) {
        embeds.push({
          title: i === 0 ? `📋 ロールディレクトリ（${matchedEntries.length}件）` : undefined,
          description: lines.slice(i, i + chunkSize).join('\n'),
          color: 0x2b2d31,
        });
      }

      return { embeds };
    },
  },
  {
    name: 'color_match',
    description: '指定したHexカラーに最も近いwplace標準色を検索します（ドット絵の色選びに便利）。',
    options: [
      { type: 3, name: 'hex', description: 'カラーコードを入力（例: 1a2b3c）', required: true },
    ],
    execute: (options) => {
      const raw = options?.find(o => o.name === 'hex')?.value?.trim().replace(/^#/, '');
      if (!raw || !/^[0-9a-fA-F]{6}$/.test(raw)) {
        return { content: '❌ 6桁の16進数カラーコードを指定してください（例: `1a2b3c`）。' };
      }
      const input = raw.toUpperCase();
      const [r, g, b] = hexToRgb(input);

      let best = null;
      let bestDist = Infinity;
      for (const c of WPLACE_COLORS) {
        const [cr, cg, cb] = hexToRgb(c.hex);
        const d = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      }

      const swatch = nearestSwatchEmoji(best.hex);
      return {
        content:
          `🎨 入力カラー: \`#${input}\`\n` +
          `→ 最も近いwplaceカラー: ${swatch} **${best.name}** \`#${best.hex}\`\n` +
          `\`/add_role color:${best.name}\` で、このカラーのロールを作成できます。`,
      };
    },
  },
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
  const payload = {};
  if (replyResult.content) payload.content = replyResult.content;
  if (replyResult.embeds) payload.embeds = replyResult.embeds;

  if (replyResult.file) {
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify(payload));
    const blob = new Blob([replyResult.file.buffer], { type: replyResult.file.type });
    formData.append('files[0]', blob, replyResult.file.name);
    return { body: formData, headers: {} };
  }
  return {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 必須の環境変数(Secrets)が設定されているか確認
    // 未設定だと署名検証やAPI通信が必ず失敗し、「応答しませんでした」の原因になる
    const missingEnv = ['DISCORD_APPLICATION_ID', 'DISCORD_TOKEN', 'DISCORD_PUBLIC_KEY']
      .filter(key => !env[key]);
    if (missingEnv.length > 0) {
      const message = `❌ 環境変数(Secrets)が未設定です: ${missingEnv.join(', ')}\n` +
        `Cloudflareダッシュボード（Workers & Pages → 対象Worker → Settings → Variables and Secrets）か、` +
        `\`npx wrangler secret put ${missingEnv[0]}\` などで設定し、再デプロイしてください。`;
      return new Response(message, { status: 500 });
    }

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
    
    // オートコンプリート（/add_role の color 入力候補）
    if (interaction.type === 4) {
      const focusedOption =
        interaction.data.options?.find(o => o.focused) ||
        interaction.data.options?.[interaction.data.options.length - 1];
      const query = (focusedOption?.value ?? '').toString().toLowerCase();

      const filtered = WPLACE_COLORS.filter(
        c => c.name.toLowerCase().includes(query) || c.hex.toLowerCase().includes(query)
      ).slice(0, 25);

      const choices = filtered.map(c => ({ name: `${c.name} #${c.hex}`, value: c.key }));

      return new Response(
        JSON.stringify({ type: 8, data: { choices } }), // APPLICATION_COMMAND_AUTOCOMPLETE_RESULT
        { headers: { 'content-type': 'application/json' } }
      );
    }

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
            replyResult = await matchedCommand.execute(options, user, interaction, env);
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
        replyResult = await matchedCommand.execute(options, user, interaction, env);
      } catch (err) {
        replyResult = { content: `❌ エラーが発生しました: ${err.message}` };
      }

      if (replyResult.file) {
        const formData = new FormData();
        formData.append(
          'payload_json',
          JSON.stringify({ type: 4, data: { content: replyResult.content, embeds: replyResult.embeds } })
        );
        const blob = new Blob([replyResult.file.buffer], { type: replyResult.file.type });
        formData.append('files[0]', blob, replyResult.file.name);
        return new Response(formData);
      }

      return new Response(
        JSON.stringify({ type: 4, data: { content: replyResult.content, embeds: replyResult.embeds } }),
        { headers: { 'content-type': 'application/json' } }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
