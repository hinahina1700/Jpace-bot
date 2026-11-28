import { PhotonImage } from 'photon-wasm';

const CHANNEL_ID = '1507371465744580739';

// Discord Interaction Types & Response Types
const INTERACTION_PING = 1;
const INTERACTION_APPLICATION_COMMAND = 2;
const INTERACTION_MESSAGE_COMPONENT = 3;

const RESPONSE_PONG = 1;
const RESPONSE_CHANNEL_MESSAGE_WITH_SOURCE = 4;
const RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5;
const RESPONSE_DEFERRED_UPDATE_MESSAGE = 6;
const RESPONSE_UPDATE_MESSAGE = 7;

// Components V2 Flags & Types
const FLAG_IS_COMPONENTS_V2 = 32768;
const FLAG_EPHEMERAL_V2 = 32768 | 64; // 32832

const COMP_ACTION_ROW = 1;
const COMP_BUTTON = 2;
const COMP_STRING_SELECT = 3;
const COMP_TEXT_DISPLAY = 10;
const COMP_MEDIA_GALLERY = 12;
const COMP_SEPARATOR = 14;
const COMP_CONTAINER = 17;

const BUTTON_PRIMARY = 1;
const BUTTON_SECONDARY = 2;
const BUTTON_SUCCESS = 3;
const BUTTON_DANGER = 4;

// Map / Sector Constants
const CROP_X = 922;
const CROP_Y = 364;
const CROP_WIDTH = 3866 - 922;  // 2944
const CROP_HEIGHT = 3904 - 364; // 3540
const SECTOR_COLS = ['A', 'B', 'C'];
const SECTOR_ROWS = ['1', '2', '3', '4'];

// Discord Permission Bits
const PERM_ADMINISTRATOR = 1n << 3n;

// 登録するスラッシュコマンド定義
const SLASH_COMMANDS = [
  {
    name: 'map',
    description: 'jplace 戦況マップを表示します',
  },
  {
    name: 'sector',
    description: 'jplace 区画マップ（A1〜C4）を表示します',
    options: [
      {
        name: 'area',
        description: '拡大したい区画（例: A1, B2, C4）',
        type: 3, // STRING
        required: false,
      },
    ],
  },
  {
    name: 'register',
    description: 'スラッシュコマンドをDiscordに登録・再同期します',
    options: [
      {
        name: 'scope',
        description: '登録先（auto: 自動判定 / guild: 現在のサーバー / global: グローバル）',
        type: 3, // STRING
        required: false,
        choices: [
          { name: 'auto（自動判定）', value: 'auto' },
          { name: 'guild（このサーバーのみ・即反映向き）', value: 'guild' },
          { name: 'global（全サーバー）', value: 'global' },
        ],
      },
    ],
  },
];

// ==========================================
// Wasm 初期化管理
// ==========================================
let wasmInitialized = false;

async function ensureWasmInit() {
  if (!wasmInitialized) {
    wasmInitialized = true;
    console.log('[wasm] photon-wasm 初期化フラグを確認しました', {
      hasPhotonImage: typeof PhotonImage === 'function',
    });
  }
}

// ==========================================
// スラッシュコマンド自動登録（グローバル＋サーバー即反映）
// ==========================================
const registeredScopes = new Set();
const registeringPromises = new Map();

function resolveCommandEndpoint(env, scopeMode = 'auto', guildIdOverride = null) {
  const appId = String(env?.DISCORD_APPLICATION_ID || '').trim();
  const envGuildId = String(env?.DISCORD_GUILD_ID || '').trim();
  const targetGuildId = String(guildIdOverride || envGuildId || '').trim();

  if (!appId) {
    return { error: 'DISCORD_APPLICATION_ID が未設定です', appId: '', guildId: '', scope: '' };
  }

  let useGuild = false;
  if (scopeMode === 'guild') {
    if (!targetGuildId) {
      return {
        error: 'guild 指定ですが DISCORD_GUILD_ID（またはサーバーID）が見つかりません',
        appId,
        guildId: '',
        scope: 'guild',
      };
    }
    useGuild = true;
  } else if (scopeMode === 'global') {
    useGuild = false;
  } else {
    useGuild = Boolean(targetGuildId);
  }

  const scope = useGuild ? `guild:${targetGuildId}` : 'global';
  const endpoint = useGuild
    ? `https://discord.com/api/v10/applications/${encodeURIComponent(appId)}/guilds/${encodeURIComponent(targetGuildId)}/commands`
    : `https://discord.com/api/v10/applications/${encodeURIComponent(appId)}/commands`;

  return { error: null, appId, guildId: useGuild ? targetGuildId : '', scope, endpoint };
}

async function registerSlashCommands(env, { source = 'auto', scopeMode = 'auto', guildIdOverride = null } = {}) {
  const token = String(env?.DISCORD_TOKEN || '').trim();
  const target = resolveCommandEndpoint(env, scopeMode, guildIdOverride);

  if (!token || target.error) {
    const reason = !token ? 'DISCORD_TOKEN が未設定です' : target.error;
    console.warn('[cmd-reg] 登録スキップ', {
      source,
      reason,
      hasApplicationId: Boolean(target.appId),
      hasDiscordToken: Boolean(token),
      scope: target.scope || 'unknown',
    });
    return {
      ok: false,
      skipped: true,
      reason,
      scope: target.scope || 'unknown',
      status: null,
      registered: [],
      errorBody: '',
    };
  }

  console.log('[cmd-reg] コマンド登録リクエスト送信', {
    source,
    scope: target.scope,
    commandCount: SLASH_COMMANDS.length,
    commands: SLASH_COMMANDS.map((c) => c.name),
  });

  try {
    const res = await fetch(target.endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(SLASH_COMMANDS),
    });

    const responseText = await res.text();
    if (res.ok) {
      let registeredNames = SLASH_COMMANDS.map((c) => c.name);
      try {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed)) {
          registeredNames = parsed.map((item) => item.name).filter(Boolean);
        }
      } catch {
        // JSONパース失敗時は定義一覧を使う
      }

      registeredScopes.add(target.scope);

      console.log('[cmd-reg] コマンド登録成功', {
        source,
        status: res.status,
        scope: target.scope,
        registered: registeredNames,
      });

      return {
        ok: true,
        skipped: false,
        reason: '',
        scope: target.scope,
        status: res.status,
        registered: registeredNames,
        errorBody: '',
      };
    }

    console.error('[cmd-reg] コマンド登録APIエラー', {
      source,
      status: res.status,
      statusText: res.statusText,
      scope: target.scope,
      body: responseText.slice(0, 500),
    });

    return {
      ok: false,
      skipped: false,
      reason: `Discord API エラー (HTTP ${res.status} ${res.statusText})`,
      scope: target.scope,
      status: res.status,
      registered: [],
      errorBody: responseText.slice(0, 500),
    };
  } catch (err) {
    const msg = err?.message || String(err);
    console.error('[cmd-reg] コマンド登録通信失敗', {
      source,
      scope: target.scope,
      message: msg,
    });
    return {
      ok: false,
      skipped: false,
      reason: `通信失敗: ${msg}`,
      scope: target.scope,
      status: null,
      registered: [],
      errorBody: '',
    };
  }
}

async function registerSlashCommandsIfNeeded(env, guildId = null) {
  const tasks = [];

  // 1. グローバルまたは環境変数指定スコープの自動登録
  const defaultTarget = resolveCommandEndpoint(env, 'auto', null);
  if (!defaultTarget.error && !registeredScopes.has(defaultTarget.scope)) {
    const key = defaultTarget.scope;
    if (!registeringPromises.has(key)) {
      const p = registerSlashCommands(env, { source: 'auto', scopeMode: 'auto' }).finally(() => {
        registeringPromises.delete(key);
      });
      registeringPromises.set(key, p);
    }
    tasks.push(registeringPromises.get(key));
  }

  // 2. インタラクション元のサーバー(guildId)が判明している場合、即反映用にサーバー登録も自動実行
  if (guildId) {
    const guildTarget = resolveCommandEndpoint(env, 'guild', guildId);
    if (!guildTarget.error && !registeredScopes.has(guildTarget.scope)) {
      const gKey = guildTarget.scope;
      if (!registeringPromises.has(gKey)) {
        const gp = registerSlashCommands(env, {
          source: 'auto-guild',
          scopeMode: 'guild',
          guildIdOverride: guildId,
        }).finally(() => {
          registeringPromises.delete(gKey);
        });
        registeringPromises.set(gKey, gp);
      }
      tasks.push(registeringPromises.get(gKey));
    }
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks);
  }
}

// ==========================================
// wplace標準カラーパレット（全61色）
// ==========================================
const WPLACE_COLORS = [
  { key: 'black', name: 'black', hex: '000001' },
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

const WPLACE_BY_KEY = new Map(WPLACE_COLORS.map((c) => [c.key, c]));
const WPLACE_BY_HEX = new Map(WPLACE_COLORS.map((c) => [c.hex.toUpperCase(), c]));

const ACTION_TYPES = [
  { value: 'alliance', label: '同盟締結', category: 'consensus', requiresTarget: true },
  { value: 'non_aggression', label: '不可侵条約締結', category: 'consensus', requiresTarget: true },
  { value: 'protectorate', label: '保護国同盟締結', category: 'consensus', requiresTarget: true },
  { value: 'ceasefire', label: '停戦・講和締結', category: 'consensus', requiresTarget: true },
  { value: 'eternal_neutrality', label: '永世中立宣言', category: 'recognition', requiresTarget: false },
  { value: 'war', label: '宣戦布告', category: 'immediate_target', requiresTarget: true },
  { value: 'ultimatum', label: '最後通牒', category: 'immediate_target', requiresTarget: true },
  { value: 'break_treaty', label: '条約破棄・同盟解消', category: 'immediate_target', requiresTarget: true },
  { value: 'surrender', label: '降伏宣言', category: 'immediate_target', requiresTarget: true },
  { value: 'founding', label: '建国・独立宣言', category: 'immediate_open', requiresTarget: false },
  { value: 'custom', label: 'その他宣言', category: 'immediate_open', requiresTarget: false },
];

const ACTION_TYPE_MAP = new Map(ACTION_TYPES.map((t) => [t.value, t]));

function hexToRgb(hex) {
  const clean = String(hex || '').replace(/^#/, '');
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function formatHex6(colorInt) {
  return (Number(colorInt || 0) & 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

function resolveColorEntry(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  const byKey = WPLACE_BY_KEY.get(trimmed.toLowerCase());
  if (byKey) return byKey;
  const cleanHex = trimmed.replace(/^#/, '').toUpperCase();
  const byHex = WPLACE_BY_HEX.get(cleanHex);
  if (byHex) return byHex;
  const byName = WPLACE_COLORS.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
  return byName || null;
}

// ==========================================
// Discord API & Permission / Role Helpers
// ==========================================
async function discordApi(env, endpoint, options = {}) {
  const method = options.method || 'GET';
  const url = `https://discord.com/api/v10${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bot ${env.DISCORD_TOKEN}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.warn('[discord-api] 応答エラー', {
        method,
        endpoint,
        status: res.status,
        statusText: res.statusText,
      });
    }
    return res;
  } catch (err) {
    console.error('[discord-api] Botとの通信に失敗しました', {
      method,
      endpoint,
      message: err?.message || String(err),
    });
    throw err;
  }
}

function hasAdminPermission(member) {
  if (!member || !member.permissions) return false;
  try {
    return (BigInt(member.permissions) & PERM_ADMINISTRATOR) === PERM_ADMINISTRATOR;
  } catch {
    return false;
  }
}

function isWplaceColorRole(role) {
  if (!role || role.id === role.guild_id) return false;
  if (role.name === '@everyone') return false;
  try {
    if ((BigInt(role.permissions || '0') & PERM_ADMINISTRATOR) === PERM_ADMINISTRATOR) {
      return false;
    }
  } catch {
    return false;
  }
  const hex = formatHex6(role.color);
  return hex !== '000000' && WPLACE_BY_HEX.has(hex);
}

async function fetchGuildRoles(env, guildId) {
  const res = await discordApi(env, `/guilds/${guildId}/roles`, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`ロール一覧の取得に失敗しました (HTTP ${res.status})`);
  }
  return res.json();
}

async function fetchGuildMember(env, guildId, userId) {
  const res = await discordApi(env, `/guilds/${guildId}/members/${userId}`, { method: 'GET' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function fetchGuildMembersAll(env, guildId) {
  const members = [];
  let after = '0';
  for (let page = 0; page < 10; page++) {
    const res = await discordApi(env, `/guilds/${guildId}/members?limit=1000&after=${after}`, { method: 'GET' });
    if (!res.ok) break;
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    members.push(...batch);
    if (batch.length < 1000) break;
    after = batch[batch.length - 1].user?.id || '0';
  }
  return members;
}

function getUserWplaceRoles(guildRoles, member, resolvedRoles = null) {
  const memberRoleIds = new Set(member?.roles || []);
  const results = [];
  for (const r of guildRoles) {
    if (memberRoleIds.has(r.id) && isWplaceColorRole(r)) {
      results.push(r);
    }
  }
  if (results.length === 0 && resolvedRoles) {
    for (const roleId of memberRoleIds) {
      const rr = resolvedRoles[roleId];
      if (rr && isWplaceColorRole(rr)) {
        results.push(rr);
      }
    }
  }
  return results;
}

// ==========================================
// Components V2 Builder & Payload Formatter
// ==========================================
function textComp(content) {
  return { type: COMP_TEXT_DISPLAY, content: String(content) };
}

function sepComp(divider = true, spacing = 1) {
  return { type: COMP_SEPARATOR, divider, spacing };
}

function mediaGalleryComp(filename, description = '') {
  const item = { media: { url: `attachment://${filename}` } };
  if (description) item.description = description;
  return { type: COMP_MEDIA_GALLERY, items: [item] };
}

function actionRowComp(components) {
  return { type: COMP_ACTION_ROW, components };
}

function buttonComp({ customId, label, style = BUTTON_SECONDARY, disabled = false }) {
  return {
    type: COMP_BUTTON,
    custom_id: customId,
    label,
    style,
    disabled,
  };
}

function stringSelectComp({ customId, placeholder, options }) {
  return {
    type: COMP_STRING_SELECT,
    custom_id: customId,
    placeholder,
    min_values: 1,
    max_values: 1,
    options,
  };
}

function containerComp({ components, accentColor = null }) {
  const obj = {
    type: COMP_CONTAINER,
    components,
  };
  if (accentColor !== null && accentColor !== undefined) {
    obj.accent_color = Number(accentColor) & 0xffffff;
  }
  return obj;
}

function buildV2Payload(result, { ephemeral = false } = {}) {
  const flags = ephemeral ? FLAG_EPHEMERAL_V2 : FLAG_IS_COMPONENTS_V2;
  const components = Array.isArray(result.components)
    ? result.components
    : [containerComp({ components: [textComp(result.message || '')] })];

  if (result.file) {
    const formData = new FormData();
    const attachments = [
      {
        id: 0,
        filename: result.file.name,
        description: result.file.description || result.file.name,
      },
    ];
    formData.append(
      'payload_json',
      JSON.stringify({
        flags,
        components,
        attachments,
      })
    );
    const blob = new Blob([result.file.buffer], { type: result.file.type || 'image/png' });
    formData.append('files[0]', blob, result.file.name);
    return { body: formData, headers: {} };
  }

  return {
    body: JSON.stringify({
      flags,
      components,
    }),
    headers: { 'Content-Type': 'application/json' },
  };
}

function errorV2(message, ephemeral = true) {
  return {
    ephemeral,
    components: [
      containerComp({
        accentColor: 0xed1c24,
        components: [textComp(`**エラー**\n${message}`)],
      }),
    ],
  };
}

function infoV2(title, lines, { ephemeral = false, accentColor = null, componentsExtra = [] } = {}) {
  const bodyText = Array.isArray(lines) ? lines.join('\n') : String(lines);
  return {
    ephemeral,
    components: [
      containerComp({
        accentColor,
        components: [textComp(`**${title}**\n${bodyText}`), ...componentsExtra],
      }),
    ],
  };
}

// ==========================================
// 画像生成・加工（PhotonImage メモリ安全管理）
// ==========================================
async function createMergedPhotonImage() {
  await ensureWasmInit();

  const canvasBuffer = new Uint8Array(CROP_WIDTH * CROP_HEIGHT * 4);
  for (let i = 0; i < canvasBuffer.length; i += 4) {
    canvasBuffer[i] = 138;     // R (#8aacf6)
    canvasBuffer[i + 1] = 172; // G
    canvasBuffer[i + 2] = 246; // B
    canvasBuffer[i + 3] = 255; // Alpha
  }

  const canvas = new PhotonImage(canvasBuffer, CROP_WIDTH, CROP_HEIGHT);
  try {
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
              const tileImg = PhotonImage.new_from_byteslice(new Uint8Array(arrayBuffer));
              return { tileImg, x, y };
            })
            .catch(() => null)
        );
      }
    }

    const results = await Promise.all(fetchPromises);
    let loadedCount = 0;
    for (const item of results) {
      if (item && item.tileImg) {
        try {
          const posX = item.x * 1000 - CROP_X;
          const posY = item.y * 1000 - CROP_Y;
          canvas.blend(item.tileImg, posX, posY, 'over');
          loadedCount++;
        } finally {
          item.tileImg.free();
        }
      }
    }
    console.log('[map] タイル合成完了', { loadedCount, total: fetchPromises.length });

    return canvas;
  } catch (err) {
    canvas.free();
    throw err;
  }
}

async function createMergedImageBuffer() {
  const canvas = await createMergedPhotonImage();
  try {
    return canvas.get_bytes().buffer;
  } finally {
    canvas.free();
  }
}

function drawRectOutline(buf, width, height, x0, y0, x1, y1, thickness, rgba) {
  const [r, g, b, a] = rgba;
  const clampedX0 = Math.max(0, Math.floor(x0));
  const clampedY0 = Math.max(0, Math.floor(y0));
  const clampedX1 = Math.min(width - 1, Math.ceil(x1));
  const clampedY1 = Math.min(height - 1, Math.ceil(y1));

  const putPixel = (px, py) => {
    if (px < 0 || px >= width || py < 0 || py >= height) return;
    const idx = (py * width + px) * 4;
    buf[idx] = r;
    buf[idx + 1] = g;
    buf[idx + 2] = b;
    buf[idx + 3] = a;
  };

  for (let t = 0; t < thickness; t++) {
    for (let x = clampedX0; x <= clampedX1; x++) {
      putPixel(x, clampedY0 + t);
      putPixel(x, clampedY1 - t);
    }
    for (let y = clampedY0; y <= clampedY1; y++) {
      putPixel(clampedX0 + t, y);
      putPixel(clampedX1 - t, y);
    }
  }
}

function parseSectorArea(areaCode) {
  if (!areaCode) return null;
  const norm = String(areaCode).trim().toUpperCase();
  if (!/^[ABC][1234]$/.test(norm)) return null;
  const colIdx = SECTOR_COLS.indexOf(norm[0]);
  const rowIdx = SECTOR_ROWS.indexOf(norm[1]);
  if (colIdx < 0 || rowIdx < 0) return null;

  const cellW = CROP_WIDTH / 3;
  const cellH = CROP_HEIGHT / 4;
  const x = Math.round(colIdx * cellW);
  const y = Math.round(rowIdx * cellH);
  const nextX = Math.round((colIdx + 1) * cellW);
  const nextY = Math.round((rowIdx + 1) * cellH);

  return {
    code: norm,
    colIndex: colIdx,
    rowIndex: rowIdx,
    x,
    y,
    width: Math.max(1, nextX - x),
    height: Math.max(1, nextY - y),
  };
}

async function createSectorImageBuffer(areaCode = null) {
  const canvas = await createMergedPhotonImage();
  try {
    const width = canvas.get_width();
    const height = canvas.get_height();
    const raw = canvas.get_raw_pixels();
    const buf = new Uint8Array(raw);

    const sector = parseSectorArea(areaCode);
    if (!sector) {
      for (let c = 0; c < 3; c++) {
        for (let r = 0; r < 4; r++) {
          const x0 = Math.round((c * width) / 3);
          const y0 = Math.round((r * height) / 4);
          const x1 = Math.round(((c + 1) * width) / 3) - 1;
          const y1 = Math.round(((r + 1) * height) / 4) - 1;
          drawRectOutline(buf, width, height, x0, y0, x1, y1, 4, [255, 255, 255, 230]);
          drawRectOutline(buf, width, height, x0 + 4, y0 + 4, x1 - 4, y1 - 4, 2, [20, 24, 32, 220]);
        }
      }
      const gridImg = new PhotonImage(buf, width, height);
      try {
        return gridImg.get_bytes().buffer;
      } finally {
        gridImg.free();
      }
    }

    const subW = sector.width;
    const subH = sector.height;
    const subBuf = new Uint8Array(subW * subH * 4);
    for (let dy = 0; dy < subH; dy++) {
      const sy = sector.y + dy;
      for (let dx = 0; dx < subW; dx++) {
        const sx = sector.x + dx;
        const srcIdx = (sy * width + sx) * 4;
        const dstIdx = (dy * subW + dx) * 4;
        subBuf[dstIdx] = buf[srcIdx];
        subBuf[dstIdx + 1] = buf[srcIdx + 1];
        subBuf[dstIdx + 2] = buf[srcIdx + 2];
        subBuf[dstIdx + 3] = buf[srcIdx + 3];
      }
    }

    const croppedImg = new PhotonImage(subBuf, subW, subH);
    try {
      return croppedImg.get_bytes().buffer;
    } finally {
      croppedImg.free();
    }
  } finally {
    canvas.free();
  }
}

// ==========================================
// Components V2 Card Builders
// ==========================================
function buildMapComponents(filename, captionText, accentColor = 0x4093e4) {
  return [
    containerComp({
      accentColor,
      components: [
        textComp(`**jplace 戦況マップ**\n${captionText}`),
        mediaGalleryComp(filename, 'jplace 合成マップ'),
        sepComp(),
        actionRowComp([
          buttonComp({ customId: 'map_refresh', label: '最新画像に更新', style: BUTTON_PRIMARY }),
          buttonComp({ customId: 'map_my_highlight', label: '自国をハイライト', style: BUTTON_SECONDARY }),
        ]),
      ],
    }),
  ];
}

function buildSectorSelectRow(selectedArea = null) {
  const options = [];
  for (const r of SECTOR_ROWS) {
    for (const c of SECTOR_COLS) {
      const code = `${c}${r}`;
      options.push({
        label: `区画 ${code}`,
        value: code,
        description: `横${c}列 / 縦${r}行（${code}）へ拡大`,
        default: selectedArea === code,
      });
    }
  }
  return actionRowComp([
    stringSelectComp({
      customId: 'sector_select',
      placeholder: selectedArea ? `選択中: ${selectedArea}（別区画へ切替）` : '区画（A1〜C4）を選択して拡大',
      options,
    }),
  ]);
}

// ==========================================
// Webhook Followup Sender (タイムアウト回避用)
// ==========================================
async function sendDeferredWebhookResult(interaction, result, { ephemeral = false } = {}) {
  const appId = interaction.application_id;
  const token = interaction.token;
  if (!appId || !token) {
    console.error('[webhook] application_id または token がありません');
    return;
  }

  const endpoint = `https://discord.com/api/v10/webhooks/${encodeURIComponent(appId)}/${encodeURIComponent(token)}/messages/@original`;
  const payload = buildV2Payload(result, { ephemeral });

  try {
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: payload.headers,
      body: payload.body,
    });
    const text = await res.text();
    if (!res.ok) {
      console.error('[webhook] 元の応答の更新に失敗しました', {
        status: res.status,
        body: text.slice(0, 500),
      });
    } else {
      console.log('[webhook] 元の応答を更新しました', { status: res.status });
    }
  } catch (err) {
    console.error('[webhook] Webhook送信中に通信エラーが発生しました', {
      message: err?.message || String(err),
    });
  }
}

// ==========================================
// Discord Ed25519 Signature Verification
// ==========================================
function hexToUint8Array(hex) {
  const clean = String(hex || '').trim();
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function verifyDiscordSignature(request, rawBodyText, publicKeyHex) {
  if (!publicKeyHex) {
    console.warn('[sig] DISCORD_PUBLIC_KEY が未設定のため署名検証をスキップします');
    return true;
  }
  const signatureHex = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  if (!signatureHex || !timestamp) {
    console.warn('[sig] 署名ヘッダーが不足しています', {
      hasSignature: Boolean(signatureHex),
      hasTimestamp: Boolean(timestamp),
    });
    return false;
  }

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      hexToUint8Array(publicKeyHex),
      { name: 'Ed25519' },
      false,
      ['verify']
    );
    const msg = new TextEncoder().encode(timestamp + rawBodyText);
    const ok = await crypto.subtle.verify('Ed25519', key, hexToUint8Array(signatureHex), msg);
    if (!ok) {
      console.warn('[sig] 署名検証に失敗しました');
    }
    return ok;
  } catch (err) {
    console.error('[sig] 署名検証中にエラーが発生しました', {
      message: err?.message || String(err),
    });
    return false;
  }
}

// ==========================================
// Interaction Handlers
// ==========================================
async function handleApplicationCommand(interaction, env, ctx) {
  const cmdName = interaction.data?.name || '';
  console.log('[interaction] スラッシュコマンドを受信', {
    cmdName,
    guildId: interaction.guild_id || null,
    userId: interaction.member?.user?.id || interaction.user?.id || null,
  });

  if (cmdName === 'register') {
    const scopeOpt = interaction.data?.options?.find((o) => o.name === 'scope')?.value || 'auto';
    const guildIdOverride = scopeOpt === 'guild' ? interaction.guild_id || null : null;

    const bgTask = (async () => {
      try {
        const regResult = await registerSlashCommands(env, {
          source: 'slash:/register',
          scopeMode: scopeOpt,
          guildIdOverride,
        });

        if (regResult.ok) {
          const resObj = infoV2(
            'スラッシュコマンド登録完了',
            [
              `スコープ: \`${regResult.scope}\` (HTTP ${regResult.status})`,
              `登録コマンド: ${regResult.registered.map((n) => `\`/${n}\``).join(', ')}`,
              'Discord を再読み込みするとコマンド一覧に反映されます。',
            ],
            { ephemeral: true, accentColor: 0x13e67b }
          );
          await sendDeferredWebhookResult(interaction, resObj, { ephemeral: true });
          return;
        }

        const detailLines = [
          `理由: ${regResult.reason}`,
          `スコープ: \`${regResult.scope}\``,
        ];
        if (regResult.errorBody) {
          detailLines.push(`詳細: \`${regResult.errorBody}\``);
        }
        await sendDeferredWebhookResult(interaction, errorV2(detailLines.join('\n'), true), {
          ephemeral: true,
        });
      } catch (err) {
        console.error('[cmd-reg] /register バックグラウンド処理エラー', {
          message: err?.message || String(err),
        });
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || 'コマンド登録中にエラーが発生しました', true),
          { ephemeral: true }
        );
      }
    })();

    if (ctx?.waitUntil) ctx.waitUntil(bgTask);

    return new Response(
      JSON.stringify({
        type: RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: FLAG_EPHEMERAL_V2 },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (cmdName === 'map') {
    const bgTask = (async () => {
      try {
        console.log('[map] 画像生成を開始します');
        const buffer = await createMergedImageBuffer();
        const filename = 'jplace-map.png';
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: 'jplace 戦況マップ' },
          components: buildMapComponents(filename, '最新タイル合成マップを表示中'),
        });
      } catch (err) {
        console.error('[map] 画像生成または送信に失敗しました', {
          message: err?.message || String(err),
        });
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || 'マップ画像の生成に失敗しました', true),
          { ephemeral: true }
        );
      }
    })();

    if (ctx?.waitUntil) ctx.waitUntil(bgTask);

    return new Response(
      JSON.stringify({
        type: RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: FLAG_IS_COMPONENTS_V2 },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (cmdName === 'sector') {
    const areaOpt = interaction.data?.options?.find((o) => o.name === 'area')?.value || null;
    const bgTask = (async () => {
      try {
        console.log('[sector] 区画画像生成を開始します', { areaOpt });
        const buffer = await createSectorImageBuffer(areaOpt);
        const filename = areaOpt ? `sector-${areaOpt.toUpperCase()}.png` : 'sector-grid.png';
        const caption = areaOpt ? `区画 ${areaOpt.toUpperCase()} の拡大マップ` : '区画一覧（A1〜C4）グリッド表示';
        const components = [
          containerComp({
            accentColor: 0x10aea6,
            components: [
              textComp(`**jplace 区画マップ**\n${caption}`),
              mediaGalleryComp(filename, caption),
              sepComp(),
              buildSectorSelectRow(areaOpt),
            ],
          }),
        ];
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: caption },
          components,
        });
      } catch (err) {
        console.error('[sector] 区画画像生成または送信に失敗しました', {
          message: err?.message || String(err),
        });
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || '区画マップの生成に失敗しました', true),
          { ephemeral: true }
        );
      }
    })();

    if (ctx?.waitUntil) ctx.waitUntil(bgTask);

    return new Response(
      JSON.stringify({
        type: RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        data: { flags: FLAG_IS_COMPONENTS_V2 },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.warn('[interaction] 未対応のスラッシュコマンド', { cmdName });
  const resObj = infoV2('コマンド受信', `\`/${cmdName}\` を受け付けました。`, { ephemeral: true });
  const payload = buildV2Payload(resObj, { ephemeral: true });
  return new Response(payload.body, { status: 200, headers: payload.headers });
}

async function handleMessageComponent(interaction, env, ctx) {
  const customId = interaction.data?.custom_id || '';
  console.log('[interaction] コンポーネント操作を受信', {
    customId,
    values: interaction.data?.values || null,
    userId: interaction.member?.user?.id || interaction.user?.id || null,
  });

  if (customId === 'map_refresh') {
    const bgTask = (async () => {
      try {
        console.log('[map_refresh] 画像再生成を開始します');
        const buffer = await createMergedImageBuffer();
        const filename = 'jplace-map.png';
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: 'jplace 戦況マップ' },
          components: buildMapComponents(filename, '最新タイルに更新しました'),
        });
      } catch (err) {
        console.error('[map_refresh] 更新に失敗しました', {
          message: err?.message || String(err),
        });
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || 'マップの更新に失敗しました', true),
          { ephemeral: true }
        );
      }
    })();

    if (ctx?.waitUntil) ctx.waitUntil(bgTask);

    return new Response(
      JSON.stringify({
        type: RESPONSE_DEFERRED_UPDATE_MESSAGE,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (customId === 'sector_select') {
    const selected = interaction.data?.values?.[0] || null;
    const bgTask = (async () => {
      try {
        console.log('[sector_select] 区画画像生成を開始します', { selected });
        const buffer = await createSectorImageBuffer(selected);
        const filename = selected ? `sector-${selected}.png` : 'sector-grid.png';
        const caption = selected ? `区画 ${selected} の拡大マップ` : '区画一覧（A1〜C4）グリッド表示';
        const components = [
          containerComp({
            accentColor: 0x10aea6,
            components: [
              textComp(`**jplace 区画マップ**\n${caption}`),
              mediaGalleryComp(filename, caption),
              sepComp(),
              buildSectorSelectRow(selected),
            ],
          }),
        ];
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: caption },
          components,
        });
      } catch (err) {
        console.error('[sector_select] 区画切替に失敗しました', {
          message: err?.message || String(err),
        });
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || '区画マップの切替に失敗しました', true),
          { ephemeral: true }
        );
      }
    })();

    if (ctx?.waitUntil) ctx.waitUntil(bgTask);

    return new Response(
      JSON.stringify({
        type: RESPONSE_DEFERRED_UPDATE_MESSAGE,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.warn('[interaction] 未対応のコンポーネント操作', { customId });
  const resObj = infoV2('操作を受付', `コンポーネント \`${customId}\` を処理しました。`, { ephemeral: true });
  const payload = buildV2Payload(resObj, { ephemeral: true });
  return new Response(payload.body, { status: 200, headers: payload.headers });
}

// ==========================================
// Cloudflare Worker Entrypoint
// ==========================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log('[worker] リクエスト受信', {
      method: request.method,
      path: url.pathname,
    });

    if (request.method === 'GET') {
      if (ctx?.waitUntil) {
        ctx.waitUntil(registerSlashCommandsIfNeeded(env, null));
      } else {
        await registerSlashCommandsIfNeeded(env, null);
      }
      return new Response('jpace bot worker is running', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const rawBody = await request.text();
    const isValid = await verifyDiscordSignature(request, rawBody, env.DISCORD_PUBLIC_KEY);
    if (!isValid) {
      console.error('[worker] 署名検証に失敗したため 401 を返します');
      return new Response('Invalid request signature', { status: 401 });
    }

    let interaction;
    try {
      interaction = JSON.parse(rawBody);
    } catch (err) {
      console.error('[worker] リクエストJSONのパースに失敗しました', {
        message: err?.message || String(err),
      });
      return new Response('Invalid JSON', { status: 400 });
    }

    if (ctx?.waitUntil) {
      ctx.waitUntil(registerSlashCommandsIfNeeded(env, interaction.guild_id || null));
    }

    if (interaction.type === INTERACTION_PING) {
      console.log('[worker] Discord PING を受信 -> PONG を返します');
      return new Response(JSON.stringify({ type: RESPONSE_PONG }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      if (interaction.type === INTERACTION_APPLICATION_COMMAND) {
        return await handleApplicationCommand(interaction, env, ctx);
      }
      if (interaction.type === INTERACTION_MESSAGE_COMPONENT) {
        return await handleMessageComponent(interaction, env, ctx);
      }

      console.warn('[worker] 未対応のインタラクション種別', { type: interaction.type });
      const fallback = infoV2('未対応のインタラクション', `type: ${interaction.type}`, { ephemeral: true });
      const payload = buildV2Payload(fallback, { ephemeral: true });
      return new Response(payload.body, { status: 200, headers: payload.headers });
    } catch (err) {
      console.error('[worker] インタラクション処理中に例外が発生しました', {
        message: err?.message || String(err),
        stack: err?.stack || null,
      });
      const errObj = errorV2(err?.message || '予期しないエラーが発生しました', true);
      const payload = buildV2Payload(errObj, { ephemeral: true });
      return new Response(payload.body, { status: 200, headers: payload.headers });
    }
  },
};
