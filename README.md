# eslint-plugin-no-function-declare-after-return

An ESLint plugin to prevent function declaration after return statement  
![Unit test](https://github.com/bhumijgupta/eslint-plugin-no-function-declare-after-return/workflows/Unit%20test/badge.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/eslint-plugin-no-function-declare-after-return) ![npm](https://img.shields.io/npm/v/eslint-plugin-no-function-declare-after-return)

## Install

```bash
# Using npm
npm i -S no-function-declare-after-return
# Using yarn
yarn add no-function-declare-after-return
```

## Usage

In `.eslintrc`

```javascript
{
  "plugins": [
    "no-function-declare-after-return"
  ],
  "rules": {
    "no-function-declare-after-return/no-function-declare-after-return": 2
  }
}
```

## Motivation

Let's consider a code example:

```javascript
function publicMethods(obj){
    if(obj instanceof cutsomClass)
        return {
            set: methodSetter(obj),
            get: methodGetter(obj),
        }
    function methodSetter(obj){
        .
        .
        .
    }
    function methodGetter(obj){
        .
        .
        .
    }
}
```

The function compiles succesfully even though the functions are used before declaration. This is due to the fact that-

> Function declarations in JavaScript are hoisted to the top of the enclosing function or global scope. ([More Info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))

But considering from a readability standpoint, it is quite difficult to figure out where the function is defined and also difficult for new comers to keep in mind the conept of hoisting.  
This plugin will enforce that there are no function declarations are the return statement.

**Note** : This plugin is separate, and in no way replaces `no-unreachable-code` of ESLint.

## Build with ♡ by

### Bhumij Gupta

<img src="https://avatars.githubusercontent.com/bhumijgupta?size=200" alt="Bhumij profile picture">

![GitHub followers](https://img.shields.io/github/followers/bhumijgupta?label=Follow&style=social) [![LinkedIn](https://img.shields.io/static/v1.svg?label=connect&message=@bhumijgupta&color=success&logo=linkedin&style=flat&logoColor=white)](https://www.linkedin.com/in/bhumijgupta/) ![Twitter Follow](https://img.shields.io/twitter/follow/bhumijgupta?style=social)

---

```javascript
if (repo.isAwesome || repo.isHelpful) {
  StarRepo();
}
```
