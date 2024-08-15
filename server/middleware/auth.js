import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { sendError } from "h3";
import { getUserById } from "../db/users";

export default defineEventHandler(async (event) => {
  const endpoints = [
    "/api/auth/user",
    "/api/user/tweets",
    "/api/tweets",
    "/api/tweets/:id",
  ];

  const isHandledByThisMiddleware = endpoints.some(
    (endpoint) => {
      const pattern = new UrlPattern(endpoint);

      return pattern.match(event.path);
    }
  );

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token =
    event.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(event, {
      statusCode: 401,
      statusMessage: "Unauthorised",
    });
  }

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);

    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
