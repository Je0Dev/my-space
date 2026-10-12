import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { getPost } from '../lib/blog'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div className="page narrow">
        <h1>post not found</h1>
        <p className="muted">this page doesn't exist (anymore?).</p>
        <Link to="/blog" className="more-link">
          ← back to blog
        </Link>
      </div>
    )
  }

  return (
    <article className="page narrow post">
      <Link to="/blog" className="more-link">
        ← back to blog
      </Link>
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta-row">
          <span className="post-meta">
            {post.date} · {post.readingTime} min read
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>
      <Markdown>{post.content}</Markdown>
    </article>
  )
}
