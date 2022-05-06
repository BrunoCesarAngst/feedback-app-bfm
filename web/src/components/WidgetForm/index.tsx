import { useState } from 'react'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Ícone de um inseto',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Ícone de uma lâmpada',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Ícone de uma nuvem de pensamentos',
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(props: any) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  function handleRestarFeedback() {
    setFeedbackSend(false)
    setFeedbackType(null)
  }

  return (
    <div
      className="
    bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center
    shadow-lg w-[calc(100vw-2rem)] md:w-auto
    "
    >
      {feedbackSend ? (
        <FeedbackSuccessStep passingRestartFeedback={handleRestarFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep passingPropsSetFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              passingFeedbackType={feedbackType}
              passingRestartFeedback={handleRestarFeedback}
              passingFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      )}

      <footer>
        Feito com ♥ por{' '}
        <a
          className="underline underline-offset-2"
          href="https://www.trabalhocomodev.com"
        >
          Bruno César Angst
        </a>
      </footer>
    </div>
  )
}
