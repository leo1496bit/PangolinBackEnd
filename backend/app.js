const { ObjectId } = require('bson')
const express = require('express')
const bd = require('./requeteBd')
const app = express()
const port = 3000
let db;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
user={
    nom:"test3",
    pass:"pass",
    age:18,
    famille:"hybrid",
    race:"animal",
    nourriture:['fruit','viande']
}
bd.connect().then(dbb=>{
    db=dbb;
//     bd.createUser(dbb,user,(resp)=>{
//     console.log(resp)
// })

})


app.post('/inscription',function(req,res,next){
    try{
        let user=req.body
    bd.createUser(db,user,(resul)=>{
        if(resul){
            res.status(200)
            res.json({statut:200,message:'utilisateur crée',data:resul})
            next()
        }
        else{
            res.status(400).json({error:'erreur operation'})
            next()
        }
        
    })
    }catch(err){
        next(err)
    }
    

})
app.post('/connexion',function(req,res,next){
    try{
        let user=req.body
        bd.login(db,user,(resul)=>{
            if(resul){
                console.log(resul)
                res.status(200)
                res.json({statut:200,message:'reussi',data:resul})
                next()
            }
            else{
                res.status(400).json({error:'echec de connexion'})
                next()
            }
        })
    }catch(err){
        next(err)
    }
})
app.get('/info/:id',function(req,res){
    try{
        console.log(req.params.id)
        bd.findInfos(db,ObjectId(""+req.params.id+""),(data)=>{
            res.status(200)
            res.json(data)
            next(err)
        })
    }catch(err){
        next(err)
    }
   
})
app.put('/update/:id',function(req,res){
    bd.updateInfos(db,ObjectId(""+req.params.id+""),req.body,(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/deleteFriend/:id',function(req,res){
    bd.deleteFriend(db,ObjectId(""+req.params.id+""),ObjectId(""+req.body.id+""),(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/addFriend/:id',function(req,res){
    bd.addFriend(db,ObjectId(""+req.params.id+""),ObjectId(""+req.body.id+""),(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/addNourriture/:id',function(req,res){
    bd.addFood(db,ObjectId(""+req.params.id+""),req.body.food,(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/deleteNourriture/:id',function(req,res){
    bd.deleteFood(db,ObjectId(""+req.params.id+""),req.body.food,(data)=>{
        res.status(200)
        res.json(data)
    })
})

app.get('/all',(req,res) =>{
    bd.findAllFriends(db,(data)=>{
        res.status(200)
        res.json(data)
    })
})
// let id;
// bd.login({login:'test',pass:'pass'},(resp)=>{
//     id=resp._id;
//     console.log(id)

// })
//bd.deleteFriend(ObjectId('6053c3492132251be0cb0d57'),ObjectId('6053c4d734caa474b8ea1431'),(e)=>console.log('reussi'))

app.listen(port)