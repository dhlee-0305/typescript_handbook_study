export {};

/*
    JavaScript에서는 데이터를 그룹화하여 전달하는 기초적인 방법으로 오브젝트를 사용한다.
    TypeScript에서는 이를 object 타입으로 나타낸다.
    오브젝트 타입은 익명이 될 수 있다.
*/
function greet(person: {name: string, age: number}){
    return 'Hello ' + person.name;
}
// 또한 인터페이스나 타입 앨리어스를 사용하여 오브젝트 타입에 이름을 지을 수 도 있다.
interface Person{
    name: string;
    age: number;
}
function greet2(person: Person){
    return 'Hello ' + person.name;
}

type Person2 = {
    name: string;
    age: number;
};
function greet3(person: Person2){
    return 'Hello ' + person.name;
}
// 위의 모든 예제는 name이라는 프로퍼티(반드시 문자열 타입이어야 하는)와 age라는 프로퍼티(반드시 숫자 타입이어야 하는)를 갖는 오브젝트를 인수로 받는 함수에 대한 것이다.

/*
    ### Property Modifiers
    오브젝트 타입 내의 각 프로퍼티에 우리는 몇 가지 사항을 특정할 수 있다.
    예를 들어, 프로퍼티가 옵셔널인지, 아니면 프로퍼티가 읽기 전용인지 등을 특정할 수 있다.

    Optional Properties
    오브젝트의 특정 프로퍼티는 오브젝트를 사용할 때, 많은 경우 그 값이 설정되지 않을 수 있다.
    그러한 경우, 우리는 프로퍼티 이름에 오른쪽에 ? 기호를 표기함으로써 그 프로퍼티를 옵셔널로 지정할 수 있다.

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}
function paintShape(opts: PaintOptions){
    // ...
}
const shape = getShape();
paintShape({shape});
paintShape({shape, xPos: 100});
paintShape({shape, yPos: 100});
paintShape({shape, xPos: 100, yPos: 100});

    이 예제에서, xPos와 yPos는 모두 옵셔널로 간주된다.
    이 두 프로퍼티를 선택적으로 제공할 수 있으며, 그 아래의 모든 paintShape 호출을 적법하다.

    JavaScript에서는 프로퍼티의 값이 설정되지 않은 상태에서도 그 프로퍼티에 접근할 수 있다.
    다만 그 값이 undefined이며, 이러한 undefined를 적절히 처리해야한다.

function paintShape(opts: PaintOptions){
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
}

    JavaScript는 아래와 같이 함수에 어떤 인수가 특정되지 않을 경우에 대해 기본값을 설정하는 패턴을 지원한다.

function logShapeCoord({shape: xPos = 0, yPos = 0}): PaintOptions){
    console.log('x coordinate at ', xPos); // var xPos: number
    console.log('y coordinate at ', yPos); // var yPos: number
    // ...
}
    위 예제에서 paintShape 함수의 매개변수에 해체 패턴을 사용했다.
    그리고나서 xPos와 yPos에 기본값을 할당하였다.
    이제 xPos와 yPos는 둘다 paintShape의 몸체에서 분명하게 그 값이 존재한다고 볼 수 있지만, paintShape를 호출하는 모든 호출자에게는 옵셔널이다.
    (물론 number | undefined 타입이 아니라 number 타입으로 확정된다는 점은 기존의 옵셔널과 다르다.)

function draw({shape: Shape, xPos: number = 100 }){
    render(shape); // Cannot find name 'shape'. Did you mean 'Shape'?
    render(xPos); // Cannot find name 'xPos'
}
    현재는 해체 패턴 안쪽에 타입 주서을 사용할 수 있는 방법이 없다.
    해체 패턴 안에 콜론을 사용하면, 이는 인수의 식별자로 콜론 뒤의 이름을 지정하는 것이 되기 때문이다.

*/

/*
    ### readonly Properties
    TypeScript에서 특정 프로퍼티를 readonly로 표시할 수 있다.
    런타임에는 그 어떤 변경사항도 가하지 않지만, readonly로 표시된 프로퍼티는 타입 체킹 중에는 절대 다시 값을 할당할 수 없다.
*/
interface SomeType{
    // readonly prop: string;
    prop: string;
}
function doSomething(obj: SomeType){
    console.log(`prop has the value '${obj.prop}'.`);

    obj.prop = 'hello'; // (if readonly) error - Cannot assign to 'prop' because it is a read-only property.ts(2540)
}
doSomething({prop: 'hi'});
// readonly 모디파이어를 사용한다고 해서, 해당 프로퍼티 값이 완전히 불변한다는 것을 의미히지 않는다.
// 더 정확하게는 이 프로퍼티 자체가 다시 덮어쓸 수 없다는 것을 의미한다.

interface Home{
    readonly resident: {name: string, age: number};
}
function visitForBirthday(home: Home){
    // 'home.resident'는 읽을 수 있으며, 그 내부 프로퍼티를 업데이트 할 수 있다.
    home.resident.age++;
    console.log(`Happy birthday day ${home.resident.name}'s ${home.resident.age}th`);
}
visitForBirthday({resident: {name: 'David', age: 30}});
/*
function evict(home: Home){
    home.resident = {   // error - Cannot assign to 'resident' because it is a read-only property.ts(2540)
        name: Victor the Evictor",
        age: 42
    };
}
*/
/*
    readonly가 함축하는 것이 무엇인지를 관리하는 것은 중요하다.
    TypeScript로 개발하는 동안, 특정 오브젝트가 어떻게 사용되어야 하는지 그 의도를 알리는 것이 유용하기 때문이다.
    TypeScript는 아래 Person 타입의 프로퍼티들과 ReadonlyPerson 타입의 프로퍼티들이 서로 호환되는 지를 체크할 때,
    그 두 타입의 프로퍼티가 readonly인지의 여부를 고려하지 않으므로,
    wirtable한 프로퍼티(Person 인터페이스의 프로퍼티)의 변경을 통해, readonly로 등록된 프로퍼티의 값도 변경될 수 있다.    
*/
interface Person{
    name: string;
    age: number;
}
interface ReadonlyPerson{
    readonly name: string;
    readonly age: number;
}
let writablePerson: Person = {
    name: 'Person McPersonface',
    age: 42
};

let readonlyPerson: ReadonlyPerson = writablePerson;
console.log("readonlyPerson.age : " + readonlyPerson.age);
writablePerson.age++;
console.log("readonlyPerson.age : " + readonlyPerson.age);

/*
    ### Index Signature
    때때로, 특정 오브젝트 타입의 프로퍼티 이름을 모두 알지는 못하지만 그 값의 타입 혹은 그 모양(shape)을 아는 경우가 있다.
    그런 경우 당신은 인덱스 시그니처를 이용하여 가능한 값의 타입을 묘사할 수 있다.
*/
interface StringArray{
    //[index: number]: string;
    [index: string]: string;
}
function getStringArray(str: StringArray): StringArray{
    return str;
}
// const myArray: StringArray = getStringArray();
//const myArray: StringArray = getStringArray(['first', 'second']);
const myArray: StringArray = getStringArray({'one': 'first', 'two': 'second'});
//const secondItem = myArray[1]; // const secondItem: string
const secondItem = myArray['two']; // const secondItem: string
console.log("secondItem: " + secondItem);
/*
    위의 예제에서 우리는 인덱스 시그니처가 있는 StringArray 인터페이스를 갖는다.
    이 인덱스 시그니처는 StringArray 타입의 오브젝트가 number로 인덱싱 처리되었을 때(키의 타입이 number 일 때), 그 프로퍼티 값은 string 일 것이라고 선언하고 있는 것이다.
    
    인덱스 시그니처 프로퍼티의 타입(그 값의 타입이 아닌 식별자의 타입)은 반드시 string 혹은 number여야 한다.
    이 두 가지 타입의 인덱스를 혼합하여서도 사용할 수 있지만, 
    number 타입의 인덱스로 부터 반환받은 타입(아래 예제에서는 Animal)은 반드시 string 타입의 인덱스로부터 반환 받은 타입(아래 예제에서는 Dog)의 서브타입이어야 한다.
    이는 number로 인덱싱이 처리될 때, JavaScript가 그 number 타입을 string 타입으로 변환할 것이기 때문이다.
    이는 100이라는 숫자로 인덱싱할 때 "100"이라는 문자열로도 같은 인덱싱을 처리하여 두 타입이 일관성을 유지하려고 한다는 것을 의미한다.
    아래 예제에서는 Animal이 Dog의 서브타입이 아니므로 에러가 발생한다.(Animal과 Dog를 반대로 적용하면 성립한다.)
*/
interface Animal{
    name: string;
}
interface Dog extends Animal{
    breed: string;
}
interface NotOkay{
    // [x1: number]: Animal; // error - 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.ts(2413)
    [x2: string]: Dog;
    // [x3: number]: Dog;
}
/*
    문자열 타입의 인덱스 시그니처가 딕셔너리(dictionary) 패턴을 표현하는 강력한 방법인 한편, 모든 프로퍼티가 그 반환 타입에 반드시 매치되어야함을 강제하기도 한다.
    이는 문자열 인덱스로 값을 참조할 때, obj.property로도 가능하고 obj['property']라는 방식으로도 접근할 수 있기 때문이다.
    아래 예제에서, name의 타입은 문자열 인덱스 타입에 매치되지 않아 에러를 발생시킨다.
*/
interface NumberDictionary{
    [index: string]: number;
    length: number; // ok
    // name: string; // error - Property 'name' of type 'string' is not assignable to 'string' index type 'number'.ts(2411)
}
// 하지만, 인덱스 시그니처의 프로퍼티 타입이 유니온 타입인 경우에는 그 반환 타입이 유니온의 각 타입에 매치될 때 적법한 것으로 본다.
interface NumberOrStringDictionary{
    [index: string]: number | string;
    length: number; // ok
    name: string; // ok
}

/*
    마지막으로, 인덱스 시그니처는 그 인덱스에 어떤 값을 새로 할당하는 것을 막기 위해 readonly를 적용할 수 있다.

interface ReadonlyStringArray{
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = getReadonlyStringArray();
myArray[2] = 'Mallory'; // error - Index signature in type 'ReadonlyStringArray' only permits reading.
*/

/*
    ### Extending Types
    어떤 타입에 대해 더욱 특정화된 버전의 타입을 장성하는 것은 흔한 일이다.
    예를 들어, 아래의 예제에서 BasicAddress 타입은 미국에서 편지나 소포를 보낼 때 필수 정보 필드를 의미하는 데이터다.
*/
interface BasicAddress{
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}
/*
    대부분의 경우 위 필드 정도면 충분할 것이다.
    하지만 주소는 가끔 주소와 연관된 '단위' 데이터가 요구될 때가 있다.
    예를 들면 그 주소의 건물이 여러 개의 단위를 갖는 경우 등이다.
    이를 아래 예제의 AddressWithUnit 타입으로 표현해보자.
*/
interface AddressWithUnit{
    name?: string;
    unit: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}
/*
    위 코드는 우리가 원하는 결과를 만족한다.
    하지만 문제점은 BasicAddress에서 사용했던 모든 필드들을 반복적으로 또 작성했다는 것이다.
    대신 우리는 BasicAddress 타입을 확장하고 새로운 필드를 추가함으로써 비반복적으로 원하는 결과를 얻을 수 있다.
*/
interface AddressWithUnit2 extends BasicAddress{
    unit: string;
}
/*
    인터페이스에 extends 키워드를 작성하면, 기존 타입의 필드를 다른 이름의 타입으로 복제할 수 있고,
    우리가 원하는 새로운 멤버를 추가할 수도 있다.
    이를 통해 많은 양의 보일러 플레이트 코드를 줄일 수 있을 뿐만 아니라,
    동일한 프로퍼티를 갖는 각 타입 선언(위 예제에서는 BasicAddress와 AddressWithUnit2)에 대해 그 각 선언이 서로 관련되어 있다는 의도를 전달하는 데 유용하다.
    예를 들어, AddressWithUnit2는 street 프로퍼티가 이미 BasicAddress에 있기 때문에 이를 반복할 필요가 없었으며,
    코드를 읽는 사람은 이 2개의 타입이 어떤 방식으로 연결되어 있음을 알게 될 것이다.
    interface는 아래와 같이 콤마(,)를 이용하여 다중 타입으로부터 확장하는 것이 가능하다.
*/
interface Colorful{
    color: string;
}
interface Circle{
    radius: number;
}
interface ColorfulCircle extends Colorful, Circle{}

const cc: ColorfulCircle = {
    color: 'red',
    radius: 42
}

/*
    ### Intersection Types
    interface는 기존의 타입들을 확장하여 새로운 타입을 만들 수 있게 해준다.
    TypeScript는 기존의 오브젝트 타입들을 조합하는 데 주로 사용되는 인터섹션 타입이라 불리는 또 다른 구조체를 제공한다.
    인터섹션 타입은 & 연산자를 사용하여 정의한다.
*/
type ColorfulCircle2 = Colorful & Circle;
// 여기서 Colorful과 Circle을 교차하여, 시로운 타이을 생성하였는데, 그 타입에는 Colorful과 Circle에 있는 모든 멤버가 들어가 있다.
function draw(circle: ColorfulCircle2){
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}
draw({color: 'blue', radius: 42});

/*
    ### Interface vs Intersections
    우리는 지금까지 유사한 2가지의 타입 조합 방식을 살펴보았다.
    하지만 사실 둘은 묘하게 다르다.
    인터페이스는 extends 절을 사용하여 다른 타입으로 부터 확장할 수 있다.
    인터섹션으로도 비슷한 효과를 낼 수 있으며, 그 결과를 타입 앨리어스에 이름지어 할당할 수 있다.
    여기서 이 둘의 원칙적인 차이는 충돌이 어떻게 처리되는가에 있다.
    그 차이는 통상적으로 둘 중 하나를 선택하는 가장 주요한 이유일 것이다.
*/

/*
    ### Generic Object Types
    string, number, Giraffe 등등 무엇이든 담을 수 있는 Box 타입을 상상해보자.
*/
interface Box{
    contents: any;
}
/*
    현재로서는 contents 프로퍼티는 any로써 타이핑되었고, 잘 동작한다.
    하지만 이러한 방식은 나중에 문제가 될 수 있다.
    대신 우리는 아래와 같이 unknown을 사용할 수 있다.
    하지만 이 또한 contents의 타입을 이미 알고 있는 경우에는, 미리 타입을 체크해야하거나, 에러를 강제로 막기위한 타입 어썰션을 사용해야한다는 것을 의미한다.
*/
interface Box2{
    contents: unknown;
}
let x: Box2 = {
    contents: 'hello world'
};
if(typeof x.contents === 'string'){ // 타입을 케트할 수 있다.
    console.log(x.contents.toLowerCase());
}
console.log((x.contents as string).toLowerCase());  // 어썰션을 사용할 수도 있다.

// 아래는 모든 contents 프로퍼티의 타입에 따라 별도의 Box2 타입을 만드는 예제다.
interface NumberBox{
    contents: number;
}
interface StringBox{
    contents: string;
}
interface BooleanBox{
    contents: boolean;
}
// 그러나 이는 각 타입을 매개변수로하는 함수를 만드려고 할 때 각기 다른 함수들을 생성하거나 오버로드를 사용해야한다는 것을 의미한다.
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: {contents: any}, newContents: any){
    box.contents = newContents;
}
/*
    이는 불필요한 보일러 프렐이트이며, 게다가 우리는 나중에 새로운 타입을 추가하려고 할 때마다 새로운 오버로드를 추가해야할 것이다.
    이러한 작업 대신, 우리는 타입 매개변수를 사용하여 제네릭 Box 타입을 만들 수 있다.
*/
interface Box3<Type>{
    contents: Type;
}
let box: Box3<string> = {contents: 'hello'};
function setContents3<Type>(box: Box3<Type>, newContents: Type){
    box.contents = newContents;
}
/*
    Box<Type>을 "Box가 Type 타입의 contents 프로퍼티를 가지고 있다."라고 이해하면 된다.
    예제에서 box 변수를 선언할 때, Box 타입을 참조하면 그 타입 인수(type arguments)를 통해 Box의 contents 프로퍼티의 타입이 무엇인지를 알 수 있게 된다.
    Box를 '실제 타입'의 템플릿으로써 생각해보면, Type이 있는 장소에 우리가 지정하는 타입으로 대체된다고 생각하면 된다.
    TypeScript가 Box<string>을 보면, 그 타입이 지정된 모든 변수 혹은 상수들의 contents 프로퍼티 타입을 string으로 대체하는 것이다.
    또한 setContents 함수와 같이 굳이 오버로드를 사용할 이유도 없어진다.

    Box4의 Type은 어떤 타입으로든 대체되어 재사용 가능하다.
    이는 아래 예제에서 Apple이 오브젝트 타입의 인터페이스라 해도 이 Type에 적용할 수 있으며,
    이 Apple 타입을 contents 프로퍼티 타입의 값으로 하는 새로운 인터페이스를 선언할 필요가 없음을 의미한다.
*/
interface Box4<Type>{
    contents: Type;
}
interface Apple{
    color: string;
    size: string;
}
type AppleBox = Box4<Apple>; // {contents: Apple}과 같은 뜻이 된다.
// 아래와 같이 타입 앨리어스도 타입 인수를 사용하여 제네릭 오브젝트를 만들 수 있다.
type Box5<Type> = {
    contents: Type;
}
// 인터페이스와 달리 타입 앨리어스는 오브젝트 타입에만 한정되지 않고 다른 데이터 타입도 표현할 수 있으므로,
// 이를 사용하여 아래와 같이 제네릭 헬퍼 타입을 만들 수 있다.
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type;
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyNullString<Type> = OneOrManyOrNull<string>;
let oomo: OneOrManyOrNull<number>;

/*
    ### The Array Type
    제네릭 오브젝트 타입은 자신이 포함하는 요소들의 타입으로부터 독립적으로 동작하는 컨테이너의 한 종류다.
    다양한 데이터 타입에 걸쳐 재사용될 수 있기 위해, 이러한 방식으로 동작하는 것이 데이터 구조 차원에서 이상적이다.

    이 핸드북 전반에 걸쳐 우리는 이미 이러한 제네릭 방식을 작업해 오고 있었다.
    사실 Array 타입을 작성할 때, 우리는 이미 제네릭을 사용하고 있었던 것이다.
    예를 들어, 우리가 number[]나 string[]과 같은 타입을 작성할 때마다, 사실 Array<number>, Array<string>과 같은 표현의 축약된 버전을 사용하고 있었던 것이다.

type number[] = Array<number>;
type string[] = Array<string>;
*/
function doSomething2(value: Array<string>){
    //...
}
let myArray2: string[] = ['hello', 'world'];
doSomething2(myArray2); // ok
doSomething2(new Array('hello', 'world')); // ok
// 위의 Box4 타입 예제와 마찬가지로 Array 그 자체는 제네릭 타입이다.
interface Array<Type>{
    length: number;
    pop(): Type | undefined;
    push(...items: Type[]): number;
}
/*
    모던 자바스크립트 또한 Map<K, V>, Set<T>, Promise<T>와 같은 제네릭 방식으로 데이터 구조를 제공한다.
    이는 Map, Set, Promise가 모든 타임의 데이터 집합과 동작할 수 있고, 그 동작 방식이 제네릭 방식에 부합하기 때문이다.
*/

/*
    ### The ReadonlyArray Type
    ReadonlyArray는 배열이 불변하도록 설정하는 특별한 타입이다.
*/
function doStuff(value: ReadonlyArray<string>){
    const copy = value.slice(); // ok
    console.log(`The first value is ${value[0]}`);

    // value.push('hello'); // error - Property 'push' does not exist on type 'readonly string[]'.ts(2339)
}

/*
    readonly 프로퍼티 모디파이어와 마찬가지로, 이 읽기전용 배열 타입은 불변함을 의도적으로 적용하기 위한 도구다.
    만약 함수가 ReadonlyArray를 반환한다면, 반환된 배열의 내용을 변화시키지 않아야 한다는 것을 의미하는 것이다.
    만약 함수가 ReadonlyArray를 인수로 받는다면, 이는 우리가 그 배열의 내용이 변화할까봐 걱정할 필요없이 배열을 인수로 전달할 수 있다는 것을 의미한다.

    Array와 다르게 ReadonlyArray는 생성자가 없다.
    new ReadonlyArray('red', 'green', 'blue'); // error - 'ReadonlyArray' only refers to a type, but is being used as a value here.

    대신 ReadonlyArray에 Array를 등록할 수 있다.
*/
const roArray: ReadonlyArray<string> = ['red', 'green', 'blue'];

// TypeScript가 Type[]으로 Array<type>의 축약 버전을 제공한 것처럼, readonly Type[] 형식으로 ReadonlyArray<Type>을 축약할 수 있다.
function doStuff2(values: readonly string[]){
    //...
}
doStuff2(['test', 'test']);

// 마지막으로 기억해야 할 것은 readonly 프로퍼티와 다르게, ReadonlyArray와 Array 관계를 그 접근성의 차원에서 양방향이 아니다.
let x2: readonly string [] = [];
let y2: string[] = [];

x2 = y2;
// y2 = x2; // error - The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.ts(4104)

/*
    ### Tuple Types
    튜플 타입은 얼마나 많은 요소를 포함하고 있는지, 그 요소의 타입은 무엇인지를 정확하게 알고 있는 배열 타입이다.
*/
type StringNumberPair = [string, number];
function doSomething3(pair: StringNumberPair){
    const a = pair[0];
    const b = pair[1];
    // const c = pair[2]; // error - Tuple type 'StringNumberPair' of length '2' has no element at index '2'.ts(2493)
}
doSomething3(['hello', 42]);
/*
    여기, StringNumberPair는 string과 number 타입이 조합된 튜플타입니다.
    ReadonlyArray와 같이, 이 튜플 타입은 런타임에 관여하지 않지만, TypeScript의 타입 체킁 프로세서에서는 관여한다.
    타입 시스템에서 StringNumberPair는 0 인덱스 요소의 타입이 string이고, 1 인덱스 요소의 타입은 number라는 것을 표현한다.

    만약 튜플에서 정의한 요소 개수를 초과하는 인덱스를 조회하면 에러가 발생한다. (위 예제 c 부분)

    JavaScript의 배열 해체 문법을 사용해서 튜플 해체 문법을 사용할 수 있다.
*/
function doSomething4(stringHash: [string, number]){
    const [inputString, hash] = stringHash;
    console.log(inputString); // const inputString: string
    console.log(hash); // const hash: number
}
/*
    튜플 타입은 각 요소의 의미가 명백해서 컨벤션 기반의 API에 특히 유용하다.
    이 튜플 타입은 해당 배열을 해체하여 그 각 요소에 특정 이름을 지정하려고 할 때 유연성을 제공한다.
    위의 예제에서 보면, 우리는 0번째, 1번째 인덱스에 해당하는 요소 각각에 우리가 원하는 이름을 지정할 수 있었다.
    하지만, 사용자에 따라 무엇이 명백한지에 대해 서로 다른 관점을 가지고 있기 때문에, 이러한 방식으로 이름을 지정하는 것에 대해 다시 고려해보는 것도 의미 있을 것이다.

    이러한 단순한 튜플 타입은 숫자 이름의 프로퍼티 및 그 값이 숫자 형식인 length 프로퍼티를 갖는 오브젝트 타입과 같은 의미를 갖는다.
*/
interface StringNumberPair2{
    length: 2;
    0: string;
    1: number;

    slice(start?: number, end?: number): Array<string | number>;
}
/*
    튜플 타입은 물음표(요소의 타입 뒤에 ? 기호)를 작성하여 옵셔널 프로퍼티를 가질 수 있다.
    옵셔널 튜플 요소는 오직 마지막 요소 및 마지막 요소가 옵셔널인 경우 그와 끊어지지 않은 요소들에만 지정할 수 있으며, 이는 length 값에도 영향을 미친다.
*/
type Either2dOr3d = [number, number, number];
// [number, number?, number?]; // ok
// [number?, number, number]; // not ok

function setCoordinate(coord: Either2dOr3d){
    const [x, y, z] = coord;    // const z: number | undefined
    console.log(`Provideed coordinates had ${coord.length} dimensions`);    // (property) length: 2 | 3
}
// 튜플 타입은 또한 나머지 요소 문법을 사용할 수 있다.
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooelansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ['hello', 1, true];
const b: StringBooleansNumber = ['world', true, false, 2];
const c: BooelansStringNumber = [false, true, false, 'baby', 3];
/*
    - StringNumberBooleans은 처음 2개 요소가 string과 number 타입이고, 몇개인지 알 수 없는 boolean 타입 요소가 포함된 튜플 타입이다.
    - StringBooleansNumber은 첫 요소가 string 타입이고, 몇개인지 알 수 없는 boolean 타입 요소들이 있고, 그 다음에 number 타입의 요소가 마지막에 자리한 튜플 타입이다.
    - BooleansStringNumber은 몇개인지 알 수 없는 boolean 타입 요소들이 먼저 오고, 마지막으로 string, number 타임 순으로 끝나는 튜플타입이다.
    
    이러한 나머지 요소 문법을 사용한 튜플 타입은 length 프로퍼티가 설정되지 않는다.
    왜 옵셔널과 나머지 요소 문법이 유용할까?
    이 방식을 통해, TypeScript로 하여금 매개변수 목록과 튜플을 대응시킬 수 있게 해준다.
    튜플 타입은 다음과 같이 나머지 매개변수와 인수에서도 사용할 수 있다.
*/
function readButtonInput(...args: [string, number, ...boolean[]]){
    const [name, version, ...input] = args;
    //...
}
// 이는 기본적으로 아래와 같다.
function readButtonInput2(name: string, version: number, ...input: boolean[]){
    // ...
}
// 이렇게 나머지 매개변수를 사용하면, 다양한 개수의 인수를 받고 싶을 때 편리할 것이다.

/*
    ### read Tuple Types
    튜플 타입은 readonly 모디파이어를 그 앞에 붙여줌으로써 읽기전용 변수를 가질 수 있다.
*/
function doSomething5(pair: readonly [string, number]){
    // pair[0] = 'hello!';  // error - Cannot assign to '0' because it is a read-only property.ts(2540)
}
/*
    대부분의 코드에서 튜플은 생성되고 수정되지 않은 상태로 유지하려는 경향이 있으므로, 되도록 튜플을 사용할 때에는 읽기전용 튜플로 처리하는 것이 좋다.
    아래 예제처럼, const 어썰션을 적용한 배열 리터럴이 readonly 튜플 타입으로 추론될 것이라는 것도 이해해보면 좋을 것이다.
*/
let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]){
    return Math.sqrt( x**2 + y**2);
}
// distanceFromOrigin(point);
// error - Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.ts(2345)
/*
    위 distanceFromOrigin은 형태 상태에서 인수로 들어온 요소들을 절대 수정하지 않고 있지만, 여전히 변경할 가능성은 열려있다.
    point의 타입이 readonly [3, 4]로 추론되었기 때문에, [number, number]라는 타입과는 호환되지 않을 것이다.
    이는 [number, number] 타입이 point의 요소를 절대 변경하지 않을 것이라는 것를 보장할 수 없기 때문이다.
*/