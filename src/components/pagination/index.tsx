import { each, map, range } from 'lodash'
import { Fragment } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { PaginationContainer, PaginationItem } from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null
  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1)
  const handleNext = () =>
    currentPage < totalPages && onPageChange(currentPage + 1)

  const getPageNumbers = () => {
    const pages = [1]

    if (currentPage > 3) pages.push(-1)

    each(
      range(
        Math.max(2, currentPage - 1),
        Math.min(totalPages, currentPage + 2)
      ),
      (i) => pages.push(i)
    )

    if (currentPage < totalPages - 2) pages.push(-1)

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <PaginationContainer>
      <PaginationItem onClick={handlePrevious} $disabled={currentPage === 1}>
        <ChevronLeft />
      </PaginationItem>

      {map(getPageNumbers(), (page, index) => (
        <Fragment key={index}>
          {page === -1 ? (
            <PaginationItem $isEllipsis>
              <MoreHorizontal />
            </PaginationItem>
          ) : (
            <PaginationItem
              $isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationItem>
          )}
        </Fragment>
      ))}
      <PaginationItem
        onClick={handleNext}
        $disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </PaginationItem>
    </PaginationContainer>
  )
}

export default Pagination
