# Backend for Detecting Incident By Mining Tweets

## Prerequisites

Python 2.7.10

tweepy

pydocumentdb

json

## Running the program

python2 harvester.py \<config\> \<mode\> \<auth_index\>

Where:
\<config\>   -- A json file with configuration information.
\<mode\>     -- Mode of usage (stream or search).
<auth_index> -- Index for authentification information in config.

### Example

python2 harvester.py config.json stream 0

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
