function openPopup() {
  document.getElementById("popup").style.display = "block";
}
  
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function submitForm(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const time = document.querySelector('input[name="time"]:checked').value;
  
  const formData = {
    firstName,
    lastName,
    email,
    appointmentDate,
    time,
  };
  
  fetch('/submitForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the server response if needed
      console.log(data);
      // You can display a success message or redirect the user
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here
    });
}
  