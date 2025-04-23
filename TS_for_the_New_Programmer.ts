
const obj = {width:10, height: 15};
const area = obj.width * obj.height;
console.log("area:" + area);

/* 
    프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 정적 검사(static checker)라고 합니다.
    어떤 것이 오류인지와 어떤 것이 연산 되는 값에 기인하지 않음을 정하는 것이 정적 타입 검사(static type check)입니다.

    정적 타입 검사자인 TypeScript는 프로그램을 실행시키기 전에 값의 종류를 기반으로 오류를 찾습니다.
    예를 들어, 위의 마지막 예시에 오류가 있는 이유는 obj의 타입 때문입니다. 

    구문(Syntax)
    타입이 있는 JavaScript의 상위 집합
    TypeScript는 JS의 구문이 허용되는, JavaScript의 상위 집한 언어이니다. 구문은 프로그램을 만들기 위해 코드를 작성하는 방법을 의미합니다.
    TypeScript는 독특한 구문 때문에 JavaScript 코드를 오류로 보지 않습니다. 
    즉, 어떻게 작성돼있는지 모르지만 작동하는 JavaScript 코드를 TypeScript 파일에 넣어도 잘 동작합니다.

    타입(Types)
    그러나 TypeScript는 다른 종류의 값들을 사용할 수 있는 방법이 추가된, 타입이 있는 상위 집합니다.
    위의 obj.height 오류는 구문 오류가 아닌, 값의 종류(타입)를 잘못 사용해서 생긴 오류입니다.

    ex)
    console.log( 4/[]) 
    JavaScript에선 NaN을 출력, TypeScript에선 오류(@errors: 2363)를 발생 시킴

    TypeScript의 타입 검사자는 일반적인 오류를 최대한 많이 검출하면서 올바른 프로그램을 만들 수 있게 설계되었습니다.
    (나중에 TypeScript가 코드를 얼마나 엄격하게 검사할 수 있는지에 대한 설정에 대해 알아봅시다.)

    런타임 특성(Runtime Behavior)
    TypeScript는 JavaScript의 런타임 특성을 가진 프로그래밍 언어입니다. 
    예를 들어, JavaScript에서 0으로 나누는 행동은 런타임 예외로 처리하지 않고 Infinity값을 반환합니다.
    논리적으로, TypeScript는 JavaScript 코드의 런타임 특성을 절대 변화시키지 않습니다.
    즉 TypeScript가 코드에 타입 오류가 있음을 검출해도, JavaScript 코드를 TypeScrpt로 이동시키는 것은 같은 방식으로 실행시킬 것을 보장합니다.
    JavaScript와 동일한 런타임 동작을 유지하는 것은 프로그램 작동을 중단시킬 수 있는 미묘한 차이를 걱정하지 않고 
    두 언어 간에 쉽게 전환할 수 있도록 하기 위한 TypeScript의 기본적인 약속입니다.

    삭제된 타입(Erased Types)
    TypeScript의 컴파일러가 코드 검사를 마치면 타입을 삭제해서 결과적으로 "컴파일된" 코드를 만듭니다.
    즉 코드가 한 번 컴파일되면, 결과로 나온 일반 JS 코드에는 타입 정보가 없습니다.
    타입 정보가 없는 것은 TYpeScript가 추론한 타입에 따라 프로그램의 특성을 변화시키지 않는다는 의미입니다.
    결론적으로 컴파일 도중에는 타입 오류가 표출될 수 있지만, 타입 시스템 자체는 프로그램이 실행될 때 작동하는 방식과 관련이 없습니다.
    마지막으로, TypeScript는 추가 런타임 라이브러리를 제공하지 않습니다. TypeScript는 프로그램은 JavaScript 프로그램과 같은 표준 라이브러리(또는 외부 라이브러리)를 사용하므로,
    TypeScript 관련 프레임워크를 추가로 공부할 필요가 없습니다.

*/