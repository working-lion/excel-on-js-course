require('./scss/styles.scss');

const c = 'test';

const obj1 = {
  name: 'Ivan',
};

const obj2 = {
  age: 20,
};

const info = { ...obj1, ...obj2 };

console.log('Info', info);
console.log('test', c);
