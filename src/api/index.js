
var express = require('express');
var router = express.Router();


router.post('/bot', function (req, res) {

    let credentials = req.body;
    if (!credentials) {
        res.status(400).send({ text: 'empty body' });
    }
    if (!credentials.host) {
        res.status(400).send({ text: 'host undefined' });
    }
    if (!credentials.username) {
        res.status(400).send({ text: 'username undefined' });
    }
    credentials.verbose = true;

    var bot = require('./minecraft');
    bot.start(credentials, function () {
        res.status(200).send({ status: `bot ${credentials.username} @ ${credentials.host} started` });
    }, function (error) {
        res.status(500).send(error);
    });



});

module.exports = router;