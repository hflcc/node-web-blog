1.cookie   
* 登录的必要条件
* 最大5kb
* 跨域不共享
* 每次发送http请求,会将请求域的cookie一起发送给server
* server可以修改cookie并返回给浏览器
* 浏览器也可以通过js修改cookie(有限制)
* cookie数据格式k1=v1;k2=v2;k3=v3;


2.session
* session解决了cookie存放用户信息容易暴露隐私
* 实现session相当于用对象存储每个用户访问的key


3.redis


4.nginx如何做反向代理
