/**
 * @file reviewwebsite.types.ts
 * @description Type definitions for the ReviewWebsite MCP tools.
 */

import { z } from 'zod';

/**
 * Schema for ReviewWebsite review creation tool arguments
 */
export const CreateReviewToolArgs = z.object({
	// Essential parameters
	url: z.string().describe('Website URL to be reviewed'),
	instructions: z
		.string()
		.optional()
		.describe('Optional custom review instructions'),
	skipImageExtraction: z
		.boolean()
		.optional()
		.describe('Skip extracting images from the website'),
	skipLinkExtraction: z
		.boolean()
		.optional()
		.describe('Skip extracting links from the website'),
	maxExtractedImages: z
		.number()
		.optional()
		.describe('Maximum number of images to extract'),
	maxExtractedLinks: z
		.number()
		.optional()
		.describe('Maximum number of links to extract'),
	textModel: z
		.string()
		.optional()
		.describe('Text model to use for AI analysis'),
	visionModel: z
		.string()
		.optional()
		.describe('Vision model to use for AI analysis'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite get review tool arguments
 */
export const GetReviewToolArgs = z.object({
	review_id: z.string().describe('ID of the review to retrieve'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite list reviews tool arguments
 */
export const ListReviewsToolArgs = z.object({
	page: z.number().optional().describe('Page number for pagination'),
	limit: z.number().optional().describe('Number of reviews per page'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite update review tool arguments
 */
export const UpdateReviewToolArgs = z.object({
	review_id: z.string().describe('ID of the review to update'),
	url: z.string().optional().describe('Updated website URL to be reviewed'),
	instructions: z
		.string()
		.optional()
		.describe('Updated custom review instructions'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite delete review tool arguments
 */
export const DeleteReviewToolArgs = z.object({
	review_id: z.string().describe('ID of the review to delete'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite get AI models tool arguments
 */
export const GetAIModelsToolArgs = z.object({
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite convert URL to markdown tool arguments
 */
export const ConvertToMarkdownToolArgs = z.object({
	url: z.string().describe('The URL to convert to Markdown'),
	model: z.string().optional().describe('AI model to use for conversion'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	debug: z
		.boolean()
		.optional()
		.describe('Enable debug mode for detailed logging'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite convert multiple URLs to markdown tool arguments
 */
export const ConvertMultipleToMarkdownToolArgs = z.object({
	urls: z.array(z.string()).describe('List of URLs to convert to Markdown'),
	model: z.string().optional().describe('AI model to use for conversion'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	maxLinks: z
		.number()
		.optional()
		.describe('Maximum number of URLs to process'),
	debug: z.boolean().optional().describe('Whether to enable debug mode'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite extract data from URL tool arguments
 */
export const ExtractDataToolArgs = z.object({
	url: z.string().describe('The URL to extract data from'),
	instructions: z
		.string()
		.describe('Instructions for the AI on what data to extract'),
	jsonTemplate: z
		.string()
		.describe('JSON template for structuring the extracted data'),
	systemPrompt: z
		.string()
		.optional()
		.describe('Optional system prompt to guide the AI'),
	model: z.string().optional().describe('AI model to use for extraction'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	recursive: z
		.boolean()
		.optional()
		.describe(
			'If true, recursively scrape all internal URLs and extract data from each',
		),
	debug: z
		.boolean()
		.optional()
		.describe('Enable debug mode for detailed logging'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite extract data from multiple URLs tool arguments
 */
export const ExtractDataMultipleToolArgs = z.object({
	urls: z.array(z.string()).describe('List of URLs to extract data from'),
	instructions: z
		.string()
		.describe('Instructions for the AI to extract data from the websites'),
	jsonTemplate: z
		.string()
		.describe('JSON schema template for the extracted data output'),
	systemPrompt: z.string().optional().describe('System prompt for the AI'),
	model: z.string().optional().describe('AI model to use for extraction'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	debug: z.boolean().optional().describe('Whether to enable debug mode'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite scrape URL tool arguments
 */
export const ScrapeUrlToolArgs = z.object({
	url: z.string().describe('The URL to scrape'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite extract links from URL tool arguments
 */
export const ExtractLinksToolArgs = z.object({
	url: z.string().describe('The target URL to extract links from'),
	type: z
		.enum(['web', 'image', 'file', 'all'])
		.optional()
		.describe('Type of links to extract'),
	maxLinks: z
		.number()
		.optional()
		.describe('Maximum number of links to return'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe(
			'Delay in milliseconds after page load before extracting links',
		),
	getStatusCode: z
		.boolean()
		.optional()
		.describe('Whether to get HTTP status codes for each link'),
	autoScrapeInternalLinks: z
		.boolean()
		.optional()
		.describe('Whether to automatically scrape internal links'),
	debug: z.boolean().optional().describe('Whether to enable debug mode'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite summarize URL tool arguments
 */
export const SummarizeUrlToolArgs = z.object({
	url: z.string().describe('The URL to summarize'),
	instructions: z
		.string()
		.optional()
		.describe(
			'Custom instructions for the AI on how to summarize the content',
		),
	systemPrompt: z
		.string()
		.optional()
		.describe('Custom system prompt to guide the AI'),
	model: z.string().optional().describe('AI model to use for summarization'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	maxLength: z
		.number()
		.optional()
		.describe('Maximum length of the summary in words'),
	format: z
		.enum(['bullet', 'paragraph'])
		.optional()
		.describe('Format of the summary (bullet points or paragraph)'),
	debug: z
		.boolean()
		.optional()
		.describe('Enable debug mode for detailed logging'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite summarize website tool arguments
 */
export const SummarizeWebsiteToolArgs = z.object({
	url: z.string().describe('The main URL of the website to summarize'),
	instructions: z
		.string()
		.optional()
		.describe(
			'Custom instructions for the AI on how to summarize the content',
		),
	systemPrompt: z
		.string()
		.optional()
		.describe('Custom system prompt to guide the AI'),
	model: z.string().optional().describe('AI model to use for summarization'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	maxLinks: z
		.number()
		.optional()
		.describe('Maximum number of pages to process'),
	maxLength: z
		.number()
		.optional()
		.describe('Maximum length of the summary in words'),
	format: z
		.enum(['bullet', 'paragraph'])
		.optional()
		.describe('Format of the summary (bullet points or paragraph)'),
	debug: z
		.boolean()
		.optional()
		.describe('Enable debug mode for detailed logging'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for ReviewWebsite summarize multiple URLs tool arguments
 */
export const SummarizeMultipleUrlsToolArgs = z.object({
	urls: z.array(z.string()).describe('List of URLs to summarize'),
	instructions: z
		.string()
		.optional()
		.describe(
			'Custom instructions for the AI on how to summarize the content',
		),
	systemPrompt: z
		.string()
		.optional()
		.describe('Custom system prompt to guide the AI'),
	model: z.string().optional().describe('AI model to use for summarization'),
	delayAfterLoad: z
		.number()
		.optional()
		.describe('Optional delay after page load in milliseconds'),
	maxLinks: z
		.number()
		.optional()
		.describe('Maximum number of URLs to process'),
	maxLength: z
		.number()
		.optional()
		.describe('Maximum length of each summary in words'),
	format: z
		.enum(['bullet', 'paragraph'])
		.optional()
		.describe('Format of the summary (bullet points or paragraph)'),
	debug: z.boolean().optional().describe('Whether to enable debug mode'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for URL is-alive tool arguments
 */
export const UrlIsAliveToolArgs = z.object({
	url: z.string().describe("URL to check if it's alive"),
	timeout: z
		.number()
		.optional()
		.describe('Request timeout in milliseconds (default: 10000)'),
	proxyUrl: z
		.string()
		.optional()
		.describe('Proxy URL to use for the request'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Schema for URL get-url-after-redirects tool arguments
 */
export const UrlGetUrlAfterRedirectsToolArgs = z.object({
	url: z.string().describe('URL to get after redirects'),
	api_key: z.string().optional().describe('Your ReviewWebsite API key'),
});

/**
 * Type for ReviewWebsite tool arguments
 */
export type CreateReviewToolArgsType = z.infer<typeof CreateReviewToolArgs>;
export type GetReviewToolArgsType = z.infer<typeof GetReviewToolArgs>;
export type ListReviewsToolArgsType = z.infer<typeof ListReviewsToolArgs>;
export type UpdateReviewToolArgsType = z.infer<typeof UpdateReviewToolArgs>;
export type DeleteReviewToolArgsType = z.infer<typeof DeleteReviewToolArgs>;
export type GetAIModelsToolArgsType = z.infer<typeof GetAIModelsToolArgs>;
export type ConvertToMarkdownToolArgsType = z.infer<
	typeof ConvertToMarkdownToolArgs
>;
export type ConvertMultipleToMarkdownToolArgsType = z.infer<
	typeof ConvertMultipleToMarkdownToolArgs
>;
export type ExtractDataToolArgsType = z.infer<typeof ExtractDataToolArgs>;
export type ExtractDataMultipleToolArgsType = z.infer<
	typeof ExtractDataMultipleToolArgs
>;
export type ScrapeUrlToolArgsType = z.infer<typeof ScrapeUrlToolArgs>;
export type ExtractLinksToolArgsType = z.infer<typeof ExtractLinksToolArgs>;
export type SummarizeUrlToolArgsType = z.infer<typeof SummarizeUrlToolArgs>;
export type SummarizeWebsiteToolArgsType = z.infer<
	typeof SummarizeWebsiteToolArgs
>;
export type SummarizeMultipleUrlsToolArgsType = z.infer<
	typeof SummarizeMultipleUrlsToolArgs
>;
export type UrlIsAliveToolArgsType = z.infer<typeof UrlIsAliveToolArgs>;
export type UrlGetUrlAfterRedirectsToolArgsType = z.infer<
	typeof UrlGetUrlAfterRedirectsToolArgs
>;

/**
 * Options for the ReviewWebsite controller
 */
export interface ReviewWebsiteOptions {
	api_key?: string;
}

/**
 * URL is-alive options
 */
export interface UrlIsAliveOptions {
	timeout?: number;
	proxyUrl?: string;
}

/**
 * Review options
 */
export interface ReviewOptions {
	skipImageExtraction?: boolean;
	skipLinkExtraction?: boolean;
	maxExtractedImages?: number;
	maxExtractedLinks?: number;
	textModel?: string;
	visionModel?: string;
}

/**
 * Convert to markdown options
 */
export interface ConvertToMarkdownOptions {
	model?: string;
	delayAfterLoad?: number;
	debug?: boolean;
}

/**
 * Extract data options
 */
export interface ExtractDataOptions {
	instructions: string;
	systemPrompt?: string;
	jsonTemplate: string;
	model?: string;
	delayAfterLoad?: number;
	recursive?: boolean;
	debug?: boolean;
}

/**
 * Extract links options
 */
export interface ExtractLinksOptions {
	type?: 'web' | 'image' | 'file' | 'all';
	maxLinks?: number;
	delayAfterLoad?: number;
	getStatusCode?: boolean;
	autoScrapeInternalLinks?: boolean;
	debug?: boolean;
}

/**
 * Summarize options
 */
export interface SummarizeOptions {
	instructions?: string;
	systemPrompt?: string;
	model?: string;
	delayAfterLoad?: number;
	maxLinks?: number;
	maxLength?: number;
	format?: 'bullet' | 'paragraph';
	debug?: boolean;
}
