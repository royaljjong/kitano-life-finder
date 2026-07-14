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

const MAP_CATEGORIES = ["전체", "가전", "100엔샵", "생활잡화", "잡화", "DIY"];

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

// ---------- Purchase kit tabs ----------
function kitCategory(tab) {
  return state.kitCategories[tab] || "전체";
}

function kitMapSearchUrl(tab) {
  return mapOpenUrl(`${kitCollections[tab].mapQuery} ${stations[locationSelect.value]}`);
}

function buildKitCard(kit) {
  const node = kitchenKitTemplate.content.firstElementChild.cloneNode(true);
  node.querySelector(".kitchen-card-tag").textContent = kit.tag;
  node.querySelector(".kitchen-card-title").textContent = kit.title;
  node.querySelector(".kitchen-card-budget").textContent = `${yen(kit.minBudget)}~`;
  node.querySelector(".kitchen-card-keyword").textContent = keywordFor(kit);
  node.querySelector(".kitchen-card-note").textContent = kit.note;

  const links = node.querySelector(".link-row");
  shopsForItem(kit).forEach((mp) => {
    const link = document.createElement("a");
    link.href = searchUrl(mp, kit);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = mp.name;
    links.append(link);
  });

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
