import { PhotonImage } from 'photon-wasm';

const CHANNEL_ID = '1507371465744580739';

// ==========================================
// 🎨 wplace標準カラーパレット
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

function hexToRgb(hex) {
  const int = parseInt(hex, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createMergedImage() {
  const cropX = 922;
  const cropY = 364;
  const cropWidth = 3866 - 922;
  const cropHeight = 3904 - 364;

  const canvasBuffer = new Uint8Array(cropWidth * cropHeight * 4);
  for (let i = 0; i < canvasBuffer.length; i += 4) {
    canvasBuffer[i] = 138;     // R
    canvasBuffer[i + 1] = 172; // G
    canvasBuffer[i + 2] = 246; // B
    canvasBuffer[i + 3] = 255; // A
  }

  const canvas = new PhotonImage(canvasBuffer, cropWidth, cropHeight);

  const fetchPromises = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const tileX = 1877 + x;
      const tileY = 784 + y;
      const url = `https://backend.wplace.live/files/s0/tiles/${tileX}/${tileY}.png`;

      fetchPromises.push(
        fetch(url)
          .then(async (res) => {
            if (!res.ok) return null;
            const arrayBuffer = await res.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            const tileImg = PhotonImage.new_from_byteslice(bytes);
            return { tileImg, x, y };
          })
          .catch(() => null)
      );
    }
  }

  const results = await Promise.all(fetchPromises);
  for (const item of results) {
    if (item && item.tileImg) {
      const posX = item.x * 1000 - cropX;
      const posY = item.y * 1000 - cropY;
      canvas.blend(item.tileImg, posX, posY, 'over');
      item.tileImg.free();
    }
  }

  const outputBytes = canvas.get_bytes();
  canvas.free();
  return outputBytes.buffer;
}

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

const COMMANDS_LIST = [
  {
    name: 'ping',
    description: 'Botの応答速度を確認します。',
    execute: (options, user, interaction) => {
      const createdMs = Number((BigInt(interaction.id) >> 22n) + 1420070400000n);
      const latencyMs = Date.now() - createdMs;
      return { content: `🏓 Pong！\n⏱️ 応答速度: \`${latencyMs}ms\`` };
    }
  },
  {
    name: 'help',
    description: '利用可能なコマンドの一覧を表示します。',
    execute: () => ({ content: '📚 **Botコマンドヘルプ**\n`/now`, `/post_now`, `/avatar`, `/server_info`, `/user_info`, `/add_role`, `/setup_color_roles`, `/color_panel`, `/role_directory`, `/color_match`, `/ping` が利用可能です。' })
  },
  {
    name: 'now',
    description: '現在のjplaceの合成画像を取得します。',
    deferred: true,
    execute: async () => {
      try {
        const imageBuffer = await createMergedImage();
        return {
          content: '🖼 **現在のjplaceの画像です**',
          file: {
            buffer: imageBuffer,
            name: 'jplace.png',
            type: 'image/png'
          }
        };
      } catch (err) {
        return { content: `❌ 画像の取得・合成中にエラーが発生しました: ${err.message}` };
      }
    }
  },
  {
    name: 'post_now',
    description: '指定された専用チャンネルにjplace画像を送信します。',
    deferred: true,
    execute: async (options, user, interaction, env) => {
      try {
        const imageBuffer = await createMergedImage();
        const replyResult = {
          content: '🖼 **現在のjplaceの画像です**',
          file: {
            buffer: imageBuffer,
            name: 'jplace.png',
            type: 'image/png'
          }
        };

        const { body, headers } = buildReplyBody(replyResult);
        const postRes = await discordApi(env, `/channels/${CHANNEL_ID}/messages`, {
          method: 'POST',
          body,
          headers,
        });

        if (postRes.ok) {
          return { content: `✅ <#${CHANNEL_ID}> に画像を送信しました！` };
        } else {
          const errText = await postRes.text();
          return { content: `❌ チャンネルへの送信に失敗しました:\n\`${errText}\`` };
        }
      } catch (err) {
        return { content: `❌ エラーが発生しました: ${err.message}` };
      }
    }
  },
  {
    name: 'avatar',
    description: '指定したメンバーのアイコンを表示します。',
    options: [{ type: 6, name: 'user', description: 'メンバーを選択（空欄なら自分）', required: false }],
    execute: (options, user, interaction) => {
      const targetUser = interaction.data.resolved?.users?.[options?.[0]?.value] || user;
      let avatarUrl;
      if (targetUser.avatar) {
        const ext = targetUser.avatar.startsWith('a_') ? 'gif' : 'png';
        avatarUrl = `https://cdn.discordapp.com/avatars/${targetUser.id}/${targetUser.avatar}.${ext}?size=1024`;
      } else {
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
    description: 'このDiscordサーバーの詳細情報を表示します。',
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
          `💬 **実行チャンネル**\n<#${channelId}>`,
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `*Requested by ${currentUser.username}*`
        ].join('\n')
      };
    }
  },
  {
    name: 'user_info',
    description: '指定したメンバーの詳細情報を表示します。',
    options: [{ type: 6, name: 'user', description: 'メンバーを選択（空欄なら自分）', required: false }],
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

      return {
        content: [
          '🔍 **ユーザー詳細解析**',
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `👤 **ユーザー名**\n${targetUser.username}`,
          `🆔 **ユーザーID**\n\`${targetUser.id}\``,
          `📅 **アカウント作成日**\n${dateCreated}`,
          `📥 **サーバー参加日**\n${dateJoined}`,
          '━━━━━━━━━━━━━━━━━━━━━━━━',
          `*Requested by ${currentUser.username}*`
        ].join('\n')
      };
    }
  },
  {
    name: 'add_role',
    description: 'wplace標準カラーから色を選んで自分用のロールを作成・付与します。（未作成なら自動生成）',
    options: [
      {
        type: 3,
        name: 'color',
        description: 'wplaceカラーを選択',
        required: true,
        autocomplete: true,
      },
      {
        type: 3,
        name: 'name',
        description: 'ロールの名前（省略時は色名になります）',
        required: false,
      },
    ],
    deferred: true,
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) return { content: '❌ このコマンドはサーバー内でのみ使用できます。' };

      const colorKey = options?.find(o => o.name === 'color')?.value;
      const colorInfo = WPLACE_COLORS.find(c => c.key === colorKey);

      if (!colorInfo) {
        return { content: '❌ 無効なカラーです。候補一覧から選択し直してください。' };
      }

      const roleName = options?.find(o => o.name === 'name')?.value?.trim() || colorInfo.name;
      const colorInt = parseInt(colorInfo.hex, 16);

      const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
      if (!rolesRes.ok) {
        return { content: '❌ ロール一覧の取得に失敗しました。Botに「ロールの管理」権限があるか確認してください。' };
      }
      const guildRoles = await rolesRes.json();
      let role = guildRoles.find(r => r.color === colorInt);

      if (!role) {
        const createRes = await discordApi(env, `/guilds/${guildId}/roles`, {
          method: 'POST',
          body: JSON.stringify({ name: roleName, color: colorInt, mentionable: true }),
        });
        if (!createRes.ok) {
          const errText = await createRes.text();
          return { content: `❌ ロールの自動作成に失敗しました:\n\`${errText}\`` };
        }
        role = await createRes.json();
      }

      const assignRes = await discordApi(env, `/guilds/${guildId}/members/${user.id}/roles/${role.id}`, {
        method: 'PUT',
      });
      if (!assignRes.ok) {
        const errText = await assignRes.text();
        return { content: `⚠️ ロール <@&${role.id}> は用意されていますが、付与に失敗しました:\n\`${errText}\`` };
      }

      return {
        content: `✅ <@&${role.id}> (\`#${colorInfo.hex}\`) を付与しました！`,
      };
    },
  },
  {
    name: 'setup_color_roles',
    description: 'まだサーバーにないwplace標準カラーのロールを一括で自動生成します。',
    deferred: true,
    execute: async (options, currentUser, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) return { content: '❌ このコマンドはサーバー内でのみ使用できます。' };

      const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
      if (!rolesRes.ok) {
        return { content: '❌ ロール一覧の取得に失敗しました。' };
      }
      const guildRoles = await rolesRes.json();
      const existingColors = new Set(guildRoles.map(r => r.color));

      let createdCount = 0;
      for (const colorInfo of WPLACE_COLORS) {
        const colorInt = parseInt(colorInfo.hex, 16);
        if (!existingColors.has(colorInt)) {
          const createRes = await discordApi(env, `/guilds/${guildId}/roles`, {
            method: 'POST',
            body: JSON.stringify({ name: colorInfo.name, color: colorInt, mentionable: true }),
          });
          if (createRes.ok) {
            createdCount++;
            await sleep(50);
          }
        }
      }

      return {
        content: `🎉 設定完了！ 新たに **${createdCount}** 個のカラーロールを自動生成しました。`,
      };
    },
  },
  {
    name: 'color_panel',
    description: 'wplace標準カラーパレットを埋め込みコード形式で一覧表示します。',
    deferred: true,
    execute: async (options, currentUser, interaction, env) => {
      const guildId = interaction.guild_id;
      let guildRoles = [];
      if (guildId) {
        const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
        if (rolesRes.ok) {
          guildRoles = await rolesRes.json();
        }
      }

      const fields = WPLACE_COLOR_ROWS.map((rowKeys, i) => {
        const line = rowKeys
          .map(key => {
            const c = WPLACE_COLORS.find(cc => cc.key === key);
            if (!c) return '';
            const colorInt = parseInt(c.hex, 16);
            const role = guildRoles.find(r => r.color === colorInt && r.name !== '@everyone');
            return role ? `<@&${role.id}>` : `\`#${c.hex}\``;
          })
          .filter(Boolean)
          .join(' ');
        return { name: `Row ${i + 1}`, value: line, inline: false };
      });

      return {
        embeds: [{
          title: '🎨 カラーパレット',
          description: '作成済みの色はメンション埋め込み表示されています。\n未作成の色は `/add_role` で色を選ぶと自動作成されます。',
          fields,
          color: 0x2b2d31,
          footer: { text: `全${WPLACE_COLORS.length}色` },
        }],
      };
    },
  },
  {
    name: 'role_directory',
    description: 'サーバー内で作成されているwplaceカラーロールの一覧を表示します（@everyoneは除外）。',
    deferred: true,
    execute: async (options, currentUser, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) return { content: '❌ このコマンドはサーバー内でのみ使用できます。' };

      const rolesRes = await discordApi(env, `/guilds/${guildId}/roles`);
      if (!rolesRes.ok) {
        return { content: '❌ ロール一覧の取得に失敗しました。' };
      }
      const guildRoles = await rolesRes.json();

      const matchedEntries = WPLACE_COLORS
        .map(c => {
          const colorInt = parseInt(c.hex, 16);
          const role = guildRoles.find(r => r.color === colorInt && r.name !== '@everyone');
          return role ? { color: c, role } : null;
        })
        .filter(Boolean);

      if (matchedEntries.length === 0) {
        return { content: '📋 まだwplaceカラーのロールはありません。`/add_role` か `/setup_color_roles` で作成できます！' };
      }

      const lines = matchedEntries.map(({ color, role }) =>
        `<@&${role.id}> (\`#${color.hex}\` / **${color.name}**)`
      );

      const chunkSize = 20;
      const embeds = [];
      for (let i = 0; i < lines.length; i += chunkSize) {
        embeds.push({
          title: i === 0 ? `📋 カラーロールディレクトリ（${matchedEntries.length}件）` : undefined,
          description: lines.slice(i, i + chunkSize).join('\n'),
          color: 0x2b2d31,
        });
      }

      return { embeds };
    },
  },
  {
    name: 'color_match',
    description: '指定したHexカラーに最も近いwplace標準色を検索します。',
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

      return {
        content:
          `🎨 入力カラー: \`#${input}\`\n` +
          `→ 最も近いwplaceカラー: **${best.name}** (\`#${best.hex}\`)\n` +
          `\`/add_role color:${best.key}\` でロールを付与・作成できます。`,
      };
    },
  },
];

async function verifyDiscordSignature(requestBodyText, signature, timestamp, publicKey) {
  if (!signature || !timestamp || !publicKey) return false;
  try {
    const pubKeyBuf = new Uint8Array(publicKey.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const sigBuf = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const dataBuf = new TextEncoder().encode(timestamp + requestBodyText);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      pubKeyBuf,
      { name: 'Ed25519', namedCurve: 'Ed25519' },
      false,
      ['verify']
    );
    return await crypto.subtle.verify('Ed25519', cryptoKey, sigBuf, dataBuf);
  } catch (e) {
    return false;
  }
}

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
  // 定期送信（Cron Trigger）処理
  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => {
      try {
        const imageBuffer = await createMergedImage();
        const replyResult = {
          content: '🖼 **定期送信 (jplace画像)**',
          file: {
            buffer: imageBuffer,
            name: 'jplace.png',
            type: 'image/png'
          }
        };

        const { body, headers } = buildReplyBody(replyResult);
        await discordApi(env, `/channels/${CHANNEL_ID}/messages`, {
          method: 'POST',
          body,
          headers,
        });
      } catch (err) {
        console.error('自動配信エラー:', err);
      }
    })());
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const missingEnv = ['DISCORD_APPLICATION_ID', 'DISCORD_TOKEN', 'DISCORD_PUBLIC_KEY']
      .filter(key => !env[key]);
    if (missingEnv.length > 0) {
      return new Response(`❌ 環境変数が未設定です: ${missingEnv.join(', ')}`, { status: 500 });
    }

    if (url.pathname === '/register') {
      const registerUrl = `https://discord.com/api/v10/applications/${env.DISCORD_APPLICATION_ID}/commands`;
      
      const cleanCommands = COMMANDS_LIST.map(cmd => {
        const cleaned = {
          name: cmd.name,
          description: cmd.description,
        };
        if (cmd.options) {
          cleaned.options = cmd.options.map(opt => {
            const cleanOpt = {
              type: opt.type,
              name: opt.name,
              description: opt.description,
            };
            if (typeof opt.required === 'boolean') cleanOpt.required = opt.required;
            if (typeof opt.autocomplete === 'boolean') cleanOpt.autocomplete = opt.autocomplete;
            return cleanOpt;
          });
        }
        return cleaned;
      });

      const response = await fetch(registerUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bot ${env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanCommands),
      });

      if (response.ok) {
        return new Response('🎉 新コマンド一覧がDiscordに登録されました！', { status: 200 });
      } else {
        const errorText = await response.text();
        return new Response(`❌ 登録エラー: ${errorText}`, { status: 400 });
      }
    }

    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    const bodyText = await request.text();

    const isValid = await verifyDiscordSignature(bodyText, signature, timestamp, env.DISCORD_PUBLIC_KEY);
    if (!isValid) return new Response('Invalid request signature', { status: 401 });

    const interaction = JSON.parse(bodyText);

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
        JSON.stringify({ type: 8, data: { choices } }),
        { headers: { 'content-type': 'application/json' } }
      );
    }

    if (interaction.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: { 'content-type': 'application/json' },
      });
    }

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
          JSON.stringify({ type: 5 }),
          { headers: { 'content-type': 'application/json' } }
        );
      }

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
