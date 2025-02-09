import { BadgeProps } from '@/components/badge'

export const orderBadgeVariants: Record<Order['state'], BadgeProps['variant']> = {
  cancelled: 'destructive',
  delivered: 'warning',
  pending: 'default',
  ordered: 'info',
  withdrawn: 'success',
}
