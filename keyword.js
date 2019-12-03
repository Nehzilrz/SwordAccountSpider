const keywords = [
    { name: "四红", value: 'bool', type:"红发", keyword:[/四红/, /全红/] },
    { name: "五红", value: 'bool', type:"红发", keyword:[/五红/, /全红/] },
    { name: "六红", value: 'bool', type:"红发", keyword:[/六红/, /全红/] },
    { name: "七红", value: 'bool', type:"红发", keyword:[/七红/, /全红/] },
    { name: "八红", value: 'bool', type:"红发", keyword:[/八红/, /全红/] },
    { name: "九红", value: 'bool', type:"红发", keyword:[/九红/, /全红/] },
    { name: "十红", value: 'bool', type:"红发", keyword:[/十红/, /全红/] },
    { name: "猴红", value: 'bool', type:"红发", keyword:[/猴红/, /全红/] },
    { name: "叽红", value: 'bool', type:"红发", keyword:[/叽红/, /鸡红/, /全红/] },
    { name: "羊红", value: 'bool', type:"红发", keyword:[/羊红/, /全红/] },
    { name: "猪红", value: 'bool', type:"红发", keyword:[/猪红/, /全红/] },
    { name: "狗红", value: 'bool', type:"红发", keyword:[/狗红/, /全红/] },
    { name: "红发", value: 'cond', default: 0, type:"红发", keyword:[/(\d)+红/], condition: { from: '四红', to: '狗红', rule: d => d }  },
    { name: "四五六红", value: 'cond', default: 0, type:"红发", keyword:[], condition: { from: '四红', to: '六红', rule: d => d == 3 }  },
    { name: "半秃", value: 'cond', default: 0, type:"红发", keyword:[], condition: { from: '四红', to: '六红', rule: d => d == 0 }  },
    { name: "狐金", value: 'bool', type:"金发", keyword:[/狐金/, /全金/, /三巨头/] },
    { name: "一代金", value: 'bool', type:"金发", keyword:[/一代金/, /全金/, /三巨头/] },
    { name: "猴金", value: 'bool', type:"金发", keyword:[/猴金/, /全金/, /三巨头/] },
    { name: "苏金", value: 'bool', type:"金发", keyword:[/苏金/, /全金/, /三巨头/] },
    { name: "蝶金", value: 'bool', type:"金发", keyword:[/蝶金/, /全金/] },
    { name: "喵金", value: 'bool', type:"金发", keyword:[/喵金/, /全金/] },
    { name: "考金", value: 'bool', type:"金发", keyword:[/考金/, /全金/] },
    { name: "鸡金", value: 'bool', type:"金发", keyword:[/鸡金/, /叽金/, /全金/] },
    { name: "国金", value: 'bool', type:"金发", keyword:[/国金/, /全金/] },
    { name: "倒闭金", value: 'bool', type:"金发", keyword:[/倒闭金/, /全金/] },
    { name: "狗金", value: 'bool', type:"金发", keyword:[/狗金/, /全金/] },
    { name: "端午金", value: 'bool', type:"金发", keyword:[/端午金/, /龙女金/, /全金/] },
    { name: "珊瑚金", value: 'bool', type:"金发", keyword:[/珊瑚金/, /全金/] },
    { name: "中秋金", value: 'bool', type:"金发", keyword:[/中秋金/, /全金/] },
    { name: "玫瑰金", value: 'bool', type:"金发", keyword:[/玫瑰金/, /全金/] },
    { name: "猪金", value: 'bool', type:"金发", keyword:[/猪金/, /全金/] },
    { name: "兔金", value: 'bool', type:"金发", keyword:[/兔金/, /全金/] },
    { name: "丝路金", value: 'bool', type:"金发", keyword:[/丝路金/, /全金/] },
    { name: "金发三巨头", value: 'cond', default: 0, type:"金发", keyword:[/三巨头/], condition: { from: '狐金', to: '猴金', rule: d => d == 3 }  },
    { name: "金发", value: 'cond', default: 0, type:"金发", keyword:[/(\d)+金/], condition: { from: '狐金', to: '丝路金', rule: d => d }  },
    { name: "秃头", value: 'cond', default: 0, type:"金发", keyword:[], condition: { keys: ['四红', '五红', '六红', '一代金', '狐金'], rule: d => d == 0 }  },
    { name: "白发", value: 'number', default: 0, type:"金发", keyword:[/(\d)+白/] },
    { name: "黑发", value: 'number', default: 0, type:"金发", keyword:[/(\d)+黑/] },
    { name: "粉白菜", value: 'bool', type:"五限", keyword:[/粉白菜/, /双色?白菜/] },
    { name: "紫白菜", value: 'bool', type:"五限", keyword:[/紫白菜/, /双色?白菜/] },
    { name: "黑金夜斩白", value: 'bool', type:"五限", keyword:[/黑金夜斩白/, /双色?夜斩白/] },
    { name: "白金夜斩白", value: 'bool', type:"五限", keyword:[/白金夜斩白/, /双色?夜斩白/] },
    { name: "情阅", value: 'bool', type:"五限", keyword:[/情阅/] },
    { name: "谷雨", value: 'bool', type:"五限", keyword:[/谷雨/] },
    { name: "白螺母", value: 'bool', type:"五限", keyword:[/(?!商城)白螺母/, /双色?螺母/] },
    { name: "蓝螺母", value: 'bool', type:"五限", keyword:[/蓝螺母/, /双色?螺母/] },
    { name: "红墨韵", value: 'bool', type:"五限", keyword:[/红墨韵/, /双色?墨韵/] },
    { name: "黑墨韵", value: 'bool', type:"五限", keyword:[/黑墨韵/, /双色?墨韵/] },
    { name: "红彩云", value: 'bool', type:"五限", keyword:[/红彩云/, /双色?彩云/] },
    { name: "蓝彩云", value: 'bool', type:"五限", keyword:[/蓝彩云/, /双色?彩云/] },
    { name: "红风露", value: 'bool', type:"五限", keyword:[/红风露/, /双色?风露/] },
    { name: "蓝风露", value: 'bool', type:"五限", keyword:[/黑风露/, /蓝风露/, /双色?风露/] },
    { name: "橙繁", value: 'bool', type:"五限", keyword:[/橙繁/, /双色?繁/] },
    { name: "粉繁", value: 'bool', type:"五限", keyword:[/粉繁/, /双色?繁/] },
    { name: "阳春海", value: 'bool', type:"五限", keyword:[/阳春海/, /双色?阳春/] },
    { name: "阳春冰", value: 'bool', type:"五限", keyword:[/阳春冰/, /双色?阳春/] },
    { name: "红玉蟒", value: 'bool', type:"五限", keyword:[/红玉蟒/, /玉蟒珥/, /双色?玉蟒/] },
    { name: "黑玉蟒", value: 'bool', type:"五限", keyword:[/黑玉蟒/, /玉蟒鲜/, /双色?玉蟒/] },
    { name: "红捕风", value: 'bool', type:"五限", keyword:[/红捕风/, /双色?捕风/] },
    { name: "黑捕风", value: 'bool', type:"五限", keyword:[/黑捕风/, /紫捕风/, /双色?捕风/] },
    { name: "红紧那", value: 'bool', type:"五限", keyword:[/红紧那/, /双色?紧那/] },
    { name: "黑紧那", value: 'bool', type:"五限", keyword:[/黑紧那/, /紫紧那/, /双色?紧那/] },
    { name: "紫火舞", value: 'bool', type:"五限", keyword:[/双色?火舞/, /火舞杏甜/] },
    { name: "白火舞", value: 'bool', type:"五限", keyword:[/双色?火舞/, /火舞未翔/] },
    { name: "蓝花开", value: 'bool', type:"五限", keyword:[/(?!复刻)蓝花开/, /双色?花开/] },
    { name: "黄花开", value: 'bool', type:"五限", keyword:[/(?!复刻)黄花开/, /双色?花开/] },
    { name: "策马若如", value: 'bool', type:"五限", keyword:[/策马若如/, /双色?策马/] },
    { name: "策马河洲", value: 'bool', type:"五限", keyword:[/策马河洲/, /双色?策马/] },
    { name: "黑风华", value: 'bool', type:"五限", keyword:[/黑风华/, /双色?风华/] },
    { name: "紫风华", value: 'bool', type:"五限", keyword:[/紫风华/, /双色?风华/] },
    { name: "五限", value: 'cond', type:"五限", default: 0, keyword:[/(\d)+五限/], condition: { from: '粉白菜', to: '紫风华', rule: d => d } },
    { name: "白娃娃", value: 'bool', type:"六限", keyword:[/白娃娃/, /四色娃娃/] },
    { name: "粉娃娃", value: 'bool', type:"六限", keyword:[/粉娃娃/, /四色娃娃/] },
    { name: "黄娃娃", value: 'bool', type:"六限", keyword:[/黄娃娃/, /四色娃娃/] },
    { name: "蓝娃娃", value: 'bool', type:"六限", keyword:[/蓝娃娃/, /四色娃娃/] },
    { name: "蓝不期", value: 'bool', type:"六限", keyword:[/蓝不期/, /双色?不期/] },
    { name: "绿不期", value: 'bool', type:"六限", keyword:[/绿不期/, /双色?不期/] },
    { name: "蓝公主", value: 'bool', type:"六限", keyword:[/蓝公主/, /双色?公主/] },
    { name: "粉公主", value: 'bool', type:"六限", keyword:[/粉公主/, /双色?公主/] },
    { name: "黑年轮", value: 'bool', type:"六限", keyword:[/黑年轮/, /四色年轮/] },
    { name: "红年轮", value: 'bool', type:"六限", keyword:[/红年轮/, /四色年轮/] },
    { name: "蓝年轮", value: 'bool', type:"六限", keyword:[/蓝年轮/, /四色年轮/] },
    { name: "黄年轮", value: 'bool', type:"六限", keyword:[/黄年轮/, /四色年轮/] },
    { name: "粉人面", value: 'bool', type:"六限", keyword:[/粉人面/, /双色?人面/] },
    { name: "蓝人面", value: 'bool', type:"六限", keyword:[/蓝人面/, /双色?人面/] },
    { name: "黄无色", value: 'bool', type:"六限", keyword:[/黄无色/, /四色无色/] },
    { name: "蓝无色", value: 'bool', type:"六限", keyword:[/蓝无色/, /四色无色/] },
    { name: "粉无色", value: 'bool', type:"六限", keyword:[/粉无色/, /四色无色/] },
    { name: "白无色", value: 'bool', type:"六限", keyword:[/白无色/, /四色无色/] },
    { name: "红九曲", value: 'bool', type:"六限", keyword:[/红九曲/, /双色?九曲/] },
    { name: "蓝九曲", value: 'bool', type:"六限", keyword:[/蓝九曲/, /双色?九曲/] },
    { name: "金陵", value: 'bool', type:"六限", keyword:[/金陵/] },
    { name: "金螺母", value: 'bool', type:"其他", keyword:[/金螺母/] },
    { name: "望月", value: 'bool', type:"其他", keyword:[/望月/] },
    { name: "兰亭", value: 'bool', type:"其他", keyword:[/兰亭/] },
    { name: "九壤", value: 'bool', type:"其他", keyword:[/九壤/] },
    { name: "禹梦", value: 'bool', type:"其他", keyword:[/禹梦/] },
    { name: "长天", value: 'bool', type:"其他", keyword:[/长天/] },
    { name: "沐云飞", value: 'bool', type:"其他", keyword:[/沐云飞/] },
    { name: "红舞步", value: 'bool', type:"其他", keyword:[/红舞步/, /舞步/] },
    { name: "封川", value: 'bool', type:"其他", keyword:[/封川/] },
    { name: "水云寒", value: 'bool', type:"其他", keyword:[/水云寒/] },
    { name: "微草", value: 'bool', type:"其他", keyword:[/微草/] },
    { name: "清宵重天", value: 'bool', type:"其他", keyword:[/清宵重天/] },
    { name: "暮归锦夜", value: 'bool', type:"其他", keyword:[/暮归锦夜/] },
    { name: "踏月", value: 'bool', type:"其他", keyword:[/踏月/] },
    { name: "寒梅", value: 'bool', type:"其他", keyword:[/寒梅/] },
    { name: "一代黑", value: 'bool', type:"披风", keyword:[/一代黑(?!花朝)/] },
    { name: "一代白", value: 'bool', type:"披风", keyword:[/一代白(?!花朝)/] },
    { name: "一代紫", value: 'bool', type:"披风", keyword:[/一代紫/] },
    { name: "一代黄", value: 'bool', type:"披风", keyword:[/一代黄/] },
    { name: "一代红", value: 'bool', type:"披风", keyword:[/一代红/] },
    { name: "一代粉", value: 'bool', type:"披风", keyword:[/一代粉(?!花朝)/] },
    { name: "一代披风", value: 'cond', type:"披风", default: 0, keyword:[], condition: { from: '一代黑', to: '一代粉', rule: d => d } },
    { name: "二代黑", value: 'bool', type:"披风", keyword:[/二代黑/] },
    { name: "栽火莲", value: 'bool', type:"披风", keyword:[/栽火莲/] },
    { name: "六翼", value: 'bool', type:"披风", keyword:[/六翼/, /6e/] },
    { name: "情人枕", value: 'bool', type:"披风", keyword:[/情人枕/, /情r枕/] },
    { name: "鸡翅膀", value: 'bool', type:"披风", keyword:[/狄仁杰披风/, /鸡翅膀/] },
    { name: "羽毛", value: 'bool', type:"披风", keyword:[/羽毛/] },
    { name: "星空", value: 'bool', type:"披风", keyword:[/星空/] },
    { name: "阵营蓝", value: 'bool', type:"披风", keyword:[/阵营蓝/] },
    { name: "阵营红", value: 'bool', type:"披风", keyword:[/阵营红/] },
    { name: "狐狸毛", value: 'bool', type:"披风", keyword:[/狐狸毛/] },
    { name: "孔雀", value: 'bool', type:"披风", keyword:[/孔雀/] },
  //  { name: "周年龙", value: 'bool', type:"披风", keyword:[/周年龙/] },
  //  { name: "周年粉", value: 'bool', type:"披风", keyword:[/周年粉/] },
    { name: "狼头", value: 'bool', type:"披风", keyword:[/狼头/] },
    { name: "天辉", value: 'bool', type:"披风", keyword:[/天辉/] },
    { name: "白莲花", value: 'bool', type:"披风", keyword:[/白莲花/] },
    { name: "画卷", value: 'bool', type:"披风", keyword:[/画卷/] },
    { name: "喵萝干", value: 'bool', type:"披风", keyword:[/喵萝干/] },
    { name: "毒萝干", value: 'bool', type:"披风", keyword:[/毒萝干/] },
    { name: "双十一", value: 'bool', type:"披风", keyword:[/双十一/] },
    { name: "黑盒", value: 'bool', type:"礼盒", keyword:[/黑盒/] },
    { name: "蓝盒", value: 'bool', type:"礼盒", keyword:[/蓝盒/] },
    { name: "红盒", value: 'bool', type:"礼盒", keyword:[/红盒/] },
    { name: "青盒", value: 'bool', type:"礼盒", keyword:[/青盒/] },
    { name: "糖盒", value: 'bool', type:"礼盒", keyword:[/糖盒/] },
    { name: "白盒", value: 'bool', type:"礼盒", keyword:[/白盒/] },
    { name: "喵盒", value: 'bool', type:"礼盒", keyword:[/喵盒/] },
    { name: "刀盒", value: 'bool', type:"礼盒", keyword:[/刀盒/, /貂盒/] },
    { name: "粉盒", value: 'bool', type:"礼盒", keyword:[/粉盒/] },
    { name: "花盒", value: 'bool', type:"礼盒", keyword:[/花盒/] },
    { name: "叽盒", value: 'bool', type:"礼盒", keyword:[/叽盒/] },
    { name: "秃盒", value: 'bool', type:"礼盒", keyword:[/秃盒/] },
    { name: "伞盒", value: 'bool', type:"礼盒", keyword:[/蓬莱盒/, /伞盒/] },
    { name: "猪盒", value: 'bool', type:"礼盒", keyword:[/猪盒/] },
    { name: "毒盒", value: 'bool', type:"礼盒", keyword:[/毒盒/] },
    { name: "狗盒", value: 'bool', type:"礼盒", keyword:[/狗盒/] },
    { name: "歌盒", value: 'bool', type:"礼盒", keyword:[/歌盒/] },
    { name: "一代七夕", value: 'bool', type:"礼盒", keyword:[/一代七夕/] },
    { name: "二代七夕", value: 'bool', type:"礼盒", keyword:[/二代七夕/] },
    { name: "三代七夕", value: 'bool', type:"礼盒", keyword:[/三代七夕/] },
    { name: "四代七夕", value: 'bool', type:"礼盒", keyword:[/四代七夕/] },
    { name: "一代重阳", value: 'bool', type:"礼盒", keyword:[/一代重阳/] },
    { name: "二代重阳", value: 'bool', type:"礼盒", keyword:[/二代重阳/] },
    { name: "黑端午", value: 'bool', type:"礼盒", keyword:[/黑端午/] },
    { name: "白端午", value: 'bool', type:"礼盒", keyword:[/白端午/] },
    { name: "狄仁杰", value: 'bool', type:"礼盒", keyword:[/狄仁杰/] },
    { name: "中秋盒", value: 'bool', type:"礼盒", keyword:[/中秋盒/] },
    { name: "丝路盒", value: 'bool', type:"礼盒", keyword:[/丝路盒/] },
    { name: "一代元宵", value: 'bool', type:"礼盒", keyword:[/一代元宵/] },
    { name: "二代元宵", value: 'bool', type:"礼盒", keyword:[/二代元宵/] },
    { name: "蓝中秋", value: 'bool', type:"礼盒", keyword:[/蓝中秋/] },
    { name: "粉中秋", value: 'bool', type:"礼盒", keyword:[/(?!代)粉中秋/] },
    { name: "绿中秋", value: 'bool', type:"礼盒", keyword:[/绿中秋/] },
    { name: "花朝盒", value: 'bool', type:"礼盒", keyword:[/花朝/] },
    { name: "狗盒子", value: 'bool', type:"礼盒", keyword:[/狗盒子/] },
    { name: "猫盒子", value: 'bool', type:"礼盒", keyword:[/猫盒子/] },
    { name: "棉袄", value: 'bool', type:"礼盒", keyword:[/棉袄/] },
    { name: "泠月兰芳", value: 'bool', type:"礼盒", keyword:[/泠月兰芳/] },
    { name: "踏云盒子", value: 'bool', type:"礼盒", keyword:[/踏云/] },
    { name: "飞天盒子", value: 'bool', type:"礼盒", keyword:[/飞天/] },
    { name: "四代粉中秋", value: 'bool', type:"礼盒", keyword:[/四代粉中秋/] },
    { name: "100cw", value: 'bool', type:"杂项", keyword:[/100(^c)*cw/, /100(^橙)*橙武/, /100w/, /100(^大)*大铁/, /100(^玄)*玄晶/, /归(虚|墟)玄晶/, /100级?双cw/] },
    { name: "双100cw", value: 'bool', type:"杂项", keyword:[/双100(^c)*cw/, /双100(^橙)*橙武/, /100(^双)*双(^c)*cw/, /100(^双)*双(^橙)*橙武/] },
    { name: "焰归", value: 'bool', type:"杂项", keyword:[/焰归/] },
    { name: "珠盏", value: 'bool', type:"杂项", keyword:[/珠盏/] },
    { name: "夜话", value: 'bool', type:"杂项", keyword:[/夜话/] },
    { name: "黑龙", value: 'bool', type:"杂项", keyword:[/黑龙/] },
    { name: "资历", value: 'number', type:"杂项", default: 3, keyword:[/(\d)+(\.\d|w\d?)资历/, /资历(\d|w)+[^\d^w]/]},
    // { name: "九万资历", value: 'cond', type:"杂项", default: 0, keyword:[/[九|十][万|w]资历/], condition: { from: '资历', to: '资历', rule: d => d >= 9 }},
    { name: "十万资历", value: 'cond', type:"杂项", default: 0, keyword:[/十(万|w)资历/], condition: { from: '资历', to: '资历', rule: d => d >= 10 }},
    { name: "奇遇", value: 'number', type:"杂项", default: 0, keyword:[/(\d)+奇遇/], next: d => (d >= 50) },
    { name: "限量", value: 'number', type:"杂项", default: 0, keyword:[/(\d)+限量/] },
    { name: "披风", value: 'number', type:"杂项", default: 0, keyword:[/(\d)+披风/] },
    { name: "成衣", value: 'number', type:"杂项", default: 0, keyword:[/(\d)+(商城)?成衣?/] },
    { name: "五甲", value: 'number', type:"杂项", default: 0, keyword:[/(\d)+五甲/] },
    { name: "脚印", value: 'number', type:"杂项", default: 0, keyword:[/(\d)?脚印/] },
    { name: "劲足赤兔", value: 'bool', type:"杂项", keyword:[/赤兔(骤风|怒风|飞鸿|飞虹|衍羽|道轻)/] },
    { name: "普通赤兔", value: 'bool', type:"杂项", keyword:[/赤兔/] },
    { name: "二内", value: 'bool', type:"杂项", keyword:[/二内/] },
    { name: "三内", value: 'bool', type:"杂项", keyword:[/三内/] },
    { name: "月伴晨星", value: 'bool', type:"杂项", keyword:[/月伴/] },
    { name: "星河清梦", value: 'bool', type:"杂项", keyword:[/土豪船/, /黄金船/, /星河清梦/] },
    { name: "阴阳两界", value: 'bool', type:"杂项", keyword:[/霸红尘/, /阴阳两界/] },
    { name: "三山四海", value: 'bool', type:"杂项", keyword:[/三山(?!前置)/, /举高高/] },
    { name: "三尺青锋", value: 'bool', type:"杂项", keyword:[/三尺(?!前置)/] },
    { name: "塞外宝驹", value: 'bool', type:"杂项", keyword:[/塞外(?!前置)/] },
    { name: "济苍生", value: 'bool', type:"杂项", keyword:[/济苍生/] },
    { name: "惜往日", value: 'bool', type:"杂项", keyword:[/惜往日/, /摸头杀/] },
    { name: "黑白路", value: 'bool', type:"杂项", keyword:[/黑白路/, /大宝剑/] },
    { name: "九天逍遥散", value: 'bool', type:"杂项", keyword:[/九天逍遥/] },
    { name: "大侠", value: 'bool', type:"杂项", keyword:[/大侠/] },
    { name: "大雕", value: 'bool', type:"杂项", keyword:[/大雕/] },
    { name: "滚滚", value: 'bool', type:"杂项", keyword:[/滚滚/] },
    { name: "团团", value: 'bool', type:"杂项", keyword:[/团团/] },
    { name: "闹闹", value: 'bool', type:"杂项", keyword:[/闹闹/] },
    { name: "鹦鹉", value: 'bool', type:"杂项", keyword:[/鹦鹉/] },
    { name: "橘猫", value: 'bool', type:"杂项", keyword:[/橘猫/, /橘胖/] },
]

const preReplace = [
  [/520白/g, '白']
]

const keywordRules = {
  '资历': d => {
    if (d > 1000) {
      d /= 10000
    }
    if (d <= 4) {
      return 0
    } else if (d <= 6) {
      return .4
    } else if (d <= 7) {
      return 1
    } else if (d <= 8) {
      return 2
    } else if (d <= 9) {
      return 4
    } else if (d <= 10) {
      return 15
    } else {
      return 30
    }
  },
  '奇遇': d => {
    if (d <= 30) {
      return .5
    } else if (d <= 40) {
      return 1.5
    } else if (d <= 50) {
      return 2.5
    } else if (d <= 55) {
      return 15
    } else {
      return 30
    }
  }
}

const bodys = [
    { name: "萝莉", value: 'bool', type:"体型", keyword:[/萝莉/, /(咩|秀|花|琴|鸽|歌|喵|军|盾|毒|伞|叽|鸡|炮|丐|刀|盾|苍|雪)萝(?!干)/]},
    { name: "成女", value: 'bool', type:"体型", keyword:[/成女/, /道姑/, /(伞|丐|炮|秀|刀|花|毒|琴|喵|苍|盾)姐/, /(军|琴|伞|雪|盾|苍|刀)娘/, /二小姐/]},
    { name: "成男", value: 'bool', type:"体型", keyword:[/成男/, /道长/, /(花|毒|琴|伞|丐|刀|炮|喵)哥/, /(军|刀|雪)爷/, /(苍|琴|伞|刀|雪)爹/, /二少/, /(?!小)和尚/, /大师(?!赛)/]},
    { name: "正太", value: 'bool', type:"体型", keyword:[/(正|咩|花|秀|毒|呱|琴|喵|狗|雪|盾|伞|炮|策|刀|军|叽|苍|秃|丐|鸡|歌)太/, /小灯泡/, /小和尚/]},
]

const schools = ['五毒', '七秀', '万花', '长歌', '天策', '藏剑', '少林', '丐帮', '苍云', '纯阳', '明教', '唐门', '霸刀', '蓬莱', '凌雪阁']
const schoolKeyword = [
  { name :'五毒', keywords: [/五毒(成女|成男|萝莉|正太)/, /毒(萝|姐|哥|太)/, /呱太/] },
  { name :'七秀', keywords: [/七秀(成女|成男|萝莉|正太)/, /秀(萝|太|姐)/] },
  { name :'万花', keywords: [/万花(成女|成男|萝莉|正太)/, /花(萝|姐|哥|太)/] },
  { name :'长歌', keywords: [/长歌(成女|成男|萝莉|正太)/, /琴(萝|姐|爹|太|娘)/, /(鸽|歌)萝/] },
  { name :'天策', keywords: [/天策(成女|成男|萝莉|正太)/, /军(萝|娘|爷|太)/, /(狗|策)太/] },
  { name :'藏剑', keywords: [/藏剑(成女|成男|萝莉|正太)/, /叽(萝|太)/, /二小姐/, /鸡萝/, /二少/] },
  { name :'少林', keywords: [/少林(成女|成男|萝莉|正太)/, /大师/, /秃太/, /小(和尚|灯泡)/, /和尚/] },
  { name :'丐帮', keywords: [/丐帮(成女|成男|萝莉|正太)/, /丐(萝|姐|哥|太)/] },
  { name :'苍云', keywords: [/苍云(成女|成男|萝莉|正太)/, /盾(萝|娘|姐|太)/, /苍(爹|娘|萝|太)/] },
  { name :'纯阳', keywords: [/纯阳(成女|成男|萝莉|正太)/, /咩(萝|太)/, /道(姑|长)/] },
  { name :'明教', keywords: [/明教(成女|成男|萝莉|正太)/, /喵(萝|姐|哥|太)/] },
  { name :'唐门', keywords: [/唐门(成女|成男|萝莉|正太)/, /炮(萝|姐|哥|太)/] },
  { name :'霸刀', keywords: [/霸刀(成女|成男|萝莉|正太)/, /刀(萝|娘|姐|哥|太|爷|爹)/] },
  { name :'蓬莱', keywords: [/蓬莱(成女|成男|萝莉|正太)/, /伞(萝|娘|姐|爹|太)/] },
  { name :'凌雪阁', keywords: [/凌雪(成女|成男|萝莉|正太)/, /雪(萝|爹|娘|太)/, /(大|女)侠/] },
]

const keywordsMap = {}
for (let i = 0; i < keywords.length; ++i) {
  keywordsMap[keywords[i].name] = i
}

function findKeywordIndex(name) {
  return keywordsMap[name]
}

module.exports = {
    bodys,
    keywords,
    schools,
    schoolKeyword,
    keywordRules,
    findKeywordIndex,
    preReplace,
}