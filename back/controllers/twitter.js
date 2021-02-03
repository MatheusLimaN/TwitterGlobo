const search = (req, res, twitterClient) => {
    twitterClient.untrackAll();
    if (req.body.field != null && req.body.field != "") {
        twitterClient.track(req.body.field);
    }
    res.status(200).json({ field: req.body.field });
}

module.exports = {
    search
}