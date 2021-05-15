<template>
  <ul class="breadcrumb">
    <li class="breadcrumbList">
      <nuxt-link to="/">
        <v-icon class="icon" color="#331cbf">{{ home }}</v-icon>
        ホーム
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
import { mdiHomeOutline } from '@mdi/js';
export default {
  data: () => ({
    home: mdiHomeOutline,
  }),
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  methods: {
    hasCategory(category) {
      return Object.keys(category).length > 0;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.breadcrumbList {
  color: #616269;

  a {
    color: #331cbf;
  }

  &::after {
    content: '>';
    margin: 0 10px;
  }

  &:last-child&::after {
    content: '';
    margin: 0;
  }
}

.icon {
  vertical-align: text-bottom !important;
  height: 20px;
  width: 20px;
}

@media (max-width: 600px) {
  .breadcrumbList {
    font-size: 14px;
  }
}
</style>
