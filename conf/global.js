/**
 * Created by xuexing on 17-1-5.
 */
global.conf = {
    ports : "",
    ip : "",
    MQ : "amqp://user:password@127.0.0.1/my_vhost",
    Kafka : "zookeeper:2181"
}
global.sleep = function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
};
module.exports = global;

