# SpringSecurity



- 仅引入
- 目前前后端分离是主流，不要用内置的springsecurity做page了
- jwt见后文

## 依赖

``` xml

  <!--Spring security相关-->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-web</artifactId>
            <version>5.1.5.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-config</artifactId>
            <version>5.1.5.RELEASE</version>
        </dependency>


```


## 配置Config
``` java

package com.yiki.blog.SecurityLearn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//1配置类
@Configuration
@EnableWebSecurity//2启动security过滤器链

//3继承这个配置类
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //4.重写这两个方法


    //7.在登录页用封装好的userdetail
    @Autowired
    private YikiUserDetailService userDetailService;



    /**
     * 5-1代替xml配置的AuthenticationManager（认证管理器）
     * 认证的信息获取
     */
    @Override//
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        /*6.2.A
         * 写死的配置---~硬编码
         * There is no PasswordEncoder mapped for the id “null”
         * 时过境迁，psw报错id为null是因为security默认会对密码解密方式需要定义，也就是{id},若没有则为null，则会报错
         * 记得在设置密码给个加密方式 *

        auth.inMemoryAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .withUser("Admin")
                .password(new BCryptPasswordEncoder().encode("123456"))
                .authorities("Auth");//可以用,追加权限

*/
        /*
        * 6.2 B自定义service类
        * */
        auth.userDetailsService(userDetailService)
                .passwordEncoder(new BCryptPasswordEncoder());;

    }

    /**
     * 5-2.代替之前<http>标签配置
     * 需要拦截资源/角色权限/登录方式：httpBasic,FormLogin）
     * spring拦截到的http会转发到这里
     * 其他：/**全部路径，/*一级路径
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        /*6-1拦截表达式A.httpBasic
        http.authorizeRequests()
                .antMatchers("/**")
                .fullyAuthenticated()
                .and()
                .httpBasic();

                          @isAuthenticated()
                          Returns true if the user is not anonymous
                          @isFullyAuthenticated()
                           Returns true if the user is not an anonymous or a remember-me user
                          @anonymous()
                           只有匿名用户可以访问资源，登录后不允许访问
                          * */

        /*B.formLogin
         * */
        http.cors().disable();
        http.authorizeRequests()
                .antMatchers("/security/*").hasAnyAuthority("ROLE_SEARCH,ROLE_DELETE")
                .and().csrf().disable()//禁止自带跨域
                .formLogin();
    }

}


```

