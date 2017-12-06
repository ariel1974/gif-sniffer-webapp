//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  postVulnerability(vul) {

    return new Promise((resolve, reject) => {

      this.connection.query(`INSERT INTO vulnerabilities (repo_name, reason, file_name, line_number, committed_by) 
          VALUES('${vul.repo_name}','${vul.reason}','${vul.file_name}',${vul.line_number},'${vul.committed_by}')`, (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured posting Vulnerability: ' + err));
        }

        resolve({status: 'ok'});
      });

    });
  }

  getTopRiskyRepos() {
    return new Promise((resolve, reject) => {

      this.connection.query(`SELECT repo_name as name, count(*) as count FROM 
          vulnerabilities GROUP BY repo_name ORDER BY count(*) DESC`, (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured getting the users: ' + err));
        }

        resolve((results || []).map((repo) => {
          return {
            name: repo.name,
            count: repo.count
          };
        }));
      });

    });
  }

  getRepoVulnerabilities(repo_name) {
    return new Promise((resolve, reject) => {

      this.connection.query(`SELECT * FROM vulnerabilities WHERE repo_name = '${repo_name}'`, (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured getting the users: ' + err));
        }

        resolve((results || []).map((vul) => {
          return {
            id: vul.id,
            detected_on: vul.detected_on,
            reason: vul.reason,
            file_name: vul.file_name,
            line_number: vul.line_number,
            committed_by: vul.committed_by
          };
        }));
      });

    });
  }

  getAllVulnerabilities() {
    return new Promise((resolve, reject) => {

      this.connection.query(`SELECT * FROM vulnerabilities ORDER BY detected_on`, (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured getting the users: ' + err));
        }

        resolve((results || []).map((vul) => {
          return {
            id: vul.id,
            detected_on: vul.detected_on,
            reason: vul.reason,
            file_name: vul.file_name,
            line_number: vul.line_number,
            committed_by: vul.committed_by
          };
        }));
      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
