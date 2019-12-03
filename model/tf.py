import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["paopao"]
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
train_x, test_x, train_y, test_y = train_test_split(x, y, train_size=0.8, random_state=32)
ss_x = preprocessing.StandardScaler()
train_x = ss_x.fit_transform(train_x)
test_x = ss_x.transform(test_x)

ss_y = preprocessing.StandardScaler()
train_y = ss_y.fit_transform(train_y.values.reshape(-1, 1))
test_y=ss_y.transform(test_y.values.reshape(-1, 1))

def build_model():
  model = keras.Sequential([
    #layers.Dense(128, activation='relu', kernel_constraint=keras.constraints.NonNeg()),
    layers.Dense(256, activation='relu',input_shape=[len(train_x[0])]),
    layers.Dense(256, activation='relu'),
    layers.Dense(1)
  ])

  optimizer = tf.keras.optimizers.RMSprop(0.001)

  model.compile(loss='mse',
                optimizer=optimizer,
                metrics=['mae', 'mse'])
  return model

model = build_model()
history = model.fit(
  train_x, train_y,
  epochs=100, validation_split = 0.2, verbose=0,
  callbacks=[PrintDot()])

pred_y = model.predict(test_x).flatten()
y0 = ss_y.inverse_transform(pred_y)
y1 = ss_y.inverse_transform(test_y.ravel())
tot = 0
for i in range(len(y0)):
    d = y0[i] - y1[i]
    if d < 0:
        d = -d
    tot += d / y1[i]
print(tot / len(y0))

y1 = model.predict(x)
y1 = ss_y.inverse_transform(y1)
z = []

for i in range(0, len(y)):
    delta = y1[i] - y[i] if y1[i] - y[i] > 0 else y[i] - y1[i]
    delta = delta * 1.0 / y[i]
    z.append([i, (y1[i] - y[i]) / y[i]])

z.sort(key = lambda x:-x[1])
for x in z[:5] + z[-5:]:
    i = x[0]
    item = mydb['accounts'].find_one({ 'url': items[i]['url'] })
    print(item['unparsed']['content'])
    clothes = []
    for k in range(0, keyword_n):
        if items[i]['detail'][k] >= 0.5:
            clothes.append([keywords[k], items[i]['detail'][k]])
    print(clothes)
    print('expected', y1[i], 'actually', y[i])