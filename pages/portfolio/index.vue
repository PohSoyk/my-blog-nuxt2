<template>
  <div class="wrapper">
    <Header :header-hidden-flag="headerHiddenFlag" />
    <div class="divider">
      <div class="containers">
        <ul class="breadcrumb">
          <li class="breadcrumbList">
            <nuxt-link to="/">
              <img src="/images/icon_home.svg" alt="home" />
              記事一覧
            </nuxt-link>
          </li>
          <li class="breadcrumbList">ポートフォリオ</li>
        </ul>
        <Prepare />
      </div>

      <aside class="aside">
        <Profile />
        <Banner id="list" :banner="banner" />
        <Search />
        <Categories :categories="categories" />
        <PopularArticles :contents="popularArticles" />
        <Latest :contents="contents" :header-hidden-flag="headerHiddenFlag" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData({ payload, $microcms }) {
    const popularArticles =
      payload !== undefined && payload.popularArticles !== undefined
        ? payload.popularArticles
        : (
            await $microcms.get({
              endpoint: 'popular-articles',
            })
          ).articles
    const banner =
      payload !== undefined
        ? payload.banner
        : await $microcms.get({
            endpoint: 'banner',
          })
    const { contents } = await $microcms.get({
      endpoint: 'blog',
    })
    const categories = await $microcms.get({
      endpoint: 'categories',
      queries: {
        limit: 100,
      },
    })
    return {
      popularArticles,
      banner,
      categories: categories.contents,
      contents,
    }
  },
  data() {
    return {
      categories: this.categories || [],
      contents: this.contents || [],
      headerHiddenFlag: false,
    }
  },
  mounted() {
    let startPos = 0
    let timeout = {}
    window.addEventListener('scroll', () => {
      const currentPos =
        window.pageYOffset || document.documentElement.scrollTop
      clearTimeout(timeout)
      this.headerHiddenFlag = currentPos - startPos > 1
      timeout = setTimeout(() => {
        startPos = currentPos
      }, 100)
    })
  },
  head() {
    return {
      title: '公開準備中',
    }
  },
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.breadcrumbList img {
  color: #331cbf;
  height: 18px;
  width: 18px;
  vertical-align: text-top;
}

@media (min-width: 1160px) {
  .wrapper {
    position: relative;
  }

  .divider {
    display: flex;
    justify-content: space-between;
    width: 1160px;
    margin: 20px auto 0;
  }

  .containers {
    width: 820px;
  }

  .aside {
    width: 300px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
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

    &:last-child {
      &::after {
        content: '';
        margin: 0;
      }
    }
  }

  .title {
    display: block;
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
    border: solid #385cae;
    border-width: 0 0 0 6px;
  }
  .text {
    line-height: 1.8;
    letter-spacing: 0.2px;
    padding: 0 0 2em;
    font-size: 18px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .loader {
    color: #ccc;
    text-align: center;
    font-size: 16px;
    padding-top: 20px;
  }

  .divider {
    margin: 20px auto 0;
    width: 740px;
  }

  .article {
    width: 740px;
  }

  .aside {
    margin-top: 60px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .list {
    padding: 20px 0;
  }

  .link {
    display: flex;
    justify-content: space-between;
  }

  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
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

    &:last-child {
      &::after {
        content: '';
        margin: 0;
      }
    }
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    display: block;
    font-size: 30px;
    color: #2b2c30;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
    border: solid #385cae;
    border-width: 0 0 0 6px;
  }
  .text {
    line-height: 1.8;
    letter-spacing: 0.2px;
    padding: 0 0 2em;
    font-size: 18px;
  }
}
@media (max-width: 820px) {
  .loader {
    color: #ccc;
    text-align: center;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 6px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }

  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  .article {
    width: 100%;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }

  .list {
    padding: 32px 0 0;
    border-bottom: 1px solid #eee;

    &:first-child {
      padding-top: 16px;
    }
  }

  .ogimage {
    width: 100%;
    border-radius: 5px;
  }

  .icon {
    font-size: 19px !important;
  }

  .breadcrumbList {
    color: #616269;
    font-size: 14px;

    a {
      color: #331cbf;
    }

    img {
      height: 16px;
      width: 16px;
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

  .title {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
    border: solid #385cae;
    border-width: 0 0 0 4.8px;
  }

  .text {
    line-height: 1.8;
    letter-spacing: 0.2px;
    padding: 0 0 2em;
    font-size: 16px;
  }
}
</style>
