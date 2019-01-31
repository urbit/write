export default class UrbitApi {
  setAuthTokens(authTokens) {
    this.authTokens = authTokens;
  }

  bind(path, method, ship = this.authTokens.ship, appl = "pareto") {
    console.log('binding to ...', appl, ", path: ", path, ", as ship: ", ship, ", by method: ", method);

    const params = {
      appl,
      mark: "json",
      oryx: this.authTokens.oryx,
      ship: ship,
      path: path,
      wire: path
    };

    return fetch(`/~/is/~${ship}/${appl}${path}.json?${method}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(params)
    });
  }

  pareto(path, data) {
    this.action("pareto", "json", {
      app: path,
      data
    });
  }

  action(appl, mark, data) {
    const params = {
      appl,
      mark,
      oryx: this.authTokens.oryx,
      ship: this.authTokens.ship,
      wire: "/",
      xyro: data
    };

    fetch(`/~/to/${appl}/${mark}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(params)
    });
  }

  poll(seqn = 1, fn = () => {}) {
    fetch(`/~/of/${this.authTokens.ixor}?poll=${seqn}`,
      { credentials : "same-origin" }
    ).then((res) => {
      return res.json();
    }).then((json) => {
      if (json.beat) {
        console.log("beat");
        this.poll(seqn, fn);
      } else if (json.data) {
        fn(json.data.json.data);
        this.poll(seqn + 1, fn);
      } else {
        console.log("error", json);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}

