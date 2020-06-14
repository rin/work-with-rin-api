/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
import supertest from 'supertest';
const request = supertest(`http://localhost:${process.env.PORT}`);

interface ObjectWithName {
  name: string;
}

const API_ENDPOINT = process.env.API_ENDPOINT || "4000";

const joinedNames= (list: Array<ObjectWithName>) => 
  list.reduce((acc: string, { name }: ObjectWithName) => `${acc}, ${name}`, "");

test("get about text", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ about { text }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const aboutText = "Welcome! This is a simple backend for http://work-with.rin-raeuber.com/ using GraphQL."
      const { body : { data: { about: { text: result }}}} = res;
      expect(result).toEqual(aboutText);
      done();
    });
});

test("get languages", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ languages { name rating }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const languages = require('./content/languages.json');
      const { body : { data: { languages: result }}} = res;
      expect(result.length).toEqual(languages.length);
      expect(joinedNames(result)).toContain("Lang Belta");
      done();
    });
});

test("get technologies", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ technologies { name rating }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const technologies = require('./content/technologies.json');
      const { body : { data: { technologies: result }}} = res;
      expect(result.length).toEqual(technologies.length);
      expect(joinedNames(result)).toContain("GraphQL");
      done();
    });
});

test("get tools", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ tools { name rating }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const tools = require('./content/tools.json');
      const { body : { data: { tools: result }}} = res;
      expect(result.length).toEqual(tools.length);
      expect(joinedNames(result)).toContain("git");
      done();
    });
});

test("get links", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ links { type url title }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const { body : { data: { links: result }}} = res;
      const links = require('./content/links.json');
      expect(result.length).toEqual(links.length);
      done();
    });
});

test("get interests", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ interests { name }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const interests = require('./content/interests.json');
      const { body : { data: { interests: result }}} = res;
      expect(result.length).toEqual(interests.length);
      expect(joinedNames(result)).toContain("to make the world a better place");
      done();
    });
});

test("get contact", async (done) => {
  request
    .post(API_ENDPOINT)
    .send({
      query: "{ contact { email }  }",
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end(function (err: Error, res: supertest.Response) {
      if (err) return done(err);
      const { body : { data: { contact: { email: result }}}} = res;
      expect(result).toEqual("mail@rin-raeuber.com");
      done();
    });
});

export {};