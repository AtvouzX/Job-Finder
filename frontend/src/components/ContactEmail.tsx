import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

interface ContactEmailProps {
  email: string
  className?: string
}

export function ContactEmail({ email, className }: ContactEmailProps) {
  const handleContact = () => {
    window.open(`mailto:${email}`, '_blank')
  }

  return (
    <Button
      onClick={handleContact}
      variant="outline"
      size="sm"
      className={className}
    >
      <Mail className="h-4 w-4 mr-2" />
      Contact
    </Button>
  )
}