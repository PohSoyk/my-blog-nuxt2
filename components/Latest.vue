<template>
  <div class="wrapper" :class="{ 'change-top': headerHiddenFlag }">
    <h1 class="pageTitle">最新の記事</h1>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.id}`" class="link">
          {{ content.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
    headerHiddenFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      stickyChangeFlag: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 1160px) {
  .wrapper {
    position: sticky !important;
    top: 115px;
    transition: top 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .change-top {
    top: 35px !important;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    border-bottom: 1px solid #eee;

    a {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.28s;
    }

    a:hover {
      color: #999;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    border-bottom: 1px solid #eee;

    a {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.28s;
    }

    a:hover {
      color: #999;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
@media (max-width: 820px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  .list {
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
</style>
