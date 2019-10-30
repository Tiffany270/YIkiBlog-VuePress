# 鉴权JWT

- 使用springboot(如果你愿意，也可以结合springcloud)
- 使用springSecurity
- BCrypt密码加密(你也可以去了解MD5)
- JWT(JSON Web Token)
- 使用redis

## 加密

- 添加bean

``` java


@SpringBootApplication
public class YikiBlogApplication {



    public static void main(String[] args) {
    // ...略
    }


//添加这个Bean使你可以通过Autowired使用它
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


}

```

- 使用

``` java


@Service
public class JWTservice {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserMapper userMapper;


    public void test(User user){
        String encodePsw = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassWord(encodePsw);
        userMapper.InsertUser(user);

    }
}

```

- 匹配

``` java

  public User loginEcode(User user) {

        User admin = userMapper.getUserByUserName(user.getUsername());
        if (admin != null && bCryptPasswordEncoder.matches(user.getPassword(), admin.getPassword()))
        {
            return admin;

        }
            return null;
    }

```



## Token Auth

### 流程
1. 用户输入密码和用户名请求登录
2. 服务端验证
3. 验证成功->签发token->发送`返回`客户端
4. 客户端保存token到本地（localstore或cookie
5. 客户端每次别的请求都要夹带token(http的authorization)
6. 服务端每次收到客户端(可以是n个客户端发来的http请求，服务端不再验证密码等)的`携带token的请求` 验证token后放行资源
7. 验证token期间如果token过期或无效，资源将不返回

### 优点(面试用)
- 支持跨域(不用再考虑csrf)
- 无状态
- 适用CDN
- 解耦(去耦)
- 移动端适用
- 性能优于其他(more faster)

### token组成

+ JWS实质上是一组字符串string，生成之后返回给客户端是经过`编码`的，默认编码方式是base64
+ token组成的第三部分`签证`(base64之后) = header + payload + salt(盐)**组合加密**生成的  



- 实例

```
解码前
{"alg":"HS256","typ":"JWT"}.//header
{"sub":"Admin",
"jti":"c01f863a-3ac6-4869-8bdd-b66ada4c61c9",
"iat":1572273813}.//payload
+ 签证

//签证(base64之后)=header+payload+salt(盐)组合加密生成的


返回的token：

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.//header
eyJzdWIiOiJBZG1pbiIsImp0aSI6ImMwMWY4NjNhLTNhYzYtNDg2OS04YmRkLWI2NmFkYTRjNjFjOSIsImlhdCI6MTU3MjI3MzgxM30=.//payload
uyKOk73Z1XaegKmU6qRLf4962ZrtI6h6HPkT95UXhjY//签证

```

## ### springboot-token集成

- maven引入

``` xml

        <!-- token相关 -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.1</version>
        </dependency>

```
- 简单使用

``` java

package com.yiki.blog.SecurityLearn;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtCreateUtil {

    public static void createJwt(){
        JwtBuilder jwtBuilder  = Jwts.builder()
                .setId("001")
                .setSubject("yiki")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"yiki");

        System.out.println(jwtBuilder.compact());
        //生成eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJzdWIiOiJ5aWtpIiwiaWF0IjoxNTcyNDI4MDQ2fQ.URckZ1ZyURG1h67wvqk6HsH_rjTjCjnWbHqrQwtEg40
    }
}


```

- 报错解决

java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter at io.jsonwebtoken.impl.Base64Codec.encode(.....）

  java版本和jar包缺失，如果报错

  手动引入jar

  ``` xml
    <groupId>javax.xml.bind</groupId>
          <artifactId>jaxb-api</artifactId>
          <version>2.3.0</version>
      </dependency>
          <dependency>
              <groupId>com.sun.xml.bind</groupId>
              <artifactId>jaxb-impl</artifactId>
              <version>2.3.0</version>
          </dependency>
          <dependency>
              <groupId>com.sun.xml.bind</groupId>
              <artifactId>jaxb-core</artifactId>
              <version>2.3.0</version>
          </dependency>
          <dependency>
              <groupId>javax.activation</groupId>
              <artifactId>activation</artifactId>
              <version>1.1.1</version>
          </dependency>
  ```

  











