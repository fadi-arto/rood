const { addUsers } = require('../Models/addUser');
const { token } = require('morgan');
const jwt = require('jsonwebtoken')
const userr = require('../entity/users')


const createToken = async (id) => {
    console.log('--------------------');
    console.log(id);
    console.log('--------------------');

    try {
        const token = await jwt.sign({ id }, '465416', {
            expiresIn: 3600
        });
        console.log('====');
        console.log(token);
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
};

const handleErrors = (err) => {
    // قم بإضافة المنطق المناسب لمعالجة الأخطاء هنا
    console.error(err);
    return { message: 'An error occurred' };
};

module.exports.sighup_post = async (req, res) => {
    console.log("in req");

    const { name, number, password } = req.body;
    try {
        console.log("in try");
        const user = await userr.create({ name, number, password });
        console.log("in create");
        console.log(user._id);
        const token = await createToken(user._id);
        console.log("token");
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 });
        res.status(201).json({ user: user._id });
        console.log("fadi");

    } catch (err) {
        console.log("in error");
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { name, number, password } = req.body;
    try {
        const user = await userr.login(name, number, password); 
        const token = await createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};



// const creatUser = (req, res) => {
//     const data = req.body;
//     addUsers(data, (err, result) => {
//         if (err) {
//             console.log("errors")
//             console.log(err)
//         }
//         else {
//             console.log("user is rejester")
//             res.send(result)
//         }
//     })
// }

