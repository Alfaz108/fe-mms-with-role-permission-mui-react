import moment from "moment";

const DateFormatter = ({ date, showTime = true }) => {
  const formattedDate = moment(date).format("D MMM YYYY");
  const formattedTime = showTime ? moment(date).format("hh:mm A") : null;

  return (
    <>
      {formattedDate}
      <br />
      {showTime && <small>{formattedTime}</small>}
    </>
  );
};

export default DateFormatter;
