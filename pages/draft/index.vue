<template>
  <div class="wrapper">
    <Header :header-hidden-flag="headerHiddenFlag" />
    <div class="divider">
      <p v-if="!data.id" class="loading">Now Loading...</p>
      <article v-if="data.id" class="article">
        <div v-if="data.ogimage" class="ogimageWrap">
          <img
            ref="ogimage"
            :src="data.ogimage.url + '?w=820&q=100'"
            :srcset="
              data.ogimage.url +
              '?w=375&q=100 375w,' +
              data.ogimage.url +
              '?w=750&q=100 750w,' +
              data.ogimage.url +
              '?w=820&q=100 820w'
            "
            class="ogimage"
          />
        </div>
        <Breadcrumb :category="data.category" />
        <div class="main">
          <Share
            :id="data.id"
            :title="data.title"
            :header-hidden-flag="headerHiddenFlag"
          />
          <div class="containers">
            <h1 class="title">{{ data.title }}</h1>
            <Meta
              :created-at="data.publishedAt || data.createdAt"
              :updated-at="data.updatedAt"
              :category="data.category"
            />
            <Intro :intro="data.intro" />
            <Toc :id="data.id" :toc="toc" :visible="data.toc_visible" />
            <Post :body="data.body" />
            <Writer v-if="data.writer" :writer="data.writer" />
            <Partner v-if="data.partner" :partner="data.partner" />
            <Conversion :id="data.id" />
            <RelatedBlogs
              v-if="data.related_blogs.length > 0"
              :blogs="data.related_blogs"
              :header-hidden-flag="headerHiddenFlag"
            />
          </div>
        </div>
      </article>
      <aside class="aside">
        <Profile />
        <Banner :id="`draft-${data.id}`" :banner="banner" />
        <Search />
        <Categories :categories="categories" />
        <Latest :contents="contents" :header-hidden-flag="headerHiddenFlag" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ $microcms }) {
    const categories = await $microcms.get({
      endpoint: 'categories',
      queries: {
        limit: 100,
      },
    })
    const banner = await $microcms.get({
      endpoint: 'banner',
    })
    const { contents } = await $microcms.get({
      endpoint: 'blog',
    })
    return {
      categories: categories.contents,
      banner,
      contents,
    }
  },
  data() {
    return {
      data: {
        id: '',
        ogimage: {
          url: '',
        },
        intro: '',
        body: '',
        title: '',
        createdAt: '',
        publishedAt: '',
        toc_visible: false,
        writer: {
          id: '',
          name: '',
          image: {
            url: '',
          },
          text: '',
        },
        partner: {
          id: '',
          company: '',
          url: '',
          description: '',
          logo: {
            url: '',
          },
        },
        category: {
          name: '',
          color: '',
        },
        related_blogs: [],
      },
      toc: [],
      contents: [],
      categories: [],
      headerHiddenFlag: false,
    }
  },
  async created() {
    const query = this.$route.query
    if (query.id === undefined || query.draftKey === undefined) {
      return
    }
    const { data, error } = await axios
      .get(
        `/.netlify/functions/draft?id=${query.id}&draftKey=${query.draftKey}`
      )
      .catch((error) => ({ error }))
    if (error) {
      return
    }
    this.data = data
    this.data.intro =
      data.introduction !== undefined
        ? this.$parser(data.introduction).html
        : ''
    this.toc = this.$parser(data.body).toc
    this.data.body = this.$parser(data.body).html
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
      if (window.iframely) {
        window.iframely.load()
      }
      if (window.twttr) {
        window.twttr.widgets.load()
      }
    })
  },
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.data && this.data.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.data && this.data.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data && this.data.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://posonote.com/${this.data && this.data.id}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.data && this.data.ogimage && this.data.ogimage.url,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 3px;
  color: #fff;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

.loading {
  color: var(--color-text-off);
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

  .article {
    width: 820px;
  }

  .aside {
    width: 300px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
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

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  .containers {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Verdana, Roboto, 'Droid Sans', '游ゴシック',
      YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }
}

@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    position: relative;
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
    margin-left: 104px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    align-items: strech;
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

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    transition: transform 0.5s ease;
  }

  .containers {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Verdana, Roboto, 'Droid Sans', '游ゴシック',
      YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }

  .meta {
    padding: 10px 0 40px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;

    img {
      margin-right: 6px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;

    img {
      margin-right: 6px;
    }
  }
}
@media (min-width: 600px) and (max-width: 820px) {
  .wrapper {
    position: relative;
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
    margin-left: 104px;
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    align-items: strech;
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

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .ogimage {
    display: block;
    width: 100%;
    transition: transform 0.5s ease;
  }

  .containers {
    position: relative;
    flex: 1;
    background-color: #fff;
    margin-left: 80px;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Verdana, Roboto, 'Droid Sans', '游ゴシック',
      YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }
}
@media (max-width: 600px) {
  .wrapper {
    position: relative;
  }

  .divider {
    padding: 0 16px;
  }

  .article {
    width: 100%;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }

  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    margin-bottom: -20px;
  }

  .breadcrumbList {
    color: #616269;
    font-size: 14px;

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

  .main {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 30px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 270px;
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

  .ogimageWrap {
    position: relative;
    overflow: hidden;
    width: calc(100% + 32px);
    margin: 0 -16px;
  }

  .ogimage {
    display: block;
    width: 100%;
    transition: transform 0.5s ease;
  }

  .containers {
    position: relative;
    flex: 1;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Verdana, Roboto, 'Droid Sans', '游ゴシック',
      YuGothic, 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
    display: block;
    font-weight: bold;
    font-size: 24px;
    color: #2b2c30;
  }
}
</style>
