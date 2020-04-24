import * as React from "react";
import renderer from "react-test-renderer";

import { BigButton } from "../Button";

describe("Button", () => {
  it("should match snapshot", () => {
    const component = renderer
      .create(
        <BigButton onPress={() => {}} children={"Button Text"} />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
