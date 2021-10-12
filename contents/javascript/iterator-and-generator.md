---
date: '2021-10-12'
title: 'iterator, generator'
categories: ['JavaScript']
summary: 'JavaScript iterator와 generator에 대해 살펴본다.'
featuredImgUrl: https://github.com/yahma25/WIL/blob/master/static/images/javascript/js_iterator.png?raw=true
featuredImgAlt: Thumbnail that is How to become a better listener
---

# 이터레이터(iterator)와 제네레이터(generator)

## iterator를 알게 되면...

* 표준 빌트인 객체(Array, String, Map, Set, ...)에서 for...of, ...(전개 구문), 배열 구조 분해 할당 할 수 있었던 이유를 알게 된다.
* 이터레이션 프로토콜의 필요성을 알게 된다.

## 이터레이터

이터레이터 프로토콜(iterator protocol)을 준수한 순회 가능한(iterable) 메서드를 말한다.

### 이터레이션 프로토콜

ES6부터 도입되었으며 순회 가능한 자료구조를 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.

#### ES6 이전

기존의 자료구조(배열, 문자열, [유사 배열 객체](https://tc39.es/ecma262/#sec-lengthofarraylike), HTMLCollection 등)는 통일된 규약 없이 각자 다양한 방법으로 순회할 수 있었다.

* ex) for (let i; i < length; i++), for...in, forEach 등

#### ES6 이후

순회 가능한 자료구조를 이터레이션 프로토콜을 준수하는 이터러블(iterable)로 통일하였다.

* for...of, ...(전개 구문), [ something ] = iterable obj(배열 구조 분해 할당)

### 이터레이션 프로토콜 세부 종류

#### 이터러블 프로토콜(iterable protocol)

[Well-Known Symbols](https://tc39.es/ecma262/#sec-well-known-symbols) 사양 중 하나인 Symbol.iterator(@@iterator)를 객체의 프로퍼티(property) 키로 사용한 메서드를 구현하거나 프로토타입(prototype)으로 상속받은 Symbol.iterator를 호출하면 이터레이터를 반환한다.

이터러블 프로토콜을 준수한 객체를 이터러블이라고 한다.

for...of 문으로 순회할 수 있어야 하며 전개 구문(spread)과 배열 구조 분해 할당(Destructuring assignment)의 대상으로 사용할 수 있어야 한다.

배열은 이터러블 프로토콜을 준수하는 객체이므로 아래와 같이 사용할 수 있다.

```js
console.log(Symbol.iterator in Array.prototype); // true

// for...of
for (const num of [1, 2, 3]) {
    console.log(num); // 1, 2, 3
}

// ...(전개 구문)
console.log(...[1, 2, 3]); // 1, 2, 3

// 구조 분해 할당
const [a, ...rest] = [1, 2, 3];
console.log(a); // 1
console.log(rest); // [2, 3]
```

일반 객체(Object)는 이터러블 프로토콜을 준수하지 않았으므로 세 가지를 모두 만족하지 않는다.

```js
const obj = { a: 123, b: 456 };

console.log(Symbol.iterator in obj); // false

// for...of
for (const prop of obj) {
  console.log(prop); // Uncaught TypeError: obj is not iterable
}

// ...(전개 구문)
console.log({ ...obj }); // {a: 123, b: 456}

// 구조 분해 할당
const [a, b] = obj; // Uncaught TypeError: obj is not iterable
```

객체 프로퍼티 전개 구문은 [ES6 TC39 Proposal Stage 4단계](https://github.com/tc39/proposal-object-rest-spread)로 적용되었다.

#### 이터레이터 프로토콜(iterator protocol)

이터러블(객체)의 Symbol.iterator 메서드를 호출하면 이터레이터를 반환한다.

```js
console.log([1, 2, 3][Symbol.iterator]()); // Array Iterator {}
/*
Array Iterator
[[Prototype]]: Array Iterator
next: ƒ next()
Symbol(Symbol.toStringTag): "Array Iterator"
[[Prototype]]: Object
*/
```

`next` 메서드를 갖고 있으며 `next` 메서드를 호출하면 이터러블을 순회하면서 `value`와 `done` 프로퍼티를 갖는 `이터레이터 결과 객체(iterator result object)`를 반환한다.
이터레이터는 포인터 역할로서 `이터러블의 현재 요소를 탐색`한다.

```js
const iterator = [1, 2, 3][Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false} <- iterator result object
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// for...of로 순회 했다면 네 번째는 'done === true'라서 순회/실행하지 않음
```

### 표준 빌트인 이터러블

* Array
* String
* Map
* Set
* TypedArray
* arguments
* DOM Collection
  * NodeList
  * HTMLCollection

### 이터레이션 프로토콜의 필요성

다양한 자료구조가 각자 고유의 순회 방식이 존재한다면 앞으로 추가될 기능들은 모든 순회 방식에 대해 대응하거나 제한적으로만 이용할 수 있을 것이다.
자료구조는 데이터 공급자로서 일관된 규약을 지키고, `for...of, 전개 구문, 배열 구조 분해 할당`과 같은 데이터 소비자는 규약을 따라 개발자에게 기능을 제공해주면 된다.
따라서 이터레이션 프로토콜은 데이터 공급자와 소비자 간에 인터페이스(interface) 역할을 한다.

### 커스텀 이터러블

이터레이션 프로토콜을 준수하여 직접 이터러블 만들기

샘플 - 피보나치 수열 이터러블
```js
const fibonacci = function (max) {
  let pre = 0;
  let cur = 1;
  
  return {
    [Symbol.iterator]() { // iterator
      return {
        next() { // next method 선언
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max }; // iterator result object
        }
      }
    }
  }
}

for (const num of fibonacci(20)) {
  console.log(num); // 1, 2, 3, 5, 8, 13
}
```

### 이터러블의 장점

[지연 평가/느긋한 계산법(Lazy evaluation)](https://ko.wikipedia.org/wiki/%EB%8A%90%EA%B8%8B%ED%95%9C_%EA%B3%84%EC%82%B0%EB%B2%95)를 통해 데이터를 생성함으로써
필요한 순간에만 데이터를 만들고, 불필요하게 메모리를 소비하지 않으며 상황에 따라 빠르게 동작하며 무한대로 표현할 수도 있다.

샘플 - 1부터 1억까지의 숫자 중 짝수 100개 구하기
```js
function array(n) {
    let num = 1;
    const arr = [];
    while (num < n) arr.push(num++); 
    return arr;
}

function customIterableArray(n) {
    let num = 1;
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    return { value: num++, done: num >= n };
                }
            }
        }
    }
}

function filterEvenNumbersUntilOneHundred(iterator) {
    const arr = [];
    for (const num of iterator) {
        if (num % 2 == 0) arr.push(num);
        else if (arr.length === 100) break;
    }
    return arr;
}

console.time('');
console.log(filterEvenNumbersUntilOneHundred(array(10)));
console.timeEnd(''); // 0.192138671875ms

console.time('');
console.log(filterEvenNumbersUntilOneHundred(customIterableArray(10)));
console.timeEnd(''); // 0.132080078125ms

console.time('');
console.log(filterEvenNumbersUntilOneHundred(array(100000000)));
console.timeEnd(''); // 685.337890625ms

console.time('');
console.log(filterEvenNumbersUntilOneHundred(customIterableArray(100000000)));
console.timeEnd(''); // 0.203857421875ms
```

숫자의 범위가 작을 때(10개)는 별 차이가 없지만, 클 때(1억)는 속도 차이가 크다는 것을 확인 할 수 있다.

커스텀 이터레이터로 동작할 때는 미리 준비할 필요 없이 숫자를 `num`으로 할당할 때 증감 계산하기 때문에 효율적으로 처리하게 된다.
