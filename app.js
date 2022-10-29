const express = require ('express');
const morgan = require ('morgan');

const tourRouter = require ('./routes/tourRoutes');
const userRouter = require ('./routes/userRoutes');

const app = express ();
/*----------------------------------------------------------
    Middlewares
-----------------------------------------------------------*/
if (process.env.NODE_ENV === "development")
{
    app.use (morgan ('dev'));
}
app.use (express.json());
app.use (express.static (`${__dirname}/public`));

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
    Routes
-----------------------------------------------------------*/
app.use ('/api/tours', tourRouter);
app.use ('/api/users', userRouter);    

module.exports = app;