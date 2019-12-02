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

    filtered_items = filter(lambda x: x['school'] != '未知', items)
    items = [x for x in filtered_items]

    keymap = {}
    for i in range(0, len(keywords)):
        keymap[keywords[i]['name']] = i
    keyItems = keywords

    keywords = [x['name'] for x in keyItems]
    keywords = keywords[:-4]
    keyword_n = len(keywords)

    keywords.append('9万资历')
    keywords.append('10万资历')
    keywords.append('11万资历')

    ratio = {}

    for school in schools:
        ratio[school] = 1


    for k in range(0, 5):
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

        for i in range(0, keyword_n):
            values[keywords[i]] = candidates[keywords[i]] = np.array([x['detail'][i] for x in items])

        for i in schools:
            values[i] = np.array([1 if x['school'] == i else 0 for x in items])

        if body == '成男':
            add_compose(('黑金夜斩白', '一代黑'))
            add_compose(('苍云', '一代黑'))
            add_compose(('天策', '劲足赤兔'))
            add_compose(('白金夜斩白', '六红'))
            add_compose(('一代黄', '藏剑'))
            add_compose(('一代白', '纯阳'))

        if body == '成女':
            add_compose(('粉白菜', '一代粉'))

        if body == '萝莉':
            add_compose(('白螺母', '六翼'))
        
        if 'price' not in keywords:
            keywords.append('price')

        candidates['9万资历'] = (candidates['资历'] >= 9).astype(int)
        candidates['10万资历'] = (candidates['资历'] >= 10).astype(int)
        candidates['11万资历'] = (candidates['资历'] >= 11).astype(int)
        candidates['price'] = np.array([x['price'] for x in items])

        df = pd.DataFrame(candidates, columns = keywords)
        expand_ratio = [ratio[items[i]['school']] for i in range(0, len(items))]
        school_count = { }
        for i in range(0, len(items)):
            if school_count.get(items[i]['school'], None) == None:
                school_count[items[i]['school']] = 0
            school_count[items[i]['school']] += 1
        print(school_count)

        X = df[keywords[:-1]]
        y = df[keywords[-1]] / expand_ratio

        lr = ElasticNet(l1_ratio = 0.77, alpha = 1, max_iter=500000, positive=True) #ElasticNet(positive=True)
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
            
        for i in range(0, len(items)):
            y_pred[i] = y_pred[i] * ratio[items[i]['school']]

        z = []

        for i in range(0, len(items)):
            delta = y_pred[i] - y[i] if y_pred[i] - y[i] > 0 else y[i] - y_pred[i]
            delta = delta * 1.0 / y[i]
            z.append([i, delta])
            accuracy += delta

        z.sort(key = lambda x:-x[1])
        z = z[:5]
        z = set([x[0] for x in z])

        new_items = []
        for i in range(0, len(items)):
            if i not in z:
                new_items.append(items[i])
        items = new_items

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
    keywords = [{ 'name': x['name'], 'type': x['type']} for x in keywords]

    schools = mydb['schools'].find()
    schools = [x['name'] for x in schools]

    items = mydb['infos'].find(query)
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'] }
        for x in items
    ]

    model = get_model(keywords, schools, items, body)

    return json.dumps(model)
