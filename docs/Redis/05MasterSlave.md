# Master/Slave

主从复制，读写分离  
主机数据更新后根据配置和策略，自动同步到备机的m/s机制  
master以读为主  
slave以写为主

## Base

### 不配置主机，配置从机

``` bahs

slaveof ip:端口


```