'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title: {
                type: Sequelize.STRING,
                validate: { notEmpty: { msg: 'oops! no empty title is permetied' } }
            },
            author: {
                type: Sequelize.STRING,
                validate: { notEmpty: { msg: 'oops! no empty title is permetied' } }
            },
            genre: Sequelize.STRING,
            year: Sequelize.INTEGER
    }, {sequelize});

    return Book;
};
