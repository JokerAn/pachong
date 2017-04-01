#接口初设定构想 





* 接口输入：(http-post)

```json
{
   "target": "http://www.curl.com./",  //目标url
   
    
   //singleton  -- 单页面
   "type": "singleton" ,  //爬取类型
   "contentScript" : {
      "key1": "dom.input.xx",
      "key2": "dom.a.yy"
   } ,
   
   //urlRule  -- url规则
   "type": "urlRule" ,  //爬取类型
   "urlScript": [
   /* 在urlRule 模式下
     target的url可使用 占位符 (类： #title#) 进枚举规则替换
   */
     {"title":"xx","limit":1},
     {"title":"xx","limit":2}
   ],
   "contentScript" : {
      "key1": "dom.input.xx",
      "key2": "dom.a.yy"
   } ,
   
   //recursion  -- 递归
   "type": "recursion" ,
   "urlScript": {
      "level": 8,    //递归深度
      "Yes": [ "res1","res2"],  // 正则匹配白名单url,可空
      "No": ["res1","res2"]    // 正则匹配黑名单,可空
   },
   "contentScript" : {
      "key1": "dom.input.xx",
      "key2": "dom.a.yy"
   },
  
   //输出
   "output"  : {
      "type": "HTML" // 或者kafka
   }
   
}
```

结果输出：

```json

//基于outputType  HTML 全部返回 ,kafka 拆分后为按消息返回
{
  "url":"http://xx",
  "refer": ["http://yy1" , "http://yy2" ,"http://yy3" ],
  "output": {
     "key1": "html text",
     "key2": "html text"
  }
}

```
