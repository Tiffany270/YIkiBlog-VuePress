# 剑指offer


## 03_RepeatNumberInArray
``` java
package CodingInterviews;
/*
*   找出数组中重复的数字。

    在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
    数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
    请找出数组中任意一个重复的数字。

            示例 1：
            输入：
            [2, 3, 1, 0, 2, 5, 3]
            输出：2 或 3

*
* */

import java.util.HashMap;

public class _03_RepeatNumber_In_Array {

    /*
     * Solution : 放到map里面呗
     * */

    public int findRepeatNumber(int[] nums) {

        HashMap<Integer,Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if(map.containsKey(nums[i])){
                return nums[i];
            }

            map.put(nums[i], i);
        }

        return 0;
    }
}

```

## 04_FindNumberIn2DArray

``` java
package CodingInterviews;

/*
*在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
* 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

            示例:
            现有矩阵 matrix 如下：
            [
              [1,   4,  7, 11, 15],
              [2,   5,  8, 12, 19],
              [3,   6,  9, 16, 22],
              [10, 13, 14, 17, 24],
              [18, 21, 23, 26, 30]
            ]
            给定 target = 5，返回 true。
            给定 target = 20，返回 false。
* */
public class _04_FindNumberIn2DArray {

    /*solution
     * 线性查找/从右上角开始
     * x=0,y=m
     * if target!=num[x][y]&&target<num[x][y],y--; //剔除那一列
     * if target!=num[x][y]&&target>num[x][y] x++; //剔除那一行
     * 直到找到为止
     *
     * 注意边界情况，y循环>-1来遍历num[0][0]：
     * */

    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }

        int x = 0, y = matrix[0].length - 1;
        while (y > -1 && x < matrix.length) {
            System.out.println( matrix[x][y]);
            if (target == matrix[x][y]) {
                return true;
            } else if (target != matrix[x][y] && target < matrix[x][y]) {
                y--;
            } else if (target != matrix[x][y] && target > matrix[x][y]) {
                x++;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        _04_FindNumberIn2DArray func = new _04_FindNumberIn2DArray();
        int[][] arr = {
                {1, 4, 7, 11, 15},
                {2, 5, 8, 12, 19},
                {3, 6, 9, 16, 22},
                {10, 13, 14, 17, 24},
                {18, 21, 23, 26, 30}
        };

        int[][] arr2 = {{1, 1}};
        System.out.println(func.findNumberIn2DArray(arr, 5));
    }

}

```

## 05_ReplaceSpace

``` java
package CodingInterviews;

/*
* 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

            示例 1：
            输入：s = "We are happy."
            输出："We%20are%20happy."

NOTE: string: 不可变，每次都是新对象
      StringBuffer 和 StringBuilder 类的对象能够被多次的修改，并且不产生新的未使用对象。
      StringBuilder 线程不安全，速度快
      StringBuffer 慢，线程安全

*/
public class _05_ReplaceSpace {

    public String replaceSpace(String s) {
        StringBuilder builder = new StringBuilder();

        for (Character c : s.toCharArray()) {
            if (c == ' ') {
                builder.append("%20");

            } else {
                builder.append(c);
            }
        }

        return builder.toString();
    }

}

```



## 06_ReversePrint
``` java
package CodingInterviews;

import java.util.LinkedList;

/*
* 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

            示例 1：
            输入：head = [1,3,2]
            输出：[2,3,1]

* */
public class _06_ReversePrint {

    // 压栈后出栈

    public int[] reversePrint(ListNode head) {
        LinkedList<Integer> stack = new LinkedList<Integer>();
        while (head != null) {
            stack.add(head.val);
            head = head.next;
        }

        int[] res = new int[stack.size()];
        for (int i = 0; i < res.length; i++) {
            res[i] = stack.removeLast();

        }


        return res;
    }
}

```

## 09_CQueue
``` java
package CodingInterviews;

import java.util.LinkedList;

/*
*  这题目有毒 :)
* 用两个栈实现一个队列。
* 队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
* 分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

        示例 1：
        输入：
        ["CQueue","appendTail","deleteHead","deleteHead"]
        [[],[3],[],[]]
        输出：[null,null,3,-1]

    题目解读：
    [[],[3],[],[]]对应上面的方法，是上面方法的参数。
    CQueue和deleteHead方法不需要指定数字，只有添加才需要指定数字

        1.创建队列，返回值为null
        2.将3压入栈，返回值为null
        3.将栈底的元素删除，也就是消息队列中先进来的元素，所以是deleteHead，返回该元素的数值，所以为3
        4.继续删除栈底的元素，但是没有元素了，所以返回-1
        所以就有了下面的输出 输出：[null,null,3,-1]

* */
public class _09_CQueue {

    /**
     * Your CQueue object will be instantiated and called as such:
     * CQueue obj = new CQueue();
     * obj.appendTail(value);
     * int param_2 = obj.deleteHead();
     */

    /*
     * 其他：
     * 使用java的同学请注意，如果你使用Stack的方式来做这道题，会造成速度较慢；
     * 原因的话是Stack继承了Vector接口，而Vector底层是一个Object[]数组，那么就要考虑空间扩容和移位的问题了。
     * 可以使用LinkedList来做Stack的容器，因为LinkedList实现了Deque接口，所以Stack能做的事LinkedList都能做，
     * 其本身结构是个双向链表，扩容消耗少。
     * 但是我的意思不是像100%代码那样直接使用一个LinkedList当做队列，那确实是快，但是不符题意
     *
     * API: linkedList add 添加在尾部
     *      linkedList push 添加在头部
     * */
    LinkedList<Integer> stack1;
    LinkedList<Integer> stack2;

    public _09_CQueue() {
        stack1 = new LinkedList<>();
        stack2 = new LinkedList<>();
    }

    public void appendTail(int value) {
        stack1.add(value);

    }

    public int deleteHead() {
        if (this.stack2.isEmpty()) {
            if (stack1.isEmpty()) return -1;
            while (!this.stack1.isEmpty()) {
                this.stack2.add(this.stack1.pop());
            }

            return stack2.pop();
        }

        return this.stack2.pop();
    }

    public static void main(String[] args) {
        _09_CQueue obj = new _09_CQueue();
        obj.appendTail(3);
        int param_2 = obj.deleteHead();
    }

}

```

## 10_Fibonacci

``` java
package CodingInterviews;

/*
* 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

    F(0) = 0,   F(1) = 1
    F(N) = F(N - 1) + F(N - 2), 其中 N > 1.

    斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
    答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

* */
public class _10_Fibonacci {

    /*Solution 1.递归 时间复杂度O(n^2) 浪费 2.递归结果用数组保存 浪费额外空间O(n)
    BEST:
    DP: dp[i+1] = dp[i]+dp[i-1],  dp[0]=0, dp[1] = 1 ,return dp[n]

    chart: i    [0 , 1, 2 , 3 , 4 , 5 ]
           dp    0   1  1   2   3   5

     NOTE：这种题目在于公式一致，只需要不同的初始值
     青蛙跳台阶问题： f(0)=1f(0)=1 , f(1)=1f(1)=1 , f(2)=2f(2)=2
     斐波那契数列问题： f(0)=0f(0)=0 , f(1)=1f(1)=1 , f(2)=1f(2)=1


    */

    public int fib(int n) {
        if (n == 0) return 0;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
            dp[i] = dp[i] % 1000000007;
        }
        return dp[n];
    }


}


```

## 10_FrogSteps

``` java
package CodingInterviews;

/*
*
一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

* */
public class _10_2_Frog_Steps {

    /*Solution 1.递归 时间复杂度O(n^2) 浪费 2.递归结果用数组保存 浪费额外空间O(n)
    BEST:
    DP: dp[i+1] = dp[i]+dp[i-1],  dp[0]=0, dp[1] = 1 ,return dp[n]

    chart: i    [0 , 1, 2 , 3 , 4 , 5 ]
           dp    0   1  2   3   5   6

     NOTE：这种题目在于公式一致，只需要不同的初始值
     青蛙跳台阶问题：   f(0)=f(0)=1 , f(1)=1f(1)=1 , f(2)=2f(2)=2
     斐波那契数列问题： f(0)=f(0)=0 , f(1)=1f(1)=1 , f(2)=1f(2)=1


    */

    public int numWays(int n) {
        if (n == 0) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
            dp[i] = dp[i] % 1000000007;
        }
        return dp[n];
    }


}


```






