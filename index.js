import init, { PhotonImage } from 'photon-wasm';
import photonWasm from 'photon-wasm/photon_rs_bg_bg.wasm';

const CHANNEL_ID = '1507371465744580739';

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
    await init(photonWasm);
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

function rgbToHex(r, g, b) {
  return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
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
  const components = Array.isArray(result.components) ? result.components : [containerComp({ components: [textComp(result.message || '')] })];

  if (result.file) {
    const formData = new FormData();
    const attachments = [{
      id: 0,
      filename: result.file.name,
      description: result.file.description || result.file.name,
    }];
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
        components: [
          textComp(`**エラー**\n${message}`),
        ],
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
        components: [
          textComp(`**${title}**\n${bodyText}`),
          ...componentsExtra,
        ],
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
      // 12区画（3列 x 4行）の境界線を描画
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

    // 指定区画の切り抜き
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
// Components V2 Card Builders (Map, Sector, Nations, Action)
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

function buildSectorComponents(areaCode, filename) {
  const sector = parseSectorArea(areaCode);
  const heading = sector
    ? `**jplace 区画拡大：${sector.code}**\n領域: X ${sector.x}〜${sector.x + sector.width} / Y ${sector.y}〜${sector.y + sector.height}（${sector.width}×${sector.height}px）`
    : `**jplace 12区画グリッド（A1〜C4）**\n全体（${CROP_WIDTH}×${CROP_HEIGHT}px）を横3列（A, B, C）×縦4行（1, 2, 3, 4）に均等分割`;

  return [
    containerComp({
      accentColor: 0x28509e,
      components: [
        textComp(heading),
        mediaGalleryComp(filename, sector ? `区画 ${sector.code} 拡大図` : '12区画グリッド図'),
        sepComp(),
        buildSectorSelectRow(sector ? sector.code : null),
      ],
    }),
  ];
}

function buildNationsComponents(colorRoles, memberCountMap = null) {
  const lines = [];
  if (!colorRoles.length) {
    lines.push('現在、wplaceカラーロールは登録されていません。');
  } else {
    colorRoles.forEach((role, idx) => {
      const hex = formatHex6(role.color);
      const matched = WPLACE_BY_HEX.get(hex);
      const colorLabel = matched ? `#${hex}（${matched.name}）` : `#${hex}`;
      const countText = memberCountMap ? ` / 所属: ${memberCountMap.get(role.id) ?? 0}名` : '';
      lines.push(`${idx + 1}. **${role.name}** — ${colorLabel}${countText}`);
    });
  }

  return [
    containerComp({
      accentColor: 0x4093e4,
      components: [
        textComp(`**jplace 国家一覧**\n登録国数: ${colorRoles.length}カ国\n\n${lines.join('\n')}`),
        sepComp(),
        actionRowComp([
          buttonComp({ customId: 'nations_refresh', label: '最新情報に更新', style: BUTTON_SECONDARY }),
        ]),
      ],
    }),
  ];
}

function parseApprovedNationsFromText(text) {
  const match = String(text || '').match(/公認国リスト:\s*(.+)/);
  if (!match) return [];
  const raw = match[1].trim();
  if (!raw || raw === 'なし') return [];
  return raw
    .split('、')
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildActionComponents({
  actionTypeValue,
  fromRole,
  toRole,
  title,
  message,
  statusText = null,
  disabled = false,
  approvedNations = [],
}) {
  const actionMeta = ACTION_TYPE_MAP.get(actionTypeValue);
  const actionLabel = actionMeta ? actionMeta.label : actionTypeValue;
  const accentColor = fromRole?.color ? Number(fromRole.color) & 0xffffff : 0x4093e4;

  const lines = [
    `**公式外交宣言：${actionLabel}**`,
    `宣言国: **${fromRole.name}**（#${formatHex6(fromRole.color)}）`,
  ];

  if (toRole) {
    lines.push(`対象国: **${toRole.name}**（#${formatHex6(toRole.color)}）`);
  }
  if (title) {
    lines.push(`件名: ${title}`);
  }
  if (message) {
    lines.push(`声明文: ${message}`);
  }

  if (actionMeta?.category === 'consensus') {
    const currentStatus = statusText || '承認待ち';
    lines.push(`ステータス: **${currentStatus}**`);
  } else if (actionMeta?.category === 'recognition') {
    const listStr = approvedNations.length > 0 ? approvedNations.join('、') : 'なし';
    lines.push(`公認国リスト: ${listStr}`);
  } else {
    lines.push('ステータス: **発効済み**');
  }

  const comps = [textComp(lines.join('\n'))];

  if (!disabled && actionMeta?.category === 'consensus' && toRole) {
    const baseId = `${actionTypeValue}:${fromRole.id}:${toRole.id}`;
    comps.push(sepComp());
    comps.push(
      actionRowComp([
        buttonComp({ customId: `act_accept:${baseId}`, label: '承認する', style: BUTTON_SUCCESS }),
        buttonComp({ customId: `act_reject:${baseId}`, label: '拒否する', style: BUTTON_DANGER }),
        buttonComp({ customId: `act_cancel:${baseId}`, label: '取り下げる', style: BUTTON_SECONDARY }),
      ])
    );
  } else if (!disabled && actionMeta?.category === 'recognition') {
    comps.push(sepComp());
    comps.push(
      actionRowComp([
        buttonComp({ customId: `neutral_approve:${fromRole.id}`, label: '公認する', style: BUTTON_PRIMARY }),
        buttonComp({ customId: `neutral_revoke:${fromRole.id}`, label: '公認を取り消す', style: BUTTON_SECONDARY }),
      ])
    );
  }

  return [
    containerComp({
      accentColor,
      components: comps,
    }),
  ];
}

// ==========================================
// スラッシュコマンド定義（COMMANDS_LIST）
// ==========================================
const COMMANDS_LIST = [
  {
    name: 'ping',
    description: 'Botの応答速度を確認します。',
    execute: (options, user, interaction) => {
      const createdMs = Number((BigInt(interaction.id) >> 22n) + 1420070400000n);
      const latencyMs = Math.max(0, Date.now() - createdMs);
      return infoV2('Pong', [
        `応答速度: ${latencyMs}ms`,
        `実行ユーザー: ${user.username}`,
      ]);
    },
  },
  {
    name: 'help',
    description: '利用可能なコマンド一覧を表示します。',
    execute: () => infoV2('Jpace-bot v2 コマンド一覧', [
      '**マップ・戦況分析**',
      '`/now` — 現在のjplace合成マップを表示（更新・自国ハイライト対応）',
      '`/post_now` — 専用チャンネルへ戦況マップを送信',
      '`/highlight` — 指定したwplaceカラーのみを残し他をグレースケール化',
      '`/sector` — 12区画（A1〜C4）グリッド表示および区画拡大',
      '',
      '**国家・外交システム**',
      '`/rename_role` — 自国のwplaceカラーロール名を変更',
      '`/nations` — サーバー内のwplaceカラーロール国家一覧を表示',
      '`/action` — 公式外交宣言・条約締結（全11種）を発出',
      '',
      '**ユーティリティ・管理**',
      '`/color_panel` — wplaceカラーパレット一覧を表示',
      '`/role_directory` — サーバー内のwplaceカラーロール一覧を表示',
      '`/color_match` — 16進数カラーコードに最も近いwplace色を検索',
      '`/avatar` — メンバーのアバター画像を表示',
      '`/server_info` — サーバー情報を表示',
      '`/user_info` — ユーザー情報を表示',
      '`/setup_color_roles` — wplace標準カラーロールを一括作成（管理者限定）',
      '`/ping` — 応答速度を確認',
    ]),
  },
  {
    name: 'now',
    description: '現在のjplace合成画像を表示します。',
    deferred: true,
    execute: async () => {
      try {
        const buffer = await createMergedImageBuffer();
        return {
          components: buildMapComponents('jplace.png', '現在の合成マップ（4×4タイル / 領域 922,364 〜 3866,3904）'),
          file: {
            buffer,
            name: 'jplace.png',
            type: 'image/png',
            description: '現在のjplace合成マップ',
          },
        };
      } catch (err) {
        return errorV2(`画像の取得・合成中にエラーが発生しました: ${err.message}`);
      }
    },
  },
  {
    name: 'post_now',
    description: '指定チャンネルへ現在のjplace合成画像を送信します。',
    deferred: true,
    execute: async (options, user, interaction, env) => {
      try {
        const buffer = await createMergedImageBuffer();
        const postPayload = buildV2Payload({
          components: buildMapComponents('jplace.png', '定期・手動配信：現在のjplace合成マップ'),
          file: {
            buffer,
            name: 'jplace.png',
            type: 'image/png',
            description: '現在のjplace合成マップ',
          },
        });

        const postRes = await discordApi(env, `/channels/${CHANNEL_ID}/messages`, {
          method: 'POST',
          body: postPayload.body,
          headers: postPayload.headers,
        });

        if (!postRes.ok) {
          const errText = await postRes.text();
          return errorV2(`チャンネルへの送信に失敗しました:\n${errText}`);
        }

        return infoV2('送信完了', [`<#${CHANNEL_ID}> へ現在のjplace合成画像を送信しました。`]);
      } catch (err) {
        return errorV2(`送信処理中にエラーが発生しました: ${err.message}`);
      }
    },
  },
  {
    name: 'highlight',
    description: '指定したwplaceカラーのみを残し、他のピクセルをグレースケール化します。',
    deferred: true,
    options: [
      {
        type: 3,
        name: 'color',
        description: '強調するwplaceカラー（キー・色名・Hex）',
        required: true,
        autocomplete: true,
      },
    ],
    execute: async (options) => {
      const rawColor = options.find((o) => o.name === 'color')?.value;
      const colorEntry = resolveColorEntry(rawColor);
      if (!colorEntry) {
        return errorV2(`指定されたカラー「${rawColor}」はwplace標準パレットに存在しません。`);
      }

      try {
        const buffer = await createHighlightImageBuffer(colorEntry.hex);
        const filename = `highlight_${colorEntry.key}.png`;
        return {
          components: [
            containerComp({
              accentColor: parseInt(colorEntry.hex, 16),
              components: [
                textComp(`**カラー強調フィルター：${colorEntry.name}（#${colorEntry.hex}）**\n指定色のみを残し、その他の領域をグレースケール変換しました。`),
                mediaGalleryComp(filename, `${colorEntry.name} 強調マップ`),
              ],
            }),
          ],
          file: {
            buffer,
            name: filename,
            type: 'image/png',
            description: `${colorEntry.name} 強調マップ`,
          },
        };
      } catch (err) {
        return errorV2(`ハイライト画像の生成中にエラーが発生しました: ${err.message}`);
      }
    },
  },
  {
    name: 'sector',
    description: 'キャンバスを12区画（A1〜C4）に分割表示または指定区画を拡大します。',
    deferred: true,
    options: [
      {
        type: 3,
        name: 'area',
        description: '拡大する区画（A1〜C4・省略時は12区画グリッド全体）',
        required: false,
        choices: SECTOR_ROWS.flatMap((r) =>
          SECTOR_COLS.map((c) => ({
            name: `${c}${r}`,
            value: `${c}${r}`,
          }))
        ),
      },
    ],
    execute: async (options) => {
      const areaVal = options.find((o) => o.name === 'area')?.value || null;
      const sector = areaVal ? parseSectorArea(areaVal) : null;
      if (areaVal && !sector) {
        return errorV2(`区画指定「${areaVal}」が不正です。A1〜C4 を指定してください。`);
      }

      try {
        const buffer = await createSectorImageBuffer(sector ? sector.code : null);
        const filename = sector ? `sector_${sector.code}.png` : 'sector_grid_12.png';
        return {
          components: buildSectorComponents(sector ? sector.code : null, filename),
          file: {
            buffer,
            name: filename,
            type: 'image/png',
            description: sector ? `区画 ${sector.code} 拡大` : '12区画グリッド',
          },
        };
      } catch (err) {
        return errorV2(`区画画像の生成中にエラーが発生しました: ${err.message}`);
      }
    },
  },
  {
    name: 'rename_role',
    description: '自分が所持するwplaceカラーロールの名前を変更します。',
    deferred: true,
    options: [
      {
        type: 3,
        name: 'name',
        description: '新しいロール名（1〜20文字）',
        required: true,
      },
      {
        type: 8,
        name: 'role',
        description: '変更対象のカラーロール（複数所持時の指定用・任意）',
        required: false,
      },
    ],
    execute: async (options, user, interaction, env) => {
      const newName = String(options.find((o) => o.name === 'name')?.value || '').trim();
      const targetRoleId = options.find((o) => o.name === 'role')?.value || null;

      if (!newName || newName.length < 1 || newName.length > 20) {
        return errorV2('ロール名は1文字以上20文字以下で指定してください。');
      }
      if (/@everyone|@here|<@!?[0-9]+>|<@&[0-9]+>|<#[0-9]+>/.test(newName)) {
        return errorV2('ロール名に @everyone、@here、またはメンション文字列は使用できません。');
      }

      const guildId = interaction.guild_id;
      if (!guildId) {
        return errorV2('サーバー内でのみ実行できます。');
      }

      const guildRoles = await fetchGuildRoles(env, guildId);
      const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
      const userColorRoles = getUserWplaceRoles(guildRoles, member, interaction.data.resolved?.roles);

      if (userColorRoles.length === 0) {
        return errorV2('所持しているwplaceカラーロールが見つかりません。');
      }

      let targetRole = null;
      if (targetRoleId) {
        const foundRole = guildRoles.find((r) => r.id === targetRoleId);
        if (!foundRole) {
          return errorV2('指定されたロールが見つかりません。');
        }
        try {
          if ((BigInt(foundRole.permissions || '0') & PERM_ADMINISTRATOR) === PERM_ADMINISTRATOR) {
            return errorV2('管理者権限を持つロールは変更できません。');
          }
        } catch {
          return errorV2('ロール権限の確認に失敗しました。');
        }
        if (!isWplaceColorRole(foundRole)) {
          return errorV2('指定されたロールはwplaceカラーロールではありません。');
        }
        if (!(member?.roles || []).includes(foundRole.id)) {
          return errorV2('指定されたwplaceカラーロールを所持していません。');
        }
        targetRole = foundRole;
      } else {
        targetRole = userColorRoles[0];
      }

      const oldName = targetRole.name;
      const patchRes = await discordApi(env, `/guilds/${guildId}/roles/${targetRole.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: newName }),
      });

      if (!patchRes.ok) {
        const errText = await patchRes.text();
        return errorV2(`ロール名の変更に失敗しました（Botのロール管理権限や階層を確認してください）:\n${errText}`);
      }

      return infoV2('ロール名変更完了', [
        `対象ロール: <@&${targetRole.id}>（#${formatHex6(targetRole.color)}）`,
        `旧名称: **${oldName}**`,
        `新名称: **${newName}**`,
      ], { accentColor: targetRole.color });
    },
  },
  {
    name: 'nations',
    description: 'サーバー内のwplaceカラーロール国家一覧を表示します。',
    deferred: true,
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) {
        return errorV2('サーバー内でのみ実行できます。');
      }
      const guildRoles = await fetchGuildRoles(env, guildId);
      const colorRoles = guildRoles.filter(isWplaceColorRole);

      let memberCountMap = null;
      try {
        const members = await fetchGuildMembersAll(env, guildId);
        memberCountMap = new Map();
        for (const r of colorRoles) memberCountMap.set(r.id, 0);
        for (const m of members) {
          for (const rid of m.roles || []) {
            if (memberCountMap.has(rid)) {
              memberCountMap.set(rid, memberCountMap.get(rid) + 1);
            }
          }
        }
      } catch {
        memberCountMap = null;
      }

      return {
        components: buildNationsComponents(colorRoles, memberCountMap),
      };
    },
  },
  {
    name: 'action',
    description: '公式外交宣言・条約締結（全11種）を発出します。',
    deferred: true,
    options: [
      {
        type: 3,
        name: 'type',
        description: '外交行動の種類（全11種）',
        required: true,
        choices: ACTION_TYPES.map((t) => ({ name: t.label, value: t.value })),
      },
      {
        type: 8,
        name: 'target',
        description: '対象となる国ロール（合意型・対象指定即時発効型は必須）',
        required: false,
      },
      {
        type: 3,
        name: 'title',
        description: '「その他宣言」用の自由タイトル（任意）',
        required: false,
      },
      {
        type: 3,
        name: 'message',
        description: '声明文・補足メッセージ（任意）',
        required: false,
      },
      {
        type: 8,
        name: 'my_role',
        description: '複数カラーロール所持時の自国ロール指定（任意）',
        required: false,
      },
    ],
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) {
        return errorV2('サーバー内でのみ実行できます。');
      }

      const typeVal = options.find((o) => o.name === 'type')?.value;
      const targetRoleId = options.find((o) => o.name === 'target')?.value || null;
      const customTitle = options.find((o) => o.name === 'title')?.value || null;
      const customMessage = options.find((o) => o.name === 'message')?.value || null;
      const myRoleId = options.find((o) => o.name === 'my_role')?.value || null;

      const actionMeta = ACTION_TYPE_MAP.get(typeVal);
      if (!actionMeta) {
        return errorV2('不明な外交種別が指定されました。');
      }

      const guildRoles = await fetchGuildRoles(env, guildId);
      const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
      const userColorRoles = getUserWplaceRoles(guildRoles, member, interaction.data.resolved?.roles);

      if (userColorRoles.length === 0) {
        return errorV2('外交宣言を行うにはwplaceカラーロールを所持している必要があります。');
      }

      let fromRole = null;
      if (myRoleId) {
        const found = guildRoles.find((r) => r.id === myRoleId);
        if (!found || !isWplaceColorRole(found)) {
          return errorV2('自国指定のロールがwplaceカラーロールではありません。');
        }
        if (!(member?.roles || []).includes(found.id)) {
          return errorV2('指定された自国ロールを所持していません。');
        }
        fromRole = found;
      } else {
        fromRole = userColorRoles[0];
      }

      let toRole = null;
      if (targetRoleId) {
        const foundTarget = guildRoles.find((r) => r.id === targetRoleId);
        if (!foundTarget || !isWplaceColorRole(foundTarget)) {
          return errorV2('対象ロールはwplaceカラーロールである必要があります。');
        }
        if (foundTarget.id === fromRole.id) {
          return errorV2('自国ロールと同一のロールを対象に指定することはできません。');
        }
        toRole = foundTarget;
      } else if (actionMeta.requiresTarget) {
        return errorV2(`「${actionMeta.label}」には対象国ロール（target）の指定が必須です。`);
      }

      return {
        components: buildActionComponents({
          actionTypeValue: actionMeta.value,
          fromRole,
          toRole,
          title: customTitle,
          message: customMessage,
          statusText: actionMeta.category === 'consensus' ? '承認待ち' : null,
          disabled: false,
          approvedNations: [],
        }),
      };
    },
  },
  {
    name: 'color_panel',
    description: 'wplace標準カラーパレット一覧を表示します。',
    execute: () => {
      const blocks = WPLACE_COLOR_ROWS.map((rowKeys, idx) => {
        const items = rowKeys.map((k) => {
          const c = WPLACE_BY_KEY.get(k);
          return c ? `${c.name}(#${c.hex})` : k;
        });
        return `行${idx + 1}: ${items.join(' / ')}`;
      });
      return {
        components: [
          containerComp({
            accentColor: 0x4093e4,
            components: [
              textComp(`**wplace 標準カラーパレット（全${WPLACE_COLORS.length}色）**\n${blocks.join('\n')}`),
              sepComp(),
              actionRowComp([
                buttonComp({ customId: 'panel_to_directory', label: '作成済み一覧へ切替', style: BUTTON_SECONDARY }),
              ]),
            ],
          }),
        ],
      };
    },
  },
  {
    name: 'role_directory',
    description: 'サーバー内のwplaceカラーロール一覧を表示します。',
    deferred: true,
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) {
        return errorV2('サーバー内でのみ実行できます。');
      }
      const guildRoles = await fetchGuildRoles(env, guildId);
      const colorRoles = guildRoles.filter(isWplaceColorRole);
      const lines = colorRoles.length
        ? colorRoles.map((r, i) => `${i + 1}. <@&${r.id}>（${r.name} / #${formatHex6(r.color)}）`)
        : ['wplaceカラーロールは見つかりませんでした。'];

      return infoV2('wplace カラーロール ディレクトリ', [
        `該当ロール数: ${colorRoles.length}件`,
        '',
        ...lines,
      ]);
    },
  },
  {
    name: 'color_match',
    description: '指定した16進数カラーコードに最も近いwplace色を検索します。',
    options: [
      {
        type: 3,
        name: 'hex',
        description: '16進数カラーコード（例: FF7F27 または #4093E4）',
        required: true,
      },
    ],
    execute: (options) => {
      const rawHex = String(options.find((o) => o.name === 'hex')?.value || '').trim().replace(/^#/, '');
      if (!/^[0-9A-Fa-f]{6}$/.test(rawHex)) {
        return errorV2('6桁の16進数カラーコード（例: FF7F27）を入力してください。');
      }
      const [r1, g1, b1] = hexToRgb(rawHex);

      let best = null;
      let bestDist = Infinity;
      for (const c of WPLACE_COLORS) {
        const [r2, g2, b2] = hexToRgb(c.hex);
        const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
        if (dist < bestDist) {
          bestDist = dist;
          best = c;
        }
      }

      return infoV2('wplace 近似カラー検索', [
        `入力コード: #${rawHex.toUpperCase()}`,
        `最も近い色: **${best.name}**（key: \`${best.key}\` / #${best.hex}）`,
        `RGB色空間距離: ${bestDist.toFixed(2)}`,
      ], { accentColor: parseInt(best.hex, 16) });
    },
  },
  {
    name: 'avatar',
    description: '指定したメンバーのアバター画像を表示します。',
    options: [{ type: 6, name: 'user', description: 'メンバーを選択（省略時は自分）', required: false }],
    execute: (options, user, interaction) => {
      const targetId = options.find((o) => o.name === 'user')?.value || user.id;
      const targetUser = interaction.data.resolved?.users?.[targetId] || user;
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

      return infoV2('ユーザーアバター', [
        `対象ユーザー: **${targetUser.username}**`,
        `URL: ${avatarUrl}`,
      ]);
    },
  },
  {
    name: 'server_info',
    description: 'サーバーの基本情報を表示します。',
    execute: (options, currentUser, interaction) => {
      const guildId = interaction.guild_id || '不明';
      let dateCreated = '不明';
      if (guildId !== '不明') {
        const snowflakeBin = BigInt(guildId);
        const timestampUnix = Number((snowflakeBin >> 22n) + 1420070400000n);
        dateCreated = new Date(timestampUnix).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      }
      const channelId = interaction.channel_id || '不明';

      return infoV2('サーバー情報', [
        `サーバーID: ${guildId}`,
        `作成日時: ${dateCreated}`,
        `実行チャンネル: <#${channelId}>`,
        `実行者: ${currentUser.username}`,
      ]);
    },
  },
  {
    name: 'user_info',
    description: 'メンバーの詳細情報を表示します。',
    options: [{ type: 6, name: 'user', description: 'メンバーを選択（省略時は自分）', required: false }],
    execute: (options, currentUser, interaction) => {
      const targetId = options.find((o) => o.name === 'user')?.value || currentUser.id;
      const targetUser = interaction.data.resolved?.users?.[targetId] || currentUser;
      const memberDetails = interaction.data.resolved?.members?.[targetId] || interaction.member;

      const snowflakeBin = BigInt(targetUser.id);
      const timestampUnix = Number((snowflakeBin >> 22n) + 1420070400000n);
      const dateCreated = new Date(timestampUnix).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

      const dateJoined = memberDetails?.joined_at
        ? new Date(memberDetails.joined_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
        : '不明';

      return infoV2('ユーザー情報', [
        `ユーザー名: ${targetUser.username}`,
        `ユーザーID: ${targetUser.id}`,
        `アカウント作成日: ${dateCreated}`,
        `サーバー参加日: ${dateJoined}`,
        `実行者: ${currentUser.username}`,
      ]);
    },
  },
  {
    name: 'setup_color_roles',
    description: 'wplace標準カラーロールを一括作成します（管理者限定）。',
    default_member_permissions: '8',
    deferred: true,
    execute: async (options, user, interaction, env) => {
      const guildId = interaction.guild_id;
      if (!guildId) {
        return errorV2('サーバー内でのみ実行できます。');
      }
      const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
      if (!hasAdminPermission(member)) {
        return errorV2('このコマンドを実行するには管理者権限（Administrator）が必要です。');
      }

      const existingRoles = await fetchGuildRoles(env, guildId);
      const existingByHex = new Set(
        existingRoles
          .filter((r) => !((BigInt(r.permissions || '0') & PERM_ADMINISTRATOR) === PERM_ADMINISTRATOR))
          .map((r) => formatHex6(r.color))
      );

      let createdCount = 0;
      let skippedCount = 0;

      for (const c of WPLACE_COLORS) {
        const hex = c.hex.toUpperCase();
        if (existingByHex.has(hex)) {
          skippedCount++;
          continue;
        }
        const res = await discordApi(env, `/guilds/${guildId}/roles`, {
          method: 'POST',
          body: JSON.stringify({
            name: c.name,
            color: parseInt(hex, 16),
            mentionable: false,
          }),
        });
        if (res.ok) {
          createdCount++;
          existingByHex.add(hex);
        }
      }

      return infoV2('wplace カラーロール セットアップ完了', [
        `新規作成: ${createdCount}件`,
        `既存スキップ: ${skippedCount}件`,
      ]);
    },
  },
];

const COMMAND_MAP = new Map(COMMANDS_LIST.map((cmd) => [cmd.name, cmd]));

// ==========================================
// コンポーネント操作（type === 3）ハンドラ
// ==========================================
async function handleComponentInteraction(interaction, env) {
  const customId = interaction.data?.custom_id || '';
  const user = interaction.member?.user || interaction.user;
  const guildId = interaction.guild_id;

  // 1. map_refresh
  if (customId === 'map_refresh') {
    try {
      const buffer = await createMergedImageBuffer();
      const nowStr = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
      const payload = buildV2Payload({
        components: buildMapComponents('jplace.png', `最新更新: ${nowStr}（4×4タイル / 領域 922,364 〜 3866,3904）`),
        file: {
          buffer,
          name: 'jplace.png',
          type: 'image/png',
          description: '最新jplace合成マップ',
        },
      });
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: payload.body,
        headers: payload.headers,
      });
    } catch (err) {
      const errPayload = buildV2Payload(errorV2(`マップ更新に失敗しました: ${err.message}`, false));
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
    }
    return;
  }

  // 2. map_my_highlight（エフェメラルフォローアップ送信）
  if (customId === 'map_my_highlight') {
    try {
      if (!guildId || !user) {
        const errPayload = buildV2Payload(errorV2('サーバー内でのみ利用できます。', true), { ephemeral: true });
        await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
          method: 'PATCH',
          body: errPayload.body,
          headers: errPayload.headers,
        });
        return;
      }

      const guildRoles = await fetchGuildRoles(env, guildId);
      const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
      const colorRoles = getUserWplaceRoles(guildRoles, member, interaction.data.resolved?.roles);

      if (colorRoles.length === 0) {
        const errPayload = buildV2Payload(
          errorV2('あなたの所属するwplaceカラーロールが見つかりません。', true),
          { ephemeral: true }
        );
        await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
          method: 'PATCH',
          body: errPayload.body,
          headers: errPayload.headers,
        });
        return;
      }

      const primaryRole = colorRoles[0];
      const hex = formatHex6(primaryRole.color);
      const colorEntry = WPLACE_BY_HEX.get(hex);
      const buffer = await createHighlightImageBuffer(hex);
      const filename = `my_highlight_${hex}.png`;

      const followupPayload = buildV2Payload(
        {
          components: [
            containerComp({
              accentColor: parseInt(hex, 16),
              components: [
                textComp(
                  `**自国ハイライト：${primaryRole.name}**\nカラー: #${hex}${colorEntry ? `（${colorEntry.name}）` : ''} のみを強調表示しています。`
                ),
                mediaGalleryComp(filename, `${primaryRole.name} ハイライトマップ`),
              ],
            }),
          ],
          file: {
            buffer,
            name: filename,
            type: 'image/png',
            description: `${primaryRole.name} ハイライトマップ`,
          },
        },
        { ephemeral: true }
      );

      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: followupPayload.body,
        headers: followupPayload.headers,
      });
    } catch (err) {
      const errPayload = buildV2Payload(errorV2(`自国ハイライト生成に失敗しました: ${err.message}`, true), { ephemeral: true });
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
    }
    return;
  }

  // 3. sector_select
  if (customId === 'sector_select') {
    const selectedArea = interaction.data?.values?.[0] || null;
    const sector = parseSectorArea(selectedArea);
    if (!sector) {
      const errPayload = buildV2Payload(errorV2('不正な区画が選択されました。', false));
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
      return;
    }

    try {
      const buffer = await createSectorImageBuffer(sector.code);
      const filename = `sector_${sector.code}.png`;
      const payload = buildV2Payload({
        components: buildSectorComponents(sector.code, filename),
        file: {
          buffer,
          name: filename,
          type: 'image/png',
          description: `区画 ${sector.code} 拡大`,
        },
      });
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: payload.body,
        headers: payload.headers,
      });
    } catch (err) {
      const errPayload = buildV2Payload(errorV2(`区画画像の更新に失敗しました: ${err.message}`, false));
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
    }
    return;
  }

  // 4. nations_refresh
  if (customId === 'nations_refresh') {
    try {
      const guildRoles = await fetchGuildRoles(env, guildId);
      const colorRoles = guildRoles.filter(isWplaceColorRole);
      let memberCountMap = null;
      try {
        const members = await fetchGuildMembersAll(env, guildId);
        memberCountMap = new Map();
        for (const r of colorRoles) memberCountMap.set(r.id, 0);
        for (const m of members) {
          for (const rid of m.roles || []) {
            if (memberCountMap.has(rid)) {
              memberCountMap.set(rid, memberCountMap.get(rid) + 1);
            }
          }
        }
      } catch {
        memberCountMap = null;
      }

      const payload = buildV2Payload({
        components: buildNationsComponents(colorRoles, memberCountMap),
      });
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: payload.body,
        headers: payload.headers,
      });
    } catch (err) {
      const errPayload = buildV2Payload(errorV2(`国家一覧の更新に失敗しました: ${err.message}`, false));
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
    }
    return;
  }

  // 5. panel_to_directory
  if (customId === 'panel_to_directory') {
    try {
      const guildRoles = await fetchGuildRoles(env, guildId);
      const colorRoles = guildRoles.filter(isWplaceColorRole);
      const lines = colorRoles.length
        ? colorRoles.map((r, i) => `${i + 1}. <@&${r.id}>（${r.name} / #${formatHex6(r.color)}）`)
        : ['wplaceカラーロールは見つかりませんでした。'];

      const payload = buildV2Payload({
        components: [
          containerComp({
            accentColor: 0x4093e4,
            components: [
              textComp(`**wplace カラーロール ディレクトリ**\n該当ロール数: ${colorRoles.length}件\n\n${lines.join('\n')}`),
            ],
          }),
        ],
      });
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: payload.body,
        headers: payload.headers,
      });
    } catch (err) {
      const errPayload = buildV2Payload(errorV2(`一覧切替に失敗しました: ${err.message}`, false));
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'PATCH',
        body: errPayload.body,
        headers: errPayload.headers,
      });
    }
    return;
  }

  // 6. 合意型ボタン（act_accept / act_reject / act_cancel）
  const actMatch = customId.match(/^(act_accept|act_reject|act_cancel):([^:]+):([^:]+):([^:]+)$/);
  if (actMatch) {
    const [, op, actionTypeValue, fromRoleId, toRoleId] = actMatch;
    const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
    const memberRoleIds = new Set(member?.roles || []);

    if ((op === 'act_accept' || op === 'act_reject') && !memberRoleIds.has(toRoleId)) {
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'POST',
        ...buildV2Payload(errorV2('この操作は対象国ロールを所持するメンバーのみ実行できます。', true), { ephemeral: true }),
      });
      return;
    }

    if (op === 'act_cancel' && !memberRoleIds.has(fromRoleId)) {
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'POST',
        ...buildV2Payload(errorV2('この操作は宣言国ロールを所持するメンバーのみ実行できます。', true), { ephemeral: true }),
      });
      return;
    }

    const statusMap = {
      act_accept: '締結成立',
      act_reject: '拒否・不成立',
      act_cancel: '提案取下げ',
    };

    const existingText = interaction.message?.components?.[0]?.components?.[0]?.content || '';
    const titleLine = existingText.match(/^件名:\s*(.+)$/m)?.[1] || null;
    const msgLine = existingText.match(/^声明文:\s*(.+)$/m)?.[1] || null;

    const guildRoles = await fetchGuildRoles(env, guildId);
    const fromRole = guildRoles.find((r) => r.id === fromRoleId) || { id: fromRoleId, name: fromRoleId, color: 0x4093e4 };
    const toRole = guildRoles.find((r) => r.id === toRoleId) || { id: toRoleId, name: toRoleId, color: 0x4093e4 };

    const updatedPayload = buildV2Payload({
      components: buildActionComponents({
        actionTypeValue,
        fromRole,
        toRole,
        title: titleLine,
        message: msgLine,
        statusText: statusMap[op],
        disabled: true,
      }),
    });

    await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
      method: 'PATCH',
      body: updatedPayload.body,
      headers: updatedPayload.headers,
    });
    return;
  }

  // 7. 永世中立宣言（neutral_approve / neutral_revoke）
  const neutralMatch = customId.match(/^(neutral_approve|neutral_revoke):([^:]+)$/);
  if (neutralMatch) {
    const [, op, fromRoleId] = neutralMatch;
    const guildRoles = await fetchGuildRoles(env, guildId);
    const member = await fetchGuildMember(env, guildId, user.id) || interaction.member;
    const memberRoleIds = new Set(member?.roles || []);
    const userColorRoles = getUserWplaceRoles(guildRoles, member, interaction.data.resolved?.roles);
    const isAdmin = hasAdminPermission(member);

    if (userColorRoles.length === 0 && !isAdmin) {
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'POST',
        ...buildV2Payload(
          errorV2('公認または取消を行うにはwplaceカラーロール（または管理者権限）が必要です。', true),
          { ephemeral: true }
        ),
      });
      return;
    }

    if (memberRoleIds.has(fromRoleId) && !isAdmin) {
      await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
        method: 'POST',
        ...buildV2Payload(errorV2('自国による自己公認・自己取消はできません。', true), { ephemeral: true }),
      });
      return;
    }

    const approverLabel = userColorRoles.length > 0 ? userColorRoles[0].name : '運営（管理者）';
    const existingText = interaction.message?.components?.[0]?.components?.[0]?.content || '';
    const titleLine = existingText.match(/^件名:\s*(.+)$/m)?.[1] || null;
    const msgLine = existingText.match(/^声明文:\s*(.+)$/m)?.[1] || null;
    const currentApproved = parseApprovedNationsFromText(existingText);

    let nextApproved = [...currentApproved];
    if (op === 'neutral_approve') {
      if (!nextApproved.includes(approverLabel)) {
        nextApproved.push(approverLabel);
      }
    } else if (op === 'neutral_revoke') {
      nextApproved = nextApproved.filter((name) => name !== approverLabel);
    }

    const fromRole = guildRoles.find((r) => r.id === fromRoleId) || { id: fromRoleId, name: fromRoleId, color: 0x4093e4 };
    const updatedPayload = buildV2Payload({
      components: buildActionComponents({
        actionTypeValue: 'eternal_neutrality',
        fromRole,
        toRole: null,
        title: titleLine,
        message: msgLine,
        disabled: false,
        approvedNations: nextApproved,
      }),
    });

    await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
      method: 'PATCH',
      body: updatedPayload.body,
      headers: updatedPayload.headers,
    });
  }
}

// ==========================================
// 署名検証（Ed25519 WebCrypto）
// ==========================================
function hexToUint8Array(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function verifyDiscordSignature(request, publicKeyHex, rawBodyText) {
  const signature = request.headers.get('X-Signature-Ed25519');
  const timestamp = request.headers.get('X-Signature-Timestamp');
  if (!signature || !timestamp || !publicKeyHex) return false;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      hexToUint8Array(publicKeyHex),
      { name: 'Ed25519', namedCurve: 'Ed25519' },
      false,
      ['verify']
    );
    const encoder = new TextEncoder();
    const message = encoder.encode(`${timestamp}${rawBodyText}`);
    return crypto.subtle.verify('Ed25519', key, hexToUint8Array(signature), message);
  } catch {
    return false;
  }
}

// ==========================================
// Cloudflare Worker エントリポイント
// ==========================================
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // /register エンドポイント：最新の COMMANDS_LIST を一括登録
    if (request.method === 'POST' && url.pathname === '/register') {
      try {
        const formattedCommands = COMMANDS_LIST.map((cmd) => {
          const obj = {
            name: cmd.name,
            description: cmd.description,
          };
          if (cmd.options) obj.options = cmd.options;
          if (cmd.default_member_permissions) {
            obj.default_member_permissions = cmd.default_member_permissions;
          }
          return obj;
        });

        const endpoint = env.GUILD_ID
          ? `/applications/${env.APPLICATION_ID}/guilds/${env.GUILD_ID}/commands`
          : `/applications/${env.APPLICATION_ID}/commands`;

        const res = await discordApi(env, endpoint, {
          method: 'PUT',
          body: JSON.stringify(formattedCommands),
        });
        const text = await res.text();
        return new Response(text, {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (request.method !== 'POST') {
      return new Response('Jpace-bot v2 is running.', { status: 200 });
    }

    const rawBody = await request.text();
    const isValid = await verifyDiscordSignature(request, env.DISCORD_PUBLIC_KEY, rawBody);
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }

    const interaction = JSON.parse(rawBody);

    // type === 1: Ping
    if (interaction.type === 1) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // type === 4: Autocomplete（WPLACE_COLORS 検索）
    if (interaction.type === 4) {
      const focused = interaction.data?.options?.find((o) => o.focused);
      const query = String(focused?.value || '').toLowerCase().replace(/^#/, '');
      const filtered = WPLACE_COLORS.filter(
        (c) =>
          !query ||
          c.key.toLowerCase().includes(query) ||
          c.name.toLowerCase().includes(query) ||
          c.hex.toLowerCase().includes(query)
      )
        .slice(0, 25)
        .map((c) => ({
          name: `${c.name} (#${c.hex})`,
          value: c.key,
        }));

      return new Response(
        JSON.stringify({
          type: 8,
          data: { choices: filtered },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // type === 2: Application Command
    if (interaction.type === 2) {
      const cmdName = interaction.data?.name;
      const command = COMMAND_MAP.get(cmdName);
      const options = interaction.data?.options || [];
      const user = interaction.member?.user || interaction.user;

      if (!command) {
        const errPayload = buildV2Payload(errorV2('不明なコマンドです。', true), { ephemeral: true });
        return new Response(errPayload.body, {
          status: 200,
          headers: { ...errPayload.headers },
        });
      }

      if (command.deferred) {
        ctx.waitUntil(
          (async () => {
            try {
              const result = await command.execute(options, user, interaction, env);
              const payload = buildV2Payload(result, { ephemeral: Boolean(result.ephemeral) });
              await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
                method: 'PATCH',
                body: payload.body,
                headers: payload.headers,
              });
            } catch (err) {
              const errPayload = buildV2Payload(errorV2(`コマンド実行中にエラーが発生しました: ${err.message}`, true), {
                ephemeral: true,
              });
              await discordApi(env, `/webhooks/${env.APPLICATION_ID}/${interaction.token}/messages/@original`, {
                method: 'PATCH',
                body: errPayload.body,
                headers: errPayload.headers,
              });
            }
          })()
        );

        return new Response(
          JSON.stringify({
            type: 5,
            data: { flags: FLAG_IS_COMPONENTS_V2 },
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      const result = await command.execute(options, user, interaction, env);
      const payload = buildV2Payload(result, { ephemeral: Boolean(result.ephemeral) });
      return new Response(
        JSON.stringify({
          type: 4,
          data: {
            flags: result.ephemeral ? FLAG_EPHEMERAL_V2 : FLAG_IS_COMPONENTS_V2,
            components: result.components,
          },
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // type === 3: Message Component（ボタン・セレクトメニュー）
    if (interaction.type === 3) {
      ctx.waitUntil(handleComponentInteraction(interaction, env));
      return new Response(JSON.stringify({ type: 6 }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ type: 1 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      (async () => {
        const buffer = await createMergedImageBuffer();
        const postPayload = buildV2Payload({
          components: buildMapComponents('jplace.png', '定期配信：現在のjplace合成マップ'),
          file: {
            buffer,
            name: 'jplace.png',
            type: 'image/png',
            description: '定期配信jplace合成マップ',
          },
        });

        await discordApi(env, `/channels/${CHANNEL_ID}/messages`, {
          method: 'POST',
          body: postPayload.body,
          headers: postPayload.headers,
        });
      })()
    );
  },
};
