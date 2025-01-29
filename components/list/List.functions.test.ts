import { resolveRows } from "./List.functions";

describe("List functions test", () => {
  it("resolveRows", () => {
    const firstItem = { columnWidth: 2, component: "a" };
    const secondItem = { columnWidth: 1, component: "b" };
    const thirdItem = { columnWidth: 1, component: "c" };
    const sut = resolveRows({ columns: 2, items: [firstItem, secondItem, thirdItem] });
    expect(sut).toEqual([
      [{ columnWidth: 2, component: "a" }],
      [{ columnWidth: 1, component: "b" }, { columnWidth: 1, component: "c" }]
    ]);
  })
})