#!/bin/bash

sh /mysql-setup.sh

export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"

export MYSQLCLIENT_CFLAGS="-I/usr/include/mysql"
export MYSQLCLIENT_LDFLAGS="-L/usr/lib/x86_64-linux-gnu -lmysqlclient"

cd /root/workspace/

#tail -f /dev/null

pip install --upgrade pip && pip install poetry && poetry install --no-root

poetry run flask run --host=0.0.0.0 --port=5001 --debug &

poetry run python webrtc/rtc_server.py &

cd web
pnpm install
pnpm run build
pnpm run start