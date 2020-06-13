require('dotenv').config()
const supertest = require("supertest");
const request = supertest(`http://localhost:${process.env.GRAPHQL_PORT}`);

test("get skills", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ skills { name }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      expect(res.body.data.skills.length).toEqual(3);
      done();
    });
});

export {};