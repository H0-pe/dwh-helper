var sqlite = require('sqlite3');

var db = new sqlite.Database('C:\\Users\\godga\\DataGripProjects\\Dummy\\indentifier.sqlite');


db.serialize();