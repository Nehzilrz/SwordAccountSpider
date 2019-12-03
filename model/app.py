import pandas as pd
import numpy as np
from sklearn.linear_model import ElasticNet, ElasticNetCV, SGDRegressor
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import RFE
from sklearn import preprocessing
from sklearn.model_selection import GridSearchCV
from sklearn.neural_network import MLPRegressor
from sklearn.ensemble import GradientBoostingRegressor
import json
import pymongo

 
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["paopao"]

def get_model(keywords, schools, items, body):
    keywords = [x['name'] for x in keywords]
    keyword_n = len(keywords)
    candidates = {}
    
    for i in schools:
        keywords.append(i)
        candidates[i] = np.array([1 if x['school'] == i else 0 for x in items])

    for i in range(0, keyword_n):
        candidates[keywords[i]] = np.array([x['detail'][i] for x in items])

    df = pd.DataFrame(candidates, columns = keywords)
    
    x = df[keywords]
    y = pd.Series(np.array([x['price'] for x in items]))
    train_x, test_x, train_y, test_y = train_test_split(x, y, train_size=0.8, random_state=33)

    ss_x = preprocessing.StandardScaler()
    train_x = ss_x.fit_transform(train_x)
    test_x = ss_x.transform(test_x)

    ss_y = preprocessing.StandardScaler()
    train_y = ss_y.fit_transform(train_y.values.reshape(-1, 1))
    test_y=ss_y.transform(test_y.values.reshape(-1, 1))
    
    model_mlp = MLPRegressor(solver='lbfgs', hidden_layer_sizes=(100, 100, 100), max_iter=1500, random_state=1, activation='logistic')
    
    model_mlp.fit(train_x, train_y.ravel())
    pred_y = model_mlp.predict(test_x)
    y0 = ss_y.inverse_transform(pred_y)
    y1 = ss_y.inverse_transform(test_y.ravel())

    tot = 0
    for i in range(len(y0)):
        d = y0[i] - y1[i]
        if d < 0:
            d = -d
        tot += d / y1[i]

    print(tot / len(y0))
    
    y1 = model_mlp.predict(x)
    y1 = ss_y.inverse_transform(y1)
    z = []

    for i in range(0, len(y)):
        delta = y1[i] - y[i] if y1[i] - y[i] > 0 else y[i] - y1[i]
        delta = delta * 1.0 / y[i]
        z.append([i, (y1[i] - y[i]) / y[i]])

    z.sort(key = lambda x:-x[1])
    print('===========================higher=======================')
    for x in z[:20]:
        i = x[0]
        item = mydb['accounts'].find_one({ 'url': items[i]['url'] })
        print(item['unparsed']['content'])
        clothes = []
        for k in range(0, keyword_n):
            if items[i]['detail'][k] >= 0.5:
                clothes.append([keywords[k], items[i]['detail'][k]])
        print(clothes)
        print('expected', y1[i], 'actually', y[i])

    print('==========================lower=======================')
    for x in z[-20:]:
        i = x[0]
        item = mydb['accounts'].find_one({ 'url': items[i]['url'] })
        print(item['unparsed']['content'])
        clothes = []
        for k in range(0, keyword_n):
            if items[i]['detail'][k] >= 0.5:
                clothes.append([keywords[k], items[i]['detail'][k]])
        print(clothes)
        print('expected', y1[i], 'actually', y[i])

    
    mlp_score = model_mlp.score(test_x, test_y.ravel())

    print('sklearn mlp regressor score for', body, mlp_score)
    return items
    
def hello_world():
    keywords = mydb['keywords'].find()
    keywords = [{ 'name': x['name'], 'type': x['type'], 'index': int(x['index'])} for x in keywords]
    keywords.sort(key = lambda x: int(x['index']))

    schools = mydb['schools'].find()
    schools = [x['name'] for x in schools]

    items = mydb['infos'].find({ 'body': '萝莉' , 'price' : { '$gte' : 2000 }})
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items, '萝莉')

    items = mydb['infos'].find({ 'body': '成女' , 'price' : { '$gte' : 2000 }})
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items, '成女')

    items = mydb['infos'].find({ 'body': '成男' , 'price' : { '$gte' : 2000 }})
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items, '成男')
    

hello_world()

'''
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
'''