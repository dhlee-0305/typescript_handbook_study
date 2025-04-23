/*
    ### 정적 타입 검사
    JavaScript는 오직 동적 타입만을 제공하며, 코드를 실행해야만 어떤 일이 벌어지는지 비로소 확인할 수 있습니다.
    이에 대한 대안은 정적 타입 시스템을 사용하여 코드가 실행되기 전에 코드에 대하여 예측하는 것입니다.
    정적 타입 시스템은 우리가 작성한 프로그램에서 사용된 값들의 형태와 동작을 설명합니다. 
    TypeScript와 같은 타입 검사기는 이 정보를 활용하여 프로그램이 제대로 작동하지 않을 때 우리에게 알려줍니다.

    JavaScript는 객체에 존재하지 않는 프로퍼티에 접근을 시도했을 때 오류를 던지지 않고 undefined를 반환합니다.
    TypeScript에서는 정의되지 않았다는 오류를 발생시킵니다.
    이로 인하여 표현의 유연성을 희생해야 하겠지만, 이렇게 함으로써 명시적인 버그는 아니지만 버그로 타당히 간주되는 경우를 잡아내는 데에 그 목적이 있습니다.
    그리고 TypeScript는 이러한 겉으로 드러나지 않는 버르를 꽤 많이 잡아냅니다.
    ex) 오타, 호출되지 않은 함수, 기본적인 논리 오류
*/

/*
    ### 프로그래밍 도구로서의 타입
    TypeScript는 코드 수정에 활용될 수 있고, 우리가 코드를 입력할 때 오류 메시지를 제공하거나 코드 완성 기능을 제공할 수 있습니다.
    TypeScript를 지원하는 코드 편집기는 오류를 자동으로 고쳐주는 "Quick Fixes", 
    코드를 간편하게 재조직하는 리팩토링, 변수의 정의로 빠르게 이동하는 유용한 네비게이션, 주어진 변수에 대한 모든 참조 검색 등의 기능들을 제공합니다.  
    이 모든 기능들은 타입 검사기를 기반으로 하며 완전히 크로스 플랫폼으로 동작하므로, 여러분이 주로 사용하는 코드 편집기가 TypeScript를 지원할 확률이 높습니다.
*/

// ### 명시적 타입
function greet(person: string, date: Date){
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
// greet("maddison", Date()); // ERROR - Argument of type 'string' is not assignable to parameter of type 'Date'.
greet("Maddison", new Date());
// 명시적인 타입 표기를 항상 작성할 피룡는 없다는 것을 꼭 기억해두세요. 
// 많은 경우, TypeScript는 생략된 타입 정보를 추론할 수(또는 "알아낼 수") 있습니다.
let msg = "hello there!"; // mse is string
// 타입 시스템이 알아서 올바른 타입을 어떻게든 잘 알아낼 수 있다면 타입 표기를 굳이 적지 않는 것이 가장 좋습니다.

/* 
    ### 지워진 타입
    타입 표기는 JavaScript(또는 엄밀히 말하여 ECMAScript)의 일부가 아니므로, TypeScript를 수정 없이 그대로 실행할 수 있는 브라우저나 런타임은 현재 존재하지 않습니다.
    이것이 TypeScript를 사용하고자 할 때 다른 무엇보다도 컴파일러가 필요한 이유입니다.
    TypeScript 전용 코드를 제거하거나 변환하여 실행할 수 있도록 만들 방법이 필요합니다. 대부분의 TypeScript 전용 코드는 제거되며, 마찬가지로 타입 표기 또한 완전히 지워집니다.
    Note. 타입 표기는 프로그램의 런타임 동작을 전혀 수정하지 않습니다.
*/

/*
    ### 다운 레벨링
    `Hello ${person}, today is ${date.toDateString()}!`;
    위 구문은 아래 구문으로 다시 작성됩니다.
    "Hello " + person + ", today is " + date.toDateString() + "!";

    TypeScrit는 새 버전의 ECMAScript의 코드를 ECMAScript 3 또는 ECMAScript 5와 같은 예전 버전의 것들로 다시 작성해 줍니다.
    새로운 또는 "상위" 버전의 ECMAScript를 예전의 "하위" 버전의 것으로 바꾸는 과정을 다운레벨링이라 부르기도 합니다.
    --target 플래그를 설정하면 타겟을 바꿀 수 있습니다.
    > tsc --target es2015 input.ts
*/

/*
    ### 엄격도
    CLI에서 --strict 플래그를 설정하거나 tsconfig.json에 "strict": true를 추가하면 모든 플래그를 동시에 활성화하게 되지만,
    각각의 플래그를 개별적으로 끌 수도 있습니다.

    noImplicitAny : 타입이 any로 안묵적으로 추론되는 변수에 대하여 오류를 발생시킵니다.
    strictNullChecks : null과 undefined를 보다 명시적으로 처리하며, null 및 undefined 처리를 잊었는지 여부를 걱정하는데서 우리를 해방시켜 줍니다.
    
*/