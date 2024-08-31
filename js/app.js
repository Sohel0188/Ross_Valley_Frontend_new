

function allProducts() {

    fetch(`https://ross-valley.onrender.com/product/`)
        .then((res) => res.json())
        .then((data) => displayProductData(data))
        .catch((err) => console.log(err));
}

const displayProductData = (products) => {

    products.forEach(product => {
        // console.log(product.product_name)
        const parent = document.getElementById("product-container");
        const div = document.createElement("div");
        div.classList.add("col-lg-3", "col-sm-6", "col-12");
        div.innerHTML = `
                <div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="100ms">
                    <!-- Product Image -->
                    <div class="product-img">
                    <img src="${product.product_image}" alt="Girl in a jacket">
    
                        <!-- Product Tag -->
                        <div class="product-tag">
                            <a href="#">Hot</a>
                        </div>
                        <div class="product-meta">
                            <a href="checkout.html?Id=${product.id}" class="add-to-cart-btn">Buy Now</a>
                           
                        </div>
                    </div>   
                    <!-- Product Info -->
                    <div class="product-info mt-15 text-center">
                        <a href="shop-details.html?Id=${product.id}">
                            <h6>${product.product_name}</h6>
                        </a>
                        <h6>${product.product_price}</h6>
                    </div>
              </div>
        `
        parent.appendChild(div);

    });
}



// .................Single Products.....................//

function singleProducts() {
    const param = new URLSearchParams(window.location.search).get("Id");

    fetch(`https://ross-valley.onrender.com/product/${param}/`)
        .then((res) => res.json())
        .then((data) => {
              
            const parent = document.getElementById("buy_now");

            console.log(parent); // To confirm that the parent div is correctly selected
            
            const div = document.createElement("div");
            
            div.innerHTML = `
                <a href="checkout.html?Id=${data.id}" class="btn alazea-btn ml-15">Buy Now</a>
            `
            
            parent.appendChild(div);
            
            document.getElementById("product_image").src=data.product_image;
            document.getElementById("product_image_link").href=data.product_image;
            document.getElementById("product_name").innerText=data.product_name;
            document.getElementById("product_price").innerText=data.product_price;
            document.getElementById("product_short_dis").innerText=data.product_description.slice(0, 350);
            document.getElementById("long_description").innerText=data.product_description;
            document.getElementById("stock").innerText=data.product_quantity;
        });
        
        // .then((data) => console.log(data))
        
}
//============Reviews==============//
function reviewsForProduct() {
    const param = new URLSearchParams(window.location.search).get("Id");
    fetch(`https://ross-valley.onrender.com/reviews/?product=${param}`)
    .then((res) => res.json())
    .then((data) => {
        const reviewsContainer = document.getElementById("reviews_area");
        data.forEach(review => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review-item"); 
            reviewDiv.innerHTML = `
            <ul>
                <li>
                    <div class="review-rating">
                        <span>${review.rating}</span><br>
                        <span class="review-details">${review.body}</span>
                    </div>
                    <div class="review-details">
                        <p>by <span class="reviewer">${review.reviewer}</span> on <span class="review-time">${new Date(review.created).toLocaleString()}</span></p>
                    </div>  
                </li>
            </ul>
        `;
            reviewsContainer.appendChild(reviewDiv);
        });
    })
    .catch((err) => console.log(err));
}

const takeReview=(event)=>{  
        event.preventDefault();
        const param = new URLSearchParams(window.location.search).get("Id");
        const comments = document.getElementById("comments").value;
        const user = localStorage.getItem("user_id");
        const created = new Date().toISOString();
        const star = document.getElementById("star_options");
        const selectedItem = star.options[star.selectedIndex];
        console.log(selectedItem.value);
       
    
        const info = {
            rating: selectedItem.value,
            product:param,
            reviewer:user,
            created:created,
            body:comments,
        };
        console.log(info);
        
        fetch(`https://ross-valley.onrender.com/reviews/?product=${param}`,{
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            window.location.reload();
            console.log(data);
          });
      };



// =================Order======================//

const confirmOrder=()=>{    
    const param = new URLSearchParams(window.location.search).get("Id");   
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const customer = localStorage.getItem("user_id");
    console.log(customer);
    const info = {
      appointment_status: "Pending",
      name: name,
      email : email,
      phone : phone,
      address : address,
      cancel: false,
      customer: customer,
      product: param,
    };
    
    // console.log(info);
    fetch("https://ross-valley.onrender.com/orders/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data);
      });
  };


  function CheckoutProductInfo() {
    const param = new URLSearchParams(window.location.search).get("Id");

    fetch(`https://ross-valley.onrender.com/product/${param}/`)
        .then((res) => res.json())
        .then((data) => {
            const name = data.product_name; 
            const image = data.product_image;
            const price = data.product_price;
            
            document.getElementById("product_name").innerText = name;

            document.getElementById("product_image").src = image;
            document.getElementById("product_image").alt = name;  
            document.getElementById("product_price").innerText = price;  
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}

  
// .................Single Products.....................//
CheckoutProductInfo();
reviewsForProduct();
singleProducts();
allProducts();

