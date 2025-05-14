export {};

/*
    TypeScript는 ES2015에 소개된 class 키워드를 완전히 지원한다.
    다른 JavaScript 기능과 마찬가지로, TypeScript에서 클래스를 사용할 때 타입 주석을 사용할 수 있으며,
    클래스와 다른 타입 사이의 관계를 표현할 수 있도록 기타 문법 또한 사용할 수 있다.
*/

/*
    ### Class Members
    가장 기초적인 클래스인 빈 클래스이다.

    class Point{}

    Fields
    필드 선언은 퍼블릭 쓰기가능 프로퍼티를 클래스에 생성한다.

class Point{
    x: number;
    y: number;
}
const pt = new Point();
pt.x = 0;
pt.y = 1;


    다른 곳과 마찬가지로, 타입 주석은 옵셔널이지만, 특정하지 않는다면 암묵적으로 any 타입이 할당된다.
    필드는 이니셜라이저(initializer)를 가질 수 있다.
    이니셜라이저는 클래스가 인스턴스화되면 자동적으로 실행될 것이다.
*/
class Point2{
    x = 0;
    y = 0;
}
const pt2 = new Point2();
console.log(`Point2(${pt2.x}, ${pt2.y})`);

// const, let, var와 마찬가지로 클래스의 이니셔라이저는 그 타입을 추론할 때 사용할 수 있다.
// pt2.x = '0';    // error - Type 'string' is not assignable to type 'number'.ts(2322)

/*
    --strictPropertyInitialization
    이 설정은 생성자(constructor)에서 클래스 필드가 초기화되아야 하는지를 제어할 수 있게 해준다.

    class BadGreeter{
        name: string; 
    }
    // Property 'name' has no initializer
    // adn is not definitely assigned in the constructor
*/

class GoodGreeter{
    name: string;

    constructor(){
        this.name = 'hello';
    }
}
/*
    필드가 생성자에서 초기화될 필요가 있었음을 확인하자.
    TypeScript는 초기화를 감지하기 위해 생성자에서 실행한 메서드를 분석하지 않는다.
    이는 파생된 클래스가 그 메서드를 오버라이드함으로써 그 멤버를 초기화하는 것에 실패할 수 있기 때문이다.
    
    만약 당신이 명백하게 생성자가 아닌 다른 방법으로 필드를 초기화하려 한다면, 
    (예를 들어, 외장 라이브러리가 클래스의 일부 값을 채우고 있는 경우우),
    당신은 명백한 할당 어썰션 연산자인 ! 기호를 사용할 수 있다.
*/
class OKGreeter{
    name: string;
    age!: number;   // not initialized, but no error

    constructor(){
        this.name = 'hello';
    }
}

/*
    readonly
    필드는 readonly 모디파이어를 앞에 붙임으로써 읽기전용 프로퍼티가 될 수 있다.
    이를 통해 생성자 밖에서 해당 필드 값이 재할당되는 것을 막을 수 있다.
*/
class Greeter{
    readonly name: string = "world";

    constructor(otherName?: string){
        if(otherName !== undefined){
            this.name = otherName;
        }
    }

    err(){
        // this.name = 'not ok';   // error - Cannot assign to 'name' because it is a read-only property.ts(2540)
    }

    // const g = new Greeter();
    // g.name = 'also not ok'; // error - Cannot assign to 'name' because it is a read-only property.ts(2540)
}

/*
    Constructor
    클래스 생성자는 함수와 유사하다.
    생성자에는 타입 주석과 함께 매개변수를 추가할 수 있으며, 기본값, 오버로드도 작성할 수 있다.
*/

class Point3{
    x: number;
    y: number;

    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

// constructor-overload.ts
/*
class Point3{
    // Overloads
    constructor(x: number, y: string);
    constructor(s: string);
    constructor(xs: any, y?: any){
        // 구현부
    }
}
*/
let point = new Point3(1, 1);
/*
    클래스 생성자 시그니처와 함수 시그니처 사이에는 몇 가지 차이가 존재한다.
    - 생성자는 타입 매개변수를 가질 수 없다. 타입 매개변수는 클래스 바깥의 선언에 속하게 된다.
    - 생성자는 반환 타입 주석을 가질 수 없다. 이는 클래스 인스턴스 타입이 항상 반환되기 때문이다.

    Super Calls
    JavaScript와 마찬가지로, 기반 클래스가 있는 경우에는, this. 멤버들을 사용하기 전에 반드시 생성자 내에서 super();를 실행시켜주어야 한다.
*/
class Base{
    k = 4;
}
class Derived extends Base{
    constructor(){
        // console.log(this.k);    // error - 'super' must be called before accessing 'this' in the constructor of a derived class.ts(17009)
        super();
        console.log(this.k);    // ok
    }
}
// super를 호출하는 것을 잊는 것은 JavaScript에서 매우 흔히 저지르는 실수다. TypeScript는 필요한 경우에 이에 대해 이야기해줄 것이다.

/*
    Methods
    클래스와 함수 프로퍼티를 메서드라 부른다.
    메서드는 함수와 생성자처럼 모든 타입 주석을 사용할 수 있다.
*/
class Point4{
    x = 10;
    y = 10;

    scale(n: number): void{
        this.x *= n;
        this.y *= n;
    }
}
/*
    메서드에 기존의 타입 주석과 다른 새로운 기능은 없다.
    메서드의 몸체 내에서, 멤버 필드 및 메서드에 접근하기 위해 this.를 사용해야 하는 것은 여전히 필수다.
    this로 할당되지 않은 식별자는 항상 그 스코프 내의 무언가를 참조하게 된다.
*/
let x: number = 0;
class C{
    x: string = 'hello';

    m(){
        // x = 'world'; // error - 내부 프로퍼티가 아니고 전역 x에 해당
    }
}

/*
    Getters / Setters
    TypeScript 클래스는 엑세서(accessors)를 갖는다.
    이는 가시성(Visibility)을 제어하는 접근 제어자(access modifiers)와는 다르다.(private, protected, public)
    엑세서는 getter, settter를 의미한다.(setter는 mutator라고 부르기도 한다.)
    * 필드 지원을 위한 get/set 페어는 별도의 로직이 있지 않는한 그다지 유요하지 않다.
    일반적인 경우 get/set으로 사용할 프로퍼티들은 퍼블릭 필드로 노출시켜도 큰 문제가 되지 않는다.

    TypeScript는 엑세서를 위한 특별한 추론 규칙을 가지고 있다.
    - get이 존재하지만 set이 없다면, 프로퍼티는 자동적으로 readonly 처리 된다.
    - setter 매개변수의 타입이 특정되지 않았다면, getter의 반환 타입으로 추론된다.
    - getter와 settter는 같은 멤버 가시성(member visibility)을 가져야 한다.
    TypeScript 4.3 버전 다음부터는 get 메서드와 set 메서드가 다른 타입을 가질 수 있게 되었다.
*/
class Thing{
    _size = 0;

    get size(): number{
        return this._size;
    }

    set size(value: string | number | boolean){
        let num = Number(value);

        if(!Number.isFinite(num)){
            this._size = 0;
            return;
        }
        this._size = num;
    }
}
const box = new Thing();
box.size = '120';
console.log(`Box size: ${box.size}`);

/*
    Index Signatures
    클래스는 인덱스 시그니처를 선언할 수 있다.
    이는 Object Types에서 살펴본 인덱스 시그니처와 똑같이 동작한다.
*/
class MyClass{
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string){
        return this[s] as boolean;
    }
}

/*
    ### Class Heritage

    implements Clauses
    클래스가 특정 interface의 조건을 만족하는지 채크하기 위해 implements 절을 사용할 수 있다.
    어떤 클래스가 그 interface를 적절히 구현하는데 실패하면 에러가 발생할 것이다.
*/
interface Pingable{
    ping(): void;
}

class Sonar implements Pingable{
    ping(){
        console.log('ping!');
    }
}
/*
class Ball implements Pingable{
    pong(){
        console.log('pong!');
    }
    // Class 'Ball' incorrectly implements interface 'Pingable'.
    // Property 'pint' is missing in type 'Ball' but required in type 'Pingable'.ts(2420)
}
*/

/*
    클래스는 다중 인터페이스에 대한 implements 절 사용이 가능하다.
    예) class C implements A, B { ... }

    * 주의
    implements 절이 클래스가 그 인터페이스 타입으로서 다뤄지고 있는지를 체크하는데에만 사용된다는 것을 이해하는 것은 매우 중요하다.
    implements 절은 대상이 되는 클래스의 타입과 메서드를 전혀 바꾸지 않는다.
    implements 절이 클래스 타입을 바꿀 것이라고 가정하여 작성하면 에러가 발생한다.
*/
interface Checkable{
    check(name: string): boolean;
}

class NameChecker implements Checkable{
    // check(s){   // Parameter 's' implicitly has an 'any' type, but a better type may be inferred from usage.ts(7044)
    check(s: string){
        return s.toLowerCase() === 'ok';
    }
}
/*
    이 예제에서, 우리는 아마도 s의 타입이 check 메서드의 name: string 매개변수에 영향받을 것이라고 기대할 것이다.
    물론 이는 사살이 아니다.
    implements 절은 클래스 몸체에서 타입을 체크하는 혹은 추론하는 방식을 절대 변화시키기 않는다.
    이와 유사하게, 옵셔널 프로퍼티 인터페이스를 implements 처리하면 그 클래스는 그 옵셔널 프로퍼티를 생성하지 않는다.
    ( y = 0 이런식으로 직접 생성한다면 아래 코드는 동작한다.)
*/
interface A{
    x: number;
    y?: number;
}
class C2 implements A{
    x = 0;
}
const c2 = new C2();   // Property 'y' does not exist on type 'C'.
console.log(`${c2.x}`);
// console.log(`${c2.y}`);   // error - Property 'y' does not exist on type 'C2'.ts(2339)

/*
    extends Clauses
    클래스는 extends 키워들 사용하여 기반 클래스로부터 상속받을 수 있다.
    파생된 클래스는 기반 클래스의 모든 프로퍼티와 메서드(private 프로퍼티, 메서드와 같은 예외가 있다)를 갖게됨은 물론이고, 추가적인 멤버 또한 정의할 수 있다.
*/
class Animal{
    move(){
        console.log("Move along");
    }
}
class Dog extends Animal{
    woof(times: number){
        for(let i = 0; i < times; i++ ){
            console.log('woof!');
        }
    }
}

const d = new Dog();
d.move();
d.woof(3);
// 클래스의 메서드는 별도의 생성자없이 사용가능하고, super() 호출없이 상속되었다는 것 또한 확인하자.

/*
    Overriding Methods
    파생 클래스는 기반 클래스의 필드나 프로퍼티를 오버라이드 할 수 있다.
    이 때 super. 문법을 사용하여 기반 클래스의 메서드에 접근할 수 있다.
    JavaScript 클래스가 심플한 룩업 타임 오브젝트이기 때문에, 'super 필드'라는 개념은 존재하지 않음을 참고하자.
    TypeScript는 파생 클래스가 항상 그 기반 클래스의 서브 타입이 되도록 강제한다.
*/
class Base2{
    greet(){
        console.log('Hello, world!');
    }
}

class Derived2 extends Base2{
    greet(name?: string){
        if(name === undefined){
            super.greet();
        }else{
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}
const d2 = new Derived2();
d2.greet();
d2.greet('dhlee');
/*
    파생 클래스가 그 기반 클래스의 규칙을 따라가는 것은 중요하다.
    기반 클래스 타입의 변수, 상수에 파생 클래스의 인스턴스를 할당하는 것은 흔하며 항상 적법하다.
*/
const b: Base2 = d2;
b.greet();

/*
    만약 Derived가 Base의 규칙을 따르지 않는다면 어떻게 될까?

class Base3{
    greet(){
        console.log('Hello, World!');
    }
}
class Derived3 extends Base3{
    greet(name: string){
        console.log(`Hello, ${name.toUpperCase()}`);
    }
    // error - Property 'greet' in type 'Derived3' is not assignable to the same property in base type 'Base3'.
    // Type '(name: string) => void' is not assignable to type '() => void'.
    // Target signature provides too few arguments. Expected 1 or more, but got 0.ts(2416)
}
    에러에도 불구하고 이 코드를 컴파일 했다면, 크래시가 발생할 것이다.
*/

/*
    Initialization Order
    JavaScript 클래스가 초기화하는 순서는 특정 경우에 놀라울 정도로 예상과 다르게 동작할 수 있다.
*/
class Base4{
    name = 'base';
    constructor(){
        console.log(`Initialization Order - My name is ${this.name}`);
    }
}
class Derived4 extends Base4{
    name = 'derived';
    constructor(){
        super();
        console.log(`Initialization Order - My name is ${this.name}`);
    }
}
const d4 = new Derived4();
/*
    컴파일 과정
    1. 기반 클래스의 필드들이 초기화된다.
    2. 기반 클래스 생성자가 실행된다.
    3. 파생 클래스 필드가 초기화된다.
    4. 파생 클래스 생성자가 실행된다.
    2번 단계에서 생성자가 실행될 때 name은 기반 클래스가 갖고 있는 name일 것이다.
    따라서 그 값인 'base'가 출력되는 것이다.

    Inheriting Built-in Types
    * 만약 Array, Error, Map 기타 등등과 같은 빌트인 타입으로부터 상속받는 클래스를 만들려하는 것이 아니거라
    컴파일 타겟이 명확하게 ES6/ES2015 이상이라면, 이 섹션을 스킵해도 좋다.

    ES2015에서 오브젝트를 반환하는 생성자는 암묵적으로 super(...)의 호출자를 this 값으로 대체한다.
    이는 super(...)의 모든 잠재적인 반환값을 캡처하여 this로 대체해야 하는 생성자 코드 관점에서 꼭 필요한 과정이다.
    결국, Error, Array 그리고 다른 빌트인 오브젝트에 대해 파생 클래스를 만드는 것은 더이상 우리가 기대한대로 동작하지 않는다.
    이는 Error 및 Array 그리고 다른 빌트인 오브젝트를 위한 생성자 함수가 ECMAScript 6의 프로토타입 체인을 조정하기 위해, new.target을 사용하는 것에 기인한다.
    게다가, ECMAScript 5에서는 생성자 함수를 실행할 때 이 new.target의 값을 확정지을 수 있는 방법이 없다.
    다른 다운레벨링 컴파일러들은 일반적으로 이와 같은 제한 사항을 가지고 있다.
    다음은 서브 클래스의 일반적인 방법이다.
*/
class MsgError extends Error{
    constructor(m: string){
        super(m);
    }
    sayHello(){
        return 'hello ' + this.message;
    }
}
const msgError = new MsgError('super message');
console.log(msgError.sayHello());
/*
    이 예제를 컴파일하고 JavaScript 파일을 실행해보면 다음과 같은 문제가 발생한다.
    - 이 MsgError의 인스턴스를 생성함으로써 반환되는 오브젝트 내에서 sayHello 메서드는 undefined 일것이다. 따라서 sayHello를 호출하는 것을 에러를 발생시킬 것이다.
    - 서브클래스와 그 인스턴스 사이의 instanceof 관계는 깨질 것이다. 따라사 (new MsgError()) instanceof MsgError는 false를 반환할 것이다.
    권장사항에 따르면, super(...) 호출 이후에 수동적으로 프로토타입을 즉시 조정하면 된다.
*/
class MsgError2 extends Error{
    constructor(m: string){
        super(m);

        Object.setPrototypeOf(this, MsgError2.prototype);
    }
    sayHello(){
        return 'hello ' + this.message;
    }
}
const msgError2 = new MsgError2('super message');
console.log(msgError2.sayHello());

/*
    ### Member Visibility
    TypeScript에서는 특정 메서드 혹은 프로퍼티를 클래스 바깥 영역에서 접근하는 것을 제어할 수 있다.
    이를 멤서 가시성(member visibility)이라 한다.

    public
    클래스 멤버에 대한 기본 가시성의 값이다.
    puiblc 멤버는 어느 곳에서나 접근할 수 있다.
*/
class Greeter2{
    public greet(){
        console.log('hil!');
    }
}
const g = new Greeter2();
g.greet();
/*
    public이 기본적인 가시성 모디파이어이기 때문에, 클래스 멥버를 작성할 때 굳이 이 모티파이어를 붙이지 않아도 된다.
    하지만 코드 스타일링/가독성을 이유로 작성하는 것도 나쁘지 않은 선택이다.

    protected
    protected 멤버들은 오직 그 클래스의 서브클래스들만 볼 수 있다.
*/
class Greeter3{
    public greet(){
        console.log('Hello, ' + this.getName());
    }
    protected getName(){
        return 'hi';
    }
}
class SpecialGreeter extends Greeter3{
    public howdy(){
        console.log('Howdy, ' + this.getName());    // ok
    }
}
const g3 = new SpecialGreeter();
g3.greet();     // ok
g3.howdy();     // ok
// g3.getName();    // error - Property 'getName' is protected and only accessible within class 'Greeter3' and its subclasses.ts(2445)

/*
    Exposure of protected Members
    파생 클래스는 그 기반 클래스의 규칙을 따라야 한다.
    한편, 더 높은 가용성을 위해 기반 클래스의 하위 멤버들을 파생 클래스 상에서 외부에 노출시킬 수도 있다.
    이는 protected 멤버를 public으로 바꾸는 작업을 포함한다.
*/
class Base5{
    protected m = 10;
}
class Dervied5 extends Base5{
    m = 15; // 모디파이어가 없으므로 기본값이 public으로 설정된다.
}
const d5 = new Dervied5();
console.log(d5.m);
/*
    Derived3가 이미 자유롭게 m을 읽고 쓸 수 있었다는 것을 일단 확인하자.
    따라서 protected는 이러한 상황의 "보안"을 제대로 지켜내지 못한다.
    이러한 노출이 의도적이지 않았을 경우를 대비하여, 우리는 protected 모디파이어를 반복적으로 사용하는 것에 주의할 필요가 있다.

    Cross-hierachy protected Access
*/
class Base6{
    protected x: number = 1;
}
class Derived61 extends Base6{
    protected x: number = 5;
}
class Derived62 extends Base6{
    fi(other: Derived62){
        other.x = 10;
    }
    f2(other: Base6){
        // other.x = 20;   // error - Property 'x' is protected and only accessible through an instance of class 'DerivedB'. This is an instance of class 'Base6'.ts(2446)
    }
}
/*
    "기반 클래스이 참조를 통해 protected 멤버에 접근할 수 있는 것이 적법한가"에 대한 OOP 언어들은 각기 다른 입장을 가지고 있다.
    (TypeScript는 이를 적법하지 않은 것으로 보고 있는 것이다.)
    예를 들어, 자바의 경우 이를 적법한 것으로 보는 한편, C#과 C++는 이를 적법하지 않은 것으로 본다.
    TypeScript는 여기서 C#과 C++의 편에 서있다.
    Derived62의 x에 접근하는 것은 오직 Derived62의 서브클래스에서만 적법해야 한다.
    당연한 애기지만 Derived61은 그 서브클래스 중 하나가 아니다.
    게다가, Derived61 참조를 통해 x에 접근하는 것이 적법하지 않다면(절대로 그렇게 해서는 안됨), 기반 클래스(Base6) 참조를 통해 x에 접근하는 것 또한 상황을 개선시키지 못할 것이다.

    private
    private은 protected와 유사하지만, 그 하위 클래스라 할지라도, 이 멤버에 접근할 수 없는 점이 다르다.
*/
class Base8{
    private x = 9;
}
const b8 = new Base8();
// console.log(b8.x);  // error - Property 'x' is private and only accessible within class 'Base8'.ts(2341)
class Derived8 extends Base8{
    // x = 1; // error - Class 'Derived8' incorrectly extends base class 'Base8'. Property 'x' is private in type 'Base8' but not in type 'Derived8'.ts(2415)
    showX(){
        // console.log(this.x);    // error - Property 'x' is private and only accessible within class 'Base8'.ts(2341)
    }
}
const d9 = new Derived8();
d9.showX();
// private 멤버를 그 파생 클래스에서 볼 수 없기 때문에, 파생 클래스에서는 그 가시성을 늘릴 수 없다.

/*
    Cross-instance private Access
    같은 클래스에 대한 다른 인스턴스들이 그 클래스에서 정의한 메서드(아래 예제에서는 sameAs)를 통해 각자의 private 멤버에 접근할 수 있는지에 대해 OOP 언어들은 각기 다른 입장을 가지고 있다.
    자바, C#, C++, Swift, PHP는 이용 허용하지만, Ruby는 이를 허용하지 않는다.
    이러한 방식을 크로스 인스턴스 프라이빗 엑세스이라 하며, TypeScript는 이를 허용한다.
*/
class A2{
    private x = 10;

    public sameAs(other: A2){
        return other.x === this.x;  // ok
    }
}

/*
    Caveats
    다른 TypeScript의 타입 시스템의 양상과 마찬가지로, private와 protected는 오직 타입 체킹 중에만 강제된다.
    이는 in과 같은 JavaScript 런타임 구조체 혹은 심플 프로퍼티 룩업 기능은 여전히 private과 protected 멤버에 접근할 수 있다는 것을 의미한다.
// a.ts --> a.js
module.exports = class MySafe{
    private secretKey = 12345;
}

// b.js
const MySafe = require('./a.js');
const s = new MySafe();
console.log(s.secretKey);   // ok

    만약 당신이 악의 행위로부터 클래스의 값을 보호해야 한다면, 
    클로저, 위크앱, 프라이빗 필드와 같은 견고한 런타임 보안을 제공하는 메커니즘을 사용해야 한다.

*/

/*
    ### Static Members
    클래스는 static 멤버를 가질 수 있다.
    이 멥버는 클래스의 툭정 인스턴스와 연결되지 않으며, 클래스 생성자 오브젝트 그 자체를 통해서 접근할 수 있다.
*/
class MyClass2{
    static x = 2000;
    static printX(){
        console.log(MyClass2.x);
    }
}
console.log(MyClass2.x);
MyClass2.printX();
// 스태틱 멤버는 public, protected, private 가시성 모디파이어와 함께 사용할 수 있다.
class MyClass3{
    private static x = 300;
}
// console.log(MyClass3.x);    // error - Property 'x' is private and only accessible within class 'MyClass3'.ts(2341)
// 스태틱 멤버는 상속된다.
class Base9{
    static getGreetig(){
        return 'Hello World';
    }
}
class Derived9 extends Base9{
    myGreeting = Derived9.getGreetig();
}
console.log(Derived9.getGreetig());

/*
    Special Static Names
    일반적으로 Function 프로포타입에 프로퍼티를 덮어쓰는 것은 안정하지 않거나, 불가능하다.
    클래스가 new를 이용하여 실행될 수 있는 함수 그 자체이기 때문에, name, length와 같은 기존의 함수 프로퍼티들은 static 멤버로 정의될 수 없다.

    class S{
        static name = "S!"; // error - Static property 'name' conflicts with built-in property. 'Function.name'(Function.length) of constructor function 'S'.
        static length = "length!";
    }

    Why No Static Classes?
    TypeScript와 JavaScript는 C#과 Java가 그러하듯이, static class를 호출할 수 있는 구조체를 가지고 있지 않다.
    이러한 구조체는 모든 데이터와 함수가 클래스 내에 존재하도록 강제되는 경우에만 존재할 수 있다.
    이와 같은 제약 사항은 TypeScript에 없기 때문에, 우리는 static class가 필요하지 않다.
    단일 인스턴스만을 갖는 클래스는 통상적으로 JavaScript와 TypeScript에서 일반 오브젝트로 취급된다.
    다음 예제에서 볼 수 있다시피, 일반 오브젝트(혹은 탑레벨 함수)만으로도 static class의 기능을 잘 해낼 수 있으므로,
    TypeScript에서는 static class가 필요하지 않다.
*/

// 불필요한 static class
class MyStaticClass{
    static doSomething(){}; 
}
// 대체 방법 - 탑레벨 함수
function doSomething(){}

// 대체 방법 - 일반 오브젝트
const MyHelperObject = {
    doSomething(){}
}

/*
    ### Generic Classes
    클래스도 인터페이스와 마찬가지로 제네릭이 될 수 있다.
    제네릭 클래스가 new로 인스턴스화되면, 그 타입 매개변수는 함수 호출에서와 같은 방식으로 추론된다.
*/
class Box<Type>{
    contents: Type;
    constructor(value: Type){
        this.contents = value;
    }
}
const b6 = new Box('hello'); // const b6: Box<string>
// 또한 클래스는 제네릭의 제약조건과 기본값을 기존과 같은 방식으로 사용할 수 있다.

/*
    Type Parameters in Static Members
    아래 코드는 적법하지 않지만, 그 이유를 확실히 알긴 어렵다.
*/
class Box6<Type>{
    static defaultValue: TypeError; // Static members cannot reference class type parameters.
}
/*
    타입은 항상 런타입에서 완전히 지워진다는 것을 기억하자.
    따라서 런타임에서는 오직 하나의 Box.defaultValue 프로퍼티 슬롯만 존재할 것이다.
    이는 Box6<string..defaultValue의 값을 설정하는 것이 Box6<number>.defaultValue의 값도 바꾸게 된다는 것을 의미한다.
    물론 이는 좋지 않다.
    따라서 제네릭 클래스의 static 멤버는 결코 클래스의 타입 매개변수를 참조할 수 없다.
*/

/*
    ### this at Runtime in Classes
    TypeScript가 JavaScript의 런타입 비헤이비어를 바꾸지 않는다는 것을 기억하는 것은 중요하다.
    JavaScript는 그 특유의 런타임 비헤이비어를 갖는 것으로 유명하다.
    JavaScript에서 this를 처리하는 것이 정말로 독특하다.
*/
class MyClass6{
    name = 'MyClass6';
    getName(){
        return this.name;
    }
}
const c6 = new MyClass6();
const obj = {
    name: 'obj',
    getName: c6.getName
};
console.log('obj : ' + obj.getName()); // 'obj' 리턴
/*
    기본적으로 함수 내의 this 값은 함수가 어떻게 호출되었는지에 의존한다.
    함수가 ojb의 참조를 통해 호출되었기 때문에, 그 this의 값을 클래스의 인스턴스가 아닌 obj인 것이다.
    이것은 아마도 당신이 원하는 결과가 아닐 것이다.
    TypeScript는 이러한 종류의 에러를 완화하거나 방지하는 몇가지 방법을 제공하낟.

    Arrow Functions
    this 컨텍스를 잃을 수 있는 방식으로 호출될 수 있는 함수가 있다면,
    화살표 함수로 그 함수를 대체하여 그 문제를 해결할 수 있다.
*/
class MyClass7{
    name = 'MyClass7';
    getName = () => {
        return this.name;
    }
}
const c7 = new MyClass7();
const g7 = c7.getName;
console.log('g7 : ' + g7());
/*
    이러한 방식은 다음과 같은 장단점이 존재한다.
    - TypeScript로 코드를 체크하지 않아도, this는 런타임에 적절한 값이 할당되는 것이 보장한다.
    - 각 클래스 인스턴스가 각 함수의 복제본을 가져야 하기 때문에, 다 많은 메모리를 사용하게 된다.
    - 기반 클래스 메서드로부터 불러들일 프로토타입 체인 요소가 없기 때문에 파생 클래스에서 super.getName을 사용할 수 없다.

    this Parameters
    메서드 혹은 함수 정의에서, this라는 이름의 초기 매개변수는 TypeScript에서 특별한 의미를 갖는다.
    이 매개변수는 컴파일 과정에서 지워진다.
    // ts
    function fn(this: SomeType, x: number){
        // ...
    }
    ==>
    // js
    function fn(x){
        // ...
    }

    TypeScript는 this 매개변수와 함께 호출하는 것이 적절한 컨텍스트에서 완료되었는지를 체크한다.
    화살표 함수를 사용하는 것 대신, 우리는 메서드가 적절하게 호출되었는지를 정적으로 강제하기 위해,
    메서드 정의부에서 this 매개변수를 추가할 수 있다.
*/
class MyClass8{
    name = 'MyClass8';
    getName(this: MyClass8){
        return this.name;
    }
}
const c8 = new MyClass8();
console.log('c8 : ' + c8.getName());   // ok

const g8 = c8.getName;
//console.log(g8());  // error - The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass8'.ts(2684)
/*
    이러한 방식은 화살표 함수의 방식과 정반대의 장단점을 갖게된다.
    - JavaScript호출자는 여전히 클래스 메서드를 적절하지 않게 사용할 수 있다.
    - 하나의 인스턴스가 아니라, 하나의 클래스 정의에 오직 하나의 함수만 할당된다.
    - 기반 클래스에서 정의된 메서드는 super.을 통해 호출될 수 있다.
*/

/*
    ### this Types
    클래스 내에서 this라 불리는 특별한 타입은 현재 클래스의 타입을 동적으로 참조한다.
    (this라는 이름이 매개변수가 아니므로 주의한다.)
    이것이 왜 유용한지 한번 살펴보자.
*/
class Box7{
    contents: string = '';
    set(value: string){
        // (method) Bo7.set(value: string): this
        this.contents = value;
        return this;
    }
}
/*
    여기서, TypeScript는 set의 반환 타입을 Box7 대신, this로 추론한다.
    이제 Box의 하위 클래스를 만들어 보자.
*/
class ClearableBox extends Box7{
    clear(){
        this.contents = '';
    }
}

const a7 = new ClearableBox();
const b7 = a7.set('hello'); // const b7: ClearableBox

// 매개변수 타입 주석에 this를 사용할 수 있다.
class Box8{
    contents: string = '';
    sameAs(other: this){
        return other.contents === this.contents;
    }
}
/*
    이 방식은 other: Box8 이라고 작성하는 것과 다르다.
    파생 클래스가 있는 경우, 그 파생 클래스의 sameAs 메서드는 이제 오직 그 같은 파생 클래스의 인스턴스들에서만 사용할 수 있게 된다.
*/
class DerivedBox8 extends Box8{
    otherContent: string = '?';
}
const base8 = new Box8();
const derived8 = new DerivedBox8();
// derived8.sameAs(base8); 
// error - Argument of type 'Box8' is not assignable to parameter of type 'DerivedBox8'.
//          Property 'otherContent' is missing in type 'Box8' but required in type 'DerivedBox8'.ts(2345)

/*
    this - based Type Guards
    클래스와 인터페이스 내의 메서드에 대한 반환 타입 위치(콜론 뒤)에서 this is Type이라는 표현을 사용할 수 있다.
    이를 타입 내로잉(예 - if문)과 함께 혼합할 때, 타겟 오브젝트의 타입은 특정된 Type으로 내로잉 처리될 것이다.
*/
class FileSystemObject{
    isFile(): this is FileRep{
        return this instanceof FileRep;
    }
    isDirectory(): this is Directory{
        return this instanceof Directory;
    }
    isNetwork(): this is Networked & this{
        return this.networked;
    }
    constructor(public path: string, private networked: boolean){}
}
class FileRep extends FileSystemObject{
    constructor(path: string, public content: string){
        super(path, false);
    }
}
class Directory extends FileSystemObject{
    children: FileSystemObject[] = [];
}
interface Networked{
    host: string;
}

const fso: FileSystemObject = new FileRep('foo/bar.txt', 'foo');
if(fso.isFile()){
    fso.content;    // const fso: FileRep
}else if(fso.isDirectory()){
    fso.children;   // const fso: Directory
}else if(fso.isNetwork()){
    fso.host;   // const fso: Networked & FileSystemObject
}
/*
    this 기반 타입 가드의 일반적인 유스케이스는 특정 필드에 대한 레이지(일부러 느리게 동작하는)한 검증이다.
    예를 들어, 아래 예제는 hasValue가 true일 때, box의 프로퍼티인 value의 타입에서 undefined를 제거한다.
    (undefined 값을 제거하는 것이 아니라 타입에서 undefined를 제거하여 옵셔널이 아닌 것으로 변화한다. 따라서 ? 기호가 사라진다.)
*/
class Box9<T>{
    value?: T;

    hasValue(): this is {value: T}{
        return this.value !== undefined;
    }
}
const box9 = new Box9();
box9.value = 'Gamebox';
// box.value; // error - Property 'value' does not exist on type 'Thing'.ts(2339)

if(box9.hasValue()){
    // box.value; // error - Property 'value' does not exist on type 'Thing'.ts(2339)
}

/*
    ### Parameter Properties
    TypeScript는 생성자 매개변수를 그 이름과 값을 유지한채로 클래스 프로퍼티로 바꾸는 특별한 문법을 제공한다.
    이를 매개변수 프로퍼티라 부르며, 생성자 인수 앞에 가시성 모디파이어 혹은 readonly 모디파이어를 붙여서 생성한다.
*/
class Parames{
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ){
        // this.x =x 와 같은 몸체가 필요 없음
    }
}
const a = new Parames(1, 2, 34);
console.log('Params.x : ' + a.x);   // (property) Params.x: number
// console.log('Params.z : ' + a.z);   // error - Property 'z' is private and only accessible within class 'Parames'.ts(2341)

/*
    ### Class Expressions
    클래스 표현식은 클래스 선언문과 매우 유사하다.
    유일하게 다른 부분은 클래스 표현식은 이름이 필요 없으며, 바인딩된 식별자를 통해 참조할 수 있다는 것이다.
*/
const someClass = class<Type>{
    content: Type;
    constructor(value: Type){
        this.content = value;
    }
};
const m = new someClass('Hello, world'); // const m: someClass<string>

/*
    ### abstract Classes and Members
    TypeScript의 클래스, 메서드 및 필드는 추상적일 수 있다.
    추상 메서드 혹은 추상 필드를 정의할 때에는 자세한 사항을 바로 구현하지 않는다.
    또한 이 멤버들은 반드시 추상 클래스의 내부에 존재해야 한다.
    이 추상 클래스는 직접적으로 인스턴스화 할 수 없다.

    추상 클래스는 '모든 추상 클래스 멤버들을 실제로 구현하는 서브클래스'를 위한 기반 클래스로서 역할한다.
    어떤 클래스가 추상 멤버를 가지고 있지 않다면, 그 클래스를 콘크리트 클래스라고 부른다.
*/
abstract class Base10{
    abstract getName(): string;

    printName(){
        console.log('Hello, ' + this.getName());
    }
}
// const b = new Base10(); // error - Cannot redeclare block-scoped variable 'b'.ts(2451)
/*
    Base10 클래스가 추상 클래스이기 때문에, new를 통해 인스턴스화할 수 없다.
    대신, 파생 클래스를 만들어 추상 멤버를 구현할 필요가 있다.
*/
class Derived10 extends Base10{
    getName(){
        return 'world';
    }
}

const d10 = new Derived10();    // ok
d10.printName();
/*
    만약 기반 클래스의 추상 멤버를 구현하는 것을 잊었다면, 에러가 날 것이다.

class Derived extends Base {
	// 해야할 것을 잊어 버림
	// Non-abstract class 'Derived' does not implement 
  // inherited abstract member 'getName' from class 'Base'.
}
*/

/*
    Abstract Construct Signatures
    추상 클래스로부터 파생된 클래스의 인스턴스를 만드는 생성자 함수를 매개변수로 받고 싶은 경우가 있다.
    다음의 예를 보자.
*/
function greet4(ctor: typeof Base10){
    // const instance = new ctor();    // error - Cannot create an instance of an abstract class.ts(2511)
    // instance.printName();
}
/*
    위 예에서 TypeScript는 추상 클래스를 인스턴스화할 수 없다는 것에 대해 정확히 말해주고 있따.
    주어진 greet의 정의에 따르면, 아래와 같은 코드를 쓰는 것은 완벽하게 적법하게 처리되며,
    추상 클래스를 생성할 수 있는 것처럼 되어 버린다.(물론 이는 옳지 않다)

    greet(Base10);

    이렇게 하는 대신, 생성자 시그니처로 매개변수 타입을 특정하여 함수를 작성하면 된다.
*/
function greet5(ctor: new () => Base10){
    const instance = new ctor();
    instance.getName();
}
greet5(Derived10);
// greet5(Base10);  // error -  Argument of type 'typeof Base10' is not assignable to parameter of type 'new () => Base10'.
                    //          Cannot assign an abstract constructor type to a non-abstract constructor type.ts(2345)
/*
    이제 TypeScript는 어떤 클래스 생성자 함수가 실행 가능한 것인지 적절하게 말해주고 있다.
    즉, Derived10 클래스는 콘크리트 클래스이기 때문에 실행 가능하지만, Base10은 추상 클래스이기 때문에 실행할 수 없다는 것을 잘 체크하고 있다.
*/

/*
    ### Relationshiops Between Classes
    대부분의 경우, 타입스크립트의 클래스는 다른 타입과 마찬가지로, 구조적으로 비교될 수 있다.
    예를 들어, 아래 예제의 두 클래스는 그 둘이 동일하기 때문에 서로 대신 사용할 수 있다.
*/
class Point5{
    x = 0;
    y = 0;
}
class Point6{
    x = 0;
    y = 0;
}
const p: Point5 = new Point6(); // ok

// 유사하게, 명시적인 상속이 없는 클래스들 사이의 서브타입 관계도 존재할 수 있다.
class Person{
    name: string = '';
    age: number = 30;
}
class Employee{
    name: string = '';
    age: number = 40;
    salary: number = 10000;
}
const p2: Person = new Employee();   // ok

/*
    당연한 애기겠지만, 비어있는 클래스는 멤버를 갖고 있지 않다.
    구조적 타입 시스템에서, 멤버가 없는 타입은 일반적으로 모든 다른 타입의 상위 타입이다.
    따라서 만약 비어있는 클래스를 작성한다면, (절대 작성하지 말것) 모든 것이 대체 가능한 것이 된다.
*/
class Empty{}
function fn(x: Empty){
    // x로 아무것도 할 수 없다.
    // 따라서 아무것도 하지 않을 것이다.
}
// fn(window); // ok
fn({});     // ok
fn(fn);     // ok