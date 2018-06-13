<template>
  <div :class="clazz">Hello Vue</div>
</template>

<script>
export default {
  props: ['clazz'],
  inheritAttrs: false
}
</script>
