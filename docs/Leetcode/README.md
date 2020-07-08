# LEETCODE

## About

- If you want learn basic algorithms, view [Alorithms-Java-GitHub](https://github.com/Tiffany270) to get all source codes :)
- Check LeetCode github, view [YikiLeetCode-GitHub](https://github.com/Tiffany270/YikiLeetCode)


## 01_TwoSum
``` java
package Array.easy;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/* NO.1
 * Given an array of integers,
 * return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 * */
public class _01TwoSum {

    /*
     * 遍历，找到target-num[i]=num[j]的元素
     * 时间复杂度n^2
     * */

    public  int[] twoSum1(int[] nums, int target) {
        int[] res = new int[2];

        for (int i = 0; i < nums.length; i++) {

            for (int j = i + 1; j < nums.length; j++) {
                if (target - nums[i] == nums[j]) {
                    res[0] = i;
                    res[1] = j;
                }
            }
        }


        return res;
    }

    /*思路2
     * HashMap
     * 循环把值+i放入map里
     * 只要找到target-i在map里，返回这个的i和target-i的索引
     *
     * Note: [1]Map is not allowed repeat key
     *          - HashMap: containing a hashcode for each key. only have one null value.
     *          - HashTable: same with above, but not allow have null value.
     *          - LinkedHashMap: sub of HashMap, containing a order of its insert
     *          - TreeMap: will sort the order of insert (default up)
     *
     *       [2]Set is not allowed repeat value
     * */
    public  int[] twoSum(int[] nums, int target) {

        Map<Integer, Integer> myMap = new HashMap<>();
        int[] res = new int[2];
        for (int i = 0; i < nums.length; i++) {
            if (myMap.containsKey(target - nums[i])) {
                res[0] = myMap.get(target - nums[i]);
                res[1] = i;
            }
            myMap.put(nums[i], i);
        }


        return res;
    }

    public static void main(String[] args) {
        _01TwoSum twosum = new _01TwoSum();
        int[] arr = {2, 7, 11, 15};
        System.out.println(Arrays.toString(twosum.twoSum(arr, 9)));
    }
}



```

## 02_AddTwoNumbers
``` java
package Linked.Medium;

/*
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order and each of their nodes contain a single digit.
 * Add the two numbers and return it as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Example:
    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.

*/



public class _02Add_Two_Numbers {
    /*
     * Loop a LinkList:
     *       [1] Store 'head' first, it's important: Node cur = node;
     *       [2] do sth with current node : cur.next = new ListNode(x)
     *       [3]loop it: cur = cur.next;
     * */

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode node = new ListNode(0);// to store result
        ListNode cur = node;

        int carry = 0;

        while (l1 != null || l2 != null) {

            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = x + y + carry; // add all together

            // [cur.next]
            // skip current node.val, create an newNode for result
            // must store your result to next node,
            // then return node.next is ok
            // (because store in current node would have an extra loop, which would create a extra node.)

            cur.next = new ListNode(sum % 10);//now cur.next.val = sum%10
            carry = sum > 9 ? 1 : 0; // or sum/10 is ok, because carry is an Integer
            cur = cur.next;

            if (l1 != null)
                l1 = l1.next; // the point would stop at 'next' and never loop

            if (l2 != null)
                l2 = l2.next;
        }

        // consider a situation of l1(1,2)+l2(1,9), you need to add a node
        if (carry > 0) {
            cur.next = new ListNode(carry);
        }
        return node.next;
    }

    public static void main(String[] args) {
        _02Add_Two_Numbers Two_Numbers = new _02Add_Two_Numbers();
        ListNode listNode1 = new ListNode(1);
//        listNode1.add(4);
//        listNode1.add(3);

        ListNode listNode2 = new ListNode(9);
        listNode2.add(9);
//        listNode2.add(7);

        ListNode node = Two_Numbers.addTwoNumbers(listNode1, listNode2);
        node.print();


    }


}

```
