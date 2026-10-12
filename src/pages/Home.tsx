import { Link } from 'react-router-dom'
import { posts } from '../lib/blog'

export default function Home() {
  const recent = posts.slice(0, 2)

  return (
    <div className="page">
      <section className="hero">
        <h1>hi, welcome in.</h1>
        <p>
          this is my personal corner of the internet. not a portfolio, not a
          product — just a space to think out loud and keep the things i care
          about.
        </p>
      </section>

      <section>
        <h2>recent writing</h2>
        <ul className="post-list">
          {recent.map((post) => (
            <li key={post.slug} className="post-card">
              <Link to={`/blog/${post.slug}`}>
                <span className="post-title">{post.title}</span>
              </Link>
              <span className="post-meta">
                {post.date} · {post.readingTime} min read
              </span>
            </li>
          ))}
        </ul>
        <Link to="/blog" className="more-link">
          all posts →
        </Link>
      </section>

      <section>
        <h2>elsewhere</h2>
        <p className="muted">
          find me on your favorite network, or just read the{' '}
          <Link to="/about">about page</Link> to know what this is all about.
        </p>
      </section>
    </div>
  )
}
