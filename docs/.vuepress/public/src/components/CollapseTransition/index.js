const elTransitionY = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out'
const elTransitionX = '0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out'
const TransitionX = {
  'before-enter'(el) {
    el.style.transition = elTransitionX
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingLeft = el.style.paddingLeft
    el.dataset.oldPaddingRight = el.style.paddingBottom
    el.style.width = 0
    el.style.paddingLeft = 0
    el.style.paddingRight = 0
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollWidth !== 0) {
      el.style.width = el.scrollWidth + 'px'
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
    } else {
      el.style.width = ''
      el.style.paddingLeft = el.dataset.oldPaddingLeft
      el.style.paddingRight = el.dataset.oldPaddingRight
    }

    el.style.overflow = 'hidden'
  },

  'after-enter'(el) {
    el.style.transition = ''
    el.style.width = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave'(el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingLeft = el.style.paddingLeft
    el.dataset.oldPaddingRight = el.style.paddingRight
    el.dataset.oldOverflow = el.style.overflow
    el.style.width = el.scrollWidth + 'px'
    el.style.overflow = 'hidden'
  },

  leave(el) {
    if (el.scrollWidth !== 0) {
      el.style.transition = elTransitionX
      el.style.width = 0
      el.style.paddingLeft = 0
      el.style.paddingRight = 0
    }
  },

  'after-leave'(el) {
    el.style.transition = ''
    el.style.width = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingLeft = el.dataset.oldPaddingLeft
    el.style.paddingRight = el.dataset.oldPaddingRight
  }
}
const TransitionY = {
  'before-enter'(el) {
    el.style.transition = elTransitionY
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }

    el.style.overflow = 'hidden'
  },

  'after-enter'(el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave'(el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow
    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransitionY
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }
  },

  'after-leave'(el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
  }
}
const typeMap = {
  y: TransitionY,
  x: TransitionX
}
export default {
  name: 'CollapseTransition',
  functional: true,
  props: {
    direction: {
      type: String, // 控制展开方向 x y
      default: 'y'
    }
  },
  render(h, { children, props }) {
    console.log('YYYY')
    const data = {
      on: typeMap[props.direction]
    }
    return h('transition', data, children)
  }
}
