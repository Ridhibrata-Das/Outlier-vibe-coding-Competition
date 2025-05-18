"use client"
import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { sysConfigdata } from "src/store/reducers/settingsSlice";
import { websettingsData } from "src/store/reducers/webSettings";
import Link from "next/link";
import { t } from "i18next";

const Footer = () => {
    const systemconfig = useSelector(sysConfigdata)
    const websettingsdata = useSelector(websettingsData);

    // footer logo
    const footer_logo = websettingsdata && websettingsdata.footer_logo;

    // company text
    const company_text = "Outlier project - A modern quiz platform";

    // web link
    const web_link_footer = websettingsdata && websettingsdata.web_link_footer;

    return (
        <Fragment>
            <div className="footer_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3  col-12 footer_left">
                            <div className="footer_left_text">
                                <p>{company_text}</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3  col-12 footer_left_second">
                            <div className="footer_title">
                                <h4 className="footer_heading">{t("policy")}</h4>
                            </div>
                            <ul className="footer_policy">
                                <li className="footer_list">
                                    <Link href="/privacy-policy">{t("privacy_policy")}</Link>
                                </li>
                                <li className="footer_list">
                                    <Link href="/terms-conditions">{t("t&c")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3  col-12 footer_right">
                            <div className="footer_title">
                                <h4 className="footer_heading">{t("company")}</h4>
                            </div>
                            <ul className="footer_policy">
                                <li className="footer_list">
                                    <Link href="/about-us">{t("about_us")}</Link>
                                </li>
                                <li className="footer_list">
                                    <Link href="/contact-us">{t("contact_us")}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <div className="footer_copyright text-center">
                        <p>
                            {t("copyright")} © {new Date().getFullYear()}
                            {" "}{t("made_by")}{" "}
                            <Link href={`${web_link_footer}`} target="_blank">
                                Ridhibrata Das
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withTranslation()(Footer);
