const Cart = require('../model/cartModel');
const Product = require('../model/productModel');
const User= require('../model/userModel');

const addProductToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity,totalOfeachProduct } = req.body;

  try {
    let user= await User.findById(userId).populate('cart');
    if(!user){
      return res.status(404).json({ message:"User not found"});
    }
    let cart = user.cart;
    if(!cart){
      cart = new Cart({userId, products: [], totalPrice:0,totalOfeachProduct:0});
      user.cart=cart._id;
      await user.save();
    }
    const product = await Product.findById(productId);

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalPrice += product.price * quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const removeProductFromCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId).populate('cart');
    if (!user || !user.cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    let cart = user.cart;

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      const product = await Product.findById(productId);
      cart.totalPrice -= product.price * cart.products[productIndex].quantity;
      cart.products.splice(productIndex, 1);
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'products.productId',
      },
    });

    if (!user || !user.cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProductQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId).populate('cart');
    if (!user || !user.cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    let cart = user.cart;
    const product = await Product.findById(productId);

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.totalPrice -= cart.products[productIndex].quantity * product.price;
      cart.products[productIndex].quantity = quantity;
      cart.totalPrice += quantity * product.price;
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={
    addProductToCart,
    removeProductFromCart,
    getCart,
    updateProductQuantity

}