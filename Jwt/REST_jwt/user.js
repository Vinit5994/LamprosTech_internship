const { mongoose } = require("mongoose");

mongoose.connect("mongodb+srv://vinitpithadiya07:vinit@cluster0.echhr.mongodb.net/",{

}).then(()=>{
    console.log("connected")
})
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:['user' ,'admin'],
        require:true
    }
})

const user = mongoose.model('user',UserSchema);

module.exports = user;