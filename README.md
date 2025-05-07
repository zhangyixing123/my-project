### 项目说明

该工程提供了一个直接部署到github服务器的简易页面

#### 使用说明

1. 进入项目根目录，执行`npm install`
2. 执行`npm run build`
3. 执行`npm run deploy`

执行上述命令后，会将dist目录下的文件部署到github服务器上

然后通过 https://zhangyixing123.github.io/my-project/ 直接访问页面
#### 注意事项
 vite.config.js 中的base 必须与github仓库名相同，否则会出现404错误