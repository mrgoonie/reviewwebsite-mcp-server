/**
 * @file vendor.reviewwebsite.service.ts
 * @description Service for interacting with the ReviewWebsite API
 */

import axios from 'axios';
import { Logger } from '../utils/logger.util.js';
import { McpError, ErrorType } from '../utils/error.util.js';
import {
	ReviewOptions,
	ConvertToMarkdownOptions,
	ExtractDataOptions,
	ExtractLinksOptions,
	SummarizeOptions,
} from '../tools/reviewwebsite.types.js';

const BASE_URL = 'https://reviewweb.site';
const API_BASE = `${BASE_URL}/api/v1`;

/**
 * @namespace ReviewWebsiteService
 * @description Service responsible for making requests to the ReviewWebsite API
 */

/**
 * @function getAIModels
 * @description Get available AI models from ReviewWebsite API
 * @memberof ReviewWebsiteService
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function getAIModels(apiKey: string): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'getAIModels',
	);

	try {
		methodLogger.debug('Getting AI models');

		const response = await axios.get(`${API_BASE}/ai/models`, {
			headers: getHeaders(apiKey),
		});

		methodLogger.debug('Successfully received AI models');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'getAIModels');
	}
}

/**
 * @function createReview
 * @description Create a new website review
 * @memberof ReviewWebsiteService
 * @param {string} url - Website URL to review
 * @param {string} instructions - Custom review instructions
 * @param {ReviewOptions} options - Review options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function createReview(
	url: string,
	instructions?: string,
	options?: ReviewOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'createReview',
	);

	try {
		methodLogger.debug('Creating review', { url, instructions });

		const response = await axios.post(
			`${API_BASE}/review`,
			{
				url,
				instructions,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully created review');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'createReview');
	}
}

/**
 * @function getReview
 * @description Get a specific review by ID
 * @memberof ReviewWebsiteService
 * @param {string} reviewId - ID of the review to retrieve
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function getReview(reviewId: string, apiKey?: string): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'getReview',
	);

	try {
		methodLogger.debug('Getting review', { reviewId });

		const response = await axios.get(`${API_BASE}/review/${reviewId}`, {
			headers: getHeaders(apiKey),
		});

		methodLogger.debug('Successfully retrieved review');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'getReview');
	}
}

/**
 * @function listReviews
 * @description Get all reviews with pagination
 * @memberof ReviewWebsiteService
 * @param {number} page - Page number
 * @param {number} limit - Number of reviews per page
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function listReviews(
	page?: number,
	limit?: number,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'listReviews',
	);

	try {
		methodLogger.debug('Listing reviews', { page, limit });

		const params = new URLSearchParams();
		if (page) params.append('page', page.toString());
		if (limit) params.append('limit', limit.toString());

		const response = await axios.get(`${API_BASE}/review`, {
			params,
			headers: getHeaders(apiKey),
		});

		methodLogger.debug('Successfully retrieved reviews');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'listReviews');
	}
}

/**
 * @function updateReview
 * @description Update an existing review
 * @memberof ReviewWebsiteService
 * @param {string} reviewId - ID of the review to update
 * @param {string} url - Updated website URL
 * @param {string} instructions - Updated review instructions
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function updateReview(
	reviewId: string,
	url?: string,
	instructions?: string,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'updateReview',
	);

	try {
		methodLogger.debug('Updating review', { reviewId, url, instructions });

		const response = await axios.patch(
			`${API_BASE}/review/${reviewId}`,
			{
				url,
				instructions,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully updated review');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'updateReview');
	}
}

/**
 * @function deleteReview
 * @description Delete a specific review by ID
 * @memberof ReviewWebsiteService
 * @param {string} reviewId - ID of the review to delete
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function deleteReview(reviewId: string, apiKey?: string): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'deleteReview',
	);

	try {
		methodLogger.debug('Deleting review', { reviewId });

		const response = await axios.delete(`${API_BASE}/review/${reviewId}`, {
			headers: getHeaders(apiKey),
		});

		methodLogger.debug('Successfully deleted review');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'deleteReview');
	}
}

/**
 * @function convertToMarkdown
 * @description Convert a URL to Markdown using AI
 * @memberof ReviewWebsiteService
 * @param {string} url - URL to convert
 * @param {ConvertToMarkdownOptions} options - Conversion options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function convertToMarkdown(
	url: string,
	options?: ConvertToMarkdownOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'convertToMarkdown',
	);

	try {
		methodLogger.debug('Converting URL to Markdown', { url, options });

		const response = await axios.post(
			`${API_BASE}/convert/markdown`,
			{
				url,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully converted URL to Markdown');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'convertToMarkdown');
	}
}

/**
 * @function convertMultipleToMarkdown
 * @description Convert multiple URLs to Markdown using AI
 * @memberof ReviewWebsiteService
 * @param {string[]} urls - URLs to convert
 * @param {ConvertToMarkdownOptions} options - Conversion options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function convertMultipleToMarkdown(
	urls: string[],
	options?: ConvertToMarkdownOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'convertMultipleToMarkdown',
	);

	try {
		methodLogger.debug('Converting multiple URLs to Markdown', {
			urls,
			options,
		});

		const response = await axios.post(
			`${API_BASE}/convert/markdown/urls`,
			{
				urls,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully converted multiple URLs to Markdown');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'convertMultipleToMarkdown');
	}
}

/**
 * @function extractData
 * @description Extract structured data from a URL using AI
 * @memberof ReviewWebsiteService
 * @param {string} url - URL to extract data from
 * @param {ExtractDataOptions} options - Extraction options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function extractData(
	url: string,
	options: ExtractDataOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'extractData',
	);

	try {
		methodLogger.debug('Extracting data from URL', { url, options });

		const response = await axios.post(
			`${API_BASE}/extract`,
			{
				url,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully extracted data from URL');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'extractData');
	}
}

/**
 * @function extractDataMultiple
 * @description Extract structured data from multiple URLs using AI
 * @memberof ReviewWebsiteService
 * @param {string[]} urls - URLs to extract data from
 * @param {ExtractDataOptions} options - Extraction options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function extractDataMultiple(
	urls: string[],
	options: ExtractDataOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'extractDataMultiple',
	);

	try {
		methodLogger.debug('Extracting data from multiple URLs', {
			urls,
			options,
		});

		const response = await axios.post(
			`${API_BASE}/extract/urls`,
			{
				urls,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully extracted data from multiple URLs');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'extractDataMultiple');
	}
}

/**
 * @function scrapeUrl
 * @description Scrape a URL
 * @memberof ReviewWebsiteService
 * @param {string} url - URL to scrape
 * @param {number} delayAfterLoad - Delay after page load in milliseconds
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function scrapeUrl(
	url: string,
	delayAfterLoad?: number,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'scrapeUrl',
	);

	try {
		methodLogger.debug('Scraping URL', { url, delayAfterLoad });

		const params = new URLSearchParams();
		params.append('url', url);

		const response = await axios.post(
			`${API_BASE}/scrape`,
			{
				options: {
					delayAfterLoad,
				},
			},
			{
				params,
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully scraped URL');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'scrapeUrl');
	}
}

/**
 * @function extractLinks
 * @description Extract links from a URL
 * @memberof ReviewWebsiteService
 * @param {string} url - URL to extract links from
 * @param {ExtractLinksOptions} options - Link extraction options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function extractLinks(
	url: string,
	options?: ExtractLinksOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'extractLinks',
	);

	try {
		methodLogger.debug('Extracting links from URL', { url, options });

		const params = new URLSearchParams();
		params.append('url', url);

		const response = await axios.post(
			`${API_BASE}/scrape/links-map`,
			options,
			{
				params,
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully extracted links from URL');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'extractLinks');
	}
}

/**
 * @function summarizeUrl
 * @description Summarize a URL using AI
 * @memberof ReviewWebsiteService
 * @param {string} url - URL to summarize
 * @param {SummarizeOptions} options - Summarization options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function summarizeUrl(
	url: string,
	options?: SummarizeOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'summarizeUrl',
	);

	try {
		methodLogger.debug('Summarizing URL', { url, options });

		const response = await axios.post(
			`${API_BASE}/summarize/url`,
			{
				url,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully summarized URL');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'summarizeUrl');
	}
}

/**
 * @function summarizeWebsite
 * @description Summarize a website (multiple pages) using AI
 * @memberof ReviewWebsiteService
 * @param {string} url - Main URL of the website to summarize
 * @param {SummarizeOptions} options - Summarization options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function summarizeWebsite(
	url: string,
	options?: SummarizeOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'summarizeWebsite',
	);

	try {
		methodLogger.debug('Summarizing website', { url, options });

		const response = await axios.post(
			`${API_BASE}/summarize/website`,
			{
				url,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully summarized website');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'summarizeWebsite');
	}
}

/**
 * @function summarizeMultipleUrls
 * @description Summarize multiple URLs using AI
 * @memberof ReviewWebsiteService
 * @param {string[]} urls - URLs to summarize
 * @param {SummarizeOptions} options - Summarization options
 * @param {string} apiKey - ReviewWebsite API key
 * @returns {Promise<any>} Response from the ReviewWebsite API
 * @throws {McpError} If the API request fails
 */
async function summarizeMultipleUrls(
	urls: string[],
	options?: SummarizeOptions,
	apiKey?: string,
): Promise<any> {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		'summarizeMultipleUrls',
	);

	try {
		methodLogger.debug('Summarizing multiple URLs', { urls, options });

		const response = await axios.post(
			`${API_BASE}/summarize/urls`,
			{
				urls,
				options,
			},
			{
				headers: getHeaders(apiKey),
			},
		);

		methodLogger.debug('Successfully summarized multiple URLs');
		return response.data;
	} catch (error) {
		return handleApiError(error, 'summarizeMultipleUrls');
	}
}

/**
 * Helper function to get headers with API key
 * @param apiKey ReviewWebsite API key
 * @returns Headers object
 */
function getHeaders(apiKey?: string) {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (apiKey) {
		headers['X-API-Key'] = apiKey;
	}

	return headers;
}

/**
 * Helper function to handle API errors
 * @param error Error from axios
 * @param method Method name for logging
 * @throws {McpError} Standardized error
 */
function handleApiError(error: any, method: string): never {
	const methodLogger = Logger.forContext(
		'services/vendor.reviewwebsite.service.ts',
		method,
	);
	methodLogger.error('API error:', error);

	// Handle API error responses
	if (axios.isAxiosError(error) && error.response) {
		const { status, data } = error.response;

		// Try to parse error message from API response
		let errorMessage = 'Unknown error from ReviewWebsite API';
		let errorCode = 'reviewwebsite_api_error';

		// Log the full error response for debugging
		methodLogger.error('ReviewWebsite API error response:', {
			status,
			requestUrl: error.config?.url,
			requestParams: error.config?.params,
		});

		if (data && typeof data === 'object') {
			if (data.message) {
				errorMessage = data.message;
			}
			if (data.error) {
				errorCode = data.error;
			}
		}

		throw new McpError(errorMessage, ErrorType.API_ERROR, status, {
			errorCode,
			source: `services/vendor.reviewwebsite.service.ts@${method}`,
		});
	}

	// Handle other errors
	throw new McpError(
		'Failed to communicate with ReviewWebsite API',
		ErrorType.UNEXPECTED_ERROR,
		500,
		{
			errorCode: 'reviewwebsite_service_error',
			source: `services/vendor.reviewwebsite.service.ts@${method}`,
			cause: error,
		},
	);
}

export default {
	getAIModels,
	createReview,
	getReview,
	listReviews,
	updateReview,
	deleteReview,
	convertToMarkdown,
	convertMultipleToMarkdown,
	extractData,
	extractDataMultiple,
	scrapeUrl,
	extractLinks,
	summarizeUrl,
	summarizeWebsite,
	summarizeMultipleUrls,
};
