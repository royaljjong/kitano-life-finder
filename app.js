const stations = {
  kitano: "東京都八王子市 北野駅",
  hachioji: "東京都八王子市 八王子駅"
};

const marketplaces = [
  ["Rakuten", (q) => `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(q)}/`],
  ["Amazon JP", (q) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}`],
  ["Nitori", (q) => `https://www.nitori-net.jp/ec/search/?q=${encodeURIComponent(q)}`],
  ["BicCamera", (q) => `https://www.biccamera.com/bc/category/?q=${encodeURIComponent(q)}`],
  ["Google Maps", (q, loc) => `https://www.google.com/maps/search/${encodeURIComponent(`${q} near ${loc}`)}`]
];

const stores = [
  {
    name: "ビックカメラ JR八王子駅店",
    tags: "가전, 세탁기, 전자제품, 설치 상담",
    query: "ビックカメラ JR八王子駅店"
  },
  {
    name: "ニトリ 八王子 주변",
    tags: "매트리스, 침대, 소파, 책상, 의자",
    query: "ニトリ 八王子"
  },
  {
    name: "ダイソー 八王子駅 주변",
    tags: "100엔샵, 주방 소품, 청소 도구, 수납",
    query: "ダイソー 八王子駅"
  },
  {
    name: "セリア 八王子 주변",
    tags: "100엔샵, 식기, 정리함, 생활 소품",
    query: "セリア 八王子"
  },
  {
    name: "無印良品 八王子 주변",
    tags: "침구, 수납, 식기, 생활잡화",
    query: "無印良品 八王子"
  },
  {
    name: "ドン・キホーテ 八王子 주변",
    tags: "야간 구매, 잡화, 전기포트, 생활품",
    query: "ドン・キホーテ 八王子"
  },
  {
    name: "ホームセンター 八王子 주변",
    tags: "DIY 침대, 공구, 조립 부품, 생활 설비",
    query: "ホームセンター 八王子"
  }
];

const items = [
  {
    id: "mattress",
    title: "매트리스",
    japanese: "マットレス シングル",
    priority: "당일",
    minBudget: 7000,
    mode: ["day1"],
    note: "첫날 수면 품질이 바로 걸립니다. 접이식/압축 배송 상품이면 수령이 쉽습니다."
  },
  {
    id: "bed",
    title: "침대 프레임 또는 DIY 받침",
    japanese: "ベッドフレーム シングル すのこ",
    priority: "첫 주",
    minBudget: 6000,
    mode: ["week1"],
    note: "당장은 매트리스만 쓰고, 첫 주에 스노코나 프레임을 붙이는 방식이 비용 부담이 낮습니다."
  },
  {
    id: "sofa",
    title: "소파 / 좌식 의자",
    japanese: "ソファ 一人暮らし 座椅子",
    priority: "낮음",
    minBudget: 5000,
    mode: ["week1"],
    note: "초반에는 좌식 의자가 공간과 예산 면에서 유리합니다."
  },
  {
    id: "dining",
    title: "식사용 책상 및 의자",
    japanese: "ダイニングテーブル 2人用 椅子",
    priority: "첫 주",
    minBudget: 8000,
    mode: ["week1"],
    note: "업무용 책상과 겸용할지 먼저 정하면 중복 구매를 줄일 수 있습니다."
  },
  {
    id: "desk",
    title: "업무용 책상",
    japanese: "ワークデスク 幅100",
    priority: "업무",
    minBudget: 7000,
    mode: ["work"],
    note: "모니터를 둘 예정이면 폭 100cm 이상, 깊이 55cm 이상부터 보는 편이 안정적입니다."
  },
  {
    id: "chair",
    title: "업무용 의자",
    japanese: "オフィスチェア 在宅ワーク",
    priority: "업무",
    minBudget: 7000,
    mode: ["work"],
    note: "재택이면 의자를 먼저 투자하고, 출퇴근이면 저가형부터 시작해도 됩니다."
  },
  {
    id: "washer",
    title: "세탁기",
    japanese: "洗濯機 一人暮らし 5kg 設置",
    priority: "첫 주",
    minBudget: 22000,
    mode: ["week1"],
    note: "배송/설치/수거 비용을 같이 확인해야 실제 총액이 맞습니다."
  },
  {
    id: "cookware",
    title: "냄비/프라이팬",
    japanese: "鍋 フライパン セット IH対応",
    priority: "당일",
    minBudget: 3000,
    mode: ["day1"],
    note: "집의 가열 방식이 IH인지 가스인지 확인하고 구매하세요."
  },
  {
    id: "knife",
    title: "칼/도마/조리도구",
    japanese: "包丁 まな板 調理器具 セット",
    priority: "당일",
    minBudget: 2500,
    mode: ["day1"],
    note: "100엔샵에서 시작하고, 칼만 별도 구매하는 구성이 실용적입니다."
  },
  {
    id: "tableware",
    title: "식기/수저/컵",
    japanese: "食器 一人暮らし セット",
    priority: "당일",
    minBudget: 1500,
    mode: ["day1"],
    note: "다이소/세리아에서 바로 해결하기 좋은 카테고리입니다."
  },
  {
    id: "cleaning",
    title: "청소/세탁 소모품",
    japanese: "掃除用品 洗濯洗剤 ハンガー",
    priority: "당일",
    minBudget: 2500,
    mode: ["day1"],
    note: "휴지, 쓰레기봉투, 세제, 행거는 도착 직후 필요합니다."
  },
  {
    id: "commute",
    title: "출퇴근 준비품",
    japanese: "通勤 バッグ 定期入れ 折りたたみ傘",
    priority: "출퇴근",
    minBudget: 3000,
    mode: ["commute"],
    note: "하치오지역 근처에서 가방, 우산, IC카드 케이스를 한 번에 찾기 좋습니다."
  }
];

const itemGrid = document.querySelector("#itemGrid");
const storeList = document.querySelector("#storeList");
const template = document.querySelector("#itemTemplate");
const locationSelect = document.querySelector("#locationSelect");
const modeSelect = document.querySelector("#modeSelect");
const filterInput = document.querySelector("#filterInput");
const checkedCount = document.querySelector("#checkedCount");
const mustCount = document.querySelector("#mustCount");
const budgetTotal = document.querySelector("#budgetTotal");
const resetChecks = document.querySelector("#resetChecks");

const state = {
  checked: JSON.parse(localStorage.getItem("kitanoChecks") || "{}")
};

function yen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}

function priorityClass(priority) {
  if (priority === "낮음") return "low";
  if (priority === "첫 주" || priority === "업무" || priority === "출퇴근") return "medium";
  return "";
}

function visibleItems() {
  const mode = modeSelect.value;
  const needle = filterInput.value.trim().toLowerCase();
  return items.filter((item) => {
    const modeMatch = mode === "all" || item.mode.includes(mode);
    const text = `${item.title} ${item.japanese} ${item.note}`.toLowerCase();
    return modeMatch && (!needle || text.includes(needle));
  });
}

function renderStores() {
  const loc = stations[locationSelect.value];
  storeList.innerHTML = "";
  stores.forEach((store) => {
    const node = document.createElement("article");
    node.className = "store";
    node.innerHTML = `
      <strong>${store.name}</strong>
      <span>${store.tags}</span>
      <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/${encodeURIComponent(`${store.query} near ${loc}`)}">지도에서 보기</a>
    `;
    storeList.append(node);
  });
}

function renderItems() {
  const loc = stations[locationSelect.value];
  const filtered = visibleItems();
  itemGrid.innerHTML = "";

  filtered.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const checkbox = node.querySelector("input");
    const priority = node.querySelector(".priority");
    checkbox.checked = Boolean(state.checked[item.id]);
    checkbox.addEventListener("change", () => {
      state.checked[item.id] = checkbox.checked;
      localStorage.setItem("kitanoChecks", JSON.stringify(state.checked));
      renderSummary();
    });

    node.querySelector(".item-title").textContent = item.title;
    node.querySelector(".item-meta").textContent = `${item.japanese} · 최소 ${yen(item.minBudget)} 예상`;
    node.querySelector(".item-note").textContent = item.note;
    priority.textContent = item.priority;
    priority.className = `priority ${priorityClass(item.priority)}`;

    const links = node.querySelector(".link-row");
    marketplaces.forEach(([name, build]) => {
      const link = document.createElement("a");
      link.href = build(item.japanese, loc);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = name;
      links.append(link);
    });
    itemGrid.append(node);
  });

  renderSummary();
}

function renderSummary() {
  const filtered = visibleItems();
  const checked = filtered.filter((item) => state.checked[item.id]).length;
  const budget = filtered.reduce((sum, item) => sum + item.minBudget, 0);
  mustCount.textContent = String(filtered.length);
  checkedCount.textContent = String(checked);
  budgetTotal.textContent = yen(budget);
}

function render() {
  renderStores();
  renderItems();
}

[locationSelect, modeSelect, filterInput].forEach((control) => {
  control.addEventListener("input", render);
});

resetChecks.addEventListener("click", () => {
  state.checked = {};
  localStorage.removeItem("kitanoChecks");
  renderItems();
});

render();
