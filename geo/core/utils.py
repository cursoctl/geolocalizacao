import requests
from random import randint
from django.conf import settings
from django.contrib.gis.geoip2 import GeoIP2
from geoip2.errors import AddressNotFoundError  # Correção para captura da exceção

YELP_SEARCH_ENDPOINT = 'https://api.yelp.com/v3/businesses/search'


def yelp_search(keyword=None, location=None):
    headers = {"Authorization": "Bearer " + settings.YELP_API_KEY}

    if keyword and location:
        params = {'term': keyword, 'location': location}
    else:
        params = {'term': 'Pizzaria', 'location': 'São Paulo'}

    r = requests.get(YELP_SEARCH_ENDPOINT, headers=headers, params=params)

    return r.json()


def get_client_data():
    g = GeoIP2()
    ip = get_random_ip()
    try:
        return g.city(ip)
    except AddressNotFoundError:  # Correção na exceção
        return None


def get_random_ip():
    return '.'.join([str(randint(0, 255)) for x in range(4)])
