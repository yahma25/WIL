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

```js
// 'return'은 파라미터로 보낸 값을 value로 설정하며 함수를 종료시킨다.
function* genFunc() {
  yield 1;
  yield 2;
}

const generatorFunc = genFunc();
console.log(generatorFunc.next()); // {value: 1, done: false}
console.log(generatorFunc.return(100)); // {value: 100, done: true}
console.log(generatorFunc.next()); // {value: undefined, done: true}
```

```js
// 'throw'는 파라미터로 보낸 오류 메시지로 오류를 발생시키며 함수를 종료시킨다.
function* genFunc() {
  try {
    yield 1;
    yield 2;
  } catch (e) {
    console.log(e);
  }
}

const generatorFunc = genFunc();
console.log(generatorFunc.next()); // {value: 1, done: false}
console.log(generatorFunc.throw(new Error('오류!'))); // {value: undefined, done: true}
console.log(generatorFunc.next()); // {value: undefined, done: true}
```

## 제네레이터 동작 순서

`next` 메서드를 호출하여 제네레이터 함수를 호출하며 `yield` 키워드가 존재하는 곳까지 진행 후 중지하며 이 패턴을 반복한다.

`generator.next() -> yield -> generator.next() -> yield -> ...`

### 값 주고 받기

`next` 메서드에 파라미터를 전달하여 매개변수를 받는 `yield`를 통해 값을 할당할 수 있다.

```js
function* genFunc() {
  const num1 = yield 100;
  console.log('num1 세팅', num1);
  const num2 = yield num1 + 500;
  console.log('num2 세팅', num2);
  return num1 + num2;
}

const generatorFunc = genFunc();
// 첫 번째 yield에는 매개변수를 받은 변수가 없으므로 파라미터로 보내는 값은 의미없음
let result = generatorFunc.next(9999);
console.log(result); // {value: 100, done: false}

// num1에 50 할당. return num1(50) + 500;
result = generatorFunc.next(50);
console.log(result); // {value: 550, done: false}

// num2에 1000 할당. 다음 yield 찾다가 'return' 확인, return num1(50) + num2(1000)
// 함수가 종료(return)했으므로 done = true
result = generatorFunc.next(1000);
console.log(result); // {value: 1050, done: true}
```

### 샘플 코드

```js
const asyncFunc = (genFunc) => {
  const generator = genFunc();

  const onResolved = (arg) => {
    const result = generator.next(arg);

    return result.done
      ? result.value
      : // value = Promise (응답 전 fetch의 반환 값)
      result.value.then((res) => onResolved(res));
  };

  return onResolved;
};

asyncFunc(function* fetchPost() {
  // jsonplaceholder - 테스트를 위한 무료 Mock API
  const res = yield fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = yield res.json();
  console.log(post); // {userId: 1, id: 1, title: 'sunt aut ...', body: ...}
})();
```

## 읽으면 좋은 글

* https://ko.javascript.info/generators
* https://jeonghwan-kim.github.io/2016/12/15/coroutine.html
* https://meetup.toast.com/posts/93
* https://2ality.com/2015/03/es6-generators.html