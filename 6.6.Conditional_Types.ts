export {};

/*
    대부분 유용한 프로그램의 핵심은, 입력에 따라 출력이 결정되어야 한다는 것입니다.
    JavaScript 프로그램도 크게 다르지 않지만, 값의 타입을 쉽게 검사할 수 있다는 사실을 고려할 때, 
    출력에 대한 결정은 또한 입력의 타입에도 기반합니다.
    조건부 타입은 입력과 출력 타입간의 관계를 설명하는 데 도움을 줄 수 있습니다.
*/

interface Animal{
    live(): void;
}
interface Dog extends Animal{
    woof(): void;
}
type Example1 = Dog extends Animal ? number : string;

/*
    extends를 기준으로 왼쪽에 있는 타입이 오른쪽 타입에 할당할 수 있다면 첫 번째 분기("참"값 분기)를,
    그렇지 않다면 뒤의 분기("거짓"값 분기)를 얻게 됩니다.

    Dog extends Animal에 따라 number나 string인지 알려주는 것 말곤,
    위의 예제에서 조건부 타입은 그다지 유용해 보이지 않습니다.
    하지만 제네릭과 함께 사용될 때 조건부 타입은 강력한 힘을 갖습니다.
    예를 들어, 다음 crateLabel 함수를 살펴보겠습니다.
*/
interface IdLabel{
    id: number  /* some fields */;
}
interface NameLabel{
    name: string /* other fields */;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel{
    throw "unimplemented";
}
/*
    createLabel의 오버로드들은 입력 타입에 따른 단일 JavaScript 함수를 나타냅닌다. 다음을 주목하세요.
    1. 만약 라이브러리가 매번 API 전체에서 비슷한 종류의 함수를 만들어야 한다면 번거로워집니다.
    2. 우린 3가지 오버로드 즉, 각 케이스별로 확실한 타입을 가지거나 (각각 number와 string) 그리고 일반적인 케이스 (string | number)를 가져야 합니다.
        createLabe의 새로운 타입을 다루기 위해선 오버로드의 수는 기하급수적으로 증가합니다.
    대신 조건부 타입으로 로직을 인코딩할 수 있습니다.
*/
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
// 조건부 타입을 사용하면 단일 함수까지 오버로드 없이 단순화 시킬 수 있습니다.
function createLabel2<T extends number | string>(idOrName: T): NameOrId<T>{
    throw "unimplemented";
}
let a = createLabel2("typescript");  // let a: NameLabel
let b = createLabel2(2.8);   // let b: IdLabel
let c = createLabel2(Math.random() ? "hello" : 43);  // let c: NameLabel | IdLabel

/*
    조건부 타입으로 제한하기
    종종 조건부 타입의 검사에서 새로운 정보를 얻을 수 있습니다.
    타입 가드가 더 구체적인 타입으로 좁혀주듯이, 조건부 타입의 "참"값 분기는 대조하는 타입에 따라서 제네릭을 더 제한할 수 있습니다.
*/
// type MessageOf<T> = T["message"];   // error - Type '"message"' cannot be used to index type 'T'.ts(2536)
// 위 예제에서, T가 message 프로퍼티를 가지고 있는지 알 수 없기 때문에 TypeScript에서 오류가 발생합니다.
// T의 타입을 제한해서 TypeScript가 더 이상 오류를 내지 않도록 만들 수 있습니다.
type MessageOf<T extends {message: unknown}> = T["message"];
interface Email{
    message: string;
}
type EmailMessageContents = MessageOf<Email>;    // type EmailMessageContents = string

// 하지만 MessageOf가 아무 타입이나 받을 수 있고, message 프로퍼티가 없으면 never 타입으로 결정하도록 만들 수 있을까요?
// 여기서 제약 조건을 외부로 옮기고, 조건부 타입을 적용하면 가능합니다.
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;
interface Email2 {
    message: string;
}
interface Dog{
    bark(): void;
}
type EmailMessageContents2 = MessageOf2<Email2>;    // type EmailMessageContents2 = string
type DogMessageContents = MessageOf2<Dog>;  // type DogMessageContents = never

/*
    "참"값 분기내에서는 TypeScript는 T가 message 프로퍼티를 가지고 있는 것을 알 수 있습니다.

    또 다른 예제에서 배열 타입이면 배열의 기본 요소 타입으로 평탄화 시키지만,
    배열 타입이 아니면 그대로 유지하는 Flatten 타입을 만들 수 있습니다.
*/
type Flatten<T> = T extends any[] ? T[number] : T;

type str = Flatten<string[]>;   // type str = string
type num = Flatten<number>; // type num = number
// Flatten에 배열 타입이 주어지면, number를 사용한 인덱스 접근을 통해 string[] 요소 타입을 가져올 수 있습니다.
// 그렇지 않으면 주어진 타입을 반환합니다.

/*
    조건부 내에서 추론하기
    위에서 제약 조건을 가진 조건부 타입을 이요해서 타입을 추출할 수 있다는 점을 살펴봤습니다.
    이 부분은 조건부 타입을 더 쉽게 만드는 평탄화 작업이 됩니다.

    조건부 타입은 infer 키워드를 사용해서 "참"값 분기에서 비교하는 타입 추론할 수 있습니다.
    예를 들어, Flatten에서 인덱싱된 접근 타입으로 "직접" 추출하지 않고 요소 타입을 추론할 수 있습니다.
*/
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;
/*
    여기 "참"값 분기에서 T 의 요소 타입을 어떻게 제시할 필요 없이 infer 키워드를 새 제네릭 타입 변수 Item에 선언적으로 사용했습니다.
    이 방식은 관심 있는 타입의 구조를 깊게 분석하지 않아도 되도록 만들어줍니다.

    infer 키워드를 사용해서 유용한 헬퍼 타입 별칭을 사용할 수 있습니다.
    예를 들어 함수 타입에서 리턴 타입을 추출하는 간단한 케이스를 살펴보겠습니다.
*/
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
type Num2 = GetReturnType<() => number>;    // type Num2 = number
type Str2 = GetReturnType<(x: string) => string>;   // type Str2 = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;  // type Bools = boolean[]

/*
    여러 호출 시그니처(오버로트 함수 타입 같이)를 가진 타입을 추론할 때, 마지막 시그니처(아마, 모든 케이스에 허용되는)로 추론하게 됩니다.
    인자 타입의 목록에 기반해서 오버로드를 처리할 수는 없습니다.
*/
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;   // type T1 = string | number

/*
    ### 분산적인 조건부 타입
    제네릭 타입 위에서 조건부 타입은 유니언 타입을 만나면 분산적으로 동작합니다.
*/
type ToArray<Type> = Type extends any ? Type[] : never;
// ToArray에 유니언 타입을 넘기면 조건부 타입은 유니언의 각 멤버에 적용됩니다.
type StrArrOrNumArr = ToArray<string | number>; // type StrArrOrNumArr = string [] | number []
/*
    StrArrOrNumArr이 동작하는 방식은 다음과 같습니다.
    string | number
    유니언의 각 멤버 타입은 효율적으로 매핑됩니다.
    ToArray<string> | ToArray<number>
    그리고 다음과 같은 결과가 나옵니다.
    string [] | number []
    일반적으로 분산성이 원하는 동작입니다.
    이러한 동작을 방지하려면 extends 키워드의 양 옆을 대괄호로 감싸면 됩니다.
*/
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArr2 = ToArrayNonDist<string | number>; // type StrArrOrNumArr2 = (string | number)