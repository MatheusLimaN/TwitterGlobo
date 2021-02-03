const { verifyJWT } = require("../controllers/auth");
const { search } = require("../controllers/twitter");

module.exports = function (app, twitterClient) {
    app.post('/search', verifyJWT, (req, res) => search(req, res, twitterClient));
};
