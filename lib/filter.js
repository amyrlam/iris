const promisify = require('util').promisify;
const read = promisify(require('fs').readFile);
const write = promisify(require('fs').writeFile);
const mkdirp = promisify(require('mkdirp'));
const path = require('path');
module.exports = function(inputPath, outputPath, includeHeader = true) {
  return function(converter)
  {
    const generated = `/* iris: generated`;
    const warning = `${generated} by iris. If you edit this file ensure you delete this comment */`;
    return function(src) {
      const _in = `${inputPath}/${src}.css`;
      const _out = `${outputPath}/${src}.scss`;
      return read(_in).then(
        function(input) {
          return converter(input.toString());
        }
      ).then(
        function(output) {
          return read(_out).catch(
            function() {
              return null;
            }
          ).then(
            function(existing) {
              if(existing === null) {
                existing = warning;
              }
              if(existing.indexOf(generated) === 0) {
                console.log(`- ${_in} > ${_out}`);
                if(includeHeader) {
                  output = `${warning}
${output}`;
                }
                return mkdirp(path.dirname(_out)).then(
                  function() {
                    return write(_out, output);

                  }
                );
              }
              console.warn(`*** Unable to overwrite ${_in} > ${_out}`);
            }
          );
        }
      );
    }
  };
};
