/**
 * 추상팩토리: 대규모 변경이 필요한 경우, 여러 객체들이 대체 없이 같이 사용되어햐 하는 경우 유용
 */

// 구상클래스1
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
// 구상클래스2
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
 * 다음을 분리한다. : 객체 생성, 객체 표현하는 방법
 * Builder : 빌더 인터페이스.
 * ConcreteBuilder : 빌더 인터페이스 구현체. 부품을 합성하는 방식에 따라 여러 구현체를 만든다.
 * Director : Builder를 사용해 객체를 생성한다.
 * Product : Director가 Builder로 만들어낸 결과물.
 */
const Game = {
  // 구상클래스1
  Event: class {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
  },
  // 구상클래스2 prize: 상품
  Prize: class {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
  },
  // ConcreteBuilder
  Tournament: class {
    private events: Object[];
    constructor() {
      this.events = [];
    }
    add(v: any) {
      this.events.push(v);
    }
  },
  // Product 토너먼트 팩토리
  TournamentFactory: class {
    build() {
      const tournament = new Game.Tournament();
      tournament.add(new Game.Event("Jest"));
      tournament.add(new Game.Prize("Xml"));
      return tournament;
    }
  },
  // director(조합)
  TournamentBuilder: class {
    build(abstractFactory: { build(): void }) {
      return abstractFactory.build();
    }
  }
};
/**
 * 팩토리메소드
 * 부모(상위) 클래스 코드에 구체 클래스 이름을 감추기 위한 방법으로도 사용(객체 생성을 캡슐화)
 *
 */
const Religion = {
  교회: class {},
  불교: class {},
  천주교: class {},
  기타: class {},
  GodFactory: class {
    build(name: string) {
      let value: Object;
      switch (name) {
        case "교회":
          value = new Religion.교회();
          break;
        case "불교":
          value = new Religion.불교();
          break;
        case "천주교":
          value = new Religion.천주교();
          break;
        default:
          value = new Religion.기타();
          break;
      }
      return value;
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
