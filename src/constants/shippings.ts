import { BadgeProps } from "@/components/ui/badge";
import { head, split } from "lodash";

export const shippingBadgeVariants: Record<Shipping['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  pending: 'default',
  validated: 'secondary'
}
