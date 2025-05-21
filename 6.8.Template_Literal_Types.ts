export {};

/*
    템플릿 리터럴 타입은 문자열 리터럴 타입을 기반으로 하며, 유니온을 이용하여, 원하는 만큼, 타입으로 허용할 문자열의 개수를 늘릴 수 있다.
    JavaScript의 템플릿 리터럴 문자열과 같은 문법을 사용하지만, 타입을 작성하는 위치에서 사용된다는 점이 다르다.
    콘크리트 리터럴 타입(아래 예제의 world)과 함께 사용할 때, 템플릿 리터럴은 내용들을 연결지음으로써 새로운 문자열 리터럴 타입을 생성한다.
*/
type World = "world";
type Greeting = `hello ${World}`;

// 유니온 타입을 템플릿 리터럴 내에서 ${}와 함께 보간된(interpolated, 중간에 끼여있는) 위치에 넣으면,
// 각 유니온 멤버에 해당하는 모든 리터럴 타입을 갖는 새로운 유니온 타입을 반환한다.

type EmailLocaleIDs = 'welcom_email' | 'email_heading';
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff';

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// AllLocationIDs는 'welcom_email_id' | 'email_heading_id' | 'footer_title_id' | 'footer_sendoff_id' 

// 각 템플릿 리터럴의 보간 위치에서, 유니온은 교차 곱셈 처리된다.
type Lang = 'en' | 'ja' | 'pt';
type LocaleMessageIDs = `$[Lang}_${AllLocaleIDs}`;
// type LocaleMessageIDs =  'en_welcom_email_id' | 'en_email_heading_id' | 'en_footer_title_id' | 'en_footer_sendoff_id' | 
//                          'ja_welcom_email_id' | 'ja_email_heading_id' | 'ja_footer_title_id' | 'ja_footer_sendoff_id' | 
//                          'pt_welcom_email_id' | 'pt_email_heading_id' | 'pt_footer_title_id' | 'pt_footer_sendoff_id']`
// 일반적으로 위와 같이 개수가 많은 문자열 유니온은 사전에 생성하는 것을 권장하지만, 위와 같은 방식도 규모가 크지 않다면 유용하다 할 수 있다.

/*
    ### String Union Types
    템플릿 리터럴의 진가는 타입 내에 존재하는 기존 문자열을 기반하여 새로운 문자열을 정의할 때 나타난다.
    현재 가지고 있는 필드에 기반하여 새로운 오브젝트로 호가장하는 패턴이 그 예다.
    어떤 값이 변화하였을 때 이에 대한 알림을 주는 on 메서드 타입을 정의해 보자.
*/
const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});
person.on('firstNameChanged', (newValue) => {
    console.log(`firstName was changed to ${newValue}`);
});
/*
    on 메서드가 firstName이 아니라 firstNameChanged를 리스닝하고 있다는 것에 주목하자.
    템플릿 리터럴은 이래와 같이 타입 시스템 내에서 이러한 방식의 문자열 조작을 처리하는 방법을 제공해준다.(`${string & keyof Type}Changed`)
*/
type PropEventSource<Type> ={
    on(eventName: `${string & keyof TYpe}}Changed`, callback: (newValue: any) => void): void;
}
// 'on' 메서드와 함께 'watched object'를 생성한다.
// 이에 따라 프로퍼티의 변화를 감시할 수 있다.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

// 이제 on 메서드에 잘못된 프로퍼티가 주어졌을 때 에러를 발생시킬 수 있게 되었다.

person.on('firstName', () => {}); // error - Argument of type '"firstName"' is not assignable to parameter of type '`${string}}Changed`'.ts(2345)
person.on('firtNameChanged', () => {}); // error - Argument of type '"firtNameChanged"' is not assignable to parameter of type '`${string}}Changed`'.ts(2345)

/*
    ### Inference with Template Literals
    위의 예제에서 어떻게 원본값의 타입을 재사용하지 않았는지 다시 한번 살펴보자.
    콜백 함수는 any 타입을 매개변수로 사용하였으며, 템플릿 리터럴 타입은 대체되는 위치로부터 그 탕비을 추론할 수 있었다.
    이제 위의 예제에서 eventName 문자열의 일부로부터 연결된 프로퍼티의 타입이 무엇인지 추론하는 제네릭을 만들어보자.
*/
type PropEventSource2<Type> ={
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[key]) => void): void;
};
declare function newWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person2 = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
})

person2.on('ageChanged', newAge => {
    // (parameter) newAge: number
    if(newAge < 0){
        console.log('warning! negative age');
    }
});
/*
    여기서 우리는 on을 제네릭 메서드로 만들었다.
    firstNameChanged 문자열로 이 on 메서드를 호출하면, 타입스크립트는 Key에 맞는 타입을 추론하려 할 것이다.
    이를 위해, Key에 해당하는 문자열 + Changed 문자열을 조합하여 매치할 것이다.
    타입스크립트가 이렇게 템플릿 리터럴의 내용을 알아낸 뒤에 on 메서드는 원본 오브젝트에 있는 firstName의 타입(string 타입)을 불러올 수 있다.
    이와 유사하게 ageChanged 문자열로 호출하면, TypeScript는 age 프로퍼티의 타입인 number를 찾아낸다.
    추론인 이렇게 문자열을 해제하고 새로운 구조로 재구서함으로써 여러가지 방법으로 조합할 수 있다.
*/

/*
    ### Intrinsic String Manipulation Types
    문자열 조작을 돕기 위해, TypeScript는 고유 문자열 조작 타입(Intrinsic String Manipulation Types)을 준비해두었다.
    이 타입들은 퍼포먼스를 위해 컴파일러에 내장화되어 있어, TypeScript에 포함된 .d.ts 파일에서 찾을 수 없다.

    Uppercase<StringType>
    문자열의 각 문자를 대문자화한다.    

    Lowercase<StringType>
    문자열의 각 문자를 소문자화한다.

    Capitalize<StringType>
    문자열의 가장 첫 번째 글자를 대문자로 바꾼다.

    Uncapitalize<StringType>
    문자열의 가장 첫번째 글자를 소문자로 바꾼다.

*/
type Greeting2 = 'Hello World';
type Greeting3 = 'hello world';
type ShoutyGreeting = Uppercase<Greeting2>;     // type ShoutyGreeting = 'HELLO WORLD'
type QuietGreeting = Lowercase<Greeting2>;      // type QuietGreeting = 'hello world'
type LowerCapitalizedGreeting = Uncapitalize<Greeting2>;    // type LowerCapitalizedGreeting = "hello World"
type UpperCapitalizedGreeting = Capitalize<Greeting3>;      // type UpperCapitalizedGreeting = "Hello world"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type ASCIICacheKey2<Str extends string> = `id-${Lowercase<Str>}`;
type MainID = ASCIICacheKey<'my_app'>; // type MainID = 'ID-MY_APP'
type SubID = ASCIICacheKey2<'MY_APP'>; // type SubID = 'ID-MY_APP'
