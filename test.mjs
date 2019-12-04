import Keyword from './keyword'
import NewKeyword from './newkeyword'
import items from './testitems'

function parseNum(x) {
    if (!x) return 0
    try {
        let ret = 0
        if (x.indexOf('k') != -1) {
            x = x.split('k')
            ret += parseInt(x[0]) * 1000
            if (x[1].length > 0) {
                let y = parseInt(x[1])
                while (y && y < 100) y *= 10
                ret += y
            }
        } else if (x.indexOf('w') != -1) {
            x = x.split('w')
            ret += (parseInt(x[0]) || 1) * 10000
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

function zeros(n) {
    let x = []
    for (let i = 0; i < n; ++i) x.push(0)
    return x
}

async function parseAll() {
    let counter = 0
    let newItemSet = new Set()
    let newItemDetail = {}
    let nDuplicate = 0

    async function parse(text) {
        let s = {}
        s[0] = text
        let x = zeros(NewKeyword.keywords.length)
        for (let i = 0; i < NewKeyword.rules.length; ++i) {
            if (!NewKeyword.rules[i](s, x)) return
        }
        let str = ''
        for (let i = 0; i < x.length; ++i) if (x[i] > 0.5) {
            str = str + '  ' + NewKeyword.keywords[i].name + ' ' + x[i]
        }

        console.log(s[0])
        console.log(s.school, s.body, s.price, str)
        return

        let text_fixed = text
        let detail = []
        let body = null
        let school = null
        let hash = 0

        let price_reg = /【[^\d^y]*(\d|w|k)+[^\d]*】/g
        let match = text.match(price_reg)
        let price = -1
        if (!match) return
        for (let k = 0; k < match.length; ++k) {
            let str = match[k].replace(/资历(\d|w|k)+/, '')
            let m = str.match(/(\d|w|k)+/g)
            if (!m) continue
            for (let i = 0; i < m.length; ++i) if (m[i] != 'w' && m[i] != 'k') {
                price = parseNum(m[i])
                break
            }
            if (price > 0) break
        }
        if (price == -1 || !price) {
            return
        }

        if (text_fixed.match(/(复刻|下架)/) != null) {
            let index = text_fixed.match(/(复刻|下架)/).index
            text_fixed = text_fixed.slice(0, index)
        }

        for (let k = 0; k < Keyword.keywords.length; ++k) {
            let x = Keyword.keywords[k]
            let t = 0
            if (x.value == 'cond') {
                t = x.default
                for (let keyword of x.keyword) {
                    let match = text.match(keyword)
                    if (match && match[0]) {
                        let next = match[0].match(/\d+/)
                        if (next && next[0]) {
                            t = parseInt(next[0])
                        } else {
                            t = 1
                        }
                        break
                    }
                }
                if (t == x.default) {
                    if (x.condition.from) {
                        const start = Keyword.findKeywordIndex(x.condition.from)
                        const end = Keyword.findKeywordIndex(x.condition.to)
                        for (let i = start; i <= end; ++i) {
                            t += detail[i]
                        }
                    } else if (x.condition.keys) {
                        for (let key of x.condition.keys) {
                            let i = Keyword.findKeywordIndex(key)
                            t += detail[i]
                        }
                    }
                    t = x.condition.rule(t)
                }
            } else if (x.value == 'bool') {
                if (x.type == '五限') {
                    for (let keyword of x.keyword) {
                        if (text_fixed.match(keyword) != null) {
                            t = 1
                            break
                        }
                    }
                } else {
                    for (let keyword of x.keyword) {
                        if (text.match(keyword) != null) {
                            t = 1
                            break
                        }
                    }
                }
            } else if (x.value == 'number') {
                t = x.default
                for (let keyword of x.keyword) {
                    let match = text.match(keyword)
                    if (match && match[0]) {
                        if (x.name == '资历') {
                            let next = match[0].match(/(\d|w)+/)
                            t = parseNum(next && next[0] || 10000) / 10000
                        } else {
                            let next = match[0].match(/\d+/)
                            if (next && next[0]) {
                                t = parseInt(next[0])
                            } else {
                                t = 1
                            }
                        }
                        break
                    }
                }
            }
            detail.push(t)
        }
        
        for (let k in Keyword.keywordRules) {
            let index = Keyword.findKeywordIndex(k)
            detail[index] = Keyword.keywordRules[k](detail[index])
        }


        if (!body) {
            console.log(text)
            return
        }
        if (!school) {
            console.log(text)
            return
        }

        let compressed = []
        for (let i = 0; i < detail.length; ++i) if (detail[i] >= 0.5) {
            hash = (hash * 131 + i) % 133333333
            compressed.push(i)
        }
        
        let time = ''
        if (time == 'parsed') {
            time = 0
        } else {
            if (time.indexOf('分钟前')) {
                time = new Date() - parseInt(time) * 60 * 1000
            } else if (time.indexOf('小时前')) {
                time = new Date() - parseInt(time) * 3600 * 1000
            } else if (time.indexOf('天前')) {
                time = new Date() - parseInt(time) * 24 * 3600 * 1000
            } else {
                let date = text.match(/\(([^\)]+)/)
                if (date) {
                    date = new Date(`2019-${date}`)
                } else {
                    date = new Date()
                }
                time = +date
            }
    
            if (text.indexOf('---') != -1 || text.indexOf('一一一') != -1) {
                return
            }
        }

        hash = hash + school + body
        if (newItemSet.has(hash)) {
            nDuplicate++
            return
        }
        let id = school + body + parseInt(price)
        if (newItemDetail[id]) {
            for (let vec of newItemDetail[id]) {
                let i = 0, j = 0, cnt = 0
                if (Math.abs(vec.length - compressed.length) > 2) continue
                while (i < vec.length && j < compressed.length) {
                    if (vec[i] == compressed[j]) {
                        cnt++, i++, j++
                    } else if (vec[i] < compressed[j]) {
                        i++
                    } else {
                        j++
                    }
                }
                if (cnt - Math.min(vec.length, compressed.length) <= 2 && Math.max(vec.length, compressed.length) - cnt <= 2) {    
                    nDuplicate++
                    return
                }
            }
        } else {
            newItemDetail[id] = []
        }
        newItemDetail[id].push(compressed)

        newItemSet.add(hash)

        const info = {
            detail,
            timestamp : time,
            price: price,
            school: school,
            body: body,
        }

        if (++counter % 1000 == 0) {
            console.log(`${counter} items have been parsed.`)
        }
    }

    let cnt = 0
    for (let text of items) {
        await parse(text)
        if (++cnt > 100) {
            break
        }
        
    }
    console.log(`${nDuplicate} duplicate items have been ignored.`)
}

async function main() {
    await parseAll()
}

main()
