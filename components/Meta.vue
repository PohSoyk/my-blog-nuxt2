<template>
  <div>
    <div class="meta">
      <span v-if="category" class="category"
        ><nuxt-link :to="`/category/${category.id}/page/1`" class="link">{{
          category.name
        }}</nuxt-link></span
      >
      <span class="timestamp">
        <img src="/images/icon_clock.svg" alt />
        <time :datetime="$dayjs(createdAt).format('YYYY-MM-DD')">
          {{ $dayjs(createdAt).format('YYYY/MM/DD') }}
        </time>
      </span>
      <span v-if="updatedAt" class="timestamp">
        <img src="/images/icon_undo.svg" alt />
        <time :datetime="$dayjs(updatedAt).format('YYYY-MM-DD')">
          {{ $dayjs(updatedAt).format('YYYY/MM/DD') }}
        </time>
      </span>
      <!-- <span v-if="author" class="author">
        <img src="/images/icon_author.svg" alt />
        {{ author }}
      </span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: false,
      default: undefined,
    },
    author: {
      type: String,
      required: false,
      default: undefined,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
};
</script>

<style scoped>
@media (min-width: 600px) {
  .meta {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }

  .category {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #331cbf;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity, background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
    /* margin: 10px 0 2px; */
  }

  .category:hover {
    background-color: #f0f0ff;
  }

  .link {
    color: #331cbf;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;

    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }
}
@media (max-width: 600px) {
  .meta {
    padding: 4px 0 30px;
    font-size: 14px;
    align-items: center;
    display: flex;
  }

  .category {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid #331cbf;
    color: #331cbf;
    white-space: nowrap;
    border-radius: 3px;
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity, background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
    /* margin: 10px 0 4px; */
  }

  .category:hover {
    background-color: #f0f0ff;
  }

  .link {
    color: #331cbf;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;
    margin-right: 20px;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }
}
</style>
