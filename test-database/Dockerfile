FROM mysql:8

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE vulnerabilities
ENV MYSQL_USER vulnerabilities_service
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d