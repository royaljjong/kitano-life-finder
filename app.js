const MOVE_IN = new Date(2026, 6, 28); // 2026-07-28 (입주 예정일)

const stations = {
  kitano: "東京都八王子市 北野駅",
  hachioji: "東京都八王子市 八王子駅"
};

// category: furniture | appliance | kitchen | supplies | commute
const items = [
  { id: "mattress", title: "매트리스", base: "マットレス", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 15000, mode: ["day1"],
    note: "첫날 수면 품질이 바로 걸립니다. 퀸 사이즈는 압축·롤 배송 상품이면 반입이 쉽습니다. 추천 상품은 상품 페이지에서 クイーン(퀸) 사이즈를 선택하세요.",
    pick: { name: "高反発マットレス「純」3つ折り 10cm", price: 5555, rating: "4.43", reviews: "1.9만", url: "https://item.rakuten.co.jp/tansu/13810084/" } },
  { id: "bed", title: "침대 프레임 또는 DIY 받침", base: "ベッドフレーム すのこ", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "첫 주", minBudget: 8000, mode: ["week1"],
    note: "당장은 매트리스만 쓰고, 첫 주에 스노코나 프레임을 붙이는 방식이 비용 부담이 낮습니다.",
    pick: { name: "스노코 침대(높이조절, DONDON)", price: 7498, rating: "4.29", reviews: "6,097", url: "https://item.rakuten.co.jp/dondon/ysb-001-s/" } },
  { id: "sofa", title: "소파", base: "ソファ 一人暮らし コンパクト", category: "furniture",
    priority: "낮음", minBudget: 8000, mode: ["week1"],
    note: "1~2인용 콤팩트 소파. 방 폭과 반입 경로(문·엘리베이터)를 먼저 확인하세요.",
    pick: { name: "和楽 콤팩트 2인 소파(일본제)", price: 19900, rating: "4.43", reviews: "7,457", url: "https://item.rakuten.co.jp/takamine/a01_pvc/" } },
  { id: "dining", title: "식사용 책상 및 의자", base: "ダイニングテーブル 2人用 椅子", category: "furniture",
    priority: "첫 주", minBudget: 7000, mode: ["week1"],
    note: "업무용 책상과 겸용할지 먼저 정하면 중복 구매를 줄일 수 있습니다.",
    pick: { name: "카페테이블+체어 세트", price: 6880, rating: "4.51", reviews: "697", url: "https://item.rakuten.co.jp/kaitekilife117/z103/" } },
  { id: "desk", title: "업무용 책상", base: "ワークデスク 幅100", category: "furniture",
    priority: "업무", minBudget: 9000, mode: ["work"],
    note: "모니터를 둘 예정이면 폭 100cm 이상, 깊이 55cm 이상부터 보는 편이 안정적입니다.",
    pick: { name: "산와다이렉트 데스크 폭100", price: 9980, rating: "4.66", reviews: "494", url: "https://item.rakuten.co.jp/sanwadirect/100-deskf003/" } },
  { id: "chair", title: "업무용 의자", base: "オフィスチェア 在宅ワーク", category: "furniture",
    priority: "업무", minBudget: 4500, mode: ["work"],
    note: "재택이면 의자를 먼저 투자하고, 출퇴근이면 저가형부터 시작해도 됩니다.",
    pick: { name: "LOWYA 메쉬 오피스체어", price: 11990, rating: "4.35", reviews: "1.8만", url: "https://item.rakuten.co.jp/low-ya/vg-sirius/" } },
  { id: "washer", title: "세탁기", base: "洗濯機 一人暮らし 5kg 設置", category: "appliance",
    priority: "첫 주", minBudget: 26000, mode: ["week1"],
    note: "배송/설치/수거 비용을 같이 확인해야 실제 총액이 맞습니다.",
    pick: { name: "아이리스오야마 세탁기 6kg IAW-T604", price: 29800, rating: "4.37", reviews: "1,720", url: "https://item.rakuten.co.jp/enetroom/573828/" } },
  { id: "cookware", title: "냄비/프라이팬", base: "鍋 フライパン セット IH対応", category: "kitchen",
    priority: "당일", minBudget: 3500, mode: ["day1"],
    note: "집의 가열 방식이 IH인지 가스인지 확인하고 구매하세요.",
    pick: { name: "CAROTE 팬·냄비 10점 세트(IH)", price: 6698, rating: "4.51", reviews: "2,909", url: "https://item.rakuten.co.jp/cookware-carote/j0333203429/" } },
  { id: "knife", title: "칼/도마/조리도구", base: "包丁 まな板 調理器具 セット", category: "kitchen",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "100엔샵에서 시작하고, 칼만 별도 구매하는 구성이 실용적입니다.",
    pick: { name: "Latuna 세라믹 산토쿠칼(일본제)", price: 3180, rating: "4.34", reviews: "2,806", url: "https://item.rakuten.co.jp/latuna/10000007/" } },
  { id: "tableware", title: "식기/수저/컵", base: "食器 一人暮らし セット", category: "kitchen",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "다이소/세리아에서 바로 해결하기 좋은 카테고리입니다.",
    pick: { name: "WAYOWAN 안 깨지는 식기 5점", price: 3740, rating: "4.73", reviews: "162", url: "https://item.rakuten.co.jp/asahikoyo/wayowan-5set/" } },
  { id: "cleaning", title: "청소/세탁 소모품", base: "掃除用品 洗濯洗剤 ハンガー", category: "supplies",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "휴지, 쓰레기봉투, 세제, 행거는 도착 직후 필요합니다.",
    pick: { name: "카오·라이온 세제 기프트세트", price: 1650, rating: "4.7", reviews: "135", url: "https://item.rakuten.co.jp/auc-hachidai/g430g10/" } },
  { id: "commute", title: "출퇴근 준비품", base: "通勤 バッグ 定期入れ 折りたたみ傘", category: "commute",
    priority: "출퇴근", minBudget: 4000, mode: ["commute"],
    note: "하치오지역 근처에서 가방, 우산, IC카드 케이스를 한 번에 찾기 좋습니다.",
    pick: { name: "방수 비즈니스 백팩 30L(PC수납)", price: 5988, rating: "4.52", reviews: "3,281", url: "https://item.rakuten.co.jp/aisfajapan/cs-01/" } },
  { id: "fridge", title: "냉장고", base: "冷蔵庫 一人暮らし 170L", category: "appliance",
    priority: "첫 주", minBudget: 28000, mode: ["week1"],
    note: "자취 요리엔 150L보다 170L 전후가 여유 있습니다. 신품 170L은 ¥28,000~. 배송·설치·기존 처분 비용을 함께 확인하세요.",
    pick: { name: "아이리스오야마 냉장고 170L 2도어", price: 32800, rating: "4.02", reviews: "260", url: "https://item.rakuten.co.jp/enetroom/573739/" } },
  { id: "microwave", title: "전자레인지", base: "電子レンジ 一人暮らし", category: "appliance",
    priority: "첫 주", minBudget: 8000, mode: ["week1"],
    note: "동일본(50Hz)/서일본(60Hz) 겸용인지 확인하면 재이사에도 안전합니다.",
    pick: { name: "아이리스오야마 전자레인지 17L", price: 8980, rating: "4.36", reviews: "2,376", url: "https://item.rakuten.co.jp/kadenrand/560082/" } },
  { id: "ricecooker", title: "밥솥", base: "炊飯器 3合", category: "appliance",
    priority: "첫 주", minBudget: 6000, mode: ["week1"],
    note: "1인 가구는 3합이면 충분합니다.",
    pick: { name: "타이거 마이콘 밥솥 5.5합 JBH-G101W", price: 8980, rating: "4.63", reviews: "978", url: "https://item.rakuten.co.jp/rcmdki/t2-4904710418932/" } },
  { id: "kettle", title: "전기포트", base: "電気ケトル", category: "appliance",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "라면·차·커피에 바로 필요합니다. 도착 당일 우선.",
    pick: { name: "Latuna 유리 전기케틀 1L", price: 3490, rating: "4.39", reviews: "3,306", url: "https://item.rakuten.co.jp/latuna/10000015/" } },
  { id: "vacuum", title: "청소기", base: "掃除機 スティック 軽量", category: "appliance",
    priority: "첫 주", minBudget: 6000, mode: ["week1"],
    note: "좁은 자취방은 가벼운 스틱형이 관리하기 편합니다.",
    pick: { name: "Orage C33 무선 스틱청소기", price: 7980, rating: "4.33", reviews: "6,543", url: "https://item.rakuten.co.jp/nanobig/cleaner_cordless_c33/" } },
  { id: "curtain", title: "커튼", base: "遮光カーテン 4枚セット", category: "supplies",
    priority: "당일", minBudget: 3700, mode: ["day1"],
    note: "프라이버시·햇빛 차단 때문에 첫날 밤 전에 필요합니다. 창 크기를 재고 사세요.",
    pick: { name: "満天 1급차광 커튼 4장(레이스 포함)", price: 8980, rating: "4.41", reviews: "3,941", url: "https://item.rakuten.co.jp/manten-curtain/s4p_syak_00/" } },
  { id: "bedding", title: "침구 세트(이불·베개·시트)", base: "掛け布団 敷きパッド 枕 シーツ", category: "supplies",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 6000, mode: ["day1"],
    note: "매트리스 사이즈(퀸)에 맞춰 시트·패드를 고르세요. 이불 본체는 니토리 매장 구매와 병행하면 편합니다.",
    pick: { name: "noone 사텐 이불커버(면100·퀸 선택)", price: 4980, rating: "4.55", reviews: "5,518", url: "https://item.rakuten.co.jp/noone/saten-k-s/" } },
  { id: "light", title: "조명(실링라이트)", base: "シーリングライト LED 6畳", category: "appliance",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "일본 자취방은 조명이 없는 경우가 많습니다. 입주 전 설치 유무를 확인하세요.",
    pick: { name: "아이리스오야마 LED실링 6~8조(5년보증)", price: 2480, rating: "4.55", reviews: "5,910", url: "https://item.rakuten.co.jp/e-akari/sb-9800/" } },
  { id: "storage", title: "수납 선반/서랍", base: "収納ラック カラーボックス", category: "furniture",
    priority: "첫 주", minBudget: 2000, mode: ["week1"],
    note: "컬러박스·스틸랙으로 시작하면 저렴하고 확장이 쉽습니다.",
    pick: { name: "아이리스오야마 컬러박스 3단", price: 1980, rating: "4.44", reviews: "8,951", url: "https://item.rakuten.co.jp/rack-kan/431704/" } },
  { id: "trash", title: "쓰레기통(분리수거)", base: "ゴミ箱 分別 ふた付き", category: "supplies",
    priority: "당일", minBudget: 2500, mode: ["day1"],
    note: "일본은 분리배출이 엄격합니다. 뚜껑 있는 분리형이 편합니다.",
    pick: { name: "SOLOW 페달 분리수거 휴지통(공식)", price: 3850, rating: "4.51", reviews: "5,207", url: "https://item.rakuten.co.jp/risu-onlineshop/17746-3/" } },
  { id: "dryer", title: "헤어드라이어", base: "ヘアドライヤー", category: "appliance",
    priority: "당일", minBudget: 3000, mode: ["day1"],
    note: "도착 당일부터 필요합니다.",
    pick: { name: "SALONIA 스피디 이온드라이어(공식)", price: 5918, rating: "4.18", reviews: "8,866", url: "https://item.rakuten.co.jp/kobe-beauty-labo/sal004/" } },
  { id: "circulator", title: "서큘레이터/선풍기", base: "サーキュレーター 扇風機", category: "appliance",
    priority: "첫 주", minBudget: 4000, mode: ["week1"],
    note: "환기·빨래 건조·냉난방 효율에 유용합니다.",
    pick: { name: "DONDON 서큘레이터 360°(세척 가능)", price: 4980, rating: "4.43", reviews: "1.1만", url: "https://item.rakuten.co.jp/dondon/sq-001/" } },
  { id: "stove", title: "탁상 콘로(IH/가스)", base: "卓上IHコンロ 一人暮らし", category: "appliance",
    priority: "당일", minBudget: 4500, mode: ["day1"],
    note: "빌트인 콘로가 없는 방이 많습니다. 입주 전 확인하고, 없으면 탁상 IH나 카세트콘로부터 시작하세요.",
    pick: { name: "탁상 IH 쿠킹히터 1400W", price: 5480, rating: "4.48", reviews: "1,536", url: "https://item.rakuten.co.jp/e-kurashi/qt604/" } },
  { id: "router", title: "Wi-Fi 공유기", base: "Wi-Fiルーター 一人暮らし", category: "appliance",
    priority: "첫 주", minBudget: 5000, mode: ["week1", "work"],
    note: "회선 개통 일정을 먼저 확인하세요. 개통 전에는 스마트폰 테더링으로 버틸 수 있습니다.",
    pick: { name: "BUFFALO Wi-Fi6 공유기(3년보증)", price: 6800, rating: "4.62", reviews: "3,661", url: "https://item.rakuten.co.jp/justrich/1246-001780/" } },
  { id: "transformer", title: "변압기(한국 가전용)", base: "変圧器 アップトランス 100V 220V", category: "appliance",
    priority: "당일", minBudget: 5000, mode: ["day1"],
    note: "일본은 100V입니다. 한국에서 가져온 220V 전용 가전을 쓸 때만 필요합니다. 프리볼트(100-240V)면 불필요. 변압기는 사용 가전 소비전력(W) 합계보다 여유 있는 용량을 고르세요.",
    pick: { name: "LVYUAN 승압·강압 변압기 2000W", price: 5298, rating: "4.59", reviews: "59", url: "https://item.rakuten.co.jp/taigan/vtf-2000va/" } },
  { id: "iron", title: "스팀다리미", base: "衣類スチーマー スチームアイロン", category: "appliance",
    priority: "출퇴근", minBudget: 3000, mode: ["commute", "work"],
    note: "출근 셔츠 관리용. 걸어둔 채 쓰는 의류 스티머가 자취방에서 관리가 편합니다.",
    pick: { name: "±0 의류스티머 XRS-D010", price: 9900, rating: "4.46", reviews: "9,699", url: "https://item.rakuten.co.jp/roomy/pmz19jun27b01/" } },
  { id: "hanko", title: "인감도장(はんこ)", base: "印鑑 認印 銀行印", category: "supplies",
    priority: "첫 주", minBudget: 1000, mode: ["week1"],
    note: "은행 계좌·계약에 필요한 경우가 있습니다. 돈키호테나 はんこ집에서 당일 제작도 가능합니다.",
    pick: { name: "인감·은행인 세트 흑수우(케이스 포함)", price: 1000, rating: "4.6", reviews: "4.7만", url: "https://item.rakuten.co.jp/hankoya-shop/k-jituin/" } }
];

// appliesTo: "all" 또는 category 배열
const marketplaces = [
  { id: "rakuten", name: "Rakuten", appliesTo: "all" },
  { id: "amazon", name: "Amazon JP", appliesTo: "all" },
  { id: "yahoo", name: "Yahoo!쇼핑", appliesTo: "all" },
  { id: "qoo10", name: "Qoo10", appliesTo: ["korean"] },
  { id: "mercari", name: "메루카리", appliesTo: ["furniture", "appliance", "kitchen", "supplies", "commute"], used: true },
  { id: "nitori", name: "니토리", appliesTo: ["furniture", "kitchen", "supplies"] },
  { id: "ikea", name: "IKEA", appliesTo: ["furniture"] },
  { id: "muji", name: "무인양품", appliesTo: ["furniture", "kitchen", "supplies", "commute"] },
  { id: "yodobashi", name: "요도바시", appliesTo: ["appliance"] },
  { id: "biccamera", name: "빅카메라", appliesTo: ["appliance"] }
];

// 카테고리별 추천 스토어 (라쿠텐 스토어 내 검색, sid는 2026-07 확인).
// url 필드가 있으면 sid 대신 고정 링크로 연다.
const recommendedShops = {
  furniture: [
    { name: "タンスのゲン", sid: 199397, note: "가구·침구 초대형" },
    { name: "LOWYA", sid: 209653, note: "디자인 가구" },
    { name: "モダンデコ", sid: 247678, note: "가구·계절가전" }
  ],
  appliance: [
    { name: "Joshin web", sid: 206032, note: "가전 양판점" },
    { name: "便利生活マイルーム", sid: 202126, note: "아이리스오야마 계열" },
    { name: "モダンデコ", sid: 247678, note: "계절가전" }
  ],
  kitchen: [
    { name: "CAROTE 공식", sid: 405489, note: "팬·냄비" },
    { name: "Latuna", sid: 383832, note: "주방·소형가전" },
    { name: "roomy", sid: 227333, note: "tower 생활잡화" }
  ],
  supplies: [
    { name: "roomy", sid: 227333, note: "tower 생활잡화" },
    { name: "満天カーテン", sid: 250309, note: "1급 차광 커튼" },
    { name: "Noone", sid: 233966, note: "침구 커버" }
  ],
  korean: [
    { name: "李朝園", sid: 233764, note: "김치·한식 전문" },
    { name: "韓国世界のグルメ", sid: 110083, note: "한국식품 노포" },
    { name: "オールネショップ", sid: 277968, note: "한국 수입식품" }
  ],
  koreanBeauty: [
    { name: "OLIVE YOUNG 공식", url: "https://www.qoo10.jp/shop/oliveyoung", note: "K뷰티 Qoo10 공식몰" }
  ]
};

function recommendedShopsFor(item) {
  if (item.category === "korean" && item.tag === "뷰티") return recommendedShops.koreanBeauty;
  return recommendedShops[item.category] || [];
}

function shopRecUrl(shop, item) {
  if (shop.url) return shop.url;
  return `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(keywordFor(item))}/?sid=${shop.sid}`;
}

const stores = [
  {
    name: "ビックカメラ JR八王子駅店",
    cat: "가전",
    tags: "가전, 세탁기, 전자제품, 설치 상담",
    query: "ビックカメラ JR八王子駅店",
    mapQuery: "Bic Camera JR Hachioji Station Store"
  },
  {
    name: "ヨドバシカメラ 八王子店",
    cat: "가전",
    tags: "가전, 전자제품, 주방가전, 생활가전",
    query: "ヨドバシカメラ 八王子店",
    mapQuery: "Yodobashi Camera Hachioji"
  },
  {
    name: "ダイソー コピオ北野店",
    cat: "100엔샵",
    tags: "100엔샵, 주방 소품, 청소 도구, 수납, 키타노역 근처",
    query: "ダイソー コピオ北野店",
    mapQuery: "ダイソー コピオ北野店 東京都八王子市北野町545-3"
  },
  {
    name: "ダイソー ドン・キホーテ八王子駅前店",
    cat: "100엔샵",
    tags: "100엔샵, 하치오지역, 주방 소품, 생활 소모품",
    query: "ダイソー ドン・キホーテ八王子駅前店",
    mapQuery: "ダイソー ドン・キホーテ八王子駅前店"
  },
  {
    name: "セリア 八王子オクトーレ店",
    cat: "100엔샵",
    tags: "100엔샵, 식기, 정리함, 생활 소품",
    query: "セリア 八王子オクトーレ店",
    mapQuery: "Seria Hachioji Octore"
  },
  {
    name: "無印良品 セレオ八王子",
    cat: "생활잡화",
    tags: "침구, 수납, 식기, 생활잡화",
    query: "無印良品 セレオ八王子",
    mapQuery: "MUJI CELEO Hachioji"
  },
  {
    name: "ドン・キホーテ 八王子駅前店",
    cat: "잡화",
    tags: "야간 구매, 잡화, 전기포트, 생활품",
    query: "ドン・キホーテ 八王子駅前店",
    mapQuery: "Don Quijote Hachioji Station"
  },
  {
    name: "コーナン八王子オクトーレ店",
    cat: "DIY",
    tags: "홈센터, 공구, 조립 부품, 수납, 생활 설비",
    query: "コーナン八王子オクトーレ店",
    mapQuery: "Kohnan Hachioji Octore"
  },
  {
    name: "ニトリ 八王子みなみ野店",
    cat: "가구",
    tags: "가구, 침구, 커튼, 수납, 八王子みなみ野역 도보 4분(하치오지에서 JR요코하마선 2정거장)",
    query: "ニトリ 八王子みなみ野店",
    mapQuery: "ニトリ 八王子みなみ野店"
  },
  {
    name: "京王ストア北野店",
    cat: "슈퍼",
    tags: "슈퍼마켓, 식재료, 반찬, 키타노역 고가 아래(京王リトナード)",
    query: "京王ストア北野店",
    mapQuery: "京王ストア北野店 八王子市打越町"
  },
  {
    name: "クリエイトSD 八王子コピオ北野店",
    cat: "드럭스토어",
    tags: "세제, 일용 소모품, 화장지, 상비약, 키타노역 코피오",
    query: "クリエイトSD 八王子コピオ北野店",
    mapQuery: "クリエイト エス・ディー 八王子コピオ北野店"
  },
  {
    name: "ウエルシア八王子駅北口店",
    cat: "드럭스토어",
    tags: "드럭스토어, 일용품, 상비약, 하치오지역 북쪽 출구",
    query: "ウエルシア八王子駅北口店",
    mapQuery: "ウエルシア八王子駅北口店"
  },
  {
    name: "業務スーパー 八王子店",
    cat: "한국식품",
    tags: "김치, 냉동식품, 한국 조미료 저가, 키타노역 도보 약 10분",
    query: "業務スーパー 八王子店",
    mapQuery: "業務スーパー 八王子店 八王子市長沼町"
  },
  {
    name: "韓美膳DELI セレオ八王子",
    cat: "한국식품",
    tags: "한식 반찬, 김치, 나물, 도시락, 하치오지역 세레오 북관 1F",
    query: "韓美膳DELI セレオ八王子",
    mapQuery: "韓美膳DELI セレオ八王子"
  }
];

const kitchenKits = [
  {
    id: "knife-board",
    title: "식칼·도마 기본 세트",
    base: "包丁 まな板 セット 一人暮らし",
    category: "kitchen",
    tag: "조리 시작",
    minBudget: 1800,
    note: "처음에는 칼 1~2개와 도마 세트면 충분합니다. 항균 도마나 칼집 포함 상품을 우선 확인하세요."
  },
  {
    id: "cooking-tools",
    title: "조리도구 세트",
    base: "調理器具 セット シリコン おたま フライ返し",
    category: "kitchen",
    tag: "조리 시작",
    minBudget: 1500,
    note: "국자, 뒤집개, 집게, 거품기 구성 위주로 보면 중복 구매를 줄일 수 있습니다."
  },
  {
    id: "cookware-set",
    title: "냄비·프라이팬 세트",
    base: "鍋 フライパン セット IH対応 一人暮らし",
    category: "kitchen",
    tag: "가열 도구",
    minBudget: 3500,
    note: "집이 IH인지 가스인지 먼저 확인하세요. 탈착식 손잡이 세트는 수납이 편합니다."
  },
  {
    id: "tableware-set",
    title: "식기·수저·컵 세트",
    base: "食器 カトラリー コップ セット 一人暮らし",
    category: "kitchen",
    tag: "식사 기본",
    minBudget: 2000,
    note: "접시, 밥그릇, 국그릇, 젓가락, 숟가락, 컵을 한 번에 맞추는 검색어입니다."
  },
  {
    id: "storage-containers",
    title: "밀폐용기·랩·지퍼백",
    base: "保存容器 ラップ ジップバッグ セット",
    category: "kitchen",
    tag: "보관",
    minBudget: 1200,
    note: "남은 음식과 식재료 보관용입니다. 전자레인지 가능 여부를 같이 확인하세요."
  },
  {
    id: "dishwashing",
    title: "설거지 소모품 세트",
    base: "食器用洗剤 スポンジ 水切りラック セット",
    category: "kitchen",
    tag: "소모품",
    minBudget: 1200,
    note: "세제, 스펀지, 수세미, 물빠짐 트레이를 도착 당일 같이 준비하면 편합니다."
  },
  {
    id: "seasoning-starter",
    title: "기본 조미료 스타터",
    base: "調味料 セット 一人暮らし 塩 砂糖 醤油 油",
    category: "kitchen",
    tag: "식재료",
    minBudget: 1800,
    note: "소금, 설탕, 간장, 식용유, 후추 정도부터 시작하면 첫 주 식사가 쉬워집니다."
  },
  {
    id: "small-supplies",
    title: "자잘한 주방 소품",
    base: "キッチン小物 セット はさみ ピーラー 計量カップ",
    category: "kitchen",
    tag: "소품",
    minBudget: 1500,
    note: "주방가위, 필러, 계량컵, 오프너처럼 빠지기 쉬운 소품을 한 번에 찾습니다."
  }
];

const KITCHEN_KIT_CATEGORIES = ["전체", "조리 시작", "가열 도구", "식사 기본", "보관", "소모품", "식재료", "소품"];

const kitCollections = {
  kitchen: {
    categories: KITCHEN_KIT_CATEGORIES,
    mapQuery: "100円ショップ キッチン用品",
    items: kitchenKits
  },
  living: {
    categories: ["전체", "가구", "전원·조명", "바닥·창", "생활소품", "청소"],
    mapQuery: "家具 生活雑貨",
    items: [
      { id: "low-table", title: "로우테이블", base: "ローテーブル 一人暮らし 折りたたみ", category: "furniture", tag: "가구", minBudget: 3000, note: "바닥 생활을 할 예정이면 식사와 노트북용으로 먼저 쓸 수 있습니다." },
      { id: "floor-chair", title: "좌식 의자·방석", base: "座椅子 クッション 一人暮らし", category: "furniture", tag: "가구", minBudget: 2500, note: "책상/소파가 늦게 오면 임시 생활 품목으로 효율이 좋습니다." },
      { id: "compact-sofa", title: "콤팩트 소파", base: "コンパクトソファ 一人暮らし 2人掛け", category: "furniture", tag: "가구", minBudget: 9000, note: "문 폭과 반입 경로를 먼저 확인하세요. 접이식이나 낮은 타입이 무난합니다." },
      { id: "tv-stand", title: "TV·모니터 스탠드", base: "テレビ台 ローボード 幅80", category: "furniture", tag: "가구", minBudget: 4000, note: "TV가 없어도 공유기, 게임기, 소형가전을 놓는 받침으로 쓸 수 있습니다." },
      { id: "power-strip", title: "멀티탭·연장코드 세트", base: "電源タップ 延長コード USB 2m", category: "supplies", tag: "전원·조명", minBudget: 1500, note: "일본 콘센트 위치가 애매한 방이 많아서 2m 이상을 하나 준비하면 편합니다." },
      { id: "cable-box", title: "케이블 정리 박스", base: "ケーブルボックス 配線整理 タップ収納", category: "supplies", tag: "전원·조명", minBudget: 1500, note: "멀티탭 주변 먼지와 선 엉킴을 줄여줍니다." },
      { id: "floor-lamp", title: "스탠드 조명", base: "フロアライト スタンドライト LED", category: "appliance", tag: "전원·조명", minBudget: 3000, note: "실링라이트가 어둡거나 업무 공간을 따로 밝힐 때 좋습니다." },
      { id: "rug-mat", title: "러그·바닥 매트", base: "ラグ カーペット 低反発 洗える", category: "furniture", tag: "바닥·창", minBudget: 3000, note: "바닥 냉기와 소음을 줄입니다. 세탁 가능 여부를 확인하세요." },
      { id: "slippers", title: "실내 슬리퍼 세트", base: "ルームシューズ スリッパ 洗える", category: "supplies", tag: "생활소품", minBudget: 1000, note: "방문자용까지 2켤레 정도 준비하면 편합니다." },
      { id: "tissue-case", title: "휴지·물티슈·케이스", base: "ティッシュ ウェットティッシュ ケース セット", category: "supplies", tag: "생활소품", minBudget: 1000, note: "도착 당일부터 손이 자주 가는 소모품입니다." },
      { id: "remote-tray", title: "리모컨·소품 트레이", base: "小物トレー リモコン 収納 卓上", category: "supplies", tag: "생활소품", minBudget: 800, note: "열쇠, 이어폰, 리모컨처럼 잃어버리기 쉬운 물건 자리를 정합니다." },
      { id: "lint-roller", title: "테이프 클리너", base: "粘着クリーナー コロコロ 替え セット", category: "supplies", tag: "청소", minBudget: 800, note: "이불, 러그, 옷 먼지 제거에 바로 씁니다." }
    ]
  },
  bath: {
    categories: ["전체", "욕실", "세탁", "청소", "소모품", "정리"],
    mapQuery: "生活雑貨 バス用品 洗濯用品",
    items: [
      { id: "towel-set", title: "수건 세트", base: "タオル セット バスタオル フェイスタオル", category: "supplies", tag: "욕실", minBudget: 2500, note: "목욕수건 2장, 얼굴수건 4장 정도면 첫 주를 버티기 좋습니다." },
      { id: "bath-mat", title: "욕실 발매트", base: "バスマット 速乾 洗える", category: "supplies", tag: "욕실", minBudget: 1000, note: "빨리 마르는 타입을 고르면 곰팡이와 냄새를 줄일 수 있습니다." },
      { id: "shampoo-rack", title: "샴푸랙·욕실 선반", base: "シャンプーラック 浴室 収納 マグネット", category: "supplies", tag: "욕실", minBudget: 1500, note: "자석이 붙는 욕실이면 마그넷 타입이 청소하기 쉽습니다." },
      { id: "bath-bucket-chair", title: "욕실 의자·대야", base: "風呂椅子 洗面器 セット", category: "supplies", tag: "욕실", minBudget: 1800, note: "일본 욕실 사용 습관에 맞는 기본 세트입니다." },
      { id: "laundry-basket", title: "빨래바구니", base: "ランドリーバスケット 折りたたみ", category: "supplies", tag: "세탁", minBudget: 1200, note: "좁은 방이면 접이식이나 슬림형이 좋습니다." },
      { id: "laundry-hanger", title: "빨래건조대·행거", base: "物干し 室内 折りたたみ ハンガー", category: "supplies", tag: "세탁", minBudget: 2500, note: "베란다 사용 여부와 실내 건조 공간을 먼저 확인하세요." },
      { id: "laundry-net", title: "세탁망 세트", base: "洗濯ネット セット 大小", category: "supplies", tag: "세탁", minBudget: 700, note: "셔츠, 속옷, 수건을 나눠 돌리기 좋습니다." },
      { id: "detergent-softener", title: "세제·섬유유연제", base: "洗濯洗剤 柔軟剤 セット", category: "supplies", tag: "소모품", minBudget: 1200, note: "첫 세탁 전 바로 필요합니다. 실내건조용 세제도 후보입니다." },
      { id: "bath-cleaner", title: "욕실 청소 세트", base: "お風呂掃除 ブラシ 洗剤 スポンジ セット", category: "supplies", tag: "청소", minBudget: 1500, note: "입주 초반 물때 제거와 배수구 관리에 필요합니다." },
      { id: "drain-net", title: "배수구 거름망·필터", base: "排水口ネット フィルター 髪の毛", category: "supplies", tag: "소모품", minBudget: 600, note: "머리카락 막힘을 줄이는 저비용 필수 소모품입니다." },
      { id: "toilet-supplies", title: "화장실 청소·휴지 세트", base: "トイレ掃除 ブラシ 洗剤 トイレットペーパー", category: "supplies", tag: "청소", minBudget: 1800, note: "휴지, 브러시, 세정제를 한 번에 챙기면 도착 당일 부담이 줄어듭니다." },
      { id: "bath-storage", title: "세면대 정리함", base: "洗面所 収納 小物ケース 歯ブラシスタンド", category: "supplies", tag: "정리", minBudget: 1200, note: "칫솔, 면도기, 화장품을 작은 케이스로 분리하면 관리가 쉽습니다." }
    ]
  },
  bedroom: {
    categories: ["전체", "침구", "수납", "창문", "의류", "소품"],
    mapQuery: "寝具 収納 生活雑貨",
    items: [
      { id: "futon-set", title: "이불·베개·커버 세트", base: "布団セット 枕 カバー 一人暮らし", category: "supplies", tag: "침구", minBudget: 6000, note: "첫날 잠자리 안정용입니다. 매트리스 사이즈와 맞춰 보세요." },
      { id: "bed-pad", title: "침대패드·시트", base: "ベッドパッド ボックスシーツ クイーン", category: "supplies", tag: "침구", minBudget: 2500, note: "땀과 먼지 관리를 위해 여분 시트 1개가 있으면 좋습니다." },
      { id: "pillow-extra", title: "베개·목쿠션", base: "枕 低反発 首こり", category: "supplies", tag: "침구", minBudget: 2000, note: "수면 품질이 안 맞으면 가장 빨리 교체할 후보입니다." },
      { id: "clothes-rack", title: "옷걸이 행거", base: "ハンガーラック 頑丈 一人暮らし", category: "furniture", tag: "의류", minBudget: 3000, note: "붙박이 수납이 부족하면 첫 주 안에 체감이 큽니다." },
      { id: "hanger-set", title: "옷걸이 세트", base: "ハンガー すべらない セット 30本", category: "supplies", tag: "의류", minBudget: 1200, note: "셔츠와 바지를 분리할 수 있게 30개 전후 세트가 무난합니다." },
      { id: "drawer-storage", title: "플라스틱 서랍장", base: "収納ケース 引き出し 衣装ケース", category: "furniture", tag: "수납", minBudget: 3000, note: "옷, 서류, 소모품을 임시로 정리하기 좋습니다." },
      { id: "storage-box", title: "수납 박스·바구니", base: "収納ボックス バスケット セット", category: "supplies", tag: "수납", minBudget: 1500, note: "선반이 없어도 바닥 정리를 바로 시작할 수 있습니다." },
      { id: "underbed-storage", title: "침대 밑 수납", base: "ベッド下 収納ケース 薄型", category: "supplies", tag: "수납", minBudget: 1500, note: "계절옷과 예비 소모품을 숨겨둘 때 좋습니다." },
      { id: "curtain-rail", title: "커튼 부속·후크", base: "カーテンフック レール ランナー セット", category: "supplies", tag: "창문", minBudget: 800, note: "커튼만 사고 후크가 부족한 상황을 막습니다." },
      { id: "blackout-curtain", title: "암막커튼 세트", base: "遮光カーテン 4枚セット レース", category: "supplies", tag: "창문", minBudget: 3500, note: "프라이버시와 냉난방 효율에 바로 영향이 있습니다." },
      { id: "mirror", title: "전신거울", base: "姿見 全身鏡 スリム", category: "furniture", tag: "소품", minBudget: 2500, note: "출근 복장 확인용으로 있으면 편합니다. 벽 고정 가능 여부를 확인하세요." },
      { id: "bedside-tray", title: "침대 옆 소품 트레이", base: "ベッドサイド 収納 トレー 小物", category: "supplies", tag: "소품", minBudget: 1000, note: "휴대폰, 안경, 충전기 위치를 고정합니다." }
    ]
  },
  work: {
    categories: ["전체", "책상", "전원·케이블", "문구", "출퇴근", "비상"],
    mapQuery: "文房具 家電量販店 通勤用品",
    items: [
      { id: "desk-mat", title: "데스크매트", base: "デスクマット 大型 マウス対応", category: "supplies", tag: "책상", minBudget: 1500, note: "마우스패드와 책상 보호를 겸합니다." },
      { id: "monitor-stand", title: "모니터 받침대", base: "モニター台 机上ラック", category: "furniture", tag: "책상", minBudget: 2500, note: "목 높이를 맞추고 키보드 수납 공간을 만들 수 있습니다." },
      { id: "desk-organizer", title: "책상 정리함", base: "デスクオーガナイザー ペン立て 小物収納", category: "supplies", tag: "책상", minBudget: 1000, note: "볼펜, 케이블, 영수증을 흩어지지 않게 잡아줍니다." },
      { id: "usb-charger", title: "USB 충전기", base: "USB充電器 Type-C PD 65W", category: "appliance", tag: "전원·케이블", minBudget: 2500, note: "노트북/휴대폰을 같이 충전하려면 PD 65W 이상을 확인하세요." },
      { id: "cable-set", title: "충전 케이블 세트", base: "充電ケーブル Type-C Lightning セット", category: "appliance", tag: "전원·케이블", minBudget: 1200, note: "침대, 책상, 가방용으로 나눠 두면 분실 부담이 줄어듭니다." },
      { id: "lan-wifi", title: "LAN 케이블·공유기 주변", base: "LANケーブル Cat6 ルーター 収納", category: "appliance", tag: "전원·케이블", minBudget: 1000, note: "인터넷 개통 후 유선 연결이나 공유기 정리에 필요할 수 있습니다." },
      { id: "stationery-set", title: "문구 기본 세트", base: "文房具 セット ノート ペン はさみ テープ", category: "supplies", tag: "문구", minBudget: 1200, note: "계약서, 택배, 간단한 조립 때 펜·가위·테이프가 바로 필요합니다." },
      { id: "document-folder", title: "서류 파일·클리어파일", base: "クリアファイル 書類ケース A4", category: "supplies", tag: "문구", minBudget: 700, note: "입주 서류, 재류 관련 서류, 영수증을 분리해 두기 좋습니다." },
      { id: "commute-bag", title: "출퇴근 가방", base: "通勤バッグ ビジネスリュック 軽量", category: "commute", tag: "출퇴근", minBudget: 4000, note: "노트북 수납 여부와 방수성을 확인하세요." },
      { id: "umbrella", title: "접이식 우산", base: "折りたたみ傘 軽量 自動開閉", category: "commute", tag: "출퇴근", minBudget: 1500, note: "일본 장마와 돌발 비 대비용으로 가방에 넣어두기 좋습니다." },
      { id: "ic-case", title: "IC카드 케이스", base: "パスケース リール付き 定期入れ", category: "commute", tag: "출퇴근", minBudget: 1000, note: "Suica/PASMO 사용을 시작하면 바로 편해집니다." },
      { id: "emergency-pouch", title: "비상 파우치", base: "防災ポーチ 携帯トイレ モバイルバッテリー", category: "supplies", tag: "비상", minBudget: 2500, note: "보조배터리, 상비약, 휴대 화장지, 간단한 방재용품을 묶어 둡니다." }
    ]
  },
  korean: {
    categories: ["전체", "조미료", "김치·반찬", "라면·즉석", "김·해조", "뷰티"],
    mapQuery: "韓国食品 スーパー",
    items: [
      { id: "gochujang", title: "고추장", base: "コチュジャン ヘチャンドル", category: "korean", tag: "조미료", minBudget: 600, note: "해찬들·CJ 기준으로 검색합니다. 대용량은 業務スーパー가 저렴합니다." },
      { id: "doenjang", title: "된장", base: "テンジャン 韓国 味噌", category: "korean", tag: "조미료", minBudget: 600, note: "일본 미소와 다른 한국 된장. 해찬들 재래식 된장 기준." },
      { id: "ssamjang", title: "쌈장", base: "サムジャン 韓国", category: "korean", tag: "조미료", minBudget: 500, note: "고기 구워 먹을 때 필수. 튜브형이 보관 편합니다." },
      { id: "gochugaru", title: "고춧가루", base: "唐辛子粉 韓国産 キムチ用", category: "korean", tag: "조미료", minBudget: 800, note: "김치·국물용. 일본 一味唐辛子와 매운맛이 다르니 韓国産 표기를 확인하세요." },
      { id: "sesameoil", title: "참기름", base: "韓国 ごま油 オットギ", category: "korean", tag: "조미료", minBudget: 700, note: "오뚜기 참기름 기준. 나물·비빔밥에 필수." },
      { id: "dashida", title: "다시다", base: "ダシダ 牛肉", category: "korean", tag: "조미료", minBudget: 500, note: "국물 요리 베이스. CJ 쇠고기 다시다가 표준입니다." },
      { id: "aekjeot", title: "액젓(멸치·까나리)", base: "イワシエキス 韓国 魚醤", category: "korean", tag: "조미료", minBudget: 600, note: "김치·국 간맞춤용. 나ンプラー와는 풍미가 다릅니다." },
      { id: "oligo", title: "올리고당·물엿", base: "韓国 オリゴ糖 水あめ", category: "korean", tag: "조미료", minBudget: 500, note: "조림·볶음 단맛용. 미림으로 대체 가능하지만 풍미가 다릅니다." },
      { id: "kimchi", title: "김치", base: "韓国キムチ 宗家", category: "korean", tag: "김치·반찬", minBudget: 800, note: "종가(宗家) 김치 기준. 業務スーパー·한미젠DELI(세레오하치오지)에서도 살 수 있습니다." },
      { id: "banchan", title: "밑반찬·나물", base: "韓国 ナムル おかず セット", category: "korean", tag: "김치·반찬", minBudget: 1000, note: "입주 초 요리가 힘들 때 냉장 반찬 세트가 유용합니다." },
      { id: "ramyun", title: "한국 라면", base: "韓国ラーメン 辛ラーメン セット", category: "korean", tag: "라면·즉석", minBudget: 800, note: "신라면·너구리 등 박스 단위가 저렴합니다. 돈키호테에도 있습니다." },
      { id: "instantrice", title: "즉석밥(햇반)", base: "韓国 即席ごはん ヘッパン", category: "korean", tag: "라면·즉석", minBudget: 1000, note: "밥솥 사기 전 임시 식사용으로도 좋습니다." },
      { id: "gim", title: "한국김", base: "韓国海苔 お弁当用", category: "korean", tag: "김·해조", minBudget: 700, note: "도시락김 멀티팩 기준." },
      { id: "miyeok", title: "미역", base: "韓国 わかめ 乾燥", category: "korean", tag: "김·해조", minBudget: 500, note: "미역국용 자른 미역. 일본 와카메보다 두껍습니다." },
      { id: "skincare", title: "스킨케어", base: "韓国コスメ スキンケア", category: "korean", tag: "뷰티", minBudget: 1500, note: "쓰던 브랜드 그대로 검색하세요. Qoo10 메가와리(연 4회 대규모 할인) 시기가 가장 쌉니다." },
      { id: "suncream", title: "선크림", base: "韓国 日焼け止め トーンアップ", category: "korean", tag: "뷰티", minBudget: 1000, note: "일본 여름 자외선 대비. 한국 제품은 Qoo10이 종류가 가장 많습니다." },
      { id: "maskpack", title: "마스크팩", base: "韓国 シートマスク パック", category: "korean", tag: "뷰티", minBudget: 1000, note: "대용량 팩은 Qoo10 메가와리 때 묶음 구매가 유리합니다." },
      { id: "cleansing", title: "클렌징", base: "韓国 クレンジング オイル", category: "korean", tag: "뷰티", minBudget: 1200, note: "쓰던 제품 재구매는 Qoo10·라쿠텐 공식스토어 위주로 확인하세요." }
    ]
  }
};

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
      const params = [];
      if (max) params.push(`max=${max}`);
      if (opts.sort === "price") params.push("s=2");
      if (opts.sort === "review") params.push("s=5");
      let u = `https://search.rakuten.co.jp/search/mall/${q}/`;
      if (params.length) u += `?${params.join("&")}`;
      return u;
    }
    case "amazon": {
      let u = `https://www.amazon.co.jp/s?k=${q}`;
      if (max) u += `&high-price=${max}`;
      if (opts.sort === "price") u += `&s=price-asc-rank`;
      if (opts.sort === "review") u += `&s=review-rank`;
      return u;
    }
    case "yahoo": {
      let u = `https://shopping.yahoo.co.jp/search?p=${q}`;
      if (max) u += `&pt=${max}`;
      return u;
    }
    case "mercari": {
      let u = `https://jp.mercari.com/search?keyword=${q}`;
      if (max) u += `&price_max=${max}`;
      if (opts.sort === "price") u += `&sort=price&order=asc`;
      return u;
    }
    case "qoo10":
      return `https://www.qoo10.jp/s/?keyword=${q}`;
    case "nitori":
      return `https://www.nitori-net.jp/ec/search/?q=${q}`;
    case "ikea":
      return `https://www.ikea.com/jp/ja/search/?q=${q}`;
    case "muji":
      return `https://www.muji.com/jp/ja/store/search/cmdty/${q}`;
    case "yodobashi":
      return `https://www.yodobashi.com/?word=${q}`;
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
  return store.mapQuery || store.query;
}

function storeOpenTarget(store) {
  return store.mapQuery || store.query;
}

function catToJa(cat) {
  switch (cat) {
    case "가전":
      return "家電量販店";
    case "가구":
      return "家具 ニトリ";
    case "100엔샵":
      return "100円ショップ";
    case "드럭스토어":
      return "ドラッグストア";
    case "슈퍼":
      return "スーパーマーケット";
    case "한국식품":
      return "韓国食品";
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

const MAP_CATEGORIES = ["전체", "가전", "가구", "100엔샵", "드럭스토어", "슈퍼", "한국식품", "생활잡화", "잡화", "DIY"];

// ---------- DOM refs ----------
const itemGrid = document.querySelector("#itemGrid");
const itemTemplate = document.querySelector("#itemTemplate");
const storeTemplate = document.querySelector("#storeTemplate");
const locationSelect = document.querySelector("#locationSelect");
const modeSelect = document.querySelector("#modeSelect");
const filterInput = document.querySelector("#filterInput");
const progressStripBar = document.querySelector("#progressStripBar");
const progressStripText = document.querySelector("#progressStripText");
const itemCountLabel = document.querySelector("#itemCountLabel");
const emptyState = document.querySelector("#emptyState");
const resetChecks = document.querySelector("#resetChecks");
const hideCheckedToggle = document.querySelector("#hideCheckedToggle");
const ddayBadge = document.querySelector("#ddayBadge");
const ddayLabel = document.querySelector(".dday-label");

const tabChecklist = document.querySelector("#tabChecklist");
const kitTabButtons = document.querySelectorAll("[data-kit-tab]");
const tabMap = document.querySelector("#tabMap");
const panelChecklist = document.querySelector("#panelChecklist");
const kitPanels = document.querySelectorAll("[data-kit-panel]");
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
const kitchenKitTemplate = document.querySelector("#kitchenKitTemplate");

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
  kitCategories: {},
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
  const isMap = tab === "map";
  const isKitTab = Boolean(kitCollections[tab]);
  tabChecklist.setAttribute("aria-selected", String(isChecklist));
  kitTabButtons.forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.kitTab === tab));
  });
  tabMap.setAttribute("aria-selected", String(isMap));
  panelChecklist.classList.toggle("hidden", !isChecklist);
  kitPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.kitPanel !== tab);
  });
  panelMap.classList.toggle("hidden", !isMap);
  checklistOnlyControls.forEach((el) => el.classList.toggle("hidden", !isChecklist));
  if (isKitTab) renderKitTab(tab);
}

tabChecklist.addEventListener("click", () => setActiveTab("checklist"));
kitTabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.kitTab));
});
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
      renderAllKitTabs();
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
  renderAllKitTabs();
});

sortSelect.addEventListener("change", () => {
  opts.sort = sortSelect.value;
  saveOpts();
  renderItems();
  renderAllKitTabs();
});

freeShippingCheck.addEventListener("change", () => {
  opts.freeShipping = freeShippingCheck.checked;
  saveOpts();
  renderItems();
  renderAllKitTabs();
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

function toggleItemDetail(node) {
  const expandBtn = node.querySelector(".item-expand");
  const detail = node.querySelector(".item-detail");
  const isOpen = expandBtn.getAttribute("aria-expanded") === "true";
  expandBtn.setAttribute("aria-expanded", String(!isOpen));
  detail.classList.toggle("hidden", isOpen);
}

function applyPick(node, thing) {
  const pickBtn = node.querySelector(".item-pick-btn");
  const pickBox = node.querySelector(".item-pick-box");
  if (!pickBtn || !pickBox) return;
  const pick = thing.pick;
  if (pick) {
    pickBtn.href = pick.url;
    pickBtn.classList.remove("hidden");
    pickBox.classList.remove("hidden");
    node.querySelector(".item-pick-name").textContent = pick.name;
    node.querySelector(".item-pick-meta").innerHTML =
      `★${pick.rating} · 리뷰 ${pick.reviews} · ${yen(pick.price)}~ <em>2026-07 확인</em>`;
    node.querySelector(".item-pick-go").href = pick.url;
  } else {
    pickBtn.classList.add("hidden");
    pickBox.classList.add("hidden");
  }
}

function renderShopRecs(node, thing) {
  const line = node.querySelector(".shop-rec-line");
  const row = node.querySelector(".shop-rec-row");
  if (!line || !row) return;
  const shops = recommendedShopsFor(thing);
  row.innerHTML = "";
  if (!shops.length) {
    line.classList.add("hidden");
    return;
  }
  line.classList.remove("hidden");
  shops.forEach((shop) => {
    const a = document.createElement("a");
    a.className = "shop-rec";
    a.target = "_blank";
    a.rel = "noreferrer";
    a.href = shopRecUrl(shop, thing);
    const b = document.createElement("b");
    b.textContent = shop.name;
    const span = document.createElement("span");
    span.textContent = shop.note;
    a.append(b, span);
    row.append(a);
  });
}

function buildItemCard(item) {
  const node = itemTemplate.content.firstElementChild.cloneNode(true);
  const checkbox = node.querySelector("input");
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
  node.querySelector(".item-price").textContent = yen(item.minBudget);

  const sizeSelect = node.querySelector(".size-select");
  if (item.sizes) {
    sizeSelect.classList.remove("hidden");
    item.sizes.forEach((size) => {
      const opt = document.createElement("option");
      opt.value = size;
      opt.textContent = size;
      sizeSelect.append(opt);
    });
    sizeSelect.value = itemSize(item);
    sizeSelect.addEventListener("change", () => {
      sizeState[item.id] = sizeSelect.value;
      saveSizeState();
      refreshItemCard(node, item);
    });
  } else {
    sizeSelect.classList.add("hidden");
  }

  node.querySelector(".item-keyword").textContent = `검색어: ${keywordFor(item)}`;

  const primaryLink = node.querySelector(".item-primary-link");
  const shops = shopsForItem(item);
  if (shops.length) {
    primaryLink.href = searchUrl(shops[0], item);
    primaryLink.textContent = `${shops[0].name} 검색`;
    primaryLink.classList.remove("hidden");
  } else {
    primaryLink.classList.add("hidden");
  }

  const links = node.querySelector(".link-row");
  shops.forEach((mp) => {
    const link = document.createElement("a");
    link.href = searchUrl(mp, item);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = mp.name;
    links.append(link);
  });

  renderShopRecs(node, item);

  node.querySelector(".item-expand").addEventListener("click", () => toggleItemDetail(node));

  applyPick(node, item);

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
    const section = document.createElement("section");
    section.className = "item-group";
    const head = document.createElement("header");
    head.className = "group-head";
    const uncheckedBudget = groupItems
      .filter((it) => !state.checked[it.id])
      .reduce((sum, it) => sum + it.minBudget, 0);
    head.innerHTML =
      `<span class="group-dot ${PRIORITY[group.key].cls}"></span>` +
      `${group.label}<span class="group-count">${groupItems.length}</span>` +
      `<span class="group-budget" data-group-budget="${group.key}">미체크 ${yen(uncheckedBudget)}</span>`;
    const rows = document.createElement("div");
    rows.className = "item-rows";
    groupItems.forEach((item) => rows.append(buildItemCard(item)));
    section.append(head, rows);
    itemGrid.append(section);
  });

  itemCountLabel.textContent = `${MODE_LABELS[modeSelect.value] || "품목"} · ${filtered.length}개`;
  renderSummary();
}

function refreshItemCard(node, item) {
  node.querySelector(".item-keyword").textContent = `검색어: ${keywordFor(item)}`;
  const shops = shopsForItem(item);
  const primaryLink = node.querySelector(".item-primary-link");
  if (shops.length) {
    primaryLink.href = searchUrl(shops[0], item);
    primaryLink.textContent = `${shops[0].name} 검색`;
    primaryLink.classList.remove("hidden");
  } else {
    primaryLink.classList.add("hidden");
  }
  const links = node.querySelector(".link-row");
  const anchors = links.querySelectorAll("a");
  anchors.forEach((a, i) => {
    if (shops[i]) a.href = searchUrl(shops[i], item);
  });
  renderShopRecs(node, item);
}

// ---------- Purchase kit tabs ----------
function kitCategory(tab) {
  return state.kitCategories[tab] || "전체";
}

function kitMapSearchUrl(tab) {
  return mapOpenUrl(`${kitCollections[tab].mapQuery} ${stations[locationSelect.value]}`);
}

function buildKitCard(kit) {
  const node = kitchenKitTemplate.content.firstElementChild.cloneNode(true);
  node.querySelector(".item-tag").textContent = kit.tag;
  node.querySelector(".item-title").textContent = kit.title;
  node.querySelector(".item-price").textContent = `${yen(kit.minBudget)}~`;
  node.querySelector(".item-keyword").textContent = `검색어: ${keywordFor(kit)}`;
  node.querySelector(".item-note").textContent = kit.note;

  const primaryLink = node.querySelector(".item-primary-link");
  const shops = shopsForItem(kit);
  if (shops.length) {
    primaryLink.href = searchUrl(shops[0], kit);
    primaryLink.textContent = `${shops[0].name} 검색`;
    primaryLink.classList.remove("hidden");
  } else {
    primaryLink.classList.add("hidden");
  }

  const links = node.querySelector(".link-row");
  shops.forEach((mp) => {
    const link = document.createElement("a");
    link.href = searchUrl(mp, kit);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = mp.name;
    links.append(link);
  });

  renderShopRecs(node, kit);

  node.querySelector(".item-expand").addEventListener("click", () => toggleItemDetail(node));

  applyPick(node, kit);

  return node;
}

function renderKitTab(tab) {
  const collection = kitCollections[tab];
  const panel = document.querySelector(`[data-kit-panel="${tab}"]`);
  if (!collection || !panel) return;

  const chips = panel.querySelector("[data-kit-chips]");
  const grid = panel.querySelector("[data-kit-grid]");
  const mapLink = panel.querySelector("[data-kit-map-link]");
  const activeCategory = kitCategory(tab);

  chips.innerHTML = "";
  collection.categories.forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "map-chip";
    chip.textContent = cat;
    chip.classList.toggle("is-active", activeCategory === cat);
    chip.addEventListener("click", () => {
      state.kitCategories[tab] = cat;
      renderKitTab(tab);
    });
    chips.append(chip);
  });

  grid.innerHTML = "";
  const filtered = collection.items.filter((kit) => activeCategory === "전체" || kit.tag === activeCategory);
  filtered.forEach((kit) => grid.append(buildKitCard(kit)));
  mapLink.href = kitMapSearchUrl(tab);
}

function renderAllKitTabs() {
  Object.keys(kitCollections).forEach((tab) => renderKitTab(tab));
}

function renderSummary() {
  const filtered = visibleItems();
  const checked = filtered.filter((item) => state.checked[item.id]).length;
  const remaining = filtered
    .filter((item) => !state.checked[item.id])
    .reduce((sum, item) => sum + item.minBudget, 0);
  const pct = filtered.length ? Math.round((checked / filtered.length) * 100) : 0;

  progressStripBar.style.width = `${pct}%`;
  progressStripText.textContent = `${checked}/${filtered.length} 완료 · 남은 예산 ${yen(remaining)}`;

  // 그룹 헤더의 미체크 소계도 함께 갱신 (재렌더 없이 체크 토글만 일어난 경우)
  document.querySelectorAll("[data-group-budget]").forEach((el) => {
    const key = el.dataset.groupBudget;
    const groupUnchecked = filtered
      .filter((it) => it.priority === key && !state.checked[it.id])
      .reduce((sum, it) => sum + it.minBudget, 0);
    el.textContent = `미체크 ${yen(groupUnchecked)}`;
  });
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
  renderAllKitTabs();
});

function initMap() {
  renderMapCategoryChips();
  renderMapStores();
  updateMapFrame();
}

renderDday();
initOptionsPanel();
renderItems();
renderAllKitTabs();
initMap();
setActiveTab("checklist");
