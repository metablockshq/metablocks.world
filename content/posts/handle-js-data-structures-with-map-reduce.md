---
title: Handle JavaScript data structures with map/reduce
subTitle: A cheatsheet for writing beautiful, concise and functional es6
canonicalUrl: https://codeburst.io/writing-javascript-with-map-reduce-980602ff2f2f
publishedOn: 2018-01-31
heroImg: https://miro.medium.com/max/1191/1*hgBLGPibHyM4oSjjASJtSA.png
relatedSlugs:
  - clojure-424-days
tags:
  - functional-programming
  - lambda
  - js
  - es6
  - javascript
  - map-reduce-filter
author: shivekkhurana
---
Javascript has its problems, but syntax is not one of them. The ternary operator, the es6 map/reduce and the spread operator are powerful constructs.

Apart from readability and precision, these constructs also help enforce loose immutability because the original data structure is never modified. This style fits fairly well with redux and our [Fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) approach.

Without more yada yada, here’s the juice :

## A simple reduce

Use a reducer when you need to combine data from multiple sources into one entity.

```
const posts = [
  {id: 1, upVotes: 2},
  {id: 2, upVotes: 89},
  {id: 3, upVotes: 1}
];

const totalUpvotes = posts.reduce((totalUpvotes, currentPost) =>     
  totalUpvotes + currentPost.upVotes, // reducer function
  0 // initial accumulator value
);// now totalUpvotes = 92
```

The reducer function is also provided with two additional arguments :

1. The index of the element (as argument 3)
2. The entire collection (as argument 4)

So a complete reducer function should look like:

```
collection.reduce(
  (accumulator, currentElement, currentIndex, collectionCopy) => 
    {/*function body*/},
    initialAccumulatorValue
);
```

## A simple map

Use a map for processing streams like data (examples array). It helps me to think of it as a transformation that will be applied to all the elements of a stream (array).

```
const integers = [1, 2, 3, 4, 6, 7];
const twoXIntegers = integers.map(i => i*2);// twoXIntegers are now [2, 4, 6, 8, 12, 14]
```

## A simple find

This helps pin point elements inside an array (stream like data structure).

```javascript
const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'}
];
// find the title of post whose id is 1
const title = posts.find(p => p.id === 1).title;
```

## A simple filter

Filter creates views of array like data structures.

```javascript
const integers = [1, 2, 3, 4, 6, 7];
const evenIntegers = integers.filter(i => i%2 === 0);// evenIntegers are [2, 4, 6]
```

## Adding an element to an array

Useful while creating infinite scroll ui (there is an example further below which uses real world array of objects).

```javascript
const books = ['Positioning by Trout', 'War by Green'];
const newBooks = [...books, 'HWFIF by Carnegie'];// newBooks are now ['Positioning by Trout', 'War by Green', 'HWFIF // by Carnegie']
```

## Creating a view on top of an array

Useful when there is a need to remove something from a list, example a user deleted an item from the cart.

```javascript
const myId = 6;
const userIds = [1, 5, 7, 3, 6];
const allButMe = userIds.filter(id => id !== myId);
// allButMe is [1, 5, 7, 3]
```

## Adding an element to an array of objects

```
const books = [];
const newBook = {title: 'Alice in wonderland', id: 1};
const updatedBooks = [...books, newBook];
```

The books variable here might also be undefined. It doesn’t matter, the spread operator will still work.

## Adding a key value pair to an object

```
const user = {name: 'Shivek Khurana'};
const updatedUser = {...user, age: 23};
```

## Adding a key value pair with dynamic key

```
const dynamicKey = 'wearsSpectacles';
const user = {name: 'Shivek Khurana'};
const updatedUser = {...user, [dynamicKey]: true};

// updatedUser is {name: 'Shivek Khurana', wearsSpectacles: true}
```

## Find and replace key value pair in array of objects:

```
const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'}
];

const updatedPosts = posts.map(p => p.id !== 1 ?
  p : {...p, title: 'Updated Title 1'}
);

/*updatedPosts is now [
  {id: 1, title: 'Updated Title 1'},
  {id: 2, title: 'Title 2'}
];*/
```

## Find an element inside an array of objects

```
const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'}
];

const postInQuestion = posts.find(p => p.id === 2);
// postInQuestion now holds {id: 2, title: 'Title 2'}
```

### Delete a key value pair inside an object

```
const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};
const userWithoutPassword = Object.keys(user)
  .filter(key => key !== 'password')
  .map(key => ({[key]: user[key]}))
  .reduce((accumulator, current) => 
    ({...accumulator, ...current}),
    {}
  )
;
// userWithoutPassword becomes {name: 'Shivek Khurana', age: 23}
```

[Kevin Bradley](https://medium.com/u/fd4d4252179c) (thanks Kevin !) suggested a beautiful technique to delete a key value pair inside an object. Here it is :

```
const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};
const userWithoutPassword = (({name, age}) => ({name, age}))(user);
```

He also mentioned that this example works fairly well when the number of keys in the object are less.

[Ivan Botnari](https://medium.com/u/2d62320f9947) suggested something, which according to me, is the best way to go about it (thank you Ivan):

```
const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};

const userWithoutPassword = Object.keys(user)
  .reduce((acc, key) => key === ‘password’ ? 
    acc : ({ …acc, [key]: user[key] }), 
    {}
  );
```

Ivan’s brilliant approach can also be used to delete a collection of keys, like :

```
const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};
const userWithoutPasswordAndAge = Object.keys(user)
  .reduce((acc, key) => ['password', 'age'].indexOf(key) > -1 ? 
    acc : ({ …acc, [key]: user[key] }), 
    {}
  );
```

## Encode an object into query string

You’ll hardly need this specific use case, but it might help you create something.

```
const params = {color: 'red', minPrice: 8000, maxPrice: 10000};
const query = '?' + Object.keys(params)
  .map(k =>   
    encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  )
  .join('&')
;

// encodeURIComponent encodes special characters like spaces, hashes 
// query is now "color=red&minPrice=8000&maxPrice=10000"
```

## Find index of element in an array of objects

```
const posts = [
  {id: 13, title: 'Title 221'},
  {id: 5, title: 'Title 102'},
  {id: 131, title: 'Title 18'},
  {id: 55, title: 'Title 234'}
];

// to find index of element with id 131
const requiredIndex = posts.map(p => p.id).indexOf(131);
```

With all this data structure power, I hope your code will become more precise, crisp and maintainable. When a new dev joins the team (and doesn’t understands this sorcery, show them this post).

A good next step is to watch [Rich Hickey](https://github.com/richhickey)’s [Value of values](https://www.youtube.com/watch?v=-6BsiVyC1kM).
