'use strict'

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

    require('routes/book/get')(server);

};