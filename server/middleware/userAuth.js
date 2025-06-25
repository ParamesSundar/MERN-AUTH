import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({
        Success: false,
        message: "Not Authorized please login again",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.json({
        Success: false,
        message: "Not Authorized please login again",
      });
    }

    if (decodeToken.id) {
      req.body.userId = decodeToken.id;
    } else {
      return res.json({
        Success: false,
        message: "Not Authorized please login again",
      });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
