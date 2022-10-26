const express = require ('express');
const fileSystem = require('fs');

const app = express ();

app.use (express.json());

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

app.get ('/api/tours/:id', (request, response) => 
{
    const { id } = request.params;
    const requestedTour = tours.find (element => element.id == id);

    if (requestedTour)
        return response.status (200).json ({ status: "success", data: requestedTour });
    response.status (400).json ({ status: "failed", message: "Invalid Id" });
});

app.post ('/api/tours', (request, response) =>
{
    const newTourId = tours[tours.length - 1].id + 1;
    const newTour = { id: newTourId, ...request.body };
    tours.push (newTour);

    fileSystem.writeFile (`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => 
    {
        response.status (201)
        .json ({
            status: "success",
            data: newTour 
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});