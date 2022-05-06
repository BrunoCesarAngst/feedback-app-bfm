import html2canvas from 'html2canvas'
import { Camera, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Loading } from '../Loading'

interface GettingTheScreenshotProps {
  screenshot: string | null
  gettingTheScreenshot: (screenshot: string | null) => void
}

export function ScreenshotButton({
  screenshot,
  gettingTheScreenshot,
}: GettingTheScreenshotProps) {
  const [isScreenshotReady, setIsScreenshotReady] = useState(false)

  async function handleTakeScreenshot() {
    setIsScreenshotReady(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = await canvas.toDataURL('image/png')

    gettingTheScreenshot(base64image)
    setIsScreenshotReady(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="
        p-1 w-10 rounded-md flex justify-end items-end
        border-transparent text-zinc-400 hover:text-zinc-100 transition-colors
        "
        onClick={() => gettingTheScreenshot(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="
      p-2 rounded-md
      border-transparent bg-zinc-800
      focus:outline-none focus:ring-1 focus:ring-offset-2 
      focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
      "
    >
      {isScreenshotReady ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}
