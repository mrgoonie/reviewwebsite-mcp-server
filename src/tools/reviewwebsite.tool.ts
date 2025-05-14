/**
 * @file reviewwebsite.tool.ts
 * @description Tool definitions for the ReviewWeb.site API
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import reviewWebsiteController from '../controllers/reviewwebsite.controller.js';
import {
	ConvertToMarkdownToolArgs,
	ConvertToMarkdownToolArgsType,
	ConvertMultipleToMarkdownToolArgs,
	ConvertMultipleToMarkdownToolArgsType,
	ExtractDataToolArgs,
	ExtractDataToolArgsType,
	ExtractDataMultipleToolArgs,
	ExtractDataMultipleToolArgsType,
	ScrapeUrlToolArgs,
	ScrapeUrlToolArgsType,
	ExtractLinksToolArgs,
	ExtractLinksToolArgsType,
	SummarizeUrlToolArgs,
	SummarizeUrlToolArgsType,
	SummarizeWebsiteToolArgs,
	SummarizeWebsiteToolArgsType,
	SummarizeMultipleUrlsToolArgs,
	SummarizeMultipleUrlsToolArgsType,
	UrlIsAliveToolArgs,
	UrlIsAliveToolArgsType,
	UrlGetUrlAfterRedirectsToolArgs,
	UrlGetUrlAfterRedirectsToolArgsType,
} from './reviewwebsite.types.js';

/**
 * @function handleConvertToMarkdown
 * @description MCP Tool handler to convert a URL to Markdown using AI
 * @param {ConvertToMarkdownToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleConvertToMarkdown(args: ConvertToMarkdownToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleConvertToMarkdown',
	);
	methodLogger.debug(`Converting URL to Markdown with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.convertToMarkdown(
			args.url,
			{
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error converting URL to Markdown`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleConvertMultipleToMarkdown
 * @description MCP Tool handler to convert multiple URLs to Markdown using AI
 * @param {ConvertMultipleToMarkdownToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleConvertMultipleToMarkdown(
	args: ConvertMultipleToMarkdownToolArgsType,
) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleConvertMultipleToMarkdown',
	);
	methodLogger.debug(`Converting multiple URLs to Markdown with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.convertMultipleToMarkdown(
			args.urls,
			{
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error converting multiple URLs to Markdown`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleExtractData
 * @description MCP Tool handler to extract structured data from a URL using AI
 * @param {ExtractDataToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleExtractData(args: ExtractDataToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleExtractData',
	);
	methodLogger.debug(`Extracting data from URL with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.extractData(
			args.url,
			{
				instructions: args.instructions,
				systemPrompt: args.systemPrompt,
				jsonTemplate: args.jsonTemplate,
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				recursive: args.recursive,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error extracting data from URL`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleExtractDataMultiple
 * @description MCP Tool handler to extract structured data from multiple URLs using AI
 * @param {ExtractDataMultipleToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleExtractDataMultiple(
	args: ExtractDataMultipleToolArgsType,
) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleExtractDataMultiple',
	);
	methodLogger.debug(`Extracting data from multiple URLs with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.extractDataMultiple(
			args.urls,
			{
				instructions: args.instructions,
				systemPrompt: args.systemPrompt,
				jsonTemplate: args.jsonTemplate,
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error extracting data from multiple URLs`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleScrapeUrl
 * @description MCP Tool handler to scrape a URL
 * @param {ScrapeUrlToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleScrapeUrl(args: ScrapeUrlToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleScrapeUrl',
	);
	methodLogger.debug(`Scraping URL with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.scrapeUrl(
			args.url,
			args.delayAfterLoad,
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error scraping URL`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleExtractLinks
 * @description MCP Tool handler to extract links from a URL
 * @param {ExtractLinksToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleExtractLinks(args: ExtractLinksToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleExtractLinks',
	);
	methodLogger.debug(`Extracting links from URL with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.extractLinks(
			args.url,
			{
				type: args.type,
				maxLinks: args.maxLinks,
				delayAfterLoad: args.delayAfterLoad,
				getStatusCode: args.getStatusCode,
				autoScrapeInternalLinks: args.autoScrapeInternalLinks,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error extracting links from URL`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleSummarizeUrl
 * @description MCP Tool handler to summarize a URL using AI
 * @param {SummarizeUrlToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleSummarizeUrl(args: SummarizeUrlToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleSummarizeUrl',
	);
	methodLogger.debug(`Summarizing URL with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.summarizeUrl(
			args.url,
			{
				instructions: args.instructions,
				systemPrompt: args.systemPrompt,
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				maxLength: args.maxLength,
				format: args.format,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error summarizing URL`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleSummarizeWebsite
 * @description MCP Tool handler to summarize a website (multiple pages) using AI
 * @param {SummarizeWebsiteToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleSummarizeWebsite(args: SummarizeWebsiteToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleSummarizeWebsite',
	);
	methodLogger.debug(`Summarizing website with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.summarizeWebsite(
			args.url,
			{
				instructions: args.instructions,
				systemPrompt: args.systemPrompt,
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				maxLinks: args.maxLinks,
				maxLength: args.maxLength,
				format: args.format,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error summarizing website`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleSummarizeMultipleUrls
 * @description MCP Tool handler to summarize multiple URLs using AI
 * @param {SummarizeMultipleUrlsToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleSummarizeMultipleUrls(
	args: SummarizeMultipleUrlsToolArgsType,
) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleSummarizeMultipleUrls',
	);
	methodLogger.debug(`Summarizing multiple URLs with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.summarizeMultipleUrls(
			args.urls,
			{
				instructions: args.instructions,
				systemPrompt: args.systemPrompt,
				model: args.model,
				delayAfterLoad: args.delayAfterLoad,
				maxLinks: args.maxLinks,
				maxLength: args.maxLength,
				format: args.format,
				debug: args.debug,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error summarizing multiple URLs`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleIsUrlAlive
 * @description MCP Tool handler to check if a URL is alive
 * @param {UrlIsAliveToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleIsUrlAlive(args: UrlIsAliveToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleIsUrlAlive',
	);
	methodLogger.debug(`Checking if URL is alive with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.isUrlAlive(
			args.url,
			{
				timeout: args.timeout,
				proxyUrl: args.proxyUrl,
			},
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error checking if URL is alive`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleGetUrlAfterRedirects
 * @description MCP Tool handler to get URL after redirects
 * @param {UrlGetUrlAfterRedirectsToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleGetUrlAfterRedirects(
	args: UrlGetUrlAfterRedirectsToolArgsType,
) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleGetUrlAfterRedirects',
	);
	methodLogger.debug(`Getting URL after redirects:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.getUrlAfterRedirects(
			args.url,
			{
				api_key: args.api_key,
			},
		);

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error getting URL after redirects`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function register
 * @description Registers the ReviewWeb.site tools with the MCP server
 * @param {McpServer} server - The MCP server instance
 */
function register(server: McpServer) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'register',
	);
	methodLogger.debug(`Registering ReviewWeb.site tools...`);

	// Register convert to markdown tools
	server.tool(
		'convert_to_markdown',
		`Convert a URL to Markdown using AI via ReviewWeb.site API.
		Turn a web page into LLM-friendly content.`,
		ConvertToMarkdownToolArgs.shape,
		handleConvertToMarkdown,
	);

	server.tool(
		'convert_multiple_to_markdown',
		`Convert multiple URLs to Markdown using AI via ReviewWeb.site API.
		Turn multiple web pages into LLM-friendly content.`,
		ConvertMultipleToMarkdownToolArgs.shape,
		handleConvertMultipleToMarkdown,
	);

	// Register extract data tools
	server.tool(
		'extract_data',
		`Extract structured data (JSON) from a web page URL using AI via ReviewWeb.site API.`,
		ExtractDataToolArgs.shape,
		handleExtractData,
	);

	server.tool(
		'extract_data_multiple',
		`Extract structured data (JSON) from multiple web page URLs using AI via ReviewWeb.site API.`,
		ExtractDataMultipleToolArgs.shape,
		handleExtractDataMultiple,
	);

	// Register scrape tools
	server.tool(
		'scrape_url',
		`Scrape a URL and return HTML content using ReviewWeb.site API.`,
		ScrapeUrlToolArgs.shape,
		handleScrapeUrl,
	);

	server.tool(
		'extract_links',
		`Extract all links from a HTML content of web page URL using ReviewWeb.site API.`,
		ExtractLinksToolArgs.shape,
		handleExtractLinks,
	);

	// Register summarize tools
	server.tool(
		'summarize_url',
		`Summarize a web page URL using AI via ReviewWeb.site API.`,
		SummarizeUrlToolArgs.shape,
		handleSummarizeUrl,
	);

	server.tool(
		'summarize_website',
		`Summarize a website (and its internal links) using AI via ReviewWeb.site API.`,
		SummarizeWebsiteToolArgs.shape,
		handleSummarizeWebsite,
	);

	server.tool(
		'summarize_multiple_urls',
		`Summarize multiple web page URLs using AI via ReviewWeb.site API.`,
		SummarizeMultipleUrlsToolArgs.shape,
		handleSummarizeMultipleUrls,
	);

	// Register URL tools
	server.tool(
		'url_is_alive',
		`Check if a URL is alive using ReviewWeb.site API.`,
		UrlIsAliveToolArgs.shape,
		handleIsUrlAlive,
	);

	server.tool(
		'url_get_after_redirects',
		`Get URL after redirects using ReviewWeb.site API.`,
		UrlGetUrlAfterRedirectsToolArgs.shape,
		handleGetUrlAfterRedirects,
	);

	methodLogger.debug('Successfully registered ReviewWeb.site tools.');
}

export default { register };
