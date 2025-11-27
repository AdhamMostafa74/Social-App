import { Spinner } from '@heroui/react'

export default function LoadingScreen() {
  return (
      <Spinner className="text-foreground h-lvh flex justify-center" label='Hang in there!!'  variant="wave" />
  )
}
