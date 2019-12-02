import pandas as pd
import numpy as np
from sklearn.linear_model import ElasticNet, ElasticNetCV, SGDRegressor
from flask import Flask, request
import json
import pymongo
from flask_cors import CORS

 
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["paopao"]

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def get_model(keywords, schools, items, body):
    keymap = {}
    for i in range(0, len(keywords)):
        keymap[keywords[i]['name']] = i
    keyItems = keywords

    keywords = [x['name'] for x in keyItems]
    keyword_n = len(keywords)

    ratio = {}

    for school in schools:
        ratio[school] = 1

    candidates = {}
    values = {}

    def add_compose(keys):
        key = ','.join(keys) + ' 额外加成'
        if key not in keywords:
            keywords.append(key)
        value = np.ones(len(items))
        for k in keys:
            value = value * values.get(k)
        candidates[key] = value

    def add_aggregate(keys, name, threshold):
        key = name + ' >= ' + str(threshold)
        if key not in keywords:
            keywords.append(key)
        value = np.zeros(len(items))
        for k in keys:
            value = value + values.get(k)
        value = (value >= threshold).astype(int)
        candidates[key] = value

    for i in range(0, keyword_n):
        values[keywords[i]] = candidates[keywords[i]] = np.array([x['detail'][i] for x in items])

    for i in schools:
        keywords.append(i)
        candidates[i] = values[i] = np.array([1 if x['school'] == i else 0 for x in items])

    if body == '成男':
        add_compose(('黑金夜斩白', '一代黑'))
        add_compose(('苍云', '一代黑'))
        add_compose(('天策', '劲足赤兔'))
        add_compose(('白金夜斩白', '六红'))
        add_compose(('黑金夜斩白', '六红'))
        add_compose(('白娃娃', '六红'))
        add_compose(('蓝娃娃', '六红'))
        add_compose(('白娃娃', '一代金'))
        add_compose(('一代黄', '藏剑'))
        add_compose(('一代白', '纯阳'))

    if body == '成女':
        add_compose(('粉白菜', '一代粉'))
        add_compose(('一代黑', '谷雨'))
        add_compose(('谷雨', '五红'))
        add_compose(('情阅', '五红'))
        add_compose(('蓝螺母', '五红'))
        add_compose(('白螺母', '五红'))
        add_compose(('谷雨', '一代金'))
        add_compose(('情阅', '一代金'))
        add_compose(('蓝螺母', '一代金'))
        add_compose(('白螺母', '一代金'))
        add_compose(('白娃娃', '一代金'))
        add_aggregate(('四红', '五红', '六红'), '四五六红', 2)
        add_aggregate(('一代金', '狐金', '猴金'), '金发三巨头', 2)
        add_aggregate(('一代金', '狐金', '猴金'), '金发三巨头', 3)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 3)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 6)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 8)
    

    if body == '萝莉':
        add_compose(('白螺母', '五红'))
        add_compose(('白螺母', '六翼'))
        add_aggregate(('白螺母', '蓝螺母'), '双色螺母', 2)
        add_aggregate(('四红', '五红', '六红'), '四五六红', 2)
        add_aggregate(('一代金', '狐金', '猴金'), '金发三巨头', 2)
        add_aggregate(('一代金', '狐金', '猴金'), '金发三巨头', 3)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 4)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 8)
        add_aggregate(("粉白菜", "紫白菜", "黑金夜斩白","白金夜斩白","情阅", "谷雨", "白螺母", "蓝螺母", "红墨韵", "黑墨韵", "红彩云", "蓝彩云", "红风露", "蓝风露", "橙繁", "粉繁", "阳春海", "阳春冰", "红玉蟒", "黑玉蟒", "红捕风", "黑捕风", "红紧那", "黑紧那", "紫火舞", "白火舞", "蓝花开", "黄花开", "策马若如", "策马河洲"), '五限', 12)
    
    keywords.append('奇遇很多')
    keywords.append('9万资历')
    keywords.append('10万资历')
    keywords.append('11万资历')
    if 'price' not in keywords:
        keywords.append('price')

    candidates['奇遇很多'] = (candidates['奇遇'] >= 40).astype(int)
    candidates['奇遇'] = np.zeros(len(items))
    candidates['9万资历'] = (candidates['资历'] >= 9).astype(int)
    candidates['10万资历'] = (candidates['资历'] >= 10).astype(int)
    candidates['11万资历'] = (candidates['资历'] >= 11).astype(int)
    candidates['price'] = np.array([x['price'] for x in items])

    for k in range(0, 10):
        df = pd.DataFrame(candidates, columns = keywords)

        expand_ratio = [ratio[items[i]['school']] for i in range(0, len(items))]
        school_count = {}
        for i in range(0, len(items)):
            if school_count.get(items[i]['school'], None) == None:
                school_count[items[i]['school']] = 0
            school_count[items[i]['school']] += 1

        X = df[keywords[:-1]]
        y = df[keywords[-1]] / expand_ratio

        lr = ElasticNet(l1_ratio = 0.77, alpha = 1, max_iter=500000, positive=True, fit_intercept = True, warm_start = True) #ElasticNet(positive=True)
        lr.fit(X, y)
        score = lr.score(X, y)
        y_pred = lr.predict(X)

        accuracy = 0
        pred = {}
        actual = {}

        for school in schools:
            pred[school] = 0
            actual[school] = 0

        for i in range(0, len(items)):
            pred[items[i]['school']] += y_pred[i]
            actual[items[i]['school']] += y[i]

        for school in schools:
            if actual[school] > 0:
                ratio[school] = ratio[school] * actual[school] / pred[school]
                if ratio[school] > 1.2:
                    ratio[school] = 1.2
            
        for i in range(0, len(items)):
            y_pred[i] = y_pred[i] * ratio[items[i]['school']]

        z = []

        for i in range(0, len(items)):
            delta = y_pred[i] - y[i] if y_pred[i] - y[i] > 0 else y[i] - y_pred[i]
            delta = delta * 1.0 / y[i]
            z.append([i, (y_pred[i] - y[i]) / y[i]])
            accuracy += delta
        
        print(accuracy)

        z.sort(key = lambda x:-x[1])
        z = z[:5] + z[-5:]
        z = set([x[0] for x in z])

        n = len(items)
        items = [items[i] for i in range(n) if i not in z]
        for key in candidates:
            candidates[key] = [candidates[key][i] for i in range(n) if i not in z]

        '''
        z.sort(key = lambda x:-x[1])
        for x in z[:5]:
            i = x[0]
            item = mydb['accounts'].find_one({ 'url': items[i]['url'] })
            print(item['unparsed']['content'])
            clothes = []
            for k in range(0, keyword_n):
                if items[i]['detail'][k] >= 1:
                    clothes.append([keywords[k], items[i]['detail'][k]])
            print(clothes)
            print('expected', y_pred[i], 'actually', y[i])

        for x in z[-5:]:
            i = x[0]
            item = mydb['accounts'].find_one({ 'url': items[i]['url'] })
            print(item['unparsed']['content'])
            clothes = []
            for k in range(0, keyword_n):
                if items[i]['detail'][k] >= 1:
                    clothes.append([keywords[k], items[i]['detail'][k]])
            print(clothes)
            print('expected', y_pred[i], 'actually', y[i])
        '''
        
    '''
        new_items = []
        for i in range(0, len(items)):
            if i not in z:
                new_items.append(items[i])
        items = new_items
    '''
    accuracy /= len(items)

    print(ratio)
    print(accuracy)

    items = [[keywords[i], lr.coef_[i]] for i in range(0, len(keywords) - 1)]
    items.sort(key = lambda x:-x[1])
    return items

@app.route('/api/')
def hello_world():
    start_date = request.args.get('start_date', 0)
    end_date = request.args.get('end_date', 2000000000000)
    min_price = request.args.get('min_price', 1)
    max_price = request.args.get('max_price', 999999)
    query = {
        'price': { '$gte': int(min_price), '$lte': int(max_price) },
        'timestamp': { '$gte': int(start_date), '$lte': int(end_date) },
    }
    body = request.args.get('body', None)
    school = request.args.get('school', None)
    if body != None:
        query['body'] = body
    if school != None:
        query['school'] = school

    keywords = mydb['keywords'].find()
    keywords = [{ 'name': x['name'], 'type': x['type'], 'index': int(x['index'])} for x in keywords]
    keywords.sort(key = lambda x: int(x['index']))

    schools = mydb['schools'].find()
    schools = [x['name'] for x in schools]

    items = mydb['infos'].find(query)
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'] }
        for x in items
    ]

    model = get_model(keywords, schools, items, body)

    return json.dumps(model)
