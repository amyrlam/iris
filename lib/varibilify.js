module.exports = function() {
  return function (root) {
    root.walkRules(function (rule) {
      if (rule.selector === ':root') {
        rule.walkDecls(function (declaration) {
          if (declaration.prop.match(/^\-\-/)) {
            root.append(
              `${declaration.prop.replace(/^\-\-/, '$')}: ${declaration.value.replace(/^var\(--(.*)\)/, '$$$1')}`
            );
          }
        });
        rule.remove();
      }
      rule.walkDecls(function (declaration) {
        declaration.value = declaration.value.replace(/^var\(--(.*)\)/, '$$$1');
        return declaration;
      });
    });
    root.walkDecls(function (declaration) {
      if (declaration.raws.before.trim().length === 0) {
        declaration.raws.before = '\n';
      }
      declaration.parent.raws.semicolon = true;
    });
  }
  return root;
};

