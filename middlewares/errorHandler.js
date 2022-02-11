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
    msg = "Tidak dapat mengakses";
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError" || err.name === "invalidtoken") {
    code = 401;
    msg = "Invalid token";
  } else if (err.name === "invalidlogin") {
    code = 401;
    msg = "Email atau kata sandi salah";
  } else if (err.name === "invaliduser") {
    code = 401;
    msg = "User tidak ditemukan";
  } else if (err.name === "passwordnotmatch") {
    code = 400;
    msg = "Password tidak sama";
  } else if (err.name === "passwordnotfound") {
    code = 400;
    msg = "Password harus diisi";
  } else if (err.name === "mailnotfound") {
    code = 400;
    msg = "Email tidak boleh kosong";
  } else if (err.name === "usernotfound") {
    code = 404;
    msg = "Tidak dapat mendapatkan info user tersebut";
  } else if (err.name === "articlenotfound") {
    code = 404;
    msg = "Tidak dapat mendapatkan info artikel tersebut";
  } else if (err.name === "invalidformat") {
    code = 400;
    msg = "Format file tidak valid, masukkan format PDF/PNG/JPEG";
  } else if (err.name === "errorsendmail") {
    code = 401;
    msg = "Terjadi kesalahan, mohon coba beberapa saat lagi";
  } else if (err.name === "invalidotp") {
    code = 400;
    msg = "Kode OTP salah";
  } else if (err.name === "hasbeenliked") {
    code = 400;
    msg = "Komen sudah disukai";
  } else if (err.name === "alreadysubscribed") {
    code = 400;
    msg = "Anda sudah berlangganan newsletter kami";
  } else if (err.name === "filenotfound") {
    code = 400;
    msg = "Mohon unggah file yang dibutuhkan";
  } 

  res.status(code).json({
    message: msg,
  });
}

module.exports = errorHandler