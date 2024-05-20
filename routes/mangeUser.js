var express = require('express');
var router = express.Router();

const { sighup_post, login_post, logout_get } = require('../Controller/CreatUser');
const { requaierauth } = require('../auth/auth');

router.post('/creatuser', sighup_post);
router.post('/login' ,login_post); 
router.get('/logout', logout_get);


module.exports = router;