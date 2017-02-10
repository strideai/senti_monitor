import tornado.ioloop
import pyrestful.rest

from pyrestful import mediatypes
from pyrestful.rest import get
import pymongo,json


conn = pymongo.MongoClient('localhost',27017)              # Mongo Stuff
conn.admin.authenticate('root', 'themenwhopause')
db = conn.news
collection = db.business

class EchoService(pyrestful.rest.RestHandler):
	@get(_path="/echo/{name}", _produces=mediatypes.APPLICATION_JSON)
	def sayHello(self, name):
		return {"Hello":name}

class entity(pyrestful.rest.RestHandler):
	@get(_path="/entity/{name}", _produces=mediatypes.APPLICATION_JSON)
	def sayHello(self, name):
		self.finish()
		return {"Hello":"root"}

	@get(_path="/entity", _produces=mediatypes.APPLICATION_JSON)
	def say(self):
		#print(self.get_argument("q"))
		#try:
			limit = self.get_argument("limit")
			offset = self.get_argument("offset")
			limit = eval(limit)
			offset = eval(offset)
			print limit,offset
			cursor = collection.find()
			cursor.sort('Timestamp',pymongo.DESCENDING).limit(limit)

			json_list = []			
			for i in range(offset,offset+limit):
				val = cursor.next()
				val.pop('_id')
				#val.pop('Article')
				#val.pop('Sent_sentiment')
				#val.pop('Title')
				#val.pop('Entities')
				#val.pop('Subject_sentiment')
				json_list.append(val)
			return json_list#json.dumps([dict(j) for j in json_list])

		#except:
			#pass	
		#return {"Hello":"name"}


if __name__ == '__main__':
			try:
					 print("Start the echo service")
					 app = pyrestful.rest.RestService([EchoService,entity])
					 app.listen(8000)
					 #tornado.ioloop.IOLoop.instance().start()
					 #logging.info("Server running on port %d", options.port)
					 tornado.ioloop.IOLoop.instance().start()        
			except KeyboardInterrupt:
					 print("\nStop the echo service")



