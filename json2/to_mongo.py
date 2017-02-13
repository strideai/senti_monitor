import pymongo,json
from collections import Counter 
import subprocess as sp

conn = pymongo.MongoClient('localhost',27017)              # Mongo Stuff
conn.admin.authenticate('root', 'password')
db = conn.news2
collection = db.business

files1 = ['biz_Data_200_2.json','biz_Data_200_3.json','biz_Data_200.json','biz_Data_200_4.json']
files2 = ['biz_Data_400_1.json', 'biz_Data_400_2.json','biz_Data_400_3.json']

files = files2 + files1

total_counter = Counter()
neg_counter = Counter()
pos_counter = Counter()
mixed_counter = Counter()
total_org = []

for file_no in files:
	print file_no

	if file_no in files1:
		r = 200
	else:
		r = 400
		
	with open(file_no,'r') as f:
		a  = json.load(f)

	title = a['Title']
	timestamp = a['Timestamp']
	#entities = a['Entities']
	doc_senti = a['Doc_sentiment']
	subject_senti = a['Subject_sentiment']
	article = a['Article']


	for i in range(r):
		print i
		entities = a['Entities'][str(i)]['entities']
		org= [j['text'] for j in entities if j['type'] == 'ORG']


		sub = a['Subject_sentiment'][str(i)]['sentiment_map']
		sub = filter(lambda x:x['text'] in org,sub)
		
		org = sorted(org,key = len)[::-1]
		for e1 in range(len(org)-1):	
			for e2 in range(e1+1,len(org)):
				if org[e2] in org[e1]:
					org[e2] = org[e1]

		if '404' in article[str(i)]:
			continue

		"""Taking those orgs which have subj sentiment"""
		k = []
		for m in sub:
			for n in org:
				if m['text'] in n:
					k.append(n)
		org = k[::]
		org = map(lambda x:x.lower(),org) #Convert all to lower case
		#total_counter.update(org)
		local_count = Counter(org)

		total_org += org
		#a['entity_count'] = local_count.most_common()
		"""calculating pos neg references for each entity in each article"""
		posneg = []
		for m in sub:
			pos_count = 0
			neg_count = 0
			score = 0
			if m['category'] =='positive':
				pos_count+=1
				pos_counter.update([m['text'].lower()])
			elif m['category'] == 'negative':
				neg_count+=1
				neg_counter.update([m['text'].lower()])
			else:
				pos_count+=1
				neg_count+=1
				mixed_counter.update([m['text'].lower()])

			score = (m['positive_score'] + m['negative_score'])/2
			temp = {'positive_count':pos_count,'negative_count':neg_count,'score':score}
			posneg.append({m['text'].lower().strip('.'):temp})

		if list(set(org)) == []:
			continue

		for m in range(len(sub)):
			st = sub[m]['text'].lower()
			sub[m]['text'] = st 
		
		total_counter.update([m['text'] for m in sub])

		data = {'title':title[str(i)],
				'Timestamp':timestamp[str(i)],
				'entities':list(set(org)),
				'Doc_sentiment':doc_senti[str(i)],
				'entity_sentiment':sub,
				'entity_count':dict(local_count.most_common()),
				'article':article[str(i)],
				'posneg':posneg,
				}
		
		collection.insert(data,check_keys=False)
		
with open('pos_counter','w') as g:
	g.write(str(pos_counter))
		
with open('neg_counter','w') as h:
	h.write(str(neg_counter))

		
with open('mixed_counter','w') as q:
	q.write(str(mixed_counter))


with open('total_counter','w') as p:
	p.write(str(total_counter))
