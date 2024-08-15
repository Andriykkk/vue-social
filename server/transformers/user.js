const userTransformer = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    handle: "@" + user.username,
  };
};

export { userTransformer };
