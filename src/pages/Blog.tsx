import { Link } from 'react-router-dom'
import { posts } from '../lib/blog'

export default function Blog() {
  return (
    <div className="page narrow">
      <h1>blog</h1>
      <p className="muted">notes, thoughts, and things worth keeping.</p>
      {posts.length === 0 ? (
        <p className="muted">nothing here yet — check back soon.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-card">
              <div className="post-card-text">
                <Link to={`/blog/${post.slug}`}>
                  <span className="post-title">{post.title}</span>
                </Link>
                <p className="post-excerpt">{post.excerpt}</p>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
