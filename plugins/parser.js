import cheerio from 'cheerio';
import hljs from 'highlight.js';
/* eslint-disable */
export default ({ app }, inject) => {
  inject('parser', (textArray) => {
    const body = textArray.reduce((result, current) => {
      // fieldIdがframeか
      if (current.fieldId === 'frame') {
        // frameの時（下記、初期データを操作）
        result.push({
          fieldId: current.fieldId,
          text: `<div class="frame"><div class="frameTitle" style="background-color: ${current.color};">${current.title}</div><div class="frameContent" style="border-color: ${current.color};">${current.list}</div></div>`,
        });
      } else {
        // frameでは無いとき（初期データを返す）
        result.push({
          fieldId: current.fieldId,
          text: current.text,
        });
      }
      return result;
    }, []); // 初期値は[]
    const text = body.map((d) => d.text).join('');
    const $ = cheerio.load(text);
    const headings = $('h1, h2, h3').toArray();
    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      };
    });
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text());
      $(elm).html(res.value);
      $(elm).addClass('hljs');
    });
    $('img').each((_, elm) => {
      $(elm).attr('class', 'lazyload');
      $(elm).attr('data-src', elm.attribs.src);
      $(elm).removeAttr('src');
    });
    console.log();
    return {
      html: $.html(),
      toc,
    };
  });
  inject('hello', (msg) => console.log(`Hello ${msg}!`));
};
