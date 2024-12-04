const btnViewCart = document.getElementById("btn-cart");

btnViewCart.onclick = async () => {
    const cartID = localStorage.getItem('cartId');
    if (cartID != null) {
        const response = await fetch(`/cart/${cartID}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            window.location.href = `/cart/${cartID}`;
        }
        else {
            console.error("Ocorreu um erro ao tentar obter os detalhes do produto:", error);
        }
    }
    else {
        window.location.href = `/cart/null`;
    }

}