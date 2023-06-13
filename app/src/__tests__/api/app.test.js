const app = require("../../server/app");
const supertest = require("supertest");

test("GET /ping", async () => {
  await supertest(app).get("/ping")
      .expect(200)
      .then((response) => {
        // Check data
        expect(response.body.result).toBe("pong");
      });
});