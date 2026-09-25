type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const PLAIN_SAFE = /^[A-Za-z0-9_][A-Za-z0-9 _./+-]*$/;
const RESERVED_PLAIN = new Set(["y", "n", "yes", "no", "true", "false", "on", "off", "null", "~"]);

function quote(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

export function yamlScalar(value: string | number | boolean | null): string {
  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError(`Cannot serialise ${value} as YAML`);
    return String(value);
  }
  if (value === "") return '""';
  if (value.includes("\n")) return quote(value);
  if (RESERVED_PLAIN.has(value.toLowerCase())) return quote(value);
  if (/^[-+.]?\d/.test(value)) return quote(value);
  if (value.trim() !== value) return quote(value);
  return PLAIN_SAFE.test(value) ? value : quote(value);
}

function isRecord(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serialise(value: JsonValue, indent: number): string {
  const pad = " ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        if (isRecord(item) || Array.isArray(item)) {
          const nested = serialise(item, indent + 2);
          if (nested === "{}" || nested === "[]") return `${pad}- ${nested}`;
          return `${pad}- ${nested.slice(indent + 2)}`;
        }
        return `${pad}- ${yamlScalar(item)}`;
      })
      .join("\n");
  }

  if (isRecord(value)) {
    const keys = Object.keys(value);
    if (keys.length === 0) return "{}";
    return keys
      .map((key) => {
        const child = value[key];
        const name = yamlScalar(key);
        if (isRecord(child) || Array.isArray(child)) {
          const nested = serialise(child, indent + 2);
          if (nested === "{}" || nested === "[]") return `${pad}${name}: ${nested}`;
          return `${pad}${name}:\n${nested}`;
        }
        return `${pad}${name}: ${yamlScalar(child)}`;
      })
      .join("\n");
  }

  return `${pad}${yamlScalar(value)}`;
}

export function toYaml(value: JsonValue): string {
  const body = serialise(value, 0);
  return `${body}\n`;
}
