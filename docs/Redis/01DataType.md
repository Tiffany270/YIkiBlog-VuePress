# DataType&Base


## redis五大数据类型
 - `String `  
key-value，二进制安全
 - `Hash`  
k-v对的集合，适用于存储对象，类似于map<string,object>
 - `List`  
 字符串列表，底层是链表
 - `Set`  
 无序无重复集合 hashtable实现
 - `Zset`  
 sorted set 有序无重复集合，每个元素回关联一个double类型的分数，redis通过分数来为集合中的成员进行从小到大的排序，zset的成员是唯一的，但score可以重复 


## 键(key)

``` bash
keys *              --查看所有key
exists [key]        --判断某个key的存在
move [key] [db]     --把key移动到另一个数据库db
ttl [key]           --查看还有多少秒过期
expire [key] xx(s)  --为key设定过期时间（过期是消失了，keys * 访问不到了，-2无生命周期）
type [key]          --查看key类型
```

## String

``` bash
set/get/del/append/strlen             --基本操作
incr/decr/incrby/decrby               --数字操作（必须为数字）
getrange/setrange [num1] [num2]       --获取/增加覆盖指定范围内的值
setex [key] xxS [value]               --(set with expire)
setnx [key] [value]                   --(set if not exist)
mset/mget/msetnx                      --合并操作
getset                                --先get再set
```

## List

``` bash
lpush [listname] [v1 v2 ...]            --创建list并初始化
rpush [listname] [v1 v2 ...]            --插入
lrange [listname] [num1] [num2]         --选取查看某个范围 -1全部
lpop/rpop                               --栈顶/栈底弹出
lindex [key] [num]                      --按照索引获取元素
llen [key]                              --长度
lrem [key] [num] [value]                --删除N个value
ltrim [key] [index1] [index2]           --截取指定范围的值再赋值给原list
rpoplpush [orlist] [targetlist]         --把源listpop一个到push到targetlist
lset [key] [index] [value]              --改value
linsert [key] before/after [v1] [v2]    --在v1前/后 插入 v2

```

## Set

``` bash
sadd/smembers/sismember           --创建/查看/xx是否xx的成员
scard                             --获取集合离得元素个数
srem [key] [value]                --删除元素
srandmember [key]                 --某个整数(随机出)
spop key                          --随机出栈
smove [k1] [k2] [v1]              --k1的v1给k2
sdiff [k1] [k2]                   --差集
sinter [k1] [k2]                  --交集
sunion [k1] [k2]                  --并集

```

## Hash

``` bash
hset [key] [k-v]                       --新建
hget/hmset/hmget/hgetall/hdel          --基本操作
hlen                                   --长度
hexists [key] [value]                  --boolean
hkeys/hvals                            --遍历
hincrby/hincrbyfloat                   --必须跟数字
hsetnx                                 --当且仅当域 field 不存在才被执行==hset

```

## Zset

在set基础上加一个score值，
如
s1  vk1-v1  vk2-v2  vk3-v3
zs1 [score1-v1] [score2-v2] ...

``` bash
zadd ([score] [v]...)                         --创建
zrange                                        --with scores
zrangebysocre key [score1] [score2]           --范围
zrangebysocre key [score1]（[score2]          --范围s1>s2
zrangebysocre key [s1] [s2] limit [n1] [n2]   --范围+下标
zrem [key] [v]                                --删除
zcard/zcount [key] [score]
zrank [key] [v]                               --获取下标
zrevrank                                      --逆序下标
zrevrange
zrevragebyscore [key]


```