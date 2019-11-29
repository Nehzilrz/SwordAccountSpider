import mongoose from 'mongoose'
import KeywordList from './keyword'

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
    detail: Object,
    timestamp: Number,
    url: String,
    price: Number,
    qq: String,
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
const keywords = mongoose.model('keyword', keywordSchema)

async function updateKeyword() {
    let index = await keywords.find({})
    index = index.length
    for (let i = 0; i < KeywordList.length; ++i) {
        let status = await keywords.findOne({ name: KeywordList[i].name })
        if (!status) {
            const entity = new keywords({
                name: KeywordList[i].name,
                type: KeywordList[i].type,
                index: ++index,
            })
            await entity.save()
        }
    }
}

async function main() {
    await updateKeyword()
    let items = await accounts.find({ parsed: false })
    for (let item of items) {
        let text = item.unparsed.content
        let detail = {}
        for (let x of KeywordList) {
            for (let keyword of x.keyword) {
                if (text.indexOf(keyword) != -1) {
                    if (!detail[x.type]) {
                        detail[x.type] = x.name
                    } else {
                        detail[x.type] = detail[x.type] + ' ' + x.name
                    }
                    break
                }
            }
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

        const info = {
            detail,
            timestamp : time,
            url: item.url,
            price: item.price,
            qq: item.qq,
            name: item.name,
            school: item.school,
        }

        const entity = new infos(info)
        await entity.save()
    }
}

main()
