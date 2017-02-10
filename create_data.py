from scipy.io import mmread
import pandas as pd 
import pymongo
import urllib
import json,cPickle
from bs4 import BeautifulSoup
import random
from os import getpid
from urllib2 import Request, urlopen

#from multiprocessing.pool  import Pool
#import multiprocessing.pool
#from pathos.multiprocessing import ProcessingPool as Pool
#conn = pymongo.MongoClient('localhost',27017)              # Mongo Stuff
#conn.admin.authenticate('root', 'themenwhopause')
#db = conn.uci_data
#collection = db.news


"""
term_matrix = mmread('bbc.mtx')

with open('bbc.terms') as f:
	terms = f.readlines()

with open('bbc.docs') as f:	
	docs = f.readlines()

with open('bbc.classes') as f:
	classes = f.readlines()
"""


"""UCI repo"""


def get_senti(text):

	text = text.encode('ascii','ignore')
	values = {"text":text,"parse_html":"false","social_media":"false"}
	values = json.dumps(values)
	headers = {'Authorization': 'Token demo_key', 'Content-Type': 'application/json'}

	request1 = Request('https://api.stride.ai/doc_sentiment.json', data=values, headers=headers)
	res1 = urlopen(request1).read()
	res1 = json.loads(res1)
	
	request2 = Request('https://api.stride.ai/subjective.json', data=values, headers=headers)
	res2 = urlopen(request2).read()
	res2 = json.loads(res2)
	
	request3 = Request('https://api.stride.ai/sentence_wise_sentiment.json', data=values, headers=headers)
	res3 = urlopen(request3).read()
	res3 = json.loads(res3)
	
	request4 = Request('https://api.stride.ai/entities.json', data=values, headers=headers)
	res4 = urlopen(request4).read()
	res4 = json.loads(res4)
	

	return [res1,res2,res3,res4]


"""
def res1(values,headers):
	request = Request('https://api.stride.ai/doc_sentiment.json', data=values, headers=headers)
	res = urlopen(request).read()
	res = json.loads(res)
	return res

def res2(values,headers):
	request = Request('https://api.stride.ai/subjective.json', data=values, headers=headers)
	res = urlopen(request).read()
	res = json.loads(res)
	return res

def res3(values,headers):
	request = Request('https://api.stride.ai/sentence_wise_sentiment.json', data=values, headers=headers)
	res = urlopen(request).read()
	res = json.loads(res)
	return res

def res4(values,headers):
	request = Request('https://api.stride.ai/entities.json', data=values, headers=headers)
	res = urlopen(request).read()
	res = json.loads(res)
	return res			
"""

def get_article(url):
	try:
		html = urllib.urlopen(url).read()
		soup = BeautifulSoup(html,"lxml")
		for script in soup(["script", "style"]):
			script.extract()    # rip it out
		text = soup.get_text()
		lines = (line.strip() for line in text.splitlines())
		chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
		text = '\n'.join(chunk for chunk in chunks if chunk)
		senti = get_senti(text)

		
		text = text.encode('ascii','ignore')
		values = {"text":text,"parse_html":"false","social_media":"false"}
		values = json.dumps(values)
		headers = {'Authorization': 'Token demo_key', 'Content-Type': 'application/json'}

		"""
		pool = Pool()
		result1 = pool.apply_async(res1,(values,headers,)) 
		result2 = pool.apply_async(res2,(values,headers,))
		result3 = pool.apply_async(res3,(values,headers,))
		result4 = pool.apply_async(res4,(values,headers,))
		pool.join()
		"""

		#result = [result1.get()]+[result2.get()]+[result3.get()]+[result4.get()]
		

		return [text]+senti
	except:
		return 0


df = pd.read_csv('/home/cgh/Desktop/vj/UCI/newsCorpora.csv',sep='\t')
headers = ['ID', 'Title','Url','Publisher','Category','Story','Hostname','Timestamp']
df.columns = headers
biz = df.loc[df['Category'] == 'b'][1800:1950]
print "biz data collected"

print "Fetching Stories"
#temp = pd.DataFrame({'Article':range(5),'Doc_sentiment':range(5),'subject_sentiment':range(5),'sent_sentiment':range(5),'entities':range(5)})


data = []
i = 0
count = 0
while True:
	try:
		response = get_article(biz['Url'].iloc[i])
		title = biz['Title'].iloc[i]
		timestamp = biz['Timestamp'].iloc[i]
		response = response + [timestamp]+[title]
		if response != 0:
			#temp.iloc[count] = response
			data.append(response)
			print "Fetched story no:",count
			i +=1
			count+=1
			if count==100:
				break
		else:
			i+=1
			print i
			if count==100:
				break
			continue	
	except:
		i+=1
		print i
		continue


columns = ['Article','Doc_sentiment','Subject_sentiment','Sent_sentiment','Entities','Timestamp','Title']
temp = pd.DataFrame(data = data,columns=columns)
temp.to_json('biz_Data1300.json')
#temp.to_pickle('biz_Data10.pkl')
print temp.shape,biz.shape

#biz = pd.concat([biz,temp],axis=1)

#biz.to_json('biz_data_100.json')
#biz.to_pickle('biz_data_100.pkl')
#collection.insert_many(biz.to_dict('records'))


