<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex
        xs4 v-for="weights in allWeights" :key="weights.body"
      >
        <h3 style="font-weight: 550; font-family: 微软雅黑;">{{weights.body}}价格分析</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Feature</th>
                <th class="text-left">Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in weights.value" :key="`weight${weights.body} ${index}`">
                <td style="font-weight: 550; font-family: 微软雅黑;">{{ item[0] }}</td>
                <td style="font-weight: 550; font-family: 微软雅黑;">{{ Number(item[1]).toFixed(2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

      </v-flex>
      <svg :width="screenWidth" :height="screenHeight">
        <g :transform="`translate(${priceBarWidth}, 0)`">
          <g>
              <g v-for="(item, i) in categorys" :key="`category${i}`" :transform="`translate(${item.from * rectWidth}, 0)`">
                <rect :width="(item.to - item.from) * rectWidth - rectStroke" :height="tagHeight - rectStroke" :stroke-width="rectStroke" :fill="categoryColor(item.name)" stroke="lightgray" opacity="0.8">></rect>
                <text fill="white" :dy="(tagHeight - rectStroke) / 2 + 4" :dx="(item.to - item.from) * rectWidth / 2 - item.name.length * 7">{{ item.name }}</text>
              </g>
          </g>
          <g :transform="`translate(0, ${priceBarHeight})`">
            <g v-for="(item, index) in items" :key="item.url" :transform="`translate(0, ${index * rectWidth})`">
              <g v-for="(x, j) in item.detail" :key="item.url+j" :transform="`translate(${j * rectWidth}, 0)`">
                <rect :width="rectWidth - rectStroke" :height="rectWidth" :stroke-width="rectStroke" :fill="x ? indexColor(j) : 'lightgray'" stroke="lightgray" opacity="0.8">
                </rect>
              </g>
            </g>
          </g>
        </g>
        <rect :width="priceBarWidth - rectStroke" :height="tagHeight - rectStroke" :stroke-width="rectStroke" fill="gray" stroke="lightgray" opacity="0.8">></rect>
        <text fill="white" :dy="(tagHeight - rectStroke) / 2 + 4" :dx="(priceBarWidth - rectStroke) / 2 - 14">价格</text>
        <g :transform="`translate(0, ${priceBarHeight})`">
          <g v-for="(item, index) in items" :key="item.url" :transform="`translate(0, ${index * rectWidth})`">
            <rect :width="priceBarWidth - rectStroke" :height="rectWidth" :stroke-width="rectStroke" fill="lightgray" stroke="lightgray" opacity="0.8"></rect>
            <rect :x="(priceBarWidth - rectStroke - 3.5) * Math.sqrt(item.price / maxPrice)" width="3.5" :height="rectWidth" :stroke-width="rectStroke" fill="#333" stroke="lightgray" opacity="0.8"></rect>
          </g>
        </g>
      </svg>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

const schools = ['五毒', '七秀', '万花', '长歌', '天策', '藏剑', '少林', '丐帮', '苍云', '纯阳', '明教', '唐门', '霸刀', '蓬莱', '凌雪阁']
const bodys = ['萝莉', '正太', '成男', '成女']
const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
const dataUrlPrefix = 'http://localhost:3002'
const analysisUrlPrefix = 'http://localhost:5000/api'

function expand(items, len) {
  let y = []
  for (let x of items) {
    if (x < len) y[x] = 1
  }
  for (let i = 0; i < len; ++i) {
    if (y[i] == undefined) {
      y[i] = 0
    }
  }
  return y
}

export default {
  name: 'HelloWorld',

  data: () => ({ 
    screenWidth: 1000,
    rectWidth: 12,
    tagHeight: 30,
    rectStroke: 2,
    priceBarWidth: 100,
    priceBarHeight: 30,
    keywords: [],
    items: [],
    categorys: [],
    categoryColor: null,
    indexColor: null,
    maxPrice: 10000,
    allWeights: [],
    body: '成男',
  }),
  computed: {
    screenHeight() {
      return this.items.length * this.rectWidth
    },
  },
  async mounted() {
    let res, data
    res = await axios.get(`${dataUrlPrefix}/keywords`)
    data = res.data
    let categorySet = new Map()
    let index = 0
    let last = 0
    for (let i = 0; i < data.length; ++i) {
      if (data[i].type == '体型') {
        data = data.slice(0, i)
        break
      }
      if (categorySet.get(data[i].type) == undefined) {
        categorySet.set(data[i].type, index++)
        if (i > 0) {
          this.categorys.push({ name: data[i - 1].type, from: last, to: i })
          last = i
        }
      }
    }
    this.categorys.push({ name: data[data.length - 1].type, from: last, to: data.length })

    this.categoryColor = (x) => colors[categorySet.get(x)] || 'lightgray'
    this.keywords = data
    res = await axios.get(`${dataUrlPrefix}/info?body=萝莉&school=丐帮`)
    data = res.data
    this.maxPrice = Math.max(...data.map(d => d.price))
    for (let x of data) {
      x.detail = expand(x.detail, this.keywords.length)
    }
    this.indexColor = (x) => colors[x < this.keywords.length ? categorySet.get(this.keywords[x].type) : -1] || 'lightgray'
 
    this.screenWidth = document.body.clientWidth
    this.items = data.sort((a, b) => b.price - a.price)
    for (let body of ['萝莉', '成男', '成女']) {
      res = await axios.get(`${analysisUrlPrefix}?body=${body}&min_price=1500`)
      data = res.data
      this.allWeights.push({
        body: body,
        value: data,
      })
    }
  }
};
</script>
