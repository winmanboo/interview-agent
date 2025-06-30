#!/bin/bash

service mysql start

mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mingge123';"

mysql -uroot -pmingge123 < /root/workspace/sql/init.sql