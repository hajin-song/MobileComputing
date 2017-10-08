# Real-Time Event Detection from Twitter

This program is implemented to detect real-time event from Twitter. The implementation is based on the method described in the paper "TopicSketch: Real-Time Bursty Topic Detection from Twitter".

## Getting Started

### Data Flow

The data flow is as follows. (See main.py.)

tweet harvester ==> preprocessor ==> detection component ==> topicsketch ==> detected topic ==> insert into MSSQL

### Tweet harvester

This is a Python implementation of Twitter Streaming API for downloading tweets in real-time.

#### Prerequisites

Python 2.7.10

tweepy

pydocumentdb

json

#### Running the program

python2 harvester.py \<config\> \<mode\> \<auth_index\>

Where:
\<config\>   -- A json file with configuration information.
\<mode\>     -- Mode of usage (stream or search).
<auth_index> -- Index for authentification information in config.

## Running the Program
python2 harvester.py config.json stream 0
