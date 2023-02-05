<template>
  <div class="toast" :class="toast.toastClass">
    <ui-icon class="toast__icon" :icon="toast.iconName" />
    <span >{{ toast.text }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  props: {
    toast: {
      type:Object,
      required: true,
    }
  },
  name: 'Toast',
  components: { UiIcon },

};
</script>

<style>
</style>