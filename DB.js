const config = {
    user: '',
    //password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance localhost\\ DESKTOP-PDVP2LN\\Kirill
    database: 'KarlBotDB',
    port : 1433,
    "options": {
      "encrypt": false,
      "enableArithAbort": false
    }
}

const sql = require('mssql')

sql.on('error', err => {
    // ... error handler
    console.dir('error228')
})
var value =1;
sql.connect(config).then(pool => {
    // Query
    return pool.request()
        .input('input_parameter', sql.Int, value)
        .query('select * from Users ')

  
}).then(result => {
    console.dir(result)
}).catch(err => {
    console.dir('error229')
});