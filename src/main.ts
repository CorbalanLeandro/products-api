import express from 'express';

const app = express();

//Server on
app.listen(app.get('port'), () =>
  console.log(`Server running on port ${app.get('port')}`),
);
