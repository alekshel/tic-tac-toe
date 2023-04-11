import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from "./i18n/index"

import App from './App.vue'
import './assets/main.css'

let browserLocale = navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

if (browserLocale == "ru") {
    browserLocale = "uk"
}

let currentLocale = localStorage.getItem("language") ?? browserLocale

const i18n = createI18n({
    locale: currentLocale,
    fallbackLocale: 'en',
    messages
})

const app = createApp(App)

app.use(i18n)
app.mount('#app')
