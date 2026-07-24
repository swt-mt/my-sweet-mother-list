const sections = [
  {
    "id": "pregnancy",
    "title": "怀孕必需物品清单",
    "intro": "先保障产检、营养补充、舒适穿着和睡眠支持。医学相关物品按医生建议购买，避免把“可能用到”变成过量囤货。",
    "items": [
      [
        "preg-folate",
        "叶酸或孕期复合维生素",
        6,
        "营养",
        "确认剂量和品牌，尤其有贫血、甲状腺、糖代谢问题时先问医生。",
        "爱乐维 Elevit、Swisse、Blackmores|来源：ACOG营养建议 + 小红书/抖音孕期营养口碑"
      ],
      [
        "preg-record",
        "产检资料收纳袋",
        8,
        "产检",
        "放身份证件、医保资料、产检报告、B超单、检验单。",
        "国誉 Kokuyo、得力、晨光|来源：小红书待产收纳笔记 + 电商高评"
      ],
      [
        "preg-snack",
        "低糖便携加餐盒",
        12,
        "营养",
        "用于坚果、全麦饼干等加餐；妊娠糖尿病人群按营养门诊建议。",
        "乐扣乐扣、特百惠、膳魔师|来源：小红书孕期控糖便当口碑 + 电商高评"
      ],
      [
        "preg-bra",
        "孕期内衣/无钢圈内衣",
        14,
        "穿着",
        "胸围变化较快，先少量买，后期再补。",
        "嫚熙、十月妈咪、Bravado|来源：小红书孕妈穿搭口碑 + Babylist哺乳内衣测评"
      ],
      [
        "preg-stretch-oil",
        "妊娠纹油或霜",
        14,
        "护理",
        "用于孕期腹部、大腿、臀部等易干燥紧绷部位；优先选择孕妇可用、低刺激配方，皮肤破损或过敏时暂停使用。",
        "Mama&Kids、Palmer's、Mustela、嫩芙|来源：小红书孕期护理口碑 + What to Expect孕期护肤建议"
      ],
      [
        "preg-skincare-set",
        "孕妇可用护肤品",
        14,
        "护理",
        "基础保湿、防晒和温和清洁为主；避免自行叠加高刺激功效成分，有皮炎、痘痘或敏感问题先问医生。",
        "Mama&Kids、嫩芙、袋鼠妈妈、珂润|来源：小红书孕期护肤口碑 + 专业母婴站孕期护肤建议"
      ],
      [
        "preg-bath-set",
        "孕妇可用洗漱沐浴品",
        14,
        "护理",
        "选择温和清洁、低刺激、易冲洗的洗发沐浴和口腔清洁用品；香味过重或刺激明显的产品不建议囤。",
        "Mama&Kids、嫩芙、袋鼠妈妈、狮王|来源：小红书孕期洗护口碑 + 母婴电商高评"
      ],
      [
        "preg-shoes",
        "防滑低跟鞋",
        16,
        "安全",
        "鞋底稳定，避免细高跟和过软拖鞋。",
        "Skechers、Clarks、Crocs|来源：小红书孕期通勤口碑 + 电商高评"
      ],
      [
        "preg-clothes",
        "孕妇裤/可调节腰围衣物",
        18,
        "穿着",
        "根据季节买2到3套核心款，减少闲置。",
        "嫚熙、十月妈咪、犬印本铺|来源：小红书孕妇裤口碑 + 母婴电商热销"
      ],
      [
        "preg-pillow",
        "孕妇枕或侧睡支撑枕",
        20,
        "睡眠",
        "用于侧睡支撑腰腹和膝间，选择可拆洗外套。",
        "Boppy、Hiccapop、十月结晶、嫚熙|来源：Babylist/What to Expect孕妇枕推荐 + 小红书口碑"
      ],
      [
        "preg-bp",
        "上臂式血压计",
        24,
        "监测",
        "高龄、既往高血压、妊娠期高血压风险人群更建议准备。",
        "欧姆龙、鱼跃、松下|来源：家庭血压计专业口碑 + 电商高评"
      ],
      [
        "preg-scale",
        "体重秤",
        24,
        "监测",
        "用于记录体重变化，不追求每日精细波动。",
        "小米、华为、Withings|来源：电商高评 + 小红书家庭健康设备口碑"
      ],
      [
        "preg-socks",
        "孕期弹力袜",
        24,
        "循环",
        "下肢水肿或静脉曲张倾向可咨询医生选择压力等级。",
        "Sigvaris、Jobst、Medi|来源：医用压力袜专业品牌 + 临床常见推荐"
      ],
      [
        "preg-belt",
        "托腹带",
        24,
        "支撑",
        "腰背酸胀、腹部牵拉明显时再买；佩戴时间不要过长。",
        "Belly Bandit、犬印本铺、十月结晶|来源：Babylist孕期支撑用品 + 小红书待产口碑"
      ],
      [
        "preg-app",
        "胎动记录本或计数器",
        28,
        "监测",
        "孕晚期按医生指导记录胎动，异常及时就诊。",
        "美柚、宝宝树孕育、国誉记录本|来源：中文孕育社区常用工具 + 小红书记录模板"
      ],
      [
        "preg-glucose",
        "血糖仪及试纸",
        28,
        "监测",
        "通常在确诊或医生要求监测时购买，试纸注意有效期。",
        "罗氏、雅培、三诺、鱼跃|来源：血糖监测专业品牌 + 医生常见建议"
      ],
      [
        "preg-pad",
        "孕妇护腰靠垫",
        28,
        "舒适",
        "久坐办公或开车时可用，避免压迫腹部。",
        "8H、网易严选、宜家|来源：小红书孕期办公口碑 + 电商高评"
      ],
      [
        "preg-laundry",
        "婴儿衣物洗衣液",
        32,
        "家务",
        "用于提前清洗新生儿衣物和包巾，选低刺激、易漂洗。",
        "B&B保宁、babycare、十月结晶|来源：小红书母婴清洁口碑 + 电商高评"
      ]
    ]
  },
  {
    "id": "birth",
    "title": "生产必需物品清单",
    "intro": "生产相关物品集中在32到37周前准备，避免临近发动时手忙脚乱。医院会提供一部分用品，建议先查目标医院待产包要求。",
    "items": [
      [
        "birth-slippers",
        "防滑拖鞋",
        32,
        "穿着",
        "产后下床和洗漱时更安全。",
        "Crocs、Skechers、网易严选|来源：小红书住院待产口碑 + 电商高评"
      ],
      [
        "birth-toiletry",
        "洗漱用品和护肤小样",
        32,
        "个人",
        "牙刷、牙膏、毛巾、洗面奶、润唇膏，选择小容量。",
        "全棉时代、MUJI、曼秀雷敦|来源：小红书待产包口碑 + 电商高评"
      ],
      [
        "birth-bag",
        "待产包收纳袋",
        32,
        "收纳",
        "分妈妈、宝宝、陪护三袋，贴标签更容易找。",
        "子初、十月结晶、babycare|来源：小红书/抖音待产包高频品牌 + 电商高评"
      ],
      [
        "birth-docs",
        "住院证件包",
        32,
        "证件",
        "身份证、医保卡、银行卡、产检本、化验单、入院材料。",
        "国誉、得力、晨光|来源：小红书待产包收纳口碑 + 电商高评"
      ],
      [
        "birth-nursingbra",
        "哺乳内衣",
        34,
        "哺乳",
        "准备2到3件，先买可调节款。",
        "Bravado、Medela、嫚熙|来源：Babylist哺乳用品推荐 + 小红书口碑"
      ],
      [
        "birth-pajamas",
        "前开扣月子服/哺乳睡衣",
        34,
        "穿着",
        "2到3套，方便查房、哺乳和换洗。",
        "嫚熙、十月妈咪、全棉时代|来源：小红书月子服口碑 + 母婴电商热销"
      ],
      [
        "birth-confinement-hat-socks",
        "月子帽月子袜",
        34,
        "穿着",
        "按季节准备即可，重点是保暖舒适、透气不勒；室内温度合适时不需要过度捂汗。",
        "全棉时代、十月结晶、子初|来源：小红书月子用品口碑 + 母婴电商高评"
      ],
      [
        "birth-towel",
        "吸水毛巾和干发帽",
        34,
        "个人",
        "分脸、身体、私处用途，便于卫生管理。",
        "全棉时代、洁丽雅、babycare|来源：小红书母婴纺织口碑 + 电商高评"
      ],
      [
        "birth-toilet-cover",
        "一次性马桶垫",
        34,
        "个人",
        "住院期间使用公共卫生间时更卫生，选择独立包装更方便。",
        "子初、十月结晶、全棉时代|来源：小红书住院待产口碑 + 电商高评"
      ],
      [
        "birth-maternitypad",
        "产褥垫和卫生巾",
        34,
        "护理",
        "产褥垫用于床面防污，卫生巾准备夜用/裤型。",
        "十月结晶、子初、苏菲|来源：小红书待产护理口碑 + 电商高评"
      ],
      [
        "birth-maternity-paper",
        "刀纸/产妇专用纸",
        34,
        "护理",
        "部分医院待产或产房会要求准备，提前确认目标医院待产包要求。",
        "十月结晶、子初、全棉时代|来源：小红书待产护理口碑 + 电商高评"
      ],
      [
        "birth-underwear",
        "一次性内裤",
        34,
        "护理",
        "住院期和恶露期使用，尺码宁松不紧。",
        "子初、十月结晶、全棉时代|来源：小红书待产包高频品牌 + 电商高评"
      ],
      [
        "birth-snacks",
        "易消化能量补给",
        34,
        "饮食",
        "如能量棒、饼干；分娩期间是否能吃按医院要求。",
        "Keep、良品铺子、山姆自有品牌|来源：小红书待产零食口碑 + 电商高评"
      ],
      [
        "birth-bottle",
        "吸管杯或弯头吸管",
        34,
        "饮水",
        "宫缩、产后卧床时饮水更方便。",
        "b.box、乐扣乐扣、膳魔师|来源：小红书待产包口碑 + 电商高评"
      ],
      [
        "birth-pads",
        "防溢乳垫",
        35,
        "哺乳",
        "先少量购买，泌乳量稳定后再补。",
        "Lansinoh、Medela、十月结晶|来源：Babylist哺乳用品推荐 + 电商高评"
      ],
      [
        "birth-nipple",
        "乳头护理霜",
        35,
        "哺乳",
        "乳头皲裂风险时有用，选择婴儿入口相对安全的产品。",
        "Lansinoh、Medela、贝亲|来源：Babylist/What to Expect哺乳护理推荐 + 小红书口碑"
      ],
      [
        "birth-pump",
        "吸奶器",
        35,
        "哺乳",
        "不是人人必需；上班背奶、早产/分离、胀奶明显时更常用。",
        "Spectra、Medela、Philips Avent、新贝|来源：BabyGearLab/Wirecutter吸奶器测评 + 小红书口碑"
      ],
      [
        "birth-wash",
        "会阴冲洗瓶",
        35,
        "护理",
        "顺产或会阴不适时更方便清洁，剖宫产也可备用。",
        "Frida Mom、Lansinoh、十月结晶|来源：Babylist产后护理推荐 + 小红书待产包口碑"
      ],
      [
        "birth-perineal-coldpad",
        "会阴冷敷贴",
        35,
        "护理",
        "顺产后会阴肿胀或不适时短时冷敷，使用前按医院或医生建议。",
        "Frida Mom、Lansinoh、十月结晶|来源：Babylist产后护理推荐 + 小红书顺产护理口碑"
      ],
      [
        "birth-binder",
        "产后收腹带",
        35,
        "恢复",
        "剖宫产人群遵医嘱使用；不要过紧影响呼吸和循环。",
        "十月结晶、子初、犬印本铺|来源：小红书产后恢复口碑 + 电商高评"
      ],
      [
        "birth-swaddle",
        "包巾/襁褓巾",
        36,
        "宝宝",
        "医院和回家路上使用，选透气纯棉或纱布。",
        "Love to Dream、Aden + Anais、全棉时代|来源：Babylist包巾推荐 + 小红书口碑"
      ],
      [
        "birth-babyclothes",
        "新生儿出院衣物",
        36,
        "宝宝",
        "按季节准备连体衣、帽子、袜子，避免过厚捂热。",
        "全棉时代、童泰、英氏|来源：小红书新生儿衣物口碑 + 母婴电商热销"
      ],
      [
        "birth-diaper",
        "NB纸尿裤和湿巾",
        36,
        "宝宝",
        "NB码先少量买，宝宝体重增长快。",
        "Pampers、Huggies、Moony、babycare|来源：BabyGearLab纸尿裤测评 + 小红书/抖音口碑"
      ],
      [
        "birth-carrier",
        "婴儿提篮或安全座椅",
        36,
        "出院",
        "开车出院建议提前安装并练习固定。",
        "Nuna、Chicco、Graco、Cybex|来源：BabyGearLab/Wirecutter安全座椅测评"
      ],
      [
        "birth-folder",
        "出生医学证明资料袋",
        37,
        "证件",
        "用于放出生证明、疫苗本、住院发票等。",
        "国誉、得力、晨光|来源：小红书证件收纳口碑 + 电商高评"
      ]
    ]
  },
  {
    "id": "newborn",
    "title": "新生儿物品清单",
    "intro": "新生儿用品围绕睡眠安全、喂养清洁、排泄护理、洗澡护理、外出和基础健康监测准备。大件先买刚需，小件少量试用后再补。",
    "items": [
      [
        "new-monitor",
        "室温湿度计",
        30,
        "环境",
        "用于判断冷暖和干燥程度，避免过度包裹。",
        "米家、青萍、ThermoPro|来源：小红书育儿环境监测口碑 + 电商高评"
      ],
      [
        "new-crib",
        "婴儿床或独立睡眠床",
        30,
        "睡眠",
        "建议同房不同床，床垫坚实贴合，床内不放枕头、厚被和玩偶。",
        "Stokke、IKEA、好孩子 gb、Babyletto|来源：AAP安全睡眠原则 + BabyGearLab/Babylist婴儿床推荐"
      ],
      [
        "new-mattress",
        "硬质床垫和床笠",
        30,
        "睡眠",
        "床笠贴合床垫，准备2到3条换洗。",
        "Newton、Naturepedic、IKEA|来源：AAP安全睡眠原则 + BabyGearLab床垫测评"
      ],
      [
        "new-hat",
        "薄帽子和袜子",
        32,
        "穿着",
        "按季节选择，室内不需要长期戴厚帽。",
        "全棉时代、童泰、英氏|来源：小红书新生儿穿着口碑 + 电商高评"
      ],
      [
        "new-clothes",
        "和尚服/连体衣",
        32,
        "穿着",
        "52/59码少量准备，选前开或斜襟，方便换尿布。",
        "全棉时代、童泰、英氏|来源：小红书新生儿衣物口碑 + 母婴电商热销"
      ],
      [
        "new-blanket",
        "纱布包巾和轻薄盖毯",
        32,
        "睡眠",
        "睡眠时避免松散厚被；包裹要留髋部活动空间。",
        "Love to Dream、Aden + Anais、全棉时代|来源：AAP安全睡眠原则 + Babylist包巾推荐"
      ],
      [
        "new-changing",
        "隔尿垫",
        34,
        "排泄",
        "床面、换尿布台、外出包各备几张。",
        "十月结晶、子初、babycare|来源：小红书换尿布用品口碑 + 电商高评"
      ],
      [
        "new-cream",
        "护臀膏",
        34,
        "排泄",
        "红屁股时薄涂，严重破溃或感染迹象就医。",
        "Desitin、Bepanthen、Mustela|来源：Babylist尿布疹护理推荐 + 小红书口碑"
      ],
      [
        "new-wipes",
        "棉柔巾/湿巾",
        34,
        "排泄",
        "新生儿可优先温水加棉柔巾，湿巾选无香精。",
        "全棉时代、babycare、十月结晶、Pampers Sensitive|来源：BabyGearLab湿巾测评 + 小红书口碑"
      ],
      [
        "new-diapers",
        "NB纸尿裤",
        34,
        "排泄",
        "先准备1到2包，根据体重和皮肤适应度再补。",
        "Pampers、Huggies、Moony、babycare|来源：BabyGearLab纸尿裤测评 + 小红书/抖音口碑"
      ],
      [
        "new-bottle-cleanser",
        "奶瓶清洗剂",
        34,
        "清洁",
        "用于清洗奶瓶、奶嘴和吸奶器配件，选择易漂洗、低残留的婴儿专用清洁剂。",
        "贝亲、babycare、保宁 B&B|来源：小红书奶具清洁口碑 + 电商高评"
      ],
      [
        "new-brush",
        "奶瓶刷和晾干架",
        34,
        "清洁",
        "奶具清洗后充分晾干，避免潮湿滋生。",
        "贝亲、OXO Tot、Munchkin|来源：CDC奶具清洁建议 + Babylist清洁用品推荐"
      ],
      [
        "new-sterilizer",
        "奶瓶消毒锅或蒸汽消毒袋",
        34,
        "清洁",
        "按产品说明和医生建议使用，定期清洁设备本身。",
        "Philips Avent、Baby Brezza、贝亲|来源：CDC清洁消毒建议 + Babylist奶具消毒推荐"
      ],
      [
        "new-bottle",
        "新生儿奶瓶/奶嘴",
        34,
        "喂养",
        "母乳亲喂也可备1到2个，混合/配方喂养再增加。",
        "贝亲、Philips Avent、Dr. Brown's、Hegen|来源：BabyGearLab/Wirecutter奶瓶测评 + 小红书口碑"
      ],
      [
        "new-navel-patch",
        "防水肚脐贴",
        35,
        "护理",
        "脐带未脱落或刚脱落阶段洗澡时按需使用；日常脐部护理以保持清洁干燥和遵医嘱为准。",
        "贝亲、十月结晶、子初|来源：小红书新生儿护理口碑 + 母婴电商高评"
      ],
      [
        "new-cotton",
        "棉签和生理盐水",
        35,
        "护理",
        "脐部、鼻部护理按医嘱；不要深入耳道和鼻腔。",
        "全棉时代、贝亲、Fysoline|来源：儿科护理常见用品 + 小红书口碑"
      ],
      [
        "new-nail",
        "婴儿指甲剪或磨甲器",
        35,
        "护理",
        "新生儿指甲长得快，修剪时光线充足。",
        "Frida Baby、贝亲、日康|来源：Babylist护理工具推荐 + 小红书口碑"
      ],
      [
        "new-thermo",
        "电子体温计",
        35,
        "健康",
        "选择读数稳定的电子体温计，记录发热时间和体温。",
        "Braun、欧姆龙、鱼跃|来源：育儿专业测评 + 电商高评"
      ],
      [
        "new-vaccine-bandage",
        "预防针止血贴",
        35,
        "健康",
        "用于疫苗接种后短时间按压止血或保护针眼，选择婴幼儿可用、低敏透气款；长时间红肿需咨询医生。",
        "3M Nexcare、海氏海诺、稳健医疗|来源：家庭护理品牌口碑 + 电商高评"
      ],
      [
        "new-milk-storage",
        "储奶袋",
        35,
        "喂养",
        "用于冷藏或冷冻母乳，选择可标记日期、密封性好的款式；不确定是否背奶可先少量准备。",
        "Lansinoh、Medela、十月结晶、新贝|来源：Babylist哺乳用品推荐 + 小红书背奶口碑"
      ],
      [
        "new-thermostatic-kettle",
        "恒温壶",
        35,
        "喂养",
        "用于夜间冲奶或温水准备，选择控温稳定、易清洗、带安全断电保护的款式；母乳亲喂家庭可按需购买。",
        "小白熊、波咯咯、babycare、苏泊尔|来源：小红书新生儿喂养口碑 + 母婴电商高评"
      ],
      [
        "new-burp",
        "拍嗝巾/口水巾",
        35,
        "喂养",
        "准备6到10条，纱布材质更易干。",
        "Aden + Anais、全棉时代、babycare|来源：Babylist喂养用品推荐 + 小红书口碑"
      ],
      [
        "new-formula",
        "小罐新生儿配方奶",
        35,
        "喂养",
        "母乳计划家庭可少量备用；过敏、早产、特殊医学配方先问医生。",
        "爱他美、皇家美素佳儿、美赞臣|来源：小红书/抖音奶粉口碑 + 电商高评；特殊配方遵医嘱"
      ],
      [
        "new-face-butt-basin",
        "宝宝洗脸盆/洗屁屁盆",
        35,
        "洗护",
        "脸部和臀部清洁建议分盆使用，选择易清洗、边缘圆润的小盆。",
        "日康、babycare、十月结晶|来源：小红书宝宝洗护用品口碑 + 电商高评"
      ],
      [
        "new-baby-oil",
        "抚触油/婴儿油",
        35,
        "洗护",
        "用于宝宝抚触或皮肤干燥时少量使用，优先选择低刺激、少香精产品；皮疹或破损时先咨询医生。",
        "贝亲、Mustela、Mama&Kids|来源：Babylist宝宝护理推荐 + 小红书口碑"
      ],
      [
        "new-square-towel",
        "纱布方巾/小方巾",
        35,
        "洗护",
        "用于洗脸、擦手、擦口水或日常清洁，建议和拍嗝巾、浴巾分开使用。",
        "全棉时代、babycare、Aden + Anais|来源：小红书纱布用品口碑 + 电商高评"
      ],
      [
        "new-water-thermo",
        "水温计",
        35,
        "洗护",
        "用于洗澡前确认水温，避免过热或过凉；也可用手肘内侧辅助判断。",
        "日康、babycare、贝亲|来源：小红书宝宝洗澡用品口碑 + 电商高评"
      ],
      [
        "new-wash",
        "婴儿沐浴洗发二合一",
        35,
        "洗护",
        "低刺激、少香精；不必每天使用清洁剂。",
        "Mustela、Aveeno Baby、贝亲|来源：Babylist洗护推荐 + 小红书口碑"
      ],
      [
        "new-towel",
        "婴儿浴巾",
        35,
        "洗护",
        "准备2条，柔软吸水，和成人毛巾分开。",
        "全棉时代、babycare、Aden + Anais|来源：小红书纱布浴巾口碑 + 电商高评"
      ],
      [
        "new-bath",
        "婴儿浴盆",
        35,
        "洗护",
        "选择防滑、易排水款；洗澡过程手不离宝宝。",
        "Stokke、OKBaby、日康|来源：Babylist洗澡用品推荐 + 小红书口碑"
      ],
      [
        "new-medbox",
        "新生儿护理小药箱",
        36,
        "健康",
        "只放体温计、纱布、棉签等基础用品；药物必须遵医嘱。",
        "日康、babycare、得力收纳盒|来源：小红书新生儿护理收纳口碑 + 电商高评"
      ],
      [
        "new-laundry",
        "婴儿洗衣液和专用盆",
        36,
        "清洁",
        "衣物先洗后穿，尽量充分漂洗和晒干。",
        "B&B保宁、babycare、十月结晶|来源：小红书母婴清洁口碑 + 电商高评"
      ],
      [
        "new-laundry-soap",
        "婴儿洗衣皂和皂盒",
        36,
        "清洁",
        "用于局部手洗奶渍、便渍等小件衣物，皂盒保持干燥，避免和成人清洁用品混放。",
        "保宁 B&B、子初、babycare|来源：小红书母婴清洁口碑 + 电商高评"
      ],
      [
        "new-storage-rack",
        "宝宝用品收纳柜/置物架",
        36,
        "收纳",
        "用于集中放尿布、棉柔巾、衣物和护理用品，选择稳固、易清洁、边角安全的款式。",
        "宜家、爱丽思 IRIS、babycare|来源：小红书宝宝收纳口碑 + 电商高评"
      ],
      [
        "new-bag",
        "妈咪包",
        36,
        "外出",
        "放尿布、湿巾、备用衣、隔尿垫、奶具或水杯。",
        "Skip Hop、JuJuBe、babycare|来源：Babylist妈咪包推荐 + 小红书口碑"
      ],
      [
        "new-car-seat",
        "婴儿安全座椅",
        36,
        "外出",
        "私家车家庭建议出生前安装调试，确认反向安装角度。",
        "Nuna、Chicco、Graco、Cybex|来源：BabyGearLab/Wirecutter安全座椅测评"
      ],
      [
        "new-stroller",
        "婴儿车",
        36,
        "外出",
        "选可平躺、刹车稳、遮阳好、方便折叠的款式。",
        "UPPAbaby、Bugaboo、Nuna、好孩子 gb|来源：BabyGearLab/Wirecutter婴儿车测评 + 小红书口碑"
      ],
      [
        "new-trash",
        "带盖垃圾桶或尿布袋",
        37,
        "排泄",
        "减少异味，方便夜间处理纸尿裤。",
        "Ubbi、Munchkin、Diaper Genie|来源：Babylist尿布桶推荐 + 小红书口碑"
      ],
      [
        "new-night",
        "柔光夜灯",
        37,
        "夜间",
        "夜间喂奶换尿布用，光线柔和不刺眼。",
        "米家、Yeelight、VAVA|来源：小红书夜间喂养口碑 + 电商高评"
      ]
    ]
  }
]

const quantitySuggestions = {
  "preg-folate": "1瓶起；按医嘱续购",
  "preg-record": "1个",
  "preg-snack": "2-3个小盒",
  "preg-bra": "2-3件",
  "preg-shoes": "1双",
  "preg-clothes": "2-4套/条",
  "preg-pillow": "1个",
  "preg-belt": "1条",
  "preg-socks": "2-3双",
  "preg-scale": "1台",
  "preg-bp": "1台",
  "preg-glucose": "1套；试纸按周配",
  "preg-pad": "1个",
  "preg-app": "1个应用或本子",
  "preg-laundry": "1瓶起",
  "birth-docs": "1套",
  "birth-bag": "2-3个分装袋",
  "birth-toiletry": "1套旅行装",
  "birth-slippers": "1双",
  "birth-pajamas": "2-3套",
  "birth-nursingbra": "2-3件",
  "birth-underwear": "1-2包",
  "birth-maternitypad": "产褥垫1包；卫生巾2-3包",
  "birth-maternity-paper": "1包（10片）",
  "birth-towel": "3-4条",
  "birth-toilet-cover": "1包",
  "birth-bottle": "1个",
  "birth-snacks": "1小袋；按医院要求",
  "birth-nipple": "1支",
  "birth-pads": "1包",
  "birth-pump": "1台；按需购买",
  "birth-wash": "1个",
  "birth-perineal-coldpad": "1盒",
  "birth-binder": "1条；遵医嘱",
  "birth-babyclothes": "1-2套",
  "birth-swaddle": "1-2条",
  "birth-diaper": "NB 1包；湿巾1包",
  "birth-carrier": "1个",
  "birth-folder": "1个",
  "new-crib": "1张",
  "new-mattress": "1张；床笠2-3条",
  "new-monitor": "1个",
  "new-clothes": "52/59码各3-5件",
  "new-hat": "帽子1-2顶；袜子2-3双",
  "new-blanket": "包巾3-4条；盖毯1条",
  "new-diapers": "NB 1-2包",
  "new-wipes": "棉柔巾2-4包；湿巾1包",
  "new-cream": "1支",
  "new-changing": "3-5张",
  "new-bottle": "奶瓶1-2个；小号奶嘴2-3个",
  "new-brush": "1套",
  "new-bottle-cleanser": "1瓶",
  "new-sterilizer": "1台或1盒消毒袋",
  "new-formula": "小罐1罐；按需",
  "new-burp": "6-10条",
  "new-bath": "1个",
  "new-face-butt-basin": "各1个",
  "new-water-thermo": "1个",
  "new-wash": "1瓶",
  "new-baby-oil": "1瓶",
  "new-towel": "2条",
  "new-square-towel": "5-10条",
  "new-nail": "1套",
  "new-cotton": "棉签1盒；盐水少量",
  "new-thermo": "1支",
  "new-medbox": "1个",
  "new-stroller": "1台",
  "new-car-seat": "1台",
  "new-bag": "1个",
  "new-laundry": "洗衣液1瓶；盆1-2个",
  "new-laundry-soap": "1套",
  "new-storage-rack": "1个",
  "new-night": "1个",
  "new-trash": "1个",
  "preg-stretch-oil": "1瓶或1罐",
  "preg-skincare-set": "1套",
  "preg-bath-set": "1套",
  "birth-confinement-hat-socks": "月子帽1顶；月子袜2-3双",
  "new-milk-storage": "1盒",
  "new-thermostatic-kettle": "1台",
  "new-navel-patch": "1包",
  "new-vaccine-bandage": "1盒"
}

const stageMeta = [
  {
    "id": "pregnancy",
    "name": "怀孕",
    "title": "怀孕必需物品清单",
    "intro": "先保障产检、营养补充、舒适穿着和睡眠支持。医学相关物品按医生建议购买，避免把“可能用到”变成过量囤货。",
    "accent": "#78927d"
  },
  {
    "id": "birth",
    "name": "生产",
    "title": "生产必需物品清单",
    "intro": "生产相关物品集中在32到37周前准备，避免临近发动时手忙脚乱。医院会提供一部分用品，建议先查目标医院待产包要求。",
    "accent": "#c97766"
  },
  {
    "id": "newborn",
    "name": "新生儿照顾",
    "title": "新生儿物品清单",
    "intro": "新生儿用品围绕睡眠安全、喂养清洁、排泄护理、洗澡护理、外出和基础健康监测准备。大件先买刚需，小件少量试用后再补。",
    "accent": "#7bbec1"
  }
]

function parseBrand(raw) {
  const [brands = '按需选择'] = String(raw || '').split('|')
  return { brands: brands.trim() || '按需选择' }
}

const flatItems = sections.flatMap(section => section.items.map(item => {
  const [id, name, week, group, tip, brand] = item
  const pieces = parseBrand(brand)
  return {
    id,
    sectionId: section.id,
    sectionTitle: section.title,
    name,
    week,
    group,
    tip,
    quantity: quantitySuggestions[id] || '按需',
    brandRaw: brand,
    brandLabels: pieces.brands
  }
}))

function findItemById(id) { return flatItems.find(item => item.id === id) || null }
function getSectionById(id) { return sections.find(section => section.id === id) || null }

module.exports = { sections, quantitySuggestions, stageMeta, flatItems, parseBrand, findItemById, getSectionById }
