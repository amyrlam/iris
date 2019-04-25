# iris

"...like a rainbow"

Iris is a collection of 'low-level' CSS delivered in a lightweight format.

- [Usage](#usage)
- [Collections/Reference](#collections)
- [Rationale](#rationale)

## Usage

```bash
npm install --save[-dev] @johncowen/iris # (right now this isn't published yet)
# or
yarn add -D @johncowen/iris # (right now this isn't published yet)
```


```sass
// sass
@import '@johncowen/iris/index';
@import '@johncowen/iris/reset/index';
```
```css
/* css */
@import '@johncowen/iris/index.css';
@import '@johncowen/iris/reset/index.css';
```

Recommended usage would be install as a dependency and import the files from iris itself, but you can also 'burn' iris into your project by using:

```bash
iris --output-path ./folder/to/where/you/want/iris/
```

This will add the SASS (but not the CSS _currently_) for iris into your project where you specify, so you can continue on without CSS or the extra dependency, just be sure to commit the generated files into source control.

If you then edit the 'burnt' files, make sure you remove the:

```
/* iris: generated ...
```

...comment at the beginning of the file to prevent it from being overwritten if you rerun `iris`

## Collections

- [Color](#color)
- [Typography](#typography)
- [Decoration](#decoration)
- [Reset](#reset)

Some collections use the format:

```
--something-{color}-{num}
```

To illustrate variations. `{num}` is always a 3 digit number, generally like `000`, `050`, `100` up to `900`. Color could be `blue`, `green` etc and is generally dependent on what is defined in the collection.

### Color

If you are unable to import the iris entirely, you can import just the color collection with:

```
@import '@johncowen/iris/color/index{.css,.scss}';
```

The Color Collection consists of 2 groups of variables and a set of semantic names for color related functions which map back to certain color variables to easily use common values.

- `--ui-{color}-{num}` (e.g. `--ui-blue-500`)
- `--brand-{color}-{num}` (e.g. `--brand-blue-500`)
- `--ui-color-primary` (e.g. this might map to `--ui-blue-500`)

See `iris/color/` for reference (please note `iris/color/index.css` is the only file guaranteed to stay with the same name between minor/patch versions)

### Typography

If you are unable to import the iris entirely, you can import just the decoration collection with:

```
@import '@johncowen/iris/typography/index{.css,.scss}';
```

The Typography Collection consists of 1 group of variables prefixed with `typo` and a set of semantic names to easily use common vlaues

- `--typo-{type}-{num}` (e.g. `--typo-size-500`)
- `--typo-family-{variation}` (e.g. `--typo-family-sans`)
- `--typo-weight-{variation}` (e.g. `--typo-weight-light`)


See `iris/typography/` for reference (please note `iris/typography/index.css` is the only file guaranteed to stay with the same name between minor/patch versions)

### Decoration

If you are unable to import the iris entirely, you can import just the decoration collection with:

```
@import '@johncowen/iris/decoration/index{.css,.scss}';
```

The Decoration Collection consists of 1 group of variables, prefixed with `decor`.

- `--decor-{type}-{num}` (e.g. `--decor-radius-500`)

See `iris/decoration/` for reference (please note `iris/decoration/index.css` is the only file guaranteed to stay with the same name between minor/patch versions)

### Reset

The Reset Collection is slightly different from the rest of the collections in that it _currently_ does not produce an empty file if you don't use any of the rules. Therefore you should include this as a second import if you need want to use it (also see [Usage](#usage)).

```
@import '@johncowen/iris/reset/index{.css,.scss}';
```

If you are _migrating to_ iris, you might not want to import the Reset Collection immediately and continue to use whatever reset you are already using.

The Reset collection currently consists of a reasonably common 'reset', but also contains work towards providing different resets to aid migration. It **does** set styles on base DOM elements like `html, body, p, h1, h2, h3, h4, h5` etc and **therefore will add weight to your final CSS file**.



## Rationale

Products can have a diverse range of web based user interfaces, other web based project such as marketing, documentation and educational websites can be even more diverse.

Diversity is good. Using diversity together we can make a stronger whole ...like a rainbow.

This package contains the some of the visible/design elements (or Design System) that could be shared between a portfolio of products - i.e. things you see, with your eye... your [Iris](https://en.wikipedia.org/wiki/Iris_(mythology)) (the personification of a rainbow, also known for communication and messaging).

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
* Removing a 'Collection' from the `iris/index.css` file

### A feature/functionality addition (backwards compatible)

* Adding a new custom property/variable
* Adding a 'Collection' and optionally including it in the `iris/index.css` file (unless you use the new features in the file, it will not add to the compiled weight of your CSS output, see above)

### Bugfixes (backwards compatible)

* Changing a value due to a mistake at authoring time (for example a color shade is slightly wrong)
* Typos


