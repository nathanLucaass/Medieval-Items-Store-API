import OrderModel from '../database/models/order.model';
import { Order } from '../types/Order';
import ProductModel from '../database/models/product.model';

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await OrderModel.findAll();

  const mappedOrders: Order[] = orders.map((item) => item.toJSON());

  const ordersWithProductsIds = await Promise.all(mappedOrders.map(async (order) => {
    const products = await ProductModel.findAll({ where: { orderId: order.id } });

    const mappedProducts = products.map((item) => item.toJSON());
    const productsIds = mappedProducts.map((item) => item.id);

    return { ...order, productsIds };
  }));

  return ordersWithProductsIds;
};

export default getAllOrders;