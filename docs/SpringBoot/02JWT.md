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
5. 客户端每次别的请求都要夹带token(http的authorization，是请求头而不是body)，约定前端发送请求头携带token的内容为：Bearer + 空格 + token
6. 服务端每次收到客户端(可以是n个客户端发来的http请求，服务端不再验证密码等)的`携带token的请求` 验证token后放行资源
7. 验证token期间如果token过期或无效，资源将不返回
8. 可以用拦截器减少冗余代码
9. 活跃用户在token未过期时验证token成功可以续签（延长过期时间）或者用户每次请求过来都要修改token的过期时间。否则token失败让前端返回登录页重新登录

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
+ token设置过期时间setExpiration(new Date(new Date().getTime()+N))最好写在try-catch块里



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

### springboot-token集成(入门使用)

- maven引入

``` bash

        <!-- token相关 -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.1</version>
        </dependency>

```
- 简单使用

``` java

import io.jsonwebtoken.*;
import java.util.Date;

public class JwtUtil {

    public static void createJwt(){
        JwtBuilder jwtBuilder  = Jwts.builder()
                .setId("001")
                .setSubject("yiki")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"yiki")
                .claim("myObj","body");//自定义key

        System.out.println("生成："+jwtBuilder.compact());
        parseJwt(jwtBuilder.compact());

    }

    public  static  void parseJwt(String jwt){
       Claims claims = Jwts.parser()
                .setSigningKey("yiki")
                .parseClaimsJws(jwt)
                .getBody();

        System.out.println("解析:"+claims);
    }
}

结果：

生成：eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwMDEiLCJzdWIiOiJ5aWtpIiwiaWF0IjoxNTcyNTAxNTIyLCJteU9iaiI6ImJvZHkifQ.QiYHIgAeMFqx8mivlrA05qZzd7Wyb3H72xH67vsmbFs
解析:{jti=001, sub=yiki, iat=1572501522, myObj=body}

```

- 报错解决

java.lang.NoClassDefFoundError: javax/xml/bind/DatatypeConverter at io.jsonwebtoken.impl.Base64Codec.encode(.....）

  java版本和jar包缺失，如果报错

  手动引入jar

  ``` bash
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

### springboot-token集成（添加拦截器的使用）

1. 使用HandlerInterceptorAdapter和WebMvcConfigurer作为拦截
2. 这部分没有设计springsecurity
3. 这部分只参考简单逻辑
4. 注意

``` java
http.cors().disable();
http.csrf().disable();
```
- 拦截器的配置（InterceptorConfig）

  把该拦截的设置拦截，把该放行的放行，自行添加

``` java
package com.yiki.blog.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.yiki.blog.jwtAuth.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
        .addPathPatterns("/**")
        .excludePathPatterns("/jwt/login/**")
        .excludePathPatterns("/jwt/register/**");

    }

    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druid() {
        return new DruidDataSource();
    }

}

```

- 重写HandlerInterceptorAdapter

  在拦截的地方解析token，然后把权限放进request的请求参数后返回，全部放行

``` java
package com.yiki.blog.jwtAuth;


/*
 * 拦截器
 * */

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println(">>>MyInterceptor1>>>>>>>在请求处理之前进行调用（Controller方法调用之前）");

        String header = request.getHeader("Authorization");
        String token = header.substring(7);

        if (header.startsWith("Bearer ")) {
            try {
                Claims claims = JwtTokenUtils.getTokenBody(token);
                String role = (String) claims.get("role");


                if(role!=null&&role.equals("admin")){
                    request.setAttribute("role","admin");
                }
                if(role!=null&&role.equals("test")){
                    request.setAttribute("role","test");
                }

            } catch (Exception e) {
               throw new RuntimeException("token无效");
            }
        }


        return true;// 只有返回true才会继续向下执行，返回false取消当前请求

    }
}

```

- 你的service需要这样写

``` java
package com.yiki.blog.jwtAuth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Service
public class AuthService {

    @Autowired
    private AuthUserMapper authUserMapper;

    @Autowired
    private HttpServletRequest request;


    /*
     * 插入一条用户
     * 返回：用户的id
     * */
    public JwtResult insertAuthUser(AuthUser authUser) {

        try {
            Integer uid = authUserMapper.insertAuthUser(authUser);
            //在mapper中指定了keyProperty会自动绑定
            return JwtResultUtil.success(uid);

        } catch (Exception e) {
            return JwtResultUtil.error(1, e.getMessage());
        }


    }

    /*
     * 验证用户name&psw
     * 返回：user(除密码）+ token
     * */
    public JwtResult authUser(AuthUser authUser) {
        try {
            AuthUser user
                    = authUserMapper.getAuthUserByNameAndPsw(authUser.getAuth_name(), authUser.getAuth_psw());
            if (user != null) {
                String token = JwtTokenUtils.createToken(user.getAuth_name(), user.getAuth_role(), true);
                HashMap<Object, Object> map = new HashMap<Object, Object>();
                map.put("token", token);
                map.put("user", user);
                return JwtResultUtil.success(map);
            } else {
                return JwtResultUtil.error(1, "不存在该用户/不匹配");
            }

        } catch (Exception e) {
            return JwtResultUtil.error(1, e.getMessage());
        }
    }


    public JwtResult test1(Integer id) {
        try {
            String role = (String) request.getAttribute("role");
            System.out.println(">>>>" + role);
            if (role.equals("admin")) {
                AuthUser user = authUserMapper.getAuthUserById(id);
                if (user != null) {
                    return JwtResultUtil.success(user);
                } else {
                    return JwtResultUtil.error(1, "无此用户");
                }
            } else {
                return JwtResultUtil.error(1, "权限不足");

            }

        } catch (Exception e) {
            return JwtResultUtil.error(405, e.getMessage());
        }

    }

}

```







