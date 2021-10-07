import signUpSchema from "../validation/signupSchema.js";

export const validateSignUp = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    //회원가입 절차일때만 서로 포함하는지 확인
    if (username && confirmPassword) {
      // username, password 서로 포함 여부
      const isIncluded =
        username.includes(password) || password.includes(username);
      if (isIncluded)
        return res
          .status(406)
          .send({ msg: "Username 과 Password에 중복이 있습니다." });
    }

    const value = await signUpSchema.validateAsync({
      username,
      email,
      password,
      confirmPassword,
    });
    console.log(value);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "양식을 확인하세요." });
  }
};
