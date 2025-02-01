import { BadgeProps } from "@/components/ui/badge";
import { head, split } from "lodash";

export const orderBadgeVariants: Record<Order['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  delivered: 'default',
  pending: 'default',
  ordered: 'default',
  withdrawn: 'secondary'
}
