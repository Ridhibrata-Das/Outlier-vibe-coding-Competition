"use client"
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'
import { withTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { sysConfigdata } from 'src/store/reducers/settingsSlice'
import { getbookmarkApi } from 'src/store/actions/campaign'
import { useRouter } from 'next/navigation'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import Question from 'src/components/Common/Question'
import dynamic from 'next/dynamic'
import QuestionMiddleSectionOptions from 'src/components/view/common/QuestionMiddleSectionOptions'
import { showAnswerStatusClass } from 'src/utils'
import bookmarkPlayEnd from 'src/components/view/common/bookmark_play_end.json'
import Timer from 'src/components/Common/Timer'
import AudioQuestionsDashboard from 'src/components/Quiz/AudioQuestions/AudioQuestionsDashboard'
import GuessthewordQuestions from 'src/components/Quiz/Guesstheword/GuessthewordQuestions'
import ClientOnly from 'src/components/Common/ClientOnly'
const Layout = dynamic(() => import('src/components/Layout/Layout'), { ssr: false })
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

const BookmarkPlay = ({ t }) => {
  const navigate = useRouter()
  const bookmarkId = useSelector(state => state.Bookmark.bookmarkId)
  const [questions, setQuestions] = useState([{ id: '', isBookmarked: false }])
  const [showBackButton, setShowBackButton] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAns, setSelectedAns] = useState()
  const [delay, setDelay] = useState(false)
  const [error, setError] = useState(null)
  const systemconfig = useSelector(sysConfigdata)
  const child = useRef(null)
  const TIMER_SECONDS = parseInt(systemconfig.quiz_zone_duration) || 30

  useEffect(() => {
    getNewQuestions()
  }, [])

  // bookmark api
  const getNewQuestions = async () => {
    if (!bookmarkId) {
      setError('No bookmark selected. Please select a bookmark to play.')
      return
    }
    try {
      await getbookmarkApi({
        type: bookmarkId,
        onSuccess: response => {
          let questions = response.data.map(data => ({
            ...data,
            isBookmarked: false,
            selected_answer: '',
            isAnswered: false
          }))
          setQuestions(questions)
          if (!questions || questions.length === 0) {
            setError('No questions found for this bookmark.')
          }
        },
        onError: error => {
          setError('Failed to load questions. Please try again later.')
          toast.error(t('no_que_found'))
          console.log(error)
        }
      })
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.')
      console.error(err)
    }
  }

  const nextQuestion = () => {
    setTimeout(() => {
      setCurrentQuestion(currentQuestion)
      if (delay && questions.length === currentQuestion + 1) {
        setShowBackButton(true)
      }
    }, 500)
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1)
    }, 1000)
  }

  //answer option click
  const handleAnswerOptionClick = (selAns, score) => {
    nextQuestion()
    setSelectedAns(selAns)
    child.current && child.current.resetTimer()
  }

  const onTimerExpire = () => {
    nextQuestion()
    child.current && child.current.resetTimer()
  }

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 2000)
  }, [currentQuestion])

  //go back button
  const goBack = () => {
    navigate.push('/profile/bookmark')
  }
  // option answer click
  const setAnswerStatusClass = option => {
    if (selectedAns == option) {
      return "bg-theme"
    } else {
      return
    }
  }
  useEffect(() => {
    setAnswerStatusClass();
    return () => {
      setSelectedAns(false)
    }
  }, [currentQuestion]);
  const onQuestionEnd = async () => {
    setShowBackButton(true)
  }
  const handleAnswerOptionCli = (questions) => {
    setQuestions(questions)
  }
  return (
    <ClientOnly>
      <Layout>
        <Breadcrumb title={t('bookmark_play')} content="" contentTwo="" />
        <div className='dashboard'>
          <div className='container'>
            <div className='row morphisam'>
              <div className='whitebackground'>
                {error ? (
                  <div className='text-center text-danger' style={{ padding: 40 }}>
                    <h4>{error}</h4>
                    <button className='btn mt-3' onClick={() => navigate.push('/')}>{t('Back to Home')}</button>
                  </div>
                ) : (() => {
                  if (showBackButton) {
                    return (
                      <div className='dashoptions flex-column'>
                        <Lottie
                          loop
                          animationData={bookmarkPlayEnd}
                          play
                        />
                        <div className='resettimer'>
                          <button className='btn' onClick={goBack}>
                            {t('Back')}
                          </button>
                        </div>
                      </div>
                    )
                  } else {
                    return questions && questions?.length > 0 ? (<>
                      <div className="bookmark_que_index">
                        {currentQuestion + 1} - {questions?.length}
                      </div>
                      <div className='d-none'> <Timer ref={child} timerSeconds={TIMER_SECONDS} onTimerExpire={onTimerExpire} /></div>
                      {bookmarkId === '1' && <QuestionMiddleSectionOptions
                        questions={questions}
                        currentQuestion={currentQuestion}
                        setAnswerStatusClass={setAnswerStatusClass}
                        handleAnswerOptionClick={handleAnswerOptionClick}
                        probability={true}
                        onQuestionEnd={onQuestionEnd}
                        latex={true} />}
                      {bookmarkId === '3' && <GuessthewordQuestions
                        questions={questions}
                        timerSeconds={TIMER_SECONDS}
                        onOptionClick={handleAnswerOptionClick}
                        showQuestions={false}
                        showLifeLine={false}
                        onQuestionEnd={onQuestionEnd}
                        isBookmarkPlay={true}
                      />}
                      {bookmarkId === '4' && <AudioQuestionsDashboard
                        questions={questions}
                        timerSeconds={TIMER_SECONDS}
                        onOptionClick={handleAnswerOptionClick}
                        isBookmarkPlay={true}
                        onQuestionEnd={onQuestionEnd}
                      />}
                    </>) : (
                      <div className='text-center text-white'>
                        <Skeleton count={5} />
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ClientOnly>
  )
}
export default withTranslation()(BookmarkPlay)
