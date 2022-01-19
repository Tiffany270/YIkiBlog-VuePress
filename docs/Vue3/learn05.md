# Feature - Teleport

::: tip
 .... don't know what's this lol  
 just kidding ...   
 `Teleport` provides a clean way to allow us to control under which `parent` in our DOM we want a `piece` of HTML to be rendered, `without` having to resort to global state or splitting this into two components
:::
` <teleport to="#id">` or `<teleport to="body"> body is a div tag`
## How to use
- Let's modify our `modal-button` to use `<teleport>` and tell Vue "teleport this HTML to the `body tag` 
``` js
app.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal!  (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
    <!-- 
    res :
    <body>
    ....
    <div class = "modal"></div>
    </body>
    -->
  `,
  data() {
    return {
      modalOpen: false
    }
  }
})
```

## multiple teleports
-  The order will be a simple `append - later` mounts will be located after earlier ones within the target element
``` js
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```