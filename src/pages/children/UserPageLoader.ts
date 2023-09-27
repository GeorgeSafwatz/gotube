import { QueryClient } from "@tanstack/react-query";
import { UserData } from "../../components/NavigationCPP/Profile";
import { json } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    const data = (await queryClient.ensureQueryData([
      "userData",
      uid,
    ])) as UserData;
    return data;
  } else {
    throw json({ message: "" }, { status: 403 });
  }
};
