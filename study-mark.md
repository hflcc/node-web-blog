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

