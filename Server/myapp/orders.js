//Import the necessary data
var loki = require("lokijs");

var Repeat = require("repeat");

var db = null;

function save() {
    this.db.saveDatabase(function(err) {
        if(err) {
            console.log(err);
        }
        console.log("saved");
    });
}

function initializeDatabase() {
    var db = new loki("orders.json", {});
    this.db = new loki("orders.json");

    this.db.loadDatabase({}, function(err, data) {
        if(err == null) {
            console.log(data);
            Repeat(save).every(5000, 'ms').start();
        }
    });;
}

function initializeUser(collectionName) {
    if (this.db.getCollection(collectionName) != null) {
        console.log("Warning, collection already exists!");
    } else {
        this.db.addCollection(collectionName);
        this.db.getCollection(collectionName).insert({
            "cart": [],
            "orders": [] 
        });
    }
}

function addOrder(order, array) {
    if(order.uoid == null) {
        console.log("No uoid specified, failure");
    } else  {
        array.push(order);
    }
}

function removeOrder(uoid, array) {
    var id = 0;

    for (var key in currentData) {
        if (currentData[key].uoid == uoid) {
            break;
        }
        id++;
    }

    array.splice(id, 1);
}

exports.initializeDatabase = initializeDatabase;
exports.initializeUser = initializeUser;
exports.db;