'format cjs';

const chalk = require('chalk');
const map = require('lodash.map');
const longest = require('longest');

const headerLength = function(answers) {
  return (
    answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
  );
};

const maxSummaryLength = function(options, answers) {
  return options.maxHeaderWidth - headerLength(answers);
};

const filterSubject = function(subject) {
  subject = subject.trim();
  if (subject.charAt(0).toLowerCase() !== subject.charAt(0)) {
    subject =
      subject.charAt(0).toLowerCase() + subject.slice(1, subject.length);
  }
  while (subject.endsWith('.')) {
    subject = subject.slice(0, subject.length - 1);
  }
  return subject;
};

const choices = function(types) {
  const length = longest(Object.keys(types)).length + 1;
  return map(types, function(type, key) {
    return {
      name: (key + ':').padEnd(length) + ' ' + type.description,
      value: key
    };
  });
}



module.exports = function (options) {
  return [
    {
      type: 'list',
      name: 'type',
      message: "选择本次提交更改的类型:",
      choices: choices(options.types),
      default: options.defaultType
    },
    {
      type: 'input',
      name: 'scope',
      message:
        '改动的范围 (例如模块或者文件的路径名称: xxx/xxx|xxx, 如果一次commit修改多个模块，建议拆分成多次commit): (按 enter 键跳过)',
      default: options.defaultScope,
      filter: function(value) {
        return options.disableScopeLowerCase
          ? value.trim()
          : value.trim().toLowerCase();
      }
    },
    {
      type: 'input',
      name: 'subject',
      message: function(answers) {
        return (
          '写一个简明扼要的改动描述 (最多' +
          maxSummaryLength(options, answers) +
          '个字符):\n'
        );
      },
      default: options.defaultSubject,
      validate: function(subject, answers) {
        var filteredSubject = filterSubject(subject);
        return filteredSubject.length == 0
          ? '必须选项'
          : filteredSubject.length <= maxSummaryLength(options, answers)
          ? true
          : '描述必须小于等于' +
            maxSummaryLength(options, answers) +
            '个字符. 当前字符数为' +
            filteredSubject.length +
            '个.';
      },
      transformer: function(subject, answers) {
        var filteredSubject = filterSubject(subject);
        var color =
          filteredSubject.length <= maxSummaryLength(options, answers)
            ? chalk.green
            : chalk.red;
        return color('(' + filteredSubject.length + ') ' + subject);
      },
      filter: function(subject) {
        return filterSubject(subject);
      }
    },
    {
      type: 'input',
      name: 'body',
      message:
        '写一个详细的改动介绍: (按 enter 键跳过)\n',
      default: options.defaultBody
    },
    {
      type: 'confirm',
      name: 'isBreaking',
      message: '是否包含不兼容性(具有破坏性)的更新?',
      default: false
    },
    {
      type: 'input',
      name: 'breakingBody',
      default: '-',
      message:
        '不兼容(破坏性)更新提交的主体, 请输入本次提交的详细说明(主要描述改动之前的情况及修改动机):\n',
      when: function(answers) {
        return answers.isBreaking && !answers.body;
      },
      validate: function(breakingBody, answers) {
        return (
          breakingBody.trim().length > 0 ||
          '已选择存在不兼容(破坏性)更新, 必须填写'
        );
      }
    },
    {
      type: 'input',
      name: 'breaking',
      message: '描述不兼容更新:\n',
      when: function(answers) {
        return answers.isBreaking;
      }
    },

    {
      type: 'confirm',
      name: 'isIssueAffected',
      message: '本次改动是否有关联问题?',
      default: options.defaultIssues ? true : false
    },
    {
      type: 'input',
      name: 'issuesBody',
      default: '-',
      message:
        '如果关联问题已关闭, 本次提交需要一个提交主体. 请提供详细说明:\n',
      when: function(answers) {
        return (
          answers.isIssueAffected && !answers.body && !answers.breakingBody
        );
      }
    },
    {
      type: 'input',
      name: 'issues',
      message: '添加关联问题的编号 (例如 "fix #123", "re #123"):\n',
      when: function(answers) {
        return answers.isIssueAffected;
      },
      default: options.defaultIssues ? options.defaultIssues : undefined
    }
  ]
}
