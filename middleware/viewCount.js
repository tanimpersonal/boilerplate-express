let count = 0;
module.exports.viewCount = (req, res, next) => {
  count++;
  //   next is a function which will call the next route and send response
  console.log(count);
  next();
};
