<template>
  <v-card class="card" elevation="1">
    <v-list-item-content>
      <!-- <v-card-title class="title">プロフィール</v-card-title> -->
      <v-avatar class="avatar" size="160">
        <source
          type="image/webp"
          :data-srcset="writer.image.url + '?fit=crop&w=160&h=160&fm=webp'"
        />
        <img
          :data-src="writer.image.url + '?fit=crop&w=160&h=160&q=160'"
          class="image lazyload"
          alt
        />
      </v-avatar>
      <v-card-title class="name">PoSo</v-card-title>
      <v-card-actions class="icons">
        <v-btn
          href="https://twitter.com/PohSoyk"
          target="_blank"
          rel="noopener noreferrer"
          icon
          color="#00acee"
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          href="https://github.com/PohSoyk"
          target="_blank"
          rel="noopener noreferrer"
          icon
          color="#000000"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text class="profile">
        フリーターから未経験でエンジニアに転職しました。<br />
        大学中退→フリーター(1年半)→住宅販売会社 社内SE(7ヶ月)→受託開発企業
        エンジニア<br />
        IT技術、プログラミング、アプリ開発の情報を中心に発信をしていきます。
      </v-card-text>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  props: {
    writer: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 40px;
}

.avatar {
  margin-top: 32px;
}

.title {
  margin-bottom: 16px !important;
  font-weight: bold;
}

.name {
  justify-content: center;
}

.icons {
  justify-content: center;
  padding: 0;
}

.profile {
  line-height: 1.5;
}
</style>
