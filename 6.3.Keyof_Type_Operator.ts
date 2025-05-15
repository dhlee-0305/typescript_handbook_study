export {};
/*
    keyof 타입 연산자
    keyof 연산자는 객체 타임에서 객체의 키 값들을 숫자나 문자열 리터럴 유니언을 생성합니다.
    아래 타입 P는 "x" | "Y"와 동일한 타입니다.
*/
type Point = {x: number, y: number};
type p = keyof Point;   // type p = keyof Point

// 만약 타입이 string이나 number 인덱스 시그니처를 가지고 있다면, keyof는 해당 타입을 리턴합니다.
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;    // type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;  // type M = string | number
/*
    위에서 주목할 점은 M은 string | number 라는점 입니다.
    JavaScript 객체 키는 항당 문자열을 강제하기 때문에, obj[0]은 obj["0"]과 동일합니다.

    keyof 타입은 추후 학습할 매핑된 타입과 함께 사용할 때 특히 유용합니다.
*/