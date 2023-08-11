const { stack } = require("../routes/products");

function logErrors(err, re, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}


function errorHandler(err, re, res, next){
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack : err.stack,

  });
}
//En caso que no sea un boom lo ejecutara como un error normal
function boomErrorHandler(err, re, res, next){
  if (err.isBoom){
    const  { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else{
    next(err);
  }
}


module.exports =  { logErrors, errorHandler, boomErrorHandler }
