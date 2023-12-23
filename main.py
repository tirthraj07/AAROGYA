from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory
import csv
import os
import logging

app = Flask(__name__)


# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Set the log level for Flask application logs
app.logger.setLevel(logging.DEBUG)


def check_existing_user(username, email):
    with open('users/users.csv', 'r') as file:
        reader = csv.reader(file)
        # Skip the header row if it exists
        header = next(reader, None)
        if header is not None:
            for row in reader:
                if row[1] == username or row[2] == email:
                    # print(username,row[1],email,row[2])
                    return True
    return False



def store_user_data(data):
    with open('users/users.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data.values())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():

    # print("Hello World")
    name = request.form['name']
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    age = request.form['age']
    gender = request.form['gender']
    address = request.form['address']

    if check_existing_user(username, email):
        return jsonify({'message': 'Username or email already exists. Please try a different one.'})

    else:
        user_data = {
            'name': name,
            'username': username,
            'email': email,
            'password': password,
            'age': age,
            'gender': gender,
            'address': address
        }

        store_user_data(user_data)


        # Create a folder with the username inside the "users" folder
        user_folder = os.path.join('users', username)
        os.makedirs(user_folder)

        # Store user information in a CSV file within the user folder
        user_csv_file = os.path.join(user_folder, 'info.csv')
        with open(user_csv_file, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(user_data.keys())  # Write the header
            writer.writerow(user_data.values())  # Write the data

        # Create the 'prescriptions' folder inside the user's folder
        prescriptions_folder = os.path.join(user_folder, 'prescriptions')
        os.makedirs(prescriptions_folder)

        return jsonify({'message': 'Signup successful'})

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    with open('users/users.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[1] == username and row[3] == password:
                current_user_file = 'users/current_user.txt'
                with open(current_user_file, 'w') as file:
                    file.write(username)
                return jsonify({'message': 'true'})
            
        return jsonify({'message': 'false'})



@app.route('/indexHTML')
def indexHTML():
    return render_template('index.html')

@app.route('/depression')
def depression():
    return render_template('depression.html')

@app.route('/cancer')
def cancer():
    return render_template('cancer.html')

@app.route('/loginHTML')
def loginHTML():
    return render_template('login.html')

@app.route('/addiction')
def addiction():
    return render_template('addiction.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')



def read_user_data(username):
    # Read the username from the current_user.txt file
    with open('users/current_user.txt', 'r') as file:
        username = file.read().strip()

    # Open the user's folder and read the info.csv file
    with open(f'users/{username}/info.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        row = next(reader)  # Read the second row

        # Extract the data from the row
        name = row[0]
        username = row[1]
        email = row[2]
        password = row[3]
        age = row[4]
        gender = row[5]
        address = row[6]

    # Return the user data as a dictionary
    user_data = {
        'name': name,
        'username': username,
        'email': email,
        'password': password,
        'age': age,
        'gender': gender,
        'address': address
    }

    return user_data


@app.route('/profile_data')
def profile_data():
    username = ''  # Retrieve the username
    user_data = read_user_data(username)
    return jsonify(user_data)

@app.route('/', methods=['GET', 'POST'])
def add_log():
    if request.method == 'POST':
        # Get form data
        date = request.form.get('date')
        doctor = request.form.get('doctor')
        description = request.form.get('description')
        image = request.files['image']

        # Create the folder path
        with open('users/current_user.txt', 'r') as file:
            username = file.read().strip()
        
        folder_path = f'users/{username}/prescriptions'

        # Create the folder if it doesn't exist
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        # Create the subfolder using date and doctor name
        subfolder_name = f'{date}_{doctor}'
        subfolder_path = os.path.join(folder_path, subfolder_name)
        if not os.path.exists(subfolder_path):
            os.makedirs(subfolder_path)

        # Save the uploaded image with the name 'image.png'
        image.save(os.path.join(subfolder_path, 'image.png'))

        # Create the prescription_info.csv file
        csv_path = os.path.join(subfolder_path, 'prescription_info.csv')
        with open(csv_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Date', 'Doctor', 'Description'])
            writer.writerow([date, doctor, description])

        # Append log entry to logs.csv
        logs_path = os.path.join(folder_path, 'logs.csv')
        with open(logs_path, 'a', newline='') as logs_csv:
            writer = csv.writer(logs_csv)
            writer.writerow([f'{date}_{doctor}'])

        

    return render_template('profile.html')

# --------------------------------------x--------------------------------------------------------------

@app.route('/users/<username>/prescriptions/logs.csv')
def get_logs_csv(username):
    # Assuming you have the 'username' variable available
    filename = f'users/{username}/prescriptions/logs.csv'
    
    try:
        with open(filename, 'r') as file:
            # logs = file.read()
            logs = file.read().split('\n')
            return jsonify(logs=logs)
    except FileNotFoundError:
        return jsonify(error='File not found')




@app.route('/profile.js', methods=['GET'])
def send_js():
    return render_template('profile.js')


@app.route('/users/<username>/prescriptions/save-log', methods=['POST'])
def save_log(username):
    # Read the username from the current_user.txt file
    with open('users/current_user.txt', 'r') as file:
        username = file.read().strip()

    filename = f'users/{username}/open_prescription.txt'

    # Read the log from the request
    log = request.json.get('log')

    # Save the log in the text file
    with open(filename, 'w') as file:
        file.write(log)

    return jsonify(message='Log saved successfully')


@app.route('/prescriptionsHTML')
def render_prescriptions_page():
    return render_template('prescriptions.html')

@app.route('/prescriptions')
def prescriptions():

    with open('users/current_user.txt', 'r') as file:
        username = file.read().strip()
    
    log_folder_path = f'users/{username}/open_prescription.txt'

    # Read data from open_prescription.txt
    with open(log_folder_path, 'r') as log_file:
        log_folder = log_file.read().strip()
    
    csv_file_path = f'users/{username}/prescriptions/{log_folder}/prescription_info.csv'

    # Read data from prescription_info.csv
    with open(csv_file_path, 'r') as csv_file:
        lines = csv_file.readlines()
        data = lines[1].strip().split(',')
        date = data[0]
        doctor = data[1]
        description = data[2]

    # Create a dictionary with the data
    response_data = {
        'username': username,
        'logFolder': log_folder,
        'date': date,
        'doctor': doctor,
        'description': description
    }

    return jsonify(response_data)

# Serve static files from the 'prescriptions' folder
@app.route('/users/<username>/prescriptions/<log_folder>/<path:filename>')
def prescriptions_files(username, log_folder, filename):
    return send_from_directory(f'users/{username}/prescriptions/{log_folder}', filename)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)

