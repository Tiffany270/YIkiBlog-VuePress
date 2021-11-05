#  About Nginx

ngix是一个高性能http和反向代理服务器，专为性能优化而开发

## 各类概念

### 正向代理
经过代理服务器访问某个网站，需要用客户端`自行`配置代理，形如用vpn访问google

### 反向代理
客服端无任何代理操作而且也`不知道代理服务器的存在`，将请求隐式经过`反向代理服务器(ngnix)`——转发，获取数据后返回给客户端，可以隐藏真实服务器的IP

### 负载均衡

并发请求量大的时候，将请求分发到多个服务器上
如 客户端---`请求`--->反向代理服务器-->分发---`分配`--->服务器1、服务器2、服务器3

### 动静分离
加快网站解析速度，把动态页面和静态页面由不同的服务器解析，降低单个服务器的压力

## 在CentOs里安装

### 各种依赖
 - gcc 编译环境
 - pcre-devel 正则表达式库
 - zlib 压缩和解压缩的方式
 - OpenSSL 安全套接字层密码库

 ``` bash
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel

 ```

 - 关闭防火墙

 ``` bash
# 安装firewalld 防火墙
yum install firewalld

# 开启服务
systemctl start firewalld.service

# 关闭防火墙
systemctl stop firewalld.service

# 开机自动启动
systemctl enable firewalld.service

# 关闭开机制动启动
systemctl disable firewalld.service

# 查看状态
firewall-cmd --state # running 表示运行

# 在不改变状态的条件下重新加载防火墙
firewall-cmd --reload

# 启用某个服务
firewall-cmd --zone=public --add-service=https # 临时
firewall-cmd --permanent --zone=public --add-service=https # 永久

# 开启某个端口
firewall-cmd --permanent --zone=public --list-services # 服务空格隔开 例如 dhcpv6-client https ss
firewall-cmd --permanent --zone=public --list-ports # 端口空格隔开 例如 8080-8081/tcp 8388/tcp 80/tcp

# 删除置的规则
firewall-cmd --permanent --zone=public --remove-rich-rule="rule family="ipv4" source address="192.168.0.4/24" service name="http" accept"

# 检查设定是否生效
iptables -L -n | grep 21

# 查询服务的启动状态
firewall-cmd --query-service http
firewall-cmd --query-service tcp

 ```

 ### 安装nginx

 - 初步（依次进行命令）

 ``` bash
wget -c https://nginx.org/download/nginx-1.17.0.tar.gz
tar -zxvf nginx-1.17.0.tar.gz
cd nginx-1.17.0
./configure
make
make install
 ```

 - 查找安装的路径
 
 ``` bash
whereis nginx
 ```

 - 启动和停止（路径依据上面的命令）

 ``` bash
cd /usr/local/nginx/sbin/
./nginx
./nginx -s stop
./nginx -s quit
./nginx -s reload
 ```

 - 查看进程

``` bash
 ps aux|grep nginx
```

- 如果是本机虚拟机
用ifconfig查看ip直接打开即可，nginx默认的端口是80端口


## Mongodb

```
默认路径：/var/lin（不记得了）
库存放路径：/data/
log存放路径 /log/

永久运行命令 
[root@vultr ~]# mongod --fork  --dbpath=/data/db --port=27117 -logpath=/data/db.log --logappend


```

## 其他
``` bash
 /usr/bin/ss-server -c /etc/shadowsocks-libev/config.json -u
```



