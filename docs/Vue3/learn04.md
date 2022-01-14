# Feature - Composition API

::: tip
It would be much nicer if we could collocate code related to the same logical concern. And this is exactly what the Composition API enables us to do
:::

## setup
Well, we first need a place where we can actually use it  
keywords: component option
### The Basics
- it's executed `before` the component is `created`
- called `before` the `data`, `computed`,`methods` are `resolved`
- called `once` the `props` are `resolved`
- serves as the `entry` point for composition APIs
- everything that we `return` from setup will be `exposed` to the rest of our component (computed properties, methods, lifecycle hooks and so on) as well as to the component's template
---
- NOTE: `avoid` using `this` inside `setup` as it won't refer to the component instance, `data`,`computed`,`mehtods` won't be available within setup
---
- Should be a `function` accepts two arguments - `setup(props, context){...}`:
  - `props`  
    - `reactive` and will be updated when new props are passed in
    - `cannot` use ES6 `destructuring` because it will remove props reactivity
    - you can do this by utilizing the `toRefs` inside of the `setup` function
    ``` js
    setup(props) {
    const { title } = toRefs(props)
    const title = toRef(props, 'title') // if title is optional
    }
    ```
  - `context`
    - a normal JavaScript object
    - `NOT` reactive
    - safely `use` ES6 `destructuring` on it
    ``` js
     setup(props, { attrs, slots, emit, expose }) {
    ...
    }
    ```
- `attrs` and `slots` from `context`
  - they are `NOT` reactive
  - they are stateful objects that are always updated when the component itself is updated
  - You should avoid `destructuring` them and always `reference` properties as `attrs.x` or `slots.x`
  - If you intend to apply side effects based on `changes` to attrs or slots, you should do so inside an `onBeforeUpdate` lifecycle hook

---
``` js
// demo.vue (note that here is NOT perfect!!!)
import { fetchOne} from '@/api/repositories'
<template>
  <div>{{ arr }}</div>
</template>
<script>
export default {
  components: { one, second, third},
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props) // { user: '' }
    let arr = [] //  not reactive
    const getOneData =  async ()=>{
      arr = await fetchOne(props)
    }
    // anything returned here will be available for the rest of the component
    return {
    arr, // can be accessed in the template
    getOneData // functions returned behave the same as methods
    } 
  }
  // the "rest" of the component
  ... 
}
</script>

``` 
### Accessing Component Properties
- when `setup` is executed, it would to access the `props`, `attrs`, `slots`, `emit`
- `not` have access to `data`, `computed`, `methods`, `refs`(template refs)

### Usage with Render Functions
- `setup` can `return` a `render function` which can directly make use of the reactive state declared in the same scope
- but u will find it's problematic to `expose` methods if we return the render function  (solve this by calling `expose`)
``` js
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({ // then be available in the parent component 
      increment
    })
    // Please note that we need to explicitly use ref value here
    return () => h('div', count.value)
  }
}
```

## ref
> ref creates a `Reactive Reference` to our value. The concept of
> working with References will be used often throughout the Composition API.
- make any variable `reactive` anywhere with a new `ref` function
- it's to be used to `access` or `mutate` the value of the `reactive` variable
``` js
import { ref } from 'vue'
const counter = ref(0)// takes the argument
console.log(counter) // { value: 0 } // return an obj whth a `value` property
console.log(counter.value) // 0
counter.value++ // reactive
console.log(counter.value) // 1
```
- Note: in `JavaScript`, primitive types like `Number` or `String` are passed by `value`, not by `reference`
  - ![image](./imgs/1.gif)
- So `wrapping` values inside an `object` is required to `keep` the behavior unified across `different` data types in JavaScript
- Having a wrapper object around any value allows us to `safely` pass it across our `whole` app without worrying about `losing` its `reactivity` somewhere along the way
``` js
// demo.vue (perfect version!!)
import { fetchOne} from '@/api/repositories'
import { ref } from 'vue'
export default {
  components: { one, second, third},
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props) // { user: '' }
    // - let arr = [] //  not reactive
    let arr = ref([])
    const getOneData =  async ()=>{
     // -  arr = await fetchOne(props)
      arr.value = await fetchOne(props.user)
    }
    // anything returned here will be available for the rest of the component
    return {
    arr,
    getOneData // functions returned behave the same as methods
    } 
  },
   watch: {
    user: 'getOneData' 
  },
  mounted(){
    this.getOneData()
  }
  ...   // the "rest" of the component
}
``` 
### template ref
- NOTE: the concept of `reactive refs` and `template refs` are unified(统一)  
In order to obtain a `reference` to an `in-template` element or component instance, we can declare a `ref` as usual and return it from `setup()`
``` js
<template>
  <div ref="root">This is a root element</div>
</template>
<script>
  import { ref, onMounted } from 'vue'
  export default {
    setup() {
      const root = ref(null)
      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(root.value) // <div>This is a root element</div>
      })
      return {
        // exposing on the render context and binding it to the div as `ref = root`
        root 
      }
    }
  }
</script>
```
### Watching Template Refs
Watching a template ref for changes can to the use of `lifecycle hooks`, But a `key difference` to lifecycle hooks is that `watch()` and `watchEffect()` effects are run `before` the DOM is `mounted` or `updated` so the template ref `hasn't` been updated when the watcher runs the effect
- SO `watchers` that use `template refs` should be defined with the `flush: 'post'` option
``` js
<template>
  <div ref="root">This is a root element</div>
</template>
<script>
  import { ref, watchEffect } from 'vue'
  export default {
    setup() {
      const root = ref(null)
      watchEffect(() => {
        console.log(root.value) // => <div>This is a root element</div>
      }, 
      {
        flush: 'post' // key, without it `root.value` would be null
      })
      return {
        root
      }
    }
  }
</script>
```
### with JSX
``` js
export default {
  setup() {
    const root = ref(null)
    return () =>
      h('div', {
        ref: root
      })
    // with JSX
    return () => <div ref={root} />
  }
}
```
### inside v-for
``` js
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>
<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'
  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])
      // make sure to reset the refs before each update
      onBeforeUpdate(() => {
        divs.value = []
      })
      return {
        list,
        divs
      }
    }
  }
</script>
```

## Lifecycle Hook
let's to register lifecycle hooks inside setup :)
- `Lifecycle hooks` on `composition API` have the `same` name as for `Options API` but are `prefixed` with `on`: i.e. `mounted` would look like `onMounted`
- These functions accept a `callback` that will be executed when the hook is `called` by the component

| Options API       | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed\*        |
| `created`         | Not needed\*        |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |
---
- Demo: note here we `CAN'T` react to the change of `user` prop
``` js
import { fetchSecond } from '@/api/yikiapi'
import { ref, onMounted } from 'vue' // here have a hook
// in our component
setup (props) {
  const arr = ref([])
  const getList = async () => {
    arr.value = await fetchSecond(props.user)
  }
  onMounted(getList) // on `mounted` call `getList`
  
  onUpdated(() => {
      console.log('Component is updated!')
    })
  return {
    arr,
    getList
  }
}
// lack of watch ...
```

## watch
``` js
import { ref, watch } from 'vue'
setup (props) {
const counter = ref(0) // a reactive reference or getter func
watch(counter, (newValue, oldValue) => { // a callback
  console.log('The new counter value is: ' + counter.value)
      })
}
------ equivalent -----
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('The new counter value is: ' + this.counter)
    }
  }
}
```
## computed 
- returns a `read-only Reactive Reference` to the output of the getterlike callback passed as the first argument to computed
``` js
import { ref, computed } from 'vue'
setup (props) {
  const counter = ref(0)
  const twiceTheCounter = computed(() => counter.value * 2)
  counter.value++
  console.log(counter.value) // 1
  console.log(twiceTheCounter.value) // 2
}
``` 
## Provide and Inject
We can use `provide / inject` with the Composition API as well. Both can `only` be called during `setup()` with a current active instance
- background  
well let's to review how to use `provide/inject` in vue first :)
``` js
<!-- Parent.vue -->
<template>
  <Child />
</template>
<script>
import Child from './Child.vue'
export default {
  components: {
    Child
  },
  provide: { // pass params
    a: 'North Pole',
    b: {
      name: 'yiki',
      age: 8
    }
  }
}
</script>
------
<!-- Child.vue -->
<script>
export default {
  inject: ['a', 'b']
}
</script>
```
---
- inside `setup`
  - `Reactivity`: use `ref` or `reactive` when providing a value
  - `Mutating Reactive Propertiesit`: is recommended to keep any `mutations` to reactive properties inside of the provider `whenever` possible
  - we recommend using `readonly` on provided property if you want to ensure that the data passed through provide `cannot` be `mutated` by the injected component
``` js
<!-- Parent.vue -->
<template>
  <Child />
</template>
<script>
import { provide, reactive, ref, readonly } from 'vue'
import Child from './Child.vue'
export default {
  components: {
    Child
  },
  setup() { 
    // automatically updated
    const a_value = ref('North Pole')
    const b_value = reactive({
      name: 'yiki',
      age: 135
    })

  // providing a method that is responsible for mutating the reactive property
    const updateC = ()=>{
      a.a_value = 'change'
    }
   
    provide('a', a_value) // name(string) - value 
    provide('b', readonly(b_value)) // readonly
    provide('updateC', updateC) // mutation Reactive
  }
}
</script>
------- inject
<!-- Child.vue -->
<script>
import { inject } from 'vue'
export default {
  setup() {
    const usera = inject('a', 'The Universe') // name - default(optional)
    const userb = inject('b')
    const userc = inject('updateC') // mutation
    return {
      usera,
      userb,
      userc
    }
  }
}
</script>
```
## summary 
- `toRefs` ensure our watcher will `react` to changes made to the `prop`
``` js
import { fetchThird } from '@/api/yikiaip'
import { ref, onMounted, watch, toRefs } from 'vue'
setup (props) {

  const { user } = toRefs(props)
  const arr = ref([])
  const getList = async () => {
    arr.value = await fetchThird(user.value)
  }
  onMounted(fetchThird)

  watch(user, fetchThird)

  const querylist = ref('')
  const matchArr = computed(() => {
    return arr.value.filter(
      item => item.name.includes(querylist.value)
    )
  })
  return {
    arr,
    getList,
    querylist,
    matchArr
  }
}
```

