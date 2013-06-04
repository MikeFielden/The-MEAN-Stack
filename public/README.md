# The `public` Directory

## Overview

The `public/` directory contains all code used in the application along with all tests of such code.

```
public/
  |- app/
  |  |- about/
  |  |- app.js
  |  |- app.spec.js
  |- assets/
  |  |- fonts/
  |- components/
  |- min/ 
  |- sass/
  |  |- main.scss
  |- styles/
  |- index.html
```

- `public/app/` - application-specific code, i.e. code not likely to be reused in
  another application. [Read more &raquo;](app/README.md)
  
- `public/assets/` - static files like fonts and images. 
  [Read more &raquo;](assets/README.md)
  
- `public/components/` - third-party components likely to be reused in another application. [Read more &raquo;](components/README.md)
  
- `public/min/` - Output of the concatenation/ngmin/uglification process

- `public/sass/` - SCSS CSS files. [Read more &raquo;](sass/README.md)

- `public/stylesheets/` - Output of the Sass compilation process

- `public/index.html` - this is the HTML document of the single-page application.
  See below.

See each directory for a detailed explanation.

## `index.html`

The `index.html` file is the HTML document of the single-page application (SPA)
that should contain all markup that applies to everything in the app, such as
the header and footer. It declares with `ngApp`,specifies the main `AppCtrl` controller, and contains the `ngView` directive
into which route templates are placed.

Unlike any other HTML document (e.g. the templates), `index.html` is compiled as
a Grunt template, so variables from `Gruntfile.js` and `package.json` can be
referenced from within it. Changing `name` in `package.json` from
"The-MEAN-Stack-Boilerplate" will rename the resultant CSS and JavaScript placed in `min/`,
so this HTML references them by variable for convenience.
