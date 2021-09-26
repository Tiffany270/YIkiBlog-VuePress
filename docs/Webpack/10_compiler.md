# wepack源码 Compiler 
- `class Compiler`
- /lib/compiler.js
- 是一个全局单例，负责构建整个打包流程
## constructor()
- 里面有一堆钩子🐶
``` js
constructor(context) {
    this.hooks = Object.freeze({
			initialize: new SyncHook([]),
			shouldEmit: new SyncBailHook(["compilation"]),
			done: new AsyncSeriesHook(["stats"]),
			afterDone: new SyncHook(["stats"]),
			additionalPass: new AsyncSeriesHook([]),
			beforeRun: new AsyncSeriesHook(["compiler"]),
			run: new AsyncSeriesHook(["compiler"]),
			emit: new AsyncSeriesHook(["compilation"]),
			assetEmitted: new AsyncSeriesHook(["file", "info"]),
			afterEmit: new AsyncSeriesHook(["compilation"]),
    ...}
}
```
## func run()
- `Compiler.run()`开跑
- `beforeRun` 来自`async + require("tapable")`处理缓存的模块，之后才`compile()`
- `compile()`结束后回调 `onCompiled` 将编译后的内容生成文件
- `shouldEmit`判断是否编译成功
``` js
	run(callback) {
        const onCompiled = (err, compilation) => {
			if (err) return finalCallback(err);

			if (this.hooks.shouldEmit.call(compilation) === false) {
                ...}
            }
        ...
		const run = () => {
			this.hooks.beforeRun.callAsync(this, err => {
                ...
				this.hooks.run.callAsync(this, err => {
                    ...
					this.readRecords(err => {
                        ...
						this.compile(onCompiled);
					});
				});
			});
		};
    }
```
## func compile()
- 编译过程
``` js
compile(callback){
	const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => { // 会回调
    ...
			// 这个钩子会触发entryplugin的make回调
			this.hooks.make.callAsync(compilation, err => { // 开始编译
					
					this.hooks.finishMake.callAsync(compilation, err => {
                    ...
					    process.nextTick(() => {
    						compilation.finish(err => {
							    compilation.seal(err => { // 封装


    
        }

    }
}

```
## func newCompilationParams
- params 模块工厂传入钩子，方便之后的插件或钩子操作模块
``` js
	newCompilationParams() {
		const params = {
			normalModuleFactory: this.createNormalModuleFactory(),
			contextModuleFactory: this.createContextModuleFactory()
		};
		return params;
	}
```
