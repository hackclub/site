const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// oxlint-disable-next-line no-control-regex -- matching them is the whole point
const ILLEGAL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\uFFFE\uFFFF]/g;

const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

export function xmlEscape(value: string): string {
  return value
    .replace(ILLEGAL, "")
    .replace(LONE_SURROGATE, "")
    .replace(/[&<>"']/g, (char) => ESCAPES[char] as string);
}

function attributeList(attributes: Record<string, string>): string {
  return Object.entries(attributes)
    .map(([name, value]) => ` ${name}="${xmlEscape(value)}"`)
    .join("");
}

export function xmlTag(
  name: string,
  value: string,
  attributes: Record<string, string> = {},
): string {
  return `<${name}${attributeList(attributes)}>${xmlEscape(value)}</${name}>`;
}

export function xmlEmptyTag(name: string, attributes: Record<string, string>): string {
  return `<${name}${attributeList(attributes)} />`;
}

export const XML_DECLARATION = '<?xml version="1.0" encoding="utf-8"?>';
