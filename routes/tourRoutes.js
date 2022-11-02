const router = require ('express').Router();

const { 
    getAllTours, 
    getTour, 
    createTour, 
    updateTour, 
    deleteTour 
} = require ('../controllers/tourController');


router.route ('/')
    .get (getAllTours)
    .post (createTour);

router.route('/:id')
    .get (getTour)
    .patch (updateTour)
    .delete (deleteTour);


module.exports = router;