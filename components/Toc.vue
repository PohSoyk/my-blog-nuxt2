<template>
  <div v-if="visible" class="wrapper">
    <h4 class="title" @click="isShow()">
      <transition name="rotate" mode="out-in">
        <img
          v-if="show"
          key="rotate1"
          src="/images/icon_caret_down_solid.svg"
          alt="目次"
        />
        <img
          v-else
          key="rotate2"
          src="/images/icon_caret_right_solid.svg"
          alt="目次"
        />
      </transition>
      目次
    </h4>
    <transition name="open">
      <ul v-if="show" class="lists">
        <li v-for="item in toc" :key="item.id" :class="`list ${item.name}`">
          <n-link v-scroll-to="`#${item.id}`" to>
            {{ item.text }}
          </n-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
      default: () => [],
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      show: true,
    }
  },
  methods: {
    isShow() {
      this.show = !this.show
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f7f7fc;
  border-radius: 5px;
  padding: 20px;
  margin: 43px 0 25px 0;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
  border-radius: 5px;
  text-decoration: underline;
  display: inline-block;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  & img {
    vertical-align: -5%;
  }
}

.list {
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px solid #e7e7f3;

  a:hover {
    color: #331cbf;
  }

  &::before {
    content: '-';
    margin-right: 5px;
    color: #cacae7;
  }

  &.h2 {
    margin-left: 10px;
  }

  &.h3 {
    margin-left: 20px;
  }
}
@keyframes open {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.open-enter-active {
  animation: open 0.2s;
}
.open-leave-active {
  animation: open 0.1s linear reverse;
}
@keyframes rotate {
  0% {
    transform: rotate(180deg);
  }
}
.rotate-enter-active {
  animation: rotate 0.45s linear;
}
@media (max-width: 600px) {
  .wrapper {
    margin: 20px 0 25px 0;
  }
}
</style>
