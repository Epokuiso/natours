const express = require ('express');
const fileSystem = require ('fs');
const morgan = require ('morgan');

const tourRouter = require ('./routes/tourRoutes');
const userRouter = require ('./routes/userRoutes');

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

/*----------------------------------------------------------
    2 - Route Handlers 
-----------------------------------------------------------*/

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
app.use ('/api/tours', tourRouter);
app.use ('/api/users', userRouter);    

module.exports = app;