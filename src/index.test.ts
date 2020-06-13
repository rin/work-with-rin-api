require('dotenv').config()
const fs = require('fs');
const supertest = require("supertest");
const request = supertest(`http://localhost:${process.env.GRAPHQL_PORT}`);

test("get languages", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ languages { name }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      const languages = require('./content/languages.json');
      expect(res.body.data.languages.length).toEqual(languages.length);
      done();
    });
});

export {};