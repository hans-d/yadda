# Release Notes

## Yadda 0.7.0
 - TextParser renamed to FeatureParser as per [Issue 12](https://github.com/acuminous/yadda/issues/12).
 - StepParser added

## Yadda 0.6.5
 - Dictionaries can now be merged

## Yadda 0.6.4
 - This release adds jasmine examples

## Yadda 0.6.3
 - This release adds selenium / webdriver examples, based on those created by [mrwiggles](https://github.com/mrwiggles) for [Issue 18](https://github.com/acuminous/yadda/issues/18).

## Yadda 0.6.2
 - This release adds support for annotations on scenarios. Theses were previously only available on features. Support for simple annoations, e.g. @Pending, is also included.

## Yadda 0.6.1
 - Yadda now throws Error objects instead of Strings. See [Issue #24](https://github.com/acuminous/yadda/issues/24).

## Yadda 0.6.0
 - Fix for [Issue #23](https://github.com/acuminous/yadda/issues/23) which prevented the scenario context being shared between steps when using the Mocha plugin. The plugin API was made clearer at the same time, which unfortunately necessitated breaking changes. The following demonstrates how to migrate < 0.6 mocha tests to the 0.6 api.

&lt; 0.6.0
```js
var Yadda = require('yadda');
Yadda.plugins.mocha();
var library = require('./bottles-library');
var yadda = new Yadda.Yadda(library);

yadda.mocha('Bottles', './spec/bottles-spec.txt');
```
&gt;= 0.6.0

```js
var Yadda = require('yadda');
Yadda.plugins.mocha();

feature('./features/bottles.feature', function(feature) {

    var library = require('./bottles-library');
    var yadda = new Yadda.Yadda(library);

    scenarios(feature.scenarios, function(scenario, done) {
        yadda.yadda(scenario.steps, done);
    });
});
```
## Yadda 0.5.2
 - Adds annoations to features in feature files. Thanks [mrwiggles](https://github.com/mrwiggles).

## Yadda 0.5.1
 - Yadda now emits events, which can be useful for debugging. See the README.md for more details.

## Yadda 0.5.0
 - This adds the feature title to the output from the text parser contributed by [akikhtenko](https://github.com/akikhtenko) (thanks). Since this changes the object structure returned by TextParser.parse() if you're using the TextParser directly rather than via the Mocha or Casper plugins, it's a breaking change, but the change is very minor...

```js
        var scenarios = parser.parse(text); // < 0.5.0
        var scenarios = parser.parse(text).scenarios; // >= 0.5.0
```

## Yadda 0.4.7
 - The stable version of casperjs is no longer recommended by the casperjs author. It's also problematic to require modules. The latest version of casperjs (installed from master after 13th September 2013) fixes these problems, so I've updated the example to reflect this.

## Yadda 0.4.6
 - Accepted pull request for feature blocks. See [Issue 8](https://github.com/acuminous/yadda/pull/8). Thanks [mrwiggles](https://github.com/mrwiggles).

## Yadda 0.4.5
 - Fixed scenario parsing on windows bug. See [Issue 6](https://github.com/acuminous/yadda/issues/6). Thanks [grofit](https://github.com/grofit).

## Yadda 0.4.4
 - Changed the CasperPlugin API

## Yadda 0.4.3
 - Changed the MochaPlugin API

## Yadda 0.4.2
 - TextParser no longer maintains state between parses

## Yadda 0.4.1
 - Stopped pending asynchronous steps hanging the test run
 - Added mocha plugin

## Yadda 0.4.0
 - Yadda now supports both asynchronous and synchronous usage
 - Deleted the before and after hook (after cannot be guaranteed to run when asynchronous)

### Breaking API Changes
#### Removal of before and after hooks
The before and after hooks have been removed because after cannot be guaranteed to run when yadda
is asynchronous. Use your test runner's before and after mechanism instead.

#### Removal of non-object contexts
You can no longer pass non-object contexts to yadda, i.e. instead of...
```js
library.define('blah blah blah') function() {
    this.assert();
});
new Yadda(library).('blah blah blah', test);
```
Do...
```js
library.define('blah blah blah') function() {
    this.test.assert();
});
new Yadda(library).('blah blah blah', { test: test });
```

## Yadda 0.3.0
  - Re-implemented as a nodejs module
  - Used browserify for compatability with browser test frameworks like qunit

### Breaking API Changes
Yadda has been re-implemented as a nodejs module. This means that the
global 'Yadda' prefixed class names are no longer exposed and that
all Yadda classes must be explicitly 'required'

In a node environment this is straightforward...
```
npm install yadda
```
```js
var Yadda = require('yadda').Yadda;
var Library = require('yadda').Library;

var library = new Library();
library.given('$NUM bottles of beer', function(n) {
  console.log(n + ' ' + 'bottles of beer');
})
new Yadda(library).yadda('100 bottles of beer');
```

Thanks to browserify it straightforward from a browser environment too...

```html
<head>
  <script src="http://www.github.com/acuminous/yadda/dist/yadda-0.3.0.js"></script>
  <script type="text/javascript">
    var Yadda = require('yadda').Yadda;
    var Library = require('yadda').Library;

    var library = new Library();
    library.given('$NUM bottles of beer', function(n) {
      console.log(n + ' ' + 'bottles of beer');
    })
    new Yadda(library).yadda('100 bottles of beer');
  </script>
</head>
```

In a CasperJS environment it's less straightforward. We haven't found how to get casper to
understand commonjs or umd node modules and Casper's 'require' function clashes with the one created by browserify. For the moment we're working around this with the following ugly hack...
```
var oldRequire = require;
phantom.injectJs('../../dist/yadda-0.3.0.js');
window.Yadda = require('yadda').Yadda;
window.CasperPlugin = require('yadda').plugins.CasperPlugin;
window.Library = require('yadda').Library;
window.require = oldRequire;

library.given('$NUM bottles of beer', function(n) {
  console.log(n + ' ' + 'bottles of beer');
};
var yadda = new Yadda(library).yadda('100 bottles of beer');
casper = new CasperPlugin(yadda, casper).init();
```

## Yadda  0.2.2

- Added a feature file parser
- Improved documentation and examples

## Yadda  0.2.1

- Added a CoffeeScript example
- Added a Nodeunit example
- Added a Mocha example
- Added a new context variable to the interpret method. See Nodeunit example for usage.
- Ensured that Yadda.after is called even if an error occurs
- Fixed distance_table typo

## Yadda  0.2.0

### Breaking API Changes
In Yadda 0.1.0 you invoked yadda with
```js
new Yadda(steps).yadda(["some scenario"]);
```
The equivalent syntax in 0.2.2 is
```js
new Yadda.yadda(library).yadda(["some scenario"]);
```
where library is an instance of Yadda.Library
#### Combining Steps / Libraries
```js
var steps = new Steps();
steps.importSteps(other_steps);
var yadda = new Yadda(steps);
```
Now you pass yadda an array of libraries instead of a single merged one
```js
var lib1 = new Yadda.Library();
var lib2 = new Yadda.Library();
var yadda = new Yadda().yadda([lib1, lib2]);
```
alternatively you can do
```js
var yadda = new Yadda.yadda();
yadda.requires(lib1);
yadda.requires(lib2);
```
or
```js
var yadda = new Yadda.yadda();
yadda.requires([lib1, lib2]);
```
#### Defining Steps
Previously you defined steps using the addStep method, or a given, when, then helper method, e.g.
```js
steps.addStep('some text', function() {
    // some code
})
```
Step.addStep has been replaced with Library.define
```js
library.define('some text', function() {
    // some code
})
```
The helper methods are no longer available by default, but you can restore them by including yadda-0.2.2-localisation.js and creating your libraries as instances of Yadda.Library.English, e.g.
```js
var library = new Yadda.Library.English()
    .given('a (\\d+) green bottles', function() {
        // some code
    }).when('(\\d+) falls', function() {
        // some code
    }).then('there are (\\d+) green bottles', function() {
        // some code
    });
```
