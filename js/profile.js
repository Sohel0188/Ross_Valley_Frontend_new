const loadUserDetails=()=>{
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`https://ross-valley.onrender.com/users/list/${user_id}/`)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementById("user_image").src=data.image;
        document.getElementById("user_name").innerText = data.user.first_name + ' ' + data.user.last_name;
        document.getElementById("user_email").innerText = data.user.email
    });
}
const orderHistory = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://ross-valley.onrender.com/orders/?customer_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => displayAllProducts(data));
};

const displayAllProducts = (orders) => {
    console.log(orders);
    const parent = document.getElementById("order_history");

    orders.forEach(order => {
        fetch(`https://ross-valley.onrender.com/product/${order.product}/`)
            .then((res) => res.json())
            .then((product) => {
                console.log("Product Info: ", product);

                // Create a table row for each order
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="cart_product_img gap-2">
                        <a href="#"><img id="product_img" src="${product.product_image}" width="70" alt="${product.name}"></a>
                        <h5 id="order_product_name">${product.product_name}</h5>
                    </td>
                    <td class="status gap-2">
                        <span>${order.order_status}</span>
                    </td>
                    <td class="price gap-2"><span>${product.product_price}</span></td>
                    <td class="action gap-2" id="cancelled">
                        <button type="button" class="btn btn-danger" onclick="cancelOrder(${order.id})">Cancel Order</button>
                    </td>
                `;
                parent.appendChild(tr);
            });
    });
};

// Function to handle order cancellation (optional)
const cancelOrder = (orderId) => {
    if (confirm("Are you sure you want to cancel this order?")) {
        // Logic to cancel the order (e.g., make an API call to update order status)
        console.log(`Order ${orderId} cancelled.`);
    }
};

orderHistory();
loadUserDetails();