import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import {SumForm} from "./SumForm"


describe("<SumForm />", () => {
  test("should render a, b and the sum", async () => {
    const page = render(<SumForm {...{a:1, b:2}}/>)
    const sumEl = await page.findByTestId("add-sum")
    expect("3").toBe(sumEl.textContent)
  });
});