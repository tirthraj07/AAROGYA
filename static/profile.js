function scrollDown(){
    window.scrollBy(0, window.innerHeight);
}

var username,name,email,age,gender,address,password;

var profileData = {};

fetch('/profile_data')
  .then(response => response.json())
  .then(data => {
    profileData = data;
    username = profileData.username;
    name = profileData.name;
    email = profileData.email;
    age = profileData.age;
    gender = profileData.gender;
    address = profileData.address;
    password = profileData.password;
    console.log(profileData);

    const nameInnerHTML = document.querySelectorAll('.name');

    nameInnerHTML.forEach(element => {
        element.innerHTML = `<u>Full Name:</u>
        <div>
            ${name}
        </div>
        <hr>`;
    });

    const emailInnerHTML = document.querySelectorAll('.email');

    emailInnerHTML.forEach(element => {
        element.innerHTML = `<u>Email:</u>
        <div>
            ${email}
        </div>
        <hr>`;
    });
    const usernameInnerHTML = document.querySelectorAll('.username');
    
    usernameInnerHTML.forEach(element => {
        element.innerHTML = `<u>Username</u>
        <div>
            ${username}
        </div>
        <hr>`;
    });
    
    const ageInnerHTML = document.querySelectorAll('.age');
    
    ageInnerHTML.forEach(element => {
        element.innerHTML = `<u>Age:</u>
        <div>
           ${age}
        </div>
        <hr>`;
    });
    const genderInnerHTML = document.querySelectorAll('.gender');
    
    genderInnerHTML.forEach(element => {
        element.innerHTML = `<u>Gender:</u>
        <div>
            ${gender}
        </div>
        <hr>`;
    });
    const addressInnerHTML = document.querySelectorAll('.address');
    
    addressInnerHTML.forEach(element => {
        element.innerHTML = `<u>Address:</u>
        <div>
            ${address}
        </div>
        <hr>`;
    });

    const namesidebarInnerHTML = document.querySelectorAll('.name_sidebar');

    namesidebarInnerHTML.forEach(element => {
        element.innerHTML = `${name}`;
    });


    const emailsidebarInnerHTML = document.querySelectorAll('.email_sidebar');

    emailsidebarInnerHTML.forEach(element => {
        element.innerHTML = `${email}`;
    });


        // Fetch the logs.csv file
    fetch(`/users/${username}/prescriptions/logs.csv`)
    .then(response => response.json())
    .then(data => {
    if (data.error) {
        console.error('Error:', data.error);
    } else {
        var logs = data.logs;
        // Use the 'logs' variable as per your requirements
        console.log(logs);
        renderLogs(logs);
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });



  })
  .catch(error => {
    console.log('Error:', error);
  });








// ------------------------------------------------------------ DO NOT TOUCH --------------------------------------------------------





const logContainer = document.getElementById('logContainer');
const dateInput = document.getElementById('date');
const doctorInput = document.getElementById('doctor')
const addLogBtn = document.getElementById('addLogButton')
const logList = document.getElementById('logList')
// const description = document.getElementById('')



// Function to add new log
function addLog(){
    const doctorText = doctorInput.value.trim();
    console.log(dateInput.value);
    if (dateInput.value!==''){
        if (doctorText===''){
            // dateLog.push(dateInput);
            // doctorLog.push('unnamed');
            // renderLogs();
            doctorInput.value = '';
        }

        if (doctorText!==''){
            // dateLog.push(dateInput);
            // doctorLog.push(doctorText);
            // renderLogs();
            doctorInput.value = '';
        }
    }
}

//Function to remove log

function removeLog(index){
    log.splice(index,1);
    // doctorLog.splice(index,1);
    renderLogs();
}

//Function to render the logs on the screen:
// -------------------------------------x--------------------
function renderLogs(logs) {
    const logList = document.getElementById('logList');
    logList.innerHTML = '';
  
    if (Array.isArray(logs)) {
        if (logs.length > 0 && logs[logs.length - 1].trim() === '') {
            logs.pop(); // Remove the last element if it is empty
        }
      logs.forEach((log, index) => {
        const logItem = createLogItem(log, index, logs);
        logList.appendChild(logItem);
      });
    } else {
        const logItem = createLogItem(logs, 0, logs);
        logList.appendChild(logItem);
    }
}

function createLogItem(log, index,logs) {    
    const logItem = document.createElement('div');
    logItem.classList.add('log-item');
  
    const logText = document.createElement('span');
    logText.innerHTML = `<a href='#'>${log}</a>`;
  
    const viewBtn = document.createElement('button');
    viewBtn.innerText = 'View';
    viewBtn.classList.add('viewBtn');
    
    viewBtn.addEventListener('click', function () {
        console.log('Current log:', log);
        sendLogToServer(log);
        openPrescriptionsPage();
    });

    logItem.appendChild(logText);
    logItem.appendChild(viewBtn);
  
    return logItem;
  }


function sendLogToServer(log) {
fetch(`/users/${username}/prescriptions/save-log`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ log: log }),
})
    .then(response => response.json())
    .then(data => {
    console.log('Log saved on the server:', data.message);
    })
    .catch(error => {
    console.error('Error saving log:', error);
    });
}

function openPrescriptionsPage() {
    window.location.href = '/prescriptionsHTML';
}

// -----------------------------------x--------------------
// function renderLogs(logs){
//     const logList = document.getElementById('logList')
//     logList.innerHTML = '';
  
//     logs.forEach((log,index) => {
//         const logItem = document.createElement('div');
//         // let doctorName = doctorLog[index];
//         // let dateName = dateLog[index].value;

//         let logName = logs[index];
        
//         logItem.classList.add('log-item');

//         const logText = document.createElement('span');
//         logText.innerHTML = `<a href='#'>${logs}<a>`;

//         const removeBtn = document.createElement('button');
//         removeBtn.innerText = 'Remove';
//         removeBtn.classList.add('removeBtn')
//         removeBtn.addEventListener('click', () => {
//             removeLog(index);
//         });

//         logItem.appendChild(logText);
//         logItem.appendChild(removeBtn);
    
//         logList.appendChild(logItem);

//     });

    const descriptionInput = document.getElementById('description').value;
    const imageFile = document.getElementById('imageInput').files[0];

    




    // doctorInput, dateInput, descriptionInput, imageFile

    


// Event listener for adding a new log
// addLogBtn.addEventListener('click', addLog);

// document.getElementById('addLogBtn').addEventListener('click', () => {
//     const dateInput = document.getElementById('date').value;
//     const doctorInput = document.getElementById('doctor');
    

   




// ---------------------------------------------------------------- DO NOT TOUCH ----------------------------------------------------

// // Define the 'logs' list
// let logs = [];

// // Function to fetch the logs from 'logs.csv'
// async function fetchLogs() {
//   try {
//     // const username = await fetchUsername();
//     const logsPath = `/users/${username}/prescriptions/logs.csv`;
//     const response = await fetch(logsPath);
//     const csvData = await response.text();
//     const rows = csvData.split('\n');

//     // Parse each row and append to the 'logs' list
//     rows.forEach((row) => {
//       const entry = row.trim();
//       if (entry !== '') {
//         logs.push(entry);
//       }
//     });

//     // Log the 'logs' list
//     console.log(logs);
//   } catch (error) {
//     console.error('Error fetching logs:', error);
//   }
// }

// // Function to fetch the username from 'current_user.txt'
// async function fetchUsername() {
//   try {
//     // const response = await fetch('/users/current_user.txt');
//     // const username = await response.text();
//     console.log(username)
//     // return username.trim();
//   } catch (error) {
//     console.error('Error fetching username:', error);
//   }
// }





