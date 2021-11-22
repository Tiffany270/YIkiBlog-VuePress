# ECMAScript
::: tip
ECMAScript (ES) is a scripting language specification standardized by ECMAScript International
:::

## Support
- [tutorialspoint-es6](https://www.tutorialspoint.com/es6/index.htm)

## The Basic
- Dynamic Typing
  - JavaScript is an `un-typed` language
  - a JavaScript variable can hold a value of `any` data type
  - The value type of a variable can `change` during the execution of a program and JavaScript takes care of it `automatically`
  - Strong constrain type, view [TypeScirpt](/TypeScript/)
---
- Variable Scope
  - `Global Scope` : can be accessed from within `any` part of the JavaScript code
  - `Local Scope` : can be accessed from within a `function` where it is declared
---
- Variable hoisting
  - variables will be `initialized` to undefined by default
  -  JavaScript runtime will scan for variable declarations and `put` them to the `top` of the `function` or `script`

## Basic Operators
- `2 + 3`
Here in the `expression`, `2` and `3` are `operands` and the symbol `+` (plus) is the `operator`
- Arithmetic  `+` `++` `-` `--` `*` `%` `/`
- Relational  `>` `<` `==` `>=` `<=` `!=`
- Logical `&&` `||` `!`
- Bitwise `&` `|` `^` `~` `<<` `>>` `>>>`
- Assignment `=` `+=` `-=` `*=` `/=`
- `typeof` 
- Spread `...` converts an array into individual array elements

## about loop
- `for...in` loop through an `object`'s properties
``` js
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
   console.log(obj[prop]); // 1 2 3
}
```
- `for…of` `iterate` `iterables` instead of object literals
``` js
for (let val of[12 , 13 , 123]){
   console.log(val) // 12 13 123
}
```

