import { jwtDecode } from "jwt-decode";

export default () => {
  const useAuthToken = () =>
    useState("auth_token", () => null);
  const useAuthUser = () =>
    useState("auth_user", () => null);
  const useAuthLoading = () =>
    useState("auth_loading", () => true);

  const setToken = (token) => {
    const authToken = useAuthToken();
    authToken.value = token;
  };

  const setUser = (user) => {
    const authUser = useAuthUser();
    authUser.value = user;
  };

  const setIsAuthLoading = (loading) => {
    const authLoading = useAuthLoading();
    authLoading.value = loading;
  };

  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: { username, password },
        });

        setToken(data.accessToken);
        setUser(data.user);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.accessToken);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");

        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) {
      return;
    }

    const jwt = jwtDecode(authToken.value);

    const newRefreshTime = jwt.exp - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken();

        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setIsAuthLoading(false);
      }
    });
  };

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthLoading,
  };
};
