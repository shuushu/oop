/**
 * 추상 팩토리 패턴을 사용하면 클라이언트에서 추상 인터페이스를 통해서 일련의 제품들을 공급받을 수 있다.
 * (관련성을 갖는 클래스들의 집합을 생성, 다수의 팩토리 메소드패턴을 포함한다.)
 * 이때, 실제로 어떤 제품이 생산되는지는 전혀 알 필요도 없다.
 * 따라서 클라이언트와 팩토리에서 생산되는 제품을 분리시킬 수 있다.
 * js는 클래스를 설명하는 인터페이스가 없다. 따라서 직접 클래스를 생성한다.
 */

// ConcreteProduct: ConcreteFactory가 생성할 객체를 정의하고, AbstractFactory가 정의하는 인터페이스를 구현한다.
const King = (() => {
  class King {
    makeDecision() {
      console.log("King makeDecision");
    }
    marry() {
      console.log("King marry");
    }
  }
  return King;
})();
// ConcreteProduct: ConcreteFactory가 생성할 객체를 정의하고, AbstractFactory가 정의하는 인터페이스를 구현한다.
const LordTywin = (() => {
  class LordTywin {
    makeDecision() {
      console.log("LordTywin makeDecision");
    }
  }
  return LordTywin;
})();
// ConcreteFactory: 구체적인 제품에 대한 객체를 생성하는 연산을 구현한다
class LannisterFactory {
  getKing() {
    return new King();
  }
  getHandOfTheKing() {
    return new LordTywin();
  }
}

// AbstractFactory: 개념적 제품에 대한 객체를 생성하는 연산으로 인터페이스를 정의한다.
class CourtSession {
  private abstractFactory: LannisterFactory;
  private COMPLAINT_THREHOLD: number;
  constructor(abstractFactory: LannisterFactory) {
    this.abstractFactory = abstractFactory;
    this.COMPLAINT_THREHOLD = 10;
  }
  complaintPresented(v: { n: number }) {
    if (v.n < this.COMPLAINT_THREHOLD) {
      this.abstractFactory.getHandOfTheKing().makeDecision();
    } else {
      this.abstractFactory.getKing().makeDecision();
    }
  }
}

/**
 * Builder : 클래스의 구축을 단순화, 빌더를 구현할 때 복잡성을 감소.
 * 새로운 빌더가 필요할 때 생성자 추가 없이 새로운 빌더를 연결한다. (복합 객체 생성)
 */
const Game = {
  // Product : Director가 Builder로 만들어낸 결과물.
  Event: class {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
  },
  // Product : Director가 Builder로 만들어낸 결과물.
  Prize: class {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
  },
  // ConcreteBuilder : 빌더 인터페이스 구현체. 부품을 합성하는 방식에 따라 여러 구현체를 만든다.
  Tournament: class {
    private events: Object[];
    constructor() {
      this.events = [];
    }
    add(v: any) {
      this.events.push(v);
    }
  },
  // Builder : 빌더 인터페이스.
  TournamentFactory: class {
    build() {
      const tournament = new Game.Tournament();
      tournament.add(new Game.Event("Jest"));
      tournament.add(new Game.Prize("Xml"));
      return tournament;
    }
  },
  // Director : Builder를 사용해 객체를 생성한다.
  TournamentBuilder: class {
    build(abstractFactory: { build(): void }) {
      return abstractFactory.build();
    }
  }
};
/**
 * 팩토리 메소드 패턴은 인터페이스를 어떻게 구현할지에 대한 결정 없이
 * 클래스가 인터페이스의 새로운 인스턴스를 요청할 수 있도록 허용
 */
const Religion = {
  교회: class {
    prayTo() {}
  }, //Product
  불교: class {
    prayTo() {}
  }, //Product
  천주교: class {
    prayTo() {}
  }, //Product
  기타: class {
    prayTo() {}
  }, //Product
  // ConcreteFactory: 구체적인 제품에 대한 객체를 생성하는 연산을 구현한다
  GodFactory: (() => {
    function GodFactory() {}
    GodFactory.build = (name: string) => {
      switch (name) {
        case "교회":
          return new Religion.교회();
        case "불교":
          return new Religion.불교();
        case "천주교":
          return new Religion.천주교();
        default:
          return new Religion.기타();
      }
    };
    return GodFactory;
  })(),
  // ProductFactory
  Prayer: class {
    build(godName: string) {
      return Religion.GodFactory.build(godName).prayTo();
    }
  }
};
/**
 * 상글톤
 * 장점: 메모리 낭비를 방지할, 무조건 한번 생성으로 전역성을 띄기에 다른 객체와 공유가 용이
 * 단점: 다른 객체간의 결함도가 높아짐, 사이드이펙트가 발생할 여지, 멀티 쓰래드환경에서 동기화 처리 문제(경함조건)
 */

const Wall: any = class {
  private height: number;

  constructor() {
    this.height = 0;
    if (Wall._instance) {
      return Wall._instance;
    }
    Wall._instance = this;
  }
  setHeight(v: number) {
    this.height = v;
  }
};
Wall.getInstance = () => {
  if (!Wall._instance) {
    Wall._instance = new Wall();
  }
  return Wall._instance;
};
Wall._instance = null;

export { LannisterFactory, Wall, Game, Religion, CourtSession };
