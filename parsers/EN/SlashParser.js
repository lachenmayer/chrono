(function() {

  var ParseResult = require('../ParseResult.js').ParseResult;

  var PATTERN = /(\W|^)([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}|[0-9]{2})(\W|$)/i;

  function SlashParser(text, ref, opt) {

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
      if (matchedTokens === null) return;


      text = matchedTokens[0].substr(matchedTokens[1].length, matchedTokens[0].length - matchedTokens[5].length);
      var orginalText = text;
      index += matchedTokens[1].length;

      var date = null;
      var years = matchedTokens[4];

      years = parseInt(years, 10);
      if (years < 100) {
        if (years > 50) {
          years = years + 2500 - 543; //BE
        } else {
          years = years + 2000; //AD
        }
        text = matchedTokens[2] + '/' + matchedTokens[3] + '/' + years;
      }

      date = moment(text, 'MM/DD/YYYY');
      if (!date || (date.format('D') != matchedTokens[3])) {
        date = moment(text, 'DD/MM/YYYY');

        if (!date || (date.format('D') != matchedTokens[2])) return null;
      }

      return new ParseResult({
        referenceDate: ref,
        text: orginalText,
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

  exports.SlashParser = SlashParser;

})();
