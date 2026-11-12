import { describe, expect, it } from "vitest";
import HomePage from "@/pages/index";
import AboutPage from "@/pages/about";
import TopicsPage from "@/pages/topics";
import LecturerLoginPage from "@/pages/lecturer/login";

describe("App routing", () => {
  it("exports the main pages through the Next.js Pages Router", () => {
    expect(HomePage).toBeTypeOf("function");
    expect(AboutPage).toBeTypeOf("function");
    expect(TopicsPage).toBeTypeOf("function");
    expect(LecturerLoginPage).toBeTypeOf("function");
  });
});
