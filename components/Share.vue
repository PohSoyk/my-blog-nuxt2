<template>
  <div class="share">
    <ul class="shareLists" :class="{ 'change-top': stickyChangeFlag }">
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
  },
  data() {
    return {
      stickyChangeFlag: false,
    };
  },
  computed: {
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.title}&url=https://posonote.com/${this.id}/&hashtags=PoSoNote`;
    },
    facebookLink() {
      return `https://www.facebook.com/sharer.php?u=https://posonote.com/${this.id}/`;
    },
    hatenaLink() {
      return `https://b.hatena.ne.jp/entry/https://posonote.com/${this.id}/`;
    },
  },
  mounted() {
    let startPos = 0;
    let timeout = {};
    window.addEventListener('scroll', () => {
      const currentPos =
        window.pageYOffset || document.documentElement.scrollTop;
      this.stickyChangeFlag = currentPos - startPos > 1;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        startPos = currentPos;
      }, 100);
    });
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

  .shareLists {
    display: block;
    position: sticky;
    top: 100px;
  }

  .shareList {
    text-align: center;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .share {
    margin: 40px 0 0;

    img {
      max-height: 20px;
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
