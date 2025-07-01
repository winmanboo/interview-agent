FROM ubuntu:noble

RUN cd /root/
RUN mkdir workspace

WORKDIR /root/workspace

COPY . /root/workspace

RUN apt-get update && \
    apt install -y mysql-server && \
    apt install -y make build-essential libssl-dev zlib1g-dev \
        libbz2-dev libreadline-dev libsqlite3-dev curl llvm \
        libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev && \
    apt install -y git && \
    apt install -y libmysqlclient-dev default-libmysqlclient-dev mysql-common pkg-config gcc && \
    apt install -y ffmpeg

RUN curl https://pyenv.run | bash

RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc && \
    echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc && \
    echo 'eval "$(pyenv init --path)"' >> ~/.bashrc && \
    echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc && \
    . ~/.bashrc && \
    pyenv install 3.11 && \
    pyenv global 3.11 && \
    pip install --upgrade pip && pip install poetry && poetry install --no-root

COPY script/entrypoint.sh /entrypoint.sh

COPY script/mysql-setup.sh /mysql-setup.sh
RUN chmod +x /mysql-setup.sh

RUN apt-get update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt install -y nodejs
RUN npm install -g pnpm

EXPOSE 8080 5001 3001

ENTRYPOINT ["sh", "/entrypoint.sh"]