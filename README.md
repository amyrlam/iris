# iris

"...like a rainbow"

## Description

HashiCorp has a diverse range of web based user interfaces for their products, plus an even more diverse portfolio of marketing, documentation and educational websites.

Diversity is good. Using diversity together we can make a stronger whole ...like a rainbow.

This package contains the some of the visible/design elements (or Design System) shared between the HashiCorp portfolio of products - i.e. things you see, with your eye... your [Iris](https://en.wikipedia.org/wiki/Iris_(mythology)) (the personification of a rainbow, also known for communication and messaging).

Iris lets DOM nodes be whatever they want to be. When using a compiler, if you don't use any features from Iris, an empty file is produced. You can pick and choose what you want to use (via CSS custom properties or SASS variables) and avoid bloat in your CSS.

Technology-wise, Iris currently consists of mainly CSS/SASS, but continuing the accepting, inclusive theme it is open to further formats if/when that makes sense, but any additions in the future should 'play well' with others.

Despite the above connotations with colors, Iris consists of a variety of colors, typography, decoration, animation, layout and reset properties and helpers.

## Contracts

It's worthwhile underlining what the approach to semantic versioning is, as it may seem a little strange when approaching a CSS only library.

Overall see [Semantic Versioning](https://semver.org/#summary)

### A breaking change (incompatible API changes)

* Changing an already existing custom property/variable name.
* Changing an existing custom property/variable value that isn't part of a bug fix (see below).
* Changing the path of an already existing file.
* Removing an included file from `index.css`

### A feature/functionality addition (backwards compatible)

* Adding a new custom property/variable
* Adding a new file and including it in the `index.css` file (unless you use the new features in the file, it will not add to the compiled weight of your CSS output, see above)

### Bugfixes (backwards compatible)

* Changing a value due to a mistake at authoring time (for example a color shade is slightly wrong)
* Typos


