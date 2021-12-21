const router = require('express').Router()
const Cars = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique, 
    checkVinNumberValid } = require('./cars-middleware')

router.get('/', async (req, res) => {
    try{
        const cars = await Cars.getAll()
        res.json(cars)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    const car = await Cars.getById(req.params.id)
    res.json(car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try{
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 404).json({message: err.message})
})

module.exports = router