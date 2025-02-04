import { variants } from './config'
import { StyledBadge } from './styles'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants
}

function Badge({ variant = 'default', ...props }: BadgeProps) {
  return <StyledBadge $variantStyle={variants[variant]} {...props} />
}

export default Badge
