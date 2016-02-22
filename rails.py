import requests

url = 'http://localhost:3000/muses/1'

def post_request(state):
	body = {'state': '{}'.format(state)}
	url = 'http://localhost:3000/muses/1'  
	r = requests.patch(url, data=body)
