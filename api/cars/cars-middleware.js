const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id)
    if(car){
      req.car = car
      next()
    } else {
      req.status(404).json({message: "Car with ID not found"})
    }
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.VIN){
    res.status(400).json({message: "Must include VIN"})
  } else if(!req.body.Make){
    res.status(400).json({message: "Must include Make"})
  } else if(!req.body.Model){
    res.status(400).json({message: "Must include Model"})
  } else if(!req.body.Mileage){
    res.status(400).json({message: "Must include Mileage"})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)){
    next()
  } else {
    res.status(400).json({message: "Vin is invalid"})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
   const existing = await Cars.getByVin(req.body.vin) 
   if(!existing){
     next()
   }else{
     res.status(400).json("Vin number already exists")
   }
  }catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports= {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}