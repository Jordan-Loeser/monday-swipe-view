import React from "react";
import { render } from "@testing-library/react";
import SwipeScreen from "./SwipeScreen";

const mockItems = [{ id: 12345, name: "hello" }];

test("Does not render if no items are passed", () => {
  const { queryByTestId } = render(<SwipeScreen />);
  expect(queryByTestId("swipe-screen")).toBeNull();
});

test("Shows loader when loading", () => {
  const { queryByTestId } = render(
    <SwipeScreen loading={true} items={[]} trash={[]} />
  );
  expect(queryByTestId("swipe-screen")).toBeInTheDocument();
  expect(queryByTestId("swipe-loader")).toBeInTheDocument();
  expect(queryByTestId("swipe-cards")).not.toBeInTheDocument();
  expect(queryByTestId("items-empty-instructions")).not.toBeInTheDocument();
});

test("Shows cards when there are items remaining", () => {
  const { queryByTestId, queryByText } = render(
    <SwipeScreen loading={false} items={mockItems} trash={[]} />
  );
  expect(queryByTestId("swipe-screen")).toBeInTheDocument();
  expect(queryByTestId("swipe-loader")).not.toBeInTheDocument();
  expect(queryByText("View Item")).toBeInTheDocument();
  expect(queryByTestId("items-empty-instructions")).not.toBeInTheDocument();
});

test("Shows instructions when all items have been swiped on", () => {
  const { queryByTestId } = render(
    <SwipeScreen loading={false} items={[]} trash={[]} />
  );
  expect(queryByTestId("swipe-screen")).toBeInTheDocument();
  expect(queryByTestId("swipe-loader")).not.toBeInTheDocument();
  expect(queryByTestId("swipe-cards")).not.toBeInTheDocument();
  expect(queryByTestId("items-empty-instructions")).toBeInTheDocument();
});
