
/*
    ### 원시 타입
    - stirng은 "hellow world"와 같은 문자열을 나타냅니다.
    - number는 42와 같은 숫자를 나타냅니다. JavaScript는 정수를 위한 런타임 값을 별도로 가지지 않으므로, int 또는 float과 같은 것은 존재하지 않습니다. 모든 수는 단순히 number 입니다.
    - boolean은 true와 false라는 두 가지 값만 가집니다.

    ### 배열
    [1, 2, 3,]과 같은 배열 타입을 지정할 때 nuber[] 구문을 사용할 수 있습니다. 이 구문은 모든 타입에서 사용할 수 있습니다.(예를 들어 string[]은 문자열 배열입니다.) 
    위 타입은 Array<number>와 같은 형태로 적을 수 있으며, 동일한 의미를 가집니다.

    any
    TypeScript는 또한 any라고 불리는 특별한 타입을 가지고 있으며, 특정 값으로 인하여 타임 검사 오류가 발생하는 것을 원하지 않을 때 사용할 수 있습니다.
    어떤 값의 타입이 any이면, 해당 값에 대하여 임의의 속성에 접근할 수 있고(이때 반환되는 값의 타입도 any입니다.), 
    함수인것처럼 호출할 수 있고, 다른 임의 타임의 값에 할당하거나(받거나), 그 밖에도 구문적으로 유효한 것이라면 무엇이든 할 수 있습니다.
*/
let obj: any = {x: 0};
// 아래 이어지는 코드들은 모두 오류 없이 정상적으로 실행됩니다.
// 'any'를 사용하면 추가적인 타입 검사가 비활성화되며,
// 당신이 TypeScript보다 더 상황을 잘 이해하고 있다고 가정합니다.
/*
obj.foo();
obj();
obj.bar = 100;
obj = 100;
obj = 'hello';
const n: number = obj;
*/
// any 타입은 코드상의 특정 라인에 문제가 없다고 TypeScript를 안심시킨다는 목적 단지 하나 때문에 긴 타입을 새로 정의하고 싶지 않을 때 유용하게 사용할 수 있습니다.

/*
    noImplicitAny
    타입이 지정되지 않은 값에 대하여 TypeScript가 문맥으로부터 그 타입을 추론해낼 수 없다면, 컴파일러는 any 타입을 부여하는 것이 기본 동작입니다.
    하지만 이런 상황은 보통 선호되지 않습니다. 왜냐하면 any는 타입 검사가 이루어지지 않기 때문입니다.
    컴파일러 플래그 noImplicitAny를 사용하면 암묵적으로 any로 간주하는 모든 경우에 오류를 발생시킵니다.
*/

/*
    ### 변수에 대한 타입 표기
    const, var, 또는 let 등을 사용하여 변수를 선언할 때, 변수의 타입을 명시적으로 지정하기 위하여 타입 표기를 추가할 수 있으면 이는 선택사항입니다.
*/
let myName: string = 'Alice';
/*
    하지만 대부분의 경우, 타입 표기는 필요하지 않습니다. 가능하다면 TypeScript는 자동으로 코드 내의 있는 타입들을 추론하고자 시도합니다.
    예를 들어, 변수의 타입은 해당 변수의 초깃값의 타입을 바탕으로 추론합니다.
    위의 myName은 'string' 타입으로 추론됩니다.
    
    대부분의 경우 추론 규칙을 명시적으로 학습하지 않아도 됩니다. 이제 막 TypeScript를 시작하는 단계라면, 가능한 타입 표기를 적게 사용하도록 해보세요.
    코드 흐름을 완전히 파악하는 데에 타입이 그다지 많이 필요하지 않다는 사실에 놀라실 겁니다.
*/

/*
    ### 함수
    매개변수 타입 표기
    함수를 선언할 때, 함수가 허용할 매개변수 타입을 선언하기 위하여 각 매개변수 뒤에 타입을 표기할 수 있습니다.
    매개변수 타입은 매개변수 이름 뒤에 표기합니다.
*/
function greet(name: string){
    console.log("Hello, " + name.toUpperCase() + "!!");
}
// 매개변수에 타입이 표기되었다면, 해당 함수에 대한 인자는 검사가 이루어집니다.
// greet(42); // Error - Argument of type 'number' is not assignable to parameter of type 'string'.
// 매개변수에 타입을 표기하지 않았더라도, 여전히 TypeScript는 올바른 개수의 인자가 전달되었는지 여부를 검사합니다.

/*
    반환타입 표기
    반환 타입은 매개변수 목록 뒤에 표기합니다.
*/
function getFavoritemNumber(): number{
    return 26;
}
/*
    변수의 타입 표기와 마찬가지로, 반환 타입은 표기하지 않아도 되는 것이 일반적입니다.
    왜냐하면 TypeScript가 해당 함수에 들어있는 return 문을 바탕으로 반환 타입을 추론할 것이기 때문입니다.
    위 예시에 사용된 타입 표기는 큰 의르를 갖지 않습니다.
    때에 따라 문서화를 목적으로, 또는 코드의 잘못된 수정을 미연에 방지하고자, 혹은 지극히 개인적인 선호에 의하여 명시적인 타입 표기를 수행하는 코드도 존재합니다.
*/

/*
    익명 함수
    함수가 코드상에서 위치한 곳을 보고 해당 함수가 어떻게 호출될지 알아낼 수 있다면, TypeScript는 해당 함수의 매개 변수에 자동으로 타입을 부여합니다.

    아래 코드는 타입 표기가 전혀 없지만, TypeScript는 버그를 감지할 수 있습니다.
*/
const names = ['Alice', 'Bob', 'Eve'];

// 함수에 대한 문맥적 타입 여부
names.forEach(function(s){
    console.log(s.toUpperCase());
});

// 화살표 함수에도 문맥적 타입 부여는 적용됩니다.
names.forEach((s) => {
    console.log(s.toUpperCase());
});
/*
    매개 변수 s에는 타입이 표기되지 않았음에도 불구하고,  TypeScript는 s의 타입을 알아내기 위하여 배열의 타입과 더불어 forEach() 함수의 타입을 활용하였습니다.

    이 과정은 문맥적 타입 부여라고 불리는데, 왜냐하면 함수가 실행되는 문맥을 통하여 해당 함수가 가져야 하는 타입을 알 수 있기 때문입니다.
    추론 규칙과 비슷하게, 이 가정이 어떻게 일어나는지 명시적으로 배울 필요는 없지만, 이것이 실제로 일어나는 과정이라는 것을 이해하면 타입 표기가 불필요한 경우를 구분하느 데 도움이 됩니다.    
*/

/*
    객체 타입
    객체는 프로퍼티를 가지는 JavaScript 값을 말하는데, 대부분의 경우가 이해 해당하죠.
    객체 타입을 정의하려면, 해당 객체의 프로퍼티들과 프로퍼티의 타입들을 나열하기만 하면 됩니다.
*/
function printCoord(pt: {x: number, y: number}){
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord( {x: 3, y: 7});
// 각 프로퍼티의 타입 표기 또한 선택 사항입니다. 만약 타입을 지정하지 않는다면, 해당 프로퍼티는 any 타입으로 간주합니다.

/*
    옵셔널 프로퍼티
    객체 타입은 일부 또는 모든 프로퍼티의 타입을 선택적 타입, 즉 옵셔널로 지정할 수 있습니다. 프로퍼티 이름 뒤에 ?를 분이면 됩니다.
*/
function printName(obj: {first: string, last?: string}){
    // ...
    let fullName: string = obj.first;
    if( obj.last != undefined && obj.last.length > 0) 
        fullName += " " + obj.last;

    console.log("last.length:"+obj.last?.length); // length or undefined
    console.log("printName: " + fullName);
}
printName({first: "Bob"}); // ok
printName({first: 'Alice', last: 'Alisson'}); // ok
/*
    JavaScript에서는 존재하지 않는 프로퍼티에 접근하였을 때, 런타임 오류가 발생하지 않고 undefined 값을 얻게 됩니다.
    이 때문에 옵셔널 프로퍼티를 읽었을 때, 해당 값을 사용하기에 앞서 undefined 여부를 확인해야 합니다.
*/

/*
    ### 유니언 타입
    유니언 타입 정의하기
    타입을 조합하는 첫 번째 방법은 유니언 타입을 사용하는 것입니다. 
    유니언 타입은 서로 다른 두 개 이상의 타입들을 사용하여 만드는 것으로, 유니언 타입의 값은 타입 조합에 사용된 타입 중 무엇이든 하나를 타입으로 가질 수 있습니다.
    조합에 사용된 각 타입을 유니언 타입의 멤버라고 부릅니다.
*/
function printId(id: number | string){
    console.log("Your ID is : " + id);
    // console.log(id.toUpperCase()); // Error - Property 'toUpperCase' does not exist on type 'string | number'.
}
printId(101);
printId("202");
//printId({myID: 22342}); // Error

/*
    유니언 타입 사용하기
    TypeScript에서 유니언을 다룰 때는 해당 유니언 타입의 모든 멤버에 대하여 유효한 작업일 때에만 허용됩니다.
    예를 들어 string | number라는 유니언 타입의 경우, string 타입에만 유효한 메서드는 사용할 수 없습니다.
    이를 해결하려면 코드상에서 유니언을 좁혀야 하는데, 이는 타입 표기가 없는 JavaScript에서 벌어지는 일과 동일합니다.
    좁히기란 TypeScript가 코드 구조를 바탕으로 어떤 값을 보다 구체적인 타입으로 추론할 수 있을 때 발생합니다.
    예를 들어, TypeScript는 오직 string 값만 typeof 연산의 결과값으로 "string"을 가질 수 있다는 것을 알고 있습니다.
*/
function printId2(id: number | string){
    if(typeof id === "string"){
        console.log(id.toUpperCase()); // 여기서 id는 'string' 타입을 가집니다.
    }else{
        console.log(id); // 여기서 id는 'number' 타입을 가집니다.
    }
}
printId2(101);
printId2("202");
printId2("dhlee");

// 또 다른 예시는 Array.isArray와 같은 함수를 사용하는 것입니다.
function welcomePeople(x: string[] | string){
    if(Array.isArray(x)){
        console.log("Hello, " + x.join(" and ")); // x는 string[]
    }else{
        console.log("Welcome lone traveler " + x); // x는 string
    }
}
welcomePeople("dhlee");
welcomePeople(["Alice", "Bob", "John"]);
/*
    else 분기 문에서는 별도 처리를 하지 않아도 된다는 점에 유의하시기 바랍니다.
    x의 타입이 string[]가 아니라면, x의 타입은 반드시 string일 것입니다.

    때로는 유니언의 모든 멤버가 무언가 공통적으로 가질 수도 있습니다.
    예를 들어, 배열과 문자열은 둘다 slice 메서드를 내장합니다. 
    유니언의 모든 멤버가 어떤 프로퍼티를 공통으로 가진다면, 좁히기 없이도 해당 프로퍼티를 사용할 수 있게 됩니다.
*/
function getFirtThree(x: number [] | string){
    return x.slice(0, 3); // ok
}

/*
    ### 타입 별칭
    똑같은 타입을 한 번 이상 재사용하거나 또 다른 이르으로 지정하고자 하는 겨우 타입 별칭을 사용합니다.
*/
type Point = {
    x: number;
    y: number;
}
function printCoord2(pt: Point){
    console.log("TA - The coordinate's x value is " + pt.x);
    console.log("TA - The coordinate's y value is " + pt.y);
}
printCoord2({x: 100, y: 200});
// 타입 별칭을 사용하면 단지 객체 타입뿐이 아닌 모든 타입에 대하여 새로운 이름을 부여할 수 있습니다.
// 예를 들어, 아래와 같이 유니언 타입에 대하여 타입 별칭을 부여할 수도 있습니다.
type ID = number | string;
/*
    타입 별칭은 단지 별칭에 지나지 않는다는 점에 유의하시기 바랍니다.
    즉, 타입 별칭을 사용하여도 동일 타입에 대하여 각기 구별되는 "여러 버전"을 만드는 것이 아닙니다.
    별칭을 사용하는 것은, 별도로 이름 붙인 타입을 새로 작성하는 것입니다.
    다시 말해, 아래 코드는 틀린 것처럼 보일 수 있지만, TypeScript에서는 이것이 정상인데 그 이유는 각각의 타입들이 동일 타입에 대한 별칭들이기 때문입니다.

    type UserInputSanitzedString = string;
function sanitizeInput(str: string): UserInputSanitzedString{
    return sanitize(str);
}
let userInput = sanitizeInput(getInput());
userInput = "new input";
*/

/*
    ### 인터페이스
    인터페이스 선언은 객체 타입을 만드는 또 다른 방법입니다.
*/
interface Point2{
    x: number;
    y: number;
}
function printCoord3(pt: Point2){
    console.log("IF - The coordinate's x value is " + pt.x);
    console.log("IF - The coordinate's y value is " + pt.y);
}
printCoord3({x: 300, y: 400});
/*
    타입 별칭을 사용한 경우와 마찬가지로, 위 예시 코드는 마치 타입이 없는 임의의 익명 객체를 사용하는 것처럼 동작합니다.
    TypeScript는 오직 printCoord3에 전달된 값의 구조에만 관심을 가집니다. 즉, 예측된 프로퍼티를 가졌는지 여부만을 따집니다.
    이처럼, 타입이 가지는 구조와 능력에만 관심을 가진다는 점은 TypeScript가 구조적 타입 시스템이라고 불리는 이유입니다.
*/

/*
    타입 별칭과 인터페이스의 차이점
    interface가 가지는 대부분의 기능은 type에서도 동일하게 사용 가능합니다.
    이 둘의 가장 핵심적인 차이는, 타입은 새 프로퍼티를 추가하도록 개방될 수 없는 반면, 인터페이스의 경우 항상 확장될 수 있다는 점입니다.
    interface는 기존 인터페이스에 새 필드 추가가 가능하지만, type은 생성한 뒤에 달라질 수 없다.
*/

interface Animal{
    name: string;
}
interface Bear extends Animal{ // 인터페이스 확장
    honey: boolean;
}
const bear = {name: "IF bear", honey: true};
console.log("IF bear - name:" + bear.name + ", honey:" + bear.honey);

// --------------------------------
type Animal2 = {
    name: string;
}

type Bear2 = Animal2 & {
    honey: boolean;
}
const bear2 = {name: "TY bear", honey: false};
console.log("TY bear - name:" + bear2.name + ", honey:" + bear2.honey);

/*
    * TypeScript 2.3 이번 버전에서는, 타입 별칭 이름이 오류 메시지에 나타날 수 잇고, 때로는 동등학 익명 타입을 대신하여 나타날 수 있습니다.
    (이 경우 바람직할 수도 있고 아닐 수도 있습니다.) 인터페이스는 항상 오류 메시지에 이름이 나타납니다.
    * 타입 별칭은 선언 병합에 포함될 수 없지만, 인터페이스는 포함될 수 있습니다.
    * 인터페이스는 오직 객체의 모양을 선언하는 데에만 사용되며, 기존의 원시 타입에 별칭을 부여하는 데에는 사용할 수는 없습니다.
    * 인터페이스의 이름은 항상 있는 그대로 오류 메시지에 나타납니다. 단, 이는 오직 코드상에서 해당 인터페이스가 이름으로 사용되었을 때에만 해당됩니다.

    대부분의 경우 개인적 선호에 따라 인터페이스와 타입 중에서 선택할 수 있으며, 필요하다면 TypeScript가 다른 선택을 제안할 것입니다.
    잘 모르겠다면, 우선 interface를 사용하고 이후 문제가 발생하였을 때 type을 사용하기 바랍니다.
*/

/*
    ### 타입 단언
    TypeScript보다 개발자가 어떤 값의 타입에 대한 정보를 더 잘아는 경우 타입 단언을 사용하여 타입을 좀 더 구체적으로 명시할 수 있습니다.

    const myCanvas = ducument.getElementById("main_canvas") as HTMLCanvaseElement;

    타입 표기와 마찬가지로, 타입 단언은 컴파일러에 의해 제거되며 코드의 런타임 동작에는 영향을 주지 않습니다.
    (타입 단언이 틀렸더라도 예외가 발생하거나 null이 생성되지 않을 것입니다.)
    꺾쇠괄호를 사용하는 것 또한 (코드가 .tsx  파일이 아닌 경우) 가능하며, 이는 동일한 의미를 가집니다.
    const myCanvas = <HTMLCanvasElement>document.getelementById<"main_canvas");

    TypeScript에서는 보다 구체적인 또는 덜 구체적인 버전의 타입으로 변환하는 타입 단언만이 허용됩니다.
    이러한 규칙은 아래와 같이 "불가능한" 강제 변환을 방지합니다.

    const x = "hello" as number; 
    // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

    이 규칙은 때로는 지나치게 보수적으로 작용하여, 복잡하기는 하지만 유효할 수 있는 강제 변환이 허용되지 않기도 합니다.
    이런 경우, 두 번의 단언을 사용할 수 있습니다. any(도는 이후에 소개발 unknown)로 우선 변환한 뒤, 그 다음 원하는 타입으로 변환하면 됩니다.
    const a = (expr as any) as T;
*/

/*
    ### 리터럴 타입
    string과 number와 같은 일반적인 타입 이외에도, 구체적인 문자열과 숫자 값을 타입 위치에 지정할 수 있습니다.
*/
let changingString = "Hello World";
changingString = "Ol Mundo";
// 변수 'changingString'는 어떤 문자열이든 나타낼 수 있으며,
// 이는  TypeScript의 타입 시스템에서 문자열 타입을 변수를 다루는 방식과 동일합니다.
changingString; // string type

const constantString = "Hello World";
// 변수 'constantString'는 오직 한 종류의 문자열만 나타낼 수있으며,
// 이는 리터럴 타입의 표현 방식 입니다.
constantString; // const string

// 리터럴 타입은 그 자체만으로는 그다지 유의미하지 않습니다.
let xxx: "hello" = "hello";
xxx = "hello"; // ok
//xxx = "hobby"; // error - Type '"howdy"' is not assignable to type '"hello"'.

/*
    단 하나의 값만을 가질 수 있는 변수는 그다지 쓸모가 없죠!
    하지만 리터럴을 유니언과 함께 사용하면, 보다 유용한 개념들을 표현할 수 있게 됩니다.
    예를 들어, 특정 종류의 값들만을 인자로 받을 수 있는 함수를 정의하는 경우가 있습니다.
*/
function printText(s: string, alignment: "left" | "right" | "center"){
    // ...
}
printText("Hello, World", "left"); // ok
// printText("Good Day", "centre"); // error - Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

// 숫자 리터럴 타입 또한 같은 방법으로 사용할 수 있습니다.
interface Option{
    width: number;
}
function configure(x: Option | "auto"){
    // ...
}
configure({width: 100}); // ok
configure("auto"); // ok
// configure("automatic"); // error - Argument of type '"automatic"' is not assignable to parameter of type 'Option | "auto"'.ts(2345)

// 또 하나의 리터럴 타입이 있습니다. 바로 boolean 리터럴 타입입니다. 오직 두 개의 타입만 존재하며, boolean 타입 자체는 사실 단지 true | false 유니언 타입의 별칭입니다.

/*
    리터럴 추론
    객체를 사용하여 변수를 초기화하면, TypeScript는 해당 객체의 프로퍼티는 이후에 그 값이 변화할 수 있다고 가정합니다.
*/
const obj2 = {counter: 0};
let sonmeCondition = true;
if(sonmeCondition){
    obj2.counter = 1;
}
/*
    기존에 값이 0 이었던 필드에 1을 대입하였을 때 TypeScript는 이를 오류로 간주하지 않습니다.
    이를 달리 말하면 obj.counter는 반드시 number 타입을 가져야 하며, 0 리터럴을 가질 수 없다는 의미입니다.
    왜냐하면 타입은 읽기 및 쓰기 두 동작을 결정하는 데 사용되기 때문입니다.

    동일한 사항이 문자열에도 적용됩니다.
    const req = {url: "https://example.com", method: "GET"};
    handleRequest(req.url, req.method); // error - rgument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

    뒤 예시에서 req.method는 string으로 추론되지, "GET"으로 추론되지 않습니다. 
    req의 생성 시점과 handleRequest의 호출 시점 사이에도 얼마든지 코드 평가가 발생할 수 있고, 이때 req.method에 "GUESS"와 같은 새로운 문자열이 대입될 수도 있으므로,
    TypeScript는 위 코드에 오류가 있다고 판단합니다.

    이러한 경우를 해결하는 데에는 두 가지 방법이 있습니다.

    1. 둘 중 한 위치에 타입 단언을 추가하여 추론 방식을 변경할 수 있습니다.
    // 수정 1
    const req = {url: "https://example.com", method: "GET" as "GET"};
    // 수정 2
    handleRequest(req.url, req.method as "GET");

    수정 1은 req.method가 항상 리터럴 타입 "GET"이기를 의도하며,
    이에 따라 해당 필드에 "GUESS"와 같은 값이 대입되는 경우를 미연에 방지하겠다는 것을 의미합니다.
    수정 2는 무슨 이유인지, req.method가 "GET"을 값으로 가진다는 사실을 알고 있다는 것을 의미합니다.

    2. as const를 사용하여 객체 전체를 리터럴 타입으로 변환할 수 있습니다.
    const req = {url: "https://exmple.com", method: "GET"} as const;
    handleRequest(req.url, req.method);
    as const 접미사는 일반적인 const와 유사하게 작동하는 데, 
    해당 객체의 모든 프로퍼티에 string 또는 number와 같은 보다 일반적인 타입이 아닌 리터럴 타입의 값이 대입되도록 보장합니다.
*/

/*
    ### null 과 undeinded
    https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#null%EA%B3%BC-undefined

*/

