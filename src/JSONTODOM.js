/**
 * {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
 */

function render(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  let dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    for (const key in vnode.attrs) {
      dom.setAttribute(key, vnode.attrs[key]);
    }
  }

  if (vnode.children) {
    if (typeof vnode.children === "object") {
      vnode.children.forEach((child) => {
        dom.appendChild(render(child));
      });
    } else if (
      typeof vnode.children === "string" ||
      typeof vnode.children === "number"
    ) {
      if (typeof vnode.children === "number") {
        vnode.children = String(vnode.children);
      }
      dom.appendChild(document.createTextNode(vnode.children));
    }
  }

  return dom;
}

function test() {
  const vnode = {
    tag: "DIV",
    attrs: {
      id: "app",
    },
    children: [
      {
        tag: "SPAN",
        children: [
          {
            tag: "A",
            children: [{ tag: "P", attrs: { text: "p" }, children: 123213 }],
          },
        ],
      },
      {
        tag: "SPAN",
        children: [
          { tag: "A", children: [] },
          { tag: "A", children: [] },
        ],
      },
    ],
  };

  const dom = render(vnode);
  console.log(dom);
}

test();
