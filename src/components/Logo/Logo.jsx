"use client"
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import Image from "next/image";

const Logo = ({ image, setIsActive }) => {
    return (
        <div className="header-logo">
            <Link href="/" onClick={() => setIsActive && setIsActive(false)}>
                <div className="logo-container" style={{ width: '200px', height: '50px', position: 'relative' }}>
                    <Image
                        src={image || '/images/logo.svg'}
                        alt="QuizForge Logo"
                        width={200}
                        height={50}
                        priority
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>
            </Link>
        </div>
    );
};

Logo.propTypes = {
    image: PropTypes.string,
    setIsActive: PropTypes.func
};

export default Logo;
