import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface ReceivingSetFeedbackTypeStepProps {
  passingPropsSetFeedbackType: (feedbackType: FeedbackType) => void
}

export function FeedbackTypeStep({
  passingPropsSetFeedbackType,
}: ReceivingSetFeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe o seu feedback</span>

        <CloseButton />
      </header>
      
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              type="button"
              onClick={() => passingPropsSetFeedbackType(key as FeedbackType)}
              className="
              py-4 w-24 flex-1 flex flex-col items-center gap-2 border-2
              border-transparent rounded-lg
              bg-zinc-800
              hover:border-brand-500 focus:border-brand-500 focus:outline-none
              "
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
