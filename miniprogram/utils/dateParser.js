
// 年月日时分
// dateParser.js
//时间戳转换成日期时间


function date_time(val) {


  var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));


  //月份为0-11，所以+1，月份小于10时补个0
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;


  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();


  var hour = date.getHours();


  var minute = date.getMinutes();


  var second = date.getSeconds();


  var theTime = date.getFullYear() + "-" + month + "-" + currentDate; // " " + hour + ":" + minute + ":" + second

  return theTime;
}

module.exports = {
  date_time: date_time
}
