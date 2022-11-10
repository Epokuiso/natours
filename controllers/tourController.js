const TourModel = require ('../models/tourModel');

const getAllTours = async (request, response) => 
{
    try 
    {
        // Filtering 
        const queryObject = {...request.query};
        const excludeFields = ['page', 'limit', 'sort', 'fields'];
        excludeFields.forEach (field => delete queryObject [field]);
        
        // Advanced Filtering
        let queryString = JSON.stringify (queryObject);
        queryString = queryString.replace (/\b(gte| gt | lte | lt)\b/g, match => `$${match}`);

        // Execute Query
        const query = TourModel.find(JSON.parse (queryString));
        
        
        const tours = await query;

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
            message: error
        });
    }
}

const updateTour = async (request, response) =>
{
    const tourToUpdate = await TourModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });

    try 
    {
        response.status (200).json ({
            status: "success",
            data: tourToUpdate
        });
    }
    catch (error)
    {
        response.status (400).json ({
            status: "failed",
            message: "Error!Verify your parameters"
        })
    }
}

const deleteTour = async (request, response) =>
{
    try
    {
        await TourModel.findByIdAndDelete (request.params.id);

        response.status (200).json ({
            status: "success",
            data: null
        });
    }
    catch (error)
    {   
        response.status (400).json ({
            status: "failed",
            message: "Error!Could not delete the data!"
        });
    }
};

module.exports = { 
    getAllTours, 
    getTour,
    createTour,
    updateTour,
    deleteTour
 }