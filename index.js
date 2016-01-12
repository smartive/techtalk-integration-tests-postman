var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    credentials = {
        user: 'testuser',
        pass: 'testpass'
    },
    ApiModel = require('./ApiModel'),
    Collection = require('./Collection'),
    objects = new Collection();

function authenticate(req, res, next) {
    if (!req.headers || !req.headers.authorization || req.headers.authorization !== 'Token 1234567890') {
        return res.status(401).end();
    }
    return next();
}

app.use(bodyParser.json());

app.post('/login', function (req, res) {
    if (req.body && req.body.user === credentials.user && req.body.pass === credentials.pass) {
        return res.json({
            authToken: '1234567890'
        }).end();
    }
    return res.status(401).end();
});

app.get('/objects', authenticate, function (req, res) {
    return res.json(objects.all()).end();
});

app.get('/objects/:id', authenticate, function (req, res) {
    var obj = objects.find(req.params.id);
    if (!obj) {
        return res.status(404).end();
    }
    return res.json(obj).end();
});

app.put('/objects', authenticate, function (req, res) {
    if (!req.body || !req.body.name) {
        return res.status(400).end();
    }
    return res.json(objects.insert(new ApiModel(req.body.name))).end();
});

app.post('/objects/:id', authenticate, function (req, res) {
    if (!req.params.id || !req.body || !req.body.name) {
        return res.status(400).end();
    }
    var obj = objects.find(req.params.id);
    if (!obj) {
        return res.status(404).end();
    }
    obj.name = req.body.name;
    return res.json(obj).end();
});

app.delete('/objects/:id', authenticate, function (req, res) {
    if (!req.params.id) {
        return res.status(400).end();
    }
    return res.status(objects.remove(req.params.id) ? 204 : 404).end();
});

app.all('*', function (req, res) {
    res.status(404).end();
});

app.listen(8080);