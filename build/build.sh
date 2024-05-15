# 捕捉异常：遇到错误则停止执行
set -e
# 使用 nvm 切换 node 版本：<20.12.2>
nvm use 20.12.2
# 打包
vite build
