function formatDate(dateTimeData) {
  const date = new Date(dateTimeData).toDateString();
  const time = new Date(dateTimeData).toTimeString().substring(0, 8);

  const fullDate = date + " " + time;

  return fullDate;
}

module.exports = {
  formatDate,
};
