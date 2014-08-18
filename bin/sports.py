import urllib2
u = urllib2.urlopen('http://api.pac-12.com/v2/sports')
localFile = open('/var/www/html/pac-12/json/sports.json', 'w')
localFile.write(u.read())
localFile.close()