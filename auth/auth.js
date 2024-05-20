const jwt = require('jsonwebtoken');
const user = require('../entity/users');


const requaierauth = (req, res, next) => {
    console.log('-----------');
    console.log('-----------');
    console.log('-----------');
    console.log(req.session);
    console.log('-----------');
    console.log('-----------');
    console.log('-----------');
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, '465416', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, '465416', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
            } else {
                console.log(decodedToken);
                let user = await user.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requaierauth, checkuser };
