import pydocumentdb.document_client as document_client
import json
from experiment import exp_config
import ast

uri = exp_config.get('cosmos_db', 'uri')
key = exp_config.get('cosmos_db', 'key')

client = document_client.DocumentClient(uri, {'masterKey': key})
collection = client.ReadCollection('dbs/raw_tweets_db/colls/fake_news')
i = 0
text = 'We spotted a bushfire at the Casuarina Coastal Reserve.'
text1 = 'Australia is very dangerous. I reject moving here. FML.'
user_id = 1000
epoch_time = 1507077610

#client.CreateDocument('dbs/raw_tweets_db/colls/fake_tweets', {'id':'1', 'text':'test'})


while (i < 100):
    jarray = json.dumps({'id':str(i), 'user_id': user_id, 'text': text1, 'epoch_time':epoch_time})
    jdata = ast.literal_eval(jarray)
    print jarray
    client.CreateDocument('dbs/raw_tweets_db/colls/fake_news', jdata)
    int(i)
    i = i + 1
    user_id = user_id + 1
    epoch_time = epoch_time + 1

