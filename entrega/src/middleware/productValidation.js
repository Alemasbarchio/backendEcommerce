const productValidation = (req, res, next) => {
  const {title,description,price,code,stock,thumbmail} = req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock || 
    !thumbmail
  ) {
    console.log("Produto com informaçoes faltando!");
    res.render("404", { message: "Produto com informaçoes faltando!" });
  }
  else{
    next();
  }
 
};

export { productValidation };
