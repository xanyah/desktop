import React, { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'
import {
  BreadcrumbContainer,
  BreadcrumbItemWrapper,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './styles'

type BreadcrumbProps = {
  breadcrumb?: BreadCrumbElement[]
  separator?: React.ReactNode
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumb = [],
  separator = <ChevronRight />,
}) => (
  <BreadcrumbContainer aria-label="breadcrumb">
    <BreadcrumbList>
      <BreadcrumbItemWrapper className="hidden md:block">
        <BreadcrumbLink to="/">Accueil</BreadcrumbLink>
      </BreadcrumbItemWrapper>
      {breadcrumb.map(element => (
        <Fragment key={element.label}>
          <BreadcrumbSeparator className="hidden md:block">
            {separator}
          </BreadcrumbSeparator>
          <BreadcrumbItemWrapper>
            {element.url
              ? (
                  <BreadcrumbLink to={element.url}>{element.label}</BreadcrumbLink>
                )
              : (
                  <BreadcrumbPage>{element.label}</BreadcrumbPage>
                )}
          </BreadcrumbItemWrapper>
        </Fragment>
      ))}
    </BreadcrumbList>
  </BreadcrumbContainer>
)

export default Breadcrumb
