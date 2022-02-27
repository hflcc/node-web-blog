use myblog;
-- show tables;

-- 插入新的数据
-- insert into users (username, `password`, realname) values ('lisi', '123', '李四');


-- select * from users; 
-- select * from users where username='zhangsan' and `password`='123';
-- select id,username from users;
-- 模糊查找
-- select * from users where username like '%zhang%';
-- 通过id正序查找 select * from users where password like '%1%' order by id;
-- 通过id倒序查找 select * from users where password like '%1%' order by id desc;

-- 更新表
-- update users set state='0' where username='lisi';
-- 处理safe update mode报错
-- SET SQL_SAFE_UPDATES=0; 

-- 删除信息 软删除 一般采用字段区别是否删除，不然数据就看不见了， 采用update做软删除 例如字段state 0代表已删除 1未删除 
-- delete from users where username='lisi';

-- 查询数据库版本
-- select version();

