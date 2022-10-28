const router = require ('express').Router();
const { 
    checkTourId,
    getAllTours, 
    getTour, 
    createTour, 
    updateTour, 
    deleteTour 
} = require ('../controllers/tourController');

router.param ('id', checkTourId);

router.route ('/')
    .get (getAllTours)
    .post (createTour);

router.route('/:id')
    .get (getTour)
    .patch (updateTour)
    .delete (deleteTour);


module.exports = router;