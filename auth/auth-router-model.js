const db = require('../database/dbConfig.js')

module.exports = {
	add,
	findById,
	findAll
}

function add(user) {
	return db('auth').isert(user).then(ids => {
		return findById(ids[0])
	})
}

function findById(id) {
	return db('auth').where({ id }).first();
}

function findAll() {
	return db('auth').select('id', 'username');
}