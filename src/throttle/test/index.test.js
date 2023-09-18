import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import { throttle } from "../index";

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("run once", () => {
    const fn = vi.fn();

    let throttleFn = throttle(fn, 1000);

    for (let i = 0; i < 1000; i++) {
      throttleFn();
    }

    vi.runAllTimers();

    vi.advanceTimersByTime(1000);

    throttleFn();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("cancel", () => {
    const fn = vi.fn();

    let throttleFn = throttle(fn, 1000);

    for (let i = 0; i < 1000; i++) {
      throttleFn();
    }

    throttleFn.cancel();

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
