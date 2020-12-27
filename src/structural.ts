/**
 * [adapter-호환성] implementation의 인터페이스를 사용하기에 적합하지 않을때
 * 리팩토링헤 필요힌  부분에 맞추지만, 다음 케이스 유용하다
 * 1. 제 3자가 작성한 코드에 들어 있으면 직접 접근이 불가능한 경우
 * 2. implementation이 애플리케이션의 인터페이스에 이미 사용되고 있는 경우
 */
// interface class
class Ship {
  setRubberAngleTo(angle: number) {}
  setSailAngle(id: number, angle: number) {}
}
// adapter
const ShipAdapter = class {
  private _ship: Ship;
  constructor() {
    this._ship = new Ship();
  }
  turnLeft() {
    this._ship.setRubberAngleTo(-30);
    this._ship.setSailAngle(5, -9);
    console.log("turnLeft");
  }
  TurnRight() {}
  GoForward() {}
};
/**
 * [facade-간편성]
 * 간략화된 인터페이스를 제공하는 어댑터의패턴의 특별한 경우다.
 * API를 다룰 때 유용,
 */
interface 데이터 {
  update(time?: string): string;
}
interface 날짜 {
  update(date: string): void;
}
interface 시간 {
  update(time?: string): string;
}
interface 키워드 {
  update(v: string): void;
}
const 오늘 = {
  데이터: class implements 데이터 {
    update() {
      return "async 결과값";
    }
  },
  날짜: class implements 날짜 {
    update(data: string) {
      // 지우기
      // 그리기
    }
  },
  시간: class implements 시간 {
    update(data?: string) {
      return "2020";
    }
  },
  키워드: class {
    init(data: string) {}
    update(v: string) {}
  },
  인터페이스: class {
    time: 시간;
    data: 데이터;
    date: 날짜;
    word: 키워드;
    constructor() {
      this.data = new 오늘.데이터();
      this.date = new 오늘.날짜();
      this.time = new 오늘.시간();
      this.word = new 오늘.키워드();
    }
    async 초기화() {
      const DATA = await this.data.update();
      await this.date.update(DATA);
      await this.time.update(DATA);
      await this.word.update(DATA);
    }

    시간업데이트() {
      const v = this.data.update(this.time.update());
      this.word.update(v);
    }
  }
};

/**
 * bridge: 일관된 인터페이스를 제공하여 동일하게 취급할 수 있다.
 * 복잡한 일련의 객체들의 결합이 필요할때 유용
 */
// interface
const Religion = {
  OldGods: class {
    prayTo(v: { name: string }) {
      console.log(v.name);
    }
  },
  DrownedGod: class {
    prayTo() {}
  },
  SevenGods: class {
    prayTo() {}
  },
  희생: class {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
  },
  공양: class {}
};

// bridgeAdapter
const bridgeAdapter = {
  OldGodsAdapter: class {
    private _oldGods: { [index: string]: any };
    constructor() {
      this._oldGods = new Religion.OldGods();
    }
    prayTo() {
      this._oldGods.prayTo(new Religion.희생("희생"));
    }
  },
  DrownedGodAdapter: class {
    private _humanGods: { [index: string]: any };
    constructor() {
      this._humanGods = new Religion.DrownedGod();
    }
    prayTo() {
      this._humanGods.prayTo(new Religion.공양());
    }
  },
  SevenGodsAdapter: class {
    prayTo() {
      console.log(`this._SevenGods.prayTo(new Religion.##());`);
    }
  }
};
/**
 * composite: 트리구조에서 유용(dom)
 * 자신과 같은 타입의 인스턴스를 포험할 수 있다.
 * 주요 기능은 자식요소들과 컴포넌트의 상호교환이다.
 */
interface 구성 {
  이름: string;
  칼로리: number;
  비타민: number;
  getName(): string;
  getCalories(): number;
  getVitamin(): number;
}

const 레시피 = {
  // 리프노드 base class
  재료: class implements 구성 {
    이름: string;
    칼로리: number;
    비타민: number;
    constructor(a: string, b: number, c: number) {
      this.이름 = a;
      this.칼로리 = b;
      this.비타민 = c;
    }
    getName() {
      return this.이름;
    }
    getCalories() {
      return this.칼로리;
    }
    getVitamin() {
      return this.비타민;
    }
  },
  // composite
  요리: class {
    이름: string;
    재료: 구성[];
    constructor(name: string) {
      this.이름 = name;
      this.재료 = [];
    }
    add(inst: 구성): void {
      this.재료.push(inst);
    }
    // builder
    create(item: 구성[]) {
      item.forEach((v) => {
        this.add(v);
      });
    }
    getName(): string {
      return this.이름;
    }
    getItem() {
      return this.재료.map((v) => v.getName());
    }
    getCalories() {
      return this.재료.reduce((p: number, n: 구성) => {
        return p + n.getCalories();
      }, 0);
    }
    getVitamin() {
      return this.재료.reduce((p: number, n: 구성) => {
        return p + n.getVitamin();
      }, 0);
    }
  }
};

/**
 * [decorator-확장성] 기존의 클래스를 형태나 동작을 변경하거나 확장하는 데 쓰임
 * 어댑터나 브릿지 패턴과 유사한 원리로 동작, 상속이 제한적인 시나리오에 적합
 */
interface 아머 {
  damege(): number;
}
const 상의 = {
  // base class
  티셔츠: class implements 아머 {
    damege() {
      return 100;
    }
  },
  // decorator
  조끼: class {
    armor: 아머;
    constructor(v: 아머) {
      this.armor = v;
    }
    damege(hit: number) {
      const caclu = this.armor.damege() - hit * 0.8;
      return caclu > 0 ? caclu : "사망";
    }
  }
};

export { ShipAdapter, bridgeAdapter, 레시피, 상의, 오늘 };
