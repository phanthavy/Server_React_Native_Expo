import type e = require("express");
import errorTools = require("../tools/handleError");
import successTools = require("../tools/handleSuccess");

const prisma = require("../config/prisma");

async function getCategory(req: e.Request, res: e.Response) {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  try {
    const [categories, total] = await prisma.$transaction([
      prisma.category.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.count(),
    ]);

    successTools.handleSuccess(
      res,
      200,
      "retrived successfully",
      categories,
      page,
      pageSize,
      total,
    );
  } catch (error: any) {
    errorTools.handleError(res, error, "server failed");
  }
}

async function postCategory(req: e.Request, res: e.Response) {
  const { cat_name } = req.body;
  try {
    const checkname = await prisma.category.findUnique({
      where: {
        cat_name: cat_name,
      },
    });

    if (checkname) {
      return res.status(409).json({ message: "this category already exists!" });
    }

    const category = await prisma.category.create({
      data: {
        cat_name: cat_name,
      },
    });

    successTools.handleSuccess(res, 201, "created successfully", category);
  } catch (error: any) {
    errorTools.handleError(res, error, "server failed");
  }
}

async function removeCategory(req: e.Request, res: e.Response) {
  const id = req.params.id;

  try {
    const category = await prisma.category.delete({
      where: {
        cat_id: Number(id),
      },
    });
    successTools.handleSuccess(res, 200, "deleted succcessfully", category);
  } catch (error: any) {
    errorTools.handleError(res, error, "server failed");
  }
}

export = { getCategory, postCategory, removeCategory };
