---
id: react-hoc
title: React高阶组件
---

以下内容来自:

- [React 官网文档](https://reactjs.org/docs/higher-order-components.html)
- [Robin Wieruch 博客](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)
- [《_The Road to learn React Your journey to master plain yet pragmatic React.js_》](https://roadtoreact.com/)
- ~~自身理解:(~~

## 1 HOC 基础概念

### 1.1 定义

> A **higher-order component (HOC)** is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature

> They **take any input** - most of the time a component, but also optional arguments - and **return a component as output**. The returned component is an enhanced version of the input component and can be used in your JSX

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### 1.2 理解

1. 高阶组件只是 React 建议的一种机制、模式，并非一个特殊的 API。
2. HOC 的目的在于通过将不同的 Component 中相同的逻辑提取出来，在一个 function 实现这些通用逻辑，之后接受 Component 输入，“注入”通用逻辑，实现对 component 的增强，减少代码冗余，提高组件的复用性。这种通用逻辑的注入可以是向 Component 注入新的 prop，可以是对 Component 的 prop 进行某种检查，进行条件渲染等。
3. HOC 的返回可以是一个 class 组件，function 组件或者另外的 HOC
4. 传入的 Component 作为`return`新的增强的组件的相对独立的一部分，因此 <span style=“text-color: red”>不要在高阶组件中直接修改传入组件（方法等）</span>

## 2 实例

### 2.1 对 Component 注入新的 prop

#### 2.1.1 思考与使用过程

现在存在两个组件，`CommentList`与`BlogPost`，他们都从一个外部数据`DataSource`中获取数据进行展示。

```jsx
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments(),
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments(),
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

```jsx
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id),
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id),
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

两个组件的区别：

1. 从**DataSource**中获取数据的方法不同，一个是`getComments`，一个是`getBlogPost`
2. 展示数据的`render`函数不同。

相同点：

1. 在组件挂载时 subscribe **DataSource**，当`DataSource`发生改变后，调用`handleChange`重新渲染；同时卸载时移除 listener
2. 都从**DataSource**中获取数据

可以看到这两个组件存在相同的逻辑，即从**DataSource**中获取数据，进行渲染。当中存在冗余的代码，如果再写第三个组件，如`IssueList`，那么这个逻辑还要重复一个。
因此我们可以采用以下的高阶组件提取通用逻辑：

##### （1）定义高阶组件

```jsx
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

此 HOC 接受`WrappedComponent`，以及`selectData`两个参数，前者是需要增强的组件，后者是用来从**DataSource**中获取数据的 function。
注意到 HOC 返回的是一个增强的、新的 class react 组件，具有以下几个特征：

1. local `state`中保存了通过 HOC 参数`selectData`拿到的数据
2. `render`函数返回的还是传入的`WrappedComponent`组件的实例，并且传入了一个新的`data`属性。
3. 需要注意，`{...this.props}`，保证了高阶组件实例生成时定传入的`props`都能够传入`WrappedComponent`组件。

##### （2）重新定义原组件

重新实现之前的`CommentList`与`BlogPost`组件，此时在它们的`render`函数中直接使用`this.props.data`来进行渲染，不需要再与`DataSource`进行交互。

```jsx
class CommentList extends React.Component {
  render() {
    const { data, ...res } = this.props;
    return (
      <div>
        {data.map(comment => (
          <Comment comment={comment} key={comment.id} {...reas} />
        ))}
      </div>
    );
  }
}
```

```jsx
class CommentList extends React.Component {
  render() {
    const { data, ...res } = this.props;
    return <TextBlock text={data} {...res} />;
  }
}
```

##### （3）定义增强组件

```jsx
const CommentListWithSubscription = withSubscription(CommentList, DataSource =>
  DataSource.getComments(),
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id),
);
```

此时的`CommentListWithSubscription`与`BlogPostWithSubscription`是高阶组件`withSubscription`返回的新增强的 class 组件。

##### (4) 使用新的增强组件

```jsx
class App extends Component{
    ...
    render() {
        ...
        return (
            <div>
                <CommentListWithSubscription disabled/>
                <BlogPostWithSubscription />
            </div>
        )
    }
}
```

注意其中的`disableed`属性会一层层的传递给`Comment`组件，传递过程如下：

1. 首先是传入`withSubscription`返回的`EnhancedComponent`组件 render 函数中的`props`
2. 通过 return 语句中`{...this.props}`被传递给`<WrappedComponent />`组件
3. 此时`WrappedComponent`是`CommentList`，在它的 render 函数可通过`{...res}`传递给`<Component />`

#### 2.1.2 总结

可以看到这种方式的 HOC 没有直接改变传入的 Component，而是传入新的`prop`，因此，在 Component 的`render`函数中可以使用新的`prop`进行渲染或其它操作。以上例子在[React docs](https://reactjs.org/docs/higher-order-components.html)进一步了解。

### 2.2 条件渲染

现在存在一个`ToDoList`组件

```jsx
function TodoList({ todos, isLoadingTodos }) {
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos ...</p>
      </div>
    );
  }

  if (!todos) {
    return null;
  }

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

可以看到有很多关于 todos 的条件渲染，我们可以尝试把这种条件渲染的逻辑提取出来，形成下面的情况：

```jsx
const withLoadingIndicator = Component => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos ? (
    <div>
      <p>Loading todos ...</p>
    </div>
  ) : (
    <Component {...others} />
  ); // (1)

const withTodosNull = Component => props =>
  !props.todos ? null : <Component {...props} />; // (2)

const withTodosEmpty = Component => props =>
  !props.todos.length ? (
    <div>
      <p>You have no Todos.</p>
    </div>
  ) : (
    <Component {...props} />
  ); // (3)
```

重新定义`ToDoList`组件：

```jsx
const TodoList = ({ todos }) => (
  <div>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);
```

之后利用这三个新的 HOC，定义新的增强组件：

```jsx
const TodoListWithConditionalRendering = withLoadingIndicator(
  withTodosNull(withTodosEmpty(TodoList)),
);
// 可以写成以下的形式
// const TodoListOne = withTodosEmpty(TodoList);
// const TodoListTwo = withTodosNull(TodoListOne);
// const TodoListThree = withLoadingIndicator(TodoListTwo);
```

现在，生成增强组件的实例：

```jsx
    ...
    <TodoListWithConditionalRendering isLoadingTodos={true} />
    ...
```

`isLoadingTodos`属性通过 `(1)(2)(3)`层层传递给`TodoList`组件。
更多的了解可以参看[A gentle Introduction to React's Higher Order Components](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)

### 2.3 第三方库 HOC 例子

让我们来看实际的例子：

```jsx
// antd Form组件的使用 参见https://ant.design/components/form-cn/#Form.create(options)
import { Form } from 'antd';

class CustomizedForm extends React.Component {}

export default (CustomizedForm = Form.create({})(CustomizedForm));
```

代码中的`Form.create()`方法接受一个`option`参数，该参数的部分属性如下表：
|参数 |说明|
| -- | -- |
| `name` |设置表单域内字段`id`的前缀|
|`onValuesChange`|任一表单域的值发生改变时的回调|
一个使用的例子如下：

```jsx
const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(CustomComponent);
```

`Form.create()`方法返回的还是一个 HOC，这个 HOC 单独接受一个组件输入，返回增强组件，即上面的`Form.create({})(CustomizedForm)`。
此时在`CustomizedForm`组件中就可以使用被高阶组件注入的属性`form`。例如：

```jsx
// CustomizedForm
render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
      </Form>
    );
}
```

### 2.4 使用注意事项

1. 定义的 HOC 可以采用`with`开头
2. 不要在`render`中使用 HOC，而是在`render`之外就使用 HOC 定义好新的增强组件，在 render 函数中直接使用 HOC 返回的增强组件。原因有以下两点：
   - 效率：每次`render`执行时，都使用 HOC 生成新的增强组件，一方面效率较低，另一方面`virtual DOM`和`real DOM`比较时，新的增强组件与旧的组件不会认为是相同的。
   - 增强组件的状态丢失：每次`render`执行会卸载之前的增强组件，导致其中的`state`丢失
3. 静态方法需要特别对待：如果在原始组件中定义了静态方法，之后使用 HOC 返回的增强组件是没有该静态方法的。如：

   ```jsx
   // Define a static method
   WrappedComponent.staticMethod = function() {
     /*...*/
   };
   // Now apply a HOC
   const EnhancedComponent = enhance(WrappedComponent);

   // The enhanced component has no static method
   typeof EnhancedComponent.staticMethod === 'undefined'; // true
   ```

   要解决这个问题，需要拷贝该静态方法：

   ```jsx
   function enhance(WrappedComponent) {
     class Enhance extends React.Component {
       /*...*/
     }
     // Must know exactly which method(s) to copy :(
     Enhance.staticMethod = WrappedComponent.staticMethod;
     return Enhance;
   }
   ```

4. `ref`属性无法传递，原因在于`ref`不是和其它普通 prop 一起存在`props`中的，它会被 React 特殊处理，`ref`只会指向增强组件，而不是被包裹的原始 Component。解决这个问题在于使用`React.forwardRef`，[ Learn more about it in the forwarding refs section.](https://reactjs.org/docs/forwarding-refs.html)
