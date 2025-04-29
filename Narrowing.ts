export {};

//padLeft 라는 함수가 있다고 해보자.
function padLeft(padding: number | string, input: string): string{
    throw new Error("Not implementd yes!");
}

/*
    padding이 number이면 input은 앞에 추가하려는 스페이스의 개수로 다룰 것이다.
    padding이 string이면 input에는 padding 값을 적용하려는 것으로 간주할 것이다.
    number 값을 전달했을 때의 로직은 다음과 같다.
*/
function padLeft2(padding: number | string, input: string): string{
    //return new Array(padding +1).join(' ') + input;     // Operator '+' cannot be applied to types 'string | number' and 'number'.
    return ""; //dummy
}
/*
    padding + 1에 대해서 에러가 발생한 것을 볼 수 있다.
    TypeScript는 number | string 타입에 들어갈 자리에 number 타입의 변수에만 적용 가능한 연산이 있다는 것을 알고 경고하는 것이다.
    다시 말해, padding이 number 타입임을 명시적으로 작성하지 않으며, padding이 string 타입일 때를 처리할 수 없으므로 이러한 에러가 발생되는 것이다.
    코드를 수정해보다.
*/
function padLeft3(padding: number | string, input: string)/* : string */{
    if(typeof padding == 'number'){
        return new Array(padding +1).join(' ') + input;
    }
    return padding + input;
}
/*
    TypeScript의 타입 시스템은 타입에 대한 안정성을 얻기 위해, 왜곡하지 않는 일반적인 JavaScript 코드를 가능한 한 쉽게 작성할 수 있도록 하는 것을 목표로 한다.
    if 조건문 내에서, TypeScript가 typeof padding == 'number'를 트랜스파일할 때, 이를 타입 가드(type guard)라고 불리는 특별한 형태의 코드로 이해하여 처리한다.
    타입스크립트는 주어진 위치에서 가능한 구체적인 타입을 분석하기 위해, 프로그램의 실행 경로를 추적하여 따라간다.
    이러한 특별한 분석 방법과 타입의 할당은 내로잉(narrowing)이라고 부른다.
*/

/*
    ### typeof type guards
    JavaScript는 런타임에 평가되는 타입에 대한 매우 기초적인 정보를 반환해주는 typeof 연산자를 지원한다.
    TypeScript는 이 결과가 다음 중 하나일 것이라고 기대한다.
    "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"
    서로 다른 분기점 내에서 타입을 내로잉잉하기 위해 TypeScript는 이 typeof를 잘 이해할 수 있다.
    TypeScrip에서 typeof에 의해 반환된 값을 체크하는 것을 타입 가드라고 부른다.
    TypeScript는 typeof의 동작 방식을 인코딩한다.
*/
function printAll(strs: string | string [] | null){
    if (typeof strs === 'object'){
        /* for(const s of strs){ // 'strs' is possibly 'null'
            // object is possible 'null'
            console.log(s);
        }*/
    }else if(typeof strs === 'string'){
        console.log(strs);
    }else{
        // do nothing
    }
}
/*
    strs가 배열 타입인지 확인하기 위해서 typeof의 결과가 object인지를 체크하려 한다.(JavaScript에서 배열은 object이다)
    하지만 JavaScript에서 typeof null의 결과는 "object" 타입이라는 문제가 있다.
*/

/*
    ### Truthiness Narrowing
*/
function getUsersOnlineMessage(numUsersOnline: number){
    if(numUsersOnline){
        return `Thre ara ${numUsersOnline} online now!`;
    }
    return `Nobody's here. :(`;
}
/*
    JavaScript에서 if와 같은 구조문은 조건 부분을 먼저 boolean 형태로 강제 변환한다.
    그리고나서, 그 boolean 값이 ture, false 값인지에 따라 분기를 진행한다.
    이 때 주로 변환되는 조건 데이터는 다음과 같다.
    0, NaN, ''(빈 문자열), 0n(숫자 0의 bigint 버전), null, undefined
    이 목록의 값들은 모두 false로 변환되며, 나머지는 모두 true로 변환된다.
    이런 방식은 특정 값에 Boolean 함수를 사용하거나, 더블 블린 네게이션(Double-Booelan negation)을 이용하여 강제 변환하는 것과 같다.
    (후자를 사용하면 TypeScript가 더욱 좁은 리터럴 불린 타입을 추론한다는 이점이 있다. 다시 말해 전자가 boolean이라는 타입 추론된다면, 후자는 true타입 혹은 false 타입이 된다.)

    아래 두 가지 모두 결과는 'true'이지만 다른 타입을 가진다.
*/
Boolean('hello')    // type: booelan,   value: true
//!!'hello';        // type: true,      value: true
// 이러한 방식은 특히 null, undefined 값을 가드할 때 흔히 쓰이는 방법이다.
function printAll2(strs: string | string [] | null){
    if(strs && typeof strs === 'object'){
        for(const s of strs){
            console.log(s);
        }
    }else if(typeof strs === 'string'){
        console.log(strs);
    }
}
printAll2("printAll2-1");
printAll2('');
printAll2(null);
printAll2(["printall2-2", "printall2-3"]);

/*
    &&를 이용하여 strs 탕비 truthy인지를 체크함으로써 기존에 발생하던 에러(Object is possible 'null'.)를 제거해 주었다.
    이는 적어도 다음과 같은 로류는 방지할 수 있다.
    TypeError : null is not iterable

    원시형에 대한 truthness 체크는 종종 오류가 발생할 수 있음을 명심하자.
    예들 들어, printAll을 다음과 같이 작성하면 문제가 발생한다.
*/
function printAll3(strs: string | string [] | null){
    if(strs){
        if(typeof strs === 'object'){
            for(const s of strs){
                console.log(s);
            }
        }else if(typeof strs === 'string'){
            console.log(strs);
        }
    }
}
printAll3("printAll3-1");
printAll3('');
printAll3(null);
printAll3(["printall3-2", "printall3-3"]);
/*
    위 코드에서 truth 체크를 위해 함수의 몸체를 if 문으로 감쌌다.
    하지만 이러한 방식은 잠재적인 문제점을 가지고 있다. 그 문제점이란 빈 문자열을 처리할 수 있다는 것이다.

    린터를 활용하여 이러한 상황을 미리 예측할 수 있다.
    아래 예제와 같이 ! 기호로 truthy 내로잉(false 인지를 체크)을 처리할 수도 있다.
    아래 예제에서 boolean negation을 사용하는 이유는 values에 undefined 값이 할당되었을 경우를 처리하기 위함이다.
*/
function multiplyAll(
    values: number [] | undefined,
    factor: number
): number[] | undefined {
    if(!values){
        return values;
    }else{
        return values.map((x) => x*factor);
    }
}

/*
    ### Equality narrowing
    TypeScript는 switch 문과 ===, ==, !==, != 을 사용하여 이퀄리티 내로잉을 처리할 수 있다.
*/
function example(x: string | number, y: string | boolean){
    if(x === y){
        x.toUpperCase();
        y.toUpperCase();
    }else{
        console.log(x);
        console.log(y);
    }
}
/*
    x와 y가 서로 같다는 것을 체크한 뒤에는, TypeScript가 그 둘의 타입도 같다는 것을 알게 된다.
    문자열 타입이 x와 y의 공통 타입이기 때문에, TypeScript는 첫번째 if분기 내에서 반드시 이 두 값은 문자열일 것이라는 사실을 아는 것이다.
    특정 리터럴값(변수와 상반되는)을 체크하는 것도 잘 동작한다.
    
    우리는 truthness narrowing 섹션에서 빈 문자열을 제대로 처리할 수 없었던 printAll3 함수 예제를 작성했다.
    이렇ㄴ 잠재적인 문제를 안고 있는 방식을 사용하는 대신, 
    우리는 null이 아닌 경우에만 함수 몸체를 동작시키는 조건문을 사용하여 TypeScript가 알맞게 strs의 타입으로부터 null을 제외하여 처리하도록 만들 수 있다.
*/
function printAll4(strs: string | string[] | null){
    if(strs !== null){
        if(typeof strs === 'object'){
            for(const s of strs){
                console.log(s);
            }
        }else if(typeof strs === 'string'){
        console.log(strs);
        }
    }
}
printAll4("printAll4-1");
printAll4('');
printAll4(null);
printAll4(["printall4-2", "printall4-3"]);

/*
    ### The 'in' Operator Narrowing
    JavaScript는 in이라는 오브젝트가 특정 프로퍼티를 가지고 있는지 알 수 있는 연산가를 가지고 있다.
    TypeScript는 이를 잠재적인 타입으로 내로잉 하는데 사용한다.
*/
type Fish = {swim: () => void};
type Bird = {fly: () => void};

function move(animal : Fish | Bird){
    if('swim' in animal){
        return animal.swim();
    }
    return animal.fly();
}
/*
    만약 옵셔널 프로퍼티를 갖는 오브젝트 타입 A를 부여받은 오브젝트 B가 있다고 하자.(B: A)
    B에 대해 if와 in으로 분기하는 내로잉을 실행(in 뒤에 B를 기재하고 앞에는 A의 옵셔널 프로퍼티 문자열을 기재)하면 if문 참/거짓 양쪽 모두 그 프로퍼티가 인정되므로,
    (해당 프로퍼티가 있을 수도 있고 없을 수도 있으므로) 참/거짓 양쪽 내부에는 B는 A타입이 될 수 있다.
    예를 들어 인간(human)은 옵셔널이긴 하지만 수영도 할수 있으며 (적절한 장비가 있으면) 날 수도 있다.
    따라서 if와 in으로 분기 시 true와 false의 양쪽 모두에 이 타입이 사용 가능하다고 표시될 것이다.
*/

type Fish2 = {swim: () => void};
type Bird2 = {fly: () => void};
type Human = {swim?: () => void, fly?: () => void, talk?: () => void};

function move2(animal: Fish2 | Bird2 | Human){
    if('swim' in animal){   // Fish | Human
        animal
        if('talk' in animal){ // Human
            animal
        }
    }

    // Bird : Human
    animal
}

/*
    ### 'instanceof' Narrowing
    JavaScript는 어떤 값이 다른 값의 인스턴스인지를 검사하는 연산자인 instanceof를 가지고 있다.
    좀 더 정확히 말하자면, x instanceof Foo는 x의 프로토타입 체인이 Foo.prototype을 포함하고 있는지 체크한다.
    instanceof 또한 타입 가드로 동작한다.
    TypeScript는 instanceof를 활용하는 분기문에서 내로잉을 실행한다.
*/
function logValue(x: Date | string){
    if(x instanceof Date){  // Date type
        console.log(x.toUTCString);
    }else{  // string type
        console.log(x.toUpperCase);
    }
}

/*
    ### Assignments
    우리가 어떤 변수를 등록하려 할때마다 TypeScript는 우변의 값을 확인하고 좌변의 식별자에 대해 내로잉을 실행한다.
*/
let x = Math.random() < 0.5 ? 10 : 'hello world';
// let x : string | number
console.log(x);

x = 1;
console.log(x);
// let x:number

x = 'goodbye';
console.log(x);
// let x: string

// x = true; // error - Type 'boolean' is not assignable to type 'string | number'.ts(2322)
/*
    각 할당이 유효하다는 것에 주목하자.
    x의 타입이 첫번재 할당에 의해 숫자 타입으로 바뀌었음에도 불구하고, 우리는 여전히 그 X에 문자열을 할당할 수 있다.
    이는 x에 처음 할당된 타입이 string | number이기 때문이다.
    다시 말해 타입 할당 가용성은 처음 선언된 타입에 따라 정해지는 것이다.
    만약 우리가 x에 boolean 타입을 할당하려하면 에러가 발생할 것이다.
*/

/*
    ### Control Flow Analysis
*/
function padLeft4(padding: number | string, input: string){
    if(typeof padding === 'number'){
        return new Array(padding +1).join(' ') + input;
    }
    return padding + input;
}
/*
    padLeft4는 첫번째 if 블럭에서 값을 반환한다.
    TypeScript는 이 코드를 분석할 수 있으며, padding의 타입이 숫자 타입인 경우, 첫번째 반환문 아래의 나머지 부분은 도달할 수 없는 것을 알고 있다.
    결과적으로, 함수의 나머지 부분을 처리할 때, padding의 타입에서 number 타입을 제거할 수 있게 된 것이다. (string | nubmer에서 strintg으로 narrowing)

    도달 가능성에 기반한 이러한 코드의 분석을 제어 흐름 분석(control flow analysis)이라 부른다.
    TypeScript는 타입 가드 구현, 타입 할당 처리 시 타입을 내로잉하기 위해 이 흐름 분석을 사용한다.
    변수의 분석이 완료되면 제어 흐름은 갈라지고 다시 병합되는 것을 반복한다.
    그 결과 특정 변수는 각 지점별로 다른 타입을 가질 수 있게 되는 것이다.
*/
function exmaple4(){
    let x: string | number | boolean;
    
    x = Math.random() < 0.5;    // let x: boolean
    
    if(Math.random() < 0.5){
        x = 'hello'; // let x: string;
    }else{
        x = 100; // let x: number
    }
    return x; // let x: string | number
}

/*
    ### Using Type predicates
    우리는 지금까지 내로잉을 처리하기 위해 이미 존재하는 JavaScript 구조체를 사용하였다.
    한편 코드 내에서 타입이 변하는 것에 대해 더 욱 많은 제어가 가능하길 원하는 경우도 있을 것이다.
    사용자 정의 타입 가드를 정하기 위해서는, 우리는 간단히 타입 명제(type predicate)을 반환하는 타입으로 하는 함수를 정의하면 된다.
*/
type Fish3 = {swim: () => void};
type Bird3 = {fly: () => void};

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
/*
    'pet is Fish'가 이 예제의 타입 명제다.
    이 명제는 parameterName is Type 형태이며, parameterName은 현재 함수 선언부의 매개변수 이름과 반드시 같아야 한다.
    'isFish()'가 매개변수와 함께 호출될 때마다, TypeScript는 그 매개변수를 특정 타입으로 내로잉할 것이다.(기존 타입과 호환된다면)
*/
function getSmallPet(): Fish3 | Bird3{
    if(Math.random() < 0.5){
        return {swim: () => console.log('swimming...')};
    }else{
        return {fly: () => console.log('flying...')};
    }
};

let pet = getSmallPet();
if(isFish(pet)){
    pet.swim();
}else{
    pet.fly();
}
/*
    TypeScript가 if 분기에서 pet이 Fish임을 아는 것뿐만 아니라, else 분기에서는 어떤 타입일지(Bird) 아는 것에 주목하자.
    다시 말해 pet 매개변수는 Fish가 아니면 Bird임을 아는 것이다.
    isFish라는 사용자 정의 타입 가드를 사용하여 Fish | Bird라는 배열에서 필터링하고 Fish라는 단일 요소의 배열을 얻을 수 있다.
*/
type Fish4 = {id: number; name: string; swim: () => void};
type Bird4 = {id: number; name: string; fly: () => void};

function isFish2(pet: Fish4 | Bird4): pet is Fish4{
    return (pet as Fish4).swim !== undefined;
}

function getSmallPet2(): Fish4 | Bird4 {
    if(Math.random() < 0.5){
        return {
            id: Math.floor(Math.random() * 100),
            name: 'killer whale',
            swim: () => console.log('swimmming2...')
        };
    }else{
        return {
            id: Math.floor(Math.random() * 100),
            name: 'redhawk',
            fly: () => console.log('flying2...')
        }
    }
};

const zoo: (Fish4 | Bird4)[] = [getSmallPet2(), getSmallPet2(), getSmallPet2()];
console.log(zoo);
const underwater1: Fish4[] = zoo.filter(isFish2);
console.log(underwater1);
//const underwater2: Fish4[] = zoo.filter(isFish2) as Fish4[];
//console.log(underwater2);
/*
const underwater3: Fish4[] = zoo.filter(myPet): myPet is Fish4 => {
    if(myPet.name === 'sharkey') return false;
    return isFish(pet);
}
*/

/*
    ### Discriminated Unions
    kind라는 필드를 사용하여, 우리가 다루고 있는 도형이 어떤 것인지를 말하려고 한다. 이런 맥작으로 Shape를 정의해 보자.
*/
interface Shape{
    kind: 'circle' | 'square';
    radius?: number;
    sideLength?: number;
}
/*
    kind 프로퍼티에 대해 'circle', 'square'라는 문자열 리터럴 유니온 타입을 사용,
    이는 Shape 인터페이스 타입을 갖는 요소가 원으로 동작할지 정사각형으로 동작할지를 말해주는 것이다.
    이렇게 문자열 타입 대신 문자열 리터럴 유니온 타입을 사용함으로써, 우리는 오타 등의 실수를 방지할 수 있다.

    function handleShape(shape: Shape){
        if(shape.kind ==='rect'){   // error -This comparison appears to be unintentional because the types '"circle" | "square"' and '"rect"' have no overlap.ts(2367)
            //...
        }
    }

    function getArea(shape: Shape){
        return Math.PI * shape.radius ** 2; // error - object is possible 'undefined'
    }

    strictNullChecks가 켜져있는 상태에서는 위와 같이 에러가 발생한다.
    이는 radius가 정의되어있지 않을 가능성이 있기 때문이다.
    하지만 kind 프로퍼티에 대한 올바른 체크가 수행된다면 어떨까?

    function getAre2(shape: Shape){
        if(shape.kind === 'circle'){
            return Math.PI * shape.radius **2; // error - object is possible 'undefined'
        }
    }
    TypeScript는 여전히 여기서 어떤 작업을 해야할지 여전히 모르고 있다.
    그럼ㄴ 만약 null이 아님을 규정하는 non-null assertion(shape.radius 뒤에 !)을 사용하면 어떨까?

*/
function getAre2(shape: Shape){
    if(shape.kind === 'circle'){
        return Math.PI * shape.radius! **2; 
    }
}
/*
    작동하긴 하지만 뭔가 이성적으로 느껴지진 않는다.
    shape.radius가 정의된 것임을 강제하여 타입 채커에게 소리치는 것과 같기 때문에,
    만약 우리가 코드를 다른 곳으로 옮긱거나 한다면, 이 assertion도 에러의 원인이 될 수 있다.
    이에 더해 strictNullChecks가 적용되지 않은 상황이라면, 우리는 의도치 않게 그 필드들을 접근할 수 있게 될 것이다.
    (이는 옵셔널 프로퍼티가 그 프로퍼티를 읽을 때 항상 존재할 것이라고 가정하기 때문이다.)
    다시 말해, 우리는 더 좋은 방식으로 작성할 수 있어야 한다.

    이와 같은 Shape의 인코딩 문제는 타입 체커가 radius(혹은 sideLength)가 존재하는지 아닌지를 알 수 있는 방법이 없기 때문에 발생한 것이다.(옵셔널이기 때문에)
    따라는 우리는 타입 체커가 이를 알게 하기 위해 어떤 작업을 처리해주어야 한다.
*/
interface Circle{
    kind: 'circle';
    radius: number;
}
interface Square{
    kind: 'square';
    sideLength: number;
}
type Shape2 = Circle | Square;
/*
    이 예제에서, 우리는 Shape를 2개의 인터페이스 타입으로 분리시켰다.
    또한 kind 프로퍼티에 대해서는 다른 값을 적용하였으며, radius 및 sideLength는 각각의 영역으로 분리하여, 반드시 전달받아야 하는 필수 프로퍼티 값으로써 정의하였다.
    이제 radius를 Shape에서 접근하려면 어떤 일이 벌어지는지 살펴보자.
*/
function getArea3(shape: Shape2){
    if(shape.kind === 'circle'){
        return Math.PI * shape.radius ** 2; // ok
    }
}
/*
    드디어 에러가 사라졌다. 
    유니온 타입안의 모든 타입이 리터럴 타입으로써 공통의 프로퍼티를 가질 때, 
    TypeScript는 구별된 유니온(discriminated union)으로 간주하며, 유니온의 멤버를 내로잉하는데 성공했다.
    이 경우, kind는 공통의 프로퍼티(Shape 타입의 구별된 프로퍼티로 간주되는)다.
    kind 프로퍼티가 'circle' 임을 체크하으로써 Shape 내에서 그 외의 모든 타입을 제거한 것이다.
    switch 문도 이와 똑같은 체킹이 가능하다.
*/
function getArea4(shape: Shape2){
    switch(shape.kind){
        case 'circle':  // shape: Circle
            return Math.PI * shape.radius ** 2;
        case 'square':  // shape: Square
            return shape.sideLength ** 2;
    }
}
/*
    여기서 중요한 것은 Shape의 인코딩이다.
    위 예제에서 Circle과 Square는 kind라는 공통 필드를 가지고 있으며, 
    이 필드에 대해 서로 다른 타입으로 분리되었다는 사실을 TypeScript가 알 수 있도록 만들었는데, 이는 매우 중요하다.
    이렇게 함으로써 우리는 JavaScript라면 더욱 어려운 방식으로 구현해야 얻을 수 있었던 높은 수준의 타입 안정성을 가진 TypeScript 코드를 작성할 수 있었다.

    구별된 유니온 타입은 이 예제들에서 살펴보았던 원이나 정사각형 넓이를 구하는 것에 대해 이야기하면서 알게된 것보다 실제로는 더 유용하다.
    이 타입은 특히 JavaScript로 메시징 스킴을 구현할 때, 예를 들어 네트워크를 통해 메시지를 전달하거나,
    상태 관리 프레임워크에서 뮤테이션을 인코딩하는 등의 작업을 할 때 매우 좋다.
*/

/*
    ### The never Type & Exhausitiveness Checking
    내로잉할 때 어떤 타입이 될 수 있는 모든 가능성을 지워버려서 더 이상 그 어떤 타입도 될 수 없는 지점에서,
    TypeScript는 타입이 존재하지 않는 상태를 표현할 때 never 타입을 사용한다.
    never 타입은 모든 타입에 등록가능하다. 그러나 어떤 타입도 never 타입에 등록할 수 없다.(never 타입 그 자체를 제외하고)
    이는 switch 문에서 내로잉을 사용할 때, never에 의존하여 철저한(exhaustive) 검사를 수행할 수 있다는 것을 의미한다.
    예를 들어, getArea 함수의 switch문에 default를 추가하여, 그 default 부분에 never 타입의 변수를 두고 반환함으로써,
    모든 가능한 케이스에 대해 처리되지 않은 상태를 표시할 수 있다.
*/
type Shape3 = Circle | Square;
function getArea5(shape: Shape3){
    switch(shape.kind){
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
/*
    만약 아래와 같이 유니온 타입에 새로운 멤버를 추가하면, TypeScript는 에러를 발생시킬 것이다.
    
    interface Triangle{
        kind: 'triangle';
        sideLength: number;
    }
    type Shape4 = Circle | Square | Triangle;
    
    function getArea6(shape: Shape4){
        switch(shape.kind){
            case 'circle':
                return Math.PI * shape.radius ** 2;
            case 'square':
                return shape.sideLength ** 2;
            default:
                const _exhaustiveCheck: never = shape;  // error - Type 'Triangle' is not assignable to type 'never'.ts(2322)
                return _exhaustiveCheck;
        }
    }
*/