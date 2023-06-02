const pluginPkg = require('../../package.json');

const pluginName = pluginPkg.name;
// eslint-disable-next-line prettier/prettier
const pluginId = pluginName.replace(/^(@[^-,.][\w,-]+\/|strapi-)plugin-/i, '');

module.exports = pluginId;
