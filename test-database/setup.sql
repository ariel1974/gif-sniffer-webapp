create table vulnerabilities (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, detected_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, repo_name TEXT, reason TEXT, file_name TEXT, line_number TINYINT ,committed_by TEXT);
insert into vulnerabilities (repo_name, reason, file_name, line_number, committed_by) values ('sit-svc-metrics', 'reason_1', '/file.txt', 43, 'user');
insert into vulnerabilities (repo_name, reason, file_name, line_number, committed_by) values ('sit-svc-metrics', 'reason_2', '/file.txt', 43, 'user');
insert into vulnerabilities (repo_name, reason, file_name, line_number, committed_by) values ('sit-svc-metrics', 'reason_3', '/file.txt', 43, 'user');
insert into vulnerabilities (repo_name, reason, file_name, line_number, committed_by) values ('sit-svc-metrics', 'reason_4', '/file.txt', 43, 'user');
insert into vulnerabilities (repo_name, reason, file_name, line_number, committed_by) values ('sit-svc-metrics', 'reason_5', '/file.txt', 43, 'user');