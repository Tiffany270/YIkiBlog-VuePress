#  mysql-基础操作

## DDL
对数据库内部对象进行创建、删除、修改
-  自带的数据库
    - `information_schema` 数据库对象信息
    - `cluster` 数据库集群信息
    - `mysql` 系统的用户权限信息
    - `test` 测试数据库
- 基本操作数据库
``` sql
> use yiki;                 -- 切换数据库
Database changed
> show tables;              -- 显示所有表
> drop database yiki;       -- 删除库
> desc tname;               -- 查看表的定义（有什么字段）
> alter table t1 rename t2; -- 改表名
```

- 基本新建表

``` sql
-- 格式: create table tname(列名 类型 条件，....)

mysql> create table t1(
e1 varchar(10),
e2 varchar(10),
e3 date,
sal decimal(10,2),
e4 int(1));

Query OK, 0 rows affected, 1 warning (0.01 sec)

```

- 查看表详细
``` sql

-- \g 的含义喂记录能按照字段竖向排列

mysql> show create table t1 \g;
+-------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Table | Create Table                                                                                                                                                                                                                                   |
+-------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| t1    | CREATE TABLE `t1` (
  `e1` varchar(10) DEFAULT NULL,
  `e2` varchar(10) DEFAULT NULL,
  `e3` date DEFAULT NULL,
  `sal` decimal(10,2) DEFAULT NULL,
  `e4` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
+-------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

```
- 修改表
``` sql
-- type format：alter table [tname] modify [e1] [varchar(20)];

-- add format: alter table [tname] add column [e5] [int(3)]

mysql> alter table t1 add column e5 int(10);
Query OK, 0 rows affected, 1 warning (0.01 sec)
Records: 0  Duplicates: 0  Warnings: 1

```

- 修改字段排列顺序
add默认加在表的最后位置，在add/modify/change后有可选项可以修改字段在表中的位置

``` sql
mysql> alter table t1 modify sal decimal(10,2) first;

mysql> alter table t1 add name varchar(10) after age;

``` 

## DML
对数据库**表**中记录的操作，包括`insert/update/delete/select`

- base
```sql

> select * from tname;

```
- insert
``` sql 
-- format: insert into table (f1,f2...) value (f1's value,f2's value);

mysql> insert into t1(e1,e2)value ('e1 value','e2 value');

```

- update
``` sql
-- format : update table [f1=400] where [condition];

mysql> update t1 set sal = 400 where name='yiki1';

```

- delete 
``` sql
-- format: delete from t1,... where [conditon];
mysql> delete from t1 where name='yiki1';

```

- select(only base)
    - base
    ```sql
    >select distinct dno from t1;   -- distinct会去除重复
    ```
    -  聚合
        - having 对分类聚合后的结果再汇总
        - whit rollup 是否对分类聚合后的结果再进行汇总
    - 表连接
        - （外）左连接 left join [t1] on [conditon]
        - （外）右连接 right join [t1] on [conditon]
        - 解释下：这个连接出来的结果是即使两个表有的字段对应为空也会显示出来
    - 记录联合
        - union all
        - union 去除重复
        - 解释下：这个可以连接两个select然后一起显示（注意会合成一个表，如果查一个字段会合成一列的）



