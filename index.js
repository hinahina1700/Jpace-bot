import { PhotonImage } from 'photon-wasm';

const CHANNEL_ID = '1507371465744580739';

// Discord Interaction Types & Response Types
const INTERACTION_PING = 1;
const INTERACTION_APPLICATION_COMMAND = 2;
const INTERACTION_MESSAGE_COMPONENT = 3;
const INTERACTION_APPLICATION_COMMAND_AUTOCOMPLETE = 4;

const RESPONSE_PONG = 1;
const RESPONSE_CHANNEL_MESSAGE_WITH_SOURCE = 4;
const RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5;
const RESPONSE_DEFERRED_UPDATE_MESSAGE = 6;
const RESPONSE_UPDATE_MESSAGE = 7;
const RESPONSE_AUTOCOMPLETE_RESULT = 8;

// Components V2 Flags & Types
const FLAG_IS_COMPONENTS_V2 = 32768;
const FLAG_EPHEMERAL_V2 = 32768 | 64; // 32832

const COMP_ACTION_ROW = 1;
const COMP_BUTTON = 2;
const COMP_STRING_SELECT = 3;
const COMP_SECTION = 9;
const COMP_TEXT_DISPLAY = 10;
const COMP_MEDIA_GALLERY = 12;
const COMP_SEPARATOR = 14;
const COMP_CONTAINER = 17;

const BUTTON_PRIMARY = 1;
const BUTTON_SECONDARY = 2;
const BUTTON_SUCCESS = 3;
const BUTTON_DANGER = 4;

// Application Command Option Types
const OPT_STRING = 3;
const OPT_INTEGER = 4;
const OPT_BOOLEAN = 5;
const OPT_USER = 6;
const OPT_ROLE = 8;

// Map / Sector Constants (2944 x 3540 -> 3 cols x 4 rows = 12 sectors)
const CROP_X = 922;
const CROP_Y = 364;
const CROP_WIDTH = 3866 - 922;  // 2944
const CROP_HEIGHT = 3904 - 364; // 3540
const SECTOR_COLS = ['A', 'B', 'C'];
const SECTOR_ROWS = ['1', '2', '3', '4'];

// Discord Permission Bits
const PERM_ADMINISTRATOR = 1n << 3n;

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

const WPLACE_BY_KEY = new Map(WPLACE_COLORS.map((c) => [c.key, c]));
const WPLACE_BY_HEX = new Map(WPLACE_COLORS.map((c) => [c.hex.toUpperCase(), c]));

const AREA_CHOICES = SECTOR_ROWS.flatMap((r) =>
  SECTOR_COLS.map((c) => ({ name: `${c}${r}`, value: `${c}${r}` }))
);

const ACTION_TYPES = [
  { value: 'alliance', label: '同盟締結', category: 'consensus', requiresTarget: true },
  { value: 'non_aggression', label: '不可侵条約締結', category: 'consensus', requiresTarget: true },
  { value: 'protectorate', label: '保護国同盟締結', category: 'consensus', requiresTarget: true },
  { value: 'ceasefire', label: '停戦・講和締結', category: 'consensus', requiresTarget: true },
  { value: 'eternal_neutrality', label: '永世中立宣言', category: 'neutrality', requiresTarget: false },
  { value: 'war', label: '宣戦布告', category: 'immediate_target', requiresTarget: true },
  { value: 'ultimatum', label: '最後通牒', category: 'immediate_target', requiresTarget: true },
  { value: 'break_treaty', label: '条約破棄・同盟解消', category: 'immediate_target', requiresTarget: true },
  { value: 'surrender', label: '降伏宣言', category: 'immediate_target', requiresTarget: true },
  { value: 'founding', label: '建国・独立宣言', category: 'immediate_open', requiresTarget: false },
  { value: 'custom', label: 'その他宣言', category: 'immediate_open', requiresTarget: false },
];

const ACTION_TYPE_MAP = new Map(ACTION_TYPES.map((t) => [t.value, t]));

// ==========================================
// スラッシュコマンド定義（COMMANDS_LIST）
// ==========================================
const COMMANDS_LIST = [
  {
    name: 'now',
    description: '現在のjplace戦況マップを表示します',
  },
  {
    name: 'post_now',
    description: '指定チャンネルへ現在のjplace戦況マップを送信します',
  },
  {
    name: 'highlight',
    description: '指定したwplaceカラーのみを強調し、他をグレースケール化したマップを表示します',
    options: [
      {
        name: 'color',
        description: '強調するwplaceカラー（名前または16進カラーコード）',
        type: OPT_STRING,
        required: true,
        autocomplete: true,
      },
    ],
  },
  {
    name: 'sector',
    description: 'jplace区画マップ（A1〜C4の12分割）を表示・拡大します',
    options: [
      {
        name: 'area',
        description: '拡大表示する区画（A1〜C4・未指定時は全体グリッド）',
        type: OPT_STRING,
        required: false,
        choices: AREA_CHOICES,
      },
    ],
  },
  {
    name: 'rename_role',
    description: '自国のwplaceカラーロール名を変更します',
    options: [
      {
        name: 'name',
        description: '新しいロール名（1〜20文字）',
        type: OPT_STRING,
        required: true,
      },
      {
        name: 'role',
        description: '複数のカラーロールを所持している場合の変更対象ロール',
        type: OPT_ROLE,
        required: false,
      },
    ],
  },
  {
    name: 'nations',
    description: 'サーバー内のjplace国家（wplaceカラーロール）一覧を表示します',
  },
  {
    name: 'action',
    description: '公式外交宣言・条約締結を行います',
    options: [
      {
        name: 'type',
        description: '外交アクション種別（全11種）',
        type: OPT_STRING,
        required: true,
        choices: ACTION_TYPES.map((t) => ({ name: t.label, value: t.value })),
      },
      {
        name: 'target',
        description: '対象となる相手国ロール',
        type: OPT_ROLE,
        required: false,
      },
      {
        name: 'title',
        description: '「その他宣言」用の自由タイトル',
        type: OPT_STRING,
        required: false,
      },
      {
        name: 'message',
        description: '声明文・補足メッセージ',
        type: OPT_STRING,
        required: false,
      },
      {
        name: 'my_role',
        description: '複数のカラーロールを所持している場合の自国ロール指定',
        type: OPT_ROLE,
        required: false,
      },
    ],
  },
  {
    name: 'setup_color_roles',
    description: '【管理者限定】wplaceカラーロールの初期セットアップを行います',
    default_member_permissions: '8',
    options: [
      {
        name: 'limit',
        description: '一括作成する最大数（1〜61・既定: 20）',
        type: OPT_INTEGER,
        required: false,
      },
    ],
  },
  {
    name: 'color_panel',
    description: 'wplaceカラーパレット一覧および作成済みカラーロール一覧を表示します',
  },
  {
    name: 'role_directory',
    description: 'サーバー内のwplaceカラーロール一覧を表示します',
  },
  {
    name: 'color_match',
    description: '指定した色またはロール色に最も近いwplaceカラーを検索します',
    options: [
      {
        name: 'query',
        description: '16進カラーコード（例: #4093E4）または色名',
        type: OPT_STRING,
        required: false,
      },
      {
        name: 'role',
        description: '基準にするロール',
        type: OPT_ROLE,
        required: false,
      },
    ],
  },
  {
    name: 'avatar',
    description: 'ユーザーのアバター画像を表示します',
    options: [
      {
        name: 'user',
        description: '対象ユーザー（未指定時は自分）',
        type: OPT_USER,
        required: false,
      },
    ],
  },
  {
    name: 'server_info',
    description: 'サーバーの基本情報を表示します',
  },
  {
    name: 'user_info',
    description: 'ユーザーの基本情報とwplaceカラーロールを表示します',
    options: [
      {
        name: 'user',
        description: '対象ユーザー（未指定時は自分）',
        type: OPT_USER,
        required: false,
      },
    ],
  },
  {
    name: 'ping',
    description: 'Botの応答状態を確認します',
  },
  {
    name: 'help',
    description: 'Jpace-bot v2 のコマンド一覧と使い方を表示します',
  },
  {
    name: 'register',
    description: '最新のコマンド一覧をDiscordに登録・再同期します',
    options: [
      {
        name: 'scope',
        description: '登録先（auto / guild / global）',
        type: OPT_STRING,
        required: false,
        choices: [
          { name: 'auto（自動判定）', value: 'auto' },
          { name: 'guild（現在のサーバー）', value: 'guild' },
          { name: 'global（グローバル）', value: 'global' },
        ],
      },
    ],
  },
];

// ==========================================
// 色・文字列・ロール判定ヘルパー
// ==========================================
function formatHex6(colorInt) {
  return (Number(colorInt || 0) & 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

function hexToRgb(hex) {
  const clean = String(hex || '').replace(/^#/, '').trim();
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function resolveColorEntry(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  const byKey = WPLACE_BY_KEY.get(trimmed.toLowerCase());
  if (byKey) return byKey;

  const cleanHex = trimmed.replace(/^#/, '').toUpperCase();
  if (/^[0-9A-F]{6}$/.test(cleanHex)) {
    const exact = WPLACE_BY_HEX.get(cleanHex);
    if (exact) return exact;
    return findNearestWplaceColor(cleanHex);
  }

  const byName = WPLACE_COLORS.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
  if (byName) return byName;

  return WPLACE_COLORS.find(
    (c) =>
      c.name.toLowerCase().includes(trimmed.toLowerCase()) ||
      c.key.toLowerCase().includes(trimmed.toLowerCase())
  ) || null;
}

function findNearestWplaceColor(hex6) {
  const target = hexToRgb(hex6);
  if (!target) return WPLACE_COLORS[0];
  let best = WPLACE_COLORS[0];
  let bestDist = Infinity;
  for (const c of WPLACE_COLORS) {
    const rgb = hexToRgb(c.hex);
    if (!rgb) continue;
    const dr = rgb[0] - target[0];
    const dg = rgb[1] - target[1];
    const db = rgb[2] - target[2];
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  }
  return best;
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

function validateRoleName(rawName) {
  const name = String(rawName || '').trim();
  if (name.length < 1 || name.length > 20) {
    return { ok: false, error: 'ロール名は1文字以上20文字以内で指定してください。' };
  }
  if (/@everyone|@here|<@!?[0-9]+>|<@&[0-9]+>|<#[0-9]+>/.test(name)) {
    return { ok: false, error: 'ロール名に @everyone / @here / メンション文字列は使用できません。' };
  }
  return { ok: true, name };
}

function sanitizeDisplayText(text) {
  return String(text || '').replace(/@(everyone|here)/gi, '@\u200b$1');
}

// ==========================================
// Discord REST API Helpers
// ==========================================
async function discordApi(env, endpoint, options = {}) {
  const method = options.method || 'GET';
  const url = `https://discord.com/api/v10${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
      ...(options.body && !(options.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options.headers,
    },
  });
  return res;
}

async function fetchGuild(env, guildId) {
  const res = await discordApi(env, `/guilds/${guildId}?with_counts=true`, { method: 'GET' });
  if (!res.ok) return null;
  return res.json();
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
  if (!res.ok) return null;
  return res.json();
}

async function fetchGuildMembersAll(env, guildId) {
  const members = [];
  let after = '0';
  for (let page = 0; page < 10; page++) {
    const res = await discordApi(env, `/guilds/${guildId}/members?limit=1000&after=${after}`, {
      method: 'GET',
    });
    if (!res.ok) break;
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    members.push(...batch);
    if (batch.length < 1000) break;
    after = batch[batch.length - 1]?.user?.id || '0';
  }
  return members;
}

function getUserWplaceRoles(guildRoles, member, resolvedRoles = null) {
  const memberRoleIds = new Set(member?.roles || []);
  const mapById = new Map();
  for (const r of guildRoles || []) {
    if (memberRoleIds.has(r.id) && isWplaceColorRole(r)) {
      mapById.set(r.id, r);
    }
  }
  if (resolvedRoles) {
    for (const roleId of memberRoleIds) {
      const rr = resolvedRoles[roleId];
      if (rr && isWplaceColorRole(rr) && !mapById.has(rr.id)) {
        mapById.set(rr.id, rr);
      }
    }
  }
  return Array.from(mapById.values());
}

function resolveTargetWplaceRole(guildRoles, member, specifiedRoleId, resolvedRoles = null) {
  const wplaceRoles = getUserWplaceRoles(guildRoles, member, resolvedRoles);
  if (specifiedRoleId) {
    const found =
      (guildRoles || []).find((r) => r.id === specifiedRoleId) ||
      (resolvedRoles ? resolvedRoles[specifiedRoleId] : null);
    if (!found) {
      return { error: '指定されたロールが見つかりません。' };
    }
    if (!isWplaceColorRole(found)) {
      return { error: '指定されたロールはwplaceカラーロール（または管理者ロール）ではありません。' };
    }
    if (member?.roles && !member.roles.includes(found.id)) {
      return { error: '指定されたwplaceカラーロールを所持していません。' };
    }
    return { role: found };
  }

  if (wplaceRoles.length === 0) {
    return { error: 'wplaceカラーロールを所持していません。' };
  }
  if (wplaceRoles.length > 1) {
    return {
      error: `複数のwplaceカラーロールを所持しています（${wplaceRoles.map((r) => r.name).join(', ')}）。対象ロールを指定してください。`,
    };
  }
  return { role: wplaceRoles[0] };
}

// ==========================================
// Components V2 Builders & Payload Formatter
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

function sectionComp(textContent, accessory) {
  return {
    type: COMP_SECTION,
    components: [textComp(textContent)],
    accessory,
  };
}

function thumbnailAccessory(url, description = '') {
  const obj = { media: { url } };
  if (description) obj.description = description;
  return obj;
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
        components: [textComp(`**エラー**\n${sanitizeDisplayText(message)}`)],
      }),
    ],
  };
}

function infoV2(title, lines, { ephemeral = false, accentColor = 0x4093e4, componentsExtra = [] } = {}) {
  const bodyText = Array.isArray(lines) ? lines.join('\n') : String(lines);
  return {
    ephemeral,
    components: [
      containerComp({
        accentColor,
        components: [textComp(`**${sanitizeDisplayText(title)}**\n${sanitizeDisplayText(bodyText)}`), ...componentsExtra],
      }),
    ],
  };
}

// ==========================================
// コマンド登録管理（/register & 自動登録）
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
        error: 'guild 指定ですがサーバーIDが見つかりません',
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
    return {
      ok: false,
      skipped: true,
      reason: !token ? 'DISCORD_TOKEN が未設定です' : target.error,
      scope: target.scope || 'unknown',
      status: null,
      registered: [],
      errorBody: '',
    };
  }

  try {
    const res = await fetch(target.endpoint, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(COMMANDS_LIST),
    });

    const responseText = await res.text();
    if (res.ok) {
      let registeredNames = COMMANDS_LIST.map((c) => c.name);
      try {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed)) {
          registeredNames = parsed.map((item) => item.name).filter(Boolean);
        }
      } catch {
        // ignore JSON parse failure
      }
      registeredScopes.add(target.scope);
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
    return {
      ok: false,
      skipped: false,
      reason: `通信失敗: ${err?.message || String(err)}`,
      scope: target.scope,
      status: null,
      registered: [],
      errorBody: '',
    };
  }
}

async function registerSlashCommandsIfNeeded(env, guildId = null) {
  const tasks = [];
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
// 画像生成・加工（photon-wasm メモリ安全管理）
// ==========================================
async function createMergedPhotonImage() {
  const canvasBuffer = new Uint8Array(CROP_WIDTH * CROP_HEIGHT * 4);
  for (let i = 0; i < canvasBuffer.length; i += 4) {
    canvasBuffer[i] = 138;
    canvasBuffer[i + 1] = 172;
    canvasBuffer[i + 2] = 246;
    canvasBuffer[i + 3] = 255;
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
              const ab = await res.arrayBuffer();
              const tileImg = PhotonImage.new_from_byteslice(new Uint8Array(ab));
              return { tileImg, x, y };
            })
            .catch(() => null)
        );
      }
    }

    const results = await Promise.all(fetchPromises);
    for (const item of results) {
      if (item && item.tileImg) {
        try {
          const posX = item.x * 1000 - CROP_X;
          const posY = item.y * 1000 - CROP_Y;
          canvas.blend(item.tileImg, posX, posY, 'over');
        } finally {
          item.tileImg.free();
        }
      }
    }
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

async function createHighlightImageBuffer(targetHex6) {
  const targetRgb = hexToRgb(targetHex6);
  const canvas = await createMergedPhotonImage();
  try {
    const width = canvas.get_width();
    const height = canvas.get_height();
    const raw = canvas.get_raw_pixels();
    const outBuf = new Uint8Array(raw.length);

    const tr = targetRgb ? targetRgb[0] : -1;
    const tg = targetRgb ? targetRgb[1] : -1;
    const tb = targetRgb ? targetRgb[2] : -1;

    for (let i = 0; i < raw.length; i += 4) {
      const r = raw[i];
      const g = raw[i + 1];
      const b = raw[i + 2];
      const a = raw[i + 3];

      if (r === tr && g === tg && b === tb) {
        outBuf[i] = r;
        outBuf[i + 1] = g;
        outBuf[i + 2] = b;
        outBuf[i + 3] = a;
      } else {
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        outBuf[i] = gray;
        outBuf[i + 1] = gray;
        outBuf[i + 2] = gray;
        outBuf[i + 3] = a;
      }
    }

    const outImg = new PhotonImage(outBuf, width, height);
    try {
      return outImg.get_bytes().buffer;
    } finally {
      outImg.free();
    }
  } finally {
    canvas.free();
  }
}

function drawRectOutline(buf, width, height, x0, y0, x1, y1, thickness, rgba) {
  const [r, g, b, a] = rgba;
  const cx0 = Math.max(0, Math.floor(x0));
  const cy0 = Math.max(0, Math.floor(y0));
  const cx1 = Math.min(width - 1, Math.ceil(x1));
  const cy1 = Math.min(height - 1, Math.ceil(y1));

  const putPixel = (px, py) => {
    if (px < 0 || px >= width || py < 0 || py >= height) return;
    const idx = (py * width + px) * 4;
    buf[idx] = r;
    buf[idx + 1] = g;
    buf[idx + 2] = b;
    buf[idx + 3] = a;
  };

  for (let t = 0; t < thickness; t++) {
    for (let x = cx0; x <= cx1; x++) {
      putPixel(x, cy0 + t);
      putPixel(x, cy1 - t);
    }
    for (let y = cy0; y <= cy1; y++) {
      putPixel(cx0 + t, y);
      putPixel(cx1 - t, y);
    }
  }
}

function computeSectorRect(totalWidth, totalHeight, areaCode) {
  if (!areaCode) return null;
  const norm = String(areaCode).trim().toUpperCase();
  if (!/^[ABC][1234]$/.test(norm)) return null;
  const colIdx = SECTOR_COLS.indexOf(norm[0]);
  const rowIdx = SECTOR_ROWS.indexOf(norm[1]);
  if (colIdx < 0 || rowIdx < 0) return null;

  const cols = SECTOR_COLS.length; // 3
  const rows = SECTOR_ROWS.length; // 4
  const x = Math.round((colIdx * totalWidth) / cols);
  const y = Math.round((rowIdx * totalHeight) / rows);
  const nextX = Math.round(((colIdx + 1) * totalWidth) / cols);
  const nextY = Math.round(((rowIdx + 1) * totalHeight) / rows);

  return {
    code: norm,
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

    const sector = computeSectorRect(width, height, areaCode);
    if (!sector) {
      const cols = SECTOR_COLS.length;
      const rows = SECTOR_ROWS.length;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x0 = Math.round((c * width) / cols);
          const y0 = Math.round((r * height) / rows);
          const x1 = Math.round(((c + 1) * width) / cols) - 1;
          const y1 = Math.round(((r + 1) * height) / rows) - 1;
          drawRectOutline(buf, width, height, x0, y0, x1, y1, 4, [255, 255, 255, 235]);
          drawRectOutline(buf, width, height, x0 + 4, y0 + 4, x1 - 4, y1 - 4, 2, [20, 24, 32, 225]);
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
// UI コンポーネント構築（Components V2）
// ==========================================
function buildMapComponents(filename, captionText, accentColor = 0x4093e4) {
  return [
    containerComp({
      accentColor,
      components: [
        textComp(`**jplace 戦況マップ**\n${sanitizeDisplayText(captionText)}`),
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
        description: `${c}列 / ${r}行（${code}）を拡大表示`,
        default: selectedArea === code,
      });
    }
  }
  return actionRowComp([
    stringSelectComp({
      customId: 'sector_select',
      placeholder: selectedArea ? `選択中: ${selectedArea}（区画切替）` : '区画（A1〜C4）を選択して拡大',
      options,
    }),
  ]);
}

function buildSectorCardComponents(filename, captionText, selectedArea = null) {
  return [
    containerComp({
      accentColor: 0x10aea6,
      components: [
        textComp(`**jplace 区画マップ**\n${sanitizeDisplayText(captionText)}`),
        mediaGalleryComp(filename, captionText),
        sepComp(),
        buildSectorSelectRow(selectedArea),
      ],
    }),
  ];
}

function buildNationsCardComponents(guildRoles, members = []) {
  const colorRoles = (guildRoles || [])
    .filter(isWplaceColorRole)
    .sort((a, b) => (b.position || 0) - (a.position || 0));

  const countByRoleId = new Map();
  for (const m of members || []) {
    for (const rid of m.roles || []) {
      countByRoleId.set(rid, (countByRoleId.get(rid) || 0) + 1);
    }
  }

  const lines =
    colorRoles.length > 0
      ? colorRoles.map((r, idx) => {
          const hex = formatHex6(r.color);
          const countText = Array.isArray(members) && members.length > 0
            ? `${countByRoleId.get(r.id) || 0}名`
            : '集計対象外';
          return `${idx + 1}. **${sanitizeDisplayText(r.name)}** — \`#${hex}\`（${countText}）`;
        })
      : ['サーバー内にwplaceカラーロールは見つかりませんでした。'];

  return [
    containerComp({
      accentColor: 0x28509e,
      components: [
        textComp(`**jplace 国家一覧**\n登録カラーロール数: ${colorRoles.length}件\n\n${lines.join('\n')}`),
        sepComp(),
        actionRowComp([
          buttonComp({ customId: 'nations_refresh', label: '最新情報に更新', style: BUTTON_PRIMARY }),
        ]),
      ],
    }),
  ];
}

function buildColorPanelComponents(mode = 'palette', guildRoles = []) {
  if (mode === 'created') {
    const colorRoles = (guildRoles || [])
      .filter(isWplaceColorRole)
      .sort((a, b) => (b.position || 0) - (a.position || 0));
    const lines =
      colorRoles.length > 0
        ? colorRoles.map((r, i) => `${i + 1}. **${sanitizeDisplayText(r.name)}** — \`#${formatHex6(r.color)}\``)
        : ['作成済みのwplaceカラーロールはありません。'];

    return [
      containerComp({
        accentColor: 0x0eb968,
        components: [
          textComp(`**作成済みカラーロール一覧**\n合計: ${colorRoles.length}件\n\n${lines.join('\n')}`),
          sepComp(),
          actionRowComp([
            buttonComp({ customId: 'color_panel_palette', label: '標準パレットへ切替', style: BUTTON_SECONDARY }),
          ]),
        ],
      }),
    ];
  }

  const lines = WPLACE_COLORS.map((c, idx) => `${idx + 1}. **${c.name}** (\`${c.key}\`) — \`#${c.hex}\``);
  return [
    containerComp({
      accentColor: 0x4093e4,
      components: [
        textComp(`**wplace 標準カラーパレット（全${WPLACE_COLORS.length}色）**\n\n${lines.join('\n')}`),
        sepComp(),
        actionRowComp([
          buttonComp({ customId: 'color_panel_created', label: '作成済み一覧へ切替', style: BUTTON_PRIMARY }),
        ]),
      ],
    }),
  ];
}

function extractApprovedLinesFromText(text) {
  const match = String(text || '').match(/公認国一覧:\s*\n([\s\S]*?)(\n\n|$)/);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '));
}

function formatNeutralBody({ actorRoleName, actorHex, messageText, approvedLines, statusNote }) {
  const approvedBlock = approvedLines.length > 0 ? approvedLines.join('\n') : '- まだ公認国はありません';
  const parts = [
    `**永世中立宣言**`,
    `宣言国: **${sanitizeDisplayText(actorRoleName)}** (\`#${actorHex}\`)`,
    `現在の状態: **${sanitizeDisplayText(statusNote)}**`,
  ];
  if (messageText) {
    parts.push(`声明文: ${sanitizeDisplayText(messageText)}`);
  }
  parts.push(`公認国一覧:\n${approvedBlock}`);
  return parts.join('\n');
}

function buildActionCard({
  actionType,
  actorRole,
  targetRole = null,
  customTitle = '',
  messageText = '',
  statusLabel = '発効中',
  approvedLines = [],
}) {
  const spec = ACTION_TYPE_MAP.get(actionType) || ACTION_TYPE_MAP.get('custom');
  const actorHex = formatHex6(actorRole.color);
  const accentColor = parseInt(actorHex, 16) || 0x4093e4;

  const heading =
    actionType === 'custom' && customTitle
      ? `${spec.label} — ${sanitizeDisplayText(customTitle)}`
      : spec.label;

  let body = '';
  let actionRow = null;

  if (spec.category === 'neutrality') {
    body = formatNeutralBody({
      actorRoleName: actorRole.name,
      actorHex,
      messageText,
      approvedLines,
      statusNote: statusLabel,
    });
    actionRow = actionRowComp([
      buttonComp({
        customId: `neutral_approve:${actorRole.id}`,
        label: '公認する',
        style: BUTTON_SUCCESS,
      }),
      buttonComp({
        customId: `neutral_revoke:${actorRole.id}`,
        label: '公認を取り消す',
        style: BUTTON_DANGER,
      }),
    ]);
  } else if (spec.category === 'consensus') {
    const targetHex = targetRole ? formatHex6(targetRole.color) : '000000';
    const lines = [
      `**${heading}**`,
      `提案国: **${sanitizeDisplayText(actorRole.name)}** (\`#${actorHex}\`)`,
      targetRole ? `相手国: **${sanitizeDisplayText(targetRole.name)}** (\`#${targetHex}\`)` : '',
      `状態: **${sanitizeDisplayText(statusLabel)}**`,
      messageText ? `声明文: ${sanitizeDisplayText(messageText)}` : '',
    ].filter(Boolean);
    body = lines.join('\n');

    const isPending = statusLabel === '承認待ち';
    if (isPending && targetRole) {
      actionRow = actionRowComp([
        buttonComp({
          customId: `act_accept:${actionType}:${actorRole.id}:${targetRole.id}`,
          label: '承認する',
          style: BUTTON_SUCCESS,
        }),
        buttonComp({
          customId: `act_reject:${actionType}:${actorRole.id}:${targetRole.id}`,
          label: '拒否する',
          style: BUTTON_DANGER,
        }),
        buttonComp({
          customId: `act_cancel:${actionType}:${actorRole.id}:${targetRole.id}`,
          label: '取り下げる',
          style: BUTTON_SECONDARY,
        }),
      ]);
    }
  } else {
    const targetHex = targetRole ? formatHex6(targetRole.color) : '';
    const lines = [
      `**${heading}**`,
      `宣言国: **${sanitizeDisplayText(actorRole.name)}** (\`#${actorHex}\`)`,
      targetRole ? `対象国: **${sanitizeDisplayText(targetRole.name)}** (\`#${targetHex}\`)` : '',
      `状態: **${sanitizeDisplayText(statusLabel)}**`,
      messageText ? `声明文: ${sanitizeDisplayText(messageText)}` : '',
    ].filter(Boolean);
    body = lines.join('\n');
  }

  const comps = [textComp(body)];
  if (actionRow) {
    comps.push(sepComp());
    comps.push(actionRow);
  }

  return [containerComp({ accentColor, components: comps })];
}

// ==========================================
// Webhook / Channel Poster Helpers
// ==========================================
async function sendDeferredWebhookResult(interaction, result, { ephemeral = false } = {}) {
  const appId = interaction.application_id;
  const token = interaction.token;
  if (!appId || !token) return;

  const endpoint = `https://discord.com/api/v10/webhooks/${encodeURIComponent(appId)}/${encodeURIComponent(token)}/messages/@original`;
  const payload = buildV2Payload(result, { ephemeral });

  await fetch(endpoint, {
    method: 'PATCH',
    headers: payload.headers,
    body: payload.body,
  });
}

async function postMapToChannel(env, channelId, captionText = '定期戦況マップ') {
  const buffer = await createMergedImageBuffer();
  const filename = 'jplace-map.png';
  const payload = buildV2Payload(
    {
      file: { name: filename, buffer, description: 'jplace 戦況マップ' },
      components: buildMapComponents(filename, captionText),
    },
    { ephemeral: false }
  );

  const res = await fetch(`https://discord.com/api/v10/channels/${encodeURIComponent(channelId)}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
      ...payload.headers,
    },
    body: payload.body,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`チャンネル送信に失敗しました (HTTP ${res.status}): ${errText.slice(0, 300)}`);
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
  if (!publicKeyHex) return true;
  const signatureHex = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  if (!signatureHex || !timestamp) return false;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      hexToUint8Array(publicKeyHex),
      { name: 'Ed25519' },
      false,
      ['verify']
    );
    const msg = new TextEncoder().encode(timestamp + rawBodyText);
    return await crypto.subtle.verify('Ed25519', key, hexToUint8Array(signatureHex), msg);
  } catch {
    return false;
  }
}

// ==========================================
// Autocomplete Handler (type: 4)
// ==========================================
function handleAutocomplete(interaction) {
  const focused = interaction.data?.options?.find((o) => o.focused);
  const query = String(focused?.value || '').trim().toLowerCase();

  const matches = WPLACE_COLORS.filter((c) => {
    if (!query) return true;
    return (
      c.name.toLowerCase().includes(query) ||
      c.key.toLowerCase().includes(query) ||
      c.hex.toLowerCase().includes(query.replace(/^#/, ''))
    );
  }).slice(0, 25);

  return new Response(
    JSON.stringify({
      type: RESPONSE_AUTOCOMPLETE_RESULT,
      data: {
        choices: matches.map((c) => ({
          name: `${c.name} (#${c.hex})`,
          value: c.key,
        })),
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

// ==========================================
// Application Command Handler (type: 2)
// ==========================================
function getOptValue(interaction, name) {
  const opt = interaction.data?.options?.find((o) => o.name === name);
  return opt ? opt.value : undefined;
}

async function handleApplicationCommand(interaction, env, ctx) {
  const cmdName = interaction.data?.name || '';
  const guildId = interaction.guild_id || null;
  const actorUser = interaction.member?.user || interaction.user || null;
  const resolvedRoles = interaction.data?.resolved?.roles || null;
  const resolvedUsers = interaction.data?.resolved?.users || null;

  // 1. 即時応答可能な軽量コマンド
  if (cmdName === 'ping') {
    const payload = buildV2Payload(
      infoV2('Pong', ['Jpace-bot v2 は正常に応答しています。'], { ephemeral: false, accentColor: 0x13e67b }),
      { ephemeral: false }
    );
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

  if (cmdName === 'help') {
    const helpLines = [
      '**戦況マップ・分析**',
      '- `/now`: 現在の合成マップ表示（更新・自国ハイライトボタン付き）',
      '- `/post_now`: 指定チャンネルへ戦況マップを送信',
      '- `/highlight color:<色>`: 指定色を残し他をグレースケール化',
      '- `/sector area:<A1〜C4>`: 12区画グリッド表示および区画拡大',
      '',
      '**国家・外交**',
      '- `/rename_role name:<名前>`: 自国のwplaceカラーロール名を変更',
      '- `/nations`: 国家（wplaceカラーロール）一覧を表示',
      '- `/action type:<種別>`: 公式外交宣言・条約締結を実行',
      '',
      '**管理・ユーティリティ**',
      '- `/setup_color_roles`（管理者限定）: カラーロール一括作成',
      '- `/color_panel`, `/role_directory`, `/color_match`, `/avatar`, `/server_info`, `/user_info`, `/ping`, `/register`',
    ];
    const payload = buildV2Payload(
      infoV2('Jpace-bot v2 ヘルプ', helpLines, { ephemeral: true, accentColor: 0x4093e4 }),
      { ephemeral: true }
    );
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

  if (cmdName === 'color_match') {
    const queryVal = getOptValue(interaction, 'query');
    const roleIdVal = getOptValue(interaction, 'role');
    let sourceHex = '';
    let sourceLabel = '';

    if (roleIdVal && resolvedRoles?.[roleIdVal]) {
      const r = resolvedRoles[roleIdVal];
      sourceHex = formatHex6(r.color);
      sourceLabel = `ロール「${sanitizeDisplayText(r.name)}」(\`#${sourceHex}\`)`;
    } else if (queryVal) {
      const clean = String(queryVal).replace(/^#/, '').trim().toUpperCase();
      if (/^[0-9A-F]{6}$/.test(clean)) {
        sourceHex = clean;
        sourceLabel = `カラーコード \`#${sourceHex}\``;
      } else {
        const direct = resolveColorEntry(queryVal);
        if (direct) {
          sourceHex = direct.hex;
          sourceLabel = `指定色「${direct.name}」(\`#${sourceHex}\`)`;
        }
      }
    }

    if (!sourceHex) {
      const payload = buildV2Payload(
        errorV2('`#RRGGBB` 形式のカラーコード、色名、または `role` を指定してください。', true),
        { ephemeral: true }
      );
      return new Response(payload.body, { status: 200, headers: payload.headers });
    }

    const matched = findNearestWplaceColor(sourceHex);
    const payload = buildV2Payload(
      infoV2(
        'wplace カラーマッチング結果',
        [
          `入力: ${sourceLabel}`,
          `最も近い標準色: **${matched.name}** (\`${matched.key}\`) — \`#${matched.hex}\``,
        ],
        { ephemeral: true, accentColor: parseInt(matched.hex, 16) }
      ),
      { ephemeral: true }
    );
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

  if (cmdName === 'avatar') {
    const targetUserId = getOptValue(interaction, 'user') || actorUser?.id;
    const u = (targetUserId && resolvedUsers?.[targetUserId]) || actorUser;
    if (!u) {
      const payload = buildV2Payload(errorV2('ユーザー情報を取得できませんでした。', true), { ephemeral: true });
      return new Response(payload.body, { status: 200, headers: payload.headers });
    }
    const avatarUrl = u.avatar
      ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=512`
      : `https://cdn.discordapp.com/embed/avatars/${(BigInt(u.id) >> 22n) % 6n}.png`;
    const comps = [
      containerComp({
        accentColor: 0x4093e4,
        components: [
          sectionComp(
            `**アバター表示**\n対象: **${sanitizeDisplayText(u.global_name || u.username)}**`,
            thumbnailAccessory(avatarUrl, 'ユーザーアバター')
          ),
        ],
      }),
    ];
    const payload = buildV2Payload({ components: comps }, { ephemeral: false });
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

  // 2. API呼び出し・画像生成を伴うコマンドは Deferred（type: 5）で即時応答し裏側で処理
  const isEphemeralDeferred = cmdName === 'register';
  const bgTask = (async () => {
    try {
      if (cmdName === 'register') {
        const scopeOpt = getOptValue(interaction, 'scope') || 'auto';
        const guildIdOverride = scopeOpt === 'guild' ? guildId : null;
        const reg = await registerSlashCommands(env, {
          source: 'slash:/register',
          scopeMode: scopeOpt,
          guildIdOverride,
        });
        if (reg.ok) {
          await sendDeferredWebhookResult(
            interaction,
            infoV2(
              'コマンド登録完了',
              [
                `スコープ: \`${reg.scope}\` (HTTP ${reg.status})`,
                `登録数: ${reg.registered.length}件`,
                `コマンド: ${reg.registered.map((n) => `\`/${n}\``).join(', ')}`,
              ],
              { ephemeral: true, accentColor: 0x13e67b }
            ),
            { ephemeral: true }
          );
        } else {
          await sendDeferredWebhookResult(
            interaction,
            errorV2(`理由: ${reg.reason}\nスコープ: \`${reg.scope}\``, true),
            { ephemeral: true }
          );
        }
        return;
      }

      if (cmdName === 'now') {
        const buffer = await createMergedImageBuffer();
        const filename = 'jplace-map.png';
        await sendDeferredWebhookResult(
          interaction,
          {
            file: { name: filename, buffer, description: 'jplace 戦況マップ' },
            components: buildMapComponents(filename, '最新のタイル合成マップを表示中'),
          },
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'post_now') {
        if (!CHANNEL_ID) {
          await sendDeferredWebhookResult(interaction, errorV2('送信先 CHANNEL_ID が未設定です。', true), {
            ephemeral: true,
          });
          return;
        }
        await postMapToChannel(env, CHANNEL_ID, '手動送信された最新戦況マップ');
        await sendDeferredWebhookResult(
          interaction,
          infoV2('送信完了', [`チャンネル <#${CHANNEL_ID}> へ最新戦況マップを送信しました。`], {
            ephemeral: true,
            accentColor: 0x13e67b,
          }),
          { ephemeral: true }
        );
        return;
      }

      if (cmdName === 'highlight') {
        const rawColor = getOptValue(interaction, 'color');
        const entry = resolveColorEntry(rawColor);
        if (!entry) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2('指定された色が見つかりませんでした。候補から選択するか `#RRGGBB` を指定してください。', true),
            { ephemeral: true }
          );
          return;
        }
        const buffer = await createHighlightImageBuffer(entry.hex);
        const filename = `highlight-${entry.key}.png`;
        const comps = [
          containerComp({
            accentColor: parseInt(entry.hex, 16) || 0x4093e4,
            components: [
              textComp(
                `**特定色強調マップ — ${entry.name} (\`#${entry.hex}\`)**\n指定色のみを維持し、その他の領域をグレースケール表示しています。`
              ),
              mediaGalleryComp(filename, `${entry.name} 強調マップ`),
            ],
          }),
        ];
        await sendDeferredWebhookResult(
          interaction,
          { file: { name: filename, buffer, description: `${entry.name} 強調マップ` }, components: comps },
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'sector') {
        const areaOpt = getOptValue(interaction, 'area') || null;
        if (areaOpt && !/^[ABC][1234]$/.test(String(areaOpt).toUpperCase())) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2('区画は A1〜C4 の形式で指定してください。', true),
            { ephemeral: true }
          );
          return;
        }
        const normArea = areaOpt ? String(areaOpt).toUpperCase() : null;
        const buffer = await createSectorImageBuffer(normArea);
        const filename = normArea ? `sector-${normArea}.png` : 'sector-grid.png';
        const caption = normArea
          ? `区画 ${normArea} の拡大マップ（全体 3x4 分割のうち ${normArea}）`
          : '全体マップ（横3列 A〜C × 縦4行 1〜4 の12区画グリッド）';
        await sendDeferredWebhookResult(
          interaction,
          {
            file: { name: filename, buffer, description: caption },
            components: buildSectorCardComponents(filename, caption, normArea),
          },
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'rename_role') {
        if (!guildId || !actorUser?.id) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }
        const rawName = getOptValue(interaction, 'name');
        const specifiedRoleId = getOptValue(interaction, 'role');
        const nameCheck = validateRoleName(rawName);
        if (!nameCheck.ok) {
          await sendDeferredWebhookResult(interaction, errorV2(nameCheck.error, true), { ephemeral: true });
          return;
        }

        const [guildRoles, member] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMember(env, guildId, actorUser.id),
        ]);
        const resolved = resolveTargetWplaceRole(guildRoles, member, specifiedRoleId, resolvedRoles);
        if (resolved.error) {
          await sendDeferredWebhookResult(interaction, errorV2(resolved.error, true), { ephemeral: true });
          return;
        }

        const targetRole = resolved.role;
        const oldName = targetRole.name;
        const patchRes = await discordApi(env, `/guilds/${guildId}/roles/${targetRole.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ name: nameCheck.name }),
        });
        if (!patchRes.ok) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2(`ロール名の変更に失敗しました (HTTP ${patchRes.status})。Botのロール管理権限を確認してください。`, true),
            { ephemeral: true }
          );
          return;
        }

        const hex = formatHex6(targetRole.color);
        await sendDeferredWebhookResult(
          interaction,
          infoV2(
            '自国ロール名を変更しました',
            [
              `カラーコード: \`#${hex}\``,
              `変更前: **${sanitizeDisplayText(oldName)}**`,
              `変更後: **${sanitizeDisplayText(nameCheck.name)}**`,
            ],
            { ephemeral: false, accentColor: parseInt(hex, 16) || 0x13e67b }
          ),
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'nations' || cmdName === 'role_directory') {
        if (!guildId) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }
        const [guildRoles, members] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMembersAll(env, guildId),
        ]);
        await sendDeferredWebhookResult(
          interaction,
          { components: buildNationsCardComponents(guildRoles, members) },
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'color_panel') {
        const guildRoles = guildId ? await fetchGuildRoles(env, guildId) : [];
        await sendDeferredWebhookResult(
          interaction,
          { components: buildColorPanelComponents('palette', guildRoles) },
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'setup_color_roles') {
        if (!guildId || !actorUser?.id) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }
        const member = interaction.member || (await fetchGuildMember(env, guildId, actorUser.id));
        if (!hasAdminPermission(member)) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2('このコマンドは管理者（Administrator）権限を持つユーザーのみ実行できます。', true),
            { ephemeral: true }
          );
          return;
        }

        const rawLimit = Number(getOptValue(interaction, 'limit') ?? 20);
        const limit = Math.max(1, Math.min(WPLACE_COLORS.length, Number.isFinite(rawLimit) ? rawLimit : 20));
        const existingRoles = await fetchGuildRoles(env, guildId);
        const existingHexes = new Set(existingRoles.map((r) => formatHex6(r.color)));

        let createdCount = 0;
        let skippedCount = 0;
        for (const c of WPLACE_COLORS.slice(0, limit)) {
          if (existingHexes.has(c.hex.toUpperCase())) {
            skippedCount++;
            continue;
          }
          const createRes = await discordApi(env, `/guilds/${guildId}/roles`, {
            method: 'POST',
            body: JSON.stringify({
              name: `${c.name} (#${c.hex})`.slice(0, 100),
              color: parseInt(c.hex, 16),
              mentionable: false,
            }),
          });
          if (createRes.ok) {
            createdCount++;
            existingHexes.add(c.hex.toUpperCase());
          }
        }

        await sendDeferredWebhookResult(
          interaction,
          infoV2(
            'wplace カラーロール セットアップ完了',
            [
              `対象色数: ${limit}色`,
              `新規作成: ${createdCount}件`,
              `既存スキップ: ${skippedCount}件`,
            ],
            { ephemeral: true, accentColor: 0x13e67b }
          ),
          { ephemeral: true }
        );
        return;
      }

      if (cmdName === 'action') {
        if (!guildId || !actorUser?.id) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }

        const actionType = String(getOptValue(interaction, 'type') || '');
        const spec = ACTION_TYPE_MAP.get(actionType);
        if (!spec) {
          await sendDeferredWebhookResult(interaction, errorV2('不明な外交アクション種別です。', true), {
            ephemeral: true,
          });
          return;
        }

        const targetRoleId = getOptValue(interaction, 'target');
        const myRoleId = getOptValue(interaction, 'my_role');
        const customTitle = String(getOptValue(interaction, 'title') || '').trim();
        const messageText = String(getOptValue(interaction, 'message') || '').trim();

        const [guildRoles, member] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMember(env, guildId, actorUser.id),
        ]);

        const actorResolved = resolveTargetWplaceRole(guildRoles, member, myRoleId, resolvedRoles);
        if (actorResolved.error) {
          await sendDeferredWebhookResult(interaction, errorV2(actorResolved.error, true), { ephemeral: true });
          return;
        }
        const actorRole = actorResolved.role;

        let targetRole = null;
        if (targetRoleId) {
          const tRole =
            guildRoles.find((r) => r.id === targetRoleId) || (resolvedRoles ? resolvedRoles[targetRoleId] : null);
          if (!tRole || !isWplaceColorRole(tRole)) {
            await sendDeferredWebhookResult(
              interaction,
              errorV2('対象ロールは有効なwplaceカラーロール（管理者以外）である必要があります。', true),
              { ephemeral: true }
            );
            return;
          }
          if (tRole.id === actorRole.id) {
            await sendDeferredWebhookResult(interaction, errorV2('自国ロールを対象に指定することはできません。', true), {
              ephemeral: true,
            });
            return;
          }
          targetRole = tRole;
        }

        if (spec.requiresTarget && !targetRole) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2(`「${spec.label}」には相手国ロール（target）の指定が必須です。`, true),
            { ephemeral: true }
          );
          return;
        }

        const initialStatus = spec.category === 'consensus' ? '承認待ち' : '発効中';
        const comps = buildActionCard({
          actionType,
          actorRole,
          targetRole,
          customTitle,
          messageText,
          statusLabel: initialStatus,
          approvedLines: [],
        });

        await sendDeferredWebhookResult(interaction, { components: comps }, { ephemeral: false });
        return;
      }

      if (cmdName === 'server_info') {
        if (!guildId) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }
        const [guild, guildRoles] = await Promise.all([
          fetchGuild(env, guildId),
          fetchGuildRoles(env, guildId),
        ]);
        const wplaceCount = guildRoles.filter(isWplaceColorRole).length;
        await sendDeferredWebhookResult(
          interaction,
          infoV2(
            `サーバー情報 — ${guild?.name || guildId}`,
            [
              `サーバーID: \`${guildId}\``,
              `メンバー数（概算）: ${guild?.approximate_member_count ?? '不明'}`,
              `全ロール数: ${guildRoles.length}`,
              `wplaceカラーロール数: ${wplaceCount}`,
            ],
            { ephemeral: false, accentColor: 0x28509e }
          ),
          { ephemeral: false }
        );
        return;
      }

      if (cmdName === 'user_info') {
        const targetUserId = getOptValue(interaction, 'user') || actorUser?.id;
        if (!targetUserId) {
          await sendDeferredWebhookResult(interaction, errorV2('ユーザーを特定できませんでした。', true), {
            ephemeral: true,
          });
          return;
        }
        const [uObj, member, guildRoles] = await Promise.all([
          resolvedUsers?.[targetUserId]
            ? Promise.resolve(resolvedUsers[targetUserId])
            : discordApi(env, `/users/${targetUserId}`).then((r) => (r.ok ? r.json() : null)),
          guildId ? fetchGuildMember(env, guildId, targetUserId) : Promise.resolve(null),
          guildId ? fetchGuildRoles(env, guildId) : Promise.resolve([]),
        ]);

        const wRoles = getUserWplaceRoles(guildRoles, member, resolvedRoles);
        const wText =
          wRoles.length > 0
            ? wRoles.map((r) => `${sanitizeDisplayText(r.name)} (\`#${formatHex6(r.color)}\`)`).join(', ')
            : 'なし';

        await sendDeferredWebhookResult(
          interaction,
          infoV2(
            `ユーザー情報 — ${uObj?.global_name || uObj?.username || targetUserId}`,
            [
              `ユーザーID: \`${targetUserId}\``,
              `所属wplaceカラーロール: ${wText}`,
            ],
            { ephemeral: false, accentColor: wRoles[0] ? parseInt(formatHex6(wRoles[0].color), 16) : 0x4093e4 }
          ),
          { ephemeral: false }
        );
        return;
      }

      await sendDeferredWebhookResult(
        interaction,
        errorV2(`未対応のコマンドです: \`/${cmdName}\``, true),
        { ephemeral: true }
      );
    } catch (err) {
      await sendDeferredWebhookResult(
        interaction,
        errorV2(err?.message || 'コマンド処理中に予期しないエラーが発生しました。', true),
        { ephemeral: true }
      );
    }
  })();

  if (ctx?.waitUntil) ctx.waitUntil(bgTask);

  return new Response(
    JSON.stringify({
      type: RESPONSE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: { flags: isEphemeralDeferred ? FLAG_EPHEMERAL_V2 : FLAG_IS_COMPONENTS_V2 },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

// ==========================================
// Message Component Handler (type: 3)
// ==========================================
function replaceFirstTextDisplay(components, newText) {
  const cloned = JSON.parse(JSON.stringify(components || []));
  for (const top of cloned) {
    if (top.type === COMP_TEXT_DISPLAY) {
      top.content = newText;
      return cloned;
    }
    if (Array.isArray(top.components)) {
      for (const child of top.components) {
        if (child.type === COMP_TEXT_DISPLAY) {
          child.content = newText;
          return cloned;
        }
      }
    }
  }
  return cloned;
}

function stripActionRows(components) {
  const cloned = JSON.parse(JSON.stringify(components || []));
  for (const top of cloned) {
    if (Array.isArray(top.components)) {
      top.components = top.components.filter((c) => c.type !== COMP_ACTION_ROW);
    }
  }
  return cloned;
}

async function handleMessageComponent(interaction, env, ctx) {
  const customId = interaction.data?.custom_id || '';
  const guildId = interaction.guild_id || null;
  const actorUser = interaction.member?.user || interaction.user || null;

  // 1. 自国ハイライトボタン（本人のみに見えるエフェメラル画像）
  if (customId === 'map_my_highlight') {
    const bgTask = (async () => {
      try {
        if (!guildId || !actorUser?.id) {
          await sendDeferredWebhookResult(interaction, errorV2('サーバー内で実行してください。', true), {
            ephemeral: true,
          });
          return;
        }
        const [guildRoles, member] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMember(env, guildId, actorUser.id),
        ]);
        const myRoles = getUserWplaceRoles(guildRoles, member);
        if (myRoles.length === 0) {
          await sendDeferredWebhookResult(
            interaction,
            errorV2('あなたの所属するwplaceカラーロールが見つかりませんでした。', true),
            { ephemeral: true }
          );
          return;
        }
        const primaryRole = myRoles[0];
        const hex = formatHex6(primaryRole.color);
        const buffer = await createHighlightImageBuffer(hex);
        const filename = `my-highlight-${hex}.png`;
        const comps = [
          containerComp({
            accentColor: parseInt(hex, 16) || 0x4093e4,
            components: [
              textComp(
                `**自国ハイライト — ${sanitizeDisplayText(primaryRole.name)} (\`#${hex}\`)**\nあなたのみに表示されるハイライトマップです。`
              ),
              mediaGalleryComp(filename, '自国ハイライトマップ'),
            ],
          }),
        ];
        await sendDeferredWebhookResult(
          interaction,
          { file: { name: filename, buffer, description: '自国ハイライトマップ' }, components: comps },
          { ephemeral: true }
        );
      } catch (err) {
        await sendDeferredWebhookResult(
          interaction,
          errorV2(err?.message || 'ハイライト画像の生成に失敗しました。', true),
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

  // 2. 元メッセージを更新するコンポーネント操作（type: 6）
  const bgUpdateTask = (async () => {
    try {
      if (customId === 'map_refresh') {
        const buffer = await createMergedImageBuffer();
        const filename = 'jplace-map.png';
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: 'jplace 戦況マップ' },
          components: buildMapComponents(filename, '最新タイルに更新しました'),
        });
        return;
      }

      if (customId === 'sector_select') {
        const selected = interaction.data?.values?.[0] || null;
        const normArea = selected && /^[ABC][1234]$/.test(selected) ? selected : null;
        const buffer = await createSectorImageBuffer(normArea);
        const filename = normArea ? `sector-${normArea}.png` : 'sector-grid.png';
        const caption = normArea
          ? `区画 ${normArea} の拡大マップ（全体 3x4 分割のうち ${normArea}）`
          : '全体マップ（横3列 A〜C × 縦4行 1〜4 の12区画グリッド）';
        await sendDeferredWebhookResult(interaction, {
          file: { name: filename, buffer, description: caption },
          components: buildSectorCardComponents(filename, caption, normArea),
        });
        return;
      }

      if (customId === 'nations_refresh') {
        if (!guildId) return;
        const [guildRoles, members] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMembersAll(env, guildId),
        ]);
        await sendDeferredWebhookResult(interaction, {
          components: buildNationsCardComponents(guildRoles, members),
        });
        return;
      }

      if (customId === 'color_panel_created' || customId === 'color_panel_palette') {
        const mode = customId === 'color_panel_created' ? 'created' : 'palette';
        const guildRoles = guildId ? await fetchGuildRoles(env, guildId) : [];
        await sendDeferredWebhookResult(interaction, {
          components: buildColorPanelComponents(mode, guildRoles),
        });
        return;
      }

      // 合意型ボタン: act_accept:<actionType>:<fromRoleId>:<toRoleId> / act_reject:... / act_cancel:...
      const actMatch = customId.match(/^(act_accept|act_reject|act_cancel):([^:]+):([^:]+):([^:]+)$/);
      if (actMatch) {
        const [, op, actionType, fromRoleId, toRoleId] = actMatch;
        if (!guildId || !actorUser?.id) return;
        const member = interaction.member || (await fetchGuildMember(env, guildId, actorUser.id));
        const memberRoleSet = new Set(member?.roles || []);

        if (op === 'act_accept' || op === 'act_reject') {
          if (!memberRoleSet.has(toRoleId)) {
            await sendDeferredWebhookResult(
              interaction,
              errorV2('この操作は相手国ロールを所持しているメンバーのみ実行できます。', true),
              { ephemeral: true }
            );
            return;
          }
        } else if (op === 'act_cancel') {
          if (!memberRoleSet.has(fromRoleId)) {
            await sendDeferredWebhookResult(
              interaction,
              errorV2('この操作は提案国ロールを所持しているメンバーのみ実行できます。', true),
              { ephemeral: true }
            );
            return;
          }
        }

        const spec = ACTION_TYPE_MAP.get(actionType);
        const statusText =
          op === 'act_accept'
            ? '締結成立'
            : op === 'act_reject'
              ? '拒否・不成立'
              : '提案取下げ';

        const currentText =
          interaction.message?.components?.[0]?.components?.[0]?.content || `**${spec?.label || '外交提案'}**`;
        const updatedText = currentText.replace(/状態:\s*\*\*[^*]+\*\*/, `状態: **${statusText}**`);
        const updatedComps = stripActionRows(replaceFirstTextDisplay(interaction.message?.components || [], updatedText));
        await sendDeferredWebhookResult(interaction, { components: updatedComps });
        return;
      }

      // 永世中立宣言の公認・取消: neutral_approve:<fromRoleId> / neutral_revoke:<fromRoleId>
      const neutralMatch = customId.match(/^(neutral_approve|neutral_revoke):([^:]+)$/);
      if (neutralMatch) {
        const [, op, fromRoleId] = neutralMatch;
        if (!guildId || !actorUser?.id) return;

        const [guildRoles, member] = await Promise.all([
          fetchGuildRoles(env, guildId),
          fetchGuildMember(env, guildId, actorUser.id),
        ]);

        const actorWplaceRoles = getUserWplaceRoles(guildRoles, member);
        const isAdmin = hasAdminPermission(member);

        let approverLabel = '';
        if (actorWplaceRoles.length > 0) {
          const r = actorWplaceRoles[0];
          if (r.id === fromRoleId) {
            await sendDeferredWebhookResult(
              interaction,
              errorV2('宣言国自身による自己公認・自己取消はできません。', true),
              { ephemeral: true }
            );
            return;
          }
          approverLabel = `- **${sanitizeDisplayText(r.name)}** (\`#${formatHex6(r.color)}\`)`;
        } else if (isAdmin) {
          approverLabel = `- **運営（管理者）**`;
        } else {
          await sendDeferredWebhookResult(
            interaction,
            errorV2('公認または取消を行うにはwplaceカラーロール（または管理者権限）が必要です。', true),
            { ephemeral: true }
          );
          return;
        }

        const currentText = interaction.message?.components?.[0]?.components?.[0]?.content || '';
        const existingLines = extractApprovedLinesFromText(currentText);
        const nextSet = new Set(existingLines);

        if (op === 'neutral_approve') {
          nextSet.add(approverLabel);
        } else {
          nextSet.delete(approverLabel);
        }

        const nextLines = Array.from(nextSet);
        const approvedBlock = nextLines.length > 0 ? nextLines.join('\n') : '- まだ公認国はありません';
        const updatedText = currentText.includes('公認国一覧:')
          ? currentText.replace(/公認国一覧:\s*\n[\s\S]*?(\n\n|$)/, `公認国一覧:\n${approvedBlock}$1`)
          : `${currentText}\n公認国一覧:\n${approvedBlock}`;

        const updatedComps = replaceFirstTextDisplay(interaction.message?.components || [], updatedText);
        await sendDeferredWebhookResult(interaction, { components: updatedComps });
        return;
      }
    } catch (err) {
      console.error('[component] 操作処理エラー:', err?.message || String(err));
    }
  })();

  if (ctx?.waitUntil) ctx.waitUntil(bgUpdateTask);

  return new Response(JSON.stringify({ type: RESPONSE_DEFERRED_UPDATE_MESSAGE }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ==========================================
// Cloudflare Worker Entrypoint (fetch & scheduled)
// ==========================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'GET') {
      if (ctx?.waitUntil) {
        ctx.waitUntil(registerSlashCommandsIfNeeded(env, null));
      } else {
        await registerSlashCommandsIfNeeded(env, null);
      }
      return new Response('Jpace-bot v2 worker is running', {
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
      return new Response('Invalid request signature', { status: 401 });
    }

    let interaction;
    try {
      interaction = JSON.parse(rawBody);
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    if (ctx?.waitUntil) {
      ctx.waitUntil(registerSlashCommandsIfNeeded(env, interaction.guild_id || null));
    }

    if (interaction.type === INTERACTION_PING) {
      return new Response(JSON.stringify({ type: RESPONSE_PONG }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (interaction.type === INTERACTION_APPLICATION_COMMAND_AUTOCOMPLETE) {
      return handleAutocomplete(interaction);
    }

    if (interaction.type === INTERACTION_APPLICATION_COMMAND) {
      return await handleApplicationCommand(interaction, env, ctx);
    }

    if (interaction.type === INTERACTION_MESSAGE_COMPONENT) {
      return await handleMessageComponent(interaction, env, ctx);
    }

    const fallback = infoV2('未対応のインタラクション', `type: ${interaction.type}`, { ephemeral: true });
    const payload = buildV2Payload(fallback, { ephemeral: true });
    return new Response(payload.body, { status: 200, headers: payload.headers });
  },

  async scheduled(_event, env, ctx) {
    const task = (async () => {
      await registerSlashCommandsIfNeeded(env, null);
      if (CHANNEL_ID) {
        await postMapToChannel(env, CHANNEL_ID, '定期配信された最新戦況マップ');
      }
    })();
    if (ctx?.waitUntil) {
      ctx.waitUntil(task);
    } else {
      await task;
    }
  },
};
