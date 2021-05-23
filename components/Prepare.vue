<template>
  <div class="container">
    <dl>
      <dt>
        <img class="status" src="/images/icon_clock.svg" alt />
      </dt>
      <dd class="title">公開準備中</dd>
      <dd class="message">
        このページは現在製作中です。<br />今しばらくお待ち下さい。
      </dd>
      <dd>
        <nuxt-link class="link" to="/">
          <v-btn class="btn" outlined large color="#999">
            Topページへ
          </v-btn>
        </nuxt-link>
      </dd>
    </dl>
  </div>
</template>

<style scoped>
.container {
  justify-content: center;
  text-align: center;
  margin-top: 120px;
}
.status {
  height: 100px;
  width: 100px;
  color: #999;
  margin-bottom: 15px;
}
.title {
  color: #2b2c30;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;
}
.message {
  color: #999;
  font-size: 20px;
}
.btn {
  margin-top: 30px;
}

.link {
  color: #999;
}
</style>
