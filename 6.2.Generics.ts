export {};

/*
    잘 정의되고 일관된 API뿐만 아닌 재사용 가능한 컴포넌트를 구축하는 것도 소프트웨어 엔지니어링에서의 주요한 부분입니다.
    현재의 데이터아 미래의 데이터 모두를 다룰 수 있는 컴포넌트는 거대한 소프트웨어 시스템을 구성하는 데 있어 가장 유연한 능력을 제공할 것입니다.

    C#과 Java 같은 언어에서, 재사용 가능한 컴포넌트를 생성하는 도구상자의 주요 도구 중 하나는 제네릭입니다.
    즉, 단일 타입이 아닌 다양한 타입에서 작동하는 컴포넌트를 작성할 수 있습니다.
    사용자는 제네릭을 통해 여러 타입의 컴포넌트나 자신만의 타입을 사용할 수 있습니다.

    제네릭의 Hello World
    아래 identity 함수는 인수로 무엇이 오던 그대로 반환하는 함수입니다.
    제네릭이 없다면 특정 타입을 주어야 합니다.
*/
function identity(arg: number): number{
    return arg;
}

/*
    또는 any 타입을 사용하여 identity 함수를 기술할 수 있습니다.
*/
function identity2(arg: any): any{
    return arg;
}
/*
    any를 쓰는 것은 함수의 arg가 어떤 타입이든 받을 수 있다는 점에서 제네릭이지만, 실제로 함수가 반환될 때 어떤 타입인지에 대한 정보는 잃게 됩니다.
    만약 number 타입은 넘긴다 해도 any 타입이 반환된다는 정보만 얻을 뿐입니다.

    대신 무엇이 반환되는지 표시하기 위해 인수의 타입을 캡쳐할 방법이 필요합니다.
    여기서는 값이 아닌 타입에 적용되는 타입 변수를 사용할 것입니다.
*/
function identity3<Type>(arg: Type): Type{
    return arg;
}
/*
    identity 함수에 Type이라는 타입 변수를 추가했습니다. Type은 유저가 준 인수의 타입을 캡처하고, 이 정보를 나중에 사용할 수 있게 합니다.
    여기에서는 Type을 반환 타입으로 다시 사용합니다. 인수와 반환 타입은 같은 타입을 사용하고 있는 것을 확인할 수 있습니다. 
    이를 통해 타입 정보를 함수의 한쪽에서 다른 한쪽으로 운반할 수 있게끔합니다.

    이 버전의 identity 함수는 타입을 불문하고 동작하므로 제네릭이라 할 수 있습니다.
    any를 쓰는 것과 다르게 인수와 반환 타입에 number를 사용한 첫 번째 identity 함수만큼 정확합니다.(즉, 어떤 정보도 잃지 않습니다.)

    일단 제네릭 identity 함수를 작성하고 나면, 두 가지 방법 중 하나로 호출할 수 있습니다.
    첫 번째 방법은 함수에 타입 인수를 포함한 모든 인수를 전달하는 방법입니다.
*/
let output = identity3<string>('myString'); // let output: string
/*
    두 번재 방법은 타입 인수 추론을 사용합니다. 즉, 전달하는 인수에 따라서 컴파일러가 Type의 값을 자동으로 정하게 하는 것입니다.
    인수 추론은 코드를 간결하고 가독성 있게 하는 데 있어 유용하지만 더 복잡한 예제에서 컴파일러가 타입을 유추할 수 없는 경우엔 명시적으로 타입 인수 전달이 필요할 수도 있습니다.
*/
let output2 = identity3('mystring');    // let output: string

/*
    ### 제네릭 타입 변수 작업
    제네릭을 사용하기 시작하면, identity와 같은 제네릭 함수를 만들 때, 컴파일러가 함수 본문에 제네릭 타입화된 매개변수를 쓰도록 강요합니다.
    즉, 이 매개변수들은 실제로 any나 모든 타입이 될 수 있는 것처럼 취급할 수 있게 됩니다.
    
    ### 제네릭 타입
    함수 자체의 타입과 제네릭 인터페이스를 만드는 방법에 대해 살펴보겠습니다.

    제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 비-제네릭 함수의 타입과 비슷합니다.
*/
function identity4<Type>(arg: Type): Type{
    return arg;
}
let myIdentity: <Type>(arg: Type) => Type = identity4;
// 또한 타입 변수의 수와 타입 변수가 사용되는 방식에 따라 타입의 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있습니다.
let myIdentity2: <Input>(arg: Input) => Input = identity4;
// 제네릭 타입을 객체 리터럴 타입의 함수 호출 시그니처로 작성할 수도 있습니다.
let myIdentity3: { <Type>(arg: Type): Type } = identity4;

// 이것들로 첫 번째 제네릭 인터페이스를 작성할 수 있습니다. 앞의 예제의 객체 리터럴 인터페이스로 가져옵니다.
interface GenericIdentityFn{
    <Type>(arg: Type): Type;
}
function identity5<Type>(arg: Type): Type{
    return arg;
}
let myIdentity4: GenericIdentityFn = identity5;
/*
    비슷한 예제에서, 제네릭 매개변수를 전체 인터페이스의 매개변수로 옮기고 싶을지도 모릅니다.
    이를 통해 제네릭 타입을 확인할 수 있습니다. (예 - Dictionary가 아닌 Dictionay<string>). 
    이렇게 하면 인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있습니다.
*/
interface GenericIdentityFn2<Type>{
    (arg: Type): Type;
}
function identity6<Type>(arg: Type): Type{
    return arg;
}
let myIdentity5: GenericIdentityFn2<number> = identity6;
/*
    예제에 아주 작은 변화가 있었습니다. 
    제네릭 함수를 작성하는 것 대신 제네릭 타입의 일부인 비-제네릭 함수 시그니처를 가집니다. 
    GenericIdentityFn 함수를 사용할 때, 시그니처가 사용할 것을 효과적으로 제한할 특정한 타입 인수가 필요합니다 (여기서는 number). 
    타입 매개변수를 호출 시그니처에 바로 넣을 때와 인터페이스 자체에 넣을 때를 이해하는 것은 타입의 제네릭 부분을 설명하는 데 도움이 됩니다.

    제네릭 인터페이스 외에도 제네릭 클래스를 만들 수 있습니다. 제네릭 열거형과 네임스페이스는 만들 수 없습니다.
*/

/*
    ### 제네릭 클래스
    제네릭 클래스와 제네릭 인터페이스는 형태가 비슷합니다. 
    제네릭 클래스는 클래스 이름 뒤에 꺾쇠괄호(<>) 안쪽에 제네릭 타입 매개변수 목록을 가집니다.
*/
class GenericNumber<NumType>{
    zeroValue?: NumType;
    add?: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y){
    return x + y;
};
console.log('GenericNumber<number>:'+ myGenericNumber.add(100, 50));
// 이것은 GenericNumber 클래스의 문자 그대로 사용하지만 number 타입만 쓰도록 제한하는 것은 없습니다. 
// 대신 string이나 훨씬 복잡한 객체를 사용할 수 있습니다.
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "_";
stringNumeric.add = function(x, y){
    return x + y;
};
console.log('GenericNumber<string>:' + stringNumeric.add(stringNumeric.zeroValue, "test"));
/*
    인터페이스와 마찬가지로 클래스 자체에 타입 매개변수를 넣으면 클래스의 모든 프로퍼티가 동일한 타입으로 동작하는 것을 확인할 수 있습니다.
    클래스에서 다뤘던 것처럼 클래스는 두 가지 타입을 가집니다: 정적 측면과 인스턴스 측면. 
    제네릭 클래스는 정적 측면이 아닌 인스턴스 측면에서만 제네릭이므로 클래스로 작업할 때 정적 멤버는 클래스의 타입 매개변수를 쓸 수 없습니다.
*/

/*
    ### 제네릭 제약조건
    앞쪽의 예제를 기억한다면 특정 타입들로만 동작하는 제네릭 함수를 만들고 싶을 수 있습니다. 
    앞서 loggingIdentity 예제에서 arg의 프로퍼티 .length에 접근하기를 원했지만, 컴파일러는 모든 타입에서 .length 프로퍼티를 가짐을 증명할 수 없으므로 경고합니다.

function loggingIdentity<Type>(arg: Type): Type {
    console.log(arg.length);    // error - Property 'length' does not exist on type 'Type'.
    return arg;
}

    any와 모든 타입에서 동작하는 대신에, .length 프로퍼티가 있는 any와 모든 타입들에서 작동하는 것으로 제한하고 싶습니다. 
    타입이 이 멤버가 있는 한 허용하지만, 최소한 .length 가 있어야 합니다. 
    그렇게 하려면 Type 가 무엇이 될 수 있는지에 대한 제약 조건을 나열해야 합니다.
    이를 위해 우리의 제약조건이 명시하는 인터페이스를 만듭니다. 
    여기 하나의 프로퍼티 .length를 가진 인터페이스를 생성하였고, 우리의 제약사항을 extends 키워드로 표현한 인터페이스를 이용해 명시합니다:
*/
interface Lengthwise{
    length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type{
    console.log(arg.length);
    return arg;
}
// 제네릭 함수는 이제 제한되어 있기 때문에 모든 타입에 대해서는 동작하지 않습니다:
// loggingIdentity(3); // error - Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.ts(2345)
// 대신 필요한 프로퍼티들이 있는 타입의 값을 전달해야 합니다.
loggingIdentity( {length: 10, value: 3});

/*
    ### 제네릭 제약조건에서 타입 매개변수 사용
    다른 타입 매개변수로 제한된 타입 매개변수를 선언할 수 있습니다. 
    이름이 있는 객체에서 프로퍼티를 가져오고 싶은 경우를 예로 들어 봅시다. 
    실수로 obj에 존재하지 않는 프로퍼티를 가져오지 않도록 하기 위해 두 가지 타입에 제약조건을 두었습니다.
*/
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key){
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4};
getProperty(x, "a");    //ok
// getProperty(x, "m");    // error - Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.ts(2345)

/*
    ### 제네릭에서 클래스 타입 사용
    제네릭을 사용하는 TypeScript에서 팩토리를 생성할 때 생성자 함수로 클래스 타입을 참조해야 합니다. 
    예를 들면:
*/
function create<Type>(c: { new (): Type }): Type{
    return new c();
}
// 고급 예제에서는 prototype 프로퍼티를 사용하여 생성자 함수와 클래스 타입의 인스턴스 사이의 관계를 유추하고 제한합니다.
class BeeKeeper{
    hasMask: boolean;
}
class ZooKeeper{
    nametag: string;
}
class Animal{
    numLegs: number;
}
class Bee extends Animal{
    keeper: BeeKeeper;
}
class Lion extends Animal{
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A):A{
    return new c();
}
// 이 패턴은 mixins 디자인 패턴을 만드는 데에 사용되었습니다.