import pandas as pd
import numpy as np
from sklearn.linear_model import ElasticNet, ElasticNetCV, SGDRegressor
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.model_selection import GridSearchCV
from sklearn.neural_network import MLPRegressor
from sklearn.ensemble import GradientBoostingRegressor
import json
import pymongo

 
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["paopao"]

def get_model(keywords, schools, items):
    keywords = [x['name'] for x in keywords]
    keyword_n = len(keywords)
    candidates = {}
    
    for i in schools:
        keywords.append(i)
        candidates[i] = np.array([1 if x['school'] == i else 0 for x in items])
    '''
    bodys = ['成男', '成女', '萝莉', '正太']
    for i in bodys:
        keywords.append(i)
        candidates[i] = np.array([1 if x['body'] == i else 0 for x in items])
    '''

    if 'price' not in keywords:
        keywords.append('price')

    for i in range(0, keyword_n):
        candidates[keywords[i]] = np.array([x['detail'][i] for x in items])

    candidates['price'] = np.array([x['price'] for x in items])

    df = pd.DataFrame(candidates, columns = keywords)
    x = df[keywords[:-1]]
    y = df[keywords[-1]]
    train_x, test_x, train_y, test_y = train_test_split(x, y, train_size=0.8, random_state=33)

    ss_x = preprocessing.StandardScaler()
    train_x = ss_x.fit_transform(train_x)
    test_x = ss_x.transform(test_x)

    ss_y = preprocessing.StandardScaler()
    train_y = ss_y.fit_transform(train_y.values.reshape(-1, 1))
    test_y=ss_y.transform(test_y.values.reshape(-1, 1))

    
    model_mlp = MLPRegressor(solver='lbfgs', hidden_layer_sizes=(200, 200, 200), random_state=1)
    # print(train_x, train_y)
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
    
    mlp_score=model_mlp.score(test_x, test_y.ravel())

    print('sklearn多层感知器-回归模型得分', mlp_score)
    
    '''
    tuned_parameters = [{
        'hidden_layer_sizes': [40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
        'activation': ['relu', 'tanh', 'logistic'],
        'solver':['lbfgs', 'adam'], 'alpha':[0.0001],
        'batch_size':['auto'], 'learning_rate':['constant'],
        'learning_rate_init':[0.001], 'max_iter':[500, 600, 700, 800, 1000, 1200, 1500]
    }]

    rgr = GridSearchCV(MLPRegressor(), tuned_parameters, cv=5, verbose=5, n_jobs=8)
    rgr.fit(train_x, train_y.ravel())
    train_mse = mean_squared_error(train_y.ravel(), rgr.predict(X_train))
    test_mse = mean_squared_error(train_x, rgr.predict(X_test))
    
    print(rgr.best_params_)
    print(rgr.best_score_)
    print("Train MSE:", np.round(train_mse,2))
    print("Test MSE:", np.round(test_mse,2))
    '''
    return items
    
def hello_world():
    keywords = mydb['keywords'].find()
    keywords = [{ 'name': x['name'], 'type': x['type'], 'index': int(x['index'])} for x in keywords]
    keywords.sort(key = lambda x: int(x['index']))

    schools = mydb['schools'].find()
    schools = [x['name'] for x in schools]

    items = mydb['infos'].find({ 'body': '萝莉' })
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items)

    items = mydb['infos'].find({ 'body': '成女' })
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items)

    items = mydb['infos'].find({ 'body': '成男' })
    items = [
        { 'price' : x['price'], 'school' : x['school'], 'detail': x['detail'], 'url': x['url'], 'body': x['body'] }
        for x in items
    ]

    model = get_model(keywords, schools, items)
    

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