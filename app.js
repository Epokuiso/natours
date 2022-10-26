const express = require ('express');

const app = express ();


const PORT = 3000;

app.get ('/', (request, response) =>
{
    
    response
        .status (200)
        .json ({message: 'Hello from the server side.', app: 'Natours'});
}); 


app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});