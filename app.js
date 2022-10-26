const express = require ('express');
const fileSystem = require('fs');

const app = express ();
/*
app.get ('/', (request, response) =>
{
    
    response
        .status (200)
        .json ({message: 'Hello from the server side.', app: 'Natours'});
}); 

*/

const tours = JSON.parse(fileSystem.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


app.get ('/api/tours', (request, response) => 
{
    response
        .status (200)
        .json ({
            status: "success",
            results: tours.length,
            data: tours 
        });
});


const PORT = 3000;
app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});