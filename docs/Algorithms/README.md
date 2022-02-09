# About&Basic

- If you want to learn the basic algorithms, pls view [Alorithms-Java-GitHub](https://github.com/Tiffany270) to get all source codes :)
- View LeetCode online page, see [yiki's blog](http://yiki.site/vuepress/Leetcode/)


## SelectSort/选择排序

 在一组数据中，从第一个数开始，作为最小值，并取这个数作为一个`临时数`，往后遍历第一遍，选择最小的数字，如果有比临时数小的，则这个数和临时数交换，成为新的临时数，放在最左边。第一遍遍历结束后，从第二个数开始，第二个数又是一个临时数，以此类推。这样最左边就是已经排好的有序的数了。


### 思路

>外层循环用out，从数组开头开始向高位增长，内层循环用in，这些都是作为下标的。内层in结束后，min指向最小的数据项，即min=in，跳出内层循环，交换out和min指向的数字。  

### 代码

```java
package 简单排序;

class ArraySel {
	private long a[];
	private int nElems;

	public ArraySel(int max) {
		a = new long[max];
		nElems = 0;
	}

	public void insert(long value) {
		a[nElems] = value;
		nElems++;
	}

	public void display() {
		for (int i = 0; i < nElems; i++) {

			System.out.print(a[i] + " ");

		}
		System.out.println(" ");
		
	}

	public void selectSort() {
		int out, in, min;
		for (out = 0; out < nElems - 1; out++) {// 比如4个数，out要走到最后一个数，要走三步
			min = out;
			for (in = out + 1; in < nElems; in++) {
				if (a[in] < a[min]) {
					min = in;
				}
			}
			swap(out, min);// 这里其实是没结束一次内循环后选出最小的才交换的
		}
	}

	private void swap(int one, int two) {
		long temp = a[one];
		a[one] = a[two];
		a[two] = temp;

	}

}

public class Select {

	public static void main(String[] args) {
		
		ArraySel arr= new ArraySel(100);
		arr.insert(20);
		arr.insert(3);
		arr.insert(6);
		arr.insert(78);
		arr.display();
		arr.selectSort();
		arr.display();
		
		
	}

}


```

