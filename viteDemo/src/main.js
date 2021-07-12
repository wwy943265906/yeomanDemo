import { str } from './moduleA.js';
import { createApp} from 'vue';

// console.log('main....', str);

// const App = {
//     render () {
//         return h('div', null, [h('div', null, String('1233'))]);
//     }
// }

createApp(App).mount('#app'); 