import { render, fireEvent } from "react-testing-library";
import * as React from "react";
import Input from "@material-ui/core/Input";

const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/"
});
const { window } = dom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};

global.HTMLElement = window.HTMLElement;
global.HTMLInputElement = window.HTMLInputElement;

function start() {
  let onChange = () => console.log("did change!!!");

  const View = () => {
    return (
      <div>
        <Input
          id="login"
          name="login"
          onChange={onChange}
          inputProps={{ "data-testid": "foo-inside" }}
          data-testid="foo-outside"
        />
      </div>
    );
  };

  console.log(">> TEST start");
  let sut = render(<View />);

  let input1 = sut.container.querySelector('input[name="login"]');
  fireEvent.change(input1, { target: { value: "panda" } });

  let input2 = sut.getByTestId("foo-inside");
  fireEvent.change(input2, { target: { value: "panda" } });

  console.log("<< TEST end: anything logged?");
}

start();
