/**
 * Disables npm publishing in semantic-release config.
 * Used by CI when NPM_TOKEN is invalid/missing to still allow
 * GitHub releases, changelogs, and version bumps to proceed.
 */
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.release && pkg.release.plugins) {
	pkg.release.plugins = pkg.release.plugins.map((p) => {
		if (Array.isArray(p) && p[0] === '@semantic-release/npm') {
			return [p[0], { ...p[1], npmPublish: false }];
		}
		return p;
	});
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
	console.log('✅ Disabled npm publish in semantic-release config');
} else {
	console.log('⚠️ No release.plugins found in package.json - skipping');
}
