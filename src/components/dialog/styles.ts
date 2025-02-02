import tw from 'tailwind-styled-components'

export const Overlay = tw.div`
  fixed inset-0 z-50 bg-black/80
  flex items-center justify-center
`

export const Content = tw.div`
  relative bg-white p-6 w-full max-w-lg rounded-2xl shadow-lg
`

export const CloseButton = tw.button`
  absolute top-6 right-4 text-gray-500 hover:text-gray-800
`

export const Header = tw.div`
  text-lg font-semibold mb-4
`

export const Body = tw.div`
  mb-4 text-sm text-gray-700
`

export const Footer = tw.div`
  flex justify-end space-x-2 mt-8
`
