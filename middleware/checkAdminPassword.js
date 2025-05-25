const checkAdminPassword = async (req, res, next) => {
  const { admin_password } = req.body;
  if (admin_password !== process.env.ADMIN_PASSWORD) {
    const error = new Error("Incorrect admin password");
    error.statusCode = 403;
    return next(error);
  }
  next(); // Proceed if password is correct
};

module.exports = { checkAdminPassword };
