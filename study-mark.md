1.cookie   
* 登录的必要条件
* 最大5kb
* 跨域不共享 (前端和server端必须同域,需要用到nginx做代理,让前后端同域)
* 每次发送http请求,会将请求域的cookie一起发送给server
* server可以修改cookie并返回给浏览器
* 浏览器也可以通过js修改cookie(有限制)
* cookie数据格式k1=v1;k2=v2;k3=v3;


2.session
* session解决了cookie存放用户信息容易暴露隐私
* 实现session相当于用对象存储每个用户访问的key
* 进程内存有限,数据量访问过大时怎么办? (解决方案redis)
* 操作系统会限制一个进程的最大可用内存, 32位系统限制1.6G, 64位也不超过3G
* 进程间的session是不能共享的


3.redis
* 最常用的缓存数据库,数据存放在内存中
* 将session放到redis中,session访问频繁,对性能要求极高
* 相比于mysql,访问速度快(内存和硬盘不是一个数量的)
* 但是成本高
* 将web server和Redis拆分为两个单独的服务
* 双方都是独立的,都是可扩展的(例如都扩展成集群)
* 包括MySQL,也是一个单独的服务,也可扩展
```
redis-server
redis-cli
```

4.nginx如何做反向代理
* nginx一般用于做静态服务/负载均衡 (nodeJS做静态服务有点浪费)
* 反向代理,对客户端不可见的,
* 正向代理,(如公司内网,我们访问不了,需要在本机上装代理)
```
测试配置文件格式是否正确 nginx -t
启动nginx
重启 nginx -s reload
停止nginx -s stop
```

5.后台日志
    a.访问日志 (server端最重要的日志)
    b.自定义日志 (包括自定义时间/错误记录)
通过nodejs文件操作,nodejs stream
日志要存储到文件中,不能存到redis(内存贵成本高)和mysql(需要表结构)
I/O性能瓶颈,使用stream提高性能
日志拆分 {
    按时间划分日志文件
    实现方式: linux(centos,ubuntu)的crontab命令,即定时任务
}
日志分析 {
    通过node自带readline逐行读取
}


6.安全 (web server nodeJS层面的安全)
* sql注入: 窃取数据库内容 -- 使用mysql的escape函数处理输入内容即可
* XSS(Cross-Site Scripting)跨站点脚本攻击: 窃取前端的cookie内容或session_id等信息
* CSRF(Cross-Site Request Forgery)跨站点请求伪造,但实际并不能拿到用户的cookie
* 密码加密: 保障用户信息安全 (重要!) -- 利用node crypto进行md5加密

    

