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

## 前端分页
- point：前端分页要保存原数组而不能使用引用，所以原数组保存请使用深拷贝
``` js
//ES6拷贝技巧

 this.tableOrigin.Rows = [...this.table.Rows]; // 深拷贝

 
  //num = 生成的分页条数目 = (原数组长度+一页显示的条数-1)/一页显示的条数
  const num = Math.floor((this.tableOrigin.Rows.length + 8 - 1) / 8);
  //其他 填充数据，可忽略，
  const newArr = new Array(num).fill('').map((item, index) => index + 1);


 //分页

  /**
 * @desc  纯JS前端分页方法
 * @param age 当前页码，默认1
 * @param  pageSize 每页最多显示条数，默认10
 * @param  totalData 总的数据集，默认为空数组
 * return {
    data, // 当前页展示数据，数组
    page, //当前页码
    pageSize, //每页最多显示条数
    length, //总的数据条数
  }
**/
  getTableData = (page = 1, pageSize = 10, totalData = []) => {
    const { length } = totalData;
    const tableData = {
      data: [],
      page,
      pageSize,
      length,
    };
    if (pageSize >= length) { // pageSize大于等于总数据长度，说明只有1页数据或没有数据
      tableData.data = totalData;
      tableData.page = 1; // 直接取第一页
    } else { // pageSize小于总数据长度，数据多余1页
      const num = pageSize * (page - 1); // 计算当前页（不含）之前的所有数据总条数
      if (num < length) { // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
        const startIndex = num; // 当前页第一条数据在总数据集中的索引
        const endIndex = num + pageSize - 1; // 当前页最后一条数据索引
        tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex);//当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
      } else { // 当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
        const size = Number(length / pageSize); // 取商
        const rest = length % pageSize; // 取余数
        if (rest > 0) { // 余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
          tableData.page = size + 1; // 当前页码重置，取size+1
          tableData.data = totalData.filter((_, index) => index >= (pageSize * size) && index <= length);
        } else if (rest === 0) { // 余数等于0，最后一页数据条数正好是pageSize
          tableData.page = size; // 当前页码重置，取size
          tableData.data = totalData.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
        } // 注：余数不可能小于0
      }
    }
    return tableData;
  }




```

## debug移动端软键盘出现使CSS错位
 - **前提**
  - 关闭触屏伸缩功能（其实我也不知道有没有影响）
  - 如果你的高度使以vh来定位的话适用

- **尝试却无效的方法**
  - 软键盘出现改变body和html的高度无效
  - 设置input的focus时改变某个父div的高度无效（因为有时候软键盘又不挤压视窗了）
  - z-index下沉无效

- **解决思路**
  - 用resize，如果你是框架运用就更好办了，并且找准在软键盘出现（即视窗=1/2原来的时候哪个CSS定位属性能够影响定位，你可以自己找到那个属性，我实测我vh改变无效，需要用到transform的translateY
  - 双向绑定或者JS在视窗改变的时候动态添加和移除该属性
  - 软键盘的实质（只适用移动端）：软键盘出现，是改变视窗大小，非html和body，但是你又无法检测这个高度的变化，可以用resize的handler去监听，反正一来一回只触发两次
  - resize去监听初始化的innerHeight高度，当软键盘出现，继续监听最后的innerHeight高度，当两个相减小遇innerHeight的三分之一时，你就默认软键盘出现，你就改变CSS即可

- **代码**
``` js
if (window.screen.width < 768) {
      const windowViewWeight = window.innerHeight;
      let afterResizt = 0;
      const thirdWeight = window.innerHeight / 3;
      // 视窗改变代表软键盘出现
      const cur = this;
      window.onresize = function () {
        afterResizt = window.innerHeight;
        if ((windowViewWeight - afterResizt) > thirdWeight) {
          cur.blurKeybordformobile = true;
        } else {
          cur.blurKeybordformobile = false;
        }

      };

    }

// blurKeybordformobile 是 控制CSS样式的，你要找到这个动态修改你错位DIV的样式CSS代码

``` 


## 上传图片为base64并压缩(canvas)图片

首先你要有个canvas容器，设置画布大小，默认的尺寸一般不会符合的，会造成画布太大的问题
``` html
<canvas width=100px; height=100px; id="canvas"></canvas>

//button 可以用labal隐藏input
 <div class="template-api">
            <input type="text" spellcheck="false">
            <div class="btn-before template-button" (click)="request()">请求</div>
  </div>

```

然后开始写代码
``` js
 handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    const cur = this;
    reader.onload = function (e) {
      // 压缩
      const obj: any = (e.target as any).result;
      const img = new Image();
      img.src = String(obj);
      img.onload = () => {
        const w = 100;// 这里是你要压缩图片的大小 px
        const h = 100;
        const quality = 0.8;
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; // png->j格式会把背景涂黑，所以要设置白色的背景
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        const base64 = canvas.toDataURL('image/jpeg', quality);
        cur.currentThumbnail = String(base64);
      };

    };

  }

```

## checkbox全选/取消的基本逻辑

[点此查看](https://blog.csdn.net/qq_38277033/article/details/88951209)

这里只写JS
``` js
export class PermissionComponent implements OnInit {
 
  constructor() { }
 
 
  // 用户组已选
  selectedUser = [];
  selectedUserCount = 0;
  // 用户btn状态
  btnUserAllow = false;
 
  userList = [{
    uid: '000',
    username: 'yiki',
    groupname: 't',
    status: 'available',
  }, {
    uid: '001',
    username: 'yiki',
    groupname: 't',
    status: 'available',
  }
  ];
 
 
 
  /**
   * 点击用户全选
   */
  selectAlluser(e) {
    const checkbox = e.target;
    const action = (checkbox.checked ? 'add' : 'remove');
    if (action === 'add') {
      this.selectedUserCount = this.userList.length;
    } else {
      this.selectedUserCount = 0;
    }
    this.userList.forEach((elt) => {
      const entity = elt.uid;
      this.updateSelected(action, entity, this.selectedUser);
    });
 
 
    this.isUserBtnAllow();
  }
 
  isUserBtnAllow() {
 
    if (this.selectedUserCount !== 0) {
      this.btnUserAllow = true;
    } else {
      this.btnUserAllow = false;
    }
  }
  isSelectedAlluser() {
    return this.userList.length === this.selectedUserCount;
  }
  isCheckUser(item) {
    return this.selectedUser.findIndex(value => value === item) >= 0;
  }
  clickUser(e, item) {
    const checkbox = e.target;
    const action = (checkbox.checked ? 'add' : 'remove');
    if (action === 'add') {
      this.selectedUserCount++;
    } else {
      this.selectedUserCount--;
    }
    console.log(this.selectedUser, this.selectedUserCount);
    this.updateSelected(action, item, this.selectedUser);
    this.isUserBtnAllow();
  }
 
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
    console.log(this.selectedUser);
  }
 
 
}
```
## String->Function
用字符串变成可运行的代码。
- 可以用eval
- 用Function
``` js
const option = 
(new Function('return ' + json))(); // +{ }
```
## 字符串去除首位{}
``` js
removeBlock(str) {
    if (str) {
      str = str.replace('option = ', '');
      const reg = /^\{/gi;
      const reg2 = /\}$/gi;
      str = str.replace(reg, '');
      str = str.replace(reg2, '');
      return str;
    } else {
      return str;
    }

```