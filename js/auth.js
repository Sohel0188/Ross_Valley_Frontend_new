
const clearForm = () => {
    document.getElementById("user_name").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password1").value = "";
};

const handleRegistration = (event) => {
    event.preventDefault();

    const getValue = (id) => document.getElementById(id).value.trim();

    const username = getValue("user_name");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("password1");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        account_type:"customer",
    };

    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            console.log(info);
            document.getElementById('registration_button').innerText='Loding...';
            fetch("https://ross-valley.onrender.com/users/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),


            })
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data);
                    document.getElementById("error").innerText = data;
                    document.getElementById('registration_button').innerText='Register';
                    clearForm();
                });
        } else {
            document.getElementById("error").innerText =
                "Password must contain at least eight characters, including one letter, one number, and one special character.";
        }
    }
};



// const handleLogin = (event) => {

//     event.preventDefault();
//     const getValue = (id) => document.getElementById(id).value.trim();
//     const username = getValue("user_name");
//     const password = getValue("password");
//     console.log(username, password);
//     if ((username, password)) {
//         fetch("https://ross-valley.onrender.com/users/login/", {
//             method: "POST",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);

//                 if (data.token && data.user_id) {
//                     localStorage.setItem("token", data.token);
//                     localStorage.setItem("user_id", data.user_id);
//                     localStorage.setItem("account_type", data.account_type);
//                     console.log(data.account_type);
//                     document.getElementById("loginSuccessful").innerHTML = "Successfully Logged in ";
                    
//                     // if (data.account_type === "customer") {
//                     //     window.location.href = "http://127.0.0.1:5500/index.html";
//                     // } else{
//                     //     window.location.href = "http://127.0.0.1:5500/admin/index.html";
//                     // }
                                       
//                 } else {
//                     document.getElementById("loginUnsuccessful").innerHTML = data.error;
//                 }

//             });
//     }
// };

const handleLogin = (event) => {
    event.preventDefault();
    
    const getValue = (id) => document.getElementById(id).value.trim();
    const username = getValue("user_name");
    const password = getValue("password");
    
    console.log(username, password);
    
    if (username && password) {
        fetch("https://ross-valley.onrender.com/users/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);

                // Fetch user details to get account_type
                fetch(`https://ross-valley.onrender.com/users/list/${data.user_id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.token}` // Include token in the header
                    },
                })
                .then((res) => res.json())
                .then((userData) => {
                    console.log(userData);

                    if (userData.account_type) {
                        localStorage.setItem("account_type", userData.account_type);
                        console.log(userData.account_type);
                        document.getElementById("loginSuccessful").innerHTML = "Successfully Logged in ";
                        
                        // Redirect based on account_type
                        if (userData.account_type === "customer") {
                            window.location.href = "http://127.0.0.1:5500/index.html";
                        } else {
                            window.location.href = "http://127.0.0.1:5500/admin/index.html";
                        }
                    } else {
                        document.getElementById("loginUnsuccessful").innerHTML = "Account type not found.";
                    }
                });
            } else {
                document.getElementById("loginUnsuccessful").innerHTML = data.error;
            }
        });
    }
};

const handlelogOut = () => {

    const token = localStorage.getItem("token");
    console.log(token)

    fetch("https://ross-valley.onrender.com/users/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");
            window.location.href = "index.html";

        });
};

