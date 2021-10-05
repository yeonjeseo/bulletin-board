import jwt from "jsonwebtoken";
import User from "../models/User.js";
const SECRET_KET = "this is my secret key";

export const authMiddleware = async (req, res, next) => {
  // get authorization from header
  const { authorization } = req.headers;

  // split auth type / auth value
  const [tokenType, tokenValue] = authorization.split(" ");

  // escape if token type is not Bearer
  if (tokenType !== "Bearer")
    return res.status(400).send({ msg: "로그인 후 사용하세요." });

  try {
    //decode token
    const { userId } = jwt.verify(tokenValue, SECRET_KET);
    const user = await User.findById(userId);
    //send user via res.locals
    res.locals.user = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "토큰 값이 없음. 로그인 후 사용하세요." });
  }
};
