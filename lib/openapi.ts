import { PROJECT_TYPE_OPTIONS } from "@/lib/site-programs";
import { API_ERROR_CODES } from "@/lib/api-error";
import { SITE_URL } from "@/lib/seo";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const nullableString: Json = { type: ["string", "null"] };

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

export function buildOpenApiDocument(origin: string = SITE_URL): Json {
  return {
    openapi: "3.1.0",
    info: {
      title: "Hack Club site API",
      version: "1.0.0",
      summary: "Public read-only JSON endpoints behind hackclub.com.",
      description: [
        "The data hackclub.com renders — programs, projects, and the team — served as",
        "JSON. Every endpoint here is a GET and needs no authentication.",
        "",
        "The site also runs authenticated endpoints for the program editor and its",
        "OAuth flow. Those are internal plumbing, not a public API, so they are",
        "deliberately absent from this document.",
        "",
        "Every error is JSON with a stable `code`, a `message`, a `hint`, and the HTTP",
        "`status` repeated in the body. Pages on this site also answer",
        "`Accept: text/markdown`; see /llms.txt for the page index.",
      ].join("\n"),
      contact: { name: "Hack Club", email: "team@hackclub.com", url: `${origin}/press` },
      license: { name: "MIT", identifier: "MIT" },
    },
    servers: [{ url: origin, description: "This deployment" }],
    security: [{}],
    externalDocs: { description: "Site index for agents", url: `${origin}/llms.txt` },
    tags: [
      { name: "programs", description: "Hack Club programs (YSWS) shown across the site." },
      { name: "projects", description: "Projects teenagers shipped through those programs." },
      { name: "people", description: "The team behind Hack Club." },
    ],
    paths: {
      "/api/programs": {
        get: {
          tags: ["programs"],
          operationId: "listPrograms",
          summary: "List programs",
          description:
            "Programs with their site customisation. Returns an empty array when the upstream Airtable key is not configured.",
          responses: {
            "200": jsonResponse("Programs, newest first.", {
              type: "array",
              items: { $ref: "#/components/schemas/Program" },
            }),
            "502": errorResponse("The upstream Airtable request failed."),
          },
        },
      },
      "/api/projects": {
        get: {
          tags: ["projects"],
          operationId: "listProjects",
          summary: "List recent projects",
          description: "A sample of up to 15 recently shipped projects.",
          responses: {
            "200": jsonResponse("Projects.", {
              type: "array",
              items: { $ref: "#/components/schemas/Project" },
            }),
            "500": errorResponse("The server is missing its Airtable credentials."),
            "502": errorResponse("The upstream Airtable request failed."),
          },
        },
      },
      "/api/team": {
        get: {
          tags: ["people"],
          operationId: "listTeam",
          summary: "List current team members",
          responses: {
            "200": jsonResponse("Team members.", {
              type: "array",
              items: { $ref: "#/components/schemas/TeamMember" },
            }),
          },
        },
      },
      "/api/acknowledged": {
        get: {
          tags: ["people"],
          operationId: "listAcknowledged",
          summary: "List acknowledged former team members",
          responses: {
            "200": jsonResponse("Acknowledged people.", {
              type: "array",
              items: { $ref: "#/components/schemas/TeamMember" },
            }),
          },
        },
      },
      "/api/site-programs": {
        get: {
          tags: ["programs"],
          operationId: "listSiteProgramCustomisations",
          summary: "List program card customisations",
          description:
            "How each program's card is styled on the site: colours, logo, dates, Slack channel.",
          responses: {
            "200": jsonResponse("Customisations.", {
              type: "array",
              items: { $ref: "#/components/schemas/SiteProgram" },
            }),
            "500": errorResponse("Missing credentials, or the upstream request failed."),
          },
        },
      },
    },
    components: {
      schemas: {
        Error: errorResponseSchema,
        Program: {
          type: "object",
          required: ["id", "name", "startDate"],
          properties: {
            id: { type: "string", description: "Airtable record id." },
            name: { type: "string" },
            startDate: { type: "string", format: "date" },
            endDate: { type: ["string", "null"], format: "date" },
            websiteUrl: nullableString,
            site: {
              oneOf: [{ $ref: "#/components/schemas/SiteProgram" }, { type: "null" }],
              description: "Card customisation, when the program has one.",
            },
          },
        },
        Project: {
          type: "object",
          required: ["id", "projectName", "person"],
          properties: {
            id: { type: "string" },
            projectName: { type: "string" },
            person: { type: "string" },
            age: nullableString,
            country: nullableString,
            playableUrl: nullableString,
            codeUrl: nullableString,
            imageUrl: nullableString,
            programName: nullableString,
          },
        },
        TeamMember: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            department: { type: "string" },
            role: { type: "string" },
            acknowledged: { type: "boolean" },
            bio: { type: "string" },
            slackId: { type: "string" },
            email: { type: "string" },
            website: { type: "string" },
            avatar: { type: "string" },
          },
        },
        SiteProgram: {
          type: "object",
          required: ["recordId", "programName"],
          properties: {
            recordId: { type: "string" },
            programName: { type: "string" },
            description: nullableString,
            bgType: { type: "string", enum: ["color", "image"] },
            bgColor: { type: "string" },
            textColor: { type: "string" },
            accentColor: { type: "string" },
            logoUrl: nullableString,
            logoSize: { type: "number" },
            bgImageUrl: nullableString,
            buttonColor: { type: "string" },
            buttonTextColor: { type: "string" },
            buttonBorderRadius: { type: "number" },
            buttonBorderWidth: { type: "number" },
            buttonBorderColor: { type: "string" },
            slackChannel: nullableString,
            projectTypes: {
              type: "array",
              items: { type: "string", enum: [...PROJECT_TYPE_OPTIONS] },
            },
            format: {
              type: ["string", "null"],
              enum: ["In-Person Only", "Online Only", "Both", null],
            },
            inPersonStart: { type: ["string", "null"], format: "date" },
            inPersonEnd: { type: ["string", "null"], format: "date" },
            inPersonLocation: nullableString,
            additionalRequirements: nullableString,
            pinned: { type: "boolean" },
          },
        },
      },
    },
  };
}
