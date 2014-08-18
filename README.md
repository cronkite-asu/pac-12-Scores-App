pac-12-Scores-App
=================

Application to capture Pac-12 Scores and Rosters


Desciption
==========

This application uses the Pac-12 APIs to gather information for sporting events. 

Sources of data
==============

Schools: http://pac12v2.apiary-mock.com/v2/schools

Sports: http://api.pac-12.com/v2/sports

Events: http://api.pac-12.com/v2/sports

Scripts
=======
We use the Pac-12 API for these scripts. You can set other parameters, see this website for details: http://docs.pac12v2.apiary.io/

bin/events.py: This script gets events from the Pac-12 API. The result is downloaded and stored in /json/events.json.

bin/sports.py: This script gets the availale sports from the Pac-12 API. The result file is downloaded and stored in /json/sports.json


Install
=======

* Copy the files to the deplyment webserver
* You will need to CRON the /bin/events.py file in order to get a fresh copy of the events.json file. 

