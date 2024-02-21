var mysql = require('mysql2');
var readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("-----library----");
    rl.question('Choose operation (1: Insert, 2: Update, 3: Delete, 4: Select , 5: Detail about specific book from Id ): ', (answer) => {
        switch (answer) {
            case '1':
                rl.question("book_id  ", (id) => {
                    // console.log(id)
                    rl.question("book_name  ", (book) => {
                        rl.question("price  ", (price) => {
                            var sql = `INSERT into library (id,bookname,price) VALUES ('${id}','${book}','${price}')`
                            connection.query(sql, (err, result) => {
                                if (err) throw err;
                                console.log("data inserted...");
                                rl.close();
                                connection.end();
                            })
                        })
                    })
                })
                break;

            case '2':
                rl.question("enter id to update",(id)=>{
                    rl.question("update bookname" , (book)=>{
                        rl.question("update price ", (price)=>{
                            var sql = `UPDATE library SET bookname ='${book}', price  = '${price}' WHERE id = '${id}' `
                            connection.query(sql , (err ,result)=>{
                                if(err) throw err
                                console.log("record updated");
                                rl.close();
                                connection.end();
                            })
                        })
                    })
                })
                break;

            case '3':
                rl.question("enter id to delete record ",(id)=>{
                    var sql = `DELETE from library WHERE id= '${id}'`
                    connection.query(sql ,(err,result)=>{
                        if(err) throw err
                        console.log("deleted ");
                        rl.close();
                        connection.end();
                    })
                })
                break;
            case '4' :
                var sql  = "select * from library"
                connection.query(sql,(err ,result)=>{
                    if(err) throw err
                    console.log(result);
                    rl.close();
                    connection.end();
                })
                break;
            
            case '5':
                rl.question("enter Id " , (id)=>{
                    var sql =`SELECT * from library WHERE id = '${id}'`
                    connection.query(sql , (err,result)=>{
                        if(err) throw err;
                        console.log(result);
                    })
                })
                break;

            default:  
            console.log('Invalid choice');
            rl.close();
            connection.end();
            break;
        }
    })

})