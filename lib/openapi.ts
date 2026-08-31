import { PROJECT_TYPE_OPTIONS } from "@/lib/site-programs";
import { API_ERROR_CODES } from "@/lib/api-error";
import { SITE_URL } from "@/lib/seo";
import { EVENT_LIMIT_MAX, EVENT_ORDERS, EVENT_SORT_FIELDS, EVENT_STATUSES } from "@/lib/events";
import { EVENTS_FEED_DEFAULT_LIMIT } from "@/lib/rss";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const nullableString: Json = { type: ["string", "null"] };
const nullableDate: Json = { type: ["string", "null"], format: "date" };

const errorResponseSchema: Json = {
  type: "object",
  description: "Structured error body returned by every endpoint under /api.",
  required: ["error", "code", "message", "status", "documentation_url"],
  properties: {
    error: {
      type: "string",
      description: "Human-readable message. Same text as `message`.",
    },
    code: {
      type: "string",
      description: "Stable machine-readable identifier for the failure.",
      enum: [...API_ERROR_CODES],
    },
    message: { type: "string" },
    hint: {
      type: "string",
      description: "What the caller can change to make the request succeed.",
    },
    status: { type: "integer", description: "HTTP status code, repeated in the body." },
    documentation_url: { type: "string", format: "uri" },
  },
};

function errorResponse(description: string) {
  return {
    description,
    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
  };
}

function jsonResponse(description: string, schema: Json) {
  return { description, content: { "application/json": { schema } } };
}

function xmlResponse(description: string, mediaType: string) {
  return { description, content: { [mediaType]: { schema: { type: "string" } } } };
}

function queryParam(name: string, description: string, schema: Json, explode = false): Json {
  return { name, in: "query", required: false, description, schema, explode };
}

function paths(): Record<string, Json> {
  const limitParam = queryParam(
    "limit",
    `Maximum number of events to return, 1–${EVENT_LIMIT_MAX}.`,
    { type: "integer", minimum: 1, maximum: EVENT_LIMIT_MAX },
  );

  return {
    "/api/v1/events": {
      get: {
        tags: ["events"],
        operationId: "listEvents",
        summary: "List events",
        description: "Every Hack Club event, with the styling its card uses on the site.",
        parameters: [
          queryParam(
            "status",
            "Only events in these states. Repeat the parameter or pass a comma-separated list.",
            { type: "array", items: { type: "string", enum: [...EVENT_STATUSES] } },
            true,
          ),
          queryParam("sort", "Field to sort by.", {
            type: "string",
            enum: [...EVENT_SORT_FIELDS],
            default: "startDate",
          }),
          queryParam("order", "Sort direction.", {
            type: "string",
            enum: [...EVENT_ORDERS],
            default: "desc",
          }),
          limitParam,
        ],
        responses: {
          "200": jsonResponse("Events.", { $ref: "#/components/schemas/EventList" }),
          "400": errorResponse("A query parameter was not understood."),
          "500": errorResponse("The server is missing its Airtable credentials."),
          "502": errorResponse("The upstream Airtable request failed."),
        },
      },
    },
    "/api/v1/events/{idOrSlug}": {
      get: {
        tags: ["events"],
        operationId: "getEvent",
        summary: "Get one event",
        description:
          "Look an event up by its `id` or its `slug`. Prefer the `id`: a slug is derived " +
          "from the name and changes if the event is renamed for whatever reason",
        parameters: [
          {
            name: "idOrSlug",
            in: "path",
            required: true,
            description: "An event's Airtable record id, or its slug.",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": jsonResponse("The event.", { $ref: "#/components/schemas/EventItem" }),
          "404": errorResponse("No event has that id or slug."),
          "500": errorResponse("The server is missing its Airtable credentials."),
          "502": errorResponse("The upstream Airtable request failed."),
        },
      },
    },
    "/api/v1/events/rss": {
      get: {
        tags: ["events"],
        operationId: "getEventsFeed",
        summary: "Newly announced events, as RSS",
        description:
          `An RSS 2.0 announcement feed: the ${EVENTS_FEED_DEFAULT_LIMIT} most recently added ` +
          "events, newest first, whatever state they are in.",
        parameters: [limitParam],
        responses: {
          "200": xmlResponse("An RSS 2.0 feed.", "application/rss+xml"),
          "400": errorResponse("A query parameter was not understood."),
          "500": errorResponse("The server is missing its Airtable credentials."),
          "502": errorResponse("The upstream Airtable request failed."),
        },
      },
    },
  };
}

function schemas(): Record<string, Json> {
  return {
    Error: errorResponseSchema,
    EventBackground: {
      type: "object",
      description: "How the event's card is filled. `null` if the event has no swag yet.",
      required: ["type", "color", "imageUrl"],
      properties: {
        type: {
          type: "string",
          enum: ["color", "image"],
          description: "Which of `color` and `imageUrl` the card actually uses.",
        },
        color: { type: "string" },
        imageUrl: {
          ...(nullableString as object),
          description:
            "Signed Airtable URLs only last for about 2 hours, so don't hotlink them, but cache them heavily: https://support.airtable.com/articles/9671148410-airtable-attachment-url-behavior",
        },
      },
    },
    EventTheme: {
      type: "object",
      description: "The event's card colours. `null` if the event has no swag yet.",
      required: ["text", "accent", "logoSize", "button"],
      properties: {
        text: { type: "string" },
        accent: { type: "string" },
        logoSize: { type: "number" },
        button: {
          type: "object",
          required: ["color", "textColor", "borderRadius", "borderWidth", "borderColor"],
          properties: {
            color: { type: "string" },
            textColor: { type: "string" },
            borderRadius: { type: "number" },
            borderWidth: { type: "number" },
            borderColor: { type: "string" },
          },
        },
      },
    },
    EventInPerson: {
      type: "object",
      description: "Where and when the event happens in person. `null` if it is online only.",
      required: ["start", "end", "location"],
      properties: {
        start: nullableDate,
        end: nullableDate,
        location: nullableString,
      },
    },
    Event: {
      type: "object",
      required: ["id", "slug", "name", "status", "startDate", "announcedAt"],
      properties: {
        id: {
          type: "string",
          description:
            "Airtable record id. This identifier is stable, so store this instead of the slug.",
        },
        slug: {
          type: "string",
          description:
            "Derived from the name. This will change if the event is renamed for whatever reason.",
        },
        name: { type: "string" },
        description: nullableString,
        url: { ...(nullableString as object), description: "The event's own website." },
        status: { type: "string", enum: [...EVENT_STATUSES] },
        startDate: { type: "string", format: "date" },
        endDate: {
          ...(nullableDate as object),
          description: "`null` means the event runs indefinitely.",
        },
        announcedAt: {
          type: "string",
          format: "date-time",
          description: "When the event was added.",
        },
        format: { type: ["string", "null"], enum: ["in-person", "online", "both", null] },
        inPerson: {
          oneOf: [{ $ref: "#/components/schemas/EventInPerson" }, { type: "null" }],
        },
        projectTypes: {
          type: "array",
          items: { type: "string", enum: [...PROJECT_TYPE_OPTIONS] },
        },
        slackChannel: {
          ...(nullableString as object),
          description: "Channel name, without the leading `#`.",
        },
        slackUrl: nullableString,
        requirements: nullableString,
        pinned: { type: "boolean" },
        logoUrl: {
          ...(nullableString as object),
          description:
            "Signed Airtable URLs only last for about 2 hours, so don't hotlink them, but cache them heavily: https://support.airtable.com/articles/9671148410-airtable-attachment-url-behavior",
        },
        background: {
          oneOf: [{ $ref: "#/components/schemas/EventBackground" }, { type: "null" }],
        },
        theme: {
          oneOf: [{ $ref: "#/components/schemas/EventTheme" }, { type: "null" }],
        },
      },
    },
    EventList: {
      type: "object",
      required: ["data", "meta"],
      properties: {
        data: { type: "array", items: { $ref: "#/components/schemas/Event" } },
        meta: {
          type: "object",
          required: ["count", "generatedAt"],
          properties: {
            count: {
              type: "integer",
              description: "Number of events in `data`, after any filtering and `limit`.",
            },
            generatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    EventItem: {
      type: "object",
      required: ["data", "meta"],
      properties: {
        data: { $ref: "#/components/schemas/Event" },
        meta: {
          type: "object",
          required: ["generatedAt"],
          properties: { generatedAt: { type: "string", format: "date-time" } },
        },
      },
    },
  };
}

export function buildOpenApiDocument(origin: string = SITE_URL): Json {
  return {
    openapi: "3.2.0",
    info: {
      title: "Hack Club Events API",
      version: "1.0.0",
      summary: "The official public API for all Hack Club events.",
      description: [
        "In the past we used to have issues where we would have many different APIs claiming to be the source of truth for Hack Club events, however each would be somehow outdated or incomplete. This API is now supposed to be the single source of truth. It fetches directly from our internal Airtables (specifically the Unified YSWS table) and is the only API that is guaranteed to be most up to date.",
        "",
        "Due to Airtable ratelimits, we cache for 5 minutes maximum. Any image URLs signed by Airtable only last for about 2 hours, so don't hotlink them, but cache them heavily or just store the raw image. These are unlikely to change frequently.",
        "",
        "Every error is JSON with a stable `code`, a `message`, a `hint`, and the HTTP `status` repeated in the body for your convenience. This API and documentation is made with AI agents in mind, so point them here if you want them to understand the API. Pages on this site answer `Accept: text/markdown`; see /llms.txt for the page index.",
        "",
        "While the site does serve some other API endpoints, these are deliberately undocumented and should not be built on as they only serve internal purposes. The only public API is under `/api/v1/events`.",
      ].join("\n"),
      contact: { name: "Hack Club", email: "echo@hackclub.com" },
      license: { name: "MIT", identifier: "MIT" },
    },
    servers: [{ url: origin, description: "This deployment" }],
    security: [{}],
    externalDocs: { description: "Rendered API reference", url: `${origin}/api/v1/docs` },
    tags: [
      {
        name: "events",
        description: "Hack Club events",
      },
    ],
    paths: paths(),
    components: { schemas: schemas() },
  };
}
