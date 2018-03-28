module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in! 👾' });
  }

  // call next when middleware is complete (think about it as the done callback)
  next();
};
