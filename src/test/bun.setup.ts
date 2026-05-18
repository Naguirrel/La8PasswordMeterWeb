import { expect } from 'bun:test';
import * as matchers from '@testing-library/jest-dom/matchers';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});

Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  HTMLInputElement: dom.window.HTMLInputElement,
  HTMLMeterElement: dom.window.HTMLMeterElement,
  MutationObserver: dom.window.MutationObserver,
  navigator: dom.window.navigator,
});

expect.extend(matchers);
