import cheerio from 'cheerio'
import hljs from 'highlight.js'

export default ({ app }, inject) => {
  inject('parser', (document) => {
    const bodyText = Array.isArray(document)
      ? document
          .reduce((result, current) => {
            if (current.fieldId === 'frame') {
              result.push({
                fieldId: current.fieldId,
                text: `<div class="frame"><div class="frameTitle" style="background-color: ${current.color};">${current.title}</div><div class="frameContent" style="border-color: ${current.color};">${current.list}</div></div>`,
              })
            } else {
              result.push({
                fieldId: current.fieldId,
                text: current.text,
              })
            }
            return result
          }, [])
          .map((d) => d.text)
          .join('')
      : document
    const $ = cheerio.load(bodyText)
    const headings = $('h1, h2, h3').toArray()
    const toc = headings.map((d) => {
      return {
        text: d.children[0].data,
        id: d.attribs.id,
        name: d.name,
      }
    })
    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text())
      $(elm).html(res.value)
      $(elm).addClass('hljs')
    })
    $('img').each((_, elm) => {
      $(elm).attr('class', 'lazyload')
      $(elm).attr('data-src', elm.attribs.src)
      $(elm).removeAttr('src')
    })
    $('h2').each((_, elm) => {
      const text = $(elm).text()
      $(elm).text('')
      $(elm).prepend(`<span id="i">${text}</span>`)
    })
    return {
      html: $('body').html(),
      toc,
    }
  })
}
