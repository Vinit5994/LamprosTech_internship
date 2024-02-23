var mongoose = require('mongoose');
const express = require('express')
const app = express();
const bodyParser =require('body-parser')

var {Schema} = mongoose;

mongoose.connect('mongodb+srv://vinitpithadiya07:Tiniv07@cluster0.x2ehc8u.mongodb.net/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.json())

const schema = new Schema({
    name: String ,
    surname: String
});

  const Model =  mongoose.model('Test', schema);
  const doc = new Model();

  app.get('/',async (req,res)=>{
   var data = await Model.find({name: "xyz"});
   console.log("data is "+ data[0]._id);
   res.send(data);
  })

  app.post('/student',bodyParser.urlencoded(),async(req,res)=>{  //here bodyparse.urlencoded() because from thunder client data pass in encoded form so make them in json or readeble it require from body-parse module
    
    const user = await Model.create({   //here model.create to add data from user side or into body in thunderclient basically frontend data input
        name: req.body.name,
        surname: req.body.surname,
      });
   
    console.log("hello" + user.name + user.surname);
    user.save()
     res.json(user);
  })

  app.put('/update' ,async(req,res)=>{
    // await Model.findOneAndUpdate({name:"vinit" },{name:"vin"}); //for update one from database
    await Model.updateMany({name:"vinit" },{name:"vin"});
    console.log(Model);
    res.send("Updated");
  })
  app.delete('/delete' , async(req,res)=>{
    await Model.deleteMany({name:null}); //delete data where name is null or not name filed
    res.send("deleted");
  })

db.once('open' , ()=>{
    console.log('connected to MongoDB');
})
app.listen(3000,()=>{
    console.log("listen at 3000")
})