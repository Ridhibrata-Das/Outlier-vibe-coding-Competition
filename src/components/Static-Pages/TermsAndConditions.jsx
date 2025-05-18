"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })

const TermAndConditions = ({ t }) => {
    return (
        <Layout>
            <Breadcrumb title={t('t&c')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <div className="terms-content">
                                <h2>Terms and Conditions</h2>
                                <p>Last updated: {new Date().toLocaleDateString()}</p>

                                <h3>1. Introduction</h3>
                                <p>Welcome to Outlier Quiz Platform. These terms and conditions outline the rules and regulations for the use of our educational quiz application.</p>

                                <h3>2. Project Information</h3>
                                <p>This software is a vibe coded project for the Outlier vibe coding competition, focusing on the theme of EDUCATION. The platform features:</p>
                                <ul>
                                    <li>Interactive quiz interface</li>
                                    <li>End-of-quiz scoring system</li>
                                    <li>Retry options for better learning</li>
                                    <li>User-friendly design</li>
                                </ul>

                                <h3>3. User Responsibilities</h3>
                                <p>By using our platform, you agree to:</p>
                                <ul>
                                    <li>Provide accurate information</li>
                                    <li>Use the platform for educational purposes</li>
                                    <li>Respect other users and their privacy</li>
                                    <li>Not attempt to manipulate quiz results</li>
                                </ul>

                                <h3>4. Intellectual Property</h3>
                                <p>All content and materials available on the platform are the property of the developer and are protected by applicable copyright and trademark law.</p>

                                <h3>5. Contact Information</h3>
                                <p>
                                    For any questions regarding these terms, please contact:<br />
                                    <strong>Developer:</strong> Ridhibrata Das<br />
                                    <strong>Email:</strong> ridhibratadas@gmail.com<br />
                                    <strong>Phone:</strong> +91 9733557339<br />
                                    <strong>Location:</strong> Techno Main Salt Lake
                                </p>

                                <h3>6. Changes to Terms</h3>
                                <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withTranslation()(TermAndConditions)
