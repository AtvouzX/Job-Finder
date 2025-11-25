import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold">404 - Not Found</h1>
      <p className="mt-2 text-muted-foreground">Page not found.</p>
      <Link to="/" className="text-primary mt-3 inline-block">Back home</Link>
    </main>
  )
}
