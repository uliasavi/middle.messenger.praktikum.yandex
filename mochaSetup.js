/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require("jsdom");
const fs = require("fs");
const Handlebars = require("handlebars");

const dom = new JSDOM(
  '<!DOCTYPE html><html><div id="api"><input type="text" id="password" value="11111111"></div><?html>',
  {
    url: "http://localhost:3000",
  }
);
global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = dom.window.DocumentFragment;
global.FormData = dom.window.FormData;

require.extensions[".hbs"] = (module, filename) => {
  const contents = fs.readFileSync(filename, "utf-8");
  module.exports = Handlebars.compile(contents);
};
