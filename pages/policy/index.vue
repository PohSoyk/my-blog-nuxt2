<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <div class="container">
        <ul class="breadcrumb">
          <li class="breadcrumbList">
            <nuxt-link to="/">
              <img src="/images/icon_home.svg" alt="home" />
              記事一覧
            </nuxt-link>
          </li>
          <li class="breadcrumbList">
            プライバシーポリシー
          </li>
        </ul>
        <div class="main">
          <h1 class="title">プライバシーポリシー</h1>
          <Toc :toc="toc" :visible="toc_visible" />
          <Post :body="body" />
        </div>
      </div>

      <aside class="aside">
        <Profile />
        <Banner id="list" :banner="banner" />
        <Search />
        <Categories :categories="categories" />
        <PopularArticles :contents="popularArticles" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';

export default {
  async asyncData({ payload, $config }) {
    const popularArticles =
      payload !== undefined && payload.popularArticles !== undefined
        ? payload.popularArticles
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/popular-articles`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data.articles;
    const banner =
      payload !== undefined
        ? payload.banner
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/banner`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data;
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const policy = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/policy`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const $ = cheerio.load(policy.data.body);
    const headings = $('h1, h2, h3').toArray();
    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      };
    });
    return {
      body: $.html(),
      toc,
      popularArticles,
      banner,
      categories: categories.data.contents,
      toc_visible: policy.data.toc_visible,
    };
  },
  data() {
    return {
      categories: this.categories || [],
    };
  },
  head() {
    return {
      title: 'プライバシーポリシー',
    };
  },
};
</script>

<style scoped>
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

  .container {
    width: 820px;
  }

  .main {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-top: 50px;
    -webkit-font-smoothing: antialiased;
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

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .title {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Verdana, Roboto, 'Droid Sans', '游ゴシック',
      YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
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

  .main {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-top: 60px;
    -webkit-font-smoothing: antialiased;
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

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic,
      'ヒラギノ角ゴ ProN W3', Hiragino Kaku Gothic ProN, Roboto, 'Droid Sans',
      '游ゴシック', YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
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

  .main {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-top: 50px;
    -webkit-font-smoothing: antialiased;
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

    &:last-child&::after {
      content: '';
      margin: 0;
    }
  }

  .title {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic,
      'ヒラギノ角ゴ ProN W3', Hiragino Kaku Gothic ProN, Roboto, 'Droid Sans',
      '游ゴシック', YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 34px;
    color: #2b2c30;
  }
}
</style>
