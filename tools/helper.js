const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'monagerDB';


module.exports = {
    find(collectionName, obj, callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
            //选择使用的库
            const db = client.db(dbName);
            //查找数据
            db.collection(collectionName).find(obj).toArray((err, result) =>{
                if (err) throw err;
                callback(result);
                client.close();
            });
        });
    },
    insertOne(collectionName, obj, callback) {
        MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
            const db = client.db(dbName);
            db.collection(collectionName).insertOne(obj,(err,result)=>{
                if(err) throw err;
                client.close()
                callback(result.result)
            })
        });
    },
    tips(res,message,url){
        res.send(`<script> alert('${message}'); window.location='${url}'; </script>`);
    }
}