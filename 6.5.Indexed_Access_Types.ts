export {};

// 타입의 특정 프로퍼티를 찾기 위해서 인덱싱된 접근 타입을 사용할 수 있습니다.
type Person = { age: number; name: string; alive: boolean};
type Age = Person["age"];   // type Age = number

// 인덱싱된 타입은 그 자체로도 타입이라서 유니어, keyof 혹은 타입 전체에 사용할 수 있습니다.
type I1 = Person["age" | "name"];   // type I1 = string | number
type I2 = Person[keyof Person];     // type I2 = string | number | boolean

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];      // type I3 = string | boolean

// 존재하지 않는 프로퍼티를 인덱싱 하려고 하면 오류가 발생합니다.
// type I4 = Person["alv"];        // error - Property 'alv' does not exist on type 'Person'.ts(2339)

/*
    또 다른 예로는 임의의 타입을 number로 인덱싱해서 배열 요소의 타입을 가져올 수 있습니다.
    typeof와 결합하면 편리하게 배열 리터럴의 요소 타입을 캡쳐할 수 있습니다.
*/
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type Person2 = typeof MyArray[number];
/*
    type Person2 = {
        name: string;
        age: number;
    }
*/
type Age2 = typeof MyArray[number]["age"];  // type Age2 = number
type Age3 = Person["age"];  // type Age3 = number
// 인덱싱할 때 변수 참조를 위해 사용된 const는 사용할 수 없고, 오로지 타입만 사용 가능합니다.
const key = "age";
// type Age4 = Person[key];    // error - Type 'key' cannot be used as an index type.ts(2538)

// 하지만, 비슷한 스타일의 리팩터로 타입 별칭을 사용할 수 있습니다.
type key2 = "age";
type Age5 = Person[key2];   // ok