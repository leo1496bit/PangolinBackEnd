const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'Pangolin'
const client = new MongoClient(url)

exports.connect = ()=>{
    return new Promise((resolve,reject)=>{
        client.connect((err)=>{
            console.log('Connected successfully to server')
            let  db = client.db(dbName)
            resolve(db);
            if(err)
                reject(err)
        })
    })
    
}
exports.createUser=(db,user,callback)=>{
        db.collection('user').insertOne({
            login:user.login,
            pass:user.pass,
            age:user.age,
            famille:user.famille,
            race:user.race,
            nourriture:user.nourritures
         }).then((res)=>callback(res))
    
}
exports.login=(db,userId,callback)=>{

        db.collection('user').findOne({
            login:userId.login,
            pass:userId.pass
         }).then((res)=>callback(res))
    
}
exports.findInfos=(db,userId,callback)=>{
        db.collection('user').findOne({
            _id:userId
         }).then((res)=>callback(res))
}
exports.updateInfos=(db,userId,user,callback)=>{
        db.collection('user').updateOne({
            _id:userId},{$set:{
            age:user.age,
            famille:user.famille,
            race:user.race
        }}
            ).then((res)=>callback(res))
}
exports.addFood=(db,userId,food,callback)=>{
        db.collection('user').updateOne({
            _id:userId},{$addToSet:{
                nourriture:food
        }}
            ).then((res)=>callback(res)).catch((e)=>console.error(e))
}
exports.deleteFood=(db,userId,food,callback)=>{
        db.collection('user').updateOne({
            _id:userId},{$pull:{
                nourriture:food
        }}
            ).then((res)=>callback(res))
}
exports.addFriend=(db,userId,IdFriend,callback)=>{
        db.collection('user').updateOne({
            _id:userId},{$addToSet:{
                friend:IdFriend
        }}
            ).then((res)=>callback(res))
}
exports.findAllFriends=(db,callback)=>{
   
    console.log( db.collection('user').find({}).toArray((err,docs)=>{
        callback(docs)
    })
    )
}
exports.deleteFriend=(db,userId,IdFriend,callback)=>{
        db.collection('user').updateOne({
            _id:userId},{$pull:{
                friend:IdFriend
        }}
            ).then((res)=>callback(res))
       
    
}
