import { BadgeProps } from '@/components/badge'

export const orderBadgeVariants: Record<Order['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  delivered: 'default',
  pending: 'default',
  ordered: 'default',
  withdrawn: 'secondary',
}
