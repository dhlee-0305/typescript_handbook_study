export {};

/*
    JavaScript는 코드 모듈화 방법에 대한 긴 역사를 가지고 있다.
    TypeScript는 2012년 부터 이러한 모듈화 방법의 지원을 구현해왔다.
    시간이 지남에 따라 커뮤니티와 JavaScript 표준 명세는 ES Modules라는 방식으로 수렴되어왔다.
    이 방식은 import / export 문법이다.
    ES Modules는 2015년에 JavaScript 명세에 추가되었다.
    그리고 2020년 까지 대부분의 웹 브라우저와 JavaScript 런타임에서 광범위하게 지원되고 있다.
    선택과 집중을 위해, 이 핸드북에서는 ES Modules와 그와 못지 않게 인기있는 선행 방식인 CommonJS를 다룰 것이다.
    (이 CommonJS는 module.exports = 문법으로 대표되는 방식이다.)
*/

/*
    ### How JavaScript Modules ar Defined
    ECMAScript 2015와 마찬가지로 TypeScript 내에서도 탑레벨 import 혹은 export를 포함하는 모든 파일은 모듈로 간주된다.
    거꾸로 말하면, 탑레벨 import 혹은 export 선언이 없는 파일은 그 내용이 그로벌 스코프에서 사용 가능한(따라서 모듈에서도 사용 가능한) 일반 스크립트로 다뤄진다.

    모듈은 그 자신의 스코프 내에서는 실행될 수 있지만 글로벌 스코프에서는 실행될 수 없다.
    이는 모듈에서 정의된 변수와 함수, 클래스 기타 등등은 명시적으로 export 문법으로 내보내지 않는 한, 모듈 바깥에서 가시적이지 않다는 것을 의미한다.
    반대로 이야기하면, 다른 모듈로부터 내보내진 변수, 함수, 클래스, 인터페이스 등등을 사용하려면, import로 불러들어야 한다는 의미다.
*/

/*
    ### Non-modules
    TypeScript가 모듈로 간주하는 것이 무엇인지를 이해하는 것이 중요하다.
    JavaScript 명세는 export 혹은 탑레벨 await가 없는 JavaScript 파일은 스크립트로 간주되어야 하며, 모듈이 아니라고 선언하고 있다.
    스트립트 파일 내에서 변수와 타입은 공유된 글로벌 스코프에 존재하도록 선언된다.
    또한 스크립트 파일로 간주될 경우, 다중의 입력 파일을 하나의 아웃풋 파일로 결합시키기 위해 --outFile 컴파일러 옵션을 사용하거나,
    여러 개의 스크립트 파일을 불러들이기 위해 HTML 파일에 다중의 <script> 태그를 사용할 것이라고 간주된다.
    만약 파일이 현재 import나 export를 갖고 있지 않다면, 모듈로 다뤄지길 바란다면 아래와 같은 한 줄을 추가하자.

    export{};

    이 한 줄은 아무것도 없는 모듈을 내보내는 코드다.
    이 문법은 설정의 모듈듈 타겟과 관계없이 동작한다.
*/

/*
    ### Modules in TypeScript
    TypeScript에서 모듈 기반 코드를 작성할 때 고려애햐 할 세 가지 주요한 부분이 있다.
    - 문법(Syntax): 임포트하고, 익스포트할 때 어떤 문법을 사용하길 원하는가?
    - 모듈 해상도(Module Resolution): 모듈 이름(혹은 경로)과 디스크 파일 사이의 관계는 무엇인가?
    - 모듈 출력 타겟(Module Output Target); 출력된 JavaScript 모듈은 어떤 형태여야 하는가?

    ES Module Syntax
    아래는 export default를 통해 메인 익스포트를 선언하고 있다.
*/
export default function helloWorld(){
    console.log('Hello World!');
}
/* 
    이는 다음과 같이 import 할 수 있다.

import hello from './hello.js';
hello();

    default export에 더해, 당신은 export를 이용하여 하나 이상의 변수 및 함수를 내보낼 수 있다.
*/
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator{}

export function absoulte(num: number){
    if(num < 0) return num * -1;
    return num;
}
/*
    import 문법으로 다른 파일에서 이 요소들을 사용할 수 있다.
    
    import {pi, phi, absolute} from './maths.js';
    
    console.log(pi);
    const absPhi = absolute(phi); // const absPhi: number
*/

/*
    Additional Import Syntax
    불러들일 요의 이름은 import { old as new } 와 같은 양식을 사용하여 바꿀 수 있다.

    import {pi as π} from './maths.js';

    console.log(π); // (alias) var π: number
    
    위 문법을 단일 import 문만으로 섞어 사용할 수 있다.
    // maths.ts
    export const pi = 3.14;
    export default class RandomNumberGenerator{}


    // app.ts
    import RNGen, {pi as π} from './maths.js';

    RNGen;  // (alias) class RNGen
    console.log(π); // (alias) const π: 3.14;

    * as name을 사용하면, 모든 익스포트된 오브젝트들을 묶어 단일 네임스페이스에 넣을 수 있다.

    import * as math from './maths.js';
     console.log(math.pi);
     const positivePhi = math.absolute(math.pi);    // const positivePhi: number

     import './file'을 통해 특정 파일을 임포트하되, 현재 모듈에 그 어떤 변수도 할당하지 않을 수 있다.

     import './maths.js';
     console.log('3.14');
     이 경우, import는 아무것도 하지 않는다.
     하지만 maths.ts의 모든 코드는 평가되며, 다른 오브젝트들에 영향을 미칠 수 있는 사이드 이펙트를 야기할 수 있다.
*/

/*
    TypeScript Specific ES Module Syntax
    타입은 JavaScript 값과 같은 문법을 사용하여 익스포트 및 임포트할 수 있다.

    // animal.ts
    export type Cat = {breed: string, yearOfBirth: number};

    export interface Dog{
        breeds: string[];
        yearOfBirth: number;
    };

    // app.ts
    import {Cat, Dog} from './animal.js';
    type Animals = Cat | Dog;

    TypeScript는 import 문법을 import type으로 확장했다.
    이 문법은 오직 타입만을 임포트한다.
    export type Cat = {breed: string, yearOfBirth: number};
    export type Dog = {breeds: string[], yearOfBirth: number};
    export const createCatName = () => 'fluffy';    // 'createCatName' cannot be used as a value, because it was imported using 'import type'.

    // valid.ts
    import type {Cat, Dog} from './animal.js';
    export type Animals = Cat | Dog;

    // app.ts
    import type {createCatName} from './animal.js';
    const name = createCatName();

    이 문법은 바벨, swc 혹은 esbuild와 같은 비 TypeScript 트랜스파일러가 어떤 import 문이 안전하게 제거될 수 있는지 알 수 있게 해준다.
*/

/*
    ES Module Sytax with CommonJS Behavior
    TypeScript는 CommonJS와 AMD의 require에 직접적으로 연관되는 ES Module 문법을 갖고 있다.
    ES Module을 사용한 임포트는 대부분의 경우 require와 똑같이 사용할 수 있다.
    하지만 이 문법은 TypeScript 파일과 CommonJS 출력이 일대일 매치가 되는 경우에만 가능하다.

    import fs = require('fs');
    const code = fs.readFileSync('hello.ts', 'utf8');
*/

/*
    ### CommonJS Syntax
    npm의 대부분의 모듈이 이 CommonJS 포맷으로 되어있다.
    만약 위 ES Module 문법을 사용하려 작성하고 있다 하더라도 CommonJS  문법이 어떻게 디버깅을 쉽게 할 수 있도록 도와주는지 간단히 이해해보는 것도 좋을 것이다.

    Exporting
    module이라는 글로벌 객체의 exports 프로퍼티의 할당을 통해 식별자가 익스포트 된다.

    function absolute(num: number){
        if( num < 0) return num * -1;
        return num;
    }

    module.exports = {
        pi: 3.14,
        squareTwo: 1.41,
        phi: 1.61,
        absolute
    };

    이제 require 문을 통해 이 요소들을 임포트할 수 있다.
    const maths = require('math');
    maths.pi; // any

    또는 JavaScript의 해체 기능을 사용해 더 단순화할 수도 있다.
    const {squareTwo} - require('maths');
    squareTwo;  // const squareTwo: any

    CommonJS and ES Modules Interop
    CommonJS와 ES Modules 사이에는 매치되지 않는 기능이 존재한다.
    ES Module은 오직 오브젝트에 대해 디폴트 익스포트만 지원하고, 함수에 대해서는 지원하지 않는다.
    TypeScript는 이 둘의 제약 사항의 차이에 따른 결함을 줄이기 위해 esModuleInterop이라는 컴파일러 플래그를 가지고 있다.
*/

/*
    ### TypeScript's Module Resolution Options
    출력된 JavaScript 결과물ㅇ 영향을 미치는 두 가지 옵션이 있다.
    - target은 JS 기능의 다운레벨링(더 오래된 JavaScript 런타임 환경에서 작동되도록 변환한)을 결정한다.
    - module은 모듈이 서로 상호작용하는 데 사용되는 코드를 결정한다.

    target을 어떤 것으로 사용하는가는 TypeScript 코드를 실제로 실행할 것으로 예상하는 JavaScript 런타임에서 가능한 기능이 무엇인가로 결정한다.
    여기서 런타임은 당신이 지원하고자 하는 가장 오래된 웹브라우저일 수도 있고, 가장 낮은 버전의 Node.js일 수도 있다.
    혹은 일렉트론과 같은 다소 독특한 제약 사항을 가지고 있는 런타임일 수도 있다.

    모듈 끼리의 모든 의사 소통은 모듈 로더를 통해 이뤄진다.
    컴파일러 플래그 module은 어떤 로더를 사용할 것인지를 결정한다.
    런타임에서 모듈 로더는 각 모듈을 실행하기 전에 모듈이 필요로 하는 모든 의존성의 위치를 지정하고 실행시키는 역할을 담당한다.
    아래 예제들은 각 module 옵션별로, ES Module을 사용한 하나의 TypeScript 파일을 어떻게 출력하였는지를 보여주는 코드다.

    import { valueOfPi } from './constants.js';
    export const twoPi = valueOfPi * 2;

    // ES2020
    import { valueOfPi } from "./constants.js";
    export const twoPi = valueOfPi * 2;

    // CommonJS
    "use strict";
    Object.defineProperty(exports, "___esModule", {value: true});
    exports.twoPi = void 0;
    const constants__js_1 = require("./constants.js");
    exports.twoPi = constants__js_1.valueOfPi * 2;

    // UMD
    (function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants.js"], factory);
    }
    })(function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.twoPi = void 0;
        const constants_js_1 = require("./constants.js");
        exports.twoPi = constants_js_1.valueOfPi * 2;
    });

    module값을 ES2020으로 설정한 코드는 원본 타입스크립트 파일과 거의 같다는 점을 확인하자.
*/

/*
    ### TypeScript Namespaces
    TypeScript는 namespace라 불리는 자체 모듈 포맷을 가지고 있따.
    이 포맷은 ES Module 표준보다 이전에 나온 것이다.
    이 문법은 복잡한 정의 파일을 생성하는 데 유용한 기능을 많이 가지고 있으며, 여전히 DefinitelyTyped에서 활발하게 사용되고 있다.

    더 이상 사용되지 않을 때까지, namespaces의 주요한 기능들은 ES Module에 남아있을 것이며, JavaScript의 방향에 맞추어 사용하길 권장한다.
    
*/
