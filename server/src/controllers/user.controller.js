const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ttm@2010";

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    let errors = [];

    if (!userName || !password) {
      errors.push({ message: "Please enter all fields!" });
    }
    if (password.length < 8) {
      errors.push({ message: "Invalid username or password!" });
    }

    if (errors.length > 0) {
      return res.json({ status: "Error", message: errors[0].message });
    } else {
      const user = await db.query("SELECT * FROM users WHERE userName = $1", [
        userName,
      ]);

      if (user.rows.length === 0) {
        return res.json({
          status: "Error",
          message: "Invalid username or password!",
        });
      }

      const checkPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!checkPassword) {
        return res.json({
          status: "Error",
          message: "Invalid username or password!",
        });
      }

      const userData = {
        id: user.rows[0].id,
        fullName: user.rows[0].fullname,
        email: user.rows[0].email,
        phoneNumber: user.rows[0].phonenumber,
      };

      const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({
        status: "Sucessful",
        message: "Logged in successfully",
        userData,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Error logging in", error: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Xóa cookie chứa token
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during logout" });
  }
};
const register = async (req, res) => {
  try {
    const { fullName, userName, email, password, repeatPassword, phoneNumber } =
      req.body;
    let errors = [];

    // Check validate
    if (!fullName || !userName || !email || !password || !repeatPassword) {
      errors.push({ message: "Please enter all required fields!" });
    }
    if (password.length < 8) {
      errors.push({ message: "Password must be at least 8 characters!" });
    }
    if (repeatPassword !== password)
      errors.push({ message: "The password does not match!" });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      const existedUser = await db.query(
        "SELECT * FROM users WHERE email = $1 OR userName = $2",
        [email, userName]
      );
      if (existedUser.rows.length > 0) {
        return res.json({
          status: "Error",
          message: "User already existed. Do you want to log in?",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedRepeatPassword = await bcrypt.hash(repeatPassword, 10);

        db.query(
          "INSERT INTO users (fullname, username, email, password, repeat_password, phonenumber) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            fullName,
            userName,
            email,
            hashedPassword,
            hashedRepeatPassword,
            phoneNumber,
          ]
        );
        return res.json({
          status: "Sucessful",
          message: "User registered sucessfully!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      message: "Error registering user",
    });
  }
};

module.exports = { login, logout, register };
