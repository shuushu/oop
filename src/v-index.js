import { JsonData, XmlData } from "./request";

// 그리기
const Renderer = class {
  async draw(data) {
    let info = await data.getData();
    this._draw(info);
  }
  _draw() {
    throw Error("직접 호출 금지");
  }
};
const tableDraw = class extends Renderer {
  constructor(target) {
    super();
    this.target = target;
  }
  _draw(data) {
    if (!data) {
      throw "undefined is data";
    }

    const container = document.querySelector(this.target);
    const tableNode = document.createElement("table");

    const list = data.reduce((tbody, item) => {
      let tr = document.createElement("tr");

      for (const props in item) {
        const td = document.createElement("td");

        td.innerHTML = item[props];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
      return tbody;
    }, document.createElement("tbody"));
    tableNode.appendChild(list);
    container.appendChild(tableNode);
  }  
};

const data = new JsonData("https://jsonplaceholder.typicode.com/posts/");
const data2 = new XmlData({
  url: "//apis.data.go.kr/9760000/WinnerInfoInqireService2/getWinnerInfoInqire",
  params: {
    ServiceKey:
      "aZgVZa3aqywcuWxb25f3DLfpCecd66A1FraIRGAy1Cz9ws4JS%2BRqMvcRxrHPzp%2BwkBL%2BKdc63cbdPF7oFVeyQg%3D%3D",
    sgId: 20160413,
    sgTypecode: 2
  }
});
const render = new tableDraw("#app");
render.draw(data);
/*
const odd = function*(data) {
  for (const i of data) if (i % 2) yield i;
};

const take = function*(data, n) {
  for (const v of data)
    if (n--) yield v;
    else break;
};

//console.log(...odd([1,2,3]))
//console.log(...take([1,2,3,4,5],2))

const Stream = class {
  static init(v) {
    return new Stream(v);
  }
  constructor(vv) {
    this.data = vv;
  }
  add(f, n) {
    this.data = [...f(this.data, n)];
    return this;
  }
  *gone() {
    yield* this.data;
  }
};
for (const v of Stream.init([1, 4, 5, 6, 7, 8, 9])
  .add(odd)
  .add(take, 5)
  .gone()) {
  console.log(v);
}
*/
//for (const vv of ) console.log(vv)
