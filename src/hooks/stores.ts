import { useQuery } from "@tanstack/react-query";
import { getStores } from "../api";

export const useStores = (filters) => useQuery({
  queryKey: ['stores', filters],
  queryFn: () => getStores(filters)
})

export const useCurrentStore = () => {
  const {data} = useStores({})

  if (data?.data.length) {
    return data.data[0]
  }
}
