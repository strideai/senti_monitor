import pymongo,json

conn = pymongo.MongoClient('localhost',27017)              # Mongo Stuff
conn.admin.authenticate('username', 'password')
db = conn.news
collection = db.business

files = ['200','100','400','500','600','700','800','900','1000','1100','1200','1300','1400']

for file_no in files:
	with open('biz_Data'+file_no +'.json','r') as f:
		a  = json.load(f)
	title = a['Title']
	timestamp = a['Timestamp']
	entities = a['Entities']
	doc_senti = a['Doc_sentiment']
	sent_senti = a['Sent_sentiment']
	subject_senti = a['Subject_sentiment']
	article = a['Article']

	for i in range(100):
		data = {'Title':title[str(i)],'Timestamp':timestamp[str(i)],'Entities':entities[str(i)],'Doc_sentiment':doc_senti[str(i)],'Sent_sentiment':sent_senti,'Subject_sentiment':subject_senti[str(i)],'Article':article[str(i)] }	
		print i		
		collection.insert_one(data)		
				




