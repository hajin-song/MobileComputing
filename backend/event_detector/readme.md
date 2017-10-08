# Real-Time Event Detection from Twitter

This program is implemented to detect real-time event from Twitter. Our implementation is based on the method described in the paper "TopicSketch: Real-Time Bursty Topic Detection from Twitter" and a simple implementation of the method https://github.com/linegroup/topicsketch

Our program is best at detecting a bursty real-time event in Twitter which is defined as an event that triggers a surge of relevant tweets within a short period of time.

## TopicSketch

Topic Sketch is a data sketch which efficiently maintains at a low computational
cost the acceleration of three quantities: the total number of all tweets, the occurrence of each word and the occurrence of each word pair. These accelerations provide as early
as possible the indicators of a potential surge of tweet popularity [1].

## Getting Started

### Data Flow

The data flow is as follows:

tweet harvester ==> stream ==> preprocessor ==> detection component ==> topicsketch ==> detected topic ==> insert into MSSQL

### Tweet harvester

This is a Python implementation of Twitter Streaming API for downloading tweets in real-time. Tweets are inserted into a DocumentDB database in Azure Cosmos DB.

### Tweet stream

Tweet stream calls next() to get raw tweets from Azure Cosmos DB and each tweet is transformed to a tuple (timestamp, user_id, tweet_text) before feeding into preprocessor.

### Stop Words

Put stop words in twitter-stopwords.txt. Define your own stop words file according to your data set.

### Parameters

Set parameters in file "parameters.cnf". We have tuned detection_threshold to get better detection precision.

## Running the Program

You will need to first run Tweet Harvester and then Event Dectector.

### Running Tweet Harvester

python harvester.py config.json stream 0
### Running Event Detector

python main.py

## References

1. W. Xie, F. Zhu, J. Jiang, E. P. Lim and K. Wang, "TopicSketch: Real-Time Bursty Topic Detection from Twitter," 2013 IEEE 13th International Conference on Data Mining, Dallas, TX, 2013, pp. 837-846.
doi: 10.1109/ICDM.2013.86
keywords: {information analysis;social networking (online);TopicSketch;Twitter;real-time bursty topic detection;sketch-based topic model;topic analysis;topic modeling;tweet stream;Acceleration;Equations;Monitoring;Optimization;Real-time systems;Surges;Twitter;TopicSketch;bursty topic;realtime;tweet stream},
URL: http://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=6729568&isnumber=6729471


