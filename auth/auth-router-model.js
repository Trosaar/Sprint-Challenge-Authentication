const db = require('../database/dbConfig.js')

module.exports = {
	add,
	findById,
	findAll
}

function add(user) {
	return db('users').insert(user).then(ids => {
		return findById(ids[0])
	})
}

function findById(id) {
	return db('users').where({ id }).first();
}

function findAll() {
	return db('users')
}