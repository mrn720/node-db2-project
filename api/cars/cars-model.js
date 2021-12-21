const db = require('../../data/db-config')


const getAll = () => {
  return db('Cars')
}

const getById = (id) => {
  return db('Cars').where({id}).first()
}

const create = async (car) => {
  const [id] = await db('Cars').insert(car)
  return getById(id)
}

module.exports = {getAll, getById, create}