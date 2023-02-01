import { createApp, defineComponent } from './vendor/vue.esm-browser.js';


// Создайте Vue приложение
const CompOptions = {
  name: "Lesson01-basics"
  , data() {
    return  {
      count: 0
    }
  }
}
const Component = defineComponent(CompOptions);

const vm = createApp(Component).mount("#app");
