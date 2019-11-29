import axios from 'axios'
import mongoose from 'mongoose'

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

const accounts = mongoose.model('account', accountSchema)
const baseUrl = 'http://www.paopaox.com/zh.html?q=&page='

async function fetchPage(index) {
    let body = await axios.get(baseUrl + index)
    let data = body.data
    let texts = data.split('<div class="arrText">').slice(1)
    texts[texts.length - 1] = texts[texts.length - 1].split('<div class="pageNav">')[0]
    let items = []
    for (let i = 20; i < texts.length; ++i) {
        let text = texts[i]
        try {
            const url = text.match(/<div class="text1"><a href="([^"]+)/)[1]
            const content = text.match(/class="text-hide" data-length=\d+>([^<]+)/)[1]
            const price = text.match(/<div class="arrMsg">¥ ([^<]+)/)[1]
            const qq = text.match(/class="copy qq" data-text="([^"]+)/)[1]
            const name = text.match(/class="avatar">([^<]+)/)[1]
            const school = text.match(/<a href="http:\/\/www.paopaox.com\/\w+">([^<]*)/)[1]
            const time = text.match(/<i class="iconfont c3">&#xe6fb;<\/i>([^<]*)/)[1]
            items.push({ unparsed: { content, time }, url, price: +price, qq, name, school, parsed: false, timestamp: 0 })
        } catch (e) {
            console.log(text)
            continue
        }
    }
    for (let item of items) {
        const x = new accounts(item)
        await x.save()
    }
    console.log(`page ${index}, ${items.length} items have been parsed.`)
}

async function main() {
    for (let i = 717; i < 2000; ++i) {
        await fetchPage(i)
    }
}

main()
