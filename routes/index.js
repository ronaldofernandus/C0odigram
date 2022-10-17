const route = require('express').Router();

route.get('/api', (req, res) => {
  res.status(200).json({ message : `It's working`})
})

const userRoute = require('./user');
const postRoute = require('./post');

route.use('/api/users', userRoute);
route.use('/api/posts', postRoute);


module.exports = route;