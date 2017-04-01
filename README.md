# 工程介绍

## HBase
IP:   192.168.1.34    master

单机模式

用户：Lenovo3  密码： ```tshh@bg^&*```

## 工程部署
sudo npm install
## 工程启动
npm start
## 工程关闭
npm run stop



工程ｄｏｃｋｅｒ　构建目录下：

docker build -t 103.31.151.220:5000/crawler:0.1 .

docker run -it 103.31.151.220:5000/crawler:0.1

docker push 103.31.151.220:5000/crawler:0.1 

配置文件：　
/src/crawler/conf/global.js 

http://103.31.151.220:9999/web_csg/crawler/blob/master/conf/global.js



## 功能


* 任务
  * [任务提交接口](#任务提交接口)
  * [任务概览接口](#任务概览接口)
  * [任务详情查看接口](#任务详情查看接口)

* 任务实例
  * [任务实例化](#任务实例化)
  * [任务实例启动](#任务实例启动)
  * [任务实例概览接口](#任务实例概览接口)

* 任务实例内容
  * [任务内容详情](#任务内容详情)
  * [任务内容概览](#任务内容概览)
  * [爬虫内容总线输出](#爬虫内容总线输出)

* contentScript判定
  * 1 gb2312
  * 0 utf-8



#### 执行组件描述

* 一种按照一定的规则，自动地抓取万维网信息的组件

#### 爬取功能设计

* 以web服务方式通过开放http接口方式受理爬取需求（目标网页、爬取规则和爬取内容）


#### 工程开发环境

```
cd ~/project/web_csg/crawler/docker

sudo mkdir -p /data/docker-data/kafka/data/ /data/docker-data/zookeeper/data/  /data/docker-logs/kafka/logs/

sudo rm -rf /data/docker-data/kafka/data/ /data/docker-data/zookeeper/data/   && docker-compose  up
```






#### 任务解决


#### 任务提交接口：
    * 入口参数

```json
{
    "start":"20161202",
    "end":"20161209",
    "priority":"1",   //优先级别
    "hierarchy":"8",    // 层级

    "data":{
        "domain":"163.com",
        "targetUrl":"http://www.baidu.com",
        "referUrl" : [ rurl1, rurl2, ]     // 来源url 路径
        "type":1,                         //  ？？
        "cookie":"ixme_msk...ilk..",   // 登入cookie

        "decisionScript":{     // 在或得当前页面内容后进行“判定” 是否需要提取本页内容
            "contentType": ["text/html" , ... ],    // 通过 contentType 进行判定
            "isRun":"function(){...}"               // 逻辑判定
        },

        "contentScript":{                         //  提取本页面内容
            "init":"function(html,爬去路径){}",
            "Run":"function(){}"                   // 内容返回 [ {ckey: xx , content : yy  } , {ckey: xx2 , content : yy2  } ,... ]
        },

        "nextContentScript":{                     // 生成下一级待爬取页面链接（）
            "init":"function(html,爬取路径){}",
            "Run":"function(){}"                  // 内容返回  [ url1,url2,url3 ]
        }
    }
}
```
        
    * 返回数据

```json
        {
          "status":1,
          "msg":"任务添加成功"
          }
``` 


#### 任务概览接口：

* 入口参数

> GET               /crawler/CrawlerGet/:startRow/:endRow         controllers.crawler.crawlerGet(startRow:Int,endRow:Int)

> http://127.0.0.1:9000/crawler/crawlerGet/2/3


        
    * 返回数据

```json
        {
            "count":"9",
            "dataAll":[
            {
                    "rowkey":"0000000000000002",
                    "data":{
                        "domain":"163.com",
                        "targetUrl":"http://www.baidu.com",
                        "type":1,
                        "cookie":"ixme_msk...ilk..",
                        "decisionScript":{
                            "contentType":"text/html",
                            "isRun":"function(){...}"
                        },
                        "contentScript":{
                            "init":"function(html,爬去路径){}",
                            "Run":"function(){}"
                        },
                        "nextContentScript":{
                            "init":"function(html,爬取路径){}",
                            "Run":"function(){}"
                        }
                    }
                },
               {
                    "rowkey":"0000000000000003",
                    "data":{
                        "domain":"163.com",
                        "targetUrl":"http://www.baidu.com",
                        "type":1,
                        "cookie":"ixme_msk...ilk..",
                        "decisionScript":{
                            "contentType":"text/html",
                            "isRun":"function(){...}"
                        },
                        "contentScript":{
                            "init":"function(html,爬去路径){}",
                            "Run":"function(){}"
                        },
                        "nextContentScript":{
                            "init":"function(html,爬取路径){}",
                            "Run":"function(){}"
                        }
                    }
                }
        ]

``` 



#### 任务详情查看接口

* 入口参数

> GET  /crawler/crawlerGetOne/:Id          controllers.crawler.CrawlerGetOne(Id:Int)

> http://127.0.0.1:9000/crawler/crawlerGetOne/1
        
    * 返回数据

```json
{
    "data":{
        "domain":"163.com",
        "targetUrl":"http://www.baidu.com",
        "type":1,
        "cookie":"ixme_msk...ilk..",
        "decisionScript":{
            "contentType":"text/html",
            "isRun":"function(){...}"
        },
        "contentScript":{
            "init":"function(html,爬去路径){}",
            "Run":"function(){}"
        },
        "nextContentScript":{
            "init":"function(html,爬取路径){}",
            "Run":"function(){}"
        }
    },
    "start":20161202,
    "end":20161209,
    "priority":1,
    "hierarchy":8
}
```


### 任务实例

#### 任务实例化

> http://127.0.0.1:9000/TaskInstance/instance/1

> 返回 : {"entering":{"status":1,"resout":"successful"},"eid":"0000000000000001_1481613232"}


#### 任务实例概览接口

* 入口参数

> GET               /TaskInstance/taskInstanceGet/:rowkey/:starttime/:endtime       controllers.TaskInstance.taskInstanceGet(rowkey:Int,starttime:Int,endtime:Int)

> http://127.0.0.1:9000/TaskInstance/taskInstanceGet/1/1481530000/1482000000
        
    * 返回数据

```json
{
    "count":"4",
    "dataAll":[
            {
                "rowkey":"0000000000000001_1483426344",
                "starts":"1483426344",
                "ends":null,
                "data":{
                    "domain":"163.com",
                    "targetUrl":"http://www.baidu.com",
                    "type":1,
                    "cookie":"ixme_msk...ilk..",
                    "decisionScript":{
                        "contentType":"text/html",
                        "isRun":"function(){...}"
                    },
                    "contentScript":{
                        "init":"function(html,鐖幓璺緞){}",
                        "Run":"function(){}"
                    },
                    "nextContentScript":{
                        "init":"function(html,鐖彇璺緞){}",
                        "Run":"function(){}"
                    }
                }
            },
            {
                "rowkey":"0000000000000001_1483426348",
                "starts":"1483426348",
                "ends":null,
                "data":{
                    "domain":"163.com",
                    "targetUrl":"http://www.baidu.com",
                    "type":1,
                    "cookie":"ixme_msk...ilk..",
                    "decisionScript":{
                        "contentType":"text/html",
                        "isRun":"function(){...}"
                    },
                    "contentScript":{
                        "init":"function(html,鐖幓璺緞){}",
                        "Run":"function(){}"
                    },
                    "nextContentScript":{
                        "init":"function(html,鐖彇璺緞){}",
                        "Run":"function(){}"
                    }
                }
            },
            {
                "rowkey":"0000000000000001_1483426350",
                "starts":"1483426350",
                "ends":null,
                "data":{
                    "domain":"163.com",
                    "targetUrl":"http://www.baidu.com",
                    "type":1,
                    "cookie":"ixme_msk...ilk..",
                    "decisionScript":{
                        "contentType":"text/html",
                        "isRun":"function(){...}"
                    },
                    "contentScript":{
                        "init":"function(html,鐖幓璺緞){}",
                        "Run":"function(){}"
                    },
                    "nextContentScript":{
                        "init":"function(html,鐖彇璺緞){}",
                        "Run":"function(){}"
                    }
                }
            },
            {
                "rowkey":"0000000000000001_1483426351",
                "starts":"1483426351",
                "ends":null,
                "data":{
                    "domain":"163.com",
                    "targetUrl":"http://www.baidu.com",
                    "type":1,
                    "cookie":"ixme_msk...ilk..",
                    "decisionScript":{
                        "contentType":"text/html",
                        "isRun":"function(){...}"
                    },
                    "contentScript":{
                        "init":"function(html,鐖幓璺緞){}",
                        "Run":"function(){}"
                    },
                    "nextContentScript":{
                        "init":"function(html,鐖彇璺緞){}",
                        "Run":"function(){}"
                    }
                }
            }
    ]
}

```

#### 任务实例启动:

```
{
      "rowkey":"0000000000000001_1481613761",
      "hierarchy":"8",
      "data":{
          "domain":"163.com",
          "targetUrl":"http://www.baidu.com",
          "type":1,
          "cookie":"ixme_msk...ilk..",
          "decisionScript":{
              "contentType":"text/html",
              "isRun":"function(){...}"
          },
          "contentScript":{
              "init":"function(html,爬去路径){}",
              "Run":"function(){}"
          },
          "nextContentScript":{
              "init":"function(html,爬取路径){}",
              "Run":"function(){}"
          }
      }
  }

```

### 任务内容详情　


GET               /content/contentGetOne/:Id                    controllers.content.contentGetOne(Id:String)

http://127.0.0.1:9000/content/contentGetOne/0000000000000001_1482810018384_1482810018385

```
{
    "JID":"0000000000000001",
    "EID":"0000000000000001_1482810018384",
    "refers":"undefined",
    "time":"1482810018385",
    "title":"????????????",
    "url":"http://club.autohome.com.cn/bbs/forum-c-2197-200.html?qaType=-1#pvareaid=101061",
    "data":[
        {
            "name":"- ?????? -",
            "val":""
        },
        {
            "name":"- ?????? -",
            "val":""
        },
        {
            "name":"- ??????????????? -",
            "val":""
        },
        {
            "name":"- ???????????? -",
            "val":""
        },
        {
            "name":"- ???????????? -",
            "val":""
        },
        {
            "name":"- ?????? -",
            "val":""
        },
        {
            "name":"- ?????? -",
            "val":""
        }
    ]
}
```

### 任务内容概览 

GET               /content/contentGet/:rowkey/:starttime/:endtime       controllers.content.contentGet(rowkey:String,starttime:Int,endtime:Int)


http://127.0.0.1:9000/content/contentGet/0000000000000001_1482810018384/-1/20161227


```json
{
    "count":"0",
    "dataAll":[
     {
                "jid":null,
                "eid":"0000000000000001_1483436919",
                "url":"http://club.autohome.com.cn/bbs/forum-c-2197-1.html",
                "cid":"0000000000000001_1483436919_1483436932582",
                "time":"1483436932581",
                "title":"????????????",
                "refers":"0000000000000001_1483436919",
                "data":[
                    {
                        "name":"- ?????? -",
                        "val":" A45 AMG ?????????????????? ????????????????????? "
                    },
                    {
                        "name":"- ?????? -",
                        "val":"?????????"
                    },
                    {
                        "name":"- ??????????????? -",
                        "val":"Howlikegb"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2016-12-09"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2017-01-03 17:32"
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    }
                ]
            },
            {
                "jid":null,
                "eid":"0000000000000001_1483436919",
                "url":"http://club.autohome.com.cn/bbs/forum-c-2197-1.html",
                "cid":"0000000000000001_1483436919_1483436932583",
                "time":"1483436932581",
                "title":"????????????",
                "refers":"0000000000000001_1483436919",
                "data":[
                    {
                        "name":"- ?????? -",
                        "val":" A45 AMG ?????????????????? ????????????????????? "
                    },
                    {
                        "name":"- ?????? -",
                        "val":"?????????"
                    },
                    {
                        "name":"- ??????????????? -",
                        "val":"Howlikegb"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2016-12-09"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2017-01-03 17:32"
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    }
                ]
            },
            {
                "jid":null,
                "eid":"0000000000000001_1483436919",
                "url":"http://club.autohome.com.cn/bbs/forum-c-2197-1.html",
                "cid":"0000000000000001_1483436919_1483436932584",
                "time":"1483436932581",
                "title":"????????????",
                "refers":"0000000000000001_1483436919",
                "data":[
                    {
                        "name":"- ?????? -",
                        "val":" A45 AMG ?????????????????? ????????????????????? "
                    },
                    {
                        "name":"- ?????? -",
                        "val":"?????????"
                    },
                    {
                        "name":"- ??????????????? -",
                        "val":"Howlikegb"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2016-12-09"
                    },
                    {
                        "name":"- ???????????? -",
                        "val":"2017-01-03 17:32"
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    },
                    {
                        "name":"- ?????? -",
                        "val":""
                    }
                ]
            }
    ]
}
```

#### 爬虫内容总线输出

* kafka-string 内容

```

* cid 内容ＩＤ
* jid 任务ＩＤ
* eid 实例ＩＤ
* time 爬取时间戳
* refers 父类任务实例集合
* title 当前页面title
* url 当前爬取url
* data 爬取内容 json 格式 { k1:v1 , k2,v2 }

<:>jid<:>eid<:>cid<:>time<:>refers<:>title<:>url<:>{ grap1:'xx',grap2:'yy'}<:>

```

* 输出内容

```json
{


//原始数据：data
"data":{
 "ctitle":"cdata" 
},

//主数据
"masterData":{
 "jobId":1,//任务id
 "exampleId":100 //实例ID
},

//元数据：
"info":{
"targetUrl":"http://www.baidu.com",
"targetTitle":"",
"referUrl":[1,2,4,6,9],
"time":124785//抓取到数据的时间
}

}
```
输出-1 为handle函数中的循环判定条件不进入
输出0 为handle函数中的循环判定条件为进入


