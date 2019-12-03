import mongoose from 'mongoose'
import Keyword from './keyword'

const SchoolKeyword = Keyword.schoolKeyword

mongoose.connect('mongodb://localhost/paopao', { useNewUrlParser: true })

const accountSchema = new mongoose.Schema({
    unparsed: Object,
    info: Object,
    url: String,
    price: Number,
    qq: String,
    name: String,
    school: String,
    timestamp: Number,
    parsed: Boolean,
})
accountSchema.index('price')
accountSchema.index('url')

const infoSchema = new mongoose.Schema({
    detail: [Number],
    timestamp: Number,
    url: String,
    price: Number,
    qq: String,
    body: String,
    school: String,
    name: String,
})
infoSchema.index('price')
infoSchema.index('url')

const keywordSchema = new mongoose.Schema({
    name: String,
    type: String,
    index: Number,
})
keywordSchema.index('name')
keywordSchema.index('index')

const schoolSchema = new mongoose.Schema({
    name: String
})

const accounts = mongoose.model('account', accountSchema)
const infos = mongoose.model('info', infoSchema)
let keywordIndex = {}

async function updateKeyword() {
    const keywords = mongoose.model('keyword', keywordSchema)
    let index = await keywords.find({})
    index = index.length
    for (let i = 0; i < Keyword.keywords.length; ++i) {
        let status = await keywords.findOne({ name: Keyword.keywords[i].name })
        if (!status) {
            const entity = new keywords({
                name: Keyword.keywords[i].name,
                type: Keyword.keywords[i].type,
                index: ++index,
            })
            await entity.save()
            keywordIndex[Keyword.keywords[i].name] = index
        } else {
            keywordIndex[Keyword.keywords[i].name] = status.index
        }
    }
}

async function updateSchool() {
    const schools = mongoose.model('school', schoolSchema)
    let index = await schools.find({})
    index = index.length
    for (let i = 0; i < Keyword.schools.length; ++i) {
        let status = await schools.findOne({ name: Keyword.schools[i] })
        if (!status) {
            const entity = new schools({
                name: Keyword.schools[i],
            })
            await entity.save()
        }
    }
}

async function removeDuplicatedItems() {
    let items = await accounts.find({ parsed: false })
    let urlSet = new Set()
    let nRemove = 0
    for (let item of items) {
        if (urlSet.has(item.url)) {
            await accounts.remove({ _id : item._id })
            ++nRemove
        } else {
            urlSet.add(item.url)
        }
    }
    console.log(`${nRemove} duplicated items have been removed.`)
}

function parsePrice(x) {
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

async function parseAll() {
    let items = await accounts.find()
    let counter = 0
    let newItemSet = new Set()
    let nDuplicate = 0

    for (let item of items) {
        let text = item.unparsed.content.toLocaleLowerCase().replace(/\s/g, '')
        for (let r of Keyword.preReplace) {
            text.replace(r[0], r[1])
        }
        let text_fixed = text
        let detail = []
        let body = null
        let school = null
        let hash = 0

        let price_reg = /【[^\d^y]*(\d|w|k)+[^\d]*】/
        let match = text.match(price_reg)
        if (!match) continue
        match = match[0].match(/(\d|w|k)+/)
        if (!match) continue
        let price = parsePrice(match[0])
        if (price == -1 || !price) {
            continue
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
                    const start = Keyword.findKeywordIndex(x.condition.from)
                    const end = Keyword.findKeywordIndex(x.condition.to)
                    for (let i = start; i <= end; ++i) {
                        t += detail[i]
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
                        let next = match[0].match(/\d+/)
                        if (next && next[0]) {
                            t = parseInt(next[0])
                        } else {
                            t = 1
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

        match = text.match(/【[^】]+】/g)
        if (match) {
            match = [...match]
            for (let x of match) {
                for (let y of Keyword.bodys) {
                    for (let k of y.keyword) {
                        if (!body && x.match(k) != null) {
                            body = y.name
                        }
                    }
                }
            }
            for (let x of match) {
                for (let y of SchoolKeyword) {
                    for (let k of y.keywords) {
                        if (!school && x.match(k) != null) {
                            school = y.name
                        }
                    }
                }
            }
        }
        if (!body) {
            for (let y of Keyword.bodys) {
                for (let k of y.keyword) {
                    if (!body && text.match(k) != null) {
                        body = y.name
                    }
                }
            }
        }
        if (!school) {
            let text_head_tail = text.slice(0, 50) + '$' + text.slice(-50)
            for (let x of SchoolKeyword) {
                for (let k of x.keywords) {
                    if (!school && text_head_tail.match(k) != null) {
                        school = x.name
                        break
                    }
                }
            }
        }

        if (!body) {
            console.log(text)
            continue
        }
        if (!school) {
            console.log(text)
            continue
        }

        for (let i = 0; i < detail.length; ++i) if (detail[i]) {
            hash = (hash * 131 + i) % 133333333
        }
        
        let time = item.unparsed.time

        if (time == 'parsed') {
            time = item.timestamp
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
                continue
            }
        }

        hash = hash + school + body
        if (newItemSet.has(hash)) {
            nDuplicate++
            continue
        }
        newItemSet.add(hash)

        const info = {
            detail,
            timestamp : time,
            url: item.url,
            price: price,
            qq: item.qq,
            name: item.name,
            school: school,
            body: body,
        }

        if (++counter % 1000 == 0) {
            console.log(`${counter} items have been parsed.`)
        }
        const entity = new infos(info)
        await entity.save()
    }
    console.log(`${nDuplicate} duplicate items have been ignored.`)
}

async function main() {
    await updateKeyword()
    await updateSchool()
    await removeDuplicatedItems()
    await parseAll()
}

main()
