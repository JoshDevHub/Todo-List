const toArray = (value) => Array.isArray(value) ? value : [value];

const isSVG = (element) => element.tag === "svg";

const buildElement = (opts) => {
  const element = document.createElement(opts.tag || "div");
  for (const [prop, value] of Object.entries(opts)) {
    switch (prop) {
      case "tag":
        break;
      case "text":
        element.textContent = value;
        break;
      case "attributes":
        for (const [attr, attrVal] of Object.entries(value)) {
          element.setAttribute(attr, attrVal);
        }
        break;
      case "events":
        toArray(value).map(({ type, handler }) => {
          element.addEventListener(type, handler);
        })
        break;
      case "children":
        toArray(value).map((child) => {
          if (isSVG(child)) {
            element.innerHTML = child.data;
          } else {
            const childEl = buildElement(child);
            element.appendChild(childEl);
          }
        })
        break;
      default:
    }
  }
  return element;
}

export { buildElement };
