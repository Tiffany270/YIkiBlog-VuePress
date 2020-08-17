# SpringBoot-Jedis

## Base
- pom
    ```
         <dependency>
                <groupId>redis.clients</groupId>
                <artifactId>jedis</artifactId>
                <version>3.2.0</version>
            </dependency>
    ```

- basic code 

    ``` java
    
    // u can run in any main method or others..
    Jedis jedis = new Jedis("149.248.19.225",6379);
            System.out.println(jedis.ping());
    ```

## JedisPool
  - Uitl
  ``` java
    package yiki.mybatis.util;
    import redis.clients.jedis.Jedis;
    import redis.clients.jedis.JedisPool;
    import redis.clients.jedis.JedisPoolConfig;

    // 双端检索 保证线程不会被篡改
    public class JedisPoolUtil {

        private static volatile JedisPool jedisPool = null;
        static String ip = "149.248.19.225";
        static int port = 6379;
        static int timeout = 2000;

        private JedisPoolUtil() {

        }

        public static JedisPool getJedisPoolInstance() {
            if (null == jedisPool) {
                JedisPoolConfig config = new JedisPoolConfig();
                config.setMaxTotal(1024);
                config.setMaxIdle(100);
                config.setMaxWaitMillis(100);
                config.setTestOnReturn(true);
                jedisPool = new JedisPool(config, ip, port);
            }

            return jedisPool;
        }

        public static void release(Jedis jedis) {
            if (null != jedis) {
                jedis.close();
            }
        }
    }

  ```

  - test
  ``` java
  
    @GetMapping("/testJedis")
    public void cleanRedis() {
        Jedis jedis = new Jedis("149.248.19.225", 6379);
        System.out.println(jedis.ping());
//        jedis.set("k1", "k1");
//        jedis.set("k2", "k2");
//        jedis.set("k3", "k3");
        System.out.println(jedis.keys("*"));

    }

    @GetMapping("/testTxt")
    public void txt() {
        Jedis jedis = new Jedis("149.248.19.225", 6379);
        Transaction transaction = jedis.multi();

        transaction.set("k4", "v4");
        transaction.set("k5", "v5");
        transaction.set("k6", "v6");
        transaction.watch("k6");
        String v = jedis.get("k6");
        if (v.equals("v6")) {
            jedis.unwatch();
            //  do it again
        } else {
            transaction.exec();
        }


        // transaction.discard();// above be discarded

    }

    @GetMapping("/testJedisPool")
    public void testJedisPool() {
        JedisPool jedisPool = JedisPoolUtil.getJedisPoolInstance();
        Jedis jedis =null;
        try {
            jedis = jedisPool.getResource();
            jedis.set("A1","A2");
            System.out.println(jedis.keys("*"));
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            JedisPoolUtil.release(jedis);

        }

    }

  ```

## DEBUG

> MISCONF Redis is configured to save RDB snapshots

``` 
[root@vultr bin]# ./redis-cli
127.0.0.1:6379> config set stop-writes-on-bgsave-error no

// or
sysctl vm.overcommit_memory=1

// or 
vim /etc/sysctl.conf
add:
vm.overcommit_memory = 1
```