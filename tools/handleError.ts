import type e = require("express");

const handleError = (
  res: e.Response,
  error: string,
  message: string,
) => {
  console.log(error);
  return res.status(500).json({ success: false, error, message });
};

export = {handleError}