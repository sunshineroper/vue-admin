import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    msg: {
      test: 'hello, world'
    }
  },
  zh: {
    mesg: {
      test: '你好'
    }
  }
}

const locale = 'en'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages
})

export default i18n
