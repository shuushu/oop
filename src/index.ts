import { LannisterFactory, Wall, Religion, Game, CourtSession } from "./create";
// [추상팩토리] Client: AbstractFactory와 AbstractProduct 클래스에 선언된 인터페이스를 사용한다.
const a1 = new CourtSession(new LannisterFactory());
a1.complaintPresented({ n: 8 });
a1.complaintPresented({ n: 12 });

const a2 = new Game.TournamentBuilder().build(new Game.TournamentFactory());

const Prayer = class {
  build(godName: string) {
    return new Religion.GodFactory().build(godName);
  }
};
//const a2 = new CourtSession(new )
console.clear();
console.log(new Prayer().build("불교"));
//
const wall = Wall.getInstance();
//console.log(wall, Wall);
