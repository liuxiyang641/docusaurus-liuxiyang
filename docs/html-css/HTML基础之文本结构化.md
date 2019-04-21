---
id: html-basic-text-structure
title: HTML文本结构化
---

*以下内容来自[MDN text formatting](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting)与自己理解*
### 一，基础文本格式化标签
+ `<h1>`...`<h6>`
+ 段落标签`<p>`
+ 无语义文本标签`<span>`
+ 无序列表`<ul><li></li></ul>`
+ 有序列表`<ol><li></li></ol>`
+ `<em>`：强调语气词，多是用于表示一种感情，文本会被格式化为斜体，但不应该为了斜体样式使用该标签
+ `<strong>`：强调重要单词，可以用于名词、时间等重要信息的单词，文本会变为粗体，同样不应该为了粗体使用该标签
+ `<i>`：斜体
+ `<b>`：加粗
### 二，高级文本格式化标签
1. 描述列表（Description lists）：描述一系列的项和它们的定义或者是一系列的问题与答案，使用`<dl>`（description lists），`<dt>`（description term），`<dd>`(description definition)来实现
2. 引用：quotations
    - 块级引用: 使用`<blockquote cite=“”>`标签实现，该标签内的`cite`属性为引用源地址，被包裹的引用文本会出现在新的缩进段落中
    - 行内引用：使用`<q cite=“”>`标签实现，文本会被包裹在“”内
3. 缩写：Abbreviations，例如HTML, CSS等，使用`<abbr titlt="">`，title属性内填写描述文本，当鼠标悬浮在被该标签包裹的文本上时，title属性的值会显示
4. `<address>`:描述谁实现的页面，可以放置联系方式
5. 上标与下标：使用`<sup>`表示上标（superscript），`<sub>`表示下标（subscript）
6. 代码：
   > - `<code>`: For marking up generic pieces of computer **code**. 
   > - `<pre>`: For **retaining whitespace** (generally code blocks) — if you use indentation or excess whitespace inside your text, browsers will ignore it and you will not see it on your rendered page. If you wrap the text in <pre></pre> tags however, your whitespace will be rendered identically to how you see it in your text editor.
   > - `<var>`: For specifically marking up **variable** names.
   > - `<kbd>`: For marking up **keyboard (and other types of) input** entered into the computer.
   > - `<samp>`: For marking up the **output of a computer program**.

7. 时间：使用`<time datetime="">`实现