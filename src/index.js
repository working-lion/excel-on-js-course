import './scss/styles.scss';

const c = 'test';

const obj1 = {
  name: 'Ivan',
};

const obj2 = {
  age: 20,
};

const info = { ...obj1, ...obj2 };

console.log('test', c);
