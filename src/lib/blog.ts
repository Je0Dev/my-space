export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
  readingTime: number
}

function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>
  content: string
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s]*[\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, string | string[]> = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (!key || rest.length === 0) continue
    const value = rest.join(':').trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key.trim()] = value
        .slice(1, -1)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    } else {
      data[key.trim()] = value.replace(/^["']|["']$/g, '')
    }
  }
  return { data, content: match[2] }
}

function extractExcerpt(content: string): string {
  const text = content
    .replace(/^#.*$/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  return text.length > 180 ? text.slice(0, 180).trimEnd() + '…' : text
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? '',
      tags: (data.tags as string[]) ?? [],
      excerpt: extractExcerpt(content),
      content,
      readingTime: readingTime(content),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
