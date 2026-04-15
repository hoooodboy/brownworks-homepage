'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const c = createCache({ key: 'em' })
    c.compat = true
    return c
  })

  useServerInsertedHTML(() => {
    const inserted = (cache as any).inserted as Record<string, string | boolean>
    if (!inserted) return null

    const names: string[] = []
    let styles = ''

    for (const [name, value] of Object.entries(inserted)) {
      if (typeof value === 'string') {
        names.push(name)
        styles += value
      }
    }

    if (!styles) return null

    for (const name of names) {
      delete inserted[name]
    }

    return (
      <style
        key="em"
        data-emotion={`em ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
