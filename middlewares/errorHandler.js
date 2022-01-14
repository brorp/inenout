const errorHandler = async (err, req, res, next ) => {
    let code = 500;
    let msg = "Internal server error";
  console.log(err)
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.name === "notauthenticated") {
    code = 401;
    msg = "Login first";
  } else if (err.name === "JsonWebTokenError" || err.name === "invalid_token") {
    code = 401;
    msg = "Invalid token";
  } else if (err.name === "invalidlogin") {
    code = 401;
    msg = "Email atau kata sandi salah";
  } else if (err.name === "invaliduser") {
    code = 401;
    msg = "User tidak ditemukan";
  } else if (err.name === "passwordnotmatch") {
    code = 401;
    msg = "Password tidak sama";
  } else if (err.name === "mailnotfound") {
    code = 401;
    msg = "Email tidak boleh kosong";
  } 

  res.status(code).json({
    message: msg,
  });
}

module.exports = errorHandler