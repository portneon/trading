const router = require('express').Router();
const { getNews } = require('./news.controller');

router.get('/', getNews);

module.exports = router;

