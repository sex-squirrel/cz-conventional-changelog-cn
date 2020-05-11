'format cjs';
const fs = require('fs')


const projectPath = process.cwd();

const getCzLogsConfig = (questions) => {
  if (fs.existsSync(`${projectPath}/cz.commitlog.config`)) {
    return require(`${projectPath}/cz.commitlog.config`)(questions) || questions;
  }
  return questions
}

const getCzTypesConfig = (types) => {
  if (fs.existsSync(`${projectPath}/cz.committypes.config.json`)) {
    return require(`${projectPath}/cz.committypes.config.json`)(types) || types;
  }
  return types
}

module.exports = {
  getCzLogsConfig,
  getCzTypesConfig
}
