<template>
    <div class="toasts">
      <ToastElement v-for="toast in toasters" :toast="toast" />
    </div>
</template>

<script>
import ToastElement from './ToastElement.vue';

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
  components: { ToastElement },

  methods: {
    success(message) {
      this.toasters.push({
        text: message,
        type: "success"
      });
      this.setFade();
    },
    error(message) {
      this.toasters.push({
        text: message,
        type: "error"
      });
      this.setFade();
    },
    setFade() {    
      setTimeout(
        () => this.toasters.splice(0, 1)
        , this.lifetime
      );
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
