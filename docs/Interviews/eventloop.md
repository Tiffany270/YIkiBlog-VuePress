
# 事件循环机制

::: tip Event Loop
The Event Loop has one simple job — to monitor the **Call Stack** and the **Callback Queue**. If the Call Stack is empty, the Event Loop will take the first event from the queue and will push it to the Call Stack, which effectively runs it.
:::
- [Event loop and the rise of Async programming ](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
## pre know
``` js
// ajax(..) is some arbitrary Ajax function given by a library
var response = ajax('https://example.com/api');
console.log(response);
// `response` won't have the response

---
//A simple way of “waiting” for an asynchronous function to return its result
//is to use a function called callback:
ajax('https://example.com/api', function(response) {
    console.log(response); // `response` is now available
});
```

## summary
- js单线程！所谓的多线程异步巴拉巴拉都是单线程模拟出来的
- 先同步，再异步，异步里先`微任务`再`宏任务`, 
- 有一个执行栈、主线程先去处理同步任务、异步都是队列，当主线程空闲会去异步队列里取事件出来处理
- 以上是一个循环
### 分三个部分
- 主执行栈
- `宏任务` macro-task
  - run script
  - `setTimeout`
  - `setInterval`
  - i/o
  - ui render
- `微任务` micro-task
  - `Promise.then/catch`
  - `process.nextTick`
  - `await/async`
  - `MutationObserver`( a interface provides the ability to watch for changes being made to the DOM tree.)

