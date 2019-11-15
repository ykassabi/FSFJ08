'use strict';
const Sequelize = require('sequelize');


module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
            title: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: 'The TITLE is required'
                    }
                }
            },
            author: {
                type: Sequelize.STRING,
                validate: {
                    notEmpty: {
                        msg: 'The AUTHOR is required'
                    }
                }
            },
            genre: {
                type: Sequelize.STRING
            },
            year: {
                type: Sequelize.INTEGER
                }
            
    }, {sequelize});

    return Book;
};
