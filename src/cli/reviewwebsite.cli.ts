import { Command } from 'commander';
import { Logger } from '../utils/logger.util.js';
import reviewWebsiteController from '../controllers/reviewwebsite.controller.js';
import { handleCliError } from '../utils/error.util.js';
import { config } from '../utils/config.util.js';

/**
 * Register ReviewWebsite CLI commands
 * @param program The Commander program instance
 */
function register(program: Command) {
	const cliLogger = Logger.forContext('cli/reviewwebsite.cli.ts', 'register');
	cliLogger.debug(`Registering ReviewWebsite CLI commands...`);

	// Get AI Models Command
	program
		.command('get-ai-models')
		.description('Get available AI models from ReviewWebsite')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'get-ai-models',
			);
			try {
				commandLogger.debug('CLI get-ai-models called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.getAIModels({
					api_key: apiKey,
				});

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Create Review Command
	program
		.command('create-review')
		.description('Create a new website review')
		.requiredOption('--url <url>', 'Website URL to be reviewed')
		.option('--instructions <instructions>', 'Custom review instructions')
		.option(
			'--skip-image-extraction',
			'Skip extracting images from the website',
		)
		.option(
			'--skip-link-extraction',
			'Skip extracting links from the website',
		)
		.option(
			'--max-extracted-images <count>',
			'Maximum number of images to extract',
			parseInt,
		)
		.option(
			'--max-extracted-links <count>',
			'Maximum number of links to extract',
			parseInt,
		)
		.option('--text-model <model>', 'Text model to use for AI analysis')
		.option('--vision-model <model>', 'Vision model to use for AI analysis')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'create-review',
			);
			try {
				commandLogger.debug('CLI create-review called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.createReview(
					options.url,
					options.instructions,
					{
						skipImageExtraction: options.skipImageExtraction,
						skipLinkExtraction: options.skipLinkExtraction,
						maxExtractedImages: options.maxExtractedImages,
						maxExtractedLinks: options.maxExtractedLinks,
						textModel: options.textModel,
						visionModel: options.visionModel,
					},
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Get Review Command
	program
		.command('get-review')
		.description('Get a specific review by ID')
		.requiredOption(
			'--review-id <reviewId>',
			'ID of the review to retrieve',
		)
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'get-review',
			);
			try {
				commandLogger.debug('CLI get-review called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.getReview(
					options.reviewId,
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// List Reviews Command
	program
		.command('list-reviews')
		.description('Get all reviews with pagination')
		.option('--page <page>', 'Page number for pagination', parseInt)
		.option('--limit <limit>', 'Number of reviews per page', parseInt)
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'list-reviews',
			);
			try {
				commandLogger.debug('CLI list-reviews called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.listReviews(
					options.page,
					options.limit,
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Update Review Command
	program
		.command('update-review')
		.description('Update an existing review')
		.requiredOption('--review-id <reviewId>', 'ID of the review to update')
		.option('--url <url>', 'Updated website URL to be reviewed')
		.option(
			'--instructions <instructions>',
			'Updated custom review instructions',
		)
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'update-review',
			);
			try {
				commandLogger.debug('CLI update-review called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.updateReview(
					options.reviewId,
					options.url,
					options.instructions,
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Delete Review Command
	program
		.command('delete-review')
		.description('Delete a specific review by ID')
		.requiredOption('--review-id <reviewId>', 'ID of the review to delete')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'delete-review',
			);
			try {
				commandLogger.debug('CLI delete-review called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.deleteReview(
					options.reviewId,
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Convert to Markdown Command
	program
		.command('convert-to-markdown')
		.description('Convert a URL to Markdown using AI')
		.requiredOption('--url <url>', 'The URL to convert to Markdown')
		.option('--model <model>', 'AI model to use for conversion')
		.option(
			'--delay-after-load <ms>',
			'Optional delay after page load in milliseconds',
			parseInt,
		)
		.option('--debug', 'Enable debug mode for detailed logging')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'convert-to-markdown',
			);
			try {
				commandLogger.debug('CLI convert-to-markdown called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.convertToMarkdown(
					options.url,
					{
						model: options.model,
						delayAfterLoad: options.delayAfterLoad,
						debug: options.debug,
					},
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Scrape URL Command
	program
		.command('scrape-url')
		.description('Scrape a URL')
		.requiredOption('--url <url>', 'The URL to scrape')
		.option(
			'--delay-after-load <ms>',
			'Optional delay after page load in milliseconds',
			parseInt,
		)
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'scrape-url',
			);
			try {
				commandLogger.debug('CLI scrape-url called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.scrapeUrl(
					options.url,
					options.delayAfterLoad,
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Extract Links Command
	program
		.command('extract-links')
		.description('Extract links from a URL')
		.requiredOption('--url <url>', 'The target URL to extract links from')
		.option(
			'--type <type>',
			'Type of links to extract (web, image, file, all)',
		)
		.option(
			'--max-links <count>',
			'Maximum number of links to return',
			parseInt,
		)
		.option(
			'--delay-after-load <ms>',
			'Delay in milliseconds after page load before extracting links',
			parseInt,
		)
		.option(
			'--get-status-code',
			'Whether to get HTTP status codes for each link',
		)
		.option(
			'--auto-scrape-internal-links',
			'Whether to automatically scrape internal links',
		)
		.option('--debug', 'Whether to enable debug mode')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'extract-links',
			);
			try {
				commandLogger.debug('CLI extract-links called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.extractLinks(
					options.url,
					{
						type: options.type as any,
						maxLinks: options.maxLinks,
						delayAfterLoad: options.delayAfterLoad,
						getStatusCode: options.getStatusCode,
						autoScrapeInternalLinks:
							options.autoScrapeInternalLinks,
						debug: options.debug,
					},
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	// Summarize URL Command
	program
		.command('summarize-url')
		.description('Summarize a URL using AI')
		.requiredOption('--url <url>', 'The URL to summarize')
		.option(
			'--instructions <instructions>',
			'Custom instructions for the AI on how to summarize the content',
		)
		.option(
			'--system-prompt <prompt>',
			'Custom system prompt to guide the AI',
		)
		.option('--model <model>', 'AI model to use for summarization')
		.option(
			'--delay-after-load <ms>',
			'Optional delay after page load in milliseconds',
			parseInt,
		)
		.option(
			'--max-length <words>',
			'Maximum length of the summary in words',
			parseInt,
		)
		.option(
			'--format <format>',
			'Format of the summary (bullet or paragraph)',
		)
		.option('--debug', 'Enable debug mode for detailed logging')
		.option('--api-key <apiKey>', 'Your ReviewWebsite API key')
		.action(async (options) => {
			const commandLogger = Logger.forContext(
				'cli/reviewwebsite.cli.ts',
				'summarize-url',
			);
			try {
				commandLogger.debug('CLI summarize-url called', {
					...options,
					api_key: options.apiKey ? '[REDACTED]' : undefined,
				});

				const apiKey =
					options.apiKey || config.get('REVIEWWEBSITE_API_KEY');

				const result = await reviewWebsiteController.summarizeUrl(
					options.url,
					{
						instructions: options.instructions,
						systemPrompt: options.systemPrompt,
						model: options.model,
						delayAfterLoad: options.delayAfterLoad,
						maxLength: options.maxLength,
						format: options.format as any,
						debug: options.debug,
					},
					{
						api_key: apiKey,
					},
				);

				console.log(result.content);
			} catch (error) {
				handleCliError(error);
			}
		});

	cliLogger.debug('ReviewWebsite CLI commands registered successfully');
}

export default { register };
