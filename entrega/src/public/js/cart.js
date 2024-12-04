
const btnRemoveProd = document.getElementById("btn-remove-cartprod");
const deleteCart= document.getElementById("btn-delete-cart");
//const id = document.getElementById("prodID").textContent;
/*
btnRemoveProd.addEventListener("click", async (event) => {
  try {
    const deleteProduct = await fetch(`/cart/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});
*/
deleteCart.addEventListener("click",async ()=>{
  const cartID = localStorage.getItem('cartId');
  const NIC=localStorage.getItem("NIC");
  

  const response= await fetch(`/cart/cart/${cartID}`,{
    method: "delete",
    headers:{
      "Content-Type": "application/json",
      },
    
  })
  const data= await response.json();
  
    if(data.deletedCount>=1){
      console.log("limpar");
      window.location.reload();
      localStorage.clear();
    }
    
})
