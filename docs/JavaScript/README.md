#  Js的奇淫技巧

## 位图式检查数组重复元素

``` js

     const repeatArry = [];
     const tempObj = [2,2,3,5,6]; // tempObj可以是string为元素
      tempObj.forEach(element => {
        repeatArry.push(element.url);
        element.subMenu.forEach(e => {
          repeatArry.push(e.url);
        });
      });
      const flagArray = new Object(); // 纯数组可以用new Array();
      for (let i = 0; i < repeatArry.length; i++) {
        if (flagArray[repeatArry[i]]) { // JS允许string做数组的下标，相当于一个对象添加属性
          console.log('repeat');
          return;
        }
        flagArray[repeatArry[i]] = true;
      }


```

## 对Dom距离高度改变div位置

``` js

  selectIcon(event: any) {

    // 只计算一次距离高度
    
     if (this.buttomTop === 0) {
      this.buttomTop = this.bottomDom.nativeElement.offsetTop;
    }
    
    // 获取当前点击的节点(可选)
    const targetNode = event.path.find((x: { nodeName: string; }) => x.nodeName === 'TD');
    const rect = targetNode.getBoundingClientRect();
    // 节点距离父容器的高度
    const top = rect.top;

    //获取DOM(可选)
    if (this.showIconList) {
      const alist = document.getElementsByClassName('IconListWrapper');
      // 清空所有display
      if (alist) {
        for (let idx = 0; idx < alist.length; idx++) {
          const mya = alist[idx];
          mya['style']['display'] = 'none';
        }
      }
      setTimeout(() => {
          this.renderer.setStyle(event.srcElement.parentNode.
            getElementsByClassName('IconListWrapper')[0],
            'display', 'block');
        }

        // 当点击节点和父容器的距离高于200,则对弹出框IconListWrapper的位置做调整使其不挤压父容器
        if (this.buttomTop - top < 200) {

            //...处理方式(可选)
          this.renderer.addClass(event.srcElement.parentNode.
            getElementsByClassName('IconListWrapper')[0], 'addTop-1');
        }
      }, 0);
    }
    event.preventDefault();
    event.stopPropagation();
  }


```

## scroll和touch事件的冲突

``` js

preventTouch() {
    let flag = false; // 是否滚动
    const main = document.getElementById('main');//有滚动的面板
    const cur = this;
    let dur = 0; // 触摸时间，太短不触发
    let date_start, date_end;
 
    main.addEventListener('touchstart', handler, { passive: false });
    main.addEventListener('touchmove', handler, { passive: false });
    main.addEventListener('scroll', handler, { passive: false });
 
    function handler(e) {
      switch (e.type) {
        case 'touchstart':
          flag = false;
          date_start = new Date();
          break;
        case 'touchmove':
          date_end = new Date();
          dur = date_end - date_start;
          if (flag || dur < 300) {//表示是滚动完成后的那个touch不触发/间隔太短
            e.stopImmediatePropagation(); // 阻止冒泡
          }
          break;
        case 'scroll':
          if (!flag) {
            flag = true;
          }
          break;
      }
 
    }
 
  }


```


## 检测滚动条最右/左

``` js
         if (Math.round(main.scrollLeft) + main.clientWidth === main.scrollWidth) {
            cur.btn_right = true;
          }
          if (Math.round(main.scrollLeft) === 0) {
            cur.btn_right = false;
          }

```


## 数组对象的删除和增加

``` js

 /**
   * @param action 行为
   * @param item item
   * @param selectedList 辨别是用于users还是groups
   */
  private updateSelected(action, item, selectedList) {
    if (action === 'add' && selectedList.findIndex(value => value === item) === -1) {
      console.log('执行添加');
      selectedList.push(item);
    }
    if (action === 'remove' && selectedList.findIndex(value => value === item) !== -1) {
      console.log('执行删除');
      selectedList.splice(selectedList.findIndex(value => value === item), 1);

    }
  }


```


## 数组升序和降序

``` js
 SortTableData(key, type: string, origin) {


        if (type === 'up') {
            const res1 = origin.sort(function (a, b) {

                //如果存在某个key是null或是其他字符串(可略)
                if (a[key] === '暂无' || b[key] === '暂无') {


                    if (a[key] === '暂无') {
                        return (0 - parseFloat(b[key]));
                    }
                    if (b[key] === '暂无') {
                        return (parseFloat(a[key]) - 0);
                    }
                } else {

                    return (parseFloat(a[key]) - parseFloat(b[key]));
                }

            });

            return res1;

        }

        if (type === 'down') {
            const res2 = origin.sort(function (a, b) {

                //如果存在某个key是null或是其他字符串(可略)
                if (a[key] === '暂无' || b[key] === '暂无') {


                    if (a[key] === '暂无') {
                        return (parseFloat(b[key]) - 0);
                    }
                    if (b[key] === '暂无') {
                        return (0 - parseFloat(a[key]));
                    }
                } else {

                  // *重点
                    return (parseFloat(b[key]) - parseFloat(a[key]));
                }




            });

            return res2;

        }



    }

```
