"""
Main script to call either harvester.

Usage: python3 harvester.py <config> <mode> <auth_index>

Where: <config>     -- A json file with configuration information.
       <mode>       -- Mode of usage (stream or search).
       <auth_index> -- Index for authentification information in config.
"""

import sys
import logging
import json
import tweepy
from harvesterStream import TwitterStreamListener
from harvesterSearch import TwitterSearcher
import pydocumentdb.document_client as document_client
import pydocumentdb.errors as errors

NUM_ARGS = 4
ERROR = 2


def get_database(config):
    with open(config) as fp:
        jconfig = json.load(fp)

        try:
            # Connect to server.
            client = document_client.DocumentClient(jconfig['Servers'][0], {'masterKey': jconfig['Servers'][1]})

            # Check if database exists, create if not.
            db_name = jconfig['DatabaseName']
            try:
                #db = client.CreateDatabase({"id":db_name})
                #print('Database with ID : \'{0}\'  created'.format(db_name))
                # Create a collection
                #collection = client.ReadCollection(db['_self'], {'id': jconfig['CollectionName']})
                try:
                    collection = client.ReadCollection('dbs/raw_tweets_db/colls/raw_tweets_coll')
                    return client, collection
                except errors.DocumentDBError as e:
                    if e.status_code == 404:
                        print('Create new collection')
                        collection = client.CreateCollection('dbs/raw_tweets_db', {'id': jconfig['CollectionName']})
                        return client, collection

            except errors.DocumentDBError as e:
                if e.status_code == 409:
                    print('A database with id \'{0}\' already exists'.format(db_name))
                else:
                    raise errors.HTTPFailure(e.status_code)

        except Exception as e:
            logging.error(str(e))
            sys.exit(2)


def get_credentials(config, auth_index):
    """Read and return credentials from config file."""
    with open(config) as fp:
        jconfig = json.load(fp)

        # Attempt to read authentification details from config file.
        try:
            c_key = jconfig['Authentication'][auth_index]['ConsumerKey']
            c_secret = jconfig['Authentication'][auth_index]['ConsumerSecret']
            a_token = jconfig['Authentication'][auth_index]['AccessToken']
            a_secret = (
                jconfig['Authentication'][auth_index]['AccessTokenSecret']
                )

        except Exception as e:
            logging.error(str(e))
            sys.exit(ERROR)

        return c_key, c_secret, a_token, a_secret


def get_box(config):
    """Return a box representing locations defined in config file."""
    with open(config) as fp:
        jconfig = json.load(fp)

        try:
            box = [
                float(jconfig['Coordinates'][0]),
                float(jconfig['Coordinates'][1]),
                float(jconfig['Coordinates'][2]),
                float(jconfig['Coordinates'][3])
                ]
        except Exception as e:
            logging.error(str(e))
            sys.exit(ERROR)

    return box


def get_geocode(config):
    """Return geocode defined in config file."""
    with open(config) as fp:
        jconfig = json.load(fp)

        try:
            geo = jconfig['Geocode']

        except Exception as e:
            logging.error(str(e))
            sys.exit(ERROR)

    return geo


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    if len(sys.argv) != NUM_ARGS:
        logging.error(
            'invalid number of arguments: <harvester.py> <config.json> <mode> '
            '<auth_index>'
            )
        sys.exit(ERROR)

    config = sys.argv[1]
    mode = sys.argv[2]
    auth_index = int(sys.argv[3])

    client, coll = get_database(config)

    c_key, c_secret, a_token, a_secret = get_credentials(config, auth_index)
    auth = tweepy.OAuthHandler(c_key, c_secret)
    auth.set_access_token(a_token, a_secret)
    api = tweepy.API(auth)

    if mode == 'stream':

        box = get_box(config)
        stream_listener = TwitterStreamListener(client, coll)
        stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
        stream.filter(locations=box, stall_warnings=True, languages=["en"])

    elif mode == 'search':
        geo = get_geocode(config)
        api = tweepy.API(
            auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True
        )
        searcher = TwitterSearcher(api, db, geo, "*")
        searcher.search()

