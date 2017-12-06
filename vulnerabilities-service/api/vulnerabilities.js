//  vulnerabilities.js
//
//  Defines the users api. Add to a server by calling:
//  require('./vulnerabilities')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.post('/vulnerabilities', (req, res, next) => {

    options.repository.postVulnerability(req.body).then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
  });

};
