/*
  DateComponents {
    @attribute {Integer} year
    @attribute {Integer} month
    @attribute {Integer} day
    @attribute {Integer} hour
    @attribute {Integer} minute
    @attribute {Integer} second

    @method { Date } date
  }
*/

(function() {

  var moment = require('moment');

  function DateComponents(components) {

    this.year = components.year;
    this.month = components.month;
    this.day = components.day;
    this.hour = components.hour;
    this.minute = components.minute;
    this.second = components.second;

    this.date = function () {
      var dateMoment = moment(new Date(this.year, this.month, this.day));
      //dateMoment.year(this.year);
      //dateMoment.month(this.month);
      //dateMoment.date(this.day);
      dateMoment.hours(this.hour);
      dateMoment.minutes(this.minute);
      dateMoment.seconds(this.second);
      return dateMoment.toDate();
    };
  }

  exports.DateComponents = DateComponents;

})();
