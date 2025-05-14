/**
 * @file reviewwebsite.controller.ts
 * @description Controller for the ReviewWebsite API operations
 */

import reviewWebsiteService from '../services/vendor.reviewwebsite.service.js';
import { Logger } from '../utils/logger.util.js';
import { ControllerResponse } from '../types/common.types.js';
import { handleControllerError } from '../utils/error-handler.util.js';
import { config } from '../utils/config.util.js';
import {
	ConvertToMarkdownOptions,
	ExtractDataOptions,
	ExtractLinksOptions,
	SummarizeOptions,
	ReviewWebsiteOptions,
	UrlIsAliveOptions,
	SeoKeywordIdeasOptions,
	SeoKeywordDifficultyOptions,
	SeoTrafficOptions,
} from '../tools/reviewwebsite.types.js';

/**
 * @namespace ReviewWebsiteController
 * @description Controller responsible for handling ReviewWebsite API operations.
 *              It orchestrates calls to the ReviewWebsite service, applies defaults,
 *              maps options, and formats the response.
 */

/**
 * Get API key from options or config
 * @param options Options that may contain API key
 * @returns API key
 */
function getApiKey(options?: ReviewWebsiteOptions): string {
	const apiKey = options?.api_key || config.get('REVIEWWEBSITE_API_KEY');
	if (!apiKey) {
		throw new Error('API key is required for ReviewWebsite API');
	}
	return apiKey;
}

/**
 * @function convertToMarkdown
 * @description Convert a URL to Markdown using AI
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to convert
 * @param {ConvertToMarkdownOptions} convertOptions - Conversion options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function convertToMarkdown(
	url: string,
	convertOptions?: ConvertToMarkdownOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'convertToMarkdown',
	);

	methodLogger.debug('Converting URL to Markdown', { url, convertOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.convertToMarkdown(
			url,
			convertOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Markdown',
			operation: 'converting',
			source: 'controllers/reviewwebsite.controller.ts@convertToMarkdown',
			additionalInfo: { url },
		});
	}
}

/**
 * @function convertMultipleToMarkdown
 * @description Convert multiple URLs to Markdown using AI
 * @memberof ReviewWebsiteController
 * @param {string[]} urls - URLs to convert
 * @param {ConvertToMarkdownOptions} convertOptions - Conversion options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function convertMultipleToMarkdown(
	urls: string[],
	convertOptions?: ConvertToMarkdownOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'convertMultipleToMarkdown',
	);

	methodLogger.debug('Converting multiple URLs to Markdown', {
		urls,
		convertOptions,
	});

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.convertMultipleToMarkdown(
			urls,
			convertOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Markdown',
			operation: 'converting multiple',
			source: 'controllers/reviewwebsite.controller.ts@convertMultipleToMarkdown',
			additionalInfo: { urlCount: urls.length },
		});
	}
}

/**
 * @function extractData
 * @description Extract structured data from a URL using AI
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to extract data from
 * @param {ExtractDataOptions} extractOptions - Extraction options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function extractData(
	url: string,
	extractOptions: ExtractDataOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'extractData',
	);

	methodLogger.debug('Extracting data from URL', { url, extractOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.extractData(
			url,
			extractOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Data',
			operation: 'extracting',
			source: 'controllers/reviewwebsite.controller.ts@extractData',
			additionalInfo: { url },
		});
	}
}

/**
 * @function extractDataMultiple
 * @description Extract structured data from multiple URLs using AI
 * @memberof ReviewWebsiteController
 * @param {string[]} urls - URLs to extract data from
 * @param {ExtractDataOptions} extractOptions - Extraction options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function extractDataMultiple(
	urls: string[],
	extractOptions: ExtractDataOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'extractDataMultiple',
	);

	methodLogger.debug('Extracting data from multiple URLs', {
		urls,
		extractOptions,
	});

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.extractDataMultiple(
			urls,
			extractOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Data',
			operation: 'extracting multiple',
			source: 'controllers/reviewwebsite.controller.ts@extractDataMultiple',
			additionalInfo: { urlCount: urls.length },
		});
	}
}

/**
 * @function scrapeUrl
 * @description Scrape a URL
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to scrape
 * @param {number} delayAfterLoad - Delay after page load in milliseconds
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function scrapeUrl(
	url: string,
	delayAfterLoad?: number,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'scrapeUrl',
	);

	methodLogger.debug('Scraping URL', { url, delayAfterLoad });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.scrapeUrl(
			url,
			delayAfterLoad,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'URL',
			operation: 'scraping',
			source: 'controllers/reviewwebsite.controller.ts@scrapeUrl',
			additionalInfo: { url },
		});
	}
}

/**
 * @function extractLinks
 * @description Extract links from a URL
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to extract links from
 * @param {ExtractLinksOptions} extractOptions - Link extraction options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function extractLinks(
	url: string,
	extractOptions?: ExtractLinksOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'extractLinks',
	);

	methodLogger.debug('Extracting links from URL', { url, extractOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.extractLinks(
			url,
			extractOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Links',
			operation: 'extracting',
			source: 'controllers/reviewwebsite.controller.ts@extractLinks',
			additionalInfo: { url },
		});
	}
}

/**
 * @function summarizeUrl
 * @description Summarize a URL using AI
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to summarize
 * @param {SummarizeOptions} summarizeOptions - Summarization options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function summarizeUrl(
	url: string,
	summarizeOptions?: SummarizeOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'summarizeUrl',
	);

	methodLogger.debug('Summarizing URL', { url, summarizeOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.summarizeUrl(
			url,
			summarizeOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Summary',
			operation: 'creating',
			source: 'controllers/reviewwebsite.controller.ts@summarizeUrl',
			additionalInfo: { url },
		});
	}
}

/**
 * @function summarizeWebsite
 * @description Summarize a website (multiple pages) using AI
 * @memberof ReviewWebsiteController
 * @param {string} url - Main URL of the website to summarize
 * @param {SummarizeOptions} summarizeOptions - Summarization options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function summarizeWebsite(
	url: string,
	summarizeOptions?: SummarizeOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'summarizeWebsite',
	);

	methodLogger.debug('Summarizing website', { url, summarizeOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.summarizeWebsite(
			url,
			summarizeOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Website Summary',
			operation: 'creating',
			source: 'controllers/reviewwebsite.controller.ts@summarizeWebsite',
			additionalInfo: { url },
		});
	}
}

/**
 * @function summarizeMultipleUrls
 * @description Summarize multiple URLs using AI
 * @memberof ReviewWebsiteController
 * @param {string[]} urls - URLs to summarize
 * @param {SummarizeOptions} summarizeOptions - Summarization options
 * @param {ReviewWebsiteOptions} options - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function summarizeMultipleUrls(
	urls: string[],
	summarizeOptions?: SummarizeOptions,
	options: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'summarizeMultipleUrls',
	);

	methodLogger.debug('Summarizing multiple URLs', { urls, summarizeOptions });

	try {
		const apiKey = getApiKey(options);
		const result = await reviewWebsiteService.summarizeMultipleUrls(
			urls,
			summarizeOptions,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Summaries',
			operation: 'creating',
			source: 'controllers/reviewwebsite.controller.ts@summarizeMultipleUrls',
			additionalInfo: { urlCount: urls.length },
		});
	}
}

/**
 * @function isUrlAlive
 * @description Check if a URL is alive
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to check
 * @param {UrlIsAliveOptions} options - Options for checking URL
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function isUrlAlive(
	url: string,
	options?: UrlIsAliveOptions,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'isUrlAlive',
	);

	methodLogger.debug('Checking if URL is alive', { url, options });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.isUrlAlive(
			url,
			options,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'URL',
			operation: 'checking alive status',
			source: 'controllers/reviewwebsite.controller.ts@isUrlAlive',
			additionalInfo: { url },
		});
	}
}

/**
 * @function getUrlAfterRedirects
 * @description Get URL after redirects
 * @memberof ReviewWebsiteController
 * @param {string} url - URL to get after redirects
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function getUrlAfterRedirects(
	url: string,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'getUrlAfterRedirects',
	);

	methodLogger.debug('Getting URL after redirects', { url });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.getUrlAfterRedirects(
			url,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'URL',
			operation: 'getting URL after redirects',
			source: 'controllers/reviewwebsite.controller.ts@getUrlAfterRedirects',
			additionalInfo: { url },
		});
	}
}

/**
 * @function getKeywordIdeas
 * @description Get keyword ideas for a keyword
 * @memberof ReviewWebsiteController
 * @param {string} keyword - Keyword to get ideas for
 * @param {SeoKeywordIdeasOptions} options - Options for keyword ideas
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function getKeywordIdeas(
	keyword: string,
	options?: SeoKeywordIdeasOptions,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'getKeywordIdeas',
	);

	methodLogger.debug('Getting keyword ideas', { keyword, options });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.getKeywordIdeas(
			keyword,
			options,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Keyword Ideas',
			operation: 'retrieving',
			source: 'controllers/reviewwebsite.controller.ts@getKeywordIdeas',
			additionalInfo: { keyword },
		});
	}
}

/**
 * @function getKeywordDifficulty
 * @description Get keyword difficulty for a keyword
 * @memberof ReviewWebsiteController
 * @param {string} keyword - Keyword to check difficulty for
 * @param {SeoKeywordDifficultyOptions} options - Options for keyword difficulty
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function getKeywordDifficulty(
	keyword: string,
	options?: SeoKeywordDifficultyOptions,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'getKeywordDifficulty',
	);

	methodLogger.debug('Getting keyword difficulty', { keyword, options });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.getKeywordDifficulty(
			keyword,
			options,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Keyword Difficulty',
			operation: 'retrieving',
			source: 'controllers/reviewwebsite.controller.ts@getKeywordDifficulty',
			additionalInfo: { keyword },
		});
	}
}

/**
 * @function getTraffic
 * @description Check traffic for a domain or URL
 * @memberof ReviewWebsiteController
 * @param {string} domainOrUrl - Domain or URL to check traffic for
 * @param {SeoTrafficOptions} options - Options for traffic check
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function getTraffic(
	domainOrUrl: string,
	options?: SeoTrafficOptions,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'getTraffic',
	);

	methodLogger.debug('Checking traffic', { domainOrUrl, options });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.getTraffic(
			domainOrUrl,
			options,
			apiKey,
		);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Traffic Data',
			operation: 'retrieving',
			source: 'controllers/reviewwebsite.controller.ts@getTraffic',
			additionalInfo: { domainOrUrl },
		});
	}
}

/**
 * @function getBacklinks
 * @description Get backlinks for a domain
 * @memberof ReviewWebsiteController
 * @param {string} domain - Domain to get backlinks for
 * @param {ReviewWebsiteOptions} apiOptions - Options including API key
 * @returns {Promise<ControllerResponse>} A promise that resolves to the standard controller response
 * @throws {McpError} Throws an McpError if the service call fails or returns an error
 */
async function getBacklinks(
	domain: string,
	apiOptions: ReviewWebsiteOptions = {},
): Promise<ControllerResponse> {
	const methodLogger = Logger.forContext(
		'controllers/reviewwebsite.controller.ts',
		'getBacklinks',
	);

	methodLogger.debug('Getting backlinks for domain', { domain });

	try {
		const apiKey = getApiKey(apiOptions);
		const result = await reviewWebsiteService.getBacklinks(domain, apiKey);

		return {
			content: JSON.stringify(result, null, 2),
		};
	} catch (error) {
		return handleControllerError(error, {
			entityType: 'Backlinks Data',
			operation: 'retrieving',
			source: 'controllers/reviewwebsite.controller.ts@getBacklinks',
			additionalInfo: { domain },
		});
	}
}

export default {
	convertToMarkdown,
	convertMultipleToMarkdown,
	extractData,
	extractDataMultiple,
	scrapeUrl,
	extractLinks,
	summarizeUrl,
	summarizeWebsite,
	summarizeMultipleUrls,
	isUrlAlive,
	getUrlAfterRedirects,
	getKeywordIdeas,
	getKeywordDifficulty,
	getTraffic,
	getBacklinks,
};
