var express = require('express'),
    app = express(),
    objects = [],
    credentials = {
        user: 'testuser',
        pass: 'testpass'
    };

function authenticate(req, res, next) {
    if (!req.headers || !req.headers.authorization || req.headers.authorization !== 'Token 1234567890') {
        return res.status(401).end();
    }
    return next();
}

app.post('/login', function (req, res) {
    if (req.body && req.body.user === credentials.user && req.body.pass === credentials.pass) {
        return res.json({
            authToken: '1234567890'
        });
    }
    return res.status(401);
});

app.get('/objects', authenticate, function (req, res) {

});

app.get('/objects/:id', authenticate, function (req, res) {

});

app.put('/objects', authenticate, function (req, res) {

});

app.post('/objects/:id', authenticate, function (req, res) {

});

app.delete('/objects/:id', authenticate, function (req, res) {

});

app.all('*', function (req, res) {
    res.status(404).end();
});

app.listen(8080);