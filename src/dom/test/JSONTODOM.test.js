import { describe, expect, test } from "vitest";
import { render } from "../JSONTODOM";

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

describe("vnode", () => {
  test("json2dom", () => {
    const dom = render(vnode);
    console.log(dom);

    expect(dom).not.toBeNull();
  });
});
