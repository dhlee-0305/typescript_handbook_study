/*
    타입스크립트의 타입 시스템은 다른 타입에 기반하여 또다른 타입을 표현할 수 있기 때문에 매우 강력하다.

    이러한 아이디어의 가장 단순한 형태는 제네릭이다.
    이외에도 매우 다양한 타입 연산자가 존재한다.
    예를 들어, 우리가 이미 가지고 있는 값에 기반하여 타입을 표현하는 것도 가능하다.

    다양한 타입 연산자를 조합하여, 우리는 복잡한 동작과 값을 간결하고, 유지보수성이 높은 방식으로 표현할 수 있다.
    이 섹션에서 우리는 기존 타입과 값에 기반하여 새로운 타입을 표현하는 아래와 같은 방법들을 알아볼 것이다.

    - 제네릭(generics) : 매개변수를 받는 타입
    - keyof 타입 연산자 : keyof 연산자를 사용하여 새로운 타입을 생성
    - typeof 타입 연산자 : typeof 연산자를 사용하여 새로운 타입을 생성
    - 인덱스 엑세스 타입(indexed access types) : Type['a'] 문법을 사용하여 타입의 서브셋에 접근
    - 컨디셔널 타입(conditional type) : if문과 같은 동작을 하는 타입
    - 맵트 타입(mapped types) : 기존 타입 내의 각 프로퍼티를 맵핑하여 새로운 타입을 생성
    - 템플릿 리터럴 타입: 템플릿 리터럴 문자열을 사용하여 프로퍼티를 변경시키는 맵트 타입
*/