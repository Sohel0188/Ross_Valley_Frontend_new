function loadHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
           
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            navbarOption();
        })
        .catch(error => console.error('Error loading the file:', error));
}


const navbarOption = () => {
    
    const loginLink = document.getElementById('login');
    const logoutLink = document.getElementById('logout');
    const registerLink = document.getElementById('register');
    const profileLink = document.getElementById('profile');

    
    // Define logoutLink
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);

    if (token) {
        // User is logged in
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';

        registerLink.style.display = 'none';
        // dashboardLink.style.display = 'block';
        profileLink.style.display = 'block';

        // accept_btn.style.display = 'block';
        // accept_alert.style.display = 'none';
    } else {
        // User is not logged in
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';

        registerLink.style.display = 'block';
        profileLink.style.display = 'none';
        // dashboardLink.style.display = 'none';

        // accept_btn.style.display = 'none';
        // accept_alert.style.display = 'block';
    }

};

