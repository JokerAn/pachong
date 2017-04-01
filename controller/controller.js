/**
 * Created by an on 17-3-31.
 */

var config = require("./../conf/global");//生效配置文件，须最先
var cheerio = require('cheerio');
var amqp = require('amqplib');
var CTRL = function () {
    var dd = this;
    dd.main = function (msg) {
        var Nightmare = require('nightmare');
        var nightmare = Nightmare({ show: false })
        nightmare
            .goto(msg.url)
            .wait()
            .evaluate(function () {
                // return document.getElementsByClassName('fontblue')[0].innerHTML;
                return document.getElementsByTagName("HTML")[0].innerHTML;
            })
            .end()
            .then(function (result) {
                // 此处发送数据到kafka储存到hbase，用cheerio进一步解析
                dd.k(msg,result);
                dd.next(msg,result);
            })
            .catch(function (error) {
                console.error('Search failed:', error);
            });
    }
}
CTRL.prototype.k = function (msg,context) {
    // console.log(msg,context);
    /*
     * msg里面含有启动后端发来的所有信息，加上context拼接数据结构,故此处仅发送msg和context
     * */
}
CTRL.prototype.next= function (msg,context) {
    var $ = cheerio.load(context);
    //解析拿到的html页面，用类似jq的方法
    // console.log(context);
    var as = $("a"),arrUrl=[];
    console.log($("a"));
    // var as = $("a"),arrUrl=[];
    for(var i=0;i<as.length;i++) {
        arrUrl.push(as.eq(i).attr("href"));
    }
    console.log(arrUrl);
    // this.forward(arrUrl);
    this.forward(msg);
}
CTRL.prototype.forward = function (msg,context) {

    if(i<3){//暂时限制抓3次
        this.mq(msg);//发送符合条件的url
    }
}
var i=0;//计数器  判断跳出，完善后可根据条件退出

CTRL.prototype.mq = function (msg) {//负责发送到rabbit的方法
    amqp.connect(config.MQ)
        .then(function(conn) {
            return conn.createChannel().then(function(ch) {
                var q = 'URL_pa';
                var ok = ch.assertQueue(q, {arguments:{durable: true}  });
                return ok.then(function(_qok) {
                    console.log("已发送%d条",i++)
                    ch.sendToQueue( q, new Buffer( JSON.stringify( msg )));
                    return ch.close();
                });
            }).finally(function() { conn.close(); });     }).catch(console.warn);
}
module.exports = new CTRL();
