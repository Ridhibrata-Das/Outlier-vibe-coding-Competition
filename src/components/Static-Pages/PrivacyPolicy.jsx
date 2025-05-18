"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })
import { t } from 'i18next'

const PrivacyPolicy = () => {
    return (
        <Layout>
            <Breadcrumb title={t('privacy_policy')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <div className="privacy-content">
                                <h2>Privacy Policy</h2>
                                <p>Last updated: {new Date().toLocaleDateString()}</p>

                                <h3>1. Introduction</h3>
                                <p>This Privacy Policy describes how Outlier Quiz Platform ("we", "us", or "our") collects, uses, and shares your personal information when you use our educational quiz application.</p>

                                <h3>2. Information We Collect</h3>
                                <p>We collect the following types of information:</p>
                                <ul>
                                    <li>Account information (email, name)</li>
                                    <li>Quiz performance data</li>
                                    <li>Usage statistics</li>
                                </ul>

                                <h3>3. How We Use Your Information</h3>
                                <p>We use the collected information to:</p>
                                <ul>
                                    <li>Provide and improve our quiz services</li>
                                    <li>Track your progress and performance</li>
                                    <li>Send important updates about the platform</li>
                                </ul>

                                <h3>4. Contact Information</h3>
                                <p>
                                    For any privacy-related questions, please contact:<br />
                                    <strong>Developer:</strong> Ridhibrata Das<br />
                                    <strong>Email:</strong> ridhibratadas@gmail.com<br />
                                    <strong>Phone:</strong> +91 9733557339<br />
                                    <strong>Location:</strong> Techno Main Salt Lake
                                </p>

                                <h3>5. Data Security</h3>
                                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

                                <h3>6. Changes to This Policy</h3>
                                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withTranslation()(PrivacyPolicy)
