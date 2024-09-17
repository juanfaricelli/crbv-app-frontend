/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
console.log("API URL:", process.env.APP_API);
console.log("Node Environment:", process.env.NODE_ENV);

app.mount('#app')
