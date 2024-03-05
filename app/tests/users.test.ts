import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import app from "../index";

describe("GET /users/api", () => {
	it("should return all users", async () => {
		return request(app)
			.get("/users/api")
			.then((response) => {
				expect(response.body).toEqual([
					{ name: "name1" },
					{ name: "name2" },
					{ name: "name3" },
				]);
			});
	});
});
