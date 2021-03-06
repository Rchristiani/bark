# Bark 🐶

[![NPM version](https://img.shields.io/npm/v/bark-framework.svg?style=flat-square)](https://www.npmjs.com/package/bark-framework) [![CircleCI](https://img.shields.io/circleci/project/Rchristiani/bark.svg?style=flat-square)](https://circleci.com/gh/Rchristiani/bark)

Strictly for learning purposes, implementing a simple MVC framework. Super naive implementation of the MVC pattern, inspired by Backbone!

## Why Bark?

Cause it will be a little **ruff** around the edges. And when developers look at the code they will say **woof**.

<!-- ## Example -->

<!-- A simple example can be found [here](https://rchristiani.github.io/bark/) -->

## Installation

**Browser**

Download `bark.js` from the `src` folder in this repo and include it on your page.

In your HTML
`<script src="js/bark.js"></script>`

In your JS
`const model = Bark.Model({...});`

**npm**

`npm install --save bark-framework`

`const Bark = require('bark-framework');`

### Browser Support

At this time the support is only for browsers that support `fetch`.

## API

### `Bark.Model()`

A Bark Model is a simple constructor that is used to store your data, this can be as a simple model or a collection. 

Each Bark Model has a fetch method that is used to fetch the data from a `url` property that you assign when you create a new model.

#### Usage:
```js
const studentData = Bark.Model({
    url: 'http://myapi.com/students'
});

studentData.fetch()
    .then(() => {
        console.log(studentData.attrs.stundent[0]);
    });

```

- url: `url` used for fetching data.
- attrs: property the data is stored on
- fetch(): default method for fetching data, applies data to the `attrs` property. Returns a Promise.

### `Bark.Template`

A simple tagged template function that will take an ES6 Template Literal and return a new function that you can apply your Bark.Model too.

```js
let studentTemplate = Bark.Template`
    <h2>${'name'}</h2>
    <img src="${'photo'}" alt="" />`;
```

Pass a Template literal with strings inside of the expressions, these strings will map to keys in the object you want to pass to it.

```js
{
    name: 'Ryan Christian',
    photo: 'http://coolheadshot.com/rchristiani.png'
}
```

When calling it later it you pass this data to the returned function from `Bark.Template`.

```js
studentTemplate({
    name: 'Ryan Christian',
    photo: 'http://coolheadshot.com/rchristiani.png'
});
```

This will produce your new template!

You may also use functions inside of your expressions to get more complex templates. Consider some data like this.

```js
{
    name: 'Ryan Christian',
    photo: 'http://coolheadshot.com/rchristiani.png'
    projects: ['Built Facebook','Made new cool startup']
}
```

We could represent this data in our template like such.

```js
let studentTemplate = Bark.Template`
    <h2>${'name'}</h2>
    <img src="${'photo'}" alt="" />
    <ul>
        ${data => data.projects.map(el => `<li>${el}</li>`)}
    </ul>`
;
```


### `Bark.View()`

A Bark View is used to create a reusable view. 

```js
Bark.View({
    template: studentTemplate({
        name: 'Ryan Christian',
        photo: 'http://coolheadshot.com/rchristiani.png'
    }),
    className: 'student',
    elem: document.querySelector('#app')
}).render();
```

The view comes with a few options. 

##### `template`

A `Bark.Template` to be used to render the data in the view. No Default.

##### `elem`

This property will take a DOM element to be used to append your view too. _Defaults_ to the `body`.

##### `elemType` 

This property will define what element type to warp your template in.

##### `className`

What you want to add as a class to the view. _Defaults_ to nothing.

##### `render()`

This method is used to render the view on the `elem`.

##### `events`

This is an object where the key is your event and selector, and the value is a function name for the handler. This handler is added to the object passed to `Bark.View`.

```js
Bark.View({
    template: studentTemplate({
        name: 'Ryan Christian',
        photo: 'http://coolheadshot.com/rchristiani.png'
    }),
    className: 'student',
    elem: document.querySelector('#app'),
    events: {
        'click p' : 'clickEvent',
    },
    clickEvent() {
        //Some whatever you need to in here!
    }
}).render();
```


### `Bark.Controller()`

A Bark Controller is used to control the views and models. Very much a work in progress.

Options available.

##### `model`

Used to store a `Bark.Model` on.

##### `init()`

This method is called when the controller is created. Use this as a place to initialize your application.

Controller needs a LOT of work still.

### TODO

Add mechanism to update views when data is updated on a model.


