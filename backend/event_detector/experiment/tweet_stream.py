from datetime import date
import time
import topicsketch.stream as stream
import exp_config
import pydocumentdb.document_client as document_client
import json


class TweetStreamFromDB(stream.ItemStream):

    def __init__(self):
        _start_y = int(exp_config.get('stream', 'start_y'))
        _start_m = int(exp_config.get('stream', 'start_m'))
        _start_d = int(exp_config.get('stream', 'start_d'))

        _end_y = int(exp_config.get('stream', 'end_y'))
        _end_m = int(exp_config.get('stream', 'end_m'))
        _end_d = int(exp_config.get('stream', 'end_d'))

        self.table = exp_config.get('stream', 'table')

        self.dy_start = date(_start_y, _start_m, _start_d)
        self.dy_end = date(_end_y,_end_m,_end_d)

        self.host = exp_config.get('stream', 'host')
        self.user = exp_config.get('stream', 'user')
        self.passwd = exp_config.get('stream', 'passwd')
        self.db = exp_config.get('stream', 'db')

        self.uri = exp_config.get('cosmos_db', 'uri')
        self.key = exp_config.get('cosmos_db', 'key')

        self.client = document_client.DocumentClient(self.uri, {'masterKey': self.key})
        self.collection = self.client.ReadCollection('dbs/raw_tweets_db/colls/raw_tweets_coll')
        self._t = int(time.time()) - 300 #go back in time 5min to at least get some tweets
        self.query = 'SELECT * FROM c WHERE c._ts >= {}'.format(self._t)
        self.result_iterable = self.client.QueryDocuments('dbs/raw_tweets_db/colls/raw_tweets_coll', self.query)
        self.docs = list(self.result_iterable)
        self.cnt = -1

    def next(self):
        if not self.docs:
            time.sleep(5)
            self.result_iterable = self.client.QueryDocuments('dbs/raw_tweets_db/colls/raw_tweets_coll', self.query)
            self.docs = list(self.result_iterable)
            return None

        try:
            self.cnt = self.cnt + 1
            jarray = json.dumps(self.docs[self.cnt])
            jdata = json.loads(jarray)
            self._t = jdata['_ts']
            _user = jdata['user']['id']
            _tweet = jdata['text']
            print(_tweet)
            item = stream.RawTweetItem(self._t, _user, _tweet)
            return item
        except IndexError:
            self.cnt = -1
            self._t += 1
            self.query = 'SELECT * FROM c WHERE c._ts >= {}'.format(self._t)
            self.result_iterable = self.client.QueryDocuments('dbs/raw_tweets_db/colls/raw_tweets_coll', self.query)
            self.docs = list(self.result_iterable)
            return None