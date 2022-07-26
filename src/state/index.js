import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

const useUserStore = create(
  devtools((set) => ({
    user: {
      isLogin: false,
      accountId: "",
      role: "",
      phone: "",
      jwt: "",
      fullName: "",
      avatar: "",
      userId: "",
      email: "",
      shortDescription: "",
      description: "",
    },
    userLogin: (usrInfo) =>
      set(
        produce((draft) => {
          draft.user.isLogin = true;
          draft.user.accountId = usrInfo.accountId;
          draft.user.role = usrInfo.role;
          draft.user.phone = usrInfo.phone;
          draft.user.jwt = usrInfo.jwt;
          draft.user.fullName = usrInfo.fullName;
          draft.user.avatar = usrInfo.avatar;
          draft.user.userId = usrInfo.userId;
          draft.user.email = usrInfo.email;
          draft.user.shortDescription = usrInfo.shortDesc;
          draft.user.description = usrInfo.desc;
        }),
      ),
    userLogout: () =>
      set(
        produce((draft) => {
          draft.user.isLogin = false;
          draft.user.accountId = "";
          draft.user.role = "";
          draft.user.phone = "";
          draft.user.jwt = "";
          draft.user.fullName = "";
          draft.user.avatar = "";
          draft.user.userId = "";
          draft.user.email = "";
          draft.user.shortDescription = "";
          draft.user.description = "";
        }),
      ),
  })),
);

export { useUserStore };
