# 写过的笔试题

## bfs/dfs获取文件列表
## js获取url参数
## 深拷贝
## 编写一个 People 类
``` js
/** YIKI
 * 题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。
 * （实例可能监听多个不同的事件，也可以去除监听事件）
 */
class People {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    console.log(`Hi, I am ${this.name}`)
  }

  // ---------  TODO: 请在此处完善代码  -------------

  types = {}
  // key : arr
  //{ 'greeting' : [say1(),say2(),...] }

  // listenner for mutiple types
  on(eventType, ...arg) {
    let args = [...arg]
    // get its types from args and store them in types
    this.types[eventType] ?
      this.types[eventType].push(...args) :
      this.types[eventType] = args
  }

  // trigger
  emit(eventType, params) {
    let type = this.types[eventType]
    if (!type) return
    type.forEach(item => {
      item.call(this, params)
      // or item.apply(this,...params)
    })
  }


  // remove listener
  off(eventType) {
    const funcs = this.types[eventType]
    const removeType = [...arguments]
    funcs.forEach(item => {
      if (removeType.includes(item)) {
        funcs.splice(funcs.indexOf(item), 1)
      }
    })
  }
}

/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`)
}
const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`)
}
const jerry = new People('Jerry')
// jerry.sayHi()// => 输出：'Hi, I am Jerry'

jerry.on('greeting', say1)
jerry.on('greeting', say2)
//jerry.on('greeting2', say1, say2)

jerry.emit('greeting', 'Hi')
//jerry.emit('greeting2', 'yiki')
// => 输出：'Hi, nice meeting you.'和 'Hi, nice meeting you, too'

jerry.off('greeting', say1)
jerry.emit('greeting', 'Hi')
//=> 只输出：'Hi, nice meeting you, too'
``` 
## 完成 sleep 函数
``` js
/**
 * 题目2：完成 sleep 函数，可以达到下面的效果：
 */
const sleep = (duration) => {
  // TODO
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
  return p
}

const anyFunc = async () => {
  console.log("123") // 输出 123
  await sleep(3000) // 暂停 300 毫秒
  console.log("456") // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}
//anyFunc()
```
## 完成 deepGet 函数
``` js
/**
 * 题目3：完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：
 */
const deepGet = (obj, prop) => {
  // TODO: 在此处完善代码
  prop.split('.').forEach(key => {
    if (key.includes('[')) {
      const index = key.match(/\[(.*)\]/)[1] // return a arr like [...]
      const prefix = key.split('[')[0] // split by [
      obj = obj[prefix][index] ? obj[prefix][index] : undefined
    } else {
      obj = obj && obj[key] ? obj[key] : undefined
    }
  })
  return obj

}

/** 以下为测试代码 */
const res1 = deepGet({
  school: {
    student: { name: 'Tomy' },
  },
}, 'school.student.name') // => 'Tomy'

const res2 = deepGet({
  school: {
    students: [
      { name: 'Tomy' },
      { name: 'Lucy' },
    ],
  }
}, 'school.students[1].name') // => 'Lucy'
// 对于不存在的属性，返回 undefined
const res3 = deepGet({ user: { name: 'Tomy' } }, 'user.age') // => undefined
const res4 = deepGet({ user: { name: 'Tomy' } }, 'school.user.age') // => undefined
// console.log(res1)
// console.log(res2)
// console.log(res3)
// console.log(res4)
```
## 完成 combo 函数
``` js
/**
 * 题目4：完成 combo 函数。
 * 它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。它的作为用：使得类似 f(g(h(a))) 
 * 这样的函数调用可以简写为 combo(f, g, h)(a)。
 */

const combo = (...func) => {
  // TODO: 请在此处完善代码
  // yiki: createCurry and start from inside 
  const funcs = [...func].reverse()
  return p => {
    funcs.reduce((prev,cur) => {
      console.log(cur(prev))
      return cur(prev)
    },p)// p is initial value
  }
}

/* 以下为测试代码 */
const addOne = (a) => a + 1
const multiTwo = (a) => a * 2
const divThree = (a) => a / 3
const toString = (a) => a + ''
const split = (a) => a.split('')

split(toString(addOne(multiTwo(divThree(666)))))
// => ["4", "4", "5"]

const testForCombo = combo(split, toString, addOne, multiTwo, divThree)
testForCombo(666)
// => ["4", "4", "5"]
```
## 每个人轮流从两个盘子中拿小球
``` js
/**
 * 题目5：有两个盘子分别放有 5 个和 7 个小球，两个朋友玩游戏：
 * 每个人轮流从两个盘子中拿小球，每人每次只能从其中一个盘子中拿，每次可以拿 1 个或者多个（不能一个都不拿），
 * 拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。
 * 
 * yiki：
 * 先手必胜 
 * 先手每一次操作都令两个盘子的球数相等直到决胜轮，先手在首次令盘子里数量相等的情况下后手没有必胜策略
 * 一些个人见解，不一定正确：
 * 二进制异或 5 = 0101 
 *          7 = 0111 
 *    5 xor 7 = 0010 = 1 先手输
 * 要令异或为0 则 5 xor 5 = 0 先手才能赢 则 先手令 7 - 2 = 5 （ 2 = 0010）
 * 之后每一步当后手破坏xor为0时 先手重新令xor的结果为0即可
 */
```