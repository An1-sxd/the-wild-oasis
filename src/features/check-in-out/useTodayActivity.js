import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const {
    data: activities,
    isPending: isLoadingActivities,
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  if (error) throw new Error(error.message);

  return { activities, isLoadingActivities };
}

export default useTodayActivity;
