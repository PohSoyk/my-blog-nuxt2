import axios from 'axios';
require('dotenv').config();
const { API_KEY, SERVICE_ID, GA_ID } = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? SERVICE_ID : undefined,
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceId: SERVICE_ID,
  },
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplate: "%s | PoSo's Note",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '未経験からエンジニア転職を成功させた筆者が、IT技術、プログラミング、アプリ開発の情報を中心に発信中。人生で得たスキルや知識のアウトプットを行うブログです。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: "PoSo's Note",
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://posonote.com',
      },
      { hid: 'og:title', property: 'og:title', content: "PoSo's Note" },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '未経験からエンジニア転職を成功させた筆者が、プログラミング、アプリ開発の情報を中心に発信中。人生で得たスキルや知識のアウトプットを行うブログです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://posonote.com/images/ogp.png',
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@PohSoyk' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://posonote.com/favicon.png',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://posonote.com/feed.xml',
        title: 'Atom',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
      { src: 'https://cdn.iframe.ly/embed.js', async: true },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#331cbf' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css',
    '@/assets/styles/colors.css',
    '@/assets/styles/transition.css',
    {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-scrollto', '~/plugins/vee-validate'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dayjs'],
    [
      '@nuxtjs/google-analytics',
      {
        id: GA_ID,
      },
    ],
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      icons: 'mdiSvg',
    },
  },
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  proxy: ['http://localhost:9000/.netlify'],
  pwa: {
    meta: {
      theme_color: '#331cbf',
    },
    manifest: {
      name: "PoSo's Note",
      short_name: "PoSo's Note",
      lang: 'ja',
    },
    workbox: {
      offlineAssets: [
        '/images/banner_logo.svg',
        '/images/icon_author.svg',
        '/images/icon_clock.svg',
        '/images/icon_facebook.svg',
        '/images/icon_feed.svg',
        '/images/icon_hatena.svg',
        '/images/icon_menu.svg',
        '/images/icon_quote.svg',
        '/images/icon_search.svg',
        '/images/icon_twitter.svg',
        '/images/icon_link.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    transpile: ['vee-validate/dist/rules'],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/category/:categoryId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'categories',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/popular-articles`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.articles;
        });
      const banner = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/banner`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data;
        });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await axios
        .get(
          `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id`,
          {
            headers: { 'X-API-KEY': API_KEY },
          }
        )
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles, banner },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      // お問い合わせページ
      const contact = {
        route: '/contact',
        payload: { popularArticles, banner },
      };

      // プライバシーポリシーページ
      const policy = {
        route: '/policy',
        payload: { popularArticles, banner },
      };

      // プロフィールページ
      const profile = {
        route: '/profile',
        payload: { popularArticles, banner },
      };

      // ポートフォリオページ
      const portfolio = {
        route: '/portfolio',
        payload: { popularArticles, banner },
      };

      const categories = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': API_KEY,
                },
              }
            )
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [
        index,
        search,
        contact,
        policy,
        profile,
        portfolio,
        ...articles,
        ...pages,
        ...flattenCategoryPages,
      ];
    },
    dir: 'dist',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://posonote.com',
    exclude: ['/draft', '/404'],
    gzip: true,
    trailingSlash: true,
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: "PoSo's Note",
          link: 'https://posonote.com/feed.xml',
          description:
            '未経験からエンジニア転職を成功させた筆者が、IT技術、プログラミング、アプリ開発の情報を中心に発信中。人生で得たスキルや知識のアウトプットを行うブログです。',
        };

        const posts = await axios
          .get(`https://${SERVICE_ID}.microcms.io/api/v1/blog`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://posonote.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    // {
    //   path: '/feed_update.xml',
    //   async create(feed) {
    //     feed.options = {
    //       title: '更新情報｜microCMSブログ',
    //       link: 'https://blog.microcms.io/feed.xml',
    //       description:
    //         'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
    //     };

    //     const posts = await axios
    //       .get(
    //         `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]update`,
    //         {
    //           headers: { 'X-API-KEY': API_KEY },
    //         }
    //       )
    //       .then((res) => res.data.contents);

    //     posts.forEach((post) => {
    //       feed.addItem({
    //         title: post.title,
    //         id: post.id,
    //         link: `https://blog.microcms.io/${post.id}/`,
    //         description: post.description,
    //         content: post.description,
    //         date: new Date(post.publishedAt || post.createdAt),
    //         image: post.ogimage && post.ogimage.url,
    //       });
    //     });
    //   },
    //   cacheTime: 1000 * 60 * 15,
    //   type: 'rss2',
    // },
    // {
    //   path: '/feed_usecase.xml',
    //   async create(feed) {
    //     feed.options = {
    //       title: '導入事例｜microCMSブログ',
    //       link: 'https://blog.microcms.io/feed.xml',
    //       description:
    //         'microCMSはAPIベースの日本製ヘッドレスCMSです。本ブログはmicroCMSの開発メンバーがmicroCMSの使い方や技術的な内容を発信するブログです。',
    //     };

    //     const posts = await axios
    //       .get(
    //         `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]usecase`,
    //         {
    //           headers: { 'X-API-KEY': API_KEY },
    //         }
    //       )
    //       .then((res) => res.data.contents);

    //     posts.forEach((post) => {
    //       feed.addItem({
    //         title: post.title,
    //         id: post.id,
    //         link: `https://blog.microcms.io/${post.id}/`,
    //         description: post.description,
    //         content: post.description,
    //         date: new Date(post.publishedAt || post.createdAt),
    //         image: post.ogimage && post.ogimage.url,
    //       });
    //     });
    //   },
    //   cacheTime: 1000 * 60 * 15,
    //   type: 'rss2',
    // },
  ],
};
