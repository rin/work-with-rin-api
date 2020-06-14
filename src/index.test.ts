/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const supertest = require("supertest");
const request = supertest(`http://localhost:${process.env.PORT}`);

test("get about text", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ about { text }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      const aboutText = "Welcome! This is a simple backend for http://work-with.rin-raeuber.com/ using GraphQL."
      expect(res.body.data.about.text).toEqual(aboutText);
      done();
    });
});

test("get languages", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ languages { name rating }  }",
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

test("get technologies", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ technologies { name rating }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      const technologies = require('./content/technologies.json');
      expect(res.body.data.technologies.length).toEqual(technologies.length);
      done();
    });
});

test("get tools", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ tools { name rating }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      const tools = require('./content/tools.json');
      expect(res.body.data.tools.length).toEqual(tools.length);
      done();
    });
});

test("get links", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ links { type url title }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      const links = require('./content/links.json');
      expect(res.body.data.links.length).toEqual(links.length);
      done();
    });
});

test("get contact", async (done) => {
  request
    .post(process.env.API_ENDPOINT)
    .send({
      query: "{ contact { email }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: any, res: any) {
      if (err) return done(err);
      expect(res.body.data.contact.email).toEqual("mail@rin-raeuber.com");
      done();
    });
});

export {};