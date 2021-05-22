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
      <div v-if="open" class="mask" @click="setOpen(false)"></div>
      <div class="menu" :class="{ isOpen: open }">
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
    </header>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.params || '',
      open: false,
      headerHiddenFlag: false,
    };
  },
  mounted() {
    this.params = location.search || '';
    let startPos = 0;
    window.addEventListener('scroll', () => {
      const currentPos =
        window.pageYOffset || document.documentElement.scrollTop;
      this.headerHiddenFlag = currentPos - startPos > 0;
      startPos = currentPos;
    });
  },
  methods: {
    setOpen(value) {
      this.open = value;
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
@media (min-width: 800px) {
  .is-hidden {
    transform: translateY(-73px);
  }

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
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
  .is-hidden {
    transform: translateY(-64px);
  }

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
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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

  @keyframes headerShow {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes headerHidden {
    from {
      opacity: 1;
      transform: translateY(0px);
    }

    to {
      opacity: 0;
      transform: translateY(-10px);
    }
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
    animation: headerHidden 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &.isOpen {
      animation: headerShow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
    }
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
