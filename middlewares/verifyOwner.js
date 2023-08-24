const verifyOwner = async (req, res, next) => {
  try {
    if (req.userInfo && req.userInfo.roleId == 2) {
      next();
    } else {
      return res.status(400).json({ message: "Forbidden" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  verifyOwner,
};
