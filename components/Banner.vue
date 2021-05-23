<template>
  <div class="wrapper">
    <h1 class="pageTitle">使用しているCMS</h1>
    <a
      v-if="banner && banner.image"
      :href="`${banner.url}`"
      class="link"
      target="banner"
    >
      <picture v-if="banner.image">
        <source
          type="image/webp"
          :srcset="`${banner.image.url}?w=300&fm=webp, ${banner.image.url}?w=600&fm=webp 2x`"
        />
        <img :src="banner.image.url" class="image lazyload" :alt="banner.alt" />
      </picture>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      required: false,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.wrapper a {
  text-align: center;
}

.image {
  width: 280px;
  border-radius: 5px;
}

.link {
  display: block;
  margin-bottom: 40px;
}

@media (min-width: 1160px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}

@media (min-width: 520px) and (max-width: 1160px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}

@media (max-width: 520px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
}
</style>
