import jsdom from 'jsdom';

export default () => {
  const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.document = doc;
  global.window = doc.defaultView;
  global.navigator = doc.defaultView.navigator;
  global.HTMLElement = window.HTMLElement;

  window.matchMedia =
    window.matchMedia ||
    function matchMedia() {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
      };
    };
};
