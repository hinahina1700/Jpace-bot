import { PhotonImage } from 'photon-wasm';

const CHANNEL_ID = '1507371465744580739';

// Discord Interaction Types & Response Types
const INTERACTION_PING = 1;
const INTERACTION_APPLICATION_COMMAND = 2;
const INTERACTION_MESSAGE_COMPONENT = 3;

const RESPONSE_PONG = 1;
const RESPONSE_CHANNEL_MESSAGE_WITH_SOURCE = 4;
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

// Wasm initialization guard
let wasmInitialized = false;
async function ensureWasmInit() {
  if (!wasmInitialized) {
    wasmInitialized = true;
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
  return fetch(`https://discord.com/api/v10${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
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

async function createHighlightImageBuffer(targetHex) {
  const [tr, tg, tb] = hexToRgb(targetHex);
  const canvas = await createMergedPhotonImage();
  try {
    const width = canvas.get_width();
    const height = canvas.get_height();
    const raw = canvas.get_raw_pixels();
    const buf = new Uint8Array(raw);

    for (let i = 0; i < buf.length; i += 4) {
      const r = buf[i];
      const g = buf[i + 1];
      const b = buf[i + 2];
      if (r === tr && g === tg && b === tb) {
        continue;
      }
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      buf[i] = lum;
      buf[i + 1] = lum;
      buf[i + 2] = lum;
    }

    const outImg = new PhotonImage(buf, width, height);
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
  if (!publicKeyHex) return true; // 未設定時はローカル検証用に通過
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
// Interaction Handlers
// ==========================================
async function handleApplicationCommand(interaction, env) {
  const cmdName = interaction.data?.name || '';

  if (cmdName === 'map') {
    const buffer = await createMergedImageBuffer();
    const filename = 'jplace-map.png';
    const payload = buildV2Payload({
      file: { name: filename, buffer, description: 'jplace 戦況マップ' },
      components: buildMapComponents(filename, '最新タイル合成マップを表示中'),
    });
    return new Response(payload.body, {
      status: 200,
      headers: {
        ...payload.headers,
      },
    });
  }

  if (cmdName === 'sector') {
    const areaOpt = interaction.data?.options?.find((o) => o.name === 'area')?.value || null;
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
    const payload = buildV2Payload({
      file: { name: filename, buffer, description: caption },
      components,
    });
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

  const resObj = infoV2('コマンド受信', `\`/${cmdName}\` を受け付けました。`, { ephemeral: true });
  const payload = buildV2Payload(resObj, { ephemeral: true });
  return new Response(payload.body, { status: 200, headers: payload.headers });
}

async function handleMessageComponent(interaction, env) {
  const customId = interaction.data?.custom_id || '';

  if (customId === 'map_refresh') {
    const buffer = await createMergedImageBuffer();
    const filename = 'jplace-map.png';
    const payload = buildV2Payload({
      file: { name: filename, buffer, description: 'jplace 戦況マップ' },
      components: buildMapComponents(filename, '最新タイルに更新しました'),
    });
    return new Response(
      JSON.stringify({
        type: RESPONSE_UPDATE_MESSAGE,
        data: {
          flags: FLAG_IS_COMPONENTS_V2,
          components: buildMapComponents(filename, '最新タイルに更新しました'),
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (customId === 'sector_select') {
    const selected = interaction.data?.values?.[0] || null;
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
    const payload = buildV2Payload({
      file: { name: filename, buffer, description: caption },
      components,
    });
    return new Response(payload.body, { status: 200, headers: payload.headers });
  }

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

    if (request.method === 'GET') {
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
      return new Response('Invalid request signature', { status: 401 });
    }

    let interaction;
    try {
      interaction = JSON.parse(rawBody);
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    if (interaction.type === INTERACTION_PING) {
      return new Response(JSON.stringify({ type: RESPONSE_PONG }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      if (interaction.type === INTERACTION_APPLICATION_COMMAND) {
        return await handleApplicationCommand(interaction, env);
      }
      if (interaction.type === INTERACTION_MESSAGE_COMPONENT) {
        return await handleMessageComponent(interaction, env);
      }

      const fallback = infoV2('未対応のインタラクション', `type: ${interaction.type}`, { ephemeral: true });
      const payload = buildV2Payload(fallback, { ephemeral: true });
      return new Response(payload.body, { status: 200, headers: payload.headers });
    } catch (err) {
      const errObj = errorV2(err?.message || '予期しないエラーが発生しました', true);
      const payload = buildV2Payload(errObj, { ephemeral: true });
      return new Response(payload.body, { status: 200, headers: payload.headers });
    }
  },
};
