import mongoose from 'mongoose'
import Keyword from './keyword'

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

function zeros(n) {
    let x = []
    for (let i = 0; i < n; ++i) x.push(0)
    return x
}

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

async function parseAll() {
    let items = await accounts.find()
    let counter = 0
    let newItemSet = new Set()
    let newItemDetail = {}
    let nDuplicate = 0

    async function parse(text, time, item) {
        text = text.replace(/-/g, '')
        if (text.length < 10) return

        let s = {}
        s[0] = s['origin'] = text
        let x = zeros(Keyword.keywords.length)
        for (let i = 0; i < Keyword.rules.length; ++i) {
            if (!Keyword.rules[i](s, x)) {
                console.log(s[0])
                return
            }
        }

        let body = s['body']
        let school = s['school']
        let price = s['price']
        let hash = 0

        let compressed = []
        for (let i = 0; i < x.length; ++i) if (x[i] >= 0.5) {
            hash = (hash * 131 + i) % 133333333
            compressed.push(i)
        }
        
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
/*
        for (let i = 0; i < x.length; ++i) {
            if (x[i] == NaN) {
                console.log(Keyword.keywords[i].name)
            }
            console.log(x[i])
        }*/

        const info = {
            detail : [...x],
            timestamp : time,
            url: item.url,
            price,
            qq: item.qq,
            name: item.name,
            school,
            body,
        }

        if (++counter % 1000 == 0) {
            console.log(`${counter} items have been parsed.`)
        }

        try {
            const entity = new infos(info)
            await entity.save()
        } catch (e) {
            console.log(e, s['price'], s['origin'])
        }
    }

    for (let item of items) {
        let text = item.unparsed.content
        let time = item.unparsed.time
        await parse(text, time, item)
    }
    console.log(`${nDuplicate} duplicate items have been ignored.`)
}

async function updateInfo() {
    await updateKeyword()
    await updateSchool()
    await removeDuplicatedItems()
}

async function main() {
    await updateInfo()
    await parseAll()
}

main()
