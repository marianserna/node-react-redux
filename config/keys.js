if (process.env.NODE_ENV === 'production') {
  // We are in production. Return prod keys
  module.exports = require('./prod');
} else {
  // We are in development. Return dev keys
  module.exports = require('./dev');
}
