<template>
  <v-app>
    <v-row no-gutters justify="center">
      <v-col cols="10">
        <v-sheet class="form-group" color="transparent">
          <ValidationObserver
            ref="obs"
            v-slot="{ invalid, validated }"
            name="contact"
          >
            <v-form
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              @submit.prevent="onSubmit"
            >
              <input type="hidden" name="form-name" value="contact" />
              <ValidationProvider
                v-slot="{ errors }"
                name="お名前"
                rules="required|max:20"
              >
                <v-text-field
                  v-model="name"
                  :error-messages="errors"
                  :counter="20"
                  required
                  autocomplete="name"
                  color="#385cae"
                  label="お名前"
                  outlined
                  dense
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email|max:256"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  required
                  autocomplete="email"
                  color="#385cae"
                  label="メールアドレス"
                  outlined
                  dense
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="お問い合わせ内容"
                rules="required|max:1000"
              >
                <v-textarea
                  v-model="message"
                  :error-messages="errors"
                  :counter="1000"
                  color="#385cae"
                  label="お問い合わせ内容"
                  outlined
                  rows="5"
                ></v-textarea>
              </ValidationProvider>
              <div v-show="false" class="p-contact__item">
                <label for="message">スパムでない場合は空欄</label>
                <input v-model="botField" type="text" name="bot-field" />
              </div>
              <v-row>
                <v-btn
                  d-block
                  class="mx-auto px-12 white--text"
                  x-large
                  color="#385cae"
                  :loading="loading"
                  :disabled="invalid || !validated"
                  type="submit"
                  >送信
                </v-btn>
              </v-row>
              <v-snackbar v-model="snackbar" color="success" timeout="4000">
                {{ snackbarText }}
                <template v-slot:action="{ attrs }">
                  <v-btn text v-bind="attrs" @click="snackbar = false">
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
              <v-snackbar v-model="snackbarError" color="error" timeout="5000">
                {{ snackbarText }}
                <template v-slot:action="{ attrs }">
                  <v-btn text v-bind="attrs" @click="snackbarError = false">
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-form>
          </ValidationObserver>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from 'axios';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    name: undefined,
    email: undefined,
    message: undefined,
    botField: '',
    inputdata: false,
    makesure: true,
    loading: false,
    snackbar: false,
    snackbarText: undefined,
    snackbarError: false,
  }),

  methods: {
    onSubmit() {
      this.loading = true;
      const params = new URLSearchParams();
      params.append('form-name', 'contact');
      params.append('name', this.name);
      params.append('email', this.email);
      params.append('message', this.message);
      if (this.botField) {
        params.append('bot-field', this.botField);
      }
      axios
        .$post('/', params)
        .then(() => {
          this.snackbarText = 'お問い合わせを送信しました！';
          this.snackbar = true;
          this.loading = false;
          this.inputdata = false;
          this.makesure = true;
          this.$refs.obs.reset();
        })
        .catch(() => {
          this.snackbarText = 'お問い合わせの送信が失敗しました';
          this.snackbarError = true;
        });
    },
  },
};
</script>

<style>
.v-application--wrap {
  min-height: 100% !important;
}

.form {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  max-width: 100%;
}

.form-group {
}

.v-messages__message {
  line-height: 13px !important;
}
</style>