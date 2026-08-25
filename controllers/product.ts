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
      prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
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
  const {
    product_name,
    product_description,
    product_price,
    product_image,
    category_id,
  } = req.body;

  try {
    // if (!product_name || !product_description || !product_price) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const checkedName = await prisma.product.findUnique({
      where: {
        product_name: product_name,
      },
    });

    if (checkedName)
      return res.status(409).json({ message: "This name already exists!" });

    const images = Array.isArray(product_image) ? product_image : [];

    const product = await prisma.product.create({
      data: {
        product_name,
        product_description,
        product_price: Number(String(product_price).replaceAll(",", "")),
        product_image: images,
        category_id: Number(category_id) || null,
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
