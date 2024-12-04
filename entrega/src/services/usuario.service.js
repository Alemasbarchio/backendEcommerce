import userDao from "../dao/user.dao.js";

const userLogin = async (email, password) => {};

const createNewUser = async (userData) => {
 
  const user= await userDao.postUser(userData);

  
 
  return user;
};

export { userLogin, createNewUser};
