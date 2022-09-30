const axios = require("axios");
const queryString = require('query-string');
require('dotenv').config({ path: '../.env' })

const MessageCode = require('../resources/messages');
const OperationResult = require('../helpers/result');

/**
 * Get all flickr public images
 * @group Gallery
 * @route GET /images
 * @param {string} q.query
 * @produces application/json
 * @consumes application/json
 */
const getAllImages = async (req, res) => {
    try {
        let queryObj = {
            tags: req.query.q,
            format: "json",
            nojsoncallback: 1
        }
        const query = queryString.stringify(queryObj);
        const result = await axios.get(`${process.env.FLICKR_BASE_URL}?${query}`)
        if (result.status !== 200) return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER));
        return res.status(200).jsonp(OperationResult.success(result.data));
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
}


const image = {
    getAllImages
}

module.exports = image;

