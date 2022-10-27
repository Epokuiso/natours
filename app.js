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

let tours = JSON.parse(fileSystem.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


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
    const requestedTour = tours.find (tour => tour.id == id);

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

app.patch ('/api/tours/:id', (request, response) =>
{
    
    const propertiesToUpdate = Object.keys (request.body);
    let updatedTour = tours.find (tour => tour.id == request.params.id);

    if (!updatedTour)
        return response.status (400).json ({ status: "failed", message: "Invalid Id" });
    
    propertiesToUpdate.forEach (property => 
    {
        if (property == 'duration')
            updatedTour[property] = +request.body[property]
        updatedTour[property] = request.body[property]    
    });
    tours[tours.findIndex(tour => tour.id == updatedTour.id)] = updatedTour;
    
    fileSystem.writeFile (`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {});

    response.status (200)
    .json ({
        status: "success",
        data: updatedTour
    });
});

app.delete ('/api/tours/:id', (request, response) =>
{
    
    let tourToBeRemoved = tours.find (tour => tour.id == request.params.id);

    if (!tourToBeRemoved)
        return response.status (400).json ({ status: "failed", message: "Invalid Id" });
    
    tours = tours.filter (tour => tour.id !== tourToBeRemoved.id);
    fileSystem.writeFile (`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {});

    response.status (204)
    .json ({
        status: "success",
        data: null
    });
});



const PORT = 3000;
app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});