# nodeviau
Small but flexible node.js MVC web framework based on express.

## Feautures

- MVC (DI) arch
- Caching, debug, sessions and DAO
- HTML\JSON views based on jade\pure json


## Dependencies **
- pg as database (you could use another db)
- pg store as session storage (you could use another storage such as redis) *


\* NOTE: you shouldn't use in-memory storage for sessions. this feauture is only for development.

\** Please see package.json for all dependencies

## Install (as framework)
* Download source code
* Install dependencies
* Rename config/app_nodeviau.js to app.js
* Write your configuration

## Install (as module)
* Run `npm install nodeviau`
* Create directories `controllers`, `schemas`, `models`, `views`, `public` and `runtime`
* Download `config/app_nodeviau.js`, put into folder `config` as `app.js`
* Write your configuration
* Create your index file (such as `./app.js`)

\* NOTE: If you want to use DB and Session, please, run App.db.connection somewhere in your code - it will create table with sessions (auto sync) (or you could set config/app.js db.lazyLoad to false - sync will run immediately after server's start)

## ---
Written and tested on:\
Node.js 7.8, EcmaScript 6

License:\
MIT