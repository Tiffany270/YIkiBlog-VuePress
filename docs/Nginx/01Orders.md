# Nginx配置实例

## 实例1反向代理

效果：将本机ip或（域名）的80端口直接转发到tomcat的8080端口上

``` bash
whereis nginx               ---查看本机位置
cd /usr/local/nginx/conf    ---打开配置文件的位置
vi nginx.conf               ---编写配置文件

## 修改
  server {
        listen       80;
        server_name  104.168.219.187;           ----修改为本机ip

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            proxy_pass http://127.0.0.1:8080;    ---转发的地址
            index  index.html index.htm;
        }

---然后重启nginx

```


