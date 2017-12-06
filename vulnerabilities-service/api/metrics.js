//  metrics.js
//
//  Defines the users api. Add to a server by calling:
//  require('./metrics')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/top_risky_repos', (req, res, next) => {
    options.repository.getTopRiskyRepos().then((repos) => {

      let promises = [];

      repos.forEach((repo) => {
        promises.push(options.repository.getRepoVulnerabilities(repo.name));
      });

      Promise.all(promises).then((data) => {

        data.forEach((d, i) => {
          repos[i].items = d;
        });

        res.status(200).send(repos);

      });

    })
    .catch(next);
  });

  app.get('/vulnerabilities_over_time', (req, res, next) => {
    options.repository.getAllVulnerabilities().then((vulns) => {
      res.status(200).send(vulns.map((vul) => { return {
           id: vul.id,
            detected_on: vul.detected_on,
            reason: vul.reason,
            file_name: vul.file_name,
            line_number: vul.line_number,
            committed_by: vul.committed_by
         };
      }));
    })
    .catch(next);
  });

};
