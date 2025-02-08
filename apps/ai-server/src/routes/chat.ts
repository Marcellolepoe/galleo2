import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { tavily } from "@tavily/core";
import { toJsonSchema } from "@valibot/to-json-schema";
import {
  createDataStream,
  generateId,
  generateObject,
  generateText,
  jsonSchema,
  streamText,
  tool,
} from "ai";
import type { CoreMessage, DataStreamWriter } from "ai";
import { Hono } from "hono";
import * as v from "valibot";
import { getEnv } from "../lib/hono";
import {
  CLASS_FILLING_PROMPT,
  FEE_QUOTE_PROMPT,
  GOODS_AND_SERVICES_CHECK_PROMPT,
} from "../lib/prompts";

interface ChatRequest {
  messages: {
    id?: string;
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  context?: {
    emailSubject?: string;
    emailBody?: string;
    senderEmail?: string;
    jurisdiction?: string;
    proposedMarks?: string[];
    selectedClasses?: number[];
  };
}

function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, "%20");
}

async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return (
      response.ok &&
      (response.headers.get("content-type")?.startsWith("image/") ?? false)
    );
  } catch {
    return false;
  }
}

export const chatRouter = new Hono().post("/", async (c) => {
  const { messages, context } = await c.req.json<ChatRequest>();
  const env = getEnv();

  // Create a data stream that we can write to
  const dataStream = createDataStream({
    execute: async (dataStreamWriter: DataStreamWriter) => {
      // Write initial state
      dataStreamWriter.writeData("initialized");

      // Construct system message with context and examples
      const systemMessage: CoreMessage = {
        role: "system",
        content: `You are an AI legal assistant specializing in trademark law, focusing on helping customers with trademark inquiries and providing initial assessments. You have access to the law firms fee information, can look up a business background, can perform trademark assessments, and can list the goods and services that are appropriate for the business description.

CONTEXT AND CAPABILITIES:
${formatContext(context)}

GUIDELINES:
1. Initial Response:
   - Acknowledge the inquiry
   - Do as much as possible with the tools provided right away. in particular, consider using the business background check tool to get the business background information. From the background, you can then use the class filling recommendation tool to suggest classes for the trademark filing.
   - Do not be afraid to disagree with the user and provide your own recommendations.

2. Fee Quotes:
   - Always break down official vs professional fees
   - Include timelines and disclaimers
   - Format using the example structure

3. Trademark Assessment:
   - Analyze distinctiveness
   - Suggest appropriate classes
   - Suggest a list of pre-approved goods and services for the classes
   - Identify potential risks
   - Provide clear recommendations
   - Here is an example template for the response in <template> tags

<template>
In Singapore, series marks (in both colour and greyscale) are allowed, and we are glad to file with the attached mark representation as a series of 2 marks, if intended.

Where the graphical representation of the mark is in black and white / greyscale, it means that use of the mark in colour(s) is neither claimed nor disclaimed. Therefore, the mark is taken to have been used regardless of whether it appears in colour(s) or it appears in black and white as long as the representation conforms to the template or pattern of the mark as registered. In other words, it allows for a wider protection in Singapore.

For the word mark "cashbean blockchain", we recommned simply trademarking the word "cashbean" since blockchain is descriptive of the technology used by the business.

We have conducted a cursory review of the proposed goods and services to be filed. We note that the following items do not conform to the pre-approved descriptions and would be subject to the examiner to accept the same upon review:

Class 09
·Downloadable educational software featuring instruction in coding
·downloadable educational software for computer programming
·downloadable electronic publications, namely, books, magazines and manuals in the field of computer game software and animated cartoons
Class 41
·rental of educational material and apparatus
·providing of facilities for educational training
·artificial intelligence education academies
·computer academies
</template>

4. Communication Style:
   - Professional and clear
   - Avoid legal jargon unless necessary
   - Include relevant disclaimers
   - Use structured formatting for clarity
   - Speak like a professional lawyer from Singapore

Remember: Your goal is to provide value while maintaining professionalism. Always clarify uncertainties and provide actionable next steps. 

Your output MUST:
- Use the following HTML TAGS: <ul>, <ol>, <li>, <strong>, <p>, <br />
- Only include the inner part of the <body> tag
- Not include any CSS attributes or explanations
- Include greetings, but not any signing off or signature
- DO NOT wrap the output in any backticks, code blocks, **, or other markdown formatting
`,
      };

      const openai = createOpenAI({
        apiKey: env.OPENAI_API_KEY,
        compatibility: "strict",
      });

      const google = createGoogleGenerativeAI({
        apiKey: env.GOOGLE_GEMINI_API_KEY,
      });

      const models = {
        openai: openai("gpt-4o"),
        google: google("gemini-2.0-flash-001"),
      };
      const chosenModel = models.openai;

      const result = streamText({
        model: chosenModel,
        messages: [systemMessage, ...messages],
        temperature: 0,
        maxSteps: 10,
        tools: {
          feeQuote: tool({
            type: "function",
            description:
              "Use to retrieve fee information for the lawyer. Can be then used to calculate the total fee for the lawyer.",
            parameters: jsonSchema<{
              numberOfClasses: number;
              numberOfMarks: number;
              priorityClaim: boolean;
            }>(
              toJsonSchema(
                v.object({
                  numberOfClasses: v.pipe(
                    v.number(),
                    v.description("Number of classes to be filed"),
                  ),
                  numberOfMarks: v.pipe(
                    v.number(),
                    v.description("Number of marks to be filed"),
                  ),
                  priorityClaim: v.boolean(),
                }),
              ),
            ),
            execute: async ({
              numberOfClasses,
              numberOfMarks,
              priorityClaim,
            }) => {
              const feeInfo = [
                {
                  amountInCents: 63000,
                  currency: "SGD",
                  description:
                    "Professional fees - 1st class trademark application",
                  footnotes: "",
                },
                {
                  amountInCents: 42000,
                  currency: "SGD",
                  description: "Professional fees - Additional class",
                  footnotes: "",
                },
                {
                  amountInCents: 38000,
                  currency: "SGD",
                  description:
                    "Official fees - 1st class trademark application",
                  footnotes:
                    "Fee reduced to SGD 280 if using pre-approved specifications",
                },
                {
                  amountInCents: 38000,
                  currency: "SGD",
                  description: "Official fees - Additional class",
                  footnotes:
                    "Fee reduced to SGD 280 if using pre-approved specifications",
                },
                {
                  amountInCents: 42000,
                  currency: "SGD",
                  description:
                    "Professional fees - Processing acceptance (1st class)",
                  footnotes: "",
                },
                {
                  amountInCents: 21000,
                  currency: "SGD",
                  description:
                    "Professional fees - Processing acceptance (Additional class)",
                  footnotes: "",
                },
                {
                  amountInCents: 11000,
                  currency: "SGD",
                  description: "Professional fees - Priority claim",
                  footnotes: "Only applicable for identical specifications",
                },
              ];
              const result = await generateText({
                model: chosenModel,
                temperature: 0,
                prompt: FEE_QUOTE_PROMPT(
                  numberOfClasses,
                  numberOfMarks,
                  priorityClaim,
                  feeInfo,
                ),
              });
              return result.text;
            },
          }),
          businessBackgroundCheck: tool({
            description:
              "Use this tool to search the web for business background information and details. Useful for gathering information about companies, their activities, products/services, and market presence. You can perform multiple targeted searches with different depths and topics to build a comprehensive profile.",
            parameters: jsonSchema<{
              queries: string[];
              maxResults: number[];
              topics: ("general" | "news")[];
              searchDepth: ("basic" | "advanced")[];
              exclude_domains?: string[];
            }>(
              toJsonSchema(
                v.object({
                  queries: v.pipe(
                    v.array(v.string()),
                    v.description(
                      "Array of search queries relating to business. Can be something generic like 'business name' or 'business description'.",
                    ),
                  ),
                  // maxResults: v.pipe(
                  //   v.optional(v.array(v.number()), [10]),
                  //   v.description(
                  //     "Array of maximum number of results to return per query.",
                  //   ),
                  // ),
                  // topics: v.pipe(
                  //   v.optional(
                  //     v.array(
                  //       v.union([v.literal("general"), v.literal("news")]),
                  //     ),
                  //   ),
                  //   v.description(
                  //     "Array of topic types to search for relating to the business.",
                  //   ),
                  // ),
                  // searchDepth: v.pipe(
                  //   v.optional(
                  //     v.array(
                  //       v.union([v.literal("basic"), v.literal("advanced")]),
                  //     ),
                  //     ["basic"],
                  //   ),
                  //   v.description("Array of search depths to use."),
                  // ),
                  // exclude_domains: v.pipe(
                  //   v.optional(v.array(v.string()), []),
                  //   v.description(
                  //     "A list of domains to exclude from all search results often relating to domains of poor quality.",
                  //   ),
                  // ),
                }),
              ),
            ),
            execute: async ({
              queries,
              maxResults = [10],
              topics = ["general"],
              searchDepth = ["basic"],
              exclude_domains = [],
            }: {
              queries: string[];
              maxResults: number[];
              topics: ("general" | "news")[];
              searchDepth: ("basic" | "advanced")[];
              exclude_domains?: string[];
            }) => {
              const tvly = tavily({ apiKey: env.TAVILY_API_KEY });
              const includeImageDescriptions = true;

              console.log("Queries:", queries);
              console.log("Max Results:", maxResults);
              console.log("Topics:", topics);
              console.log("Search Depths:", searchDepth);
              console.log("Exclude Domains:", exclude_domains);

              // Execute searches in parallel
              const searchPromises = queries.map(async (query, index) => {
                const data = await tvly.search(query, {
                  topic: "general",
                  days: topics[index] === "news" ? 7 : undefined,
                  maxResults: maxResults[index] || maxResults[0] || 10,
                  searchDepth: searchDepth[index] || searchDepth[0] || "basic",
                  includeAnswer: true,
                  includeImages: true,
                  includeImageDescriptions: includeImageDescriptions,
                  excludeDomains: exclude_domains,
                });

                return {
                  query,
                  // TODO: fix this
                  // biome-ignore lint/suspicious/noExplicitAny: no reason
                  results: data.results.map((obj: any) => ({
                    url: obj.url,
                    title: obj.title,
                    content: obj.content,
                    raw_content: obj.raw_content,
                    published_date:
                      topics[index] === "news" ? obj.published_date : undefined,
                  })),
                  images: includeImageDescriptions
                    ? await Promise.all(
                        data.images.map(
                          async ({
                            url,
                            description,
                          }: { url: string; description?: string }) => {
                            const sanitizedUrl = sanitizeUrl(url);
                            const isValid = await isValidImageUrl(sanitizedUrl);

                            return isValid
                              ? {
                                  url: sanitizedUrl,
                                  description: description ?? "",
                                }
                              : null;
                          },
                        ),
                      ).then((results) =>
                        results.filter(
                          (
                            image,
                          ): image is {
                            url: string;
                            description: string;
                          } =>
                            image !== null &&
                            typeof image === "object" &&
                            typeof image.description === "string" &&
                            image.description !== "",
                        ),
                      )
                    : await Promise.all(
                        data.images.map(async ({ url }: { url: string }) => {
                          const sanitizedUrl = sanitizeUrl(url);
                          return (await isValidImageUrl(sanitizedUrl))
                            ? sanitizedUrl
                            : null;
                        }),
                      ).then((results) =>
                        results.filter((url): url is string => url !== null),
                      ),
                };
              });

              const searchResults = await Promise.all(searchPromises);

              return {
                searches: searchResults,
              };
            },
          }),
          classFillingRecommendation: tool({
            parameters: jsonSchema<{
              businessDescription: string;
            }>(
              toJsonSchema(
                v.object({
                  businessActivity: v.pipe(
                    v.string(),
                    v.description(
                      "A description of the type of activity the business is engaged in.",
                    ),
                  ),
                }),
              ),
            ),
            execute: async ({ businessDescription }) => {
              const result = await generateObject({
                model: chosenModel,
                prompt: CLASS_FILLING_PROMPT(businessDescription),
                temperature: 0,
                output: "object",
                schema: jsonSchema<{
                  classes: number[];
                }>(
                  toJsonSchema(
                    v.object({
                      classes: v.array(v.number()),
                    }),
                  ),
                ),
                schemaName: "classFillingRecommendation",
                schemaDescription:
                  "A list of class numbers that are appropriate for the business description.",
              });
              return result.object;
            },
            description:
              "Suggest classes for the trademark filling based the business description/activity with proper rationale and explanation",
          }),
          listBusinessGoodsAndServices: tool({
            parameters: jsonSchema<{
              businessSummary: string;
            }>(
              toJsonSchema(
                v.object({
                  businessSummary: v.pipe(
                    v.string(),
                    v.description(
                      "A summary of the business's activities, products/services, and market presence.",
                    ),
                  ),
                }),
              ),
            ),
            execute: async ({ businessSummary }) => {
              const result = await generateObject({
                model: chosenModel,
                prompt: GOODS_AND_SERVICES_CHECK_PROMPT(businessSummary),
                output: "object",
                temperature: 0,
                schema: jsonSchema<{
                  goodsAndServices: {
                    goodsAndService: string;
                    isPreApproved: boolean;
                  }[];
                }>(
                  toJsonSchema(
                    v.object({
                      goodsAndServices: v.array(
                        v.object({
                          goodsAndService: v.string(),
                          isPreApproved: v.boolean(),
                        }),
                      ),
                    }),
                  ),
                ),
                schemaName: "goodsAndServicesCheck",
                schemaDescription:
                  "A list of goods and services that are appropriate for the business description.",
              });
              return result.object;
            },
            description:
              "Use this tool to list the goods and services that are appropriate for the business summary.",
          }),
        },
        onChunk: (chunk) => {
          console.log("chunk", chunk.chunk);
        },
        onFinish: () => {
          dataStreamWriter.writeMessageAnnotation({
            id: generateId(),
            status: "completed",
          });
        },
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error: unknown) => {
      console.error("error", error);
      // Mask error messages in production
      if (env.NODE_ENV === "production") {
        return "An error occurred while processing your request";
      }
      return error instanceof Error ? error.message : String(error);
    },
  });

  // Stream the response
  return new Response(dataStream.pipeThrough(new TextEncoderStream()), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
});

// Helper function to format context
function formatContext(context?: ChatRequest["context"]): string {
  if (!context) return "No additional context provided.";

  const parts = [];
  if (context.emailSubject) parts.push(`Subject: ${context.emailSubject}`);
  if (context.senderEmail) parts.push(`From: ${context.senderEmail}`);
  if (context.jurisdiction) parts.push(`Jurisdiction: ${context.jurisdiction}`);
  if (context.proposedMarks?.length)
    parts.push(`Marks: ${context.proposedMarks.join(", ")}`);
  if (context.selectedClasses?.length)
    parts.push(`Classes: ${context.selectedClasses.join(", ")}`);

  return parts.length ? parts.join("\n") : "No additional context provided.";
}
