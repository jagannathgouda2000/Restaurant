const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emit } = require("../models/UploadFile");

const register = async (req, res) => {
  try {
    var { firstName, lastName, email, password } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      password?.length < 8
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    email = email.toLowerCase();
    const duplicate = await User.findOne({ email: email }).lean().exec();
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "User with this email id already exists" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const userObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      roleId: 2,
    };
    const user = await User.create(userObj);
    if (user) {
      res.status(201).json({ message: "User created " });
    } else {
      res.status(400).json({ message: "Invalid User data received" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.staus(400).json({ message: "All Fields are required" });
    }

    const foundOne = await User.findOne({
      $and: [{ email: email }, { isDeleted: false }, { roleId: 2 }],
    }).exec();

    if (!foundOne || !foundOne.isActive) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const match = await bcrypt.compare(password, foundOne.password);

    if (!match) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundOne.email,
          id: foundOne._id,
          roleId: foundOne.roleId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "cookie cleared" });
};

const userLogin = async (req, res) => {
  try {
    const { email, firstName } = req.body;
    if (!email || !firstName)
      return res.status(400).json({ message: "Email and name is required" });
    var user = await User.findOne({ email: email.toLowerCase() }).exec();
    if (!user) {
      userObj = {
        email: email,
        firstName: firstName,
        password: "India@123",
        roleId: 3,
      };
      user = await User.create(userObj);
      const accessToken = jwt.sign(
        {
          userInfo: {
            email: user.email,
            id: user._id,
            roleId: user.roleId,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  register,
  login,
  logout,
  userLogin,
};
