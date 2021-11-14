---
date: '2021-10-26'
title: 'generator'
categories: ['JavaScript']
summary: 'JavaScript generator에 대해 살펴본다.'
featuredImgUrl: https://github.com/yahma25/WIL/blob/master/static/images/javascript/js_generator.png?raw=true
featuredImgAlt: Thumbnail that is to describe the generator
---

# 제네레이터(generator)

## 제네레이터를 알게 되면...

호출한 함수를 제어(중지, 재실행)하는 방법을 알게 된다.

## 제네레이터 선언 문법

### 선언 문법

```js
// 함수 선언문
function* genFunc() {
  yield 1;
}

// 함수 표현식
const genFunc = function* () {
  yield 1;
};

// 객체 메서드
const obj = {
  *genFunc() {
    yield 1;
  }
};

// 클래스 메서드
class Class {
  *genFunc() {
    yield 1;
  }
}
```

### yield

`양도하다`라는 사전적 의미로서 `yield` 키워드가 있는 코드까지 실행 후 현재 상태를 반환하며 실행을 중단한다.

```js
function* genFunc() {
  yield 1;
}
const gf = genFunc();
console.log(gf.next()); // {value: 1, done: false}
console.log(gf.next()); // {value: undefined, done: true}
```

### 애스터리스크(Asterisk, 별표, *) 위치

`function` 키워드와 함수 이름 사이에 띄어쓰기 포함 자유롭게 배치 가능하다.

일반적으로는 `function* func() {}` 형식으로 사용하고 있다.

```js
function* genFunc() { yield 1; }
function * genFunc() { yield 1; }
function *genFunc() { yield 1; }
function*genFunc() { yield 1; }
function   *   genFunc() { yield 1; }
```

### 잘못 사용한 경우

```js
// 화살표 함수 사용, Uncaught SyntaxError: Unexpected token '*'
const genFunc = * () => { yield 1; }
```
```js
// new 생성자 사용, Uncaught TypeError: genFunc is not a constructor
function* genFunc() { yield 1; }
const generatorFunc = new genFunc();
```

## return, throw

## 제네레이터 동작 순서

## 제네레이터와 비동기(Promise, async/await)

## Reference

* https://ko.javascript.info/generators
* https://jeonghwan-kim.github.io/2016/12/15/coroutine.html
* https://meetup.toast.com/posts/93
* https://2ality.com/2015/03/es6-generators.html