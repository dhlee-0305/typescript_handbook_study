export {};
/*
    typeof 타입 연산자
    JavaScript에서는 이미 표현식 컨텍스트에서 사용할 수 있는 typeof 연산자가 있습니다.
*/

console.log(typeof "Hello World");  // "string" 출력

// TypeScript는 타입 컨텍스트에서 변수나 프로퍼티의 타입을 추론할 수 있는 typeof 연산자를 추가합니다.
let s = "hello";
let n: typeof s;    // let n: string;

/*
    기본 타입에 대해 별로 유용하지 않지만, 다른 타입 연산자와 함께 typeof를 사용하여 많은 패턴을 편리하게 표현할 수 있습니다.
    예를 들어, 미리 정의된 타입인 ReturnType<T>부터 살펴보겠습니다.
    이 타입은 함수 타입을 받으면서 반환되는 타입을 제공합니다.
*/
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // type K = boolean

// 함수 이름에 ReturnType을 사용하면, 안내 오류를 확인할 수 있습니다.
function f(){
    return { x: 10, y: 3 };
}
// type P = ReturnType<f>; // error - 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?ts(2749)

// 값과 타인은 같지 않다는 것을 명심하세요. 값 f의 타입을 추론하기 위해서 typeof를 사용합니다.
type P = ReturnType<typeof f>;
/*
    type P = {
        x: number;
        y: number;
    }
*/

/*
    제한
    TypeScript는 typeof를 사용할 수 있는 표현식의 종류를 의도적으로 제한합니다.
    특히, 식별자(예: 변수 이름) 혹은 프로퍼티에서만 typeof를 사용할 수 있습니다.
    실행 중인 것으로 생각되는 코드 작성의 실수를 파악하는데 도움을 줄 수 있지만, 그렇진 않습니다.
*/

// let shouldContinue: typeof msgbox("Are you sure you want to continue?");  // error - Cannot find name 'msgbox'.ts(2304)