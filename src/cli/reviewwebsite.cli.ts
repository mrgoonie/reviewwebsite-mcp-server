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
