<template>
  <div class="theme-container">
    <div class="content">
      <form id="test1" @submit="checkForm" action="https://vuejs.org/" method="post">
        <div v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
          </ul>
        </div>

        <div>
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" name="name" />
        </div>

        <div>
          <label for="age">Age</label>
          <input id="age" v-model="age" type="text" name="age" min="0" />
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      errors: [],
      name: null,
      age: null
    }
  },
  mounted () {
    this.$http
      .get(this.$servePath + 'security/name1')
      .then(response => console.log(response))
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true
      }
      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.age) {
        this.errors.push('Age required.')
      }

      e.preventDefault()
    }
  }
}
</script>
