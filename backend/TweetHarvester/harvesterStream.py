"""Class to listen to twitter stream using Streaming API."""

import logging
import json
from tweepy.streaming import StreamListener


class TwitterStreamListener(StreamListener):
    """Listen using Twitter Streaming API."""

    def __init__(self, client, coll):
        self.coll = coll
        self.client = client

    def on_data(self, data):
        """Store tweet, if not already seen."""
        jtweet = json.loads(data)

        for keyword in ['hail', 'bushfire', 'carcrash', 'flood', 'fire']:
            if keyword in jtweet['text']:
                jtweet['id'] = str(jtweet['id'])
                print(jtweet)
                document = self.client.CreateDocument(self.coll['_self'], jtweet)
                break

    def on_error(self, status_code):
        """Log error message."""
        logging.error(status_code)
