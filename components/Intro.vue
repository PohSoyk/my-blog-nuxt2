<template>
  <div class="post" v-html="intro"></div>
</template>

<script>
export default {
  props: {
    intro: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
  .post {
    margin-top: 40px;
    font-size: 17px;

    ::v-deep h1 {
      font-size: 30px;
      font-weight: bold;
      margin: 40px 0 20px;
      background-color: #eee;
      padding: 10px 20px;
      border-radius: 5px;
      border: solid #385cae;
      border-width: 0 0 0 6px;
    }

    ::v-deep h2 {
      font-size: 30px;
      font-weight: bold;
      margin: 40px 0 16px;
      border-bottom: 1px solid #ddd;
    }

    ::v-deep h3 {
      font-size: 24px;
      font-weight: bold;
      margin: 30px 0 12px;
    }

    ::v-deep h4 {
      font-size: 20px;
      font-weight: bold;
      margin: 24px 0 10px;
    }

    ::v-deep h5 {
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0 6px;
    }

    ::v-deep p {
      line-height: 1.8;
      letter-spacing: 0.2px;
      padding: 0 0 1em;

      & > code {
        color: var(--color-pink);
        background-color: var(--color-gray-light);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        margin: 0 2px;
        padding: 2px 4px;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
          Courier, monospace !important;
      }
    }

    ::v-deep em {
      font-style: italic;
    }

    ::v-deep ol {
      list-style-type: decimal;
      list-style-position: inside;

      & > li {
        line-height: 2;
      }
    }

    ::v-deep ul > li {
      line-height: 2;

      &::before {
        content: '-';
        margin-right: 10px;
      }
    }

    ::v-deep img {
      max-width: 100%;
      margin: 40px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    ::v-deep a {
      color: var(--color-purple);
      text-decoration: underline;
      word-wrap: break-word;
      word-break: break-all;
    }

    ::v-deep a:hover {
      text-decoration: none;
    }

    ::v-deep strong {
      background: linear-gradient(transparent 75%, #ffe0c1 75%);
      font-weight: bold;
    }

    ::v-deep blockquote {
      background: url('/images/icon_quote.svg') no-repeat 20px 10px, #eee;
      background-size: 36px 36px;
      padding: 50px 20px 20px;
      margin: 20px 0;
      border-radius: 3px;
    }

    ::v-deep pre {
      border-radius: 3px;
      margin: 20px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;

      & > code {
        padding: 10px 20px;
        border-radius: 5px;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
          Courier, monospace;
      }
    }
    ::v-deep .frame {
      margin-bottom: 1.2em;
      position: relative;

      & > .frameContent {
        overflow: auto;
        border: 2px solid #999;
        padding: 1em 1.5em;
        position: relative;
        border-radius: 5px;
        background: #fff;
        color: #000;
      }

      & > .frameTitle {
        display: inline-block;
        margin: 0 1em;
        border-radius: 5px 5px 0 0;
        background-color: #999;
        padding: 2px 1em;
        position: relative;
        font-weight: bold;
        color: #fff;
        top: 1px;
      }
    }
  }
}
@media (max-width: 600px) {
  .post {
    font-size: 16px;
    margin-top: 18px;

    ::v-deep h1 {
      font-size: 24px;
      font-weight: bold;
      margin: 40px 0 20px;
      background-color: #eee;
      padding: 10px 20px;
      border-radius: 5px;
      border: solid #385cae;
      border-width: 0 0 0 5px;
    }

    ::v-deep h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 36px 0 16px;
      border-bottom: 1px solid #ddd;
    }

    ::v-deep h3 {
      font-size: 20px;
      font-weight: bold;
      margin: 30px 0 12px;
    }

    ::v-deep h4 {
      font-size: 16px;
      font-weight: bold;
      margin: 24px 0 10px;
    }

    ::v-deep h5 {
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0 6px;
    }

    ::v-deep p {
      line-height: 1.8;
      letter-spacing: 0.2px;
      padding: 0 0 1em;

      & > code {
        color: var(--color-pink);
        background-color: var(--color-gray-light);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        margin: 0 2px;
        padding: 2px 4px;
      }
    }

    ::v-deep em {
      font-style: italic;
    }

    ::v-deep ol {
      list-style-type: decimal;
      list-style-position: inside;

      & > li {
        line-height: 2;
      }
    }

    ::v-deep ul > li {
      line-height: 2;

      &::before {
        content: '-';
        margin-right: 10px;
      }
    }

    ::v-deep img {
      max-width: 100%;
      margin: 40px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    ::v-deep a {
      color: #331cbf;
      text-decoration: underline;
      word-wrap: break-word;
      word-break: break-all;
    }

    ::v-deep strong {
      background: linear-gradient(transparent 75%, #ffe0c1 75%);
      font-weight: bold;
    }

    ::v-deep blockquote {
      background: url('/images/icon_quote.svg') no-repeat 20px 10px, #eee;
      background-size: 36px 36px;
      padding: 50px 20px 20px;
      margin: 20px 0;
      border-radius: 3px;
    }

    ::v-deep pre {
      border-radius: 3px;
      margin: 20px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;

      & > code {
        padding: 8px 16px;
        border-radius: 3px;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
          Courier, monospace;
      }
    }
    ::v-deep .frame {
      margin-bottom: 1.2em;
      position: relative;

      & > .frameContent {
        overflow: auto;
        border: 2px solid #999;
        padding: 1em 1.5em;
        position: relative;
        border-radius: 5px;
        background: #fff;
        color: #000;
      }

      & > .frameTitle {
        display: inline-block;
        margin: 0 1em;
        border-radius: 5px 5px 0 0;
        background-color: #999;
        padding: 2px 1em;
        position: relative;
        font-weight: bold;
        color: #fff;
        top: 1px;
      }
    }
  }
}
</style>
