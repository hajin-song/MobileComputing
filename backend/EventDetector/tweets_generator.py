"""Fake tweet generator.
This program generates fake tweets to test our event detector that discovers events from Twitter.
When the program runs, it will generate five tweets using five Twitter accounts.
"""
import tweepy
import time

def get_api(cfg):
  auth = tweepy.OAuthHandler(cfg['consumer_key'], cfg['consumer_secret'])
  auth.set_access_token(cfg['access_token'], cfg['access_token_secret'])
  return tweepy.API(auth)

def main():
  cfg1 = {
    "consumer_key"        : "udcGNZTT0qDPnCRPyWtz3dzcQ",
    "consumer_secret"     : "Va2D99ftn08AE8rpMFlYaBE6F72RvyHo4uxGCCrxS8VjpDQT47",
    "access_token"        : "915948503892860929-4jAWjQZFDOUBY7dAqtlwWVKbCLvrHaC",
    "access_token_secret" : "20DtK5QaqgwjfPx3zEP7bBLRBMJiOMF4GpveUcUrPBOHW"
    }

  cfg2 = {
      "consumer_key": "ALNwJ7Unkb2WURTSDqA9o7Aan",
      "consumer_secret": "1vibUNGiegOhQa9WV1FzNGJdFFCyAclnOCna13sFGO9DMPhEWa",
      "access_token": "622442315-Mw1YibQ8XrkB0HvwNblH301Q5uSqV235yzR2P4An",
      "access_token_secret": "HNsNN5FYjjvWhK2VVVbnnKmttKePC0qp9JSbtgKYJxeGV"
  }

  cfg3 = {
      "consumer_key": "BhQoF8gZmuVz3cO5Wr1tRYD2l",
      "consumer_secret": "UTl1gSdauiXFCj6YbEXVmmxDXGl7roqYwuOoEx0l9eG7wJiSVi",
      "access_token": "915950529594875905-gRRXdoH6goyELUi8u1TFVhkx5GLeWjr",
      "access_token_secret": "UXVtahdNCcFU4O1Qvw3KQTywG8jBT2jJi0TBMrstI4Cl4"
  }

  cfg4 = {
      "consumer_key": "z9gSHfgbV8ep7C3XOk6AWGHLV",
      "consumer_secret": "5rGOGhRdaqnU33cnRk8NPd0SBBND205lKXigEhOcxnc1EGORf9",
      "access_token": "915956475582832642-F8KBuksrgkPhka3oJqP3wmuPxDpQFiy",
      "access_token_secret": "ooj6VNetmknDcDx2lXONJIKOaMZnMZ5xcmA5VGh8rdra3"
  }

  cfg5 = {
      "consumer_key": "NbEctbZduTRW2nWZvI26WTA2z",
      "consumer_secret": "9qhNq6jmVZx0XE8zHbQtNfwTEYuw3Qj7drZ6PBXMimLNklsDXv",
      "access_token": "915957718145310722-caKUQ5QExx5pMyLettclK87yUzxLLe2",
      "access_token_secret": "pLtnASzwKkS47pazt2aUJI7O8j8dLmoK4i1sLveuBikLR"
  }


  tweet1 = 'If squid is sotong and octopus is sotong... Which one is the real sotong??????'
  tweet2 = 'I saw smog in Monash. Bushfire?'
  tweet3 = 'I saw smog in Monash. Bushfire?'
  tweet4 = 'I saw smog in Monash. Bushfire?'
  tweet5 = 'I saw smog in Monash. Bushfire?'

  api = get_api(cfg1)
  location_id = '0ec0c4fcacbd0083'#Melbourne
  status = api.update_status(status=tweet1, place_id=location_id)
  print('1')
  time.sleep(5)
  api = get_api(cfg2)
  status = api.update_status(status=tweet1, place_id=location_id)
  print('2')
  time.sleep(5)
  api = get_api(cfg3)
  status = api.update_status(status=tweet1, place_id=location_id)
  print('3')
  time.sleep(5)
  api = get_api(cfg4)
  status = api.update_status(status=tweet1, place_id=location_id)
  print('4')
  time.sleep(5)
  api = get_api(cfg5)
  status = api.update_status(status=tweet1, place_id=location_id)
  print('5')
if __name__ == "__main__":
  main()




