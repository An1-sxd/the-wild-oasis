// import { useQuery } from "@tanstack/react-query";
// import { getCurrentUser } from "../../services/apiAuth";

// function useUser() {
//   const { data: user, isPending: isGettingUser } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//   });

//   return { user, isGettingUser,isAuthenticated : user?.role === "authenticated" };
// }

// export default useUser;


import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {

  const { data: user, isPending: isGettingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    // refetchInterval: 100, // Poll every 5 seconds to check auth status
    refetchOnWindowFocus: true,
  });


  // console.log("useUser:", { user, isGettingUser, isAuthenticated: user?.role === "authenticated" });

  return {
    user,
    isGettingUser,
    isAuthenticated: user?.role === "authenticated",
  };
}

export default useUser;
