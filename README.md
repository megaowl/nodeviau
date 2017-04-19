# nodeviau
Small but flexible node.js MVC framework based on express.

## Feautures:

- MVC (DI) arch
- Caching, debug, sessions and DAO
- HTML\JSON views based on jade\pure json


## Dependencies: **
- node.js that supports ES6 dialect
- express as web-framework
- sequelize.js
- winston
- pg as database (you could use another db)
- pg-hstore as session storage (you could use another storage such as redis) *
- jade as template engine (you could use another engine)
- helmet


\* NOTE: you shouldn't use in-memory storage for sessions. this feauture is only for development.

\** Please see package.json for all dependencies

## Usage:
* Download code
* Install dependencies
* Rename config/app_nodeviau.js to config/app.js
* Write your configuration
* If you want to use DB and Session, please, run App.db.connection somewhere in your code - it will create table with sessions (auto sync) (or you could set config/app.js db.lazyLoad to false - sync will run immediately after server's start)

## ---
Written and tested on:\
Node.js 7.8, EcmaScript 6

License\
MIT