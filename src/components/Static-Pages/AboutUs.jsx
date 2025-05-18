"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })

const AboutUs = ({ t }) => {
    return (
        <Layout>
            <Breadcrumb title={t('about_us')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <div className="about-content">
                                <h2>About Outlier Quiz Platform</h2>
                                <p>Welcome to our innovative quiz platform, developed as part of the Outlier vibe coding competition. This project focuses on revolutionizing the educational experience through interactive quizzes.</p>

                                <h3>Project Overview</h3>
                                <p>Our quiz application is designed to make learning engaging and fun. Key features include:</p>
                                <ul>
                                    <li>Interactive quiz interface</li>
                                    <li>Real-time score tracking</li>
                                    <li>Retry options for better learning</li>
                                    <li>Comprehensive feedback system</li>
                                </ul>

                                <h3>Contact Information</h3>
                                <p>
                                    <strong>Developer:</strong> Ridhibrata Das<br />
                                    <strong>Email:</strong> ridhibratadas@gmail.com<br />
                                    <strong>Phone:</strong> +91 9733557339<br />
                                    <strong>Location:</strong> Techno Main Salt Lake
                                </p>

                                <h3>Our Mission</h3>
                                <p>We are committed to enhancing the educational experience through technology. Our quiz platform aims to make learning more accessible, engaging, and effective for students worldwide.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withTranslation()(AboutUs)
