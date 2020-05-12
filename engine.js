'format cjs';

const wrap = require('word-wrap');
const questions = require('./question');
const getCzLogsConfig = require('./get-custom-config').getCzLogsConfig;

const filter = function(array) {
  return array.filter(function(x) {
    return x;
  });
};

module.exports = function(options) {
  return {
    prompter: function(cz, commit) {

      cz.prompt(getCzLogsConfig(questions(options))).then(function(answers) {
        const wrapOptions = {
          trim: true,
          cut: false,
          newline: '\n',
          indent: '',
          width: options.maxLineWidth
        };

        // parentheses are only needed when a scope is present
        const scope = answers.scope ? '(' + answers.scope + ')' : '';

        // Hard limit this line in the validate
        const head = answers.type + scope + ': ' + answers.subject;

        // Wrap these lines at options.maxLineWidth characters
        const body = answers.body ? wrap(answers.body, wrapOptions) : false;

        // Apply breaking change prefix, removing it if already present
        let breaking = answers.breaking ? answers.breaking.trim() : '';
        breaking = breaking
          ? '不兼容(重大)更新: ' + breaking.replace(/^不兼容\(重大\)更新: /, '')
          : '';
        breaking = breaking ? wrap(breaking, wrapOptions) : false;

        const issues = answers.issues ? wrap(answers.issues, wrapOptions) : false;

        commit(filter([head, body, breaking, issues]).join('\n\n'));
      });
    }
  };
};
