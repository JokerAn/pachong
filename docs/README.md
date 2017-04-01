
---
 nodejs + npm + gulp + bower
---
  - gulp + bower 
    * npm安装
    * 安装完成后配置环境变量
    * 即可执行 bower   gulp  命令
  - 引入了express框架和部分依赖包,package.json文件
    ````json
    {
      "name": "express",
      "version": "0.0.0",
      "private": true,
      "scripts": {
        "start": "node ./bin/www"
      },
      "dependencies": {
        "body-parser": "^1.15.2",
        "cheerio": "~0.19.0",
        "cookie-parser": "~1.4.3",
        "debug": "~2.2.0",
        "express": "~4.13.4",
        "gulp-bower": "0.0.13",
        "jade": "~1.11.0",
        "morgan": "~1.7.0",
        "serve-favicon": "~2.3.0"
      },
      "devDependencies": {
        "querystring": "^0.2.0",
        "superagent": "^2.3.0"
      }
    }

    ````
  * 启动服务器命令
    - npm start
    
    
    
  * cookie 模拟登录
    - 引入superagent 发送http请求
    - 登录同时，从请求头中获取服务器发来的cookie
      * res.header['set-cookie']
    - cookie取出后，缺省部分，替换为空，否则，将导致服务器不识别。
