import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const config = useRuntimeConfig();

  return jwt.sign(
    { userId: user.id },
    config.jwtAccessSecret,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user) => {
  const config = useRuntimeConfig();

  return jwt.sign(
    { userId: user.id },
    config.jwtRefreshSecret,
    { expiresIn: "10h" }
  );
};

export const decodeRefreshToken = (token) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    return null;
  }
};

export const decodeAccessToken = (token) => {
  const config = useRuntimeConfig();

  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    return null;
  }
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const sendRefreshToken = (event, token) => {
  setCookie(event, "refresh_token", token, {
    httpOnly: true,
    sameSite: "strict",
  });
};
