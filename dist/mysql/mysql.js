"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.connected = false;
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: "admin",
            password: "123456",
            database: "my_db"
        });
        this.connectDB();
    }
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    MySQL.executeQuery = function (query, callback) {
        // not this.css 'cause it is a static method
        this.instance.cnn.query(query, function (err, results, fields) {
            if (err) {
                console.log('Query error', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("No records");
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.prototype.connectDB = function () {
        var _this = this;
        this.cnn.connect(function (err) {
            if (err) {
                return;
            }
            _this.connected = true;
            console.log('Connected to DB');
        });
    };
    return MySQL;
}());
exports.default = MySQL;
