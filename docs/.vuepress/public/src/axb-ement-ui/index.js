import Vue from 'vue'
import axbElementui from 'axb-element-ui'
import 'axb-element-ui/lib/axb-element-ui.css'
import Permission from '@/mixins/Permission'
Vue.mixin(Permission)
Vue.use(axbElementui)
