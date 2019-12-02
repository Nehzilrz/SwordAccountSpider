import mongoose from 'mongoose'
import Koa from 'koa'
import Router from 'koa-router'
import Compress from 'koa-compress'
import Cors from 'koa-cors'
import Keyword from './keyword'

mongoose.connect('mongodb://localhost/paopao', { useNewUrlParser: true })

const infoSchema = new mongoose.Schema({
    detail: Object,
    timestamp: Number,
    url: String,
    price: Number,
    qq: String,
    school: String,
    body: String,
    name: String,
})

const keywordSchema = new mongoose.Schema({
    name: String,
    type: String,
    index: Number,
})

const keywords = mongoose.model('keyword', keywordSchema)
const infos = mongoose.model('info', infoSchema)

const app = new Koa()
const api = new Router()

api.get('/keywords', async (ctx) => {
    const items = await keywords.find({})
    const data = items.map(d => ({ name: d.name, type: d.type, index: d.index }))
    ctx.body = data
}).get('/schools', async (ctx) => {
    const items = await keywords.find({})
    const data = items.map(d => ({ name: d.name, type: d.type, index: d.index }))
    ctx.body = data
}).get('/info', async (ctx) => {
    const start_date = ctx.request.query['start_date'] || 0
    const end_date = ctx.request.query['end_date'] || (+new Date())
    const min_price = ctx.request.query['min_price'] || 1
    const max_price = ctx.request.query['max_price'] || 999999
    const query = {
        price: { $gte: +min_price, $lte: max_price },
        timestamp: { $gte: +start_date, $lte: end_date },
    }
    if (ctx.request.query['body']) {
        query['body'] = ctx.request.query['body']
    }
    if (ctx.request.query['school']) {
        query['school'] = ctx.request.query['school']
    }
    const items = (await infos.find(query)).sort((a, b) => b.timestamp - a.timestamp).map(d => ({
        detail: d.detail,
        timestamp: d.timestamp,
        url: d.url,
        price: d.price,
        qq: d.qq,
        school: d.school,
        body: d.body,
        name: d.name,
    }))
    ctx.body = items
}).get('/export', async (ctx) => {
    const start_date = ctx.request.query['start_date'] || 0
    const end_date = ctx.request.query['end_date'] || (+new Date())
    const min_price = ctx.request.query['min_price'] || 1
    const max_price = ctx.request.query['max_price'] || 999999
    const query = {
        price: { $gte: +min_price, $lte: +max_price },
        timestamp: { $gte: +start_date, $lte: end_date },
    }
    if (ctx.request.query['body']) {
        query['body'] = ctx.request.query['body']
    }
    if (ctx.request.query['school']) {
        query['school'] = ctx.request.query['school']
    }
    const keyword = Keyword.keywords.slice(0, Keyword.keywords.length - 4).map(d => ({ name: d.name, type: d.type }))
    const school = Keyword.schools
    console.log(query)
    const items = (await infos.find(query)).sort((a, b) => b.timestamp - a.timestamp).map(d => {
        const detailSet = new Set(d.detail)
        const detail = keyword.map((k, index) => detailSet.has(index + 1) ? 1 : 0)
        return { detail, price : d.price, school: d.school }
    })
    ctx.body = { keyword, school, items }
})

app.use(Cors()).use(Compress())
app.use(api.routes()).use(api.allowedMethods())
app.listen(3002)