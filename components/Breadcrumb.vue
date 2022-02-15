<template>
  <ul class="breadcrumb">
    <li class="breadcrumbList">
      <nuxt-link to="/">
        <img src="/images/icon_home.svg" alt="home" />
        記事一覧
      </nuxt-link>
    </li>
    <li v-if="hasCategory(category)" class="breadcrumbList">
      <nuxt-link :to="`/category/${category.id}/page/1`">{{
        category.name
      }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    hasCategory(category) {
      return Object.keys(category).length > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-top: 12px;
}

.breadcrumbList {
  color: #616269;

  a {
    color: #331cbf;
  }

  img {
    color: #331cbf;
    height: 18px;
    width: 18px;
    vertical-align: text-top;
  }

  &::after {
    content: '>';
    margin: 0 10px;
  }

  &:last-child {
    &::after {
      content: '';
      margin: 0;
    }
  }
}

@media (max-width: 600px) {
  .breadcrumbList {
    font-size: 14px;

    img {
      height: 16px;
      width: 16px;
    }
  }
}
</style>
