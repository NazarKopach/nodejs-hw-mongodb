export const handleSaveError = (error, doc, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code ? 409 : 400;
  next();
};

export const setUpdateSetting = function (next) {
  this.options.new = true;
  this.options.runValidatiors = true;
  next();
};
