import pymongo
import re

multi_red = '四|五|六|七|八|九|十|猴|鸡|羊|猪|狗'
multi_gold = '一代|猴|狐|苏|蝶|喵|高考|考|鸡|国|倒闭|狗|破晓|龙女|中秋|玫瑰|猪|丝路|珊瑚|兔|月兔|马尾'
multi_box = '伞|刀|咕|唐|喵|歌|毒|狗|猪|猫|白|秃|粉|糖|红|花|蓝|貂|青|鸡|黑|蓬莱|藏剑'
multi_red_all_re = re.compile('([' + multi_red + ']{2,})红')
multi_gold_all_re = re.compile('([' + multi_gold + ']{2,})金')
multi_box_all_re = re.compile('([' + multi_box + ']{2,})盒子?')
multi_red_re = re.compile('(' + multi_red + ')')
multi_gold_re = re.compile('(' + multi_gold + ')')
multi_box_re = re.compile('(' + multi_box + ')')
number_re = re.compile('(\d*|\d+\.\d+)[w|k|q]?\d*')
id_re = re.compile('\w{3,}')

def parse2(x):
    for y in multi_red_all_re.findall(x):
        z = '红'.join(multi_red_re.findall(y))
        x = x.replace(y, z)
    for y in multi_gold_all_re.findall(x):
        z = '金'.join(multi_gold_re.findall(y))
        x = x.replace(y, z)
    for y in multi_box_all_re.findall(x):
        z = '盒子'.join(multi_box_re.findall(y))
        x = x.replace(y, z)
    return x

def parse(x):
    x = x.lower()
    x = re.sub('/|（|）|【|】|\\|·|、|[|]', ' ', x)
    x = re.sub('·', ' ', x)
    x = re.sub('\s\s+', ' ', x)
    x = re.sub('se', '色', x)
    x = re.sub('jio', '脚', x)
    x = re.sub('xiao', '小', x)
    x = re.sub('6e', '六翼', x)
    x = re.sub('叽', '鸡', x)
    x = re.sub('qq\d{5,}', ' ', x)
    x = re.sub('免定金接代售·公司实体经营·百万流量推广', ' ', x)
    x = re.sub('\d+k免定', ' ', x)
    x = re.sub('情r枕|qr枕|qrz', '情人枕', x)
    x = re.sub('二代.狐狸毛披风', '二代狐狸毛', x)
    x = parse2(x)
    return x

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["paopao"]

items = mydb['accounts'].find()
items = [x['unparsed']['content'] for x in items]
items = [parse(x) for x in items]
f = open('items.txt', 'w')
for i in items:
    f.write(i + '\n')

f.close()

content = '\n'.join(items)

f = open('dict.txt', 'r')
words = [re.sub(r'\s', '', x.split(' ')[0]) for x in f]
ws = set(words)
words = [x for x in ws]
f.close()

edge = {}
degree = {}

for x in words:
    edge[x] = []
    degree[x] = 0

for x in words:
    for y in words:
        if x.count(y) > 0 and x != y:
            edge[x].append(y)
            degree[y] += 1

orders = [x for x in words if degree[x] == 0]
for i in range(len(words)):
    x = orders[i]
    for y in edge[x]:
        degree[y] -= 1
        if degree[y] == 0:
            orders.append(y)

f = open('dict.txt', 'w')
nw = []
for x in orders:
    nw.append([x, content.count(x)])
    content = re.sub(x, ' ', content)

nw.sort(key = lambda x: -x[1])
for x in nw:
    f.write(x[0] + ' ' + str(x[1]) + '\n')

f.close()

import jieba
jieba.load_userdict('dict.txt')
content = '\n'.join(items)
a = jieba.cut(content)

a = [x for x in a if x != ' ' and x != '' and x != '\n']

current = 0
total = 0
left = ''
number = ''
for i in a:
    if i in ws:
        current += len(i)
    else:
        m = re.match(number_re, i)
        if m != None and m.span()[1] == len(i):
            number = number + ', ' + i
        elif re.match(id_re, i) != None:
            continue
        else:
            left += i
    total += len(i)

print('coverage rate: ', current * 1.0 / total)

cnt = {}

for i in a:
    if i not in cnt:
        cnt[i] = 0
    cnt[i] += 1

for i in words:
    if i in cnt:
        del cnt[i]

words = [[i, cnt[i]] for i in cnt]
words.sort(key = lambda x: -x[1])

f = open('dict2.txt', 'w')
for x in words:
    f.write(x[0] + ' ' + str(x[1]) + '\n')

f.close()

