class Observer {
  obj = {};

  on(subscribeName, callback) {
    if (this.obj[subscribeName]) {
      this.obj[subscribeName].push(callback);
    } else {
      this.obj[subscribeName] = [callback];
    }
  }

  trigger(subscribeName) {
    const subscribers = this.obj[subscribeName] || [];
    subscribers.forEach((sub) => sub());
  }

  remove(subscribeName, subscriber) {
    const subscribers = this.obj[subscribeName] || [];
    const index = subscribers.findIndex((e) => e === subscribeName);

    if (index > -1) {
      subscribers.splice(index, 1);
    }
  }
}

const bookStoreBoss = new Observer();

const listener = () => {
  console.log("用户1要去买书");
};

bookStoreBoss.on("newBook", listener);
bookStoreBoss.on("newBook", () => {
  console.log("用户2要去买书");
});

bookStoreBoss.on("newPan", () => {
  console.log("我要去买笔");
});

bookStoreBoss.trigger("newBook");

bookStoreBoss.remove("newBook", listener);

