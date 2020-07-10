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

## 11_MinNumberOfRotateArr
``` java
package CodingInterviews;


/*
*
* 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
* 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
* 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
*
        示例 1：
        输入：[3,4,5,1,2]
        输出：1

        示例 2：
        输入：[2,2,2,0,1]
        输出：0

* */

public class _11_minNumberOfRotateArr {

    public int minArray(int[] numbers) {
        //见LeetCode 154
        return 0;
    }
}

```

## 15_OnesInBinary
``` java
package CodingInterviews;

/*
* 请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。
* 例如，把 9 表示成二进制是 1001，有 2 位是 1。
* 因此，如果输入 9，则该函数输出 2。

    示例 1：
    输入：00000000000000000000000000001011
    输出：3
    解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'
*/
public class _15_OnesInBinary {

    /*
     * NOTE:
     * >> 右移 负数：左高位补1 正数：左高位补零 = X/2^n
     * << 左移 右边低位补零                  = X*2^n
     * >>> 无符号右移 高位只补零
     *
     * 补码 = 原码取反+1
     * 补码->原码 = 先-1再取反
     * */

    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        while (n != 0) {
            res += n & 1;
            n = n >>> 1;
        }
        return res;
    }

    public static void main(String[] args) {
        System.out.println(3 & 1);
    }
}
```

## 21_OddBerforeEven
``` java
package CodingInterviews;

import java.util.Arrays;

/*
*输入一个整数数组，实现一个函数来调整该数组中数字的顺序，
* 使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。


        示例：
        输入：nums = [1,2,3,4]
        输出：[1,3,2,4]
        注：[3,1,2,4] 也是正确的答案之一。

* */
public class _21_oddBerforeEven {
    /*
     * Solution:
     * （顺序遍历-太慢了别用这个）
     * 遍历+快慢指针
     * 快指针j往下走，碰到奇数就和i交换，i++,j++
     * j遇到偶数，i不变，j++
     * */

    public int[] exchange2(int[] nums) {


        int slow = 0;
        int fast = 1;
        while (slow < nums.length) {// 先筛选一遍slow，skip掉奇数
            if (nums[slow] % 2 != 0) {
                slow++;
                fast++;
            } else {
                break;
            }
        }
        while (slow < fast && fast < nums.length) {
            if (nums[fast] % 2 != 0) {
                int temp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = temp;
                slow++;
                fast++;
            } else {
                fast++;
            }

        }
        return nums;

    }

    /*
     * （正式）
     * 应该用前后指针
     *
     * */

    public int[] exchange(int[] nums) {
        if (nums.length == 0) return nums;
        int i = 0, j = nums.length - 1;
        while (i < j) {
            while (nums[i] % 2 != 0 && i < j) {// 内部剔除
                i++;
            }
            while (nums[j] % 2 == 0 && i < j) {// 内部剔除
                j--;
            }
            if (nums[j] % 2 != 0) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                i++;
                j--;
            } else {
                j--;
            }
        }
        return nums;
    }


    public static void main(String[] args) {
        _21_oddBerforeEven func = new _21_oddBerforeEven();
        int[] arr = {2, 16, 3, 5, 13, 1, 16, 1, 12, 18, 11, 8, 11, 11, 5, 1};
        System.out.println("res: " + Arrays.toString(func.exchange(arr)));
    }
}


```

## 22_LinkLastK
``` java
package CodingInterviews;


/* 链表中倒数第k个节点
* 输入一个链表，输出该链表中倒数第k个节点。
* 为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
* 例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。
* 这个链表的倒数第3个节点是值为4的节点。
*
    示例：
    给定一个链表: 1->2->3->4->5, 和 k = 2.
    返回链表 4->5.

*/

/*Solution
 *
 * 双指针一起走
 * 快指针先走K步，到K后慢指针开始动，快指针到结尾后慢指针在的地方就是结果。
 *
 * */

public class _22_LinkLastK {


    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode fast = head, slow = head;
        int stop = 0;
        while (fast!=null){
            if(stop>=k){
                slow=slow.next;
            }
            fast=fast.next;
            stop++;
        }
        return slow;
    }
}

```

## 24_ReverseLinkList
``` java
package CodingInterviews;

/*
* 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

            示例:
            输入: 1->2->3->4->5->NULL
            输出: 5->4->3->2->1->NULL
 

* */
//反转链表
public class _24_ReverseLinkList {

    static public class ListNode {
        int val;
        ListNode next = null;

        ListNode(int val) {
            this.val = val;
        }
    }

    /*递归思路
    把当前节点的下一个节点的next指向自己

    如4->5 变为4<->5互相指了呗
    然后避免圈出现要把原方向断掉：把4->5变为4->null,这样不就剩下4<-5（就是指向空）
    然后递归递归递归……*/
    public ListNode ReverseListRecursive(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = ReverseListRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    /*
    非递归思路：
    防止链表断裂，在转变指向（如 0 -> 1 -> 2转为 0 <- 1 2）的时候，临时保存2，
    方便prev head next往下一个节点移动的时候找到2重新变为head（原head是1）
        */
    public ListNode ReverseList(ListNode head) {
        if (head == null) {
            return null;
        }

        ListNode prev = null;    // 预设一个prev
        ListNode pHead = head;   //循环用
        ListNode newHead = null; //新的头

        while(pHead!=null){
            ListNode temp = pHead.next;

            if(temp==null){
                newHead = pHead;
            }
            pHead.next = prev; //反转指针
            prev = pHead;   // 移动
            pHead = temp;   // 移动

        }

        return newHead;

    }

}


```

## 29_SpiralOrder
``` java
package CodingInterviews;

import java.util.Arrays;

/*
*
* 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

        示例 1：
        输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
        输出：[1,2,3,6,9,8,7,4,5]
        示例 2：
        输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
        输出：[1,2,3,4,8,12,11,10,9,5,6,7]

* */
public class _29_SpiralOrder {
    /*
    * Solution:
    * 四个方向，打印外圈后依次内圈
    * 开始的地方为对角线那个数字
    * */

    public int[] spiralOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return new int[0];
        }
        int rows = matrix.length;
        int columns = matrix[0].length;
        int[] res = new int[rows * columns];
        int index = 0;
        int left = 0, right = columns - 1, top = 0, bottom = rows - 1;

        while (left <= right && top <= bottom) {

            for (int column = left; column <= right; column++) {
                res[index++] = matrix[top][column];// left -> right
            }
            for (int row = top + 1; row <= bottom; row++) {
                res[index++] = matrix[row][right];// top -> bottom
            }

            // 防止越界
            if (left < right && top < bottom) {

                for (int column = right - 1; column > left; column--) {//right-1为了避开已经打印的元素
                    res[index++] = matrix[bottom][column];
                }

                for (int row = bottom; row > top; row--) {
                    res[index++] = matrix[row][left];
                }

            }


            left++;
            right--;
            top++;
            bottom--;
        }


        return res;
    }

    public static void main(String[] args) {
        _29_SpiralOrder func = new _29_SpiralOrder();
        int[][] arr = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        System.out.println(Arrays.toString(func.spiralOrder(arr)));
    }
}

```java

## 39_MajorityElementOfArr

``` java
package CodingInterviews;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;

/*
* 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

    你可以假设数组是非空的，并且给定的数组总是存在多数元素。

            示例 1:
            输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
            输出: 2

* */
public class _39_MajorityElementOfArr {

    /*
     * Solution: - HashMap O(n)
     *           - sort then find 众数
     *           - Vote(best)
     * */


    //HashMap
    public int majorityElement1(int[] nums) {

        int len = nums.length / 2;
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                map.put(nums[i], map.get(nums[i]) + 1);
            } else {
                map.put(nums[i], 1);
            }

            if (map.get(nums[i]) > len) {
                return nums[i];
            }
        }

        return 0;
    }

    public int majorityElement2(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }

    public int majorityElement(int[] nums) {
        int x = 0, vote = 0;
        for (int i = 0; i < nums.length; i++) {
            if (vote == 0) {
                x = nums[i];
            }
            if (x == nums[i]) {
                vote = vote + 1;
            } else {
                vote = vote - 1;
            }
        }

        return x;
    }
}

```



