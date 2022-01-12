# Feature - Composition API

::: tip
It would be much nicer if we could collocate code related to the same logical concern. And this is exactly what the Composition API enables us to do
:::

## setup
Well, we first need a place where we can actually use it  
keywords: component option
- should be a `function` accepts `props` and `context`
- it's executed `before` the component is `created`
- `called` before `data` properties, `computed` properties or `methods` are `resolved`
- once the `props` are `resolved`
- serves as the `entry` point for composition APIs
- everything that we `return` from setup will be `exposed` to the rest of our component (computed properties, methods, lifecycle hooks and so on) as well as to the component's template
---
- NOTE: `avoid` using `this` inside `setup` as it won't refer to the component instance, `data`,`computed`,`mehtods` won't be available within setup
---
``` js
// demo.vue (note that here is NOT perfect!!!)
import { fetchOne} from '@/api/repositories'
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
    arr,
    getOneData // functions returned behave the same as methods
    } 
  }
  // the "rest" of the component
  ... 
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

## Lifecycle Hook
let's to register lifecycle hooks inside setup :)
- `Lifecycle hooks` on `composition API` have the `same` name as for `Options API` but are `prefixed` with `on`: i.e. `mounted` would look like `onMounted`
- These functions accept a `callback` that will be executed when the hook is `called` by the component
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