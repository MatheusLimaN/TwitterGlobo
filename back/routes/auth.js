const { login } = require("../controllers/auth");

module.exports = function (app) {
  app.post('/login', login);
};
