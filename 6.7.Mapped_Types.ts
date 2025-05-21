export {};

/*
    중복을 피하기 위해서 다른 타입을 바탕으로 새로운 타입을 생성할 수 있습니다.
    매팅된 타입은 이전에 선언하지 않았던 프로퍼티의 타입을 선언할 수 있는 인덱스 시그니처 문법으로 구성됩니다.
*/
type OnlyBooleanHorses = {
    [key: string]: boolean | Horse;
};
type Horse = {
    name: string;
    age: number;
};

const conforms: OnlyBooleanHorses = {
    del: true,
    rodney: false,
};

/*
    매핑된 타입은 PropertyKey(keyof을 통해서 자주 생성되는)의 조합을 사용하여 키를 통해 타입을 반복적으로 생성하는 제네릭 타입입니다.
*/
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

/*
    다음 예제에서, OptionsFlag는 Type 타입의 모든 프로퍼티를 가져와서 해당 값을 불린으로 변경합니다.
*/
type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
};
type FeatureFlagsOptions = OptionsFlags<FeatureFlags>;
/*
    type FeatureFlagsOptions = {
        darkMode: boolean;
        newUserProfile: boolean;
    }
*/

/*
    ### Mapping Modifiers
    매핑중에 추가할 수 있는 수정자로 readonly와 ?가 있습니다. 각각 가변성과 선택성에 영향을 미칩니다.
    - 또는 +를 접두사로 붙여서 이런 수정자를 추가하거나 제거할 수 있습니다. 접두사를 추가하지 않으면 +로 간주합니다.
*/
// 타입 프로퍼티에서 'readoonly' 속성을 제거합니다.
type CreateMutable<Type> ={
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
/*
    type UnlockedAccount = {
        id: string;
        name: string;
    }
*/

// 타입 프로퍼티에서 'optional' 속성을 제거합니다.
type  Concrete<Type> ={
    [Property in keyof Type]-?: Type[Property];
};
type MaybeUser = {
    id: string;
    name?: string;
    age: number;
};
type User = Concrete<MaybeUser>;
/*
    type User = {
        id: string;
        name: string;
        age: number;
    }
*/

/*
    ### Key Remapping via as
    TypeScript 4.1 이상에서는 매핑된 타입에 as 절을 사용해서 매핑된 타입의 키를 다시 매핑할 수 있습니다.
*/
type MappedTypeWithNewProperties<Type>={
    [Properties in keyof Type as NewKeyType]: Type[Properties];
};
type NewKeyType = string;

// 템플릿 리터럴 타입과 같은 기능을 활용해서 이전 프로퍼티에서 새로운 프로퍼티 이름을 만들 수 있습니다.

type Getters<Type> = {
    [Properties in keyof Type as `get${Capitalize<string & Properties>}`]: () => Type[Properties];
};

interface Person{
    name: string;
    age: number;
    loaction: string;
}
type LazyPerson = Getters<Person>;
/*
    type LazyPerson = {
        getName: () => string;
        getAge: () => number;
        getLoaction: () => string;
    }
*/
// 조건부 타입을 통해 never를 생성해서 키를 필터릴할 수 있습니다.

// 'kind' 프로퍼티를 제거합니다.
type RemoveKindField<Type> ={
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};
interface Circle{
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
/*
    type KindlessCircle = {
        radius: number;
    }
*/
// string | number | symbol 의 조합뿐만 아니라 모든 타입의 조합을 임의로 매핑할 수 있습니다.

type EventConfig<Events extends {kind: string}> ={
    [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = {kind: "square", x: number, y: number};
type CircleEvent = {kind: "circle", radius: number};

type Config = EventConfig<SquareEvent | CircleEvent>;
/*
    type Config = {
        square: (event: SquareEvent) => void;
        circle: (event: CircleEvent) => void;
    }
*/

/*
    Further Exploration
    매핑된 타입은 타입 조작 섹션의 다른 기능들과 잘 동작합니다.
    예를 들어 객체의 pi 프로퍼티가 true로 설정되어 있는지에 따라 true 혹은 false를 반환하는 조건부 타입을 사용한 매핑된 타입이 있습니다.
*/
type ExtractPII<Type>  = {
    [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false;
};
type DBFields ={
    id: {format: "incrementing"};
    name: {type: string, pii: true};
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
/*
    type ObjectsNeedingGDPRDeletion = {
        id: false;
        name: true;
    }
*/