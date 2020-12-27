import {
  LannisterFactory,
  Lannister,
  Wall,
  Religion,
  Game,
  CourtSession
} from "./create";
import { ShipAdapter, bridgeAdapter, 레시피, 오늘, 상의 } from "./structural";

// [추상팩토리] Client: AbstractFactory 클래스에 선언된 인터페이스를 사용한다.
const a1 = new CourtSession(new LannisterFactory());
// Builder를 사용해 객체를 생성한다.
const a2 = new Game.TournamentBuilder().build(new Game.TournamentFactory());
// [팩토리메소드] Client: ProductFactory에서 클래스에 선언된 인터페이스를 사용한다.
const a3 = new Religion.Prayer().build("뷸교");
// client Singleton
const wall = Wall.getInstance();
// [proto] Client : 원형에 자기 자신의 복제를 요청하여 새로운 객체를 생성
const jj = new Lannister();
jj.age = 13;
const dd = jj.clone();
// [adapter] implements
const ship = new ShipAdapter();
ship.turnLeft();
// [bridgeAdapter] implements
[
  new bridgeAdapter.DrownedGodAdapter(),
  new bridgeAdapter.OldGodsAdapter(),
  new bridgeAdapter.SevenGodsAdapter()
].forEach((inst) => inst.prayTo());

// [composite] implements
const 우유 = new 레시피.재료("우유", 12, 23);
const 달걀 = new 레시피.재료("달걀", 4, 33);
const 박력분 = new 레시피.재료("박력분", 0, 3);

const 에그타르트 = new 레시피.요리("에그타르트");
// builder implements
에그타르트.create([우유, 달걀, 박력분]);

console.log(`${에그타르트.이름} 총 칼로리는 ${에그타르트.getCalories()}이다.`);
console.log(`${에그타르트.이름} 들어간 재료는 ${에그타르트.getItem()}이다.`);

const 조끼 = new 상의.조끼(new 상의.티셔츠());
console.log(조끼.damege(23));

console.clear();
const today = new 오늘.인터페이스();
today.초기화();
