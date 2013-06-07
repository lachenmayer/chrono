(function() {

  var ParseResult = require('../ParseResult.js').ParseResult;

  var PATTERN = /([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})(\W|$)/i;

  /**
   * InternationalStandartParser - Create a parser object
   *
   * @param  { String }       text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser }
   */
  function InternationalStandardParser(text, ref, opt) {

    opt = opt || {};
    ref = ref || new Date();
    var parser = require('../Parser.js').Parser(text, ref, opt);

    parser.pattern = function() {
      return PATTERN;
    };

    parser.extract = function(text, index) {

      var results = this.results();
      var lastResult = results[results.length - 1];
      if (lastResult) {
        //Duplicate...
        if (index < lastResult.index + lastResult.text.length) return null;
      }

      var matchedTokens = text.substr(index).match(PATTERN);
      if (matchedTokens === null) {
        finished = true;
        return;
      }

      text = matchedTokens[0];
      text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[4].length);

      //Impossible Date or Invalid Date
      var date = moment(text, 'YYYY-MM-DD');
      if (date.format('YYYY-M-D') != text && date.format('YYYY-MM-DD') != text) {
        return null;
      }

      return new ParseResult({
        referenceDate: ref,
        text: text,
        index: index,
        start: {
          day: date.date(),
          month: date.month(),
          year: date.year()
        }
      });
    };

    return parser;
  }

  exports.InternationalStandardParser = InternationalStandardParser;

})();
