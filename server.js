const mongoose = require ('mongoose');

const dotenv = require ('dotenv');
dotenv.config ({ path: './config.env' });

const app = require ('./app');

const DATABASE_CONNECTION_STRING = process.env.DATABASE.replace (
    '<password>', 
    process.env.DATABASE_PASSWORD
);
mongoose.connect (DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then (() => console.log ('Database connection established.'));

const tourSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'A tour must have a name.'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price.']
    }

});

const TourModel = mongoose.model ('Tour', tourSchema);

const PORT = process.env.PORT;
app.listen(PORT, () => 
{
    console.log (`App running on PORT: ${PORT}.`);
});