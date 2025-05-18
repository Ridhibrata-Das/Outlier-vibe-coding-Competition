"use client"
import React from 'react'
import { withTranslation } from 'react-i18next'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/Layout'), { ssr: false })

const ContactUs = ({ t }) => {
    return (
        <Layout>
            <Breadcrumb title={t('contact_us')} content="" contentTwo="" />
            <div className='Instruction'>
                <div className='container'>
                    <div className='row morphisam'>
                        <div className='col-12'>
                            <div className="contact-content">
                                <h2>Contact Us</h2>
                                <p>We'd love to hear from you! Feel free to reach out using any of the following methods:</p>
                                
                                <div className="contact-info">
                                    <h3>Developer Information</h3>
                                    <p>
                                        <strong>Name:</strong> Ridhibrata Das<br />
                                        <strong>Email:</strong> <a href="mailto:ridhibratadas@gmail.com">ridhibratadas@gmail.com</a><br />
                                        <strong>Phone:</strong> <a href="tel:+919733557339">+91 9733557339</a><br />
                                        <strong>Location:</strong> Techno Main Salt Lake
                                    </p>
                                </div>

                                <div className="project-info">
                                    <h3>About the Project</h3>
                                    <p>This quiz platform was developed as part of the Outlier vibe coding competition, focusing on the theme of EDUCATION. The application features:</p>
                                    <ul>
                                        <li>Interactive quiz interface</li>
                                        <li>End-of-quiz scoring system</li>
                                        <li>Retry options for better learning</li>
                                        <li>User-friendly design</li>
                                    </ul>
                                </div>

                                <div className="response-time">
                                    <h3>Response Time</h3>
                                    <p>We typically respond to all inquiries within 24-48 hours during business days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withTranslation()(ContactUs)
