"use strict";

const path = require('path');

module.exports = {
    name : 'Nodeviau',
    version: '0.1.2',
    environment: 'dev',
    port: 3000,
    viewPath: path.join(__dirname + '/../', 'views'),
    viewEngine: 'jade',
    viewStaticFolder: 'public',
    locale: 'en-EN',
    defaultLocale: 'en-EN',
    
    components: {
        debug: {
            class : 'debug/Debug',
            logLevel: 'debug',
            transports: [
                'console',
                {'file': {filename: 'runtime/runtime.log'}}
            ]
        },
        db: {
            class: 'db/Db',
            syncOptions: {
                force: false
            },
            lazyLoad: true,
            dsn: '',
            options: {
                logging: false
            },
            encryptKey: 'LKSDF-P9643-IKDJF-KKDEM-82POD'
        },
        session: {
            class: 'web/Session',
            lazyLoad: true,
            config: {
                secret: 'my-secret-key',
                key: '_identity_app_q',
                name: '_identity_app_q',
                cookie: {
                    expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                    httpOnly: true,
                    secure: false
                },
                store: {},
                proxy: true,
                resave: false,
                saveUninitialized: true
            }
        },
        request: {
            class: 'web/Request'
        },
        response: {
            class: 'web/Response'
        },
        user: {
            class: 'web/User'
        }
    },
    defaultController: 'IndexController',
    defaultRoute: 'index',
    errorController: 'ErrorController',

    helmet: {
        contentSecurityPolicy: false,
        expectCt: false,
        dnsPrefetchControl: true,
        frameguard: false,
        hidePoweredBy: true,
        hpkp: false,
        hsts: true,
        ieNoOpen: true,
        noCache: false,
        noSniff: true,
        referrerPolicy: false,
        xssFilter: true
    }
};
