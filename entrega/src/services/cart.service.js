import { cartModel } from "../DB/Mongo/models/cartModel.js";

const createCart = async (cartData, id) => {

  try {
    let cartExist = await cartModel.findOne({ _id: id });
    if (cartExist) {
      let checkProductExist = cartExist.productsCart.find(product => String(product._id) === String(cartData._id))
      if (checkProductExist) {
        console.log("o produto ja existe no carrinho , então somar qtd")
        console.log(checkProductExist.qtdItens);
        checkProductExist.qtdItens += 1;
        console.log(checkProductExist.qtdItens);
        await cartModel.updateOne(
          { _id: id, "productsCart._id": checkProductExist._id },
          { $set: { "productsCart.$.qtdItens": checkProductExist.qtdItens } }
        );
      }

      else {
        console.log("produto nao existe no carrinho, adcionar");
        cartExist.productsCart.push(cartData); 
        await cartExist.save();
      }
      return cartExist;

    } else {
      const newCart = await cartModel.create({ productsCart: cartData });
      return newCart;

    }
  } catch (error) {
    console.log(error);
  }

};

const deleteCart = async (cid) => {
 
  const deletedCart = await cartModel.deleteOne({ _id: cid });
  if (deletedCart.deletedCount > 0) {
    console.log("produto " + cid + "deletado");
  }
  else {
    console.log("erro ao excluir produto do carrinho")
  }
  console.log(deletedCart);
  return deletedCart;
};

const updateCart = async (id, cart) => {
  const updatedCart = cartModel.findByIdAndUpdate(id, cart);
  return updatedCart;
};

const updateProdCart = async (idCart, idProd) => {
  
  let cartExist = await cartModel.findOne({ _id: idCart });
    if (cartExist) {
      let checkProductExist = cartExist.productsCart.find(product => String(product._id) === String(idProd))
      
      if (checkProductExist) {
        
        console.log(checkProductExist.qtdItens);
        
        checkProductExist.qtdItens += 1;
        console.log(checkProductExist.qtdItens);
        await cartModel.updateOne(
          { _id: id, "productsCart._id": checkProductExist._id },
          { $set: { "productsCart.$.qtdItens": checkProductExist.qtdItens } }
        );
      }else {
        throw new Error("Carrinho não existe!")
      }
    }
}

const getCartById = async (id) => {
  try {
    if (id != ""|| id !=null) {
      const cart = await cartModel.findOne({_id:id});
  
      if (cart != null) {
        const cartJSON = cart.toJSON();
        return cartJSON;
      } else {
        console.log("Criando novo carrinho");
      }
    }     
  } catch (error) {
    console.log("id do carrinho é nulo ");
  }
 };


const getAllCarts = async () => {
  const cartAll = await cartModel.find();
  console.log(cartAll);
  return cartAll;

}
export { createCart, deleteCart, updateCart, getCartById, getAllCarts, updateProdCart };
