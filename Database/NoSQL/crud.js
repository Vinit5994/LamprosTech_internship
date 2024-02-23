
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var mongoose = require('mongoose');
var {Schema} = mongoose;

mongoose.connect('mongodb+srv://vinitpithadiya07:Tiniv07@cluster0.kbt4lgk.mongodb.net/');

const schema = new Schema({
    _id: Number,
    Bookname: String ,
    description: String
});

const Model =  mongoose.model('LibraryData', schema);


    console.log("-----library----");
    rl.question('Choose operation (1: Insert, 2: Update, 3: Delete, 4: ShowAll): ', async(answer) => {
        switch (answer) {
            case '1':
                rl.question("_id",(_id)=>{
                        rl.question("book_name  ", (book) => {
                            rl.question("Description  ", async(des) => {
                                const addBook = await Model.create({
                                    _id : _id ,
                                    Bookname :book,
                                    description: des
                                })
                            addBook.save();
                            // res.json("added")
                            console.log("added")
                            })
                        })  
                    })
                break;

            case '2':
                rl.question("enter id to update",(id)=>{
                    rl.question("update bookname" , (book)=>{
                        rl.question("update book description ", async (des)=>{
                           var idToUpdate = await Model.find({_id : id});
                            console.log(idToUpdate[0].name)
                           await Model.updateOne({Bookname : idToUpdate[0].Bookname }, {Bookname : book});
                           await Model.updateOne({description: idToUpdate[0].description},{description:des});
                           console.log("updated");
                            })
                        })
                    })
                // })
                break;

            case '3':
                rl.question("entter id ", async (id)=>{
                    await Model.deleteOne({_id : id});
                    console.log("deleted");
                })
                break;

            case '4' :
                console.log(await Model.find({}));
                break;

            default:  
            console.log('Invalid choice');
            break;
        }
    })

