const TourModel = require ('../models/tourModel');

const getAllTours = async (request, response) => 
{
    try 
    {
        const tours = await TourModel.find()     

        response.status (200).json ({
            status: "success",
            results: tours.length,
            data: tours 
        });
    }
    catch (error)
    {
        response.status (404).json ({
            status: "failed",
            message: "Error!Data Not Found"
        });
    }
}

const getTour = async (request, response) => 
{
    try 
    {
        const tour = await TourModel.findById (request.params.id);
        response.status (200).json({
            status: "success",
            data: tour
        });
    }
    catch (error)
    {
        response.status(404).json ({
            status: "failed",
            message: "Error!Data not found"
        });
    }
}

const createTour = async (request, response) =>
{
    try 
    {
        const newTour = await TourModel.create (request.body);

        response.status (201).json ({
            status: "success",
            data: newTour 
        });
    }
    catch (error)
    {
        response.status (400).json ({
            status: "failed",
            message: "Invalid data sent"
        });
    }
}

const updateTour = (request, response) =>
{
    /*
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
    
    fileSystem.writeFile (`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {});

    response.status (200)
    .json ({
        status: "success",
        data: updatedTour
    });*/
}

const deleteTour = (request, response) =>
{
    /*
    let tourToBeRemoved = tours.find (tour => tour.id == request.params.id);

    if (!tourToBeRemoved)
        return response.status (400).json ({ status: "failed", message: "Invalid Id" });
    
    tours = tours.filter (tour => tour.id !== tourToBeRemoved.id);
    fileSystem.writeFile (`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {});

    response.status (204)
    .json ({
        status: "success",
        data: null
    });*/
};

module.exports = { 
    getAllTours, 
    getTour,
    createTour,
    updateTour,
    deleteTour
 }