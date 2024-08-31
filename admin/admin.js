
const loadCategory = (category) => {
    fetch(`https://ross-valley.onrender.com/categories/`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const parent = document.getElementById("select_category");
          const option = document.createElement("option");
          option.value = item.id;
          option.innerText = item.category_name;
          parent.appendChild(option);
        });
        console.log(data);
      });
  };
loadCategory();
const addProduct = (event) => {  
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('product_name', document.getElementById("product_name").value);
    formData.append('product_slug', document.getElementById("product_name").value.toLowerCase().replace(/\s+/g, '-'));
    formData.append('product_price', document.getElementById("product_price").value);
    formData.append('product_quantity', document.getElementById("product_quantity").value);
    formData.append('product_image', document.getElementById("product_image").files[0]); // Using files[0] for file input
    formData.append('product_description', document.getElementById("product_description").value);
    formData.append('category', document.getElementById("select_category").value);
  
    fetch('https://ross-valley.onrender.com/product/', {
      method: "POST",
      body: formData,
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          console.error('Error:', res.status, err);
          throw new Error('Bad Request');
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
       window.location.href = `allProducts.html`;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
  };
  window.onload = () => {
    const param = new URLSearchParams(window.location.search).get("Id");

    // Fetch product data based on the Id
    fetch(`https://ross-valley.onrender.com/product/${param}`)
        .then((res) => res.json())
        .then((data) => {
            // Populate the form fields with the fetched data
            document.getElementById("edit_product_name").value = data.product_name;
            document.getElementById("edit_product_price").value = data.product_price;
            document.getElementById("edit_product_quantity").value = data.product_quantity;
            document.getElementById("edit_product_description").value = data.product_description;
            document.getElementById("select_category").value = data.category;
            document.getElementById("preview_image").src = data.product_image;

            // You may need to handle the image preview separately
        })
        .catch((error) => {
            console.error('Error fetching product data:', error);
        });
};
  const editProduct = (event) => {  
    event.preventDefault();
    const param = new URLSearchParams(window.location.search).get("Id");  
    console.log(param);
    const formData = new FormData();
    formData.append('product_name', document.getElementById("edit_product_name").value);
    formData.append('product_slug', document.getElementById("edit_product_name").value.toLowerCase().replace(/\s+/g, '-'));
    formData.append('product_price', document.getElementById("edit_product_price").value);
    formData.append('product_quantity', document.getElementById("edit_product_quantity").value);
    formData.append('product_image', document.getElementById("edit_product_image").files[0]); // Using files[0] for file input
    formData.append('product_description', document.getElementById("edit_product_description").value);
    formData.append('category', document.getElementById("select_category").value);
  
    fetch(`https://ross-valley.onrender.com/product/${param}/`, {
      method: "PATCH",
      body: formData,
    })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          console.error('Error:', res.status, text);
          throw new Error('Bad Request');
        });
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      window.location.href = `allProducts.html`;
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
};
 const addCategory=(event)=>{
    event.preventDefault();
    const category = document.getElementById("add_category").value;
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    console.log(category);
    const info = {
            category_name:category,
            category_slug:slug,

            };
            fetch('https://ross-valley.onrender.com/categories/',{
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
                })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = `category.html`;
                    console.log(data);
                });
 };
const allorders=()=>{
    fetch(`https://ross-valley.onrender.com/orders/`)
    .then((res)=>res.json())
    .then((data)=> { 
        // console.log(data);
        displayAllOrders(data);
    })
}
const displayAllOrders = (orders) => {
    let i = 1;
    orders.forEach(order => {
        fetch(`https://ross-valley.onrender.com/product/${order.product}/`)
        .then((res) => res.json())
        .then((value) => {
            const parent = document.getElementById("order_data");
            const div = document.createElement("tr");
            div.innerHTML = `
                <td>${i++}</td>
                <td>${order.name}</td>
                <td>${order.phone}</td>
                <td>${value.product_name}</td>
                <td>${order.order_status}</td>
                <td> <button class="btn btn-warning"> <a href="vieworder.html?Id=${order.id}">view Detail</a></button></td>
            `;
            parent.appendChild(div);
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            // Handle the error, e.g., display a placeholder or error message in the table
        });
    });
};
allorders();
const Orderdetails = () => {
    const queryString = window.location.search;
    console.log("Query String: ", queryString); // Log the entire query string
    const param = new URLSearchParams(queryString).get("Id");
    
    if (param) {
        console.log("Parameter 'Id' found: ", param);

        fetch(`https://ross-valley.onrender.com/orders/${param}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Order Data: ", data);
            document.getElementById("billing_name").innerText = data.name;
            document.getElementById("billing_address").innerText = data.address;
            document.getElementById("billing_phone").innerText = data.phone;
            document.getElementById("billing_email").innerText = data.email;

            fetch(`https://ross-valley.onrender.com/product/${data.product}/`)
            .then((res) => res.json())
            .then((value) => {
                document.getElementById("billing_product_name").innerText = value.product_name;
                document.getElementById("billing_image").src = value.product_image;
                document.getElementById("billing_price").innerText = value.product_price;
                document.getElementById("billing_status").innerText = data.order_status;
                document.getElementById("description").innerText = value.product_description;

                
            });
        });
    } else {
        console.error("Parameter 'Id' not found in the URL.");
    }
};
Orderdetails();
const changeStatus=(event)=>{  
    event.preventDefault();
    const param = new URLSearchParams(window.location.search).get("Id");   
    const starus = document.getElementById("order_status");
    const selectedItem = starus.options[starus.selectedIndex];
    console.log(selectedItem.value);
   

    const info = {
        order_status: selectedItem.value,

    };
    console.log(info);
    
    fetch(`https://ross-valley.onrender.com/orders/${param}/`,{
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = `vieworder.html?Id=${param}`;
        console.log(data);
      });
  };
function loadAllProducts() {

    fetch(`https://ross-valley.onrender.com/product/`)
        .then((res) => res.json())
        .then((data) =>{
            displayAllProduct(data);
        })
        .catch((err) => console.log(err));
}
const displayAllProduct = (products) => {
    let i = 1;
    products.forEach(product => {
        fetch(`https://ross-valley.onrender.com/categories/${product.category}/`)
        .then((res) => res.json())
        .then((data) => {
            const parent = document.getElementById("productData");
            const tr = document.createElement("tr");
            tr.classList.add("product_info");
            tr.innerHTML = `
                <td>${i++}</td>
                <td><img src="${product.product_image}" width="70" height="70" alt="img" srcset=""></td>
                <td>${product.product_name}</td>
                <td>${product.product_price}</td>
                <td>${data.category_name}</td> <!-- Now using the fetched category name -->
                <td>${product.product_quantity}<span> Pcs</span> </td>
                <td>
                    <a href="editProduct.html?Id=${product.id}">
                    <span class=" btn btn-warning text-dark">Edit</span>
                    </a>
                </td>
            `;
            parent.appendChild(tr);
        })
        .catch((error) => {
            console.error("Error fetching category data:", error);
        });
    });
};
loadAllProducts();
function loadAllCategories() {

    fetch(`https://ross-valley.onrender.com/categories/`)
        .then((res) => res.json())
        .then((data) =>{
            displayAllCategory(data);
        })
        .catch((err) => console.log(err));
}
const displayAllCategory = (cagories) => {
    let i = 1;
    cagories.forEach(category => {
            const parent = document.getElementById("category_data");
            const tr = document.createElement("tr");
            tr.classList.add("category_info");
            tr.innerHTML = `

                    <td>${i++}</td>
                    <td>${category.category_name}</td>
                    <td style="width: 20%;"><button type="button"
                     class="btn btn-primary" data-toggle="modal" 
                     data-target="#exampleModal" onclick="editCategory(${category.id})" >Edit</button></td>
                   
                                                                  
            `;
            parent.appendChild(tr);
        })
        .catch((error) => {
            console.error("Error fetching category data:", error);
       
    });
};
loadAllCategories();

const editCategory = (id) => {
  fetch(`https://ross-valley.onrender.com/categories/${id}/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
          document.getElementById('edit_category').value = data.category_name;
          const setId =document.getElementById('edit_category').dataset.id = id;
          console.log(setId);
      })
      .catch(error => {
          console.error('Error fetching category data:', error);
      });
};

document.getElementById('update_category').addEventListener('click', () => {
  const id = document.getElementById('edit_category').dataset.id;
  const updatedCategory = document.getElementById('edit_category').value;
  const updateSlug = updatedCategory.toLowerCase().replace(/\s+/g, '-');


  fetch(`https://ross-valley.onrender.com/categories/${id}/`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        category_name: updatedCategory,
        category_slug:updateSlug,

      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to update category');
      }
      return response.json();
  })
  .then(data => {
      console.log('Category updated:', data);
      $('#exampleModal').modal('hide');
      window.location.href = `category.html`;
  })
  .catch(error => {
      console.error('Error updating category:', error);
  });
});