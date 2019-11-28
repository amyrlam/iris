const domWalk = require('dom-walk');
module.exports = function(tree) {
  domWalk(
    tree.childNodes,
    function (node) {
      switch(node.tagName) {
        case 'meta':
        case 'preview':
        case 'story':
          node.tagName = `${node.tagName.substr(0, 1).toUpperCase()}${node.tagName.substr(1)}`
          break;
      }
    }
  );

}

