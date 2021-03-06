'use strict';

var github = require('../_common/gitea.js');
var owner = 'coolaj86';
var repo = 'go-pathman';
var baseurl = 'https://git.coolaj86.com';

module.exports = function (request) {
  return github(request, owner, repo, baseurl).then(function (all) {
    all.releases.forEach(function (rel) {
      // TODO name uploads with arch, duh
      if (!rel.arch) {
        rel.arch = 'amd64';
      }
    });
    return all;
  });
};

if (module === require.main) {
  module.exports(require('@root/request')).then(function (all) {
    console.info(JSON.stringify(all, null, 2));
  });
}
