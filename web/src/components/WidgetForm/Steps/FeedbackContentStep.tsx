import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../lib/api'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../../Loading'
import { ScreenshotButton } from '../ScreenshotButton'

interface ReceivingFeedbackTypeStepProps {
  passingFeedbackType: FeedbackType
  passingRestartFeedback: () => void
  passingFeedbackSend: () => void
}

export function FeedbackContentStep({
  passingFeedbackType,
  passingRestartFeedback,
  passingFeedbackSend,
}: ReceivingFeedbackTypeStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[passingFeedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)

    console.log({
      screenshot,
      comment,
    })

    await api.post('/feedbacks', {
      type: passingFeedbackType,
      comment,
      screenshot,
    })

    setIsSendingFeedback(false)
    passingFeedbackSend()
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={passingRestartFeedback}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="
          min-w-[100px] w-full min-h-[112px] text-sm rounded-md resize-none
          placeholder-zinc-400 text-zinc100 border-zinc-600 bg-transparent
          focus:border-brand-500 focus:ring-1 focus:ring-brand-500
          focus:outline-none
          scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent
          scrollbar-thin
          "
          placeholder="
          Nos de um detalhes sobre o problema ou ideia que você está enfrentando
          "
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            gettingTheScreenshot={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="
            p-2 rounded flex-1 flex justify-center items-center text-sm
            border-transparent bg-brand-500 hover:bg-brand-300 
            focus:outline-none focus:ring-1 focus:ring-offset-2 
            focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500
            "
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
