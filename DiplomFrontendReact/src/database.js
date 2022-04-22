const {Client} = require('pg')

const client = new Client(
    {
        host:'localhost',
        user:"postgres",
        port: 5432,
        password: "20001508",
        database: "postgres"
    }
)

client.connect();
client.query(`SELECT * FROM Пользователь`, (error, res)=>
{
    if(!error){
        console.log(res.rows);
        
    }
    else{
        console.log(error.message);
    }
    client.end;
});