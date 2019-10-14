# 事务

事务是可以一次执行多个命令，本质是一组命令的集合。  
一个事务中的所有命令都会序列化，`按顺序地串行化执行而不会被其他命令插入，不许加塞`

## 常用命令

``` bash
discard             --取消事务，放弃执行事务块内所有命令
exec                --执行所有事务块内地命令
multi               --标记一个事务块的开始
unwatch             --取消watch命令对所有key的监视
watch key [key...]  --监视一个或多个key
                    如果在事务执行之前这个key被其他命令所改动，那么事务将被打断

```

## case1 开启事务

理解：当作原子操作的批处理

``` bash

127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> get k3
QUEUED
127.0.0.1:6379> exec
1) OK
2) OK
3) "v2"
4) OK
5) "v3"


```

## case2 放弃事务

理解：k2没有被改变

``` bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 '1'
QUEUED
127.0.0.1:6379> set k2 '2'
QUEUED
127.0.0.1:6379> set k3 '3'
QUEUED
127.0.0.1:6379> get k1
QUEUED
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> get k3
QUEUED
127.0.0.1:6379> exec
1) OK
2) OK
3) OK
4) "1"
5) "2"
6) "3"
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k2 'change k2'
QUEUED
127.0.0.1:6379> discard
OK
127.0.0.1:6379> get k2
"2"

```

## case3 全体连坐

理解：这个事务所有命令都是失败了

``` bash

127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> get
(error) ERR wrong number of arguments for 'get' command
127.0.0.1:6379> set k4 v4
QUEUED
127.0.0.1:6379> exec
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> keys *
(empty list or set)
```

## case4 watch

 - `悲观锁` (不常用，也许备份的时候用)   
    总是假设最坏的情况，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会阻塞直到它拿到锁（共享资源每次只给一个线程使用，其它线程阻塞，用完后再把资源转让给其它线程）。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。Java中synchronized和ReentrantLock等独占锁就是悲观锁思想的实现。

 - `乐观锁` +version(提交版本必须大于记录当前版本才能执行更新)  
    总是假设最好的情况，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号机制和CAS算法实现。乐观锁适用于多读的应用类型，这样可以提高吞吐量，像数据库提供的类似于write_condition机制，其实都是提供的乐观锁。在Java中java.util.concurrent.atomic包下面的原子变量类就是使用了乐观锁的一种实现方式CAS实现的

 - `CAS(check and set)`


 ### watch case1 (信用卡)

 理解：watch类似乐观锁，事务提交时，如果key的值呗别的客户端修改，整个事务的队列都不会被执行，watch命令在事务执行之前监控了多个keys，倘若在watch之后又任何key的值发生了变化，exec命令执行的事务都将被放弃，且返回null  
 **exec失败后，告知操作者把最新的数据取下来再重新执行一遍**

 A端
 ```bash
127.0.0.1:6379> set balance 100     ---额度100
OK
127.0.0.1:6379> set debt 0          ---负债0
OK
127.0.0.1:6379> keys *
1) "debt"
2) "balance"
127.0.0.1:6379> watch balance
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> decrby balance 20   ---用掉20
QUEUED
127.0.0.1:6379> incrby debt 20      ---负债20
QUEUED



---------未执行时B端修改了balance
127.0.0.1:6379> exec
(nil)
--------

 ```

 B端

``` bash
127.0.0.1:6379> get balance
"80"
127.0.0.1:6379> set balance 800
OK


```

解决:

 A端

``` bash

127.0.0.1:6379> unwatch      ----- 取消watch命令对所有key的监视

...重新执行一遍你要执行的事务


```
 


