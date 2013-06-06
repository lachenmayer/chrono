// chrono.js
// version : 0.0.3
// author : Wanasit T.
// license : MIT
(function () {

  exports.Parser = require('./parsers/Parser.js').Parser;
  exports.ParseResult = require('./parsers/ParseResult.js').ParseResult;

  exports.parsers = {
    DayOfWeekParser: require('./parsers/EN/DayOfWeekParser.js').DayOfWeekParser
  };

  exports.parse = function(text, referenceDate, options) {
    var parser = this.IntegratedParser(text, referenceDate, options);
    parser.execAll();
    return parser.results();
  };

  exports.parseDate = function(text, referenceDate, options) {
    var results = this.parse(text, referenceDate, options);
    if (results.length < 1) return null;
    return results[0].startDate;
  };

})();

