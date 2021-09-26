# webpack源码 tapable
- 事件流方案
- 钩子核心逻辑

- class Compiler 里
``` js
const {
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");
...
constructor(context) {
		this.hooks = Object.freeze({
			initialize: new SyncHook([]),
    ...
        }
```
