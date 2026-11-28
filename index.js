import initPhotonWasm, { PhotonImage } from 'photon-wasm';
import photonWasmModule from 'photon-wasm/photon_wasm_bg.wasm';

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
        description: '登録先（auto: 環境変数に従う / guild: 現在のサーバー / global: グローバル）',
        type: 3, // STRING
        required: false,
        choices: [
          { name: 'auto（環境変数に従う）', value: 'auto' },
          { name: 'guild（このサーバーのみ・即反映向き）', value: 'guild' },
          { name: 'global（全サーバー）', value: 'global' },
        ],
      },
    ],
  },
];

// ==========================================
// Wasm 初期化管理（__wbindgen_malloc 未定義対策）
// ==========================================
let wasmInitialized = false;
let wasmInitPromise = null;

async function ensureWasmInit() {
  if (wasmInitialized) return;
  if (!wasmInitPromise) {
    wasmInitPromise = (async () => {
      try {
        console.log('[wasm] photon-wasm 初期化を開始します', {
          hasInitFn: typeof initPhotonWasm === 'function',
          wasmModuleType: typeof photonWasmModule,
        });

        if (typeof initPhotonWasm === 'function') {
          await initPhotonWasm(photonWasmModule);
        } else if (photonWasmModule instanceof WebAssembly.Module) {
          await WebAssembly.instantiate(photonWasmModule);
        }

        wasmInitialized = true;
        console.log('[wasm] photon-wasm 初期化が完了しました');
      } catch (err) {
        console.error('[wasm] photon-wasm 初期化に失敗しました', {
          message: err?.message || String(err),
          stack: err?.stack || null,
        });
        throw err;
      } finally {
        wasmInitPromise = null;
      }
    })();
  }
  await wasmInitPromise;
}

// ==========================================
// スラッシュコマンド登録（自動登録＋/register手動実行）
// ==========================================
let commandsRegistered = false;
let commandsRegisterPromise = null;

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
    // auto
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

      if (source === 'auto' && scopeMode === 'auto') {
        commandsRegistered = true;
      }

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

async function registerSlashCommandsIfNeeded(env) {
  if (commandsRegistered) {
    return;
  }
  if (!commandsRegisterPromise) {
    commandsRegisterPromise = (async () => {
      try {
        await registerSlashCommands(env, { source: 'auto', scopeMode: 'auto' });
      } finally {
        commandsRegisterPromise = null;
      }
    })();
  }
  await commandsRegisterPromise;
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
        components: [textCo