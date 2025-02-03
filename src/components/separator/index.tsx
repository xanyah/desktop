import { StyledSeparator } from './styles'

interface Props {
  orientation?: 'vertical' | 'horizontal'
  classname?: string
}

const Separator = ({ orientation = 'horizontal', classname }: Props) => (
  <StyledSeparator $classname={classname} $orientation={orientation} />
)

export default Separator
