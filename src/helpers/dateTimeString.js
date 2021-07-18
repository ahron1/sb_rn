// convert from ISO format to printable string

const getDateTime = Time => {
  const Date = Time.getDate().toString();
  const Month = (Time.getMonth() + 1).toString();
  const Year = Time.getFullYear().toString();
  const Hours = Time.getHours().toString();
  const _Minutes = Time.getMinutes();
  var Minutes;
  if (_Minutes < 10) {
    Minutes = '0' + _Minutes.toString();
  } else {
    Minutes = _Minutes.toString();
  }

  const orderDateTime =
    Date + '-' + Month + '-' + Year + ' at ' + Hours + ':' + Minutes;

  return orderDateTime;
};

export default getDateTime;
