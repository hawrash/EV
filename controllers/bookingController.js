import Booking from '../models/Booking.js';

export {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history
};

async function cart(req, res) {
  try{
    const cart = await Booking.getCart(req.user._id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

async function addToCart(req, res) {
  try{
    const cart = await Booking.getCart(req.user._id);
    await cart.addItemToCart(req.params.id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

async function setItemQtyInCart(req, res) {
  try{
    const cart = await Booking.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

async function checkout(req, res) {
  try{
    const cart = await Booking.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

async function history(req, res) {
  try{
    const Bookings = await Booking
      .find({ user: req.user._id, isPaid: true })
      .sort('-updatedAt').exec();
    res.status(200).json(Bookings);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }

}