const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if (!token) return res.status(401).json({ auth: false, message: 'Token invalid.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        req.user = decoded.user;
        next();
    });
}

const login = (req, res, next) => {
    if (req.body.user === process.env.USER &&
        req.body.password === process.env.PASSWORD) {

        const token = jwt.sign({ user: req.body.user }, process.env.SECRET, {
            expiresIn: 3000
        });
        return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
}

module.exports = {
    verifyJWT,
    login
}