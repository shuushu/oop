/**
 * [adapter] implementation의 인터페이스를 사용하기에 적합하지 않을때
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
  // 리프노드
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

export { ShipAdapter, bridgeAdapter, 레시피 };
