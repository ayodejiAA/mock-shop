import models from '../database/models';
import { imageUpload, successResponse, errorResponse } from '../helpers';

const { Product } = models;

class ProductController {
  static async add(req, res, next) {
    try {
      const { body } = req;
      body.imageUrl = await imageUpload(req);
      const { dataValues: newProduct } = await Product.create(body);
      return successResponse(res, 201, { ...newProduct });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const {
        params: { productId }
      } = req;
      const result = await Product.deleteById(productId);
      if (!result) return errorResponse(res, 404, 'product not found');
      successResponse(res, 200, { id: productId });
      res.end();
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const {
        params: { productId },
        body
      } = req;
      if (body.image) body.imageUrl = await imageUpload(req);

      const [rowsUpdated, [updatedProduct]] = await Product.update(body, {
        returning: true,
        where: { id: productId }
      });

      if (!rowsUpdated) return errorResponse(res, 404, 'product not found');
      successResponse(res, 200, { ...updatedProduct.dataValues });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await Product.findAll();
      const products = result.map(({ dataValues }) => dataValues);
      successResponse(res, 200, { products });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
