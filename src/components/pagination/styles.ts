import tw from "tailwind-styled-components"


export const PaginationContainer = tw.ul`
    flex
    items-center
    justify-center
    gap-1
`

export const PaginationItem = tw.li`
    flex
    items-center
    justify-center
    hover:bg-accent
    hover:text-accent-foreground
    h-9 
    w-9 
    text-sm
    rounded-md
    cursor-pointer

    ${(p) => p.$isActive && `
    border
    border-input
    shadow-sm
    `
    }

    ${(p) => p.$disabled && `
    pointer-events-none
    opacity-50
    `
    }

    ${(p) => p.$isEllipsis && `
    pointer-events-none
    `
    }
`