// function to validate if actual date is in Epoch time
function validateEpochTime(dateToConvert) {
  const epochRegex = /^[0-9]+$/;

  return epochRegex.test(dateToConvert) && parseInt(dateToConvert) >= 0;
}

// function to validate if actual time is in Human time
function validateToHumanTime(dateToConvert) {
  const humanRegex = /^\d{4}-\d{2}-\d{2}$/;

  return humanRegex.test(dateToConvert) && !isNaN(Date.parse(dateToConvert));
}

const date = (req, res, next) => {
  try {
    const date = req.params.date;

    if (validateEpochTime(date)) {
      // convert time to epoch time
      const humanTime = new Date(date * 1000);

      return res.status(200).send({
        status: "Ok",
        unix: parseInt(date),
        utc: humanTime.toUTCString(),
      });
    }

    if (validateToHumanTime(date)) {
      // convert time to human time
      const epochTime = Math.floor(Date.parse(date) / 1000);
      const humanTime = new Date(date);

      return res.status(200).send({
        status: "Ok",
        unix: epochTime,
        utc: humanTime.toUTCString(),
      });
    }

    return res.status(400).send({
      message: "Invalid date",
      error: String(err),
    });
  } catch (err) {
    return res.status(400).send({
      error: "Invalid date",
    });
  }
};

export default date;
