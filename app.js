const MOVE_IN = new Date(2026, 6, 28); // 2026-07-28 (입주 예정일)

const stations = {
  kitano: "東京都八王子市 北野駅",
  hachioji: "東京都八王子市 八王子駅"
};

// category: furniture | appliance | kitchen | supplies | commute
const items = [
  { id: "mattress", title: "매트리스", base: "マットレス 低反発", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 13000, mode: ["day1"],
    note: "푹신한 저반발(低反発) 기준. 퀸은 압축·롤 배송이면 반입이 쉽습니다. 저반발은 여름에 다소 더울 수 있어 냉감 패드(침구 세트 참고)를 위에 깔면 좋습니다. 추천 상품 페이지에서 クイーン(퀸)을 선택하세요. 3단 모두 퀸 선택 시 표시가와 다를 수 있으니 사이즈·가격을 상품페이지에서 확인하세요.",
    picks: {
      budget: { name: "저반발 매트리스 8cm(가성비, 퀸 선택)", price: 6999, rating: "4.33", reviews: "6,462", url: "https://item.rakuten.co.jp/tansu/13810004/" },
      mid: { name: "저반발 매트리스 8cm やわらか 90N(퀸)", price: 13420, rating: "4.28", reviews: "3.8만", url: "https://item.rakuten.co.jp/maxshare/a05750_sale/" },
      premium: { name: "트루슬리퍼 프레미어리치(저반발 정평)", price: 39800, rating: "4.42", reviews: "1,332", url: "https://item.rakuten.co.jp/shopjapan/trpr-hnss/" } } },
  { id: "bed", title: "침대 프레임 또는 DIY 받침", base: "ベッドフレーム すのこ", category: "furniture",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "첫 주", minBudget: 8000, mode: ["week1"],
    note: "당장은 매트리스만 쓰고, 첫 주에 스노코나 프레임을 붙이는 방식이 비용 부담이 낮습니다.",
    picks: {
      budget: { name: "파이프 침대(접이식, 가성비)", price: 5980, rating: "4.53", reviews: "1,202", url: "https://item.rakuten.co.jp/marketjapan/10001136/" },
      mid: { name: "북유럽 파인 스노코침대(높이 3단조절)", price: 9999, rating: "4.35", reviews: "2,120", url: "https://item.rakuten.co.jp/tansu/11719094aa/" },
      premium: { name: "키리(오동)材 스노코침대(일본산 고품질)", price: 66000, rating: "4.64", reviews: "898", url: "https://item.rakuten.co.jp/kagunosato/58-0044/" } } },
  { id: "sofa", title: "소파", base: "ソファ 一人暮らし コンパクト", category: "furniture",
    priority: "낮음", minBudget: 8000, mode: ["week1"],
    note: "1~2인용 콤팩트 소파. 방 폭과 반입 경로(문·엘리베이터)를 먼저 확인하세요.",
    picks: {
      budget: { name: "북유럽 로소파 1인용(가성비)", price: 9999, rating: "4.22", reviews: "1,527", url: "https://item.rakuten.co.jp/kaguin/7069418/" },
      mid: { name: "和楽 콤팩트 2인 소파(일본제)", price: 19900, rating: "4.43", reviews: "7,457", url: "https://item.rakuten.co.jp/takamine/a01_pvc/" },
      premium: { name: "和楽 step 빈티지 소파", price: 24990, rating: "4.44", reviews: "3,278", url: "https://item.rakuten.co.jp/takamine/step/" } } },
  { id: "dining", title: "식사용 책상 및 의자", base: "ダイニングテーブル 2人用 椅子", category: "furniture",
    priority: "첫 주", minBudget: 7000, mode: ["week1"],
    note: "업무용 책상과 겸용할지 먼저 정하면 중복 구매를 줄일 수 있습니다.",
    pick: { name: "카페테이블+체어 세트", price: 6880, rating: "4.51", reviews: "697", url: "https://item.rakuten.co.jp/kaitekilife117/z103/" } },
  { id: "desk", title: "업무용 책상", base: "ワークデスク 幅140 奥行60", category: "furniture",
    priority: "업무", minBudget: 10000, mode: ["work"],
    note: "모니터 2대는 지금, 최종 3대 로드맵이면 폭140cm↑·깊이60cm가 안정적입니다. 32인치 2매 또는 24인치급 3매까지 대응. 모니터암 대응 천판이면 확장이 쉽습니다. 동일 사양이면 라쿠텐/IKEA(예: IKEA 상판 140cm) 중 저가로 고르세요.",
    picks: {
      budget: { name: "L자 코너데스크 폭140(가성비)", price: 9990, rating: "4.09", reviews: "212", url: "https://item.rakuten.co.jp/grazia-doris/fico/" },
      mid: { name: "산와다이렉트 심플워크데스크 폭140×60(라쿠텐 1위)", price: 11230, rating: "4.66", reviews: "389", url: "https://item.rakuten.co.jp/sanwadirect/100-deskf005/" },
      premium: { name: "산와다이렉트 폭160×60(3모니터 여유)", price: 13030, rating: "4.67", reviews: "244", url: "https://item.rakuten.co.jp/sanwadirect/100-deskf006/" } } },
  { id: "chair", title: "업무용 의자", base: "ゲーミングチェア ファブリック オフィスチェア", category: "furniture",
    priority: "업무", minBudget: 12000, mode: ["work"],
    note: "장시간 착석엔 푹신한 쿠션형(포켓코일 좌면)이 편합니다. 메시보다 한국 PC의자 스타일. 오토만·리클라이닝이 있으면 휴식에 좋습니다. 방 폭과 냄새/조립을 리뷰에서 확인하세요.",
    picks: {
      budget: { name: "GTPLAYER GT002 게이밍체어(쿠션·리뷰 최다)", price: 12999, rating: "4.58", reviews: "1,764", url: "https://item.rakuten.co.jp/gtplayershop/gt002/" },
      mid: { name: "Dowinx 패브릭 게이밍체어(포켓코일·오토만)", price: 14280, rating: "4.37", reviews: "493", url: "https://item.rakuten.co.jp/rt-dowinx/6658/" },
      premium: { name: "AKRacing Nitro V2(정평 게이밍체어)", price: 48239, rating: "4.50", reviews: "24", url: "https://item.rakuten.co.jp/office-com/tw-akr-nitro/" } } },
  { id: "applianceset", title: "리유스 가전 3점 세트(중고)", base: "中古家電セット 3点 冷蔵庫 洗濯機 電子レンジ", category: "appliance",
    priority: "첫 주", minBudget: 34000, mode: ["week1"], setItems: ["fridge", "washer", "microwave"],
    note: "혼자 자취 가전은 중고 리유스 세트가 가장 저렴합니다(도쿄권 배송·설치 무료, 보증 있는 매장). 3단(최저가/중간/프리미엄)은 같은 3점 세트(냉장고+세탁기+전자레인지)의 가격·상태별 옵션입니다. 배송에 며칠~1주 걸리니 7/28 입주 전 도착시키려면 이번 주(~7/21경) 주문 권장. 밥솥·전기포트·청소기까지 한 번에 원하면 아래 '리유스 가전 6점 세트'를 보세요. 신뢰 매장: トレファク(트레팩), 楽天 パワーセラー, リユース家電Happy, いいね家電.",
    picks: {
      budget: { name: "파워세라 중고 3점 세트(해외메이커 18~20년, 설치무료)", price: 34000, rating: "4.43", reviews: "215", url: "https://item.rakuten.co.jp/auc-powerseller/10000737/" },
      mid: { name: "트레팩 중고 3점 세트(배송·설치 무료, 리뷰 최다)", price: 39800, rating: "4.41", reviews: "758", url: "https://item.rakuten.co.jp/trefac-f/999005/" },
      premium: { name: "파워세라 중고 3점 세트(국산 21~23년 고년식)", price: 44000, rating: "4.40", reviews: "671", url: "https://item.rakuten.co.jp/auc-powerseller/10000739/" } } },
  { id: "applianceset6", title: "리유스 가전 6점 세트(중고)", base: "中古家電セット 6点 冷蔵庫 洗濯機 電子レンジ 炊飯器 ケトル 掃除機", category: "appliance",
    priority: "첫 주", minBudget: 49800, mode: ["week1"],
    note: "3점(냉장고·세탁기·전자레인지)에 밥솥·전기포트·청소기까지 포함된 실제 풀세트입니다. 트레팩 ¥49,800(배송·설치 무료, 보증). 개별로 다 사는 것보다 싸면 세트로, 아니면 위 3점 세트 + 개별 품목(밥솥·전기포트·청소기)으로 고르세요.",
    pick: { name: "트레팩 중고 6점 세트(냉장고+세탁기+레인지+밥솥+전기포트+청소기)", price: 49800, rating: "4.55", reviews: "74", url: "https://item.rakuten.co.jp/trefac-f/999052/" } },
  { id: "washer", title: "세탁기", base: "洗濯機 一人暮らし 5kg 設置", category: "appliance",
    priority: "첫 주", minBudget: 26000, mode: ["week1"], inSet: "applianceset",
    note: "배송/설치/수거 비용을 같이 확인해야 실제 총액이 맞습니다. 중고 리유스 세트(냉장고+세탁기+전자레인지)로 한 번에 해결하는 게 가장 저렴합니다 — '리유스 가전 3점 세트' 품목을 먼저 보세요. 세트가 일정·재고가 안 맞을 때 아래 신품이 대안입니다.",
    picks: {
      budget: { name: "아이리스오야마 4.5kg IAW-T45", price: 19800, rating: "4.33", reviews: "447", url: "https://item.rakuten.co.jp/enetroom/572874/" },
      mid: { name: "아이리스오야마 6kg IAW-T60", price: 27780, rating: "4.37", reviews: "1,722", url: "https://item.rakuten.co.jp/enetroom/573828/" },
      premium: { name: "파나소닉 5kg NA-F5B5(정평 브랜드)", price: 37610, rating: "4.5", reviews: "8", url: "https://item.rakuten.co.jp/jism/4550719034934-21-484-n/" } } },
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
  { id: "commute", title: "IC카드 케이스", base: "パスケース リール付き 定期入れ", category: "commute",
    priority: "출퇴근", minBudget: 1000, mode: ["commute"],
    note: "가방·우산은 이미 보유. Suica/PASMO를 쓰기 시작하면 릴 부착 케이스가 개찰에서 바로 편해집니다.",
    pick: { name: "릴 부착 패스케이스(anan 게재)", price: 1280, rating: "4.56", reviews: "3,153", url: "https://item.rakuten.co.jp/rareleak/fo-idcase-rbn-in/" } },
  { id: "fridge", title: "냉장고", base: "冷蔵庫 一人暮らし 170L", category: "appliance",
    priority: "첫 주", minBudget: 28000, mode: ["week1"], inSet: "applianceset",
    note: "자취 요리엔 150L보다 170L 전후가 여유 있습니다. 신품 170L은 ¥28,000~. 배송·설치·기존 처분 비용을 함께 확인하세요. 세트(리유스)로 세탁기·전자레인지와 함께 구매하는 게 저렴합니다 — '리유스 가전 3점 세트' 참조. 신품 단품은 대안. 프리미엄 신품은 파나소닉·샤프·AQUA 150~170L(정평, 요도바시·빅카메라 병행 확인).",
    picks: {
      budget: { name: "MAXZEN 168L 2도어(가성비)", price: 28480, rating: "4.32", reviews: "37", url: "https://item.rakuten.co.jp/a-price/4571495432318/" },
      mid: { name: "아이리스오야마 大凍量 153L IRSN-HF15", price: 44800, rating: "4.62", reviews: "37", url: "https://item.rakuten.co.jp/unidy/568921/" } } },
  { id: "microwave", title: "전자레인지", base: "電子レンジ 一人暮らし", category: "appliance",
    priority: "첫 주", minBudget: 8000, mode: ["week1"], inSet: "applianceset",
    note: "동일본(50Hz)/서일본(60Hz) 겸용인지 확인하면 재이사에도 안전합니다. 리유스 3점 세트에 대개 포함됩니다 — 세트 품목 우선. 단품 신품은 대안.",
    picks: {
      budget: { name: "아이리스오야마 단기능 17L", price: 7980, rating: "4.36", reviews: "2,381", url: "https://item.rakuten.co.jp/kadenrand/560082/" },
      mid: { name: "아이리스오야마 플랫 18L 단기능", price: 9999, rating: "4.33", reviews: "644", url: "https://item.rakuten.co.jp/kadenrand/560668/" },
      premium: { name: "BALMUDA The Range K09A(정평)", price: 59400, rating: "4.62", reviews: "814", url: "https://item.rakuten.co.jp/plywood/14949014/" } } },
  { id: "ricecooker", title: "밥솥", base: "炊飯器 3合", category: "appliance",
    priority: "첫 주", minBudget: 6000, mode: ["week1"],
    note: "1인 가구는 3합이면 충분합니다. 6점 세트에 포함되면 스킵하세요. 없으면 단품 3~5.5합.",
    picks: {
      budget: { name: "마이컴 밥솥 3合(가성비)", price: 5880, rating: "4.25", reviews: "618", url: "https://item.rakuten.co.jp/enetroom/561827/" },
      mid: { name: "타이거 마이컴 5.5合 JBH-G101W(정평)", price: 8780, rating: "4.63", reviews: "980", url: "https://item.rakuten.co.jp/rcmdki/t2-4904710418932/" },
      premium: { name: "아이리스오야마 압력IH 5.5合", price: 16800, rating: "4.37", reviews: "1,311", url: "https://item.rakuten.co.jp/enetroom/562099/" } } },
  { id: "kettle", title: "전기포트", base: "電気ケトル", category: "appliance",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "라면·차·커피에 바로 필요합니다. 도착 당일 우선. 6점 세트에 포함되기도 합니다. 없으면 단품(도착 당일 필요).",
    picks: {
      budget: { name: "전기케틀 1L(가성비)", price: 1680, rating: "4.30", reviews: "1,646", url: "https://item.rakuten.co.jp/enetroom/7030579/" },
      mid: { name: "T-fal 저스틴 락 1.2L KO5901JP(정평)", price: 3900, rating: "4.56", reviews: "704", url: "https://item.rakuten.co.jp/bellevie-harima/t-fal-350/" },
      premium: { name: "BALMUDA The Pot KPT03JP(정평)", price: 14960, rating: "4.76", reviews: "2,069", url: "https://item.rakuten.co.jp/plywood/14949004/" } } },
  { id: "vacuum", title: "청소기", base: "掃除機 スティック 軽量", category: "appliance",
    priority: "첫 주", minBudget: 6000, mode: ["week1"],
    note: "좁은 자취방은 가벼운 스틱형이 관리하기 편합니다. 6점 세트에 포함되기도 합니다.",
    picks: {
      budget: { name: "무선 스틱청소기 22000pa(가성비)", price: 6500, rating: "4.23", reviews: "4,262", url: "https://item.rakuten.co.jp/kukuya/xqc08-1/" },
      mid: { name: "무선 청소기 95000Pa 3단(가벼움)", price: 11980, rating: "4.61", reviews: "4,203", url: "https://item.rakuten.co.jp/nene777/compass1747365900/" },
      premium: { name: "마키타 충전식 클리너 CL100DW(정평)", price: 13975, rating: "4.66", reviews: "4,097", url: "https://item.rakuten.co.jp/yamamura/cl100d/" } } },
  { id: "curtain", title: "커튼", base: "遮光カーテン 4枚セット", category: "supplies",
    priority: "당일", minBudget: 3700, mode: ["day1"],
    note: "프라이버시·햇빛 차단 때문에 첫날 밤 전에 필요합니다. 창 크기를 재고 사세요.",
    picks: {
      budget: { name: "1급 차광커튼 4장(가성비)", price: 1980, rating: "4.64", reviews: "3,350", url: "https://item.rakuten.co.jp/design-life/youaica/" },
      mid: { name: "満天 1급차광 커튼 4장(레이스 포함)", price: 8980, rating: "4.41", reviews: "3,943", url: "https://item.rakuten.co.jp/manten-curtain/s4p_syak_00/" },
      premium: { name: "満天 완전차광 커튼 4장", price: 10980, rating: "4.34", reviews: "10,853", url: "https://item.rakuten.co.jp/manten-curtain/s4p-bou/" } } },
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
    picks: {
      budget: { name: "테스콤 TD200 드라이어(가성비·정평)", price: 2998, rating: "4.42", reviews: "1,509", url: "https://item.rakuten.co.jp/life-inc/110126-0951-0009/" },
      mid: { name: "대풍량 마이너스이온 드라이어", price: 8980, rating: "4.54", reviews: "2,846", url: "https://item.rakuten.co.jp/kukuya/nonubnano/" },
      premium: { name: "파나소닉 나노케어 EH-NA0K(정평)", price: 34967, rating: "4.68", reviews: "1,110", url: "https://item.rakuten.co.jp/panasonic-store/eh-na0j-a/" } } },
  { id: "bidet", title: "비데(온수세정변좌)", base: "温水洗浄便座 ウォシュレット 貯湯式", category: "appliance",
    priority: "첫 주", minBudget: 17000, mode: ["week1"],
    note: "일본 자취 변기엔 비데가 없거나 낡은 경우가 많아 직접 다는 경우가 많습니다. 임대라도 기존 변좌를 떼고 자가 설치 가능(공구 최소·분기수전 연결, 근처 콘센트 필요). 저탕식(貯湯式)이 저렴하고 1인용에 충분합니다. ★추천은 東芝 SCS-T160(리뷰 최다). 더 저렴·고평점 대안: 파나소닉 ビューティ·トワレ CH951SWS(라쿠텐 1위 ¥17,480 ★4.67), 리모컨형은 東芝 SCS-T260. 이미 설치돼 있으면 불필요.",
    picks: {
      budget: { name: "サンウォッシュ DLNC170LW(저탕식)", price: 16500, rating: "4.55", reviews: "150", url: "https://item.rakuten.co.jp/asahieito/dlnc170lw/" },
      mid: { name: "東芝 온수세정변좌 SCS-T160(저탕식, 리뷰 최다)", price: 19596, rating: "4.54", reviews: "1,000", url: "https://item.rakuten.co.jp/jyupro/scs-t160/" },
      premium: { name: "TOTO 워시렛 TCF2223E(정평 브랜드)", price: 31374, rating: "4.67", reviews: "21", url: "https://item.rakuten.co.jp/jyupro/tcf2223e-nw1/" } } },
  { id: "circulator", title: "서큘레이터/선풍기", base: "サーキュレーター 扇風機", category: "appliance",
    priority: "첫 주", minBudget: 4000, mode: ["week1"],
    note: "환기·빨래 건조·냉난방 효율에 유용합니다.",
    picks: {
      budget: { name: "아이리스오야마 WOOZOO(가성비)", price: 2180, rating: "4.39", reviews: "2,456", url: "https://item.rakuten.co.jp/kadenrand/i271000/" },
      mid: { name: "아이리스오야마 WOOZOO DC모터", price: 6930, rating: "4.45", reviews: "1,740", url: "https://item.rakuten.co.jp/kadenrand/271008/" },
      premium: { name: "BALMUDA GreenFan EGF-1800(정평)", price: 39600, rating: "4.59", reviews: "3,059", url: "https://item.rakuten.co.jp/roomy/0001gft/" } } },
  { id: "stove", title: "탁상 콘로(IH/가스)", base: "卓上IHコンロ 一人暮らし", category: "appliance",
    priority: "당일", minBudget: 4500, mode: ["day1"],
    note: "빌트인 콘로가 없는 방이 많습니다. 입주 전 확인하고, 없으면 탁상 IH나 카세트콘로부터 시작하세요.",
    pick: { name: "탁상 IH 쿠킹히터 1400W", price: 5480, rating: "4.48", reviews: "1,536", url: "https://item.rakuten.co.jp/e-kurashi/qt604/" } },
  { id: "transformer", title: "변압기(한국 가전용)", base: "変圧器 アップトランス 100V 220V", category: "appliance",
    priority: "당일", minBudget: 5000, mode: ["day1"],
    note: "일본은 100V입니다. 한국에서 가져온 220V 전용 가전을 쓸 때만 필요합니다. 프리볼트(100-240V)면 불필요. 변압기는 사용 가전 소비전력(W) 합계보다 여유 있는 용량을 고르세요.",
    pick: { name: "LVYUAN 승압·강압 변압기 2000W", price: 5298, rating: "4.59", reviews: "59", url: "https://item.rakuten.co.jp/taigan/vtf-2000va/" } },
  { id: "iron", title: "스팀다리미", base: "衣類スチーマー スチームアイロン", category: "appliance",
    priority: "출퇴근", minBudget: 3000, mode: ["commute", "work"],
    note: "출근 셔츠 관리용. 걸어둔 채 쓰는 의류 스티머가 자취방에서 관리가 편합니다.",
    pick: { name: "±0 의류스티머 XRS-D010", price: 9900, rating: "4.46", reviews: "9,699", url: "https://item.rakuten.co.jp/roomy/pmz19jun27b01/" } },
  { id: "showercurtain", title: "샤워커튼", base: "シャワーカーテン 防カビ リング付き", category: "supplies",
    priority: "첫 주", minBudget: 1200, mode: ["week1"],
    note: "유닛배스(욕조+변기 일체형)면 물튐 방지에 필수. 방곰팡이 타입 + 링 세트로. 창문형 분리 욕실이면 불필요." },
  { id: "bathmat", title: "욕실 발매트", base: "バスマット 速乾 吸水", category: "supplies",
    priority: "첫 주", minBudget: 1000, mode: ["week1"],
    note: "규조토(빠른 건조) 또는 흡수 매트. 습기·곰팡이 관리에 유리합니다." },
  { id: "toiletries", title: "세면·목욕 기본", base: "シャンプー ボディソープ 歯ブラシ 洗顔", category: "supplies",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "샴푸·바디워시·칫솔·치약·세안. 도착 당일 필요. 드럭스토어(웰시아·크리에이트)나 다이소로 현지 조달도 편합니다." },
  { id: "containers", title: "밀폐 보관용기", base: "保存容器 密閉 セット 電子レンジ対応", category: "kitchen",
    priority: "첫 주", minBudget: 1500, mode: ["week1"],
    note: "작은 냉장고 활용·남은 음식 보관. 전자레인지/식기세척 대응이면 편합니다. 다이소로 시작 가능." },
  { id: "water", title: "식수(정수포트/생수)", base: "浄水ポット ブリタ 交換カートリッジ", category: "kitchen",
    priority: "당일", minBudget: 1500, mode: ["day1"],
    note: "일본 수돗물은 음용 가능하나, 정수 필터포트(BRITA)나 2L 생수 상비 중 택1. 라면·커피·차용." },
  { id: "dryrack", title: "실내 빨래건조대", base: "室内物干し 折りたたみ スタンド", category: "supplies",
    priority: "첫 주", minBudget: 2000, mode: ["week1"],
    note: "장마·게릴라 호우·1인 자취 필수. 접이식 스탠드형이 공간 효율이 좋고, 서큘레이터와 함께 쓰면 빨리 마릅니다." },
  { id: "coolpad", title: "냉감 패드", base: "接触冷感 敷きパッド ひんやり", category: "supplies",
    sizes: ["シングル", "セミダブル", "ダブル", "クイーン"], defaultSize: "クイーン",
    priority: "당일", minBudget: 2000, mode: ["day1"],
    note: "7월말 입주 직결. 저반발 매트리스 위에 깔면 여름 열감이 완화됩니다. 세탁 가능 타입으로, 매트리스 사이즈(퀸)에 맞추세요." },
  { id: "disaster", title: "방재 기본세트", base: "防災セット 懐中電灯 モバイルバッテリー 保存水", category: "supplies",
    priority: "첫 주", minBudget: 3000, mode: ["week1"],
    note: "도쿄는 지진 대비 기본. 손전등·대용량 보조배터리·비축수(3일분)·간이 비상식. 가구 전도방지 품목과 함께 준비하세요." },
  { id: "powerstrip", title: "전원탭·연장코드", base: "電源タップ 雷ガード 個別スイッチ USB", category: "appliance",
    priority: "업무", minBudget: 1500, mode: ["work", "day1"],
    note: "모니터 2~3대+PC+주변기기엔 개별 스위치·낙뢰가드 탭이 필수. 책상 배치에 맞춰 길이를 고르세요." },
  { id: "firstaid", title: "구급상자·상비약", base: "救急箱 常備薬 絆創膏 体温計", category: "supplies",
    priority: "첫 주", minBudget: 1500, mode: ["week1"],
    note: "첫 자취 상비: 반창고·소독·해열진통·위장약·체온계. 드럭스토어 현지 조달도 가능합니다." },
  { id: "antitip", title: "가구 전도방지(지진 대비)", base: "家具転倒防止 突っ張り棒", category: "supplies",
    priority: "첫 주", minBudget: 1500, mode: ["week1"],
    note: "키 큰 선반·수납장 설치와 동시에 고정하세요. 천장 돌출봉 타입이 임대에도 안전합니다.",
    pick: { name: "아이리스오야마 家具転倒防止伸縮棒 2本", price: 1580, rating: "4.54", reviews: "976", url: "https://item.rakuten.co.jp/lock110/248151/" } },
  { id: "fan", title: "선풍기(리빙 팬)", base: "扇風機 リビング", category: "appliance",
    priority: "당일", minBudget: 3000, mode: ["day1"],
    note: "한여름 입주라 도착 당일 에어컨 가동 전부터 필요합니다. 서큘레이터와 별도로 두면 편합니다.",
    pick: { name: "야마젠 리빙 선풍기 YLT-AG30E", price: 3990, rating: "4.5", reviews: "5,071", url: "https://item.rakuten.co.jp/e-kurashi/1467895/" } },
  { id: "airfryer", title: "에어프라이어", base: "ノンフライヤー エアフライヤー", category: "appliance",
    priority: "낮음", minBudget: 7000, mode: ["week1"],
    note: "자취 요리 활용도가 높습니다. 2~3L도 1인엔 충분합니다. (COSORI는 해외 리콜 이력이 있어 제외했습니다.)",
    picks: {
      budget: { name: "simplus 논프라이어 2L(가성비)", price: 4599, rating: "4.31", reviews: "262", url: "https://item.rakuten.co.jp/rcmdse/7s-4589668457303/" },
      mid: { name: "아이리스오야마 컨벡션 논프라이 오븐", price: 11800, rating: "4.49", reviews: "88", url: "https://item.rakuten.co.jp/u-denki/576762/" },
      premium: { name: "Russell Hobbs 에어프라이오븐 3L(정평)", price: 16500, rating: "4.73", reviews: "483", url: "https://item.rakuten.co.jp/sommelier/goods-01829/" } } },
  { id: "monitor", title: "모니터", base: "モニター 27インチ", category: "appliance",
    priority: "업무", minBudget: 12000, mode: ["work"],
    note: "재택 업무용. 27인치 FHD가 가성비 기준점입니다. HDMI 케이블 동봉 여부를 확인하세요. 프리미엄급은 JAPANNEXT·I-O DATA·LG 27형 IPS(라쿠텐 리뷰는 적지만 정평 브랜드) — 요도바시/공식몰 병행 확인. 2~3대는 같은 모델로 맞추면 좋습니다.",
    picks: {
      budget: { name: "27형 FHD 180Hz(가성비, 무명 브랜드)", price: 18999, rating: "4.71", reviews: "898", url: "https://item.rakuten.co.jp/qifeng/yc-27/" },
      mid: { name: "27형 WQHD 260Hz·3년보증(중간)", price: 30890, rating: "4.72", reviews: "336", url: "https://item.rakuten.co.jp/kksmart/hg-4k27/" } } },
  { id: "rug", title: "러그·바닥 매트", base: "ラグ 洗える オールシーズン", category: "furniture",
    priority: "낮음", minBudget: 1500, mode: ["week1"],
    note: "바닥 생활 소음·냉기 완화. 여름엔 세탁 가능한 얇은 타입부터 시작하세요.",
    pick: { name: "세탁 가능 러그(사이즈 선택)", price: 1480, rating: "4.42", reviews: "2.8만", url: "https://item.rakuten.co.jp/auc-kaei-trading/microrg-l/" } },
  { id: "bicycle", title: "자전거", base: "自転車 26インチ シティサイクル", category: "commute",
    priority: "출퇴근", minBudget: 18000, mode: ["commute"],
    note: "구매 시 방범등록(防犯登録, 약 ¥660)이 의무입니다. 매장 구매면 현장에서 바로 등록됩니다.",
    pick: { name: "크로스바이크 26인치 시마노 6단(8년 연속 1위)", price: 20800, rating: "4.32", reviews: "9,649", url: "https://item.rakuten.co.jp/smart-factory/gr-001/" } },
  { id: "footrest", title: "발 받침대", base: "フットレスト デスク下", category: "furniture",
    priority: "업무", minBudget: 2000, mode: ["work"],
    note: "의자 높이를 몸에 맞추면 발이 뜨기 쉽습니다. 데스크 아래 발 받침이 있으면 장시간 착석이 편해집니다.",
    pick: { name: "저반발 데스크 발 받침(랭킹 1위)", price: 3980, rating: "4.59", reviews: "430", url: "https://item.rakuten.co.jp/relief10/10000016/" } }
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
    tags: "드럭스토어, 일용품, 상비약, 하치오지역 북쪽 출구(東町7-6 1F)",
    query: "ウエルシア八王子駅北口店",
    mapQuery: "東京都八王子市東町7-6"
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
    tags: "한식 반찬, 김치, 나물, 도시락, 하치오지역 세레오 북관 1F (매장이 구글맵 미등록이라 핀은 세레오 건물)",
    query: "韓美膳DELI セレオ八王子",
    mapQuery: "CELEO八王子 北館"
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
    categories: ["전체", "책상", "전원·케이블", "출퇴근", "비상"],
    mapQuery: "文房具 家電量販店 通勤用品",
    items: [
      { id: "desk-mat", title: "데스크매트", base: "デスクマット 大型 マウス対応", category: "supplies", tag: "책상", minBudget: 1500, note: "마우스패드와 책상 보호를 겸합니다." },
      { id: "monitor-stand", title: "모니터 받침대", base: "モニター台 机上ラック", category: "furniture", tag: "책상", minBudget: 2500, note: "목 높이를 맞추고 키보드 수납 공간을 만들 수 있습니다." },
      { id: "desk-organizer", title: "책상 정리함", base: "デスクオーガナイザー ペン立て 小物収納", category: "supplies", tag: "책상", minBudget: 1000, note: "볼펜, 케이블, 영수증을 흩어지지 않게 잡아줍니다." },
      { id: "usb-charger", title: "USB 충전기", base: "USB充電器 Type-C PD 65W", category: "appliance", tag: "전원·케이블", minBudget: 2500, note: "노트북/휴대폰을 같이 충전하려면 PD 65W 이상을 확인하세요." },
      { id: "cable-set", title: "충전 케이블 세트", base: "充電ケーブル Type-C Lightning セット", category: "appliance", tag: "전원·케이블", minBudget: 1200, note: "침대, 책상, 가방용으로 나눠 두면 분실 부담이 줄어듭니다." },
      { id: "lan-wifi", title: "LAN 케이블·공유기 주변", base: "LANケーブル Cat6 ルーター 収納", category: "appliance", tag: "전원·케이블", minBudget: 1000, note: "인터넷 개통 후 유선 연결이나 공유기 정리에 필요할 수 있습니다." },
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

// 카테고리별 대표(첫 번째 버튼) 몰. 가전=요도바시(무료배송·설치 신뢰),
// 소모품류=Amazon(빠른 배송·한국어 UI), 가구·한국식품=라쿠텐(전문 스토어 강세), 뷰티=Qoo10.
const PRIMARY_SHOP_BY_CATEGORY = {
  furniture: "rakuten",
  appliance: "yodobashi",
  kitchen: "amazon",
  supplies: "amazon",
  commute: "amazon",
  korean: "rakuten"
};

function primaryShopFor(item) {
  const shops = shopsForItem(item);
  if (!shops.length) return null;
  const preferredId =
    item.category === "korean" && item.tag === "뷰티"
      ? "qoo10"
      : PRIMARY_SHOP_BY_CATEGORY[item.category];
  return shops.find((mp) => mp.id === preferredId) || shops[0];
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

// ---------- Theme ----------
const themeToggle = document.querySelector("#themeToggle");
const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

function effectiveTheme() {
  return localStorage.getItem("kitanoTheme") || (themeMedia.matches ? "dark" : "light");
}

function applyTheme() {
  const stored = localStorage.getItem("kitanoTheme");
  if (stored) document.documentElement.dataset.theme = stored;
  else delete document.documentElement.dataset.theme;
  themeToggle.classList.toggle("is-dark", effectiveTheme() === "dark");
}

themeToggle.addEventListener("click", () => {
  localStorage.setItem("kitanoTheme", effectiveTheme() === "dark" ? "light" : "dark");
  applyTheme();
});
themeMedia.addEventListener("change", applyTheme);
applyTheme();

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
      if (item.inSet) return false; // 세트 구성품은 flat 목록에서 제외(세트 상세에서만 노출)
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

const PICK_TIER_ORDER = ["budget", "mid", "premium"];
const PICK_TIER_LABELS = { budget: "최저가", mid: "중간", premium: "프리미엄" };

function fillPickBox(node, pick) {
  const pickBox = node.querySelector(".item-pick-box");
  pickBox.classList.remove("hidden");
  node.querySelector(".item-pick-name").textContent = pick.name;
  node.querySelector(".item-pick-meta").innerHTML =
    `★${pick.rating} · 리뷰 ${pick.reviews} · ${yen(pick.price)}~ <em>2026-07 확인</em>`;
  node.querySelector(".item-pick-go").href = pick.url;
}

function renderPickTiers(node, thing) {
  const pickBtn = node.querySelector(".item-pick-btn");
  const pickBox = node.querySelector(".item-pick-box");
  const tiersWrap = node.querySelector(".pick-tiers");
  if (!tiersWrap) return;
  const picks = thing.picks;
  const available = PICK_TIER_ORDER.filter((tier) => picks[tier]);
  if (!available.length) {
    tiersWrap.classList.add("hidden");
    pickBtn.classList.add("hidden");
    pickBox.classList.add("hidden");
    return;
  }
  pickBtn.classList.add("hidden");
  tiersWrap.classList.remove("hidden");
  tiersWrap.innerHTML = "";

  const selectTier = (tier) => {
    tiersWrap.querySelectorAll(".pick-tier-btn").forEach((btn) => {
      const active = btn.dataset.tier === tier;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    fillPickBox(node, picks[tier]);
  };

  available.forEach((tier) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pick-tier-btn";
    btn.dataset.tier = tier;
    btn.textContent = PICK_TIER_LABELS[tier];
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => selectTier(tier));
    tiersWrap.append(btn);
  });

  // 사용 가능한 등급 상품 페이지를 한 번에 새 탭으로 열기(팝업 차단 시 이 사이트 팝업 허용 필요)
  const openAll = document.createElement("button");
  openAll.type = "button";
  openAll.className = "pick-tier-open-all";
  openAll.textContent = `↗ ${available.length}개 한번에 열기`;
  openAll.title = "최저가·중간·프리미엄 상품 페이지를 새 탭으로 함께 엽니다";
  openAll.addEventListener("click", () => {
    available.forEach((tier) => window.open(picks[tier].url, "_blank", "noopener"));
  });
  tiersWrap.append(openAll);

  selectTier(picks.mid ? "mid" : available[0]);
}

function applyPick(node, thing) {
  const pickBtn = node.querySelector(".item-pick-btn");
  const pickBox = node.querySelector(".item-pick-box");
  if (!pickBtn || !pickBox) return;
  if (thing.picks) {
    renderPickTiers(node, thing);
    return;
  }
  const tiersWrap = node.querySelector(".pick-tiers");
  if (tiersWrap) tiersWrap.classList.add("hidden");
  const pick = thing.pick;
  if (pick) {
    pickBtn.href = pick.url;
    pickBtn.classList.remove("hidden");
    fillPickBox(node, pick);
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

function renderSetComponents(node, item) {
  const wrap = node.querySelector(".item-set-components");
  const row = node.querySelector(".set-components-row");
  if (!wrap || !row) return;
  if (!item.setItems || !item.setItems.length) {
    wrap.classList.add("hidden");
    return;
  }
  row.innerHTML = "";
  const rakuten = marketplaces.find((mp) => mp.id === "rakuten");
  item.setItems.forEach((id) => {
    const comp = items.find((x) => x.id === id);
    if (!comp) return;
    if (comp.picks) {
      const label = document.createElement("span");
      label.className = "set-component-label";
      label.textContent = `${comp.title}:`;
      row.append(label);
      PICK_TIER_ORDER.filter((tier) => comp.picks[tier]).forEach((tier) => {
        const a = document.createElement("a");
        a.target = "_blank";
        a.rel = "noreferrer";
        a.href = comp.picks[tier].url;
        a.textContent = PICK_TIER_LABELS[tier];
        row.append(a);
      });
    } else {
      const mp = comp.pick ? null : (shopsForItem(comp)[0] || rakuten);
      const a = document.createElement("a");
      a.target = "_blank";
      a.rel = "noreferrer";
      a.href = comp.pick ? comp.pick.url : searchUrl(mp, comp);
      a.textContent = comp.pick ? `★ ${comp.title}` : `${comp.title} 검색`;
      row.append(a);
    }
  });
  wrap.classList.remove("hidden");
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

  const links = node.querySelector(".link-row");
  shopsForItem(item).forEach((mp) => {
    const link = document.createElement("a");
    link.href = searchUrl(mp, item);
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = mp.name;
    links.append(link);
  });

  renderShopRecs(node, item);
  renderSetComponents(node, item);

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
  const links = node.querySelector(".link-row");
  const anchors = links.querySelectorAll("a");
  const shops = shopsForItem(item);
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

  const links = node.querySelector(".link-row");
  shopsForItem(kit).forEach((mp) => {
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
