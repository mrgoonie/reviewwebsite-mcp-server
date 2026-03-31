## [1.3.2](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.3.1...v1.3.2) (2026-03-31)


### Bug Fixes

* deploy port 8080 ([d78a1bc](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/d78a1bc04d0130848aa127c7ddc12c17aa8325a4))

## [1.3.1](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.3.0...v1.3.1) (2026-03-31)


### Bug Fixes

* correct package naming, smithery config, and MCP error handling ([ac14830](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/ac14830fb6059beb86dd4dac773e84752a330ffe))

# [1.3.0](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.2.0...v1.3.0) (2026-03-24)


### Bug Fixes

* **ci:** fix npm publish override using dedicated script ([5e051bc](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/5e051bc3f2efe37c78fc4f12bdc665310935cdf9))
* **ci:** handle expired NPM_TOKEN gracefully in release workflow ([1bba110](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/1bba11014e7231785fb38374a3158625b927511a))
* **ci:** read .releaserc.json instead of package.json for npm config ([ea1caae](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/ea1caae8b64a0273501a74bd6f9d513e89184fdf))
* **ci:** remove npm plugin entirely when token invalid ([62d2651](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/62d265183e99ba9d66f03059e13462b49e815959))
* **ci:** rename disable-npm-publish to .cjs for CommonJS compat ([1e025b8](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/1e025b81a557fac48e5e2d2d000ae2d4172f75c3))
* **ci:** replace expired PAT with GITHUB_TOKEN in release workflow ([3e7c40a](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/3e7c40a3fb59fbc1963924264ab720cd068e84ce))
* **ci:** restore PAT usage now that token is regenerated ([e0354e4](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/e0354e42553037c9b91499276041264df98d8bf9))
* **ci:** split release step and clear NPM_TOKEN when npm disabled ([4b5014c](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/4b5014c680fc5213a6c96c9522908c243940764f))


### Features

* add html_to_screenshot MCP tool ([799495c](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/799495c94b4ebba115e9e48d469a735a29b54964))
* **deps:** upgrade bcrypt v6, zod v3.25, fix formatting ([51e8837](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/51e8837848917af36584abee55167c9ff58f7f35)), closes [#11](https://github.com/mrgoonie/reviewwebsite-mcp-server/issues/11) [#135](https://github.com/mrgoonie/reviewwebsite-mcp-server/issues/135)
* **tools:** add instructions parameter to markdown conversion ([4be052e](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/4be052e71d56ce3b43d14e443fdbe93762b9bf29))

# [1.2.0](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.1.0...v1.2.0) (2025-05-14)


### Bug Fixes

* **tools:** improve tool's descriptions ([eb588bf](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/eb588bf0fbd7809d52e899d8ee65a30945353d80))


### Features

* **tools:** seo insights ([975ead4](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/975ead420bb3cadba925f4a8a024849c31da0d33))

# [1.1.0](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.0.1...v1.1.0) (2025-05-11)


### Features

* **url:** get final url, check url alive ([7c2d77c](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/7c2d77cdc58aef0762c68c7353103befaaee732a))

## [1.0.1](https://github.com/mrgoonie/reviewwebsite-mcp-server/compare/v1.0.0...v1.0.1) (2025-05-07)


### Bug Fixes

* **tools:** remove unnecesary tools ([adb5c85](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/adb5c85a21702b2356fb34d7969e6db91b445cba))

# 1.0.0 (2025-05-06)


### Bug Fixes

* **docs:** first release ([76af9ca](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/76af9cafc6af7c67b888f300f173a260dafa2fe0))
* **release:** package lock ([446114a](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/446114ad5faec4dd68fd800aca1e986307b73602))
* **storage:** make config optional ([6e578d0](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/6e578d0ec48b95e30a4ff12ebb6663b4523bd2a5))


### Features

* **initial:** reviewweb.site api implementation ([2cb79b0](https://github.com/mrgoonie/reviewwebsite-mcp-server/commit/2cb79b01417ec0558262f108ed804208474d9fb3))
