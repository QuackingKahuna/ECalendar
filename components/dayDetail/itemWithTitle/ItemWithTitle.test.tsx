import { render } from "@testing-library/react-native";
import { ItemWithTitle } from "./ItemWithTitle";
import { Text } from "react-native";

describe("ItemWithTitle", () => {
  it("renders title and child", () => {
    const sut = render(<ItemWithTitle title="title"><Text>ChildComponent</Text></ItemWithTitle>);
    expect(sut.getByText("title")).toBeDefined();
    expect(sut.getByText("ChildComponent")).toBeDefined();
  });
});