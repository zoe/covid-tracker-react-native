import * as React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";

import { BigButton } from "../Button";

describe("Button", () => {
  it("should match snapshot", () => {
    const tree = renderer
      .create(
        <BigButton onPress={() => {}} children={"Button Text"} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
