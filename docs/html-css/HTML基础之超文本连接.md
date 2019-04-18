---
id: html-basic-hyperlink
title: HTML基础之超链接
---

*以下内容主要来自[MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)与个人理解*
## 一、什么是超链接
> Hyperlinks are one of the most exciting innovations the Web has to offer. 
> they are what makes the Web a Web — they allow us to link our documents to any other document (or other resource) we want to

## 二、 `<a>`标签解析
### 1，相关属性
- `href`：Hypertext Reference，链接的目标地址（URL），可以是绝对地址也可以是相对地址。
- `title`：对于链接地址的描述，当鼠标悬浮在该链接上时浮现的提示信息。
- `download`：当链接是下载链接时，设置download属性会确定下载完的文件的默认名称。
### 2，导航至文档片段  
除了链接至一个完整的文档，也可以链接到一个HTML文档的特定位置：
1. 给该处于特定位置的元素设置`id`
2. `<a>`的`href`属性设置为 **HTML文档的链接地址#id** 的格式，如下所示
```HTML
<!--contacts.html-->
<h2 id="Mailing_address">Mailing address</h2>
<!--index.html-->
<a href="contacts.html#Mailing_address">mailing address</a>
```
### 3，email链接
在`href`属性中可以设置一个email的地址，这样当点击该链接时，不会导航到新的页面而是打开本地默认的email软件窗口，发送邮件。主要是依靠`mailto`开头。
```HTML
<a href="mailto:nowhere@mozilla.org">Send email to nowhere</a>
```
### 4，链接文本规范
- 在链接文本中描述目标地址的关键词
- 杜绝~~点击这里下载文件~~这样的描述，直接写**下载某某文件**  
- 在链接文本中不要重复描述链接地址
- 不要说链接到这样的词
- 链接文本尽可能短
- 相同的链接在不同地方应该保持相同的描述