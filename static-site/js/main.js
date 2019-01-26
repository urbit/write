class UrbitApi {
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
      console.log(json);
      if (json.beat) {
        this.poll(seqn, fn);
      } else {
        if (json.data.json.app === window.app) {
          fn(json.data.json.data);
        }
        this.poll(seqn + 1, fn);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}


window.onload = function() {
  let api = new UrbitApi();
  window.api = api;

  let doc = document.getElementById("doc");
  let app = document.getElementById("title");
  let collab = document.getElementById("collab");

  collab.addEventListener("keyup", (e) => {
    console.log(e);
    window.api.pareto(window.app, {text: collab.value});   
  });

  collab.style = "display: none;";
  app.style = "display: none;";
  let newBtn = document.getElementById("new");
  newBtn.addEventListener("click", () => {
    newBtn.style = "display: none;";
    cancel.style = "display: block;";
    save.style =  "display: block;";
    app.style = "display: block;";
  });
  let cancel = document.getElementById("cancel");
  cancel.addEventListener("click", () => {
    newBtn.style = "display: block;";
    cancel.style = "display: none;";
    save.style = "display: none;";
  });

  let save = document.getElementById("save");
  save.addEventListener("click", () => {
    collab.style = "display: block;";
    newBtn.style = "display: block;";
    cancel.style = "display: none;";
    save.style = "display: none;";
    app.style = "display: none;";

    doc.innerText = app.value;
    window.api.bind(app.value, "PUT");
    window.api.bind(window.app, "DELETE");
    window.app = app.value;
    window.data = "";
    window.api.poll(1, (data) => {
      window.data = data;
      console.log(data.text);
      collab.value = data.text;
    });
  });


  fetch('/~/auth.json',{credentials: "same-origin"}).then((res) => {
    return res.json();
  })
  .then((authTokens) => {
    window.api.setAuthTokens(authTokens);
    window.app = "";
    window.data = "";
  });
};
