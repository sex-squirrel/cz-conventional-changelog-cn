# cz-conventional-changelog 汉化

<!-- Status:
[![npm version](https://img.shields.io/npm/v/cz-conventional-changelog.svg?style=flat-square)](https://www.npmjs.org/package/cz-conventional-changelog)
[![npm downloads](https://img.shields.io/npm/dm/cz-conventional-changelog.svg?style=flat-square)](http://npm-stat.com/charts.html?package=cz-conventional-changelog&from=2015-08-01)
[![Build Status](https://img.shields.io/travis/commitizen/cz-conventional-changelog.svg?style=flat-square)](https://travis-ci.org/commitizen/cz-conventional-changelog) -->

`cz-conventional-changelog` 的汉化版本

## 配置 (Configuration)

### package.json

通过 package.json 添加 `config.commitizen` 使用

```json5
{
// ...  default values
    "config": {
        "commitizen": {
            "path": "./node_modules/cz-conventional-changelog-cn",
            "maxHeaderWidth": 100,
            "maxLineWidth": 100,
            "defaultType": "",
            "defaultScope": "",
            "defaultSubject": "",
            "defaultBody": "",
            "defaultIssues": "",
            "types": {
              ...
              "feat": {
                "description": "A new feature",
                "title": "Features"
              },
              ...
            }
        }
    }
// ...
}
```
### 环境变量 (Environment variables)

下面的变量都可以用默认配置或者package.json的`config.commitizen`配置覆盖

* CZ_TYPE = defaultType
* CZ_SCOPE = defaultScope
* CZ_SUBJECT = defaultSubject
* CZ_BODY = defaultBody
* CZ_MAX_HEADER_WIDTH = maxHeaderWidth
* CZ_MAX_LINE_WIDTH = maxLineWidth

### Commitlint

如果使用了[commitlint](https://github.com/conventional-changelog/commitlint), "maxHeaderWidth"配置属性将默认为"header-max-length"的值, 而不是100. 可以通过设置配置的'maxHeaderWidth'字段或者环境变量CZ_MAX_HEADER_WIDTH重置.

### 自定义配置(可重写默认配置)

在项目的根目录提供`cz.commitlog.config.js`可以修改或重写提交流程
```js
module.exports = function(questions) {
  // ...
  return questions;
}
```
具体的规则参考[Inquirer](https://github.com/SBoudrias/Inquirer.js#readme)


根目录下提供`cz.committypes.config.js`可以修改或者重写提交类型的模板

```js
module.exports = function(types) {
  // ...
  return types;
}
```
格式如下
```json5
{
  "key": {
    "description": "这是描述",
    "name": "这是name"
  }
}
```
