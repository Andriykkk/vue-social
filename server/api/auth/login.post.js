import prisma from "~/server/db";
import { getUserByUsername } from "~/server/db/users";
import { sendError } from "h3";
import bcrypt from "bcrypt";
import {
  generateTokens,
  sendRefreshToken,
} from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(event, {
      statusCode: 400,
      statusMessage: "All fields are required",
    });
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(event, {
      statusCode: 400,
      statusMessage: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compareSync(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return sendError(event, {
      statusCode: 400,
      statusMessage: "Invalid password",
    });
  }

  const { accessToken, refreshToken } =
    generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return { accessToken, user: userTransformer(user) };
});
