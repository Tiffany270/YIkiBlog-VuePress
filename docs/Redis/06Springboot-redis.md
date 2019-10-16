# SpringBoot-Redis

ps.整合方案有很多种，在 Spring Boot 中，默认集成的 Redis 就是 Spring Data Redis，默认底层的连接池使用了 lettuce ，开发者可以自行修改为自己的熟悉的，例如 Jedis

代码：[此处查看](https://github.com/Tiffany270/blog-rear-end)

## Spring Data Redis

ps.这里并没有用到jedis 

- 开启redis

- pom文件添加依赖

``` yml

  <!--redis相关-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>

```

- 配置文件

``` yml
spring:
  datasource:<略...>
  redis:
    host: 192.168.1.145
    # Redis服务器连接端口
    port: 6379
    # 连接超时时间（毫秒）
    timeout: 6000
    #默认是索引为0的数据库
    database: 0

```

- testController

StringRedisTemplate 是 RedisTemplate 的子类，两个的方法基本一致，不同之处主要体现在操作的数据类型不同，RedisTemplate 中的两个泛型都是 Object ，意味者存储的 key 和 value 都可以是一个对象，而 StringRedisTemplate 的 两个泛型都是 String ，意味者 StringRedisTemplate 的 key 和 value 都只能是字符串。如果开发者没有提供相关的 Bean ，这两个配置就会生效，否则不会生效。

其他：
    序列化：key会在redis里根据序列化的方式保存

 - 默认序列化
 JdkSerializationRedisSerializer 

 ``` java
    @Autowired
    RedisTemplate redisTemplate;
    public void hello() {
        ValueOperations ops = redisTemplate.opsForValue();
        ops.set("k1", "v1");
        Object k1 = ops.get("k1");
        System.out.println(k1);
    }
 ```

 - StringRedisSerializer 

``` java
    @ResponseBody
    @Controller
    @RequestMapping("/redis")
    public class TestRedisController {

        @Autowired
        RedisTemplate redisTemplate;

        @GetMapping("/helloRedis")
        public void helloredis() {
            redisTemplate.setKeySerializer(new StringRedisSerializer());
            ValueOperations ops = redisTemplate.opsForValue();
            ops.set("k1", "v1");
            Object k1 = ops.get("k1");
            System.out.println(k1);
        }
    }


 ```

 - StringRedisTemplate

 ``` java
 @Autowired
    StringRedisTemplate stringRedisTemplate;
    public void hello2() {
        ValueOperations ops = stringRedisTemplate.opsForValue();
        ops.set("k2", "v2");
        Object k1 = ops.get("k2");
        System.out.println(k1);
    }
 ```

- 测试

浏览器可以试着请求一下

服务器端已经有结果了

``` bash
127.0.0.1:6379> flushdb
OK
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> keys *
1) "k1"

```