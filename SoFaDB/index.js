// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import Fetch
const fetch = require("node-fetch");
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Enable CORS
app.use(require("cors")());
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Use dis for local use yes ######
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
// Dis for cloud use now ######
//mongoose.connect('mongodb+srv://daveH003:Venlo123!@measurementdb-wv3xk.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
// mongodb+srv://daveH003:Venlo123!@measurementdb-wv3xk.gcp.mongodb.net/test?retryWrites=true&w=majority
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// connect to your specific collection (a.k.a database) that you specified at the end of your URI (/database)
const collection = db.collection("SoFaDB/Permissions");

// Responds to GET requests with the route parameter being the measurement.
// Returns with the JSON data about the Permission (
// Example request: https://mynodeserver.com/Permission41241
app.get("/:Permission", (req, res) => {
    // search the database (collection) for all Permission with the `Permission` field being the `Permission` route paramter
    collection.find({ Permission: req.params.Permission }).toArray((err, docs) => {
        if (err) {
            // if an error happens
            res.send("Error in GET req.");
        } else {
            // if all works
            res.send(docs); // send back all Permissions found with the matching username
        }
    });
});

// Responds to POST requests with the route parameter being the Permission.
// Creates a new Permission in the collection with the `Permission` parameter and the JSON sent with the req in the `body` property
// Example request: https://mynodeserver.com/myNEWusername
app.post("/:Permission", (req, res) => {
    // inserts a new document in the database (collection)
    collection.insertOne(
        { ...req.body, Permission: req.params.Permission }, // this is one object to insert. `requst.params` gets the url req parameters
        (err, r) => {
            if (err) {
                res.send("Error in POST req.");
            } else {
                res.send("Information inserted");
            }
        }
    );
});

// this doesn't create a new Permission but rather updates an existing one by the Permission
// a request looks like this: `https://nodeserver.com/measurement23` plus the associated JSON data sent in
// the `body` property of the PUT request
app.put("/:Permission", (req, res) => {
    collection.find({ Permission: req.params.Permission }).toArray((err, docs) => {
        if (err) {
            // if and error occurs in finding a Permission to update
            res.send("Error in PUT req.");
        } else {
            collection.updateOne(
                { Permission: req.params.Permission }, // if the Permission is the same, update the Permission
                { $set: { ...req.body, Permission: req.params.Permission } }, // update Permission data
                (err, r) => {
                    if (err) {
                        // if error occurs in actually updating the data in the database
                        console.log("Error in updating database information");
                    } else {
                        // everything works! (hopefully)
                        res.send("Updated successfully");
                    }
                }
            );
        }
    });

    // if someone goes to base route, send back they are home.
    app.get("/", (req, res) => {
        res.send("You are home 🏚.");
    });
});

// listen for requests
var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

// The URL for the request.
// Remember that the first route parameter is the username of the user to create
const postURL = 'http://localhost:8080/dan';

// The extra data will be sent in the `body` property of
// the fetch request and stored with the user data in the database (collection)
const extraDataToStore =  {
    api_key_id: 'ObjectID',
    route: '/Resengo/GET',
    post: true,
    get: false,
    put: false,
    delete: false
};

fetch(postURL, {
    method: 'POST', // Using POST request to create a new resource in the database
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(extraDataToStore), // body data type must match "Content-Type" header
})

