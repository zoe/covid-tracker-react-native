import { shallow } from "enzyme";
import * as React from "react";

import { BigButton } from "../Button";

describe("Button", () => {
    it("should match snapshot", () => {
        const component = shallow(
            <BigButton onPress={() => {}} children="Button Text" />
        );

        expect(component).toMatchSnapshot();
        expect(component.find("Text").dive().text()).toBe("Button Text");
    });
    it("Should fire click events", () => {
        const pressFn = jest.fn();
        const component = shallow(
            <BigButton onPress={pressFn}>Button</BigButton>
        );
        expect(component.find("Text").dive().text()).toBe("Button");
        expect(pressFn).toBeCalledTimes(0);
        component.simulate("press");
        expect(pressFn).toBeCalledTimes(1);
    });
});
