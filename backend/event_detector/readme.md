# Real-Time Event Detection from Twitter

This program is implemented to detect real-time event from Twitter. Our implementation is based on the method described in the paper "TopicSketch: Real-Time Bursty Topic Detection from Twitter" and a simple implementation of the method https://github.com/linegroup/topicsketch

## Getting Started

### Data Flow

The data flow is as follows:

tweet harvester ==> stream ==> preprocessor ==> detection component ==> topicsketch ==> detected topic ==> insert into MSSQL

### Tweet harvester

This is a Python implementation of Twitter Streaming API for downloading tweets in real-time. Tweets are inserted into a DocumentDB database in Azure Cosmos DB.

#### Running the program

python2 harvester.py \<config\> \<mode\> \<auth_index\>

Where:
\<config\>   -- A json file with configuration information.
\<mode\>     -- Mode of usage (stream or search).
<auth_index> -- Index for authentification information in config.

### Tweet stream

Tweet stream calls next() to get raw tweets from Azure Cosmos DB and each tweet is transformed to a tuple (timestamp, user_id, tweet_text).

### Stop Words

Put stop words in twitter-stopwords.txt. Define your own stop words file according to your data set.

### Parameters

Set parameters in file "parameters.cnf". We might tune detection_threshold to get better detection precision.

## Running the Program

python2 harvester.py config.json stream 0
python2 main.py

