import { LannisterFactory, Wall, Religion, Game, CourtSession } from "./create";
// [추상팩토리] Client: AbstractFactory 클래스에 선언된 인터페이스를 사용한다.
const a1 = new CourtSession(new LannisterFactory());
a1.complaintPresented({ n: 8 });
a1.complaintPresented({ n: 12 });
// Builder를 사용해 객체를 생성한다.
const a2 = new Game.TournamentBuilder().build(new Game.TournamentFactory());
// [팩토리메소드] Client: ProductFactory에서 클래스에 선언된 인터페이스를 사용한다.
const a3 = new Religion.Prayer().build("뷸교");

const wall = Wall.getInstance();
//console.log(wall, Wall);
