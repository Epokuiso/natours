const express = require ('express');
const fileSystem = require('fs');
const morgan = require('morgan');

const app = express ();


/*----------------------------------------------------------
    1 - Middlewares
-----------------------------------------------------------*/
app.use (morgan ('dev'));
app.use (express.json());

app.use ((request, response, next) =>
{
    console.log ("Hello from the middleware.");
    next ();
});

app.use ((request, response, next) =>
{
    request.requestedTime = new Date ().toISOString();
    next ();
});

let tours = JSON.parse(fileSystem.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
/*----------------------------------------------------------
    2 - Route Handlers 
-----------------------------------------------------------*/
const getAllTours = (request, response) => 
{
    response.status (200).json ({
        status: "success",
        results: tours.length,
        requestedTime: request.requestedTime,
        data: tours 
    });
}

const getTour = (request, response) => 
{
    const { id } = request.params;
    const requestedTour = tours.find (tour => tour.id == id);

    if (requestedTour)
        return response.status (200).json ({ status: "success", data: requestedTour });
    response.status (400).json ({ status: "failed", message: "Invalid Id" });
}

const createTour = (request, response) =>
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
}

const updateTour = (request, response) =>
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
}

const deleteTour = (request, response) =>
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
};


/*
app.get ('/api/tours', getAllTours);
app.get ('/api/tours/:id', getTour);
app.post ('/api/tours', createTour);
app.patch ('/api/tours/:id', updateTour);
app.delete ('/api/tours/:id', deleteTour);
*/

/*----------------------------------------------------------
    3 - Routes
-----------------------------------------------------------*/

app.route ('/api/tours')
    .get (getAllTours)
    .post (createTour);


app.route('/api/tours/:id')
    .patch (updateTour)
    .delete (deleteTour);

/*----------------------------------------------------------
    4 - Server Start Settings
-----------------------------------------------------------*/
const PORT = 3000;
app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});