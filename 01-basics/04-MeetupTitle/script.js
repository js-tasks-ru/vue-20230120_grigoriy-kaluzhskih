import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const CompOptions = {
  name: 'Lesson01-basics',
  data() {
    return {
      meetupId: null,
      dataset: ""
    };
  },
  computed: {
  },
  watch: {
    async meetupId() {
      this.dataset = await fetchMeetupById(this.meetupId);
    }
  }
};
const Component = defineComponent(CompOptions);

const vm = createApp(Component).mount('#app');
window.vm = vm;
