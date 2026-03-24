/**
 * Removes @semantic-release/npm plugin from semantic-release config.
 * Used by CI when NPM_TOKEN is invalid/missing to still allow
 * GitHub releases, changelogs, and version bumps to proceed.
 *
 * Note: npmPublish: false is NOT sufficient because the plugin still
 * runs verifyConditions which checks the npm token.
 */
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.release && pkg.release.plugins) {
	const before = pkg.release.plugins.length;
	pkg.release.plugins = pkg.release.plugins.filter((p) => {
		const name = Array.isArray(p) ? p[0] : p;
		return name !== '@semantic-release/npm';
	});
	const removed = before - pkg.release.plugins.length;
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
	console.log(`✅ Removed ${removed} npm plugin(s) from semantic-release config`);
} else {
	console.log('⚠️ No release.plugins found in package.json - skipping');
}
