/**
 * Removes @semantic-release/npm plugin from .releaserc.json config.
 * Used by CI when NPM_TOKEN is invalid/missing to still allow
 * GitHub releases, changelogs, and version bumps to proceed.
 *
 * Note: npmPublish: false is NOT sufficient because the plugin still
 * runs verifyConditions which checks the npm token.
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', '.releaserc.json');
console.log('Reading:', configPath);

if (!fs.existsSync(configPath)) {
	console.log('⚠️ .releaserc.json not found - skipping');
	process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

if (config.plugins) {
	const before = config.plugins.length;
	config.plugins = config.plugins.filter((p) => {
		const name = Array.isArray(p) ? p[0] : p;
		return name !== '@semantic-release/npm';
	});
	const removed = before - config.plugins.length;
	fs.writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');
	console.log(`✅ Removed ${removed} npm plugin(s) from .releaserc.json`);
} else {
	console.log('⚠️ No plugins array found in .releaserc.json');
}
