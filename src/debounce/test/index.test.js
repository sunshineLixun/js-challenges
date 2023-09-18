import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "../index";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("immediately ", () => {
    const fn = vi.fn();

    let debouncedFunc = debounce(fn, 1000, true);

    debouncedFunc();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("cancel ", () => {
    const fn = vi.fn();

    let debouncedFunc = debounce(fn, 1000);

    for (let i = 0; i < 10; i++) {
      debouncedFunc();
    }

    debouncedFunc.cancel();

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(0);
  });

  test("execute just once", () => {
    const fn = vi.fn();

    let debouncedFunc = debounce(fn, 1000, true);

    for (let i = 0; i < 1000; i++) {
      debouncedFunc();
    }

    vi.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("mock args", () => {
    const fn = vi.fn((a, v) => {});

    let debouncedFunc = debounce(fn, 1000, true);

    debouncedFunc();

    vi.runAllTimers();

    expect(fn).toHaveLength(2);
  });
});
