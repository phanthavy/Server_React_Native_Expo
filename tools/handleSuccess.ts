import type e = require("express");

const handleSuccess = (
  res: e.Response,
  statusCode: number,
  messsage: string,
  data: unknown,
  page?: number,
  pageSize?: number,
  total?: number,
) => {
  return res.status(statusCode).json({
    success: true,
    messsage,
    page,
    pageSize,
    total,
    data,
  });
};

export = { handleSuccess };
