# Angular Learnning

::: stressed!!
Angular is a development platform, built on TypeScript
:::

``` js
import { Injectable } from '@angular/core'; //依赖注入
@Injectable({providedIn: 'root'})
export class Logger {
  writeCount(count: number) {
    console.warn(count);
  }
}
----------------------
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `
    <p>yiki!</p>
  `
})
export class HelloWorldComponent implements OnInit，.... { // too many... - -|
  constructor(private logger: Logger) { } //Dependency injection
  ngOnInit() {
    //ng calls it shortly after checking the input properties 
  } 
  ngAfterViewInit(){}
  ngOnDestroy(){}
}
```

## support
- [official angular](https://angular.io/guide/what-is-angular)


