import axios from "axios";

const Axios = axios.create({
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" }
});

// 데이터 유호성 체크
const Validator = class {
  constructor(data) {
    this.data = data;
  }
  checkValidator() {
    if (!Array.isArray(this.data)) {
      throw "type Error";
    }
    return this.data.map(list => {
      const { userId, id, title, body } = list;
      if (typeof userId !== "number" || !userId) throw Error("not userId");
      if (typeof id !== "number" || !id) throw Error("not id");
      if (typeof title !== "string" || !title) throw Error("not title");
      if (typeof body !== "string" || !body) throw Error("not body");
      return {
        userId,
        id,
        title,
        body
      };
    });
  }
};

// 데이터 가져오기
const Data = (_ => {
  return class {
    async getData() {
      let data = await this._getData();
      return new Validator(data).checkValidator();
    }
    async _getData() {
      throw Error("직접 호출 금지");
    }
    fetchResult(response) {
      if (response.status === 200) {
        return response;
      } else {
        throw "fetch error";
      }
    }
  };
})();

const JsonData = class extends Data {
  constructor(_options) {
    super();
    this._options = _options;
  }
  async _getData() {
    if (typeof this._options === "string") {
      return await fetch(this._options).then(res => {
        return this.fetchResult(res).json();
      });
    } else if (typeof this._options !== "string") {
      return this._options;
    } else {
      throw "JsonData Error";
    }
  }
};

const XmlData = class extends Data {
  constructor(_options) {
    super();
    this._options = _options;
  }
  async _getData() {
    if (typeof this._options === "string") {
      return await fetch(this._options).then(res => {
        return this.fetchResult(res).json();
      });
    } else if (typeof this._options !== "string") {
      let { url, params } = this._options;

      return await axios.get(url, { params }).then(res => {
        if (res.status === 200) {
          console.log(res);
        }
      });
    } else {
      throw "XmlData Error";
    }
  }
};

export { JsonData, XmlData };
