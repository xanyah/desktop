import { BadgeProps } from '@/components/ui/badge'

export const shippingBadgeVariants: Record<Shipping['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  pending: 'default',
  validated: 'secondary',
}
