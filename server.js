// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    //Object of objects in order to save time.
    var responseJson = [{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '0',
                            temperature: '0'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '8',
                            temperature: '50'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '9.6',
                            temperature: '60'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '11.2',
                            temperature: '70'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '12.8',
                            temperature: '80'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '14.4',
                            temperature: '90'
                        },{
                            bodyMass: '4',
                            specificHeat: '0.04',
                            heatEmitted: '16',
                            temperature: '100'
                        }];

    // configuration =================

    app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
     // api ---------------------------------------------------------------------
    // get all temperature
    app.get('/api/temperature', function(req, res) {

       res.json(responseJson);
    });

    // create todo and send back all todos after creation
    app.post('/api/temperature', function(req, res) {
        //Showing that post request went through successfully through node(db and back end missing).
        console.log(req,"posted");
        res.send("Post went through successfully");

    });