module.exports = [
  {
    method: 'GET',
    path: '/config',
    handler: 'configController.getConfig',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
];
