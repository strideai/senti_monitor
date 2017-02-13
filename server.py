import tornado.ioloop
from tornado.options import define, options, parse_command_line
import logging
import pyrestful.rest
from pyrestful import mediatypes
from pyrestful.rest import get
import pymongo,json,os
from urllib2 import Request, urlopen
from collections import Counter

conn = pymongo.MongoClient('localhost',27017)             
conn.admin.authenticate('root', 'themenwhopause')
db = conn.news2
collection = db.business


def get_entity(entity,time):
	try:
		entity = entity.lower()
		with open('json2/all_counts') as f:
			total_count = eval(f.read())	

		cursor = collection.find()
		cursor = collection.aggregate([{"$match":{"entities":entity}}])

		jl = []
		while cursor.alive ==True:
			jl.append(cursor.next())

		print len(jl)
		if time != 0:
			jl = [k for k in jl if k['Timestamp'] > time]
			print len(jl)

		pos = 0
		neg = 0
		for i in range(len(jl)):
			for j in range(len(jl[i]['posneg'])):
				try:
					pos+= jl[i]['posneg'][j][entity]['positive_count']
					neg+=jl[i]['posneg'][j][entity]['negative_count']
				except:
					pass		

		score= 0
		for i in range(len(jl)):
			for j in jl[i]['entity_sentiment']:
				if j['text'] == entity:
					score = score + j['positive_score'] + j['negative_score']
		avg = round(score / len(jl),2)
							
		data = {"name":entity,"mentionsCount":total_count[entity],"positiveRefs":pos,"negativeRefs":neg,"overallAvgScore":avg}	
		return data
	except:
		return {"hello":"error"}


class feed(pyrestful.rest.RestHandler):
	
	@get(_path="/")
	def hello(self):
		self.render('index.html')

	@get(_path="/compare", _produces=mediatypes.APPLICATION_JSON)
	def compare(self, name):
		entity_list = self.get_argument("entities").split(',')
		print entity_list
		json_list = []
		
		try:
			time = self.get_argument("since")
			for i in entity_list:
				json_list.append(get_entity(i,int(time)))
			return json_list
		except:
			pass

		for i in entity_list:
			json_list.append(get_entity(i,0))
				
		return json_list		

	@get(_path="/feed", _produces=mediatypes.APPLICATION_JSON)
	def say(self):
		try:
			limit = self.get_argument("limit")
			offset = self.get_argument("offset")
			limit = eval(limit)
			offset = eval(offset)
			print limit,offset
			cursor = collection.find()

			"""CREATE INDEX db.business.createIndex({'Timestamp':-1}) """

			cursor = cursor.sort('Timestamp',pymongo.DESCENDING)
			json_list = []
			cursor = cursor.skip(offset)

			for i in range(offset,offset+limit+1):
				val = cursor.next()
				val.pop('_id')
				val.pop('article')
				val.pop('posneg')
				val.pop('entity_count')

				val['id'] = val.pop('Timestamp')
				val['articleSentiment'] = val.pop('Doc_sentiment')
				val['entities'] = val.pop('entity_sentiment')

				json_list.append(val)
			print 'No of articles',len(json_list)
			print 'Done'
			return json_list  #json.dumps([dict(j) for j in json_list])

		except:
			return {"Hello":"error"}

define("debug", default=False, help="run in debug mode")
define("port", default=8088, help="run server on given port", type=int)
parse_command_line()

if __name__ == '__main__':
	try:
		print("Running on 8000")
		app = pyrestful.rest.RestService([feed],debug=True,static_path=os.path.join(os.path.dirname(__file__), "static"))
		app.listen(8088)
		logging.info("Server running on port %d", 8088)
		tornado.ioloop.IOLoop.instance().start()        
	except KeyboardInterrupt:
		print("\nStop the echo service")



