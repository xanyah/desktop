import tw from 'tailwind-styled-components'

export const ImageContainer = tw.div`
  flex flex-col justify-center gap-3 border border-gray-100 p-4 rounded-md
`
export const ImagePreview = tw.img`
  w-30 h-30 object-cover rounded-md
`
export const FileListWrapper = tw.div`
  mt-4 flex flex-wrap gap-2
`
export const HintText = tw.p`
  text-small
`
