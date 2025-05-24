"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { IconCloud } from "@/components/ui/icon-cloud"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const slugs = [
  "typescript", "javascript", "react", "tailwindcss", "docker", "git", "gitlab", "nodedotjs", "lucide", "npm", "pnpm", "deno"
]

const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
)

type MascotProps = {
  size?: number
  className?: string
}

export function Mascot({ size = 220, className = "" }: MascotProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"
  const handleLoad = () => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute  bottom-[140px] sm:-right-[120px] sm:-top-[60px] z-0 w-[380px] h-[380px] pointer-events-none">
        <IconCloud images={[...images,"/images/bun.svg","/images/nextjs.svg","/images/github.svg","/images/mdx.svg","/images/shadcn.svg"]} />
      </div>
      <div className="relative z-10 w-[300px] h-[380px] sm:w-[400px] sm:h-[500px]">
        {!isLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
        )}
        <Image
          src="/images/mascot.png"
          alt="Mascot Light"
          fill
          sizes="(max-width: 768px) 300px, 400px"
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          priority
        />
        <Image
          src="/images/mascot.png"
          alt="Mascot Dark"
          fill
          sizes="(max-width: 768px) 300px, 400px"
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          priority
        />
      </div>
    </div>
  )
}
