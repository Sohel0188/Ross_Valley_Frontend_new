const contactUs=()=>{
    fetch(`https://ross-valley.onrender.com/contact_us/`)
    .then((res)=>res.json())
    .then((data)=> { 
        console.log(data);
        displaycontact(data);
    })
  }
  const displaycontact = (contactInfo) => {
    let i = 1;
    contactInfo.forEach(contact => {
            const parent = document.getElementById("contact_us");
            const tr = document.createElement("tr");
            tr.classList.add("contact_data");
            tr.innerHTML = `
                <td>${i++}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.problem}</td>
              
            `;
            parent.appendChild(tr);
        })
        
      }
  
  contactUs();