<template>
  <div class="share">
    <div class="shareMessage">
      <span>よかったらシェアしてね！</span>
    </div>
    <ul class="shareLists" :class="{ 'change-top': headerHiddenFlag }">
      <li class="shareList">
        <a :href="twitterLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_twitter.svg" alt="Twitter" />
        </a>
      </li>
      <li class="shareList">
        <a :href="facebookLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_facebook.svg" alt="Facebook" />
        </a>
      </li>
      <li class="shareList">
        <a :href="hatenaLink" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_hatena.svg" alt="はてなブックマーク" />
        </a>
      </li>
      <li class="shareList">
        <a
          href="https://posonote.com/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/icon_feed.svg" alt="フィード" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
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
    };
  },
  computed: {
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        this.title
      )}&url=https://posonote.com/${this.id}/&hashtags=posonote`;
    },
    facebookLink() {
      return `https://www.facebook.com/sharer.php?u=https://posonote.com/${this.id}/`;
    },
    hatenaLink() {
      return `https://b.hatena.ne.jp/entry/https://posonote.com/${this.id}/`;
    },
  },
};
</script>

<style scoped>
@media (min-width: 820px) {
  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareMessage {
    display: none;
  }

  .change-top {
    top: 40px !important;
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 120px;
    transition: top 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }
}
@media (min-width: 600px) and (max-width: 820px) {
  .share {
    width: 24px;
    padding-top: 16px;

    img {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .shareMessage {
    display: none;
  }

  .change-top {
    top: 40px !important;
  }

  .shareLists {
    display: block;
    position: sticky;
    top: 100px;
    transition: top 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .share {
    margin: 30px 0 0;

    img {
      max-height: 20px;
    }
  }

  .shareMessage {
    padding-bottom: 0.75em;
    text-align: center;

    span {
      position: relative;
      display: inline-block;
      padding: 0 1.5em;
      font-size: 14px;
      background: linear-gradient(transparent 60%, #ffe0c1 65%);
    }

    ::before {
      left: 0;
      -webkit-transform: rotate(-40deg);
      transform: rotate(-40deg);
      position: absolute;
      bottom: 0;
      display: block;
      width: 1px;
      height: 1.4em;
      background-color: currentColor;
      content: '';
    }

    ::after {
      right: 0;
      -webkit-transform: rotate(40deg);
      transform: rotate(40deg);
      position: absolute;
      bottom: 0;
      display: block;
      width: 1px;
      height: 1.4em;
      background-color: currentColor;
      content: '';
    }
  }

  .shareLists {
    display: flex;
    justify-content: center;
  }

  .shareList {
    text-align: center;
    margin: 0 20px;
  }
}
</style>
