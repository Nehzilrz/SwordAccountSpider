import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet, ElasticNetCV, SGDRegressor
from sklearn import metrics
import json

f = open('data.txt', 'r')
data = json.loads(f.read())
keyword = [x['name'] for x in data['keyword']]
school = data['school']

candidates = {}
for i in range(0, len(keyword)):
    candidates[keyword[i]] = [x['detail'][i] for x in data['items']]
  #  print(keyword[i], sum(candidates[keyword[i]]))
candidates['price'] = [x['price'] for x in data['items']]
for i in school:
    keyword.append(i)
    candidates[i] = [x['school'] == i for x in data['items']]

# print(keyword)
keyword.append('price')

df = pd.DataFrame(candidates, columns = keyword)
X = df[keyword[:-1]]
y = df[keyword[-1]]

lr= ElasticNet( l1_ratio = 0.77, alpha = 1, max_iter=500000, positive=True) #ElasticNet(positive=True)
lr.fit(X, y)
score = lr.score(X, y)
y_pred = lr.predict(X)

accuracy = 0
for i in range(0, len(y_pred)):
    delta = y_pred[i] - y[i] if y_pred[i] - y[i] > 0 else y[i] - y_pred[i]
    accuracy += 1.0 * delta / y[i]
accuracy /= len(y_pred)
print(accuracy)
items = [[keyword[i], lr.coef_[i]] for i in range(0, len(keyword) - 1)]
items.sort(key = lambda x:-x[1])
for x in items:
    print(x[0], x[1])

#for i in range(0, len(y)):
#    print(y[i], y_pred[i])
'''

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0, random_state=0)
lr= LogisticRegression()
lr.fit(X_train, y_train)
score = lr.score(X_train, y_train)
y_pred = lr.predict(X_test)

print('Accuracy: ', metrics.accuracy_score(y_test, y_pred))
'''