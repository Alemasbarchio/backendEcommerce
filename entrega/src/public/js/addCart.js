const cartCount=document.getElementById("cart-count");
let NIC=localStorage.getItem("NIC");
cartCount.textContent=NIC;


const handleAddCart = async (id) => {
    const requestData = { id: id };
    //const cartId=sessionStorage.getItem("cartId");
    const localCartID = localStorage.getItem('cartId');
   
    const response = await fetch("/cart", {
      
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...requestData,localCartID}),
    });
    
    const data = await response.json();
  
    //sessionStorage.setItem('cartId', data);
    localStorage.setItem('cartId', data.cartID);
    localStorage.setItem('NIC', data.NIC);
  
    if (response) {
       
        cartCount.textContent=data.NIC;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Produto Adicionado no carrinho",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  