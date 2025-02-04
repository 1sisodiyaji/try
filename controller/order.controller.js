const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createOrder = async (userId, items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await prisma.order.create({
        data: {
            userId,
            total,
            items: {
                create: items.map(item => ({
                    itemName: item.itemName,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        },
        include: { items: true },
    });

    return order;
};

exports.getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: { user: true, items: true },
    });
    return orders;
};

exports.getOrderById = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { user: true, items: true },
    });
    return order;
};

exports.updateOrder = async (orderId, items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
            total,
            items: {
                deleteMany: {},
                create: items.map(item => ({
                    itemName: item.itemName,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        },
        include: { items: true },
    });

    return updatedOrder;
};

exports.deleteOrder = async (orderId) => {
    await prisma.order.delete({
        where: { id: orderId },
    });
};
