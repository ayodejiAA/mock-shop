import models from '../database/models';
import { errorResponse, successResponse } from '../helpers';

const { Cart, Product, User } = models;

class CartController {
  static async add(req, res, next) {
    try {
      const { user: { id: userId }, params: { productId } } = req;
      const product = await Product.findByPk(productId);
      if (!product) return errorResponse(res, 404, 'product not found');
      const error = await CartController.canUserAddToCart(productId, userId);
      if (error) return errorResponse(res, 409, 'Product already in cart');
      await Cart.create({ ProductId: productId, UserId: userId });
      const cart = CartController.getCartData(product);
      return successResponse(res, 201, cart);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { user: { id } } = req;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).end();
      const result = await user.getProducts();
      const cart = result
        .map(({ dataValues }) => CartController.getCartData(dataValues));
      return successResponse(res, 200, cart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { user: { id: UserId }, params: { productId: ProductId } } = req;
      const product = await Product.findByPk(ProductId);
      if (!product) return errorResponse(res, 404, 'product not found');
      const result = await Cart.destroy({
        where: { ProductId, UserId }
      });
      if (!result) return errorResponse(res, 404, 'product not in cart');
      return successResponse(res, 200, { id: ProductId });
    } catch (error) {
      next(error);
    }
  }

  static async canUserAddToCart(ProductId, UserId) {
    return Cart.findOne({
      where: { ProductId, UserId }
    });
  }

  static getCartData(cart) {
    const {
      id, name, description, price
    } = cart;

    return {
      id, name, description, price
    };
  }
}

export default CartController;
