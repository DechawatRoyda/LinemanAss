import request from "supertest";
import app from ".";
import { Server } from "http";

describe('API Endpoints', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(3002);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return the home message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("LINE MAN Wongnai Frontend Assignment");
  });

  it("should return an array of restaurant IDs", async () => {
    const res = await request(app).get("/api/restaurants");
    expect(res.status).toBe(200);
    expect(res.body.restaurantIds).toEqual(expect.any(Array));
  });

  it("should return a specific restaurant", async () => {
    const res = await request(app).get("/api/restaurants/567051");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", "ลืมเคี้ยว");
    expect(res.body).toHaveProperty("id", 567051);
    expect(res.body).toHaveProperty(
      "coverImage",
      "https://img.wongnai.com/p/1920x0/2021/08/14/f6ae0252eb0d44b79553c0dba6e56cfe.jpg"
    );
    expect(res.body).toHaveProperty("activeTimePeriod");
    expect(res.body.activeTimePeriod).toHaveProperty("open", "10:30");
    expect(res.body.activeTimePeriod).toHaveProperty("close", "20:00");
    expect(res.body).toHaveProperty("menus");
    // Add expectations for the menu items if needed
  });

  it("should return a short menu for a specific restaurant", async () => {
    const menuName = encodeURIComponent("ยำรวมมิตรทะเล");
    const res = await request(app).get(
      `/api/restaurants/567051/menus/${menuName}/short`
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "ยำรวมมิตรทะเล",
      id: "ยำรวมมิตรทะเล",
      thumbnailImage:
        "https://img.wongnai.com/p/100x100/2020/07/01/a02b91dfbd0441e8ab36cac6abbf74d7.jpg",
      discountedPercent: 0,
      fullPrice: 120,
      sold: 100,
      totalInStock: 200,
    });
  });

  it("should return a full menu for a specific restaurant", async () => {
    const menuName = encodeURIComponent("ยำรวมมิตรทะเล");
    const res = await request(app).get(
      `/api/restaurants/567051/menus/${menuName}/full`
    );
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "ยำรวมมิตรทะเล",
      id: "ยำรวมมิตรทะเล",
      thumbnailImage:
        "https://img.wongnai.com/p/100x100/2020/07/01/a02b91dfbd0441e8ab36cac6abbf74d7.jpg",
      discountedPercent: 0,
      sold: 100,
      fullPrice: 120,
      totalInStock: 200,
      options: [],
      largeImage:
        "https://img.wongnai.com/p/1920x0/2020/07/01/a02b91dfbd0441e8ab36cac6abbf74d7.jpg",
    });
  });
});
