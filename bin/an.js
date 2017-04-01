#!/usr/bin/env node
/**
 * Created by an on 17-3-31.
 */
/**
 * Created by xuexing on 16-11-26.
 */

var config = require("./../conf/global");//生效配置文件，须最先
var cheerio = require('cheerio');
var url = 'http://club.autohome.com.cn/bbs/forum-c-3667-1.html';
//msg为模拟发送的第一条消息，url为目标页面，domain为顶级域名，拼接不完整的href用的
// var msg = {url:"http://club.autohome.com.cn/bbs/forum-c-3667-1.html",domain:"http://club.autohome.com.cn"}
var msg = {url:"http://tieba.baidu.com/f?kw=%C6%FB%B3%B5%D6%AE%BC%D2&fr=ala0&tpl=5",domain:"http://club.autohome.com.cn"}
var mindadieu = {
    express : require('express'),
    M : require("./../model/model"),
    Ctrl : require("./../controller/controller"),
    amqp : require('amqplib'),
    service
        : function (url) {
        var dd = this;
        dd.amqp.connect(config.MQ).then(function(conn) {
            process.once('SIGINT', function() { conn.close(); });
            return conn.createChannel().then(function(ch) {
                var ok = ch.assertQueue('URL_pa', {arguments:{durable: true}});
                ok = ok.then(function(_qok) {
                    return ch.consume('URL_pa', function(msg) {
                        console.log(JSON.parse( msg.content ) );
                        dd.Ctrl.main(JSON.parse( msg.content ));
                    }, {noAck: true});
                });
                return ok.then(function(_consumeOk) {
                    console.log(' [*] Waiting for messages. To exit press CTRL+C');
                    dd.Ctrl.mq(msg);//模拟启动,此处要加顶级域名，url是一个对象,包含入口url和顶级域名；
                });
            });
        }).catch(console.warn)
    }
}
mindadieu.service(url);

