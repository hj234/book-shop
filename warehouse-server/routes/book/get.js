'use strict'

var Joi = require('joi'),
    Boom = require('boom'),
    Mongoose = require('mongoose'),
    Book = Mongoose.model('Book');

module.exports = function (server) {

    /*
     * Route to get books by (optional) filter
     * Method:  GET
     * Params:  _id - Book's ID (not required)
     *          year - Book's Year (not required)
     *          ...
     *          (doesn't work with queries other than equal, like 'less than' (<), 'greater than' (>), ...)
     *          (no filter returns all the books)
     *
     * Returns: the book's information
     */

    server.route({
        path: '/book',
        method: 'GET',
        config: {
            handler: function (request, reply) {
                Book.find(request.query, (err, books) => {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    } else if (books) {
                        return reply(books[0]);
                    } else {
                        return reply(Boom.badRequest('Book not found.'));
                    }
                })
            }
        }
    });

}