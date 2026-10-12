import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page narrow not-found">
      <h1>404</h1>
      <p>this page wandered off. let's get you back.</p>
      <Link to="/" className="more-link">
        ← back home
      </Link>
    </div>
  )
}
