'format cjs';
const fs = require('fs')


const projectPath = process.cwd();

const getCzLogsConfig = (questions) => {
  if (fs.existsSync(`${projectPath}/cz.commitlog.config.js`)) {
    return require(`${projectPath}/cz.commitlog.config`)(questions) || questions;
  }
  return questions
}

const getCzTypesConfig = (types) => {
  if (fs.existsSync(`${projectPath}/cz.committypes.config.js`)) {
    return require(`${projectPath}/cz.committypes.config`)(types) || types;
  }
  return types
}

module.exports = {
  getCzLogsConfig,
  getCzTypesConfig
}
