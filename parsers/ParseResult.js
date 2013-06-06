/*
  ParseResult {
    @attribute {DateComponents} start
    @attribute {Date} startDate

    @attribute {DateComponents, Optional} end
    @attribute {Date, Optional} endDate

    @attribute { Date } referenceDate
    @attribute { Integer } index
    @attribute { String } text
    @attribute { String } sentence
    @attribute { Number, Optional} timezoneOffset
  }
*/

(function() {

  var DateComponents = require('./DateComponents.js').DateComponents;

  function ParseResult(result) {
    this.start = new DateComponents(result.start);
    this.startDate = this.start.date();

    if (result.end) {
      this.end = new DateComponents(result.end);
      this.endDate = this.end.date();
    }

    this.referenceDate = result.referenceDate;
    this.index = result.index;
    this.text = result.text;
    this.concordance = result.concordance;

    if (result.timezoneOffset) {
      this.timezoneOffset = result.timezoneOffset;
    }
  }

  exports.ParseResult = ParseResult;

})();
