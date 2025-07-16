import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: "https://test.ru/",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.history = jsdom.window.history;
global.PopStateEvent = jsdom.window.PopStateEvent;
global.Node = jsdom.window.Node;
