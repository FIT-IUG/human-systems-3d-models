const PORT = process.env.PORT || 8000;
const path = require('path');
const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.use('/*', express.static(path.join(__dirname,'..','public','index.html')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
