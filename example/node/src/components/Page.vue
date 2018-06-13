<template>
  <div :class="clazz" v-html="innerHTML"></div>
</template>

<script>
export default {
  props: ['clazz', 'innerHTML'],
  inheritAttrs: false
}
</script>
