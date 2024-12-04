

const editButtons = document.querySelectorAll('.editButtons');

editButtons.forEach(button => {
  button.addEventListener('click', async () => {
 
  const productId = button.getAttribute('data-id');
  console.log('productId', productId);
  window.location.href = `/api/products/edit/${productId}`;
  

});
});


 
    const editProduct = async (productId) => {
      
      const newForm= new FormData(document.getElementById("formUpdate"));
      const title= newForm.get("title")
        const response = await fetch(`/api/products/edit/${productId}`, {
         method: 'put',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(Object.fromEntries(newForm))
      })
      
    if(response.ok){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Atualizando produto",
        text:"Produto " + `${title}`+ " atualizado",
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.href = `/api/products`;
        }
      });
      
     // window.location.href = `/api/products`;

    }
    }