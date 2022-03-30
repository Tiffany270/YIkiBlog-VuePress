# TypeScript
:pig:
::: tip 
TypeScript is a language that as a superset of JavaScript
:::
`boolean` `bigint`  `null`  `number`  `string`  `symbol`  `undefined`  
`unknown` ensure someone using this type declares what the type is  
`never` it’s not possible that this type could happen  
`void` a function which returns undefined or has no return value   
`unions` true | false or anything else  
`generics` Array\<string\> or anything else  
`any` whenever it can’t tell what the type of an expression should be  
`readonly` modifier for properties  
``` ts
// You can explicitly describe this object’s shape using an interface declaration:
interface User {
  name: string;
  id: number;
}

//TypeName after a variable declaration:
const user: User = {
  name: "Hayes",
  id: 0,
};
// or
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
  // with return value
  function getAdminUser(): User {
  //...
}
}
 
const user: User = new UserAccount("Murphy", 1);
```

## Basics
- A Static Type `Checker` : TypeScript checks a program for errors before execution
## with JavaScipt
- TypeScript `doesn’t` provide any `additional` runtime libraries. Your programs will use the `same` standard library (or external libraries) as JavaScript programs
- If you move code from JavaScript to TypeScript, it is `guaranteed` to run the same way, even if TypeScript thinks that the code has type errors
## with Java/C#
- Don’t limit yourself to TypeScript-specific resources!
  - not every domain needs to be represented in `class` union
  - `functions` can live anywhere, and `data` can be passed around freely without being inside a pre-defined `class` or `struct`
  - `singletons` and `static classes` are `unnecessary` in TypeScript.
- TypeScript’s understanding of a `type` is actually quite `different` from C# or Java’s
  - `types` are related via their `declarations`, not their `structures`.
  - it’s better to think of a` type as a set of values` that share something in common
  - objects are `not` of a single exact type
- `typeof (new Car())` will be `"object"`, not Car or "Car"

## wiht Functional 
- view [Haskell in TS](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html)

## Strictness
TypeScript has several `type-checking strictness flags` that can be turned on or off, in the `CLI`, or `"strict": true` in a `tsconfig.json`
- `noImplicitAny` will issue an error on any variables whose type is implicitly inferred as `any`
- `strictNullChecks` By default, makes handling `null` and `undefined` more explicit, values like `null` and `undefined` are assignable to any other type

## Support
- [typescriptlang-docs](https://www.typescriptlang.org/docs/)

## Some confusions
- what's mean `(...args: never[]) => ...` 
  - first, u can treat it as `(...args: never[]) => any` would mean `a function that accept no parameters`
  ``` ts
  type NeverArgs = (...args: never[]) => number;
  declare const fnNeverArgs: NeverArgs;
  fnNeverArgs("test") // TS ERROR
  fnNeverArgs() // OK
  ```
  - second, back to `extends` , here we should not forget that extends `doesn't` mean `equals`. 
  - so now we can `accept` function that both
    - has `multiple` arguments, include `nerver`
    - no argument
  ``` ts
  type Check<T> = T extends (...args:never[]) => number ? 'OK' : 'NOT OK';
  type Test1 = Check<() => number>; //type Test1 = OK
  type Test2 = Check<(x: string) => number>; //type Test2 = OK
  type Test3 = Check<(x: never) => number>; //type Test3 = OK
  ```
  - contrast codes
  ``` ts
  // remove 
  type Check<T> = T extends () => number ? 'OK' : 'NOT OK';
  type Test1 = Check<() => number>; // type Test1 = OK
  type Test2 = Check<(x: string) => number>; // type Test2 = NOT OK
  type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
  
  // with "any" type :
  type Check<T> = T extends (...args: any[]) => number ? 'OK' : 'NOT OK';
  type Test1 = Check<() => number>; // type Test1 = OK
  type Test2 = Check<(x: string) => number>; // type Test2 = OK
  type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
  ```
- `static` method/property and `non-static` 
  - at the `memory` level, a portion of the memory will be created for the `static` fields, which will be `shared` across `all` objects in the class
  - if `non-static`,  when a call have done, its memory would totally end until u new one again
  - if `static`, it would still exist there until the program finished