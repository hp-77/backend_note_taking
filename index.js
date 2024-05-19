// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');


// Initialize Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  
    const directoryPath = path.join(__dirname, 'files_data');
    
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    console.log(files);
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    res.render('index',{files:files});

// Read file asynchronously
  
});
  
   
});
    //  without utf-8 buffered hexadecimal data would be there must utf-8 

    // earlier there was error in route path due to absense of "/" before files_data

    app.get('/files_data/:filename', (req, res) => {

        // const filePath = `./files_data/${req.params.filename}`;
     
         fs.readFile(`./files_data/${req.params.filename}`,"utf-8", (err, filedata) => {
            
 
             
             console.log('File content:', filedata);
             res.send(filedata);
         });
     });












function createTask(topic, description) {
    const filename = `${topic}.txt`; // Use topic as filename
    const filePath = path.join(__dirname, 'files_data', filename); // Path to store tasks
    const data = `Topic: ${topic}\nDescription: ${description}\n`;

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error creating task:', err);
            return;
        }
        console.log('Task created successfully.');
      
    });
}











app.post('/create', (req, res) => {
    const { topic, description } = req.body;
    console.log(req.body);

    // Check if both topic and description are provided
    if (!topic || !description) {
        return res.status(400).json({ error: 'Both topic and description are required.' });
    }

    // Create the task
    createTask(topic, description);
    res.redirect("/");
});









// Start the server

app.listen( 3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});

