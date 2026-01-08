import { Spinner } from '@heroui/react'

export default function LoadingScreen() {
  return (
      <Spinner className="text-foreground flex justify-center h-screen" label='Hang in there!!'  variant="wave" />
  )
}
