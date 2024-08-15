import formidable from "formidable";
import { createMediaFile } from "~/server/db/mediaFiles";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text[0],
    authorId: userId,
  };

  const replyToId = fields.replyTo[0];

  if (replyToId && replyToId !== "null") {
    tweetData.replyToId = replyToId;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(
    async (key) => {
      const file = files[key];
      const filePath = file[0].filepath;

      const cloudinaryResourse = await uploadToCloudinary(
        filePath
      );

      return createMediaFile({
        url: cloudinaryResourse.secure_url,
        providerPublicId: cloudinaryResourse.public_id,
        userId: userId,
        tweetId: tweet.id,
      });
    }
  );

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
