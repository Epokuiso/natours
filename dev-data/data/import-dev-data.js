const fileSystem = require ('fs');
const mongoose = require ('mongoose');
const TourModel = require('../../models/tourModel');
const dotenv = require ('dotenv');



const tours = JSON.parse(fileSystem.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
//console.log (tours);

dotenv.config({path: 'config.env'});

const DATABASE_CONNECTION_STRING = process.env.DATABASE.replace (
    '<password>', 
    process.env.DATABASE_PASSWORD
);

mongoose.connect (DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then (() => 
{
    console.log ('Database connection established.');
    TourModel.create (...tours);
});

