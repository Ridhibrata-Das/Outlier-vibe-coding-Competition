'use client'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { withTranslation } from 'react-i18next'
import { sysConfigdata } from 'src/store/reducers/settingsSlice'
import { useSelector } from 'react-redux'
import { Loadbadgedata } from 'src/store/reducers/badgesSlice'
import { getuserbadgesApi, setBadgesApi } from 'src/store/actions/campaign'
import { websettingsData } from 'src/store/reducers/webSettings'
import { battleDataClear } from 'src/store/reducers/groupbattleSlice'
import { useRouter } from 'next/navigation'
import { t } from 'i18next'

import Breadcrumb from 'src/components/Common/Breadcrumb'

const AllQuiz = () => {
  const router = useRouter()
  const userData = useSelector(state => state.User)
  const systemconfig = useSelector(sysConfigdata)
  const websettingsdata = useSelector(websettingsData)

  // quiz feature image
  const quiz_zone_icon = websettingsdata?.quiz_zone_icon
  const true_false_icon = websettingsdata?.true_false_icon
  const self_challange_icon = websettingsdata?.self_challange_icon
  const guess_the_word_icon = websettingsdata?.guess_the_word_icon

  // data show
  const [data, setData] = useState([
    {
      id: 0,
      image: quiz_zone_icon,
      quizname: 'Quiz Zone',
      quizDesc: 'Select your favorite Zone to play',
      url: '/quiz-zone',
      quizzonehide: '1'
    },
    {
      id: 2,
      image: true_false_icon,
      quizname: 'True & False',
      quizDesc: 'Choice your answers',
      url: '/quiz-play/true-and-false-play',
      truefalsehide: '1'
    },
    {
      id: 4,
      image: guess_the_word_icon,
      quizname: 'Guess The Word',
      quizDesc: 'Fun vocabulary game',
      url: '/guess-the-word',
      guessthewordhide: '1'
    },
    {
      id: 5,
      image: self_challange_icon,
      quizname: "Self Challenge",
      quizDesc: 'Challenge Yourself',
      url: '/self-learning',
      selfchallengehide: '1'
    }
  ])

  // redirect to page
  const redirectdata = data => {
    const isAuthenticated = userData.token
    if (isAuthenticated === null) {
      router.push('/auth/login')
      toast.error('Please login first')
      return
    }
    if (!data.disabled) {
      router.push(data.url)
    }
  }

  // hide from system settings
  const checkDisabled = () => {
    const modes = [
      {
        configProperty: "quiz_zone_mode",
        dataProperty: "quizzonehide"
      },
      {
        configProperty: 'true_false_mode',
        dataProperty: 'truefalsehide'
      },
      {
        configProperty: 'self_challenge_mode',
        dataProperty: 'selfchallengehide'
      },
      {
        configProperty: 'guess_the_word_question',
        dataProperty: 'guessthewordhide'
      }
    ]

    const newData = data.filter(item => {
      for (const mode of modes) {
        if (item[mode.dataProperty] === '1' && systemconfig[mode.configProperty] === '0') {
          return false
        }
      }
      return true
    })

    setData(newData)
  }

  useEffect(() => {
    checkDisabled()
    // badges api call and load
    if (userData?.data) {
      getuserbadgesApi({
        onSuccess: (res) => {
          let data = res.data
          Loadbadgedata(data)
          // streak badge which handling from backend
          setBadgesApi(
            'streak',
            () => { },
            error => {
              console.log(error)
            }
          )
        },
        onError: (err) => {
          console.log(err)
        }
      })
    }
  }, [userData])

  useEffect(() => {
    // clear local storage points
    battleDataClear()
  }, [])

  return (
    <>
      <Breadcrumb showBreadcrumb={true} title={`${t('quiz')} ${t('play')}`} content={t('home')} contentTwo={`${t('quiz')} ${t('play')}`} />
      <div className='Quizzone my-5'>
        <div className='container'>
          {data?.length === 0 ? (
            <p className="text-center">{t("noquiz")} </p>
          ) : (
            <ul className='row justify-content-center'>
              {data.map(quiz => (
                <li
                  onClick={() => redirectdata(quiz)}
                  className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 small__div'
                  key={quiz.id}
                >
                  <div className='inner__Quizzone'>
                    {quiz.disabled ? (
                      <div className='card_disabled'>
                        <div className='card__icon'>
                          <img src={quiz.image} alt='icon' />
                        </div>
                        <div className='title__card'>
                          <h5 className='inner__title gameTitle'>{t(quiz.quizname)}</h5>
                          <span className='inner__desc gameDesc'>{t(quiz.quizDesc)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className='card'>
                        <div className='card__icon'>
                          <img src={quiz.image} alt='icon' />
                        </div>
                        <div className='title__card'>
                          <h5 className='inner__title gameTitle'>{t(quiz.quizname)}</h5>
                          <span className='inner__desc gameDesc'>{t(quiz.quizDesc)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default withTranslation()(AllQuiz)
