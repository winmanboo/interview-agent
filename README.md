# 部署

python=3.11

部署前提
```shell

python -m venv .venv
# macos
source .venv/bin/activate
# windows
.venv\Scripts\activate.bat
pip install --upgrade pip
pip install poetry
poetry install
```

设置环境变量
```shell
cp .env.example .env
```
按需修改.env

导入数据库

```shell
mysql -u 用户名 -p 数据库名 < 文件路径.sql
```

## 启动 api server
```shell
flask run --host=0.0.0.0 --port=5001 --debug
```

## 启动 rtc server
```shell
python webrtc/rtc_server.py
```

## 启动 web
```shell
cd web
# 没有就装一下pnpm
pnpm install
pnpm run build
pnpm run start
```

# 简历提交
提交简历用test目录下的resume.txt先测试，后续支持word、pdf等格式
resume.txt内容你可以随意更改，可以让大模型给你生成一个，面试的问题基本上是基于简历提问的