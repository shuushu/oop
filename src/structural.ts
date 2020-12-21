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
export { ShipAdapter };
