const express = require('express')
const path = require('path')
const {MongoClient} = require('mongodb')
const cors = require('cors')

const PORT = 3000
const MONGOURL = 'mongodb://localhost:27017/'
const client = new MongoClient(MONGOURL)
const app = express()

app.use(express.json())
app.use(cors())


async function connect(Database = 'Projects', Collection = 'LoginDataBase') {
    const mongoConnect = await client.connect((err)=>{
        if (err){
            console('Error')
            return null
        }
    })
    const mongoDatabase = await mongoConnect.db(Database)
    const mongoCollection = await mongoDatabase.collection(Collection)
    return mongoCollection
}

app
    .route('/')
    .get(async(req,res)=>{
        const db = await connect()
        if (db===null){
            res.status(404).send('Error Connecting MongoDB DataBase')
        }
        else{
            const result = await db.find().toArray()
            res.json(result)
        }  
    })
    .post(async(req,res)=>{
        const db = await connect()
        if (db===null){
            res.status(404).send('Error Connecting MongoDB DataBase')
        }
        else{
            console.log(req.body)
            db.insertOne(req.body)
            res.status(200)
        } 
    })


app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`)
})