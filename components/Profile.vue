<template>
  <div class="card">
    <div class="content">
      <div class="avatar">
        <source
          type="image/webp"
          src="https://images.microcms-assets.io/assets/26e0e403ee4244a49df93c05972f5999/02c381d89ddd401e8cd4a305905ed9db/profile.jpg?fit=crop&w=160&h=160&fm=webp"
        />
        <img
          src="https://images.microcms-assets.io/assets/26e0e403ee4244a49df93c05972f5999/02c381d89ddd401e8cd4a305905ed9db/profile.jpg?fit=crop&w=160&h=160&fm=webp"
          class="image lazyload"
          alt
        />
      </div>
      <p class="name">PoSo</p>
      <div class="icons">
        <v-btn
          aria-label="twitter"
          href="https://twitter.com/PohSoyk"
          target="_blank"
          rel="noopener noreferrer"
          icon
          color="#00acee"
        >
          <v-icon>{{ Twitter }}</v-icon>
        </v-btn>
        <v-btn
          aria-label="github"
          href="https://github.com/PohSoyk"
          target="_blank"
          rel="noopener noreferrer"
          icon
          color="#000000"
        >
          <v-icon>{{ Github }}</v-icon>
        </v-btn>
      </div>
      <p class="profile">
        高卒フリーターからエンジニアに就職した25歳 ♂。<br />
        現在はスタートアップのWEBエンジニアをやっています。フロントエンド担当。<br />
        IT技術、プログラミング、WEB制作の情報を中心に発信をしていきます。
      </p>
    </div>
  </div>
</template>

<script>
import { mdiTwitter, mdiGithub } from '@mdi/js'
export default {
  data: () => ({
    Twitter: mdiTwitter,
    Github: mdiGithub,
  }),
}
</script>

<style scoped>
.card {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-width: thin;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  word-wrap: break-word;
  position: relative;
  white-space: normal;
  margin-bottom: 40px;
}

.content {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  align-items: center;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1;
  overflow: hidden;
  padding: 12px 0;
  justify-content: center;
}

.avatar {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  margin-bottom: 2px;
  margin-top: 32px;
  height: 160px;
  min-width: 160px;
  width: 160px;
}

.image {
  border-radius: inherit;
  display: inline-flex;
  height: inherit;
  width: inherit;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

.name {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  word-break: break-all;
  line-height: 1.1;
  flex: 1 0 100%;
  justify-content: center;
  padding: 16px;
  margin-bottom: 2px;
}

.icons {
  justify-content: center;
  padding: 0;
  line-height: 1.1;
  flex: 1 0 100%;
  align-items: center;
  display: flex;
  margin-bottom: 2px;
}

.profile {
  line-height: 1.5;
  width: 100%;
  padding: 16px;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0071428571em;
}

@media (min-width: 600px) and (max-width: 1160px) {
  .profile {
    padding: 16px 60px;
  }
}
</style>
