const scrollButton = document.querySelector('.scroll-down');

scrollButton.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight * 1.27,
    behavior: 'smooth'
  });
});

const prescriptionImage = document.querySelector('.prescription_image');

prescriptionImage.addEventListener('click', () => {
  const backgroundImageURL = getComputedStyle(prescriptionImage).backgroundImage;
  const imageURL = backgroundImageURL.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
  window.open(imageURL, '_blank');
});


// Make a GET request to the Flask route to retrieve the data
fetch('/prescriptions')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(data => {
    // Retrieve the data from the response
    const { username, logFolder, date, doctor, description } = data;

    // Store the data in variables of the same name
    const usernameVariable = username;
    const logFolderVariable = logFolder;
    const dateVariable = date;
    const doctorVariable = doctor;
    const descriptionVariable = description;

    // Use the data as needed
    console.log(usernameVariable);
    console.log(logFolderVariable);
    console.log(dateVariable);
    console.log(doctorVariable);
    console.log(descriptionVariable);

    const doctorName = document.querySelectorAll('.doctor-name');

    doctorName.forEach(element =>{
        element.innerHTML = `${doctorVariable}`
    });

    const dateHTML = document.querySelectorAll('.date');

    dateHTML.forEach(element =>{
        element.innerHTML = `${dateVariable}`
    });

    const descriptionHTML = document.querySelectorAll('.description');

    descriptionHTML.forEach(element =>{
        element.innerHTML = `${descriptionVariable}`
    });

    // Select the div element by its class name
    const prescriptionImageDiv = document.querySelector('.prescription_image');

    // Change the background image
    prescriptionImageDiv.style.backgroundImage = `url('/users/${username}/prescriptions/${logFolderVariable}/image.png')`;

    console.log(`url('/users/${username}/prescriptions/${logFolderVariable}/image.png')`);

  })
  .catch(error => {
    console.error('Error:', error);
});