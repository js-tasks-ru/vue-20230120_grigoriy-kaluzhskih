<template>
    <div class="toasts">
      <Toast v-for="toast in toasters" :toast="toast" />
    </div>
</template>

<script>
import Toast from './Toast.vue';

export default {
  
  name: 'TheToaster',

  data () {
    return {
      iconName: null,
      lifetime: 5000,
      text: "",
      toastClass: null,
      toasters: [],
    }
  },
  components: { Toast },

  methods: {
    success(message) {
      this.toasters.push({
        text:message,
        toastClass:"toast_success",
        iconName:"check-circle",
      });
      this.setFade();
    },
    error(message) {
      this.toasters.push({
        text:message,
        toastClass:"toast_error",
        iconName:"alert-circle",
      });
      this.setFade();
    },
    setFade() {    
      setTimeout(function () {
        this.toasters.splice(0, 1);
      }.bind(this), this.lifetime);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
