const db = require('../../data/dbConfig.js');

const createUser = async (newUserObject) => {
    return await db('users').insert(newUserObject);
}

const getUser = async (username) => {
    return await db('users').where({ username }).first();
}

module.exports = { createUser, getUser }