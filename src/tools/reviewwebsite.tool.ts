/**
 * @file reviewwebsite.tool.ts
 * @description Tool definitions for the ReviewWebsite API
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import reviewWebsiteController from '../controllers/reviewwebsite.controller.js';
import {
	CreateReviewToolArgs,
	CreateReviewToolArgsType,
	GetReviewToolArgs,
	GetReviewToolArgsType,
	ListReviewsToolArgs,
	ListReviewsToolArgsType,
	UpdateReviewToolArgs,
	UpdateReviewToolArgsType,
	DeleteReviewToolArgs,
	DeleteReviewToolArgsType,
	GetAIModelsToolArgs,
	GetAIModelsToolArgsType,
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
} from './reviewwebsite.types.js';

/**
 * @function handleGetAIModels
 * @description MCP Tool handler to get available AI models from ReviewWebsite API
 * @param {GetAIModelsToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleGetAIModels(args: GetAIModelsToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleGetAIModels',
	);
	methodLogger.debug(`Getting AI models with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.getAIModels({
			api_key: args.api_key,
		});

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error getting AI models`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleCreateReview
 * @description MCP Tool handler to create a new website review
 * @param {CreateReviewToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleCreateReview(args: CreateReviewToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleCreateReview',
	);
	methodLogger.debug(`Creating review with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.createReview(
			args.url,
			args.instructions,
			{
				skipImageExtraction: args.skipImageExtraction,
				skipLinkExtraction: args.skipLinkExtraction,
				maxExtractedImages: args.maxExtractedImages,
				maxExtractedLinks: args.maxExtractedLinks,
				textModel: args.textModel,
				visionModel: args.visionModel,
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
		methodLogger.error(`Error creating review`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleGetReview
 * @description MCP Tool handler to get a specific review by ID
 * @param {GetReviewToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleGetReview(args: GetReviewToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleGetReview',
	);
	methodLogger.debug(`Getting review with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.getReview(args.review_id, {
			api_key: args.api_key,
		});

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error(`Error getting review`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleListReviews
 * @description MCP Tool handler to get all reviews with pagination
 * @param {ListReviewsToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleListReviews(args: ListReviewsToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleListReviews',
	);
	methodLogger.debug(`Listing reviews with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.listReviews(
			args.page,
			args.limit,
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
		methodLogger.error(`Error listing reviews`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleUpdateReview
 * @description MCP Tool handler to update an existing review
 * @param {UpdateReviewToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleUpdateReview(args: UpdateReviewToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleUpdateReview',
	);
	methodLogger.debug(`Updating review with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.updateReview(
			args.review_id,
			args.url,
			args.instructions,
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
		methodLogger.error(`Error updating review`, error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * @function handleDeleteReview
 * @description MCP Tool handler to delete a specific review by ID
 * @param {DeleteReviewToolArgsType} args - Arguments provided to the tool
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} Formatted response for the MCP
 */
async function handleDeleteReview(args: DeleteReviewToolArgsType) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'handleDeleteReview',
	);
	methodLogger.debug(`Deleting review with options:`, {
		...args,
		api_key: args.api_key ? '[REDACTED]' : undefined,
	});

	try {
		const result = await reviewWebsiteController.deleteReview(
			args.review_id,
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
		methodLogger.error(`Error deleting review`, error);
		return formatErrorForMcpTool(error);
	}
}

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
 * @function register
 * @description Registers the ReviewWebsite tools with the MCP server
 * @param {McpServer} server - The MCP server instance
 */
function register(server: McpServer) {
	const methodLogger = Logger.forContext(
		'tools/reviewwebsite.tool.ts',
		'register',
	);
	methodLogger.debug(`Registering ReviewWebsite tools...`);

	// Register AI models tool
	server.tool(
		'get_ai_models',
		`Get available AI models from ReviewWebsite API.`,
		GetAIModelsToolArgs.shape,
		handleGetAIModels,
	);

	// Register review tools
	server.tool(
		'create_review',
		`Create a new website review using ReviewWebsite API.`,
		CreateReviewToolArgs.shape,
		handleCreateReview,
	);

	server.tool(
		'get_review',
		`Get a specific review by ID from ReviewWebsite API.`,
		GetReviewToolArgs.shape,
		handleGetReview,
	);

	server.tool(
		'list_reviews',
		`Get all reviews with pagination from ReviewWebsite API.`,
		ListReviewsToolArgs.shape,
		handleListReviews,
	);

	server.tool(
		'update_review',
		`Update an existing review using ReviewWebsite API.`,
		UpdateReviewToolArgs.shape,
		handleUpdateReview,
	);

	server.tool(
		'delete_review',
		`Delete a specific review by ID using ReviewWebsite API.`,
		DeleteReviewToolArgs.shape,
		handleDeleteReview,
	);

	// Register convert to markdown tools
	server.tool(
		'convert_to_markdown',
		`Convert a URL to Markdown using AI via ReviewWebsite API.`,
		ConvertToMarkdownToolArgs.shape,
		handleConvertToMarkdown,
	);

	server.tool(
		'convert_multiple_to_markdown',
		`Convert multiple URLs to Markdown using AI via ReviewWebsite API.`,
		ConvertMultipleToMarkdownToolArgs.shape,
		handleConvertMultipleToMarkdown,
	);

	// Register extract data tools
	server.tool(
		'extract_data',
		`Extract structured data from a URL using AI via ReviewWebsite API.`,
		ExtractDataToolArgs.shape,
		handleExtractData,
	);

	server.tool(
		'extract_data_multiple',
		`Extract structured data from multiple URLs using AI via ReviewWebsite API.`,
		ExtractDataMultipleToolArgs.shape,
		handleExtractDataMultiple,
	);

	// Register scrape tools
	server.tool(
		'scrape_url',
		`Scrape a URL using ReviewWebsite API.`,
		ScrapeUrlToolArgs.shape,
		handleScrapeUrl,
	);

	server.tool(
		'extract_links',
		`Extract links from a URL using ReviewWebsite API.`,
		ExtractLinksToolArgs.shape,
		handleExtractLinks,
	);

	// Register summarize tools
	server.tool(
		'summarize_url',
		`Summarize a URL using AI via ReviewWebsite API.`,
		SummarizeUrlToolArgs.shape,
		handleSummarizeUrl,
	);

	server.tool(
		'summarize_website',
		`Summarize a website (multiple pages) using AI via ReviewWebsite API.`,
		SummarizeWebsiteToolArgs.shape,
		handleSummarizeWebsite,
	);

	server.tool(
		'summarize_multiple_urls',
		`Summarize multiple URLs using AI via ReviewWebsite API.`,
		SummarizeMultipleUrlsToolArgs.shape,
		handleSummarizeMultipleUrls,
	);

	methodLogger.debug('Successfully registered ReviewWebsite tools.');
}

export default { register };
