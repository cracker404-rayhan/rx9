const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/order', (req, res) => {
    const { service, quantity } = req.body;

    // Process order logic (connect with database)
    res.send(`Order for ${quantity} ${service} placed successfully!`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
