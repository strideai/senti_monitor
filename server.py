import tornado.ioloop
from tornado.options import define, options, parse_command_line
import logging
import pyrestful.rest
from pyrestful import mediatypes
from pyrestful.rest import get
import pymongo,json
from urllib2 import Request, urlopen
from collections import Counter

conn = pymongo.MongoClient('localhost',27017)              # Mongo Stuff
conn.admin.authenticate('root', 'password')
db = conn.news2
collection = db.business


class feed(pyrestful.rest.RestHandler):
	
	@get(_path="/compare", _produces=mediatypes.APPLICATION_JSON)
	def compare(self, name):
		try:
			entity1 = self.get_argument("entity1")
			entity2 = self.get_argument("entity2")

			entity1 = entity1.lower()
			entity2 = entity2.lower()

			print entity1,entity2

			with open('json2/all_counts') as f:
				total_count = eval(f.read())
				#do total_count[entity1] for no of occurences

			cursor1 = collection.find()
			cursor2 = collection.find()
			cursor1 = collection.aggregate([{"$match":{"entities":entity1}}])
			cursor2 = collection.aggregate([{"$match":{"entities":entity2}}])

			jl1 = jl2 = []
			while cursor1.alive ==True:
				jl1.append(cursor1.next())
			while cursor2.alive ==True:
				jl2.append(cursor2.next())

			"""calculating pos and neg count of each entity in corpus"""
			pos1 = 0
			neg1 = 0
			for i in range(len(jl1)):
				for j in range(len(jl1[i]['posneg'])):
						try:
							pos1+= jl1[i]['posneg'][j][entity1]['positive_count']
							neg1+=jl1[i]['posneg'][j][entity1]['negative_count']
						except:
							pass

			pos2 = 0
			neg2 = 0
			for i in range(len(jl2)):
				for j in range(len(jl2[i]['posneg'])):
						try:
							pos2+= jl2[i]['posneg'][j][entity2]['positive_count']
							neg2+=jl2[i]['posneg'][j][entity2]['negative_count']
						except:
							pass

			"""Calculating the total average of entity sentiment in the corpus """ 
			score1= 0
			for i in range(len(jl1)):
				for j in jl1[i]['entity_sentiment']:
					if j['text'] == entity1:
						score1 = score1 + j['positive_score'] + j['negative_score']
			avg1 = round(score1 / len(jl1),2)


			score2= 0
			for i in range(len(jl2)):
				for j in jl2[i]['entity_sentiment']:
					if j['text'] == entity2:
						score2 = score2 + j['positive_score'] + j['negative_score']
			avg2 = round(score2 / len(jl2),2)

			json_list = [ {"name":entity1,"mentionsCount":total_count[entity1],"positiveRefs":pos1,"negativeRefs":neg1,"overallAvgScore":avg1}]
			json_list.append({"name":entity2,"mentionsCount":total_count[entity2],"positiveRefs":pos2,"negativeRefs":neg2,"overallAvgScore":avg2})

			return json_list

		except:
			return {"hello":"error"}		

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
define("port", default=8000, help="run server on given port", type=int)
parse_command_line()

if __name__ == '__main__':
	try:
		print("Running on 8000")
		app = pyrestful.rest.RestService([feed],debug=True)
		app.listen(8000)
		logging.info("Server running on port %d", 8000)
		tornado.ioloop.IOLoop.instance().start()        
	except KeyboardInterrupt:
		print("\nStop the echo service")



