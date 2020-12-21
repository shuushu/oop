import {
  LannisterFactory,
  Lannister,
  Wall,
  Religion,
  Game,
  CourtSession
} from "./create";
import { ShipAdapter } from "./structural";

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
// [adapter] implementation
const ship = new ShipAdapter();
ship.turnLeft();
