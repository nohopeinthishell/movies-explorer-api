const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { profileUpdateValidation } = require('../validation/validation');

router.get('/me', getUserInfo);
router.patch('/me', profileUpdateValidation, updateUserInfo);

module.exports = router;
