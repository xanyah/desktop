import { BadgeProps } from '@/components/badge'

export const shippingBadgeVariants: Record<Shipping['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  pending: 'default',
  validated: 'success',
}
