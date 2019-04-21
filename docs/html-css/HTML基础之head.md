---
id: html-basic-head
title: HTML中的head标签
---

_以下内容主要来自[MDN HTML Head](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)以及个人理解_

### 什么是 HTML 中的 head？

> The HTML head is the contents of the <head> element — unlike the contents of the <body> element (which are displayed on the page when loaded in a browser), the head's content is **not displayed on the page**. Instead, the head's job is to contain metadata about the document.

### 在<head>标签中可以包含什么内容？

1. `<title></title>`：定义网页 tab 的名称，该名称会在收藏夹中显示
2. `<meta></meta>`：metadata 是指定义数据的数据，例如`<meta charset="utf-8">`就是设置了当前文档的字符编码方式（_在 html 标签中有一个`lang`属性，这个属性是指你的网页内容的主语言_）
3. `<link>`：引入 stylesheet，icon 等内容
4. `<script></script>`：通过 src 引入脚本或者直接在标签内容中编写脚本

### <meta>标签简要介绍

meta 标签拥有很多的属性，比较常用到的有 charset，name，content 等
name 和 content 属性有很多用处，例如：

- 在搜索引擎中搜索到的结果项的标题由`<title>`定义，结果项的描述就由`<meta>`定义

```html
<meta
  name="description"
  content="The MDN Web Docs site 
  provides information about Open Web technologies 
  including HTML, CSS, and APIs for both Web sites and 
  progressive web apps."
/>
```

- 在 Facebook，Twitter 等网站中显示很多网站的链接是一个包含图片、文字的链接，这些也是在`<meta>`中定义的。
