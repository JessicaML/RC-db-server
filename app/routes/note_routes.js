const ObjectID = require("mongodb").ObjectID;
module.exports = function(app, db) {
  app.get("/notes/:id", (req, res) => {
    //http://localhost:4000/set?:key=:value
    //http://localhost:4000/set?somekey=somevalue
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });
  app.post("/set/:n/:f", (req, res) => {
    const note = { text: req.params.n, title: req.params.f };
    const n = req.params.n;
    const f = req.params.f;
    console.log(f);

    console.log(n);
    console.log(note);
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
