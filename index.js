const PORT = process.env.PORT || 8000;
const path = require('path');
const express = require('express');
const app = express();


app.use(function(req, res, next) {
  // check  extension
  console.log(req.originalUrl,'url');
  next();
}, express.static(__dirname));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/*', express.static(path.join(__dirname,'..','public','index.html')));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
