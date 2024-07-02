# 捕捉异常：遇到错误则停止执行
set -e
# 使用 nvm 切换 node 版本：<20.12.2>
# 启动测试服务
version=$(node -v)
if [[ $version != "v20."* ]]; then
    echo "当前Node.js版本不是v20,正在切换..."
    nvm use 20
else
    echo "$version node环境已就绪"
fi

cd test
node index.js
