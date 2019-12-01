import mongoose from 'mongoose'
import Keyword from './keyword'

const BuiltinKeyword = Keyword.keywords
const SchoolSet = new Set(Keyword.schools)
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

const accounts = mongoose.model('account', accountSchema)
const infos = mongoose.model('info', infoSchema)
let keywordIndex = {}

async function updateKeyword() {
    const keywords = mongoose.model('keyword', keywordSchema)
    let index = await keywords.find({})
    index = index.length
    for (let i = 0; i < BuiltinKeyword.length; ++i) {
        let status = await keywords.findOne({ name: BuiltinKeyword[i].name })
        if (!status) {
            const entity = new keywords({
                name: BuiltinKeyword[i].name,
                type: BuiltinKeyword[i].type,
                index: ++index,
            })
            await entity.save()
            keywordIndex[BuiltinKeyword[i].name] = index
        } else {
            keywordIndex[BuiltinKeyword[i].name] = status.index
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
    let items = await accounts.find({ parsed: false })
    let counter = 0
    let newItemSet = new Set()
    let nDuplicate = 0

    for (let item of items) {
        let text = item.unparsed.content.toLocaleLowerCase()
        let detail = []
        let body = '未知'
        let hash = 0

        for (let x of BuiltinKeyword) {
            for (let keyword of x.keyword) {
                if (text.match(keyword)) {
                    if (x.type == '体型') {
                        body = x.name
                    } 
                    detail.push(keywordIndex[x.name])
                    break
                }
            }
        }

        detail = detail.sort((a, b) => a - b)
        for (let i = 0; i < detail.length; ++i) {
            hash = (hash * 131 + detail[i]) % 133333333
        }
        
        let time = item.unparsed.time
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

        let school = item.school
        if (!SchoolSet.has(school)) {
            school = '未知'
            for (let x of SchoolKeyword) {
                for (let keyword of x.keywords) {
                    if (text.indexOf(keyword) != -1) {
                        school = x.name
                        break
                    }
                }
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
            price: item.price,
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
    await removeDuplicatedItems()
    await parseAll()
}

main()
