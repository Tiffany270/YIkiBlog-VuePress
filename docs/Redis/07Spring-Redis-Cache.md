# 实战

## Base

``` bash
~= stringredisTemplate

~.opsForValue.set("test","100",60*10,TimeUnit.SECONDS);     --存入数据
~.opsForValue.get("key");
~.boundValueOps("test").increment(-1);                      --val-1
~.boundValueOps("test").increment(1);                       --val+1
~.getExpire("key");                                         --根据key获取过期时间
~.getExpire("key",TimeUnit.SECONDS);                        --根据key获取过期时间
~.delete("key");
~.haskey("key");                                            -- return boolean
~.expire("key",1000,TimeUnit.MILLISECONDS);                 -- 设置过期时间
~.opsForSet().add("key","1","2","3")                        -- 向key放set集合
~.opsForSet().isMember("key","1");
~.opsForSet().members("key");                               -- 获取set集合




```


## Cache

- 要缓存的 Java 对象必须实现 Serializable 接口，因为 Spring 会将对象先序列化再存入 Redis

``` java

import java.io.Serializable;

public class User  implements Serializable {

    private Integer uid;
    private String uname;
    private String uemail;
    private String upassword;
    
    ....//略
    }

```

- 针对某个service缓存

``` java 

package com.yiki.blog.Service;

import com.yiki.blog.bean.User;
import com.yiki.blog.mapper.UserYmlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserYmlMapper usermapper;
    //1.redis注入
    @Autowired
    private RedisTemplate redisTemplate;
    public User getUserbyId(Integer uid) {

        //序列化
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        //2.步骤：
        // a.先从缓存中取出当前对象
        ValueOperations ops = redisTemplate.opsForValue();
        User user = (User) ops.get("user_" + uid);
        // a-1.如果缓存中没有,则存到缓存中
        if (user == null) {
            user = usermapper.getUserById(uid);
            ops.set("user_" + uid, user);
        }

        return user;
    }
}


```

- redis 端观察

post 你的controller之后

``` bash

127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> keys *
1) "user_3"

```