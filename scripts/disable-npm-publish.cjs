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
console.log('Reading:', pkgPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.release && pkg.release.plugins) {
	const before = pkg.release.plugins.length;
	console.log('Plugins before:', pkg.release.plugins.map(p => Array.isArray(p) ? p[0] : p));
	pkg.release.plugins = pkg.release.plugins.filter((p) => {
		const name = Array.isArray(p) ? p[0] : p;
		return name !== '@semantic-release/npm';
	});
	const removed = before - pkg.release.plugins.length;
	console.log('Plugins after:', pkg.release.plugins.map(p => Array.isArray(p) ? p[0] : p));
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
	console.log(`✅ Removed ${removed} npm plugin(s) from semantic-release config`);

	// Verify write
	const verify = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
	const hasNpm = verify.release.plugins.some(p => (Array.isArray(p) ? p[0] : p) === '@semantic-release/npm');
	console.log('Verification - npm plugin still present:', hasNpm);
} else {
	console.log('⚠️ No release.plugins found in package.json - skipping');
	console.log('pkg.release:', JSON.stringify(pkg.release));
}
