function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      awaitTag = __loadTag(require("marko/taglibs/async/await-tag")),
      attr = __helpers.a;

  return function render(data, out) {
    out.w("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>React on Meli!</title><link rel=\"stylesheet\" href=\"./css/normalize.css\"><link rel=\"stylesheet\" href=\"./css/chico-mobile.css\"></head><body>");

    awaitTag({
        _dataProvider: data.getItems,
        _name: "data.getItems",
        renderBody: function renderBody(out, data) {
          out.w("<meta name=\"state\" id=\"state\"" +
            attr("content", data.state) +
            "><div id=\"root\">" +
            str(data.html) +
            "</div>");
        }
      }, out);

    out.w("<script src=\"./js/bundle.js\"></script></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
