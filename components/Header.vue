<template>
  <div>
    <header class="header" :class="{ 'is-hidden': headerHiddenFlag }">
      <h1 class="logo">
        <nuxt-link to="/">
          <img class="logoImg" src="/images/logo.svg" alt="PoSo's Note" />
        </nuxt-link>
      </h1>
      <button class="menuBtn" @click="toggleOpen()">
        <img src="/images/icon_menu.svg" alt="menu" />
      </button>
      <transition name="mask">
        <div v-if="open" class="mask" @click="setOpen(false)"></div>
      </transition>
      <transition name="menu">
        <div v-if="open" class="menu">
          <ul class="lists">
            <li class="list">
              <nuxt-link to="/profile">プロフィール</nuxt-link>
            </li>
            <li class="list">
              <nuxt-link to="/portfolio">ポートフォリオ</nuxt-link>
            </li>
            <li class="list">
              <nuxt-link to="/contact">お問い合わせ</nuxt-link>
            </li>
          </ul>
        </div>
      </transition>
    </header>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  props: {
    headerHiddenFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      params: this.params || '',
      open: false,
    }
  },
  mounted() {
    this.params = location.search || ''
  },
  methods: {
    setOpen(value) {
      this.open = value
    },
    toggleOpen() {
      this.open = !this.open
    },
  },
}
</script>

<style scoped>
@media (min-width: 800px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
  }

  .empty {
    height: 80px;
    margin-bottom: 40px;
  }

  .logo {
    padding: 8px 0;
    margin-right: 30px;

    a {
      display: block;
      height: 28px;
    }
  }

  .logoImg {
    height: 28px;
  }

  .menuBtn {
    display: none;
  }

  .menu {
    display: flex;
    padding: 12px 0;
  }

  .lists {
    display: flex;
    align-items: center;
  }

  .list {
    margin-right: 30px;
    white-space: nowrap;

    &.noMargin {
      margin: 0;
    }

    a,
    a:visited {
      color: var(--color-text-main);
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 0.28s;
      position: relative;
      display: inline-block;
    }

    a::after {
      position: absolute;
      bottom: -4px;
      left: 0;
      content: '';
      width: 100%;
      height: 1px;
      background: #331cbf;
      transform: scale(0, 1);
      transform-origin: center top;
      transition: transform 0.3s;
    }

    a:hover {
      color: #331cbf;
    }

    a:hover::after {
      transform: scale(1, 1);
    }
  }
}

@media (max-width: 800px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 16px;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
  }

  .empty {
    height: 61px;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    height: 28px;
  }

  .menuBtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  @keyframes mask {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  .mask-enter-active {
    animation: mask 0.3s;
  }
  .mask-leave-active {
    animation: mask 0.1s linear reverse;
  }
  @keyframes menu {
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .menu-enter-active {
    animation: menu 0.3s;
  }
  .menu-leave-active {
    animation: menu 0.1s linear reverse;
  }

  .menu {
    position: absolute;
    left: 0;
    top: 61px;
    display: none;
    flex-direction: column-reverse;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
    z-index: 2001;
    padding-top: 8px;
    display: flex;
  }

  .lists {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }
  }

  .list {
    padding: 0 16px;
    white-space: nowrap;

    a {
      display: block;
      color: var(--color-text-main);
      padding: 8px 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    &:last-child a {
      border-bottom: none;
    }
  }

  .mask {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }
}
</style>
