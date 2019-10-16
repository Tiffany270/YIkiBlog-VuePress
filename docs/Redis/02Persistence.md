# Persistence

## RDB(Redis DataBase)

在指定的时间间隔内讲内存中的数据集快照写入磁盘(snapshot)，它恢复时是将快照文件直接读到内存里

 - Redis会单独创建(fork)一个子进程来进行持久化，会先将数据读到一个临时文件中，主进程是不进行任何IO操作的
 - 在进行大规模数据的恢复且对于数据恢复的完整性不是非常敏感，那RDB方面比AOF方式更加高效。
 - RDB在最后一次持久化后数据可能丢失。

 ``` bash
修改 redis.conf
save 900 1
save 120 10 ## 120s内修改十次以上
save 60 10000

 ```
 在客户端两分钟内set之后，出现redis-check-dump

 ``` bash
-rwxr-xr-x. 1 root root   25000 Sep 30 11:00 redis-check-aof
-rw-rw-r--. 1 root root    6328 Sep 19  2014 redis-check-aof.c
-rw-r--r--. 1 root root   33664 Sep 30 11:00 redis-check-aof.o
*-rwxr-xr-x. 1 root root   55840 Sep 30 11:00 redis-check-dump*
-rw-rw-r--. 1 root root   22274 Sep 19  2014 redis-check-dump.c
-rw-r--r--. 1 root root   70264 Sep 30 11:00 redis-check-dump.o
-rwxr-xr-x. 1 root root  395168 Sep 30 11:00 redis-cli
-rw-rw-r--. 1 root root   64223 Sep 19  2014 redis-cli.c
-rw-r--r--. 1 root root  270336 Sep 30 11:00 redis-cli.o
-rw-rw-r--. 1 root root   62862 Sep 19  2014 redis.h
-rw-r--r--. 1 root root  361800 Sep 30 11:00 redis.o
-rwxr-xr-x. 1 root root 2260576 Sep 30 11:00 redis-sentinel
-rwxr-xr-x. 1 root root 2260576 Sep 30 11:00 redis-server

 ```


## AOF(Append Only File)

以日志地形式来记录每个写操作，将Redis执行过地所有写指令记录下来（读操作不记录），只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据

 - redis重启时会根据日志文件地内容将写指令从前到后执行一次以完成数据地恢复工作
 - aof保存的是appendonly.aof文件

 ``` bash
 redis.conf修改开启
 appendonly yes

 ``` 