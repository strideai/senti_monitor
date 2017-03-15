import pandas as pd 
import pymongo
import urllib
import json,cPickle
from bs4 import BeautifulSoup
import random,newspaper
from os import getpid
from urllib2 import Request, urlopen


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
	
		#request3 = Request('https://api.stride.ai/sentence_wise_sentiment.json', data=values, headers=headers)
		#res3 = urlopen(request3).read()
		#res3 = json.loads(res3)
	
		request3 = Request('https://api.stride.ai/entities.json', data=values, headers=headers)
		res3 = urlopen(request3).read()
		res3 = json.loads(res3)
	
		return [res1,res2,res3]#,res4]

def get_article(url):
	
	article = newspaper.Article(url)
	article.download()
	article.parse()
	text = article.text

	if text =='':
		return 0

	"""
	html = urllib.urlopen(url).read()
	soup = BeautifulSoup(html,"lxml")
	for script in soup(["script", "style"]):
		script.extract()    # rip it out
	text = soup.get_text()
	lines = (line.strip() for line in text.splitlines())
	chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
	text = '\n'.join(chunk for chunk in chunks if chunk)
	"""
	senti = get_senti(text)
	return [text]+senti
	

df = pd.read_csv('/home/cgh/Desktop/vj/UCI/newsCorpora.csv',sep='\t')
headers = ['ID', 'Title','Url','Publisher','Category','Story','Hostname','Timestamp']
df.columns = headers

no = 6900

biz = df.loc[df['Category'] == 'b'][no:no+1500]
print "biz data collected"
print "Fetching Stories"

data = []
i = 0
count = 0
while True:
	try:
		response = get_article(biz['Url'].iloc[i])
		title = biz['Title'].iloc[i]
		timestamp = biz['Timestamp'].iloc[i]
		if response != 0:
			response = response + [timestamp]+[title]	
			data.append(response)
			print "Fetched story no:",count
			i +=1
			count+=1
			if count==400:
				break
		else:
			i+=1
			print i
			if count==400:
				break
			continue	
	except:
		i+=1
		print i
		continue


columns = ['Article','Doc_sentiment','Subject_sentiment','Entities','Timestamp','Title'] #removed sentence sentiment!
temp = pd.DataFrame(data = data,columns=columns)
temp.to_json('json2/biz_Data_400_3.json')
print temp.shape,biz.shape

