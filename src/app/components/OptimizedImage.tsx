import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  // Determina a extensão do arquivo
  const extension = src.split('.').pop()?.toLowerCase()
  
  // Gera o srcSet para WebP se a imagem original não for SVG
  const srcSet = extension !== 'svg' ? [
    { src: src.replace(`.${extension}`, '.webp'), type: 'image/webp' },
    { src, type: `image/${extension}` }
  ] : undefined

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      quality={85}
      loading={props.priority ? 'eager' : 'lazy'}
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Adicione um placeholder blur
      placeholder="blur"
    />
  )
} 