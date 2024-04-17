const request = require("supertest");
const app = require("./Express");

describe("GET /mean", () => {
  it("should return mean of numbers", async () => {
    const response = await request(app).get("/mean?nums=1,2,3,4,5");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("operation", "mean");
    expect(response.body).toHaveProperty("value", 3);
  });

  it("should handle empty input", async () => {
    const response = await request(app).get("/mean");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "nums are required.");
  });

  it("should handle invalid numbers", async () => {
    const response = await request(app).get("/mean?nums=1,2,3,foo");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid number detected.");
  });
});

describe("GET /median", () => {
  it("should return median of numbers", async () => {
    const response = await request(app).get("/median?nums=1,2,3,4,5");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("operation", "median");
    expect(response.body).toHaveProperty("value", 3);
  });
});

describe("GET /mode", () => {
  it("should return mode of numbers", async () => {
    const response = await request(app).get("/mode?nums=1,2,2,3,3,3,4,4,4,4");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("operation", "mode");
    expect(response.body).toHaveProperty("value", 4);
  });
});
