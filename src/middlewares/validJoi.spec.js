import { isSignUp } from "./validJoi.js";

test("케이스 1 : 테스트 용도", async () => {
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
});

test("케이스 2 : username은 최소 3자, 최대 30자만 허용", async () => {
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      username: "12",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
  expect(
    await isSignUp({
      username:
        "12asdasdasdsadasdaskdjslakjfkldasjfglkjsadkgjasdkljfasjdflkjasdlkfjsakl",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
});

test("케이스 3 : username에는 알파벳 소문자, 대문자, 숫자만 허용한다.", async () => {
  expect(
    await isSignUp({
      username: "ABC12abc",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      username: "ABC12abc$",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
  expect(
    await isSignUp({
      username: " ABC12abca",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
});

test("케이스 4 : email의 @는 하나만 포함한다.", async () => {
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@@@@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
  expect(
    await isSignUp({
      username: "123asd",
      email: "emailemail.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
});
test("케이스 5 : email의 local part에는 특수 문자 중., -, _만 허용한다.", async () => {
  expect(
    await isSignUp({
      username: "123asd",
      email: ".e-ma_il@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      username: "123asd",
      email: "em#!ail@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
  expect(
    await isSignUp({
      username: "123asd",
      email: "...em!ail@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(false);
});
test("케이스 6 : password와 confirmPassword는 같아야 한다.", async () => {
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "1234",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      username: "123asd",
      email: "email@email.com",
      password: "1234",
      confirmPassword: "12s34",
    })
  ).toEqual(false);
});
