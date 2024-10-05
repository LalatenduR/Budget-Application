const express = require('express')
const app = express()
const port = 3000
const mysql=require('mysql2');
const cors=require('cors');

app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
});


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
});

app.post('/submit', (req, res) => {
    const { categoryName, amountToAdd } = req.body;
  
    connection.query('CALL updateCategoryAmount(?, ?)', [categoryName, amountToAdd], (err, results) => {
      if (err) {
        console.error('Error executing stored procedure:', err.stack);
        return res.status(500).send('Error updating category amount');
      }
      res.send('Category amount updated successfully');
    });
});

app.get('/expenses', (req, res) => {
    connection.query('CALL getAllExpenses()', (err, results) => {
      if (err) {
        console.error('Error fetching data:', err.stack);
        return res.status(500).send('Error fetching data');
      }
      res.json(results[0]); // results[0] contains the actual data
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
