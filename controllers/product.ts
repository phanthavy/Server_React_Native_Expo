import type e = require("express");
import successTools = require("../tools/handleSuccess");
import errorTools = require("../tools/handleError");
const prisma = require("../config/prisma");

async function getProducts(req: e.Request, res: e.Response) {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({ skip, take: pageSize }),
      prisma.product.count(),
    ]);

    successTools.handleSuccess(
      res,
      200,
      "retrived products successfully",
      products,
      page,
      pageSize,
      total,
    );
  } catch (error: any) {
    errorTools.handleError(res, error, "server failed");
  }
}

async function postProducts(req: e.Request, res: e.Response) {
  const { product_name, product_description, product_price } = req.body;

  try {
    if (!product_name || !product_description || !product_price) return;

    const checkedName = await prisma.product.findUnique({
      where: {
        product_name: product_name,
      },
    });

    if (checkedName)
      return res.status(409).json({ message: "This name already exists!" });

    const product = await prisma.product.create({
      data: {
        product_name,
        product_description,
        product_price: Number(product_price),
        product_image: req.file ? `/uploads/${req.file.filename}` : null,
      },
    });

    successTools.handleSuccess(
      res,
      201,
      "created a product successfully",
      product,
    );
  } catch (error: any) {
    errorTools.handleError(res, error, "server failed");
  }
}

export = { getProducts, postProducts };
