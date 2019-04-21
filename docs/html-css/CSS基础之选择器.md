---
id: css-basic-selector
title: CSS选择器
---

以下内容来自[MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Simple_selectors)
*注css的注释是`/* */`*
### 1. 选择器种类
CSS选择器具有很多种类：
> - **Simple selectors**: Match one or more elements based on element type, class, or id.
> - **Attribute selectors**: Match one or more elements based on their attributes/attribute values.
> - **Pseudo-classes**: Match one or more elements that exist in a certain state, such as an element that is being hovered over by the mouse pointer, or a checkbox that is currently disabled or checked, or an element that is the first child of its parent in the DOM tree.
> - **Pseudo-elements**: Match one or more parts of content that are in a certain position in relation to an element, for example the first word of each paragraph, or generated content appearing just before an element.
> - **Combinators**: These are not exactly selectors themselves, but ways of combining two or more selectors in useful ways for very specific selections. So for example, you could select only paragraphs that are direct descendants of divs, or paragraphs that come directly after headings.
> - **Multiple selectors**: Again, these are not separate selectors; the idea is that you can put multiple selectors on the same CSS rule, separated by commas, to apply a single set of declarations to all the elements selected by those selectors.

### 2. 简单选择器（Simple selectors）
1. **类型选择器/元素选择器**：选择器名字就是大小写不区分的HTML元素名字，如：
```css
p {
  color: red;
}
```
2. **类选择器**：`.`类名，不同HTML元素可以对应同一个类；一个HTML元素可以具有多个类，如：
```HTML
<ul>
  <li class="first done">Create an HTML document</li>
  <li class="second done">Create a CSS style sheet</li>
  <li class="third">Link them all together</li>
</ul>
<!--aaa-->
```
```css
.first {
  font-weight: bold;
}
```
3. **id选择器**：`#`id名，id名是唯一的，如果多个元素具有相同的id，在js中无法根据id获取DOM对象。如：
```css
#polite {
  font-family: cursive;
}
```
4. **通用选择器**：`*`，选取所有的元素，如：
```css
* {
  padding: 5px;
  border: 1px solid black;
  background: rgba(255,0,0,0.25)
}
```
*注：如果使用它会影响网页性能，尽量勿用*
### 3. 属性选择器
属性选择器会根据元素的属性和属性值来选择匹配的元素，主要标识是`[]`。属性选择器包含两种选择器，状态和值选择器（**Presence and value**）以及子字符串值选择器（**Substring value**）。
#### 3.1. 状态和值选择器
- `[attr]`：选择所有具有`attr`属性的element
- `[attr=val]`：选择所有具有`attr`属性并且值**只有**`val`的element
- `[attr~=val]`：选择所有具有`attr`属性并且值**包含**`val`的element
#### 3.2. 子字符串值选择器
根据属性值字符串匹配element
- `[attr^=val]`：attr属性值以val开头
- `[attr$=val]`：attr属性值以val结尾
- `[attr*=val]`：attr属性值包含val
- `[attr|=val]`：attr属性值就是`val`或者以`val-`开头，主要针对`lang="en" lang="en-US"`这些属性
### 4. 伪类与伪元素选择器
#### 4.1. 伪类选择器
一个css伪类(**pseudo-class**)是添加在选择器之后，以`:`开头的关键词，它们是用来代表元素处于某种状态。比如：`:active :hover :nth-of-child :nth-of-type`。单纯的伪类选择器存在是没有意义的，必须与选择器结合
```css
a:hover,
a:active,
a:focus {
  color: darkred;
  text-decoration: none;
}
```
#### 4.2. 伪元素选择器
伪元素选择器类似伪类选择器，添加在选择器之后，以`::`开头，表示选择的element的一部分。如`::after ::before ::first-letter`。
### 5. 联合选择器
联合选择器（**Combinators**）是根据元素的关系将多个选择器结合起来的选择器。
| 语法 | 语义 |
| --- | --- |
|`A B`|Any element matching B that is a *descendant* of an element matching A (that is, a child, or a child of a child, etc.)|
|`A > B`| Any element matching B that is a *direct child* of an element matching A. |
|`A + B`| Any element matching B that is *the next sibling* of an element matching A (that is, the next child of the same parent). |
|`A ~ B`| Any element matching B that is *one of the next siblings* of an element matching A (that is, one of the next children of the same parent). |
如：
```css
.with-currency[lang="en-US"] td:last-child::before {
  content: '$';
}
```