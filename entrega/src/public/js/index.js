const selectProduct = document.getElementById("select-products");
const selectPage = document.getElementById("select-page");
const orderPrice = document.getElementById("order-products-price");
let pageQueryValue = 1;

if (sessionStorage.getItem("selectProduct")) {
  selectProduct.value = sessionStorage.getItem("selectProduct");
}

// limitar produtos por paginas
selectProduct.addEventListener("change", async () => {
  sessionStorage.setItem("selectProduct", selectProduct.value);
  let url = `/api/products?limit=${selectProduct.value}&page=${pageQueryValue}`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.href = `/api/products?limit=${selectProduct.value}`;
  } else {
    console.error(
      "Falha ao obter detalhes do produto. Status da resposta:",
      response.status
    );
  }
});

//  função selecionar page para produtos
selectPage.addEventListener("click", async (event) => {
  if (event.target.tagName == "LI") {
    pageQueryValue = event.target.getAttribute("value");
    let url = `/api/products?limit=${selectProduct.value}&page=${pageQueryValue}`;

    const response = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = `/api/products?limit=${selectProduct.value}&page=${pageQueryValue}`;
    } else {
      console.error(
        "Falha ao obter detalhes do produto. Status da resposta:",
        response.status
      );
    }
  }
});
// ordenar produtos por preço  asc & desc  / obs: falta ajustar
orderPrice.addEventListener("change", async () => {
  sessionStorage.setItem("", selectProduct.value);
  let url = `/api/products?limit=${selectProduct.value}&page=${pageQueryValue}&sort=${orderPrice.value}`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.href = `/api/products?limit=${selectProduct.value}&page=${pageQueryValue}&sort=${orderPrice.value}`;
  } else {
    console.error(
      "Falha ao obter detalhes do produto. Status da resposta:",
      response.status
    );
  }
});

// adiconar produtos ao carrinho buscando pelo id



