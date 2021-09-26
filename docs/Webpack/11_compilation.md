# webpack源码 Compilation

- `class Compilation`
- 专注编译100年
    - 添加入口entry - 通过entry分析模块 - 分析依赖构建图表 - seal封装 - 输出
- 是每次构建的上下文对象，每次热更新都会重新构建一个新的compilation对象负责更新的构建过程
- 模版替换也是在这里执行的，指挥按顺序编译

## constructor(compiler) 
``` js
	this.hooks = Object.freeze({

...
// 模版
	this.mainTemplate = new MainTemplate(this.outputOptions, this);
		this.chunkTemplate = new ChunkTemplate(this.outputOptions, this);
		this.runtimeTemplate = new RuntimeTemplate(
			this,
			this.outputOptions,
			this.requestShortener
		);
```
## func addEntry()
- 我觉得是通过别的plugin帮助调用`compilation.addEntry(）` 来做入口的
``` js
	addEntry(context, entry, optionsOrName, callback) {
		// TODO webpack 6 remove
		const options =
			typeof optionsOrName === "object"
				? optionsOrName
				: { name: optionsOrName };

		this._addEntryItem(context, entry, "dependencies", options, callback);
	}
```
## func seal(callback)
- 来自 `Compiler` 里 `compile()` 的调用
- 将格式化的js通过模版聚合，回调compile生成文件
``` js
	const finalCallback = err => {
			...clear...
			return callback(err);
		};
		const chunkGraph = new ChunkGraph(
			this.moduleGraph,
			this.outputOptions.hashFunction
		);
		this.chunkGraph = chunkGraph;

		for (const module of this.modules) {
			ChunkGraph.setChunkGraphForModule(module, chunkGraph);
		}

		this.hooks.seal.call();
        ...
                    }
```