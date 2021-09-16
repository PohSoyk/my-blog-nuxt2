import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  // Validator,
  localize,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import { required, email, max } from 'vee-validate/dist/rules'

// 日本語
localize('ja', ja)

// 必須
extend('required', required)
// メールアドレス
extend('email', email)
// 文字数上限
extend('max', max)
// カタカナのみ
extend('katakana', {
  message: (field) => {
    return field + 'は全角カタカナのみ使用できます'
  },
  validate: (value) => {
    return /^[ァ-ン]+$/.test(value)
  },
})

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
