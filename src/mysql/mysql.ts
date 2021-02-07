import mysql = require('mysql')

export default class MySQL {
  private static _instance: MySQL

  cnn: mysql.Connection;
  connected: boolean = false

  constructor() {
    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: "admin",
      password: "123456",
      database: "my_db"
    })

    this.connectDB()
  }

  public static get instance() {
    return this._instance || (this._instance = new this())
  }

  static executeQuery(query: string, callback: Function) {
    // not this.cnn 'cause it is a static method
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if(err) {
        console.log('Query error', err)
        return callback(err)
      }

      if(results.length === 0) {
        callback("No records")
      } else{
        callback(null, results)
      }



    })
  }

  private connectDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if(err) {
        return
      }

      this.connected = true;
      console.log('Connected to DB')
    });
  }
}