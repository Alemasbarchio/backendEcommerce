import { productModel } from "../DB/Mongo/models/productsModel.js";

const createProduct = async (product) => {
 
  const newProduct = await productModel.create(product);

  return newProduct;
};

//Buscando os valores no mongoDB com o mongoosePaginate pasando os valores de limit page query e sort
const getProductsWithPaginate = async ({
  limit = 10,
  page = 1,
  query = {},
  sort = 1,
}) => {
  //teste ok para ordenação
  sort = parseInt(sort);

  //usando o paginate para buscar os valores no MongoDB
  try {
    limit = parseInt(limit);

    const products = await productModel.paginate(query, {
      page: page,
      limit: limit,
      sort: (sort = { price: sort }),
    });

    const productObj = {
      status: true,
      ...products,
    };

    return productObj;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllProducts = async () => {
  // teste para pesquisar
  /*  
  let productsFound = await productModel.aggregate([
    {$match:{title:{$regex:"R"}}}
]);
*/
  //productsFound = productsFound.map((product) => product.toJSON());
  //return productsFound;
};

const getProductById = async (id) => {
  const product = await productModel.findOne({ _id: id });
  const productJSON = product.toJSON();

  return productJSON;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deleteOne(id);
  return deletedProduct;
};

const updatedProduct = async (id, product) => {
  const updatedProduct = productModel.findByIdAndUpdate(id, product);

  return updatedProduct;
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsWithPaginate,
  deleteProduct,
  updatedProduct,
};
