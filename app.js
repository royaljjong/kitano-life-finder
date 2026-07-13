const MOVE_IN = new Date(2026, 6, 28); // 2026-07-28 (입주 예정일)

const stations = {
  kitano: "東京都八王子市 北野駅",
  hachioji: "東京都八王子市 八王子駅"
};

// category: furniture | appliance | kitchen | supplies | commute
const items = [
  { id: "mattress", title: "매트리스", base: "マットレス", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 12000, mode: ["day1"],
    note: "첫날 수면 품질이 바로 걸립니다. 퀸 사이즈는 압축·롤 배송 상품이면 반입이 쉽습니다." },
  { id: "bed", title: "침대 프레임 또는 DIY 받침", base: "ベッドフレーム すのこ", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "첫 주", minBudget: 10000, mode: ["week1"],
    note: "당장은 매트리스만 쓰고, 첫 주에 스노코나 프레임을 붙이는 방식이 비용 부담이 낮습니다." },
  { id: "sofa", title: "소파", base: "ソファ 一人暮らし コンパクト", category: "furniture",
    priority: "낮음", minBudget: 8000, mode: ["week1"],
    note: "1~2인용 콤팩트 소파. 방 폭과 반입 경로(문·엘리베이터)를 먼저 확인하세요." },
  { id: "dining", title: "식사용 책상 및 의자", base: "ダイニングテーブル 2人用 椅子", category: "furniture",
    priority: "첫 주", minBudget: 8000, mode: ["week1"],
    note: "업무용 책상과 겸용할지 먼저 정하면 중복 구매를 줄일 수 있습니다." },
  { id: "desk", title: "업무용 책상", base: "ワークデスク 幅100", category: "furniture",
    priority: "업무", minBudget: 7000, mode: ["work"],
    note: "모니터를 둘 예정이면 폭 100cm 이상, 깊이 55cm 이상부터 보는 편이 안정적입니다." },
  { id: "chair", title: "업무용 의자", base: "オフィスチェア 在宅ワーク", category: "furniture",
    priority: "업무", minBudget: 7000, mode: ["work"],
    note: "재택이면 의자를 먼저 투자하고, 출퇴근이면 저가형부터 시작해도 됩니다." },
  { id: "washer", title: "세탁기", base: "洗濯機 一人暮らし 5kg 設置", category: "appliance",
    priority: "첫 주", minBudget: 22000, mode: ["week1"],
    note: "배송/설치/수거 비용을 같이 확인해야 실제 총액이 맞습니다." },
  { id: "cookware", title: "냄비/프라이팬", base: "鍋 フライパン セット IH対応", category: "kitchen",
    priority: "당일", minBudget: 3000, mode: ["day1"],
    note: "집의 가열 방식이 IH인지 가스인지 확인하고 구매하세요." },
  { id: "knife", title: "칼/도마/조리도구", base: "包丁 まな板 調理器具 セット", category: "kitchen",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "100엔샵에서 시작하고, 칼만 별도 구매하는 구성이 실용적입니다." },
  { id: "tableware", title: "식기/수저/컵", base: "食器 一人暮らし セット", category: "kitchen",
    priority: "당일", minBudget: 1500, mode: ["day1"],
    note: "다이소/세리아에서 바로 해결하기 좋은 카테고리입니다." },
  { id: "cleaning", title: "청소/세탁 소모품", base: "掃除用品 洗濯洗剤 ハンガー", category: "supplies",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "휴지, 쓰레기봉투, 세제, 행거는 도착 직후 필요합니다." },
  { id: "commute", title: "출퇴근 준비품", base: "通勤 バッグ 定期入れ 折りたたみ傘", category: "commute",
    priority: "출퇴근", minBudget: 3000, mode: ["commute"],
    note: "하치오지역 근처에서 가방, 우산, IC카드 케이스를 한 번에 찾기 좋습니다." },
  { id: "fridge", title: "냉장고", base: "冷蔵庫 一人暮らし 150L", category: "appliance",
    priority: "첫 주", minBudget: 20000, mode: ["week1"],
    note: "배송·설치·기존 처분 비용을 함께 확인하세요. 150L 전후가 1인 가구에 무난합니다." },
  { id: "microwave", title: "전자레인지", base: "電子レンジ 一人暮らし", category: "appliance",
    priority: "첫 주", minBudget: 6000, mode: ["week1"],
    note: "동일본(50Hz)/서일본(60Hz) 겸용인지 확인하면 재이사에도 안전합니다." },
  { id: "ricecooker", title: "밥솥", base: "炊飯器 3合", category: "appliance",
    priority: "첫 주", minBudget: 4000, mode: ["week1"],
    note: "1인 가구는 3합이면 충분합니다." },
  { id: "kettle", title: "전기포트", base: "電気ケトル", category: "appliance",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "라면·차·커피에 바로 필요합니다. 도착 당일 우선." },
  { id: "vacuum", title: "청소기", base: "掃除機 スティック 軽量", category: "appliance",
    priority: "첫 주", minBudget: 5000, mode: ["week1"],
    note: "좁은 자취방은 가벼운 스틱형이 관리하기 편합니다." },
  { id: "curtain", title: "커튼", base: "遮光カーテン 4枚セット", category: "supplies",
    priority: "당일", minBudget: 3000, mode: ["day1"],
    note: "프라이버시·햇빛 차단 때문에 첫날 밤 전에 필요합니다. 창 크기를 재고 사세요." },
  { id: "bedding", title: "침구 세트(이불·베개·시트)", base: "掛け布団 敷きパッド 枕 シーツ", category: "supplies",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 6000, mode: ["day1"],
    note: "매트리스 사이즈(퀸)에 맞춰 시트·패드를 고르세요." },
  { id: "light", title: "조명(실링라이트)", base: "シーリングライト LED 6畳", category: "appliance",
    priority: "당일", minBudget: 4000, mode: ["day1"],
    note: "일본 자취방은 조명이 없는 경우가 많습니다. 입주 전 설치 유무를 확인하세요." },
  { id: "storage", title: "수납 선반/서랍", base: "収納ラック カラーボックス", category: "furniture",
    priority: "첫 주", minBudget: 3000, mode: ["week1"],
    note: "컬러박스·스틸랙으로 시작하면 저렴하고 확장이 쉽습니다." },
  { id: "trash", title: "쓰레기통(분리수거)", base: "ゴミ箱 分別 ふた付き", category: "supplies",
    priority: "당일", minBudget: 1500, mode: ["day1"],
    note: "일본은 분리배출이 엄격합니다. 뚜껑 있는 분리형이 편합니다." },
  { id: "dryer", title: "헤어드라이어", base: "ヘアドライヤー", category: "appliance",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "도착 당일부터 필요합니다." },
  { id: "circulator", title: "서큘레이터/선풍기", base: "サーキュレーター 扇風機", category: "appliance",
    priority: "첫 주", minBudget: 4000, mode: ["week1"],
    note: "환기·빨래 건조·냉난방 효율에 유용합니다." }
];

// appliesTo: "all" 또는 category 배열
const marketplaces = [
  { id: "rakuten", name: "Rakuten", appliesTo: "all" },
  { id: "amazon", name: "Amazon JP", appliesTo: "all" },
  { id: "yahoo", name: "Yahoo!쇼핑", appliesTo: "all" },
  { id: "mercari", name: "메루카리", appliesTo: "all", used: true },
  { id: "nitori", name: "니토리", appliesTo: ["furniture", "kitchen", "supplies"] },
  { id: "ikea", name: "IKEA", appliesTo: ["furniture"] },
  { id: "muji", name: "무인양품", appliesTo: ["furniture", "kitchen", "supplies", "commute"] },
  { id: "biccamera", name: "빅카메라", appliesTo: ["appliance"] }
];

const stores = [
  {
    name: "ビックカメラ JR八王子駅店",
    cat: "가전",
    tags: "가전, 세탁기, 전자제품, 설치 상담",
    query: "ビックカメラ JR八王子駅店",
    mapQuery: "ビックカメラ JR八王子駅店",
    coords: "35.655128,139.338979"
  },
  {
    name: "ダイソー 八王子オクトーレ店",
    cat: "100엔샵",
    tags: "100엔샵, 주방 소품, 청소 도구, 수납",
    query: "ダイソー 八王子オクトーレ店",
    mapQuery: "ダイソー 八王子オクトーレ店",
    coords: "35.659188,139.337823"
  },
  {
    name: "セリア 八王子オクトーレ店",
    cat: "100엔샵",
    tags: "100엔샵, 식기, 정리함, 생활 소품",
    query: "セリア 八王子オクトーレ店",
    mapQuery: "セリア 八王子オクトーレ店",
    coords: "35.659188,139.337823"
  },
  {
    name: "無印良品 セレオ八王子",
    cat: "생활잡화",
    tags: "침구, 수납, 식기, 생활잡화",
    query: "無印良品 セレオ八王子",
    mapQuery: "無印良品 セレオ八王子",
    coords: "35.656217,139.338821"
  },
  {
    name: "ドン・キホーテ 八王子駅前店",
    cat: "잡화",
    tags: "야간 구매, 잡화, 전기포트, 생활품",
    query: "ドン・キホーテ 八王子駅前店",
    mapQuery: "ドン・キホーテ 八王子駅前店",
    coords: "35.658708,139.339068"
  }
];

// 우선순위 시각/정렬 규칙
const PRIORITY = {
  "당일": { rank: 0, cls: "urgent" },
  "첫 주": { rank: 1, cls: "soon" },
  "업무": { rank: 2, cls: "work" },
  "출퇴근": { rank: 3, cls: "commute" },
  "낮음": { rank: 4, cls: "low" }
};

const PRIORITY_GROUPS = [
  { key: "당일",   label: "🚨 도착 당일 필수" },
  { key: "첫 주",  label: "📦 첫 주 안에" },
  { key: "업무",   label: "💻 재택 / 업무" },
  { key: "출퇴근", label: "🚃 출퇴근 대비" },
  { key: "낮음",   label: "🛋 여유 있을 때" }
];

// ---------- 검색 옵션 상태 ----------
const opts = Object.assign({
  shops: {},
  maxBudget: 0,
  sort: "default",
  freeShipping: false
}, JSON.parse(localStorage.getItem("kitanoOpts") || "{}"));

const sizeState = JSON.parse(localStorage.getItem("kitanoSizes") || "{}");

const ui = JSON.parse(localStorage.getItem("kitanoUi") || "{}"); // { hideChecked: bool }
function saveUi() { localStorage.setItem("kitanoUi", JSON.stringify(ui)); }

function saveOpts() {
  localStorage.setItem("kitanoOpts", JSON.stringify(opts));
}

function saveSizeState() {
  localStorage.setItem("kitanoSizes", JSON.stringify(sizeState));
}

function itemSize(item) {
  return item.sizes ? (sizeState[item.id] || item.defaultSize) : "";
}

function keywordFor(item) {
  let kw = item.base;
  const s = itemSize(item);
  if (s) kw += " " + s;
  if (opts.freeShipping) kw += " 送料無料";
  return kw;
}

function shopVisible(id) {
  return opts.shops[id] !== false;
}

function shopsForItem(item) {
  return marketplaces.filter(
    (mp) => (mp.appliesTo === "all" || mp.appliesTo.includes(item.category)) && shopVisible(mp.id)
  );
}

function searchUrl(mp, item) {
  const kw = keywordFor(item);
  const q = encodeURIComponent(kw);
  const max = opts.maxBudget > 0 ? opts.maxBudget : null;
  switch (mp.id) {
    case "rakuten": {
      let u = `https://search.rakuten.co.jp/search/mall/${q}/`;
      if (max) u += `?max=${max}`;
      return u;
    }
    case "amazon": {
      let u = `https://www.amazon.co.jp/s?k=${q}`;
      if (max) u += `&high-price=${max}`;
      if (opts.sort === "price") u += `&s=price-asc-rank`;
      if (opts.sort === "review") u += `&s=review-rank`;
      return u;
    }
    case "yahoo":
      return `https://shopping.yahoo.co.jp/search?p=${q}`;
    case "mercari": {
      let u = `https://jp.mercari.com/search?keyword=${q}`;
      if (max) u += `&price_max=${max}`;
      if (opts.sort === "price") u += `&sort=price&order=asc`;
      return u;
    }
    case "nitori":
      return `https://www.nitori-net.jp/ec/search/?q=${q}`;
    case "ikea":
      return `https://www.ikea.com/jp/ja/search/?q=${q}`;
    case "muji":
      return `https://www.muji.com/jp/ja/store/search/cmdty/${q}`;
    case "biccamera":
      return `https://www.biccamera.com/bc/category/?q=${q}`;
    default:
      return `https://www.google.com/search?q=${q}`;
  }
}

// ---------- 지도 ----------
function mapEmbedSrc(query, zoom) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom || 15}&output=embed`;
}

function mapOpenUrl(query) {
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

function storeMapTarget(store) {
  return store.coords || store.mapQuery || store.query;
}

function storeOpenTarget(store) {
  return store.mapQuery || store.query || store.coords;
}

function catToJa(cat) {
  switch (cat) {
    case "가전":
      return "家電量販店";
    case "가구":
      return "家具";
    case "100엔샵":
      return "100円ショップ";
    case "생활잡화":
      return "生活雑貨";
    case "잡화":
      return "ドンキホーテ";
    case "DIY":
      return "ホームセンター";
    default:
      return "生活雑貨";
  }
}

const MAP_CATEGORIES = ["전체", "가전", "100엔샵", "생활잡화", "잡화"];

// ---------- DOM refs ----------
const itemGrid = document.querySelector("#itemGrid");
const itemTemplate = document.querySelector("#itemTemplate");
const storeTemplate = document.querySelector("#storeTemplate");
const locationSelect = document.querySelector("#locationSelect");
const modeSelect = document.querySelector("#modeSelect");
const filterInput = document.querySelector("#filterInput");
const checkedCount = document.querySelector("#checkedCount");
const checkedTotal = document.querySelector("#checkedTotal");
const mustCount = document.querySelector("#mustCount");
const budgetTotal = document.querySelector("#budgetTotal");
const budgetHint = document.querySelector("#budgetHint");
const progressBar = document.querySelector("#progressBar");
const progressStripBar = document.querySelector("#progressStripBar");
const progressStripText = document.querySelector("#progressStripText");
const itemCountLabel = document.querySelector("#itemCountLabel");
const emptyState = document.querySelector("#emptyState");
const resetChecks = document.querySelector("#resetChecks");
const hideCheckedToggle = document.querySelector("#hideCheckedToggle");
const ddayBadge = document.querySelector("#ddayBadge");
const ddayLabel = document.querySelector(".dday-label");

const tabChecklist = document.querySelector("#tabChecklist");
const tabMap = document.querySelector("#tabMap");
const panelChecklist = document.querySelector("#panelChecklist");
const panelMap = document.querySelector("#panelMap");
const checklistOnlyControls = document.querySelectorAll(".checklist-only");

const optionsToggle = document.querySelector("#optionsToggle");
const searchOptions = document.querySelector("#searchOptions");
const shopChips = document.querySelector("#shopChips");
const maxBudgetSelect = document.querySelector("#maxBudgetSelect");
const sortSelect = document.querySelector("#sortSelect");
const freeShippingCheck = document.querySelector("#freeShippingCheck");

const mapCategoryChips = document.querySelector("#mapCategoryChips");
const mapStoreList = document.querySelector("#mapStoreList");
const mapFrame = document.querySelector("#mapFrame");
const mapOpenTop = document.querySelector("#mapOpenTop");
const mapOpenBottom = document.querySelector("#mapOpenBottom");

const MODE_LABELS = {
  all: "전체 품목",
  day1: "도착 당일 품목",
  week1: "첫 주 품목",
  work: "재택 / 업무 품목",
  commute: "출퇴근 대비 품목"
};

const state = {
  checked: JSON.parse(localStorage.getItem("kitanoChecks") || "{}"),
  activeTab: "checklist",
  mapCategory: "전체",
  mapStore: null
};

function yen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}

function priorityClass(priority) {
  return (PRIORITY[priority] || PRIORITY["낮음"]).cls;
}

function renderDday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((MOVE_IN - today) / 86400000);
  if (diff > 0) {
    ddayBadge.textContent = `D-${diff}`;
    ddayLabel.textContent = "입주까지";
  } else if (diff === 0) {
    ddayBadge.textContent = "D-day";
    ddayLabel.textContent = "오늘 입주";
  } else {
    ddayBadge.textContent = `D+${Math.abs(diff)}`;
    ddayLabel.textContent = "입주 후";
  }
}

// ---------- Tabs ----------
function setActiveTab(tab) {
  state.activeTab = tab;
  const isChecklist = tab === "checklist";
  tabChecklist.setAttribute("aria-selected", String(isChecklist));
  tabMap.setAttribute("aria-selected", String(!isChecklist));
  panelChecklist.classList.toggle("hidden", !isChecklist);
  panelMap.classList.toggle("hidden", isChecklist);
  checklistOnlyControls.forEach((el) => el.classList.toggle("hidden", !isChecklist));
}

tabChecklist.addEventListener("click", () => setActiveTab("checklist"));
tabMap.addEventListener("click", () => setActiveTab("map"));

// ---------- Search options panel ----------
function renderShopChips() {
  shopChips.innerHTML = "";
  marketplaces.forEach((mp) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shop-chip";
    btn.setAttribute("aria-pressed", String(shopVisible(mp.id)));
    btn.classList.toggle("is-off", !shopVisible(mp.id));
    btn.textContent = mp.used ? `${mp.name} · 중고` : mp.name;
    btn.addEventListener("click", () => {
      opts.shops[mp.id] = shopVisible(mp.id) ? false : true;
      saveOpts();
      renderShopChips();
      renderItems();
    });
    shopChips.append(btn);
  });
}

function initOptionsPanel() {
  maxBudgetSelect.value = String(opts.maxBudget || 0);
  sortSelect.value = opts.sort || "default";
  freeShippingCheck.checked = Boolean(opts.freeShipping);
  renderShopChips();
}

optionsToggle.addEventListener("click", () => {
  const isHidden = searchOptions.classList.toggle("hidden");
  optionsToggle.setAttribute("aria-expanded", String(!isHidden));
});

maxBudgetSelect.addEventListener("change", () => {
  opts.maxBudget = Number(maxBudgetSelect.value) || 0;
  saveOpts();
  renderItems();
});

sortSelect.addEventListener("change", () => {
  opts.sort = sortSelect.value;
  saveOpts();
  renderItems();
});

freeShippingCheck.addEventListener("change", () => {
  opts.freeShipping = freeShippingCheck.checked;
  saveOpts();
  renderItems();
});

// ---------- Checklist ----------
function visibleItems() {
  const mode = modeSelect.value;
  const needle = filterInput.value.trim().toLowerCase();
  return items
    .filter((item) => {
      const modeMatch = mode === "all" || item.mode.includes(mode);
      const text = `${item.title} ${item.base} ${item.note}`.toLowerCase();
      return modeMatch && (!needle || text.includes(needle));
    })
    .sort((a, b) => {
      const ra = (PRIORITY[a.priority] || PRIORITY["낮음"]).rank;
      const rb = (PRIORITY[b.priority] || PRIORITY["낮음"]).rank;
      if (ra !== rb) return ra - rb;
      return b.minBudget - a.minBudget;
    });
}

function buildItemCard(item) {
  const node = itemTemplate.content.firstElementChild.cloneNode(true);
  const checkbox = node.querySelector("input");
  const priority = node.querySelector(".priority");
  const isChecked = Boolean(state.checked[item.id]);

  checkbox.checked = isChecked;
  node.classList.toggle("is-checked", isChecked);
  checkbox.addEventListener("change", () => {
    state.checked[item.id] = checkbox.checked;
    localStorage.setItem("kitanoChecks", JSON.stringify(state.checked));
    node.classList.toggle("is-checked", checkbox.checked);
    if (ui.hideChecked && checkbox.checked) { renderItems(); }
    else { renderSummary(); }
  });

  node.querySelector(".item-title").textContent = item.title;
  node.querySelector(".item-note").textContent = item.note;
  node.querySelector(".item-budget").innerHTML = `최소 예상 <b>${yen(item.minBudget)}</b>`;
  priority.textContent = item.priority;
  priority.className = `priority ${priorityClass(item.priority)}`;

  const sizeChipsWrap = node.querySelector(".size-chips");
  if (item.sizes) {
    item.sizes.forEach((size) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "size-chip";
      chip.textContent = size;
      chip.classList.toggle("is-active", itemSize(item) === size);
      chip.addEventListener("click", () => {
        sizeState[item.id] = size;
        saveSizeState();
        refreshItemCard(node, item);
      });
      sizeChipsWrap.append(chip);
    });
  } else {
    sizeChipsWrap.classList.add("hidden");
  }

  node.querySelector(".item-keyword").textContent = keywordFor(item);

  const links = node.querySelector(".link-row");
  shopsForItem(item).forEach((mp) => {
    const link = document.createElement("a");
    link.href = searchUrl(mp, item);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = mp.name;
    links.append(link);
  });

  return node;
}

function renderItems() {
  const filtered = visibleItems();                 // mode+search — 요약 계산용(미완료 필터 영향 X)
  const display = ui.hideChecked
    ? filtered.filter((it) => !state.checked[it.id])
    : filtered;

  itemGrid.innerHTML = "";
  const empty = display.length === 0;
  emptyState.classList.toggle("hidden", !empty);
  if (empty) {
    emptyState.textContent = (ui.hideChecked && filtered.length > 0)
      ? "이 조건의 항목을 모두 완료했어요! 🎉"
      : "조건에 맞는 품목이 없습니다. 필터를 조정해 보세요.";
  }

  PRIORITY_GROUPS.forEach((group) => {
    const groupItems = display.filter((it) => it.priority === group.key);
    if (!groupItems.length) return;
    const section = document.createElement("div");
    section.className = "item-group";
    const head = document.createElement("h3");
    head.className = "group-head";
    head.innerHTML =
      `<span class="group-dot ${PRIORITY[group.key].cls}"></span>` +
      `${group.label}<span class="group-count">${groupItems.length}</span>`;
    const grid = document.createElement("div");
    grid.className = "item-grid";
    groupItems.forEach((item) => grid.append(buildItemCard(item)));
    section.append(head, grid);
    itemGrid.append(section);
  });

  itemCountLabel.textContent = `${MODE_LABELS[modeSelect.value] || "품목"} · ${filtered.length}개`;
  renderSummary();
}

function refreshItemCard(node, item) {
  node.querySelectorAll(".size-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.textContent === itemSize(item));
  });
  node.querySelector(".item-keyword").textContent = keywordFor(item);
  const links = node.querySelector(".link-row");
  const anchors = links.querySelectorAll("a");
  const shops = shopsForItem(item);
  anchors.forEach((a, i) => {
    if (shops[i]) a.href = searchUrl(shops[i], item);
  });
}

function stripBar(done, total) {
  const segs = 10;
  const filled = total ? Math.round((done / total) * segs) : 0;
  return "▓".repeat(filled) + "░".repeat(segs - filled);
}

function renderSummary() {
  const filtered = visibleItems();
  const checked = filtered.filter((item) => state.checked[item.id]).length;
  const remaining = filtered
    .filter((item) => !state.checked[item.id])
    .reduce((sum, item) => sum + item.minBudget, 0);
  const pct = filtered.length ? Math.round((checked / filtered.length) * 100) : 0;

  mustCount.textContent = String(filtered.length);
  checkedCount.textContent = String(checked);
  checkedTotal.textContent = `/ ${filtered.length}`;
  progressBar.style.width = `${pct}%`;
  budgetTotal.textContent = yen(remaining);
  budgetHint.textContent = checked > 0 ? `미체크 ${filtered.length - checked}개 기준` : "미체크 항목 기준";

  progressStripBar.textContent = stripBar(checked, filtered.length);
  progressStripText.textContent = `${checked}/${filtered.length} 완료 · 남은 예산 ${yen(remaining)}`;
}

resetChecks.addEventListener("click", () => {
  state.checked = {};
  localStorage.removeItem("kitanoChecks");
  renderItems();
});

hideCheckedToggle.checked = Boolean(ui.hideChecked);
hideCheckedToggle.addEventListener("change", () => {
  ui.hideChecked = hideCheckedToggle.checked;
  saveUi();
  renderItems();
});

[modeSelect, filterInput].forEach((control) => {
  control.addEventListener("input", renderItems);
});

// ---------- Map tab ----------
function currentMapQuery() {
  const loc = stations[locationSelect.value];
  if (state.mapStore) {
    return storeMapTarget(state.mapStore);
  }
  return `${catToJa(state.mapCategory === "전체" ? "all" : state.mapCategory)} ${loc}`;
}

function updateMapFrame() {
  const query = currentMapQuery();
  const zoom = state.mapStore ? 17 : 15;
  mapFrame.src = mapEmbedSrc(query, zoom);
  const openHref = mapOpenUrl(query);
  mapOpenTop.href = openHref;
  mapOpenBottom.href = openHref;
}

function renderMapCategoryChips() {
  mapCategoryChips.innerHTML = "";
  MAP_CATEGORIES.forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "map-chip";
    chip.textContent = cat;
    chip.classList.toggle("is-active", state.mapCategory === cat);
    chip.addEventListener("click", () => {
      state.mapCategory = cat;
      state.mapStore = null;
      renderMapCategoryChips();
      renderMapStores();
      updateMapFrame();
    });
    mapCategoryChips.append(chip);
  });
}

function renderMapStores() {
  const filtered = stores.filter((store) => state.mapCategory === "전체" || store.cat === state.mapCategory);
  mapStoreList.innerHTML = "";
  filtered.forEach((store) => {
    const node = storeTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".store-name").textContent = store.name;
    node.querySelector(".store-cat").textContent = store.cat;
    node.querySelector(".store-tags").textContent = store.tags;
    node.classList.toggle("is-active", state.mapStore && state.mapStore.query === store.query);

    const showBtn = node.querySelector(".store-show-btn");
    showBtn.addEventListener("click", () => {
      state.mapStore = store;
      renderMapStores();
      updateMapFrame();
    });

    const dirLink = node.querySelector(".store-dir-link");
    dirLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(storeOpenTarget(store))}`;

    const openLink = node.querySelector(".store-open-link");
    openLink.href = mapOpenUrl(storeOpenTarget(store));

    mapStoreList.append(node);
  });
}

locationSelect.addEventListener("change", () => {
  renderMapStores();
  updateMapFrame();
});

function initMap() {
  renderMapCategoryChips();
  renderMapStores();
  updateMapFrame();
}

renderDday();
initOptionsPanel();
renderItems();
initMap();
setActiveTab("checklist");
