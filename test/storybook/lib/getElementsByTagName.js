const domWalk = require('dom-walk');
module.exports = function(tree, tagName) {
  tagName = tagName.toLowerCase();
  const els = [];
  domWalk(
    tree.childNodes,
    function (node) {
      if (node.tagName && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
        els.push(node);
      }
    }
  );
  return els;
}

