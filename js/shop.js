function allProducts(){
    
    fetch(`https://ross-valley.onrender.com/product/`)
    .then((res) => res.json())
    .then((data)=> displayProductData(data))
    .catch((err)=> console.log(err));
}

const displayProductData = (products) => {
    
    products.forEach(product => {
        console.log(product.product_name) 
        const parent = document.getElementById("singleProduct");
        const div = document.createElement("div");
        div.classList.add("col-12", "col-sm-6", "col-lg-4");
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

 // .................category.....................//
function allCategory(){
    fetch("https://ross-valley.onrender.com/categories/")
    .then((res) => res.json())
    .then((data)=> displayAllCategory(data))
    .then((data)=> console.log(data))
    .catch((err)=> console.log(err));
  }
  
  const displayAllCategory=(categorys)=>{
    categorys?.forEach((category)=>{
      const parent = document.getElementById("catagory");
      const div = document.createElement("div");
      div.classList.add("widget-desc")
      div.innerHTML=`
          <div class="custom-control custom-checkbox d-flex align-items-center mb-2">
          <input type="checkbox" onclick='filterProducts(${category.id})'class="custom-control-input" id="${category.category_name}">
          <label class="custom-control-label" for="${category.category_name}">${category.category_name}<span class="text-muted">(72)</span></label></div>
      `
      parent.appendChild(div);
    });
  }

  
  
function filterProducts(catId){
  console.log(catId);
  fetch(`https://ross-valley.onrender.com/product/?category_id=${catId}`)
  .then((res) => res.json())
  .then((data)=> displayProductData(data))
  .then((data)=> console.log(data))
  .catch((err)=> console.log(err));
  document.getElementById("singleProduct").innerHTML="";
}

allCategory();
allProducts();