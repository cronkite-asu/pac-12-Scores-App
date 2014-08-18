import urllib2
u = urllib2.urlopen('http://api.pac-12.com/v2/events')
localFile = open('/var/www/html/pac-12/json/events.json', 'w')
localFile.write(u.read())
localFile.close()