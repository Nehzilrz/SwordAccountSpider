let keywords = [
  { name: "四红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "五红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "六红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "七红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "八红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "九红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "十红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "猴红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "鸡红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "羊红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "猪红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "狗红", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "一代金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "猴金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "狐金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "苏金", type: "发型", alias: ['苏曼莎金'], regs: [], tier: 0 },
  { name: "蝶金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "喵金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "考金", type: "发型", alias: ['高考金'], regs: [], tier: 0 },
  { name: "鸡金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "国金", type: "发型", alias: ['国庆金'], regs: [], tier: 0 },
  { name: "倒闭金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "狗金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "破晓金", type: "发型", alias: ['龙女金', '端午金'], regs: [], tier: 0 },
  { name: "中秋金", type: "发型", alias: ['壶金'], regs: [], tier: 0 },
  { name: "玫瑰金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "猪金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "丝路金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "珊瑚金", type: "发型", alias: [], regs: [], tier: 0 },
  { name: "月兔金", type: "发型", alias: ['兔金'], regs: [], tier: 0 },
  { name: "马尾金", type: "发型", alias: ['飒金'], regs: [], tier: 0 },
  { name: "粉白菜", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "紫白菜", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑金夜斩白", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "白金夜斩白", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "情阅", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "谷雨", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "白螺母", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "蓝螺母", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红墨韵", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑墨韵", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红彩云", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "蓝彩云", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红风露", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "蓝风露", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "橙繁", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "粉繁", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "阳春海", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "阳春冰", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红玉蟒", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑玉蟒", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红捕风", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑捕风", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "红紧那", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑紧那", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "紫火舞", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "白火舞", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "蓝花开", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黄花开", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "策马若如", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "策马河洲", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "黑风华", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "紫风华", type: "五限", alias: [], regs: [], tier: 0 },
  { name: "白娃娃", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "粉娃娃", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "黄娃娃", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝娃娃", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝不欺", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "绿不欺", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝公主", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "粉公主", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "黑年轮", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "红年轮", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝年轮", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "黄年轮", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "粉人面", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝人面", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "黄无色", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝无色", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "粉无色", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "白无色", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "红九曲", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "蓝九曲", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "金陵", type: "六限", alias: [], regs: [], tier: 0 },
  { name: "金螺母", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "富婆套", type: "其他", alias: ["任侠河山"], regs: [], tier: 0 },
  { name: "望月", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "兰亭", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "九壤", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "禹梦", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "长天", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "舞步", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "封川", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "沐云飞", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "水云寒", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "微草", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "玫瑰", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "重天", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "暮归", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "锦夜游", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "踏月", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "雪月", type: "其他", alias: ["49套", "工作服"], regs: [], tier: 0 },
  { name: "打歌服", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "寒梅", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "望云", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "中宵", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "牵云", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "兰若", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "月寒", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "飒西风", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "明镜高悬", type: "其他", alias: ["明镜"], regs: [], tier: 0 },
  { name: "鸢露", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "侠影", type: "其他", alias: [], regs: [], tier: 0 },
  { name: "黑盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "蓝盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "红盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "青盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "糖盒", type: "礼盒", alias: ["唐盒"], regs: [], tier: 0 },
  { name: "白盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "喵盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "刀盒", type: "礼盒", alias: ["貂盒", "霸刀盒"], regs: [], tier: 0 },
  { name: "粉盒", type: "礼盒", alias: ["七秀盒"], regs: [], tier: 0 },
  { name: "花盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "鸡盒", type: "礼盒", alias: ["藏剑盒"], regs: [], tier: 0 },
  { name: "秃盒", type: "礼盒", alias: ["少林盒"], regs: [], tier: 0 },
  { name: "伞盒", type: "礼盒", alias: ["蓬莱盒"], regs: [], tier: 0 },
  { name: "猪盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "毒盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "歌盒", type: "礼盒", alias: ["咕盒", "琴盒"], regs: [], tier: 0 },
  { name: "狗盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "猫盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "一代七夕", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "二代七夕", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "三代七夕", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "四代七夕", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "一代重阳", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "二代重阳", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "一代元宵", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "二代元宵", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "一代花朝", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "二代花朝", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "蓝中秋", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "粉中秋", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "绿中秋", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "腿盒", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "黑端午", type: "礼盒", alias: ["端午黑盒"], regs: [], tier: 0 },
  { name: "白端午", type: "礼盒", alias: ["端午白盒"], regs: [], tier: 0 },
  { name: "狄仁杰", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "丝路", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "棉袄", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "王熙凤", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "泠月兰芳", type: "礼盒", alias: ["泠月"], regs: [], tier: 0 },
  { name: "踏云盒子", type: "礼盒", alias: ["踏云"], regs: [], tier: 0 },
  { name: "飞天盒子", type: "礼盒", alias: ["飞天"], regs: [], tier: 0 },
  { name: "小白龙", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "四代粉中秋", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "四代蓝中秋", type: "礼盒", alias: [], regs: [], tier: 0 },
  { name: "一代黑", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "一代白", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "一代紫", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "一代黄", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "一代红", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "一代粉", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代黑", type: "披风", alias: ['栽火莲'], regs: [], tier: 0 },
  { name: "二代蓝", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代红", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代白", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代紫", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代粉", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "画卷", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "金鱼", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "狼头", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "六翼", type: "披风", alias: ['6e'], regs: [], tier: 0 },
  { name: "周公御龙", type: "披风", alias: ['周年龙'], regs: [], tier: 0 },
  { name: "特效粉", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "情人枕", type: "披风", alias: ['情r枕', 'qr枕'], regs: [], tier: 0 },
  { name: "羽毛", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "星空", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "阵营披风", type: "披风", alias: ['阵营红', '阵营蓝'], regs: [], tier: 0 },
  { name: "松鹤如谦", type: "披风", alias: ['狄仁杰黑披风', '黑狄仁杰'], regs: [], tier: 0 },
  { name: "玉棠云盏", type: "披风", alias: ['狄仁杰白披风', '白狄仁杰', '鸡翅膀'], regs: [], tier: 0 },
  { name: "黑笋干", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "蓝扇子", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "黑白荷花", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "二代狐狸毛", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "狐狸毛", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "孔雀", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "天辉", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "白莲花", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "喵萝干", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "毒萝干", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "双十一", type: "披风", alias: [], regs: [], tier: 0 },
  { name: "玄晶包出", type: "杂项", alias: ["大铁包出"], regs: [], tier: 0 },
  { name: "100cw", type: "杂项", alias: [], regs: ["(100[^橙^玄^c^】]{0,4}(橙武|cw|玄晶))(?!包出)|(100[^大^】]{0,4}(大铁))(?!包出)|(归[虚|墟]玄晶)(?!包出)"], tier: 0 },
  { name: "双100cw", type: "杂项", alias: ["100双cw"], regs: [], tier: 0 },
  { name: "焰归", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "珠盏", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "夜话", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "黑龙", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "劲足赤兔", type: "杂项", alias: [], regs: ["(赤兔(骤风|怒风|飞鸿|飞虹|衍羽|道轻))"], tier: 0 },
  { name: "普通赤兔", type: "杂项", alias: ["赤兔"], regs: [], tier: 0 },
  { name: "脚气马", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "踏炎不羁", type: "杂项", alias: ["劲足踏炎"], regs: [], tier: 0 },
  { name: "里飞沙", type: "杂项", alias: ["踏秋"], regs: [], tier: 0 },
  { name: "开明参虎", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "黑马盒子", type: "杂项", alias: ["黑马盒"], regs: [], tier: 0 },
  { name: "二内", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "三内", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "银月金虹", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "狼车", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "月伴晨星", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "星河清梦", type: "杂项", alias: ["土豪船", "黄金船"], regs: [], tier: 0 },
  { name: "九天逍遥散", type: "杂项", alias: ["九天逍遥"], regs: [], tier: 0 },
  { name: "大雕", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "滚滚", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "团团", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "闹闹", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "鹦鹉", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "橘猫", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "可重置", type: "杂项", alias: [], regs: [], tier: 0 },
  { name: "阴阳两界", type: "奇遇", alias: ["霸红尘"], regs: [], tier: 0 },
  { name: "三山四海", type: "奇遇", alias: ["举高高"], regs: ["(三山四海(?!前置))|(三山(?!前置))"], tier: 0 },
  { name: "三尺青锋", type: "奇遇", alias: ["三尺"], regs: [], tier: 0 },
  { name: "塞外宝驹", type: "奇遇", alias: ["雷首飞电"], regs: [], tier: 0 },
  { name: "济苍生", type: "奇遇", alias: [], regs: [], tier: 0 },
  { name: "惜往日", type: "奇遇", alias: ["摸头杀"], regs: [], tier: 0 },
  { name: "黑白路", type: "奇遇", alias: ["大宝剑"], regs: [], tier: 0 },
  { name: "红发", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "金发", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "白发", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "黑发", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "五限", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "限量", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "披风", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "脚印", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "五甲", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "一代披风", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "资历", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "十万资历", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "奇遇", type: "统计", alias: [], regs: [], tier: 1 },
  { name: "绝世奇遇", type: "统计", alias: [], regs: [], tier: 1 },
]

keywords.forEach((d, i) => {
  d.index = i
  let regarr = d.regs.concat(d.alias)
  if (d.regs.length == 0) regarr.push(d.name)
  d.reg = new RegExp(regarr.join('|'), 'g')
})

const Kmap = {}
const K = (x) => Kmap[x]
keywords.forEach((d, i) => {
  Kmap[d.name] = i
  d.alias.forEach(e => Kmap[e] = i)
})

const Tmap = {}
keywords.forEach((d) => {
  if (!Tmap[d.type]) Tmap[d.type] = []
  if (d.tier == 0) Tmap[d.type].push(d.index)
})
const T = (x) => Tmap[x] || []

const try_match = (s, x, keys, reg, i = 0) => {
  if (s[i].match(reg)) {
    for (let k of keys) x[k] = 1
    s[0] = s[0].replace(reg, '$')
    return true
  }
  return false
}

const bodys = [
  { name: "萝莉", value: 'bool', type: "体型", keyword: [/萝莉/, /(咩|秀|花|琴|鸽|歌|喵|军|盾|毒|伞|鸡|炮|丐|刀|盾|苍|雪)萝(?!干)/] },
  { name: "成女", value: 'bool', type: "体型", keyword: [/成女/, /道姑/, /(伞|丐|炮|秀|刀|花|毒|琴|喵|苍|盾)姐/, /(军|琴|伞|雪|盾|苍|刀)娘/, /二小姐/] },
  { name: "成男", value: 'bool', type: "体型", keyword: [/成男/, /道长/, /(花|毒|琴|伞|丐|刀|炮|喵)哥/, /(军|刀|雪)爷/, /(苍|琴|伞|刀|雪)爹/, /二少/, /(?<!小)和尚/, /大师(?!赛)/] },
  { name: "正太", value: 'bool', type: "体型", keyword: [/(正|咩|花|秀|毒|呱|琴|喵|狗|雪|盾|伞|炮|策|刀|军|苍|秃|丐|鸡|歌)太/, /小灯泡/, /小和尚/] },
]

const schools = ['五毒', '七秀', '万花', '长歌', '天策', '藏剑', '少林', '丐帮', '苍云', '纯阳', '明教', '唐门', '霸刀', '蓬莱', '凌雪阁']

keywords = keywords.concat(schools.map((d) => ({
  name: d, type: '门派', alias: [], regs: [], tier: 1,
})))

const school_keyword = [
  { name: '五毒', keywords: [/五毒(成女|成男|萝莉|正太)/, /毒(萝|姐|哥|太)/, /呱太/] },
  { name: '七秀', keywords: [/七秀(成女|成男|萝莉|正太)/, /秀(萝|太|姐)/] },
  { name: '万花', keywords: [/万花(成女|成男|萝莉|正太)/, /花(萝|姐|哥|太)/] },
  { name: '长歌', keywords: [/长歌(成女|成男|萝莉|正太)/, /琴(萝|姐|爹|太|娘)/, /(鸽|歌)萝/] },
  { name: '天策', keywords: [/天策(成女|成男|萝莉|正太)/, /军(萝|娘|爷|太)/, /(狗|策)太/] },
  { name: '藏剑', keywords: [/藏剑(成女|成男|萝莉|正太)/, /鸡(萝|太)/, /二小姐/, /鸡萝/, /二少/] },
  { name: '少林', keywords: [/少林(成女|成男|萝莉|正太)/, /大师/, /秃太/, /小(和尚|灯泡)/, /和尚/] },
  { name: '丐帮', keywords: [/丐帮(成女|成男|萝莉|正太)/, /丐(萝|姐|哥|太)/] },
  { name: '苍云', keywords: [/苍云(成女|成男|萝莉|正太)/, /盾(萝|娘|姐|太)/, /苍(爹|娘|萝|太)/] },
  { name: '纯阳', keywords: [/纯阳(成女|成男|萝莉|正太)/, /咩(萝|太)/, /道(姑|长)/] },
  { name: '明教', keywords: [/明教(成女|成男|萝莉|正太)/, /喵(萝|姐|哥|太)/] },
  { name: '唐门', keywords: [/唐门(成女|成男|萝莉|正太)/, /炮(萝|姐|哥|太)/] },
  { name: '霸刀', keywords: [/霸刀(成女|成男|萝莉|正太)/, /刀(萝|娘|姐|哥|太|爷|爹)/] },
  { name: '蓬莱', keywords: [/蓬莱(成女|成男|萝莉|正太)/, /伞(萝|娘|姐|爹|太)/] },
  { name: '凌雪阁', keywords: [/凌雪(成女|成男|萝莉|正太)/, /雪(萝|爹|娘|太)/, /(大|女)侠/] },
]

const golden_hair = ["一代金", "猴金", "狐金", "苏金", "蝶金", "喵金", "考金", "鸡金", "国金", "倒闭金", "狗金", "破晓金", "中秋金", "玫瑰金", "猪金", "丝路金", "珊瑚金", "月兔金", "马尾金"].map(d => K(d))
const red_hair = ['四红', '五红', '六红', '羊红', '猴红', '七红', '鸡红', '八红', '狗红', '九红', '猪红', '十红'].map(d => K(d))
const clothes = ['绿中秋', '腿盒', '黑端午', '白端午', '狄仁杰', '丝路', '棉袄', '王熙凤', '泠月兰芳', '踏云盒子', '飞天盒子', '小白龙', '金陵', '金螺母', '富婆套', '望月', '兰亭', '九壤', '禹梦', '长天', '舞步', '封川', '沐云飞', '水云寒', '微草', '玫瑰', '重天', '暮归', '锦夜游', '踏月', '雪月', '打歌服', '寒梅', '望云', '中宵', '牵云', '兰若', '月寒', '飒西风', '明镜高悬']
const number_map = { '一': '1', '二': '2', '三': '3', '四': '4', '五': '5', '六': '6', '七': '7', '八': '8', '九': '9', '万': 'w' }
const clothes2 = ['黑盒', '蓝盒', '红盒', '青盒', '糖盒', '白盒', '喵盒', '刀盒', '粉盒', '花盒', '鸡盒', '秃盒', '伞盒', '猪盒', '毒盒', '歌盒', '狗盒', '猫盒']

const rules = [
  (s, x) => {
    s[0] = s[0].toLocaleLowerCase()
      .replace(/\s/g, '')
      .replace(/(-|)/g, '')
      .replace(/se/g, '色')
      .replace(/jio/g, '脚')
      .replace(/·/g, '')
      .replace(/叽/g, '鸡')
      .replace(/二代.狐狸毛披风/, '二代狐狸毛')
    return 1
  },
  (s, x) => {
    const m = s[0].match(/[一|二|三|四|五|六|七|八|九]万[一|二|三|四|五|六|七|八|九]?/g) || []
    for (let s0 of m) {
      s1 = s0.split('').map(d => number_map[d]).join('')
      s[0] = s[0].replace(s0, s1)
    }
    return 1
  },
  (s, x) => {
    if (s[0].match(/(复刻|下架)/) != null) {
      let index = s[0].match(/(复刻|下架)/).index
      s[1] = s[0].slice(0, index)
    } else {
      s[1] = s[0]
    }
    return 1
  },
  (s, x) => {
    if (!try_match(s, x, golden_hair, /(金发?全|全金发?)/)) {
      try_match(s, x, ['一代金', '狐金', '猴金'].map(d => K(d)), /三巨头/)
      let m = s[0].match(/(一代|猴|狐|苏|蝶|喵|高考|考|鸡|国庆|国|倒闭|飒|狗|破晓|龙女|端午|中秋|壶|玫瑰|猪|丝路|珊瑚|兔|月兔|马尾)+金/g) || []
      for (let s1 of m) {
        m2 = s1.match(/(一代|猴|狐|苏|蝶|喵|高考|考|鸡|国庆|国|倒闭|飒|狗|破晓|龙女|端午|中秋|壶|玫瑰|猪|丝路|珊瑚|兔|月兔|马尾)/g) || []
        for (let s2 of m2) {
          x[K(s2 + '金')] = 1
        }
      }
      if (m.length) {
        s[0] = s[0].replace(/(一代|猴|狐|苏|蝶|喵|高考|考|鸡|国庆|国|飒|倒闭|狗|破晓|龙女|端午|中秋|壶|玫瑰|猪|丝路|珊瑚|兔|月兔|马尾)+金/g, '$')
      }
    }
    return 1
  },
  (s, x) => {
    if (!try_match(s, x, red_hair, /(红发?全|全红发?)/)) {
      let m = s[0].match(/(四|五|六|羊|猴|七|鸡|八|狗|九|猪|十)+红/g) || []
      for (let s1 of m) {
        m2 = s1.match(/(四|五|六|羊|猴|七|鸡|八|狗|九|猪|十)/g) || []
        for (let s2 of m2) {
          x[K(s2 + '红')] = 1
        }
      }
      if (m.length) {
        s[0] = s[0].replace(/(四|五|六|羊|猴|七|鸡|八|狗|九|猪|十)+红/g, '$')
      }
    }
    return 1
  },
  (s, x) => {
    try_match(s, x, [K('粉白菜'), K('紫白菜')], /(粉紫白菜|双色?白菜)/, 1) ||
      try_match(s, x, [K('粉白菜')], /粉白菜/, 1) +
      try_match(s, x, [K('紫白菜')], /紫白菜/, 1)

    try_match(s, x, [K('黑金夜斩白'), K('白金夜斩白')], /双色?夜斩白/, 1) ||
      try_match(s, x, [K('黑金夜斩白')], /黑金夜斩白/, 1) +
      try_match(s, x, [K('白金夜斩白')], /白金夜斩白/, 1)

    try_match(s, x, [K('情阅')], /情阅/, 1)
    try_match(s, x, [K('谷雨')], /谷雨/, 1)

    try_match(s, x, [K('白螺母'), K('蓝螺母')], /双色?螺母/, 1) ||
      try_match(s, x, [K('白螺母')], /白螺母/, 1) +
      try_match(s, x, [K('蓝螺母')], /蓝螺母/, 1)

    try_match(s, x, [K('橙繁'), K('粉繁')], /双色?繁/, 1) ||
      try_match(s, x, [K('橙繁')], /橙繁/, 1) +
      try_match(s, x, [K('粉繁')], /粉繁/, 1)

    try_match(s, x, [K('阳春海'), K('阳春冰')], /双色?阳春/, 1) ||
      try_match(s, x, [K('阳春海')], /阳春海/, 1) +
      try_match(s, x, [K('阳春冰')], /阳春冰/, 1)

    try_match(s, x, [K('红彩云'), K('蓝彩云')], /双色?彩云/, 1) ||
      try_match(s, x, [K('红彩云')], /红彩云/, 1) +
      try_match(s, x, [K('蓝彩云')], /蓝彩云/, 1)

    try_match(s, x, [K('红风露'), K('蓝风露')], /双色?风露/, 1) ||
      try_match(s, x, [K('红风露')], /红风露/, 1) +
      try_match(s, x, [K('蓝风露')], /蓝风露/, 1)

    try_match(s, x, [K('红墨韵'), K('黑墨韵')], /双色?墨韵/, 1) ||
      try_match(s, x, [K('红墨韵')], /红墨韵/, 1) +
      try_match(s, x, [K('黑墨韵')], /(黑|蓝)墨韵/, 1)

    try_match(s, x, [K('红玉蟒'), K('黑玉蟒')], /双色?玉蟒/, 1) ||
      try_match(s, x, [K('红玉蟒')], /(红玉蟒|玉蟒珥)/, 1) +
      try_match(s, x, [K('黑玉蟒')], /(黑玉蟒|玉蟒鲜)/, 1)

    try_match(s, x, [K('红捕风'), K('黑捕风')], /双色?捕风/, 1) ||
      try_match(s, x, [K('红捕风')], /红捕风/, 1) +
      try_match(s, x, [K('黑捕风')], /(黑|紫)捕风/, 1)

    try_match(s, x, [K('红紧那'), K('紫紧那')], /双色?紧那/, 1) ||
      try_match(s, x, [K('红紧那')], /(红紧那|紧那波吟)/, 1) +
      try_match(s, x, [K('紫紧那')], /(黑|紫)紧那/, 1)

    try_match(s, x, [K('紫火舞'), K('白火舞')], /双色?火舞/, 1) ||
      try_match(s, x, [K('紫火舞')], /(紫火舞|火舞杏甜)/, 1) +
      try_match(s, x, [K('白火舞')], /(白火舞|火舞未翔)/, 1)

    try_match(s, x, [K('蓝花开'), K('黄花开')], /双色?花开/, 1) ||
      try_match(s, x, [K('蓝花开')], /(蓝花开|花开秋菊)/, 1) +
      try_match(s, x, [K('黄花开')], /(黄花开|花开春松)/, 1)

    try_match(s, x, [K('策马若如'), K('策马河洲')], /双色?策马/, 1) ||
      try_match(s, x, [K('策马若如')], /(策马若如|红策马)/, 1) +
      try_match(s, x, [K('策马河洲')], /策马河洲/, 1)

    try_match(s, x, [K('黑风华'), K('紫风华')], /双色?风华/, 1) ||
      try_match(s, x, [K('黑风华')], /(黑风华|风华时难)/, 1) +
      try_match(s, x, [K('紫风华')], /(紫风华|风华谁懂)/, 1)
    return 1
  },
  (s, x) => {
    m = s[0].match(/(\d)+五限/)
    if (m) {
      x[K('五限')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+五限/, '$')
    } else {
      x[K('五限')] = T('五限').map(d => x[d]).reduce((a, b) => a + b)
    }
    return 1
  },
  (s, x) => {
    try_match(s, x, [K('蓝不欺'), K('绿不欺')], /(((绿|蓝){2}不(欺|期))|双色?不(欺|期))/) ||
      try_match(s, x, [K('绿不欺')], /绿不(欺|期)/) +
      try_match(s, x, [K('蓝不欺')], /蓝不(欺|期)/)

    try_match(s, x, [K('蓝九曲'), K('红九曲')], /(((绿|红){2}九曲)|双色?九曲)/) ||
      try_match(s, x, [K('红九曲')], /红九曲/) +
      try_match(s, x, [K('蓝九曲')], /蓝九曲/)

    try_match(s, x, [K('蓝公主'), K('粉公主')], /((粉|蓝){2}公主)|(双色?公主)/) ||
      try_match(s, x, [K('粉公主')], /粉公主/) +
      try_match(s, x, [K('蓝公主')], /蓝公主/)

    try_match(s, x, [K('蓝人面'), K('粉人面')], /((粉|蓝){2}人面)|(双色?人面)/) ||
      try_match(s, x, [K('粉人面')], /粉人面/) +
      try_match(s, x, [K('蓝人面')], /蓝人面/)

    if (!try_match(s, x, [K('白无色'), K('蓝无色'), K('粉无色'), K('红无色')], /(((白|蓝|粉|红){4}无色)|四色?无色)舞?/)) {
      let m = s[0].match(/(白|蓝|粉|红)+无色/g) || []
      for (let s1 of m) {
        m2 = s1.match(/(白|蓝|粉|红)/g) || []
        for (let s2 of m2) {
          x[K(s2 + '无色')] = 1
        }
      }
      if (m.length) {
        s[0] = s[0].replace(/(白|蓝|粉|红)+无色/g, '$')
      }
    }
    
    if (!try_match(s, x, [K('黑年轮'), K('蓝年轮'), K('红年轮'), K('黄年轮')], /(((黑|蓝|红|黄){4}年轮)|四色?年轮)/)) {
      let m = s[0].match(/(黑|蓝|红|黄)+年轮/g) || []
      for (let s1 of m) {
        m2 = s1.match(/(黑|蓝|红|黄)/g) || []
        for (let s2 of m2) {
          x[K(s2 + '年轮')] = 1
        }
      }
      if (m.length) {
        s[0] = s[0].replace(/(黑|蓝|红|黄)+年轮/g, '$')
      }
    }

    if (!try_match(s, x, [K('白娃娃'), K('蓝娃娃'), K('粉娃娃'), K('黄娃娃')], /(((白|蓝|粉|黄){4}娃娃)|四色?娃娃)菜?/)) {
      let m = s[0].match(/(白|蓝|粉|黄)+娃娃菜?/g) || []
      for (let s1 of m) {
        m2 = s1.match(/(白|蓝|粉|黄)/g) || []
        for (let s2 of m2) {
          x[K(s2 + '娃娃')] = 1
        }
      }
      if (m.length) {
        s[0] = s[0].replace(/(白|蓝|粉|黄)+娃娃菜?/g, '$')
      }
    }

    return 1
  },
  (s, x) => {
    let p1 = K('粉中秋'), b1 = K('蓝中秋'), p4 = K('四代粉中秋'), b4 = K('四代蓝中秋')
    try_match(s, x, [p1, b1, p4, b4], /一四代?(粉蓝|蓝粉)中秋盒?/) ||
      try_match(s, x, [p1, p4], /一四代?粉中秋盒?/) +
      try_match(s, x, [b1, b4], /一四代?蓝?中秋盒?/)
    try_match(s, x, [p4, b4], /(四代|新)(粉蓝|蓝粉)中秋盒?/) ||
      try_match(s, x, [p4], /(二代|三代|四代|新)粉中秋盒?/) +
      try_match(s, x, [b4], /(二代|三代|四代|新)蓝中秋盒?/)
    try_match(s, x, [p1, b1], /(一代|老)(粉蓝|蓝粉)中秋盒?/) ||
      try_match(s, x, [p1], /(一代|老)粉中秋盒?/) +
      try_match(s, x, [b1], /(一代|老)蓝中秋盒?/)
    return 1
  },
  (s, x) => {
    if (s[0].match(/520/)) {
      try_match(s, x, [K('猫盒子')], /粉520/)
      try_match(s, x, [K('狗盒子')], /白520/)
      try_match(s, x, [K('猫盒子')], /520粉/)
      try_match(s, x, [K('狗盒子')], /520白/)
    }
    return 1
  },
  (s, x) => {
    let m = s[0].match(/(一代|一|二代|二|三代|三|四代|四|老|新)+(七夕|元宵|重阳|花朝)(盒子|盒|衣)?/g) || []
    for (let s1 of m) {
      let cloth = s1.slice(-2)
      m2 = s1.match(/(一代|一|二代|二|三代|三|四代|四|老|新)/g) || []
      for (let s2 of m2) {
        if (s2.length == 1) {
          if (s2 == '老') {
            s2 = '一'
          } else if (s2 == '新') {
            s2 = '二'
          }
          s2 += '代'
        }
        s2 += cloth
        if (K(s2) != null) x[K(s2)] = 1
      }
    }
    if (m.length) {
      s[0] = s[0].replace(/(一代|一|二代|二|三代|三|四代|四|老|新)+(七夕|元宵|重阳|花朝)(盒子|盒|衣)?/g, '$')
    }
    return 1
  },
  (s, x) => {
    let m = s[0].match(/(一代|老)?.花朝(盒子|盒|衣)?/)
    if (m) {
      x[K('一代花朝')] += m.length
      s[0] = s[0].replace(/(一代|老)?.花朝(盒子|盒|衣)?/g, '$')
    }
    return 1
  },
  (s, x) => {
    let m
    m = s[0].match(/(\d)+白发?/)
    if (m) {
      x[K('白发')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+白发?/, '$')
    }
    m = s[0].match(/(\d)+黑发?/)
    if (m) {
      x[K('黑发')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+黑发?/, '$')
    }
    m = s[0].match(/(\d)+红发?/)
    if (m && parseInt(m[0]) < 20) {
      x[K('红发')] = parseInt(m[0]) 
      s[0] = s[0].replace(/(\d)+红发?/, '$')
    } else {
      x[K('红发')] = red_hair.map(d => x[d]).reduce((a, b) => a + b)
    }
    m = s[0].match(/(\d)+金发?/)
    if (m) {
      x[K('金发')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+金发?/, '$')
    } else {
      x[K('金发')] = golden_hair.map(d => x[d]).reduce((a, b) => a + b)
    }
    return 1
  },
  (s, x) => {
    let a = T('披风')
    for (let i of a) {
      let m = s[0].match(keywords[i].reg)
      if (m) {
        x[i] = m.length
        s[0] = s[0].replace(keywords[i].reg, '$')
      }
    }
    try_match(s, x, [K('一代黑'), K('一代白'), K('一代紫'), K('一代黄'), K('一代红'), K('一代粉')], /一代披风全/)
    return 1
  },
  (s, x) => {
    for (let k of clothes) {
      let i = K(k)
      let m = s[0].match(keywords[i].reg)
      if (m) {
        x[i] = m.length
        s[0] = s[0].replace(keywords[i].reg, '$')
      }
    }
    return 1
  },
  (s, x) => {
    for (let k of clothes2) {
      let i = K(k)
      let m = s[0].match(keywords[i].reg)
      if (m) {
        x[i] = m.length
        s[0] = s[0].replace(keywords[i].reg, '$')
      }
    }
    if (x[K('劲足赤兔')] == 1) {
      x[K('普通赤兔')] = 0
    }
    return 1
  },
  (s, x) => {
    let a = T('杂项')
    for (let i of a) {
      let m = s[0].match(keywords[i].reg)
      if (m) {
        x[i] = 1
        s[0] = s[0].replace(keywords[i].reg, '$')
      }
    }
    return 1
  },
  (s, x) => {
    let a = T('奇遇')
    for (let i of a) {
      let m = s[0].match(keywords[i].reg)
      if (m) {
        x[i] = m.length
        s[0] = s[0].replace(keywords[i].reg, '$')
      }
    }
    return 1
  },
  (s, x) => {
    s[2] = (s[0].match(/【[^】]+】/g) || []).join('')
    let body = null, school = null
    for (let y of bodys) {
      for (let k of y.keyword) {
        if (!body && s[2].match(k) != null) {
          body = y.name
          break
        }
      }
    }
    for (let y of school_keyword) {
      for (let k of y.keywords) {
        if (!school && s[2].match(k) != null) {
          school = y.name
          break
        }
      }
    }

    let text = s[0].slice(0, 50) + '$' + s[0].slice(-50)
    if (!body) {
      for (let y of bodys) {
        for (let k of y.keyword) {
          if (!body && text.match(k) != null) {
            body = y.name
            break
          }
        }
      }
    }
    if (!school) {
      for (let x of school_keyword) {
        for (let k of x.keywords) {
          if (!school && text.match(k) != null) {
            school = x.name
            break
          }
        }
      }
    }
    if (school) {
      s['school'] = school
      x[x.length - schools.length + schools.indexOf(school)] = 1
    }
    if (body) {
      s['body'] = body
    }
    return !!(school && body)
  },
  (s, x) => {
    let m
    m = s[0].match(/(\d)+限/)
    if (m) {
      x[K('限量')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+限量?/, '$')
    } else {
      x[K('限量')] =
        (T('五限').map(d => x[d]).reduce((a, b) => a + b) +
        T('六限').map(d => x[d]).reduce((a, b) => a + b) + 
        T('其他').map(d => x[d]).reduce((a, b) => a + b) +
        T('礼盒').map(d => x[d]).reduce((a, b) => a + b))
    }

    m = s[0].match(/(\d)+披/)
    if (m) {
      x[K('披风')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+披风?/, '$')
    } else {
      x[K('披风')] =
        (T('披风').map(d => x[d]).reduce((a, b) => a + b) +
        T('礼盒').map(d => x[d]).reduce((a, b) => a + b))
    }

    m = s[0].match(/(\d)*脚印/)
    if (m) {
      x[K('脚印')] = parseInt(m[0]) || 1
      s[0] = s[0].replace(/(\d)*脚印/, '$') 
    }

    m = s[0].match(/(\d)+五甲/)
    if (m) {
      x[K('五甲')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+五甲/, '$') 
    }

    m = s[0].match(/(\d)+奇遇/)
    if (m) {
      x[K('奇遇')] = parseInt(m[0])
      s[0] = s[0].replace(/(\d)+奇遇/, '$') 
    } else {
      x[K('奇遇')] = T('奇遇').map(d => x[d]).reduce((a, b) => a + b)
    }
    let d = x[K('奇遇')]
    
    if (d <= 30) {
      d = .5
    } else if (d <= 40) {
      d = 1.5
    } else if (d <= 50) {
      d = 2.5
    } else if (d <= 55) {
      d = 15
    } else {
      d = 30
    }
    x[K('奇遇')] = d
    x[K('绝世奇遇')] = x[K('阴阳两界')] + x[K('三山四海')] + x[K('三尺青锋')] + x[K('塞外宝驹')] + x[K('济苍生')]
    x[K('一代披风')] = x[K('一代黑')] + x[K('一代白')] + x[K('一代紫')] + x[K('一代黄')] + x[K('一代红')] + x[K('一代粉')]
    return 1
  },
  (s, x) => {
    let m = s[0].match(/【[^\d^y]*(\d|w|k|q|\.)+[^\d]*】/g) || []
    let price = -1
    let str = m.join(',').replace(/资历(\d|w|k)+/, '')
    m = str.match(/(\d|q|w|k|\.)+/g)
    if (m) {
      for (let i = 0; i < m.length; ++i) if (m[i] != 'w' && m[i] != 'k' && m[i] != 'q') {
        price = parseNum(m[i])
        break
      }
    }
    if (price == -1) {
      m = s[0].match(/([咩|花|秀|毒|呱|琴|喵|狗|雪|盾|伞|炮|策|刀|军|苍|秃|丐|鸡|歌][爹|娘|萝|太|爷|姐|哥]|道长|道姑|二少|二小姐|成男|成女|萝莉|正太)[^\d]{0,3}([\d|w|k|q|\.]+)/)
      if (m && m[2] && m[2].length > 1) {
        price = parseNum(m[2]) || 0
      }
    }
    if (price <= 0 || price == NaN) {
      return 0
    }
    s['price'] = price

    m = s[0].match(/((\d)+(\.\d|w\d?))资历|(资历(\d|w)+[^\d^w])/g)
    if (m) {
      m = m[0].match(/(\d|w)+/)
      let t = parseNum(m && m[0] || 10000) / 10000
      x[K('资历')] = t
    } else {
      x[K('资历')] = 1
    }
    
    x[K('十万资历')] = x[K('资历')] >= 10 ? 1 : 0
    let d = x[K('资历')]
    if (d <= 4) {
      d = 0
    } else if (d <= 6) {
      d = .4
    } else if (d <= 7) {
      d = 1
    } else if (d <= 8) {
      d = 2
    } else if (d <= 9) {
      d = 4
    } else if (d <= 10) {
      d =  15
    } else {
      d =  30
    }
    x[K('资历')] = d
    return 1
  }
]

function parseNum(x) {
    if (!x) return 0
    try {
        let ret = 0
        if (x.indexOf('k') != -1) {
            x = x.split('k')
            ret += parseFloat(x[0]) * 1000
            if (x[1].length > 0) {
                let y = parseInt(x[1])
                while (y && y < 100) y *= 10
                ret += y
            }
        } else if (x.indexOf('q') != -1) {
          x = x.split('q')
          ret += parseFloat(x[0]) * 1000
          if (x[1].length > 0) {
              let y = parseInt(x[1])
              while (y && y < 100) y *= 10
              ret += y
          }
        } else if (x.indexOf('w') != -1) {
            x = x.split('w')
            ret += (parseFloat(x[0]) || 1) * 10000
            if (x[1].length > 0) {
                let y = parseInt(x[1])
                while (y && y < 1000) y *= 10
                ret += y
            }
        } else {
            ret = parseInt(x)
        }
        return ret
    } catch (e) {
        return -1
    }
}

module.exports = {
  keywords,
  rules,
  schools,
  bodys,
}