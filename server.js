import express from 'express'
import mongoose from 'mongoose'

import Pusher from 'pusher'
import cors from 'cors'
import mongoMesaages from './messengerModel.js';


const app =express();
const port =process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1438322",
    key: "82f0943ad9ebfe1043dc",
    secret: "71574bbe0afc5d42c8c2",
    cluster: "ap2",
    useTLS: true
  });

const Url='mongodb+srv://prit:Prit@cluster0.s3rkjks.mongodb.net/messengerDb?retryWrites=true&w=majority'
//.net/dbname>?retry
//dbname- messengerDb
mongoose.connect(Url,{

})

mongoose.connection.once('open',()=>{
    console.log('connected');

    const changeStream =mongoose.connection.collection('messages').watch();
    changeStream.on('change',(change)=>{
        pusher.trigger('messages','newMessage',{
            'change':change
        });
    })
})

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.status(200).send("heello");
})

app.post('/message',(req,res)=>{
const dbmessage=req.body
mongoMesaages.create(dbmessage,(err,data)=>{
    if(err){
        res.status(500).send(err);
    }
    else{
        res.status(201).send(data);
    }
})

})


app.get('/conversation',(req,res)=>{
    mongoMesaages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            data.sort((b,a)=>{
return a.timestamp - b.timestamp;
            });
            res.status(200).send(data);
        }
    })
})



app.listen(port,()=>{
    console.log(`listening on ${port}`);
})

//pusher and cors

//network access  add ip allow from anywhere and confirm

//database access add new database user
//username and passport and add user

//cluster and connect and connect application and copy url