import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
import json

f = open('data.txt', 'r')
data = json.loads(f.read())
keyword = [x['name'] for x in data['keyword']]
school = data['school']

candidates = {}
for i in range(0, len(keyword)):
    candidates[keyword[i]] = [x['detail'][i] for x in data['items']]
candidates['price'] = [x['price'] for x in data['items']]
for i in school:
    keyword.append(i)
    candidates[i] = [x['school'] == i for x in data['items']]

print(keyword)
keyword.append('price')

df = pd.DataFrame(candidates, columns = keyword)
X = df[keyword[:-1]]
y = df[keyword[-1]]

lr= LogisticRegression(class_weight = 'balanced', max_iter = 10000)
lr.fit(X, y)
score = lr.score(X, y)
y_pred = lr.predict(X)

print('Accuracy: ', metrics.accuracy_score(y, y_pred))
# print(np.count_nonzero(lr.coef_))

weights = {}
for i in range(0, len(keyword)):
    weights[keyword[i]] = [1 if i == j else 0 for j in range(0, len(keyword) + 1)]
wf = pd.DataFrame(weights, columns = keyword)

X2 = wf[keyword[:-1]]
yw = lr.predict(X2)
weights = [[keyword[i], yw[i]] for i in range(0, len(keyword))]
weights.sort(key = lambda x:-x[1])
for w in weights:
    print(w[0], w[1])
'''

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0, random_state=0)
lr= LogisticRegression()
lr.fit(X_train, y_train)
score = lr.score(X_train, y_train)
y_pred = lr.predict(X_test)

print('Accuracy: ', metrics.accuracy_score(y_test, y_pred))
'''