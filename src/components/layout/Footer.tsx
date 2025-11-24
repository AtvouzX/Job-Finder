export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} JobFinder — Built with Vite + React + TypeScript
      </div>
    </footer>
  )
}
