# vue源码 合并

## mergeOptions
- `/src/core/util/options.js`,同一个文件里面有很多关于合并选项的规则
``` js
/**
* Merge two option objects into a new one.
* Core utility used in both instantiation and inheritance.
*/
export function mergeOptions (
parent: Object,
child: Object,
vm?: Component
): Object {
if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)// 拿到option之前要先校验规范
}
if (typeof child === 'function') {
    child = child.options
}
// props,inject,directives的校验和规范化
normalizeProps(child, vm)
normalizeInject(child, vm)
normalizeDirectives(child)
// 扩展子类构造器
if (!child._base) {
    if (child.extends) {
    parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
    }
    }
}
const options = {}
let key
for (key in parent) {
    mergeField(key)
}
for (key in child) {
    if (!hasOwn(parent, key)) {
    mergeField(key)
    }
}
function mergeField (key) {
    // 拿到指定的选项配置，如果没有则用默认的配置
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
}
return options
}

```
- `validateComponentName() `注册组件名的规则
- `normalizeProps()`
- `normalizeInject()` 用于`provide/inject`的规则
- `normalizeDirectives()` 针对`directives`会针对写法将行为赋予`bind/update`钩子
``` js
...
    if (typeof def === 'function') {
    dirs[key] = { bind: def, update: def }
    }
```

## el的合并
``` js
strats.el = strats.propsData = function (parent, child, vm, key) {
if (!vm) {// 只允许vue实例才能拥有el属性，其他子类不允许
    warn(
    `option "${key}" can only be used during instance ` +
    'creation with the `new` keyword.'
    )
}
return defaultStrat(parent, child)
}
}
```

## data的合并
``` js
/**
 * Data
 * 合并返回mergeDatafn or mergedInstanceDataFn funciton
 * 为了复用，每次创建都在一个闭包里，相当于独立的空间，这样每个组件之间的数据就不会相互影响
 */
export function mergeDataOrFn (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData // 不传递data时返回默认
      }
    }
  }
}
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {// 保证子类data是一个函数
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }
  return mergeDataOrFn(parentVal, childVal, vm)
}
```

## watch的合并
