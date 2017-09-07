# zopfli-size 

> Get the gzipped size of a string or buffer

Uses a [Zopfli Compression Algorithm](https://github.com/google/zopfli).

[node-zopfli](https://www.npmjs.com/package/node-zopfli)

## Install

```
$ npm install --save zopfli-size
```


## Usage

```js
var zopfliSize = require('zopfli-size');
var string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

console.log(string.length);
//=> 191

console.log(zopfliSize.sync(string));
//=> 147
```


## API

### zopfliSize(input, callback, options)
### zopfliSize.sync(input, options)

#### input

Type: `string`, `buffer`

#### options

Type: `object`

[List of options](https://nodejs.org/api/zlib.html#zlib_class_options)

[List of zopfli options](https://github.com/pierreinglebert/node-zopfli#options)

#### callback(error, size)

Type: `function`

### zopfliSize.stream(options)

Returns a passthrough stream. The stream emits a `zopfli-size` event and has a `zopfliSize` property.

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
