// chrono.js
// version : 0.0.3
// author : Wanasit T.
// license : MIT
(function () {

  exports.parsers = {
    DayOfWeekParser             : require('./parsers/EN/DayOfWeekParser.js').DayOfWeekParser,
    GeneralDateParser           : require('./parsers/EN/GeneralDateParser.js').GeneralDateParser,
    InternationalStandardParser : require('./parsers/EN/InternationalStandardParser.js').InternationalStandardParser,
    MonthNameLittleEndianParser : require('./parsers/EN/MonthNameLittleEndianParser.js').MonthNameLittleEndianParser,
    MonthNameMiddleEndianParser : require('./parsers/EN/MonthNameMiddleEndianParser.js').MonthNameMiddleEndianParser,
    SlashParser                 : require('./parsers/EN/SlashParser.js').SlashParser,
    JPGeneralDateParser         : require('./parsers/JP/JPGeneralDateParser.js').JPGeneralDateParser,
    JPStandardDateParser        : require('./parsers/JP/JPStandardDateParser.js').JPStandardDateParser,
    THDayOfWeekParser           : require('./parsers/TH/THDayOfWeekParser.js').THDayOfWeekParser,
    THGeneralDateParser         : require('./parsers/TH/THGeneralDateParser.js').THGeneralDateParser,
  };

  exports.Parser = require('./parsers/Parser.js').Parser;
  exports.ParseResult = require('./parsers/ParseResult.js').ParseResult;

  var integratedParser = require('./parsers/IntegratedParser.js');
  integratedParser.setParsers(exports.parsers);
  exports.IntegratedParser = integratedParser.IntegratedParser;

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

