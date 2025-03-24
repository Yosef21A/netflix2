import React, { useEffect, useState } from 'react';
import { getLoginRoute } from '../../utils/routes';
import { useHistory } from "react-router-dom";
import './home.css'
const Home = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const htmlContent = `<div id="appMountPoint">
           <div>
              <div class="basicLayout">
                 <div class="dng6nvr8sc-sans-font-loaded">
                    <div data-uia="loc" lang="en" dir="ltr">
                       <div class="default-ltr-cache-bb2aon e1n63bt35">
                          <div class="default-ltr-cache-lol706">
                             <div class="default-ltr-cache-1hwdibi"></div>
                             <div class="default-ltr-cache-1l8wovt"></div>
                             <div class="default-ltr-cache-swstpr"></div>
                          </div>
                          <div class="default-ltr-cache-u6v8er e1n63bt32">
                             <div class="default-ltr-cache-pw7jst">
                                 <div class="default-ltr-cache-gqph8c">
                                   <div class="default-ltr-cache-180snrw e1r6dvsr3">
                                      <div class="default-ltr-cache-nhagh8">
                                         <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-13ofoyb" dir="ltr" data-uia="header">
<header
  data-layout="container"
  data-uia="header+container"
  class="layout-container_styles__12wd1go1g"
  dir="ltr"
  style="
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    flex-wrap: nowrap;
    --_12wd1go0: flex-start !important;
    --_12wd1go3: flex-start !important;
    --_12wd1go2: row;
    --_12wd1go6: 0px;
    --_12wd1go5: 0px;
  "
>
                                               <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpi: auto; --zc08zpy: 0 auto; --zc08zp1g: 0 0 calc(41.66666666666667% - 16px); --zc08zp1y: 0 0 calc(33.333333333333336% - 16px); --zc08zp2g: 0 0 calc(33.333333333333336% - 16px); --zc08zp2y: 0 0 calc(33.333333333333336% - 16px); --zc08zp7: 0px;--zc08zpi: auto; margin-left: 0 !important; margin-right: auto !important; ">
                                                  <div class="default-ltr-cache-m0kkg6 e1r6dvsr1">
                                                     <svg class="n-logo-svg" focusable="false" viewBox="225 0 552 1000" aria-hidden="true" data-uia="n-logo">
                                                        <defs>
                                                           <radialGradient id=":r0:-a" r="75%" gradientTransform="matrix(.38 0 .5785 1 .02 0)">
                                                              <stop offset="60%" stop-opacity=".3"></stop>
                                                              <stop offset="90%" stop-opacity=".05"></stop>
                                                              <stop offset="100%" stop-opacity="0"></stop>
                                                           </radialGradient>
                                                        </defs>
                                                        <path d="M225 0v1000c60-8 138-14 198-17V0H225" fill="#b1060e"></path>
                                                        <path d="M579 0v983c71 3 131 9 198 17V0H579" fill="#b1060e"></path>
                                                        <path d="M225 0v200l198 600V557l151 426c76 3 136 9 203 17V800L579 200v240L423 0H225" fill="url(#:r0:-a)"></path>
                                                        <path d="M225 0l349 983c76 3 136 9 203 17L423 0H225" fill="#e50914"></path>
                                                     </svg>
                                                  </div>
                                                  <div class="default-ltr-cache-h2twoy e1r6dvsr0">
                                                     <span class="default-ltr-cache-1nbd95x-HeaderLogo ev1dnif0" data-uia="nmhp-card-header+logo">
                                                        <svg viewBox="0 0 111 30" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="default-ltr-cache-6dfzkw-StyledBrandLogo ev1dnif2">
                                                           <g>
                                                              <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
                                                           </g>
                                                        </svg>
                                                     </span>
                                                  </div>
                                               </div>
                                               <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpi: auto; --zc08zpy: 0 auto; --zc08zp1g: 0 0 calc(58.333333333333336% - 16px); --zc08zp1y: 0 0 calc(66.66666666666667% - 16px); --zc08zp2g: 0 0 calc(66.66666666666667% - 16px); --zc08zp2y: 0 0 calc(66.66666666666667% - 16px); --zc08zpc: flex-end; --zc08zp7: 0px;">
                                                  <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-1u8qly9" dir="ltr">
                                                     <div data-layout="container" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go1: 12px; --_12wd1go2: row; --_12wd1go3: flex-end; --_12wd1go5: 3px; --_12wd1go6: 0px; --_12wd1go7: calc(100% + 12px);">
                                                        <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: auto; --zc08zpg: 0 auto; --zc08zp7: 0px;">
                                                           <span class="default-ltr-cache-e3utex e1r6dvsr2">
                                                              <label for=":r1:" class="default-ltr-cache-1wk531c-StyledLabel e1emcujf0">Select Language</label>
                                                              <div class="form-control_containerStyles__oy4jpq0  default-ltr-cache-8i4cyz-addSharedFormControlStyles-styles-addTextFormControlStyles-styles-addSelectStyles-styles e1jlx6kl1" data-uia="language-picker-header+container" dir="ltr">
                                                                 <span dir="ltr" data-uia="language-picker-header+label" class="form-control_labelStyles__oy4jpq5 screen-reader-only_screenReaderOnly__h8djxf0"></span>
                                                                 <div class="form-control_controlWrapperStyles__oy4jpq1" dir="ltr">
                                                                    <div role="img" aria-hidden="true" class="default-ltr-cache-1tzvs44-StyledIcon e1vkmu651">
                                                                       <svg fill="none" role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="LanguagesSmall" aria-hidden="true">
                                                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor"></path>
                                                                       </svg>
                                                                    </div>
                                                                    <select class="select_nativeElementStyles__1ewemfi0" dir="ltr" id=":r1:" name="LanguageSelect" data-uia="language-picker-header">
                                                                        <option lang="en" label="English" value="en-TN">English</option>
                                                                        <option lang="fr" label="Français" value="fr-TN">Français</option>
                                                                        <option lang="ar" label="العربية" value="ar-TN">العربية</option>
                                                                    </select>
                                                                    <div aria-hidden="true" class="form-control_controlChromeStyles__oy4jpq4" dir="ltr">
                                                                       <svg fill="none" role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="CaretDownSmall" aria-hidden="true">
                                                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z" fill="currentColor"></path>
                                                                       </svg>
                                                                    </div>
                                                                 </div>
                                                              </div>
                                                           </span>
                                                        </div>
                                                        <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: auto; --zc08zpg: 0 auto; --zc08zp7: 0px;"><a class="pressable_styles__a6ynkg0 button_styles__1kwr4ym0  default-ltr-cache-1nmdfg2-StyledBaseButton e1ax5wel2" data-uia="header-login-link" dir="ltr" role="button">Sign In</a></div>
                                                     </div>
                                                  </div>
                                               </div>
                                            </header>
                                         </div>
                                      </div>
                                   </div>
                                 </div>
                             </div>
                             <div class="default-ltr-cache-1yc97eb e1n63bt34">
                                <div class="default-ltr-cache-11en623 e1n63bt33">
                                   <div class="default-ltr-cache-1rqw1gv">
                                      <div data-uia="nmhp-hero" class="default-ltr-cache-jbq1me ec5wt2e1">
                                         <div class="default-ltr-cache-s85dir e1oj033r0">
                                            <div class="default-ltr-cache-qa9grc">
                                               <div class="default-ltr-cache-zxlxvv">
                                                  <div class="default-ltr-cache-1uzlw0y">
                                                     <div class="default-ltr-cache-yxgczw">
                                                        <div data-uia="hero-content-card-vlv" class="default-ltr-cache-1yelhn">
                                                           <div dir="ltr" class="default-ltr-cache-mm0428 excsaj90"></div>
                                                           <img id="hBnnr63" alt="" aria-hidden="true" class="default-ltr-cache-1e28eon">
                                                        </div>
                                                     </div>
                                                  </div>
                                               </div>
                                            </div>
                                            <div class="default-ltr-cache-1wmy9hl">
                                               <div class="default-ltr-cache-ba5wh8">
                                                  <div class="default-ltr-cache-1d3w5wq">
                                                     <div class="default-ltr-cache-yzbnln ec5wt2e0">
                                                        <div class="default-ltr-cache-14yiwfv">
                                                           <div>
                                                              <h1 class=" default-ltr-cache-dxnjii-StyledContainer euy28770"><span>Unlimited movies, TV shows, and more</span></h1>
                                                              <p class=" default-ltr-cache-s21t19-StyledContainer euy28770">Starts at USD&nbsp;3.99. Cancel anytime.</p>
                                                           </div>
                                                        </div>
                                                        <div class="default-ltr-cache-1waa87s">
                                                           <div class="default-ltr-cache-inkrn ev126k32">
                                                              <form data-uia="email-form" class=" default-ltr-cache-1u8qly9">
                                                                 <h3 class="default-ltr-cache-1arr3vy ev126k31">Ready to watch? Enter your email to create or restart your membership.</h3>
                                                                 <div data-issplitform="true" data-hasmessage="false" class="default-ltr-cache-1jbflut ev126k30">
                                                                    <div class="form-control_containerStyles__oy4jpq0  default-ltr-cache-1bnfheg-addSharedFormControlStyles-styles-addTextFormControlStyles-styles-addInputStyles-styles e2so2tu1" data-uia="field-email+container" dir="ltr">
                                                                       <label dir="ltr" data-uia="field-email+label" class="form-control_labelStyles__oy4jpq5" >Email address</label>
                                                                       <div class="form-control_controlWrapperStyles__oy4jpq1" dir="ltr">
                                                                          <input minlength="5" maxlength="50" type="email" class="input_nativeElementStyles__1euouia0" dir="ltr" data-uia="field-email" value="">
                                                                          <div aria-hidden="true" class="form-control_controlChromeStyles__oy4jpq4" dir="ltr"></div>
                                                                       </div>
                                                                    </div>
                                                                    <button class="pressable_styles__a6ynkg0 button_styles__1kwr4ym0  default-ltr-cache-rhkiuy-StyledBaseButton e1ax5wel2" data-uia="nmhp-card-cta+hero_card" dir="ltr" role="button" >
                                                                       Get Started
                                                                       <div aria-hidden="true" class="default-ltr-cache-1i1oito-StyledIconWrapper e1ax5wel0">
                                                                          <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronRightStandard" aria-hidden="true">
                                                                             <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path>
                                                                          </svg>
                                                                       </div>
                                                                    </button>
                                                                 </div>
                                                              </form>
                                                           </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                               </div>
                                            </div>
                                         </div>
                                         <div></div>
                                      </div>
                                   </div>
                                   <div data-uia="nmhp-top-10" id="nmhp-popular-now" class="default-ltr-cache-ppqefh e16alzcy0">
                                      <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-1u8qly9" dir="ltr">
                                         <div data-layout="container" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go1: 0px; --_12wd1goa: column; --_12wd1goi: column; --_12wd1goq: row; --_12wd1goy: row; --_12wd1go16: row; --_12wd1gob: flex-start; --_12wd1goj: flex-start; --_12wd1gor: space-between; --_12wd1goz: space-between; --_12wd1go17: space-between; --_12wd1go5: 0px; --_12wd1go6: 0px; --_12wd1go7: 100%;">
                                            <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpi: fit-content; --zc08zp10: fit-content; --zc08zp1i: auto; --zc08zp20: auto; --zc08zp2i: auto; --zc08zpd: center; --zc08zp7: 0px;">
                                               <h2 class=" default-ltr-cache-runro8-StyledContainer euy28770">Trending Now</h2>
                                            </div>
                                         </div>
                                      </div>
                                      <div class="default-ltr-cache-f4tbno e48k2nr0">
                                         <div class="default-ltr-cache-ut53x9">
                                            <div></div>
                                            <div class="default-ltr-cache-wndz1u e3wxz1p0">
                                               <ul class="default-ltr-cache-r1prx9">
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-1" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 0ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABac_UlZOLB9qMB2JMKWCMKSU2cjALiEs6Y2xPhL4SqFByoM9t3owJay9rC41-mqsBFrB_9EDXa7sNvD_4wn3Sb2ikkFAyswd2knpFi2IhKrxC8Pr5RcD9nRn1zOTPdZUcEyJIP1t1FwBWfeT_1GU9Ac07cZhMpei2dK7j_uit2skqlpl8rbPPhIfmH36gt5piqCMr4PA7-_XNk-d.webp?r=08e&quot;);"></span>Revelations
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">1</span><span aria-hidden="true" data-content="1" class="default-ltr-cache-1t967ao e120xqm81">1</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-2" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 400ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABTCQn6atpU2mkRAx0kxddnB0yBt8NfIMffOgouHRkCOjK9DhEouqBQjRU75WVsmqo3dDFXc9CFC04uPZD2YTZInm9jAPpCp9fWgtWjSkoQMYMPhJJ6LYJJFGSdE65H0YK6wPcEOBlgFG1KSJ9pGdvXVtj5Jyi8h_q-3n-UhXNcqNi72_zWNzETddKcNNukKFoTZmco4MwVOP33X4.webp?r=1b5&quot;);"></span>Little Siberia
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">2</span><span aria-hidden="true" data-content="2" class="default-ltr-cache-1t967ao e120xqm81">2</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-3" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 800ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABZdvdU3cWZdPNFzhaj2A2ElJ57A-CIEpmHl09yinemnSuA0aYXYd-RelFtigaPaTrsLWwXLoZSaO3LF8F64-0xtSf3WCPCDamlD2gHDgABRVJ96OdHbgLBKjs27fcRH1YkfvI7Q9Twkr1Gfm0iKp9flcm1Be6-rd3wvUK6EFWXASfU2WJaO_9jw8A0Vfe-M0weylMFA-KNN_YmQoS2HdMdq_9kbg7MsUNEk2gw.webp?r=dd4&quot;);"></span>Go!
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">3</span><span aria-hidden="true" data-content="3" class="default-ltr-cache-1t967ao e120xqm81">3</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-4" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 1200ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABRle22NBlr0-IcROZhzASPWgK_S2e-WAG5jx-Jcp_kzDmdK39dWulrS9eo2KBNYGmVxmKCh2voDOVZo3W9C2d5byh5ezBwfQpE33HkvxiAsQfalj2h-UONU46-SthdlEAlQ3rhcEYmynsJe8Kaca9O3TQQkwOm4_1U5VlDPpW-dc94mMpWUoe2pFsNTYuMjVU9C9Ku8sH35WlaC5.webp?r=127&quot;);"></span>Squid Game
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">4</span><span aria-hidden="true" data-content="4" class="default-ltr-cache-1t967ao e120xqm81">4</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-5" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 1600ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABYp1CKVA9jX8vsqmJpzBjOAS4CgAmKfsKtTIUCRh2jz3CYuA6K-CYC8WJfdosjFUCysnUW7V7OZKXWst9Uiyg1B_4cPkas4_GknzEyyzI9UHhzQUV9GOGK11BNAffhKsaLN9pGI5EsH81huHYsbt56wistWCM8lCvmm0Ilc0i1MR4m_eeqy02OwsngwCzCc7vTAww6Mma5D7TDJ4.webp?r=60a&quot;);"></span>High Tides
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">5</span><span aria-hidden="true" data-content="5" class="default-ltr-cache-1t967ao e120xqm81">5</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-6" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 2000ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABd3aLwghgCcTfYGqeyZPGlQfXZzT8ahF2OWc3MsCxlboVfHx_3Tzfso9p6sCXCnSfPV9xCmhJg6LYYtG5FTmoiy4d3jzm0Yt4ULjSO2tEa12RhAUrrKsrJHPtMQe-KdaFaL8SeTfHPk-wpV6d9q5PPaV8w83OlYn-Wi5xFuqOtmmJa9dmsY8-xBFqhBs5yDwSqNGpf-l_Fe4S06s.webp?r=48b&quot;);"></span>Adolescence
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">6</span><span aria-hidden="true" data-content="6" class="default-ltr-cache-1t967ao e120xqm81">6</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-7" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 2400ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABRoSblYgB8qVfBZ0DSirjZoVpejbUfoNO4quHXAhwXd8VuAyR5YEovV42DhmX0uT6nU32-v8HNaic5an_To7eFmLuksKtzGouK-Ss4-kAHLu8ytrhYuabfFBNefhLJgEQwNBMhUnpPqF8OmBkRaf6Iw8nKt07l3uTcqu8JpjGBlduSE03YhG12f9yB5vysJoO23knUV0Ur1Ekm4J.webp?r=63b&quot;);"></span>Zero Day
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">7</span><span aria-hidden="true" data-content="7" class="default-ltr-cache-1t967ao e120xqm81">7</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-8" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 2800ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABeYkC5uR1ol-OxBLrr3wt9DLrJsCYc5gjbRcPb0nalOsTg-xsBPD-kdAknvtx0OojylhzsCBsXFZuAYcL5jNDXRVfRgGjsoBSCp3pPVNz3RKojjABMYgZLaApaYaV1ImT_ZhTJGiHLoHU-7YR4yh0IcihVzEkHS7YWyG40uWDiaePbHquK-n_NFeY1G9ZuUk8-66fp74Qa-XA64L.webp?r=3a5&quot;);"></span>Back in Action
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">8</span><span aria-hidden="true" data-content="8" class="default-ltr-cache-1t967ao e120xqm81">8</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-9" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 3200ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABdn3UTsrOr67wxmsMP9tKqS65rPJ5hGwPtSlpaYDRsq_94TtZSU3Ct792pm2ZIIabD6ztThnxCNyhe2oiVl-nK0RCXG6qedcPfHIcjNPf5SMqMc6sJMJuGfBlrO5a13bxwPdcgUQsTdzipXoJLFslDmGk4sEeCW2qSbmHL9wod9YKY31aBWZUpnXzgdU2W9lzOTDcpc-Ipjp3tPrsA28fwUxQ7_JeU2X-6BSKA.webp?r=eab&quot;);"></span>SAKAMOTO DAYS
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">9</span><span aria-hidden="true" data-content="9" class="default-ltr-cache-1t967ao e120xqm81">9</span></span></span>
                                                     </button>
                                                  </li>
                                                  <li class="default-ltr-cache-j80ayg e19salz15">
                                                     <button data-uia="top-10-element-10" class="default-ltr-cache-1cgg5zt e19salz14">
                                                        <div class="default-ltr-cache-14xf8il e19salz11">
                                                           <div class="default-ltr-cache-v2hnxp e19salz10" style="animation-delay: 3600ms;"></div>
                                                           <span class="default-ltr-cache-kpkn1j e19salz13" style="background-image: url(&quot;https://occ-0-7199-778.1.nflxso.net/dnm/api/v6/-klpX4b1RECP-oGX3Uvz90PrgHE/AAAABRSx64R9el7Ypkg979SvIlNrJ5RGXmIYcuuLCDz_sGvifuEAk3cdDba_JYTFUpOEPonvLnJuqaoDP9mxExh1UVhVkuIbN_1xNcBz5swLrS3mgHs72NgoR10IQL5biFknXwJ55HTqjooKAK1mzoSi.webp?r=d0b&quot;);"></span>Crawl
                                                        </div>
                                                        <span class="default-ltr-cache-8ri1bb e19salz12"><span class="default-ltr-cache-bjn8wh e120xqm80"><span class="default-ltr-cache-5ur8x ef2em440">10</span><span aria-hidden="true" data-content="10" class="default-ltr-cache-1t967ao e120xqm81">10</span></span></span>
                                                     </button>
                                                  </li>
                                               </ul>
                                            </div>
                                            <div>
                                               <div aria-hidden="true" class="default-ltr-cache-yt7318 efurhs40">
                                                  <button aria-label="Next" class="default-ltr-cache-afh1q5">
                                                     <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronRightStandard" aria-hidden="true">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path>
                                                     </svg>
                                                  </button>
                                               </div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                   <div class="default-ltr-cache-ppqefh e16alzcy0">
                                      <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-1u8qly9" dir="ltr" data-uia="nmhp-full-value-props">
                                         <div data-layout="container" data-uia="nmhp-full-value-props+container" id="nmhp-full-value-props" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go1: 0px; --_12wd1go2: column; --_12wd1go5: 0px; --_12wd1go6: 0.75rem; --_12wd1go7: 100%;">
                                            <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: calc(100% - 0px); --zc08zp7: 0px;">
                                               <h2 class=" default-ltr-cache-runro8-StyledContainer euy28770">More Reasons to Join</h2>
                                            </div>
                                            <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-1u8qly9" dir="ltr">
                                               <div data-layout="container" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go9: 0.5rem; --_12wd1goh: 0.5rem; --_12wd1gop: 0.5rem; --_12wd1gox: 0.75rem; --_12wd1go15: 0.75rem; --_12wd1go2: row; --_12wd1go5: 0px; --_12wd1go6: 0.5rem; --_12wd1gof: calc(100% + 0.5rem); --_12wd1gon: calc(100% + 0.5rem); --_12wd1gov: calc(100% + 0.5rem); --_12wd1go13: calc(100% + 0.75rem); --_12wd1go1b: calc(100% + 0.75rem);">
                                                  <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.5rem); --zc08zp1g: 0 0 calc(100% - 0.5rem); --zc08zp1y: 0 0 calc(25% - 0.5rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;">
                                                     <div dir="ltr" class="default-ltr-cache-1gmij0e e1clszgk1">
                                                        <div class="default-ltr-cache-1qiom49 e1uxr1bk2">
                                                           <div class="default-ltr-cache-sjuqs8 e1uxr1bk1">
                                                              <h3 class=" default-ltr-cache-qxy2tb-StyledContainer euy28770">Cancel or switch plans anytime</h3>
                                                           </div>
                                                           <div class="default-ltr-cache-j1gq6j e1uxr1bk0">
                                                              <div class="default-ltr-cache-107fr8n">
                                                                 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                                                                    <g id="handshake-core-small">
                                                                       <path id="Vector" d="M17.317 43.9409C18.0947 44.9703 20.4911 44.4707 22.6696 42.825C24.8481 41.1793 25.9837 39.0106 25.206 37.9812C24.4283 36.9517 22.0318 37.4513 19.8533 39.097C17.6749 40.7428 16.5393 42.9114 17.317 43.9409Z" fill="url(#paint0_radial_5239_3942)"></path>
                                                                       <path id="Vector_2" d="M18.8049 48.7717C19.704 49.9619 22.7084 49.2076 25.5155 47.087C28.3225 44.9664 29.8693 42.2826 28.9702 41.0924C28.0711 39.9023 25.0667 40.6566 22.2596 42.7772C19.4525 44.8977 17.9058 47.5816 18.8049 48.7717Z" fill="url(#paint1_radial_5239_3942)"></path>
                                                                       <path id="Vector_3" d="M22.4752 52.5183C23.4919 53.8641 26.5916 53.2359 29.3987 51.1153C32.2057 48.9948 33.6572 46.1848 32.6406 44.839C31.6239 43.4933 28.5242 44.1214 25.7171 46.242C22.9101 48.3626 21.4586 51.1726 22.4752 52.5183Z" fill="url(#paint2_radial_5239_3942)"></path>
                                                                       <path id="Vector_4" d="M32.5112 54.029C30.3395 55.6696 27.7244 55.8685 27.1547 55.1144C26.5851 54.3603 27.4912 51.8992 29.6629 50.2586C31.8347 48.6179 34.2328 48.132 35.0194 49.1731C35.8059 50.2143 34.683 52.3883 32.5112 54.029Z" fill="url(#paint3_radial_5239_3942)"></path>
                                                                       <path id="Vector_5" d="M28.7527 25.1661L24.706 30.4771C24.3681 30.9205 24.2513 31.4918 24.4079 32.0269C26.2275 38.2456 31.0854 49.3899 38.8215 49.9268C46.9232 50.4892 52.9121 46.876 54.8938 44.9992L63.5999 47.401C65.0999 43.801 65.0999 35.701 63.5999 32.401L53.7596 33.8115L39.1375 23.9521C38.7881 23.7166 38.3672 23.611 37.9481 23.6539L30.0014 24.4664C29.5063 24.517 29.0543 24.7703 28.7527 25.1661Z" fill="url(#paint4_radial_5239_3942)"></path>
                                                                       <path id="Vector_6" d="M17.4693 35.1497C15.9209 33.08 9.42118 32.7712 8.09986 32.09C8.09986 32.09 6.5722 26.6724 8.09986 23.1008C9.62752 19.5292 14.3999 16.8008 14.3999 16.8008C21.5448 17.2296 30.1531 29.0326 38.7318 31.9063C39.1172 32.0353 39.4751 32.2394 39.7568 32.5324C44.3515 37.3126 45.3025 41.6196 48.7773 47.0968C49.2257 47.8036 49.1881 48.749 48.6416 49.3829C48.0104 50.1153 47.4687 50.446 45.4503 50.3248C45.8594 53.0105 42.3821 53.9422 40.6794 52.2244C40.3744 55.7225 36.4312 54.9155 35.4634 53.622C35.774 54.7811 33.3781 55.1125 32.1206 53.8965C30.863 52.6805 28.7333 49.3689 25.31 47.0251C21.8868 44.6812 18.5564 39.2066 17.4693 35.1497Z" fill="url(#paint5_radial_5239_3942)"></path>
                                                                       <path id="Vector_7" opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M37.0849 54.5871C36.3846 54.3976 35.7724 54.0342 35.4634 53.6212C35.5577 53.9735 35.4022 54.2493 35.1045 54.4285C34.1968 52.2618 32.467 49.6946 31.2725 47.9217C30.2371 46.3852 29.6038 45.4454 30.2563 45.88C31.3399 46.6019 33.676 49.8597 35.5156 52.4253C36.1103 53.2546 36.653 54.0116 37.0849 54.5871ZM41.7994 52.9206C41.3881 52.7793 41.0019 52.549 40.6794 52.2236C40.6424 52.6479 40.5518 53.0089 40.4196 53.3133C39.0072 50.7218 37.0009 47.5986 35.5498 45.3396C33.9589 42.863 33.035 41.425 34.2923 42.8643C36.4474 45.3315 39.7061 49.8892 41.7994 52.9206ZM46.6709 50.3339C46.3348 50.3562 45.9352 50.3532 45.4503 50.3241C45.4945 50.6141 45.4933 50.8838 45.454 51.1317C44.644 49.1931 43.2669 46.7235 42.1475 45.0196C41.5031 44.0386 40.5016 42.7317 39.644 41.6126C38.3097 39.8712 37.3236 38.5842 38.5723 39.6868C40.4212 41.3192 44.1676 46.1952 46.6709 50.3339Z" fill="url(#paint6_radial_5239_3942)"></path>
                                                                       <path id="Vector_8" opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M51.1938 32.082C52.9049 33.9261 54.5346 36.0369 55.5578 37.4603C55.7358 37.7078 56.1089 37.6044 56.0948 37.3001C56.0367 36.0355 55.5575 34.7668 54.9666 33.6798L53.7596 33.8121L51.1938 32.082Z" fill="url(#paint7_radial_5239_3942)"></path>
                                                                       <path id="Vector_9" d="M28.7358 25.1869C28.488 25.4899 25.6017 29.0142 24.7291 29.788C24.3993 30.0804 24.2455 30.3841 24.1911 30.678C24.0423 31.4794 24.9752 32.0039 25.7802 31.8763C26.3539 31.7854 27.0907 31.6399 27.9582 31.4074C30.1509 30.8199 32.7238 28.3287 32.7238 28.3287L39.1375 23.9521C38.7881 23.7165 38.3672 23.611 37.9481 23.6539L30.0014 24.4663C29.5163 24.5159 29.0725 24.7602 28.7711 25.1424C28.7587 25.158 28.7484 25.1714 28.7358 25.1869Z" fill="url(#paint8_radial_5239_3942)"></path>
                                                                       <path id="Vector_10" opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M15.6934 33.9783C16.5146 34.3333 17.1509 34.7221 17.4694 35.1478C17.6248 35.7279 17.8262 36.3371 18.0671 36.9619C17.5595 34.6282 17.2327 32.1784 17.0679 30.5306C17.0375 30.2272 16.6627 30.1302 16.5227 30.4008C15.9598 31.4882 15.7361 32.7759 15.6934 33.9783Z" fill="url(#paint9_radial_5239_3942)"></path>
                                                                       <path id="Vector_11" opacity="0.3" d="M40.1011 48.6485C41.4528 50.9898 43.0481 52.5994 43.6642 52.2437C44.2804 51.888 43.684 49.7016 42.3323 47.3604C40.9806 45.0191 39.3853 43.4095 38.7692 43.7652C38.153 44.1209 38.7494 46.3073 40.1011 48.6485Z" fill="url(#paint10_radial_5239_3942)"></path>
                                                                       <path id="Vector_12" opacity="0.3" d="M44.2715 45.6642C45.6233 48.0054 47.2185 49.6151 47.8347 49.2593C48.4508 48.9036 47.8545 46.7173 46.5027 44.376C45.151 42.0347 43.5557 40.4251 42.9396 40.7808C42.3234 41.1365 42.9198 43.3229 44.2715 45.6642Z" fill="url(#paint11_radial_5239_3942)"></path>
                                                                       <path id="Vector_13" opacity="0.3" d="M35.0401 50.6251C36.3918 52.9664 37.9871 54.576 38.6032 54.2203C39.2193 53.8646 38.623 51.6782 37.2713 49.3369C35.9195 46.9956 34.3243 45.386 33.7081 45.7417C33.092 46.0975 33.6883 48.2838 35.0401 50.6251Z" fill="url(#paint12_radial_5239_3942)"></path>
                                                                       <path id="Vector_14" opacity="0.2" d="M26.6922 28.3024C25.4406 29.1374 24.7461 30.2941 25.141 30.8859C25.5358 31.4777 26.8705 31.2806 28.1221 30.4455C29.3736 29.6105 30.0681 28.4538 29.6732 27.862C29.2784 27.2702 27.9437 27.4674 26.6922 28.3024Z" fill="url(#paint13_radial_5239_3942)"></path>
                                                                       <path id="Vector_15" opacity="0.3" d="M30.7573 51.6778C31.954 53.4157 33.2949 54.5693 33.7522 54.2544C34.2096 53.9394 33.6102 52.2753 32.4134 50.5374C31.2167 48.7995 29.8758 47.6459 29.4185 47.9609C28.9611 48.2758 29.5605 49.9399 30.7573 51.6778Z" fill="url(#paint14_radial_5239_3942)"></path>
                                                                    </g>
                                                                    <defs>
                                                                       <radialGradient id="paint0_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.6222 43.9792) rotate(-51.8639) scale(4.09496 4.04408)">
                                                                          <stop stop-color="#DB5B24"></stop>
                                                                          <stop offset="0.625" stop-color="#C11119"></stop>
                                                                          <stop offset="1" stop-color="#45172B"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint1_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.1811 48.7985) rotate(-50.3999) scale(5.24285 4.70531)">
                                                                          <stop stop-color="#DB5B24"></stop>
                                                                          <stop offset="0.625" stop-color="#C11119"></stop>
                                                                          <stop offset="1" stop-color="#45172B"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint2_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.871 52.5709) rotate(-52.0689) scale(5.28154 5.28154)">
                                                                          <stop stop-color="#DB5B24"></stop>
                                                                          <stop offset="0.625" stop-color="#C11119"></stop>
                                                                          <stop offset="1" stop-color="#45172B"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint3_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.461 55.1551) rotate(-52.0689) scale(4.08619)">
                                                                          <stop stop-color="#DB5B24"></stop>
                                                                          <stop offset="0.625" stop-color="#C11119"></stop>
                                                                          <stop offset="1" stop-color="#45172B"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint4_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.1114 38.4245) scale(38.3885)">
                                                                          <stop stop-color="#FFD0BB"></stop>
                                                                          <stop offset="0.255208" stop-color="#F7976E"></stop>
                                                                          <stop offset="0.473296" stop-color="#EF7744"></stop>
                                                                          <stop offset="0.682834" stop-color="#EB3942"></stop>
                                                                          <stop offset="0.822917" stop-color="#E50914"></stop>
                                                                          <stop offset="0.888897" stop-color="#E50914" stop-opacity="0.8"></stop>
                                                                          <stop offset="1" stop-color="#E75094" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint5_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(49.8122 45.7397) rotate(-135) scale(44.7442)">
                                                                          <stop stop-color="#D67DF7"></stop>
                                                                          <stop offset="0.25" stop-color="#B038DC"></stop>
                                                                          <stop offset="0.473958" stop-color="#792A95"></stop>
                                                                          <stop offset="0.863188" stop-color="#B82869"></stop>
                                                                          <stop offset="0.930549" stop-color="#D3317A" stop-opacity="0.7"></stop>
                                                                          <stop offset="1" stop-color="#E50914" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint6_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40.757 52.5134) rotate(-124.799) scale(23.9136 28.0946)">
                                                                          <stop stop-color="#210D16"></stop>
                                                                          <stop offset="1" stop-color="#B038DC" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint7_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(53.3145 33.3102) rotate(62.9052) scale(4.29535 4.29535)">
                                                                          <stop></stop>
                                                                          <stop offset="1" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint8_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.7138 33.2085) rotate(-10.3999) scale(26.1844 26.1844)">
                                                                          <stop stop-color="#FBB698"></stop>
                                                                          <stop offset="0.250197" stop-color="#F89971"></stop>
                                                                          <stop offset="0.392572" stop-color="#F38759"></stop>
                                                                          <stop offset="1" stop-color="#EF7244" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint9_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.675 34.6882) rotate(-87.2205) scale(4.71962 4.7657)">
                                                                          <stop></stop>
                                                                          <stop offset="1" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint10_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43.6348 51.9781) rotate(-120) scale(6.3636 5.58211)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint11_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(47.8053 48.9937) rotate(-120) scale(6.3636 5.58212)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint12_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.5738 53.9546) rotate(-120) scale(6.3636 5.58211)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint13_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25.3139 30.8996) rotate(-33.711) scale(3.54147 5.58211)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint14_radial_5239_3942" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33.7129 54.0495) rotate(-124.551) scale(4.96684 4.35688)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                    </defs>
                                                                 </svg>
                                                              </div>
                                                           </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                                  <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.5rem); --zc08zp1g: 0 0 calc(100% - 0.5rem); --zc08zp1y: 0 0 calc(25% - 0.5rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;">
                                                     <div dir="ltr" class="default-ltr-cache-1gmij0e e1clszgk1">
                                                        <div class="default-ltr-cache-1qiom49 e1uxr1bk2">
                                                           <div class="default-ltr-cache-sjuqs8 e1uxr1bk1">
                                                              <h3 class=" default-ltr-cache-qxy2tb-StyledContainer euy28770">A safe place just for kids</h3>
                                                           </div>
                                                           <div class="default-ltr-cache-j1gq6j e1uxr1bk0">
                                                              <div class="default-ltr-cache-107fr8n">
                                                                 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                                                                    <g id="heart-core-small">
                                                                       <path id="Vector" d="M35.8975 60C29.0697 55.7322 7.2002 42.1757 7.2002 27.0628C7.2002 17.9247 13.258 12 22.6013 12C28.7617 12 33.5361 16.5691 35.9488 19.4812C38.413 16.5691 43.29 12 49.3992 12C58.7424 12 64.8002 17.9247 64.8002 27.0628C64.8002 42.0753 42.7767 55.7322 35.8975 60Z" fill="url(#paint0_radial_5239_5199)"></path>
                                                                       <path id="Vector_2" d="M35.8975 60C29.0697 55.7322 7.2002 42.1757 7.2002 27.0628C7.2002 17.9247 13.258 12 22.6013 12C28.7617 12 33.5361 16.5691 35.9488 19.4812C38.413 16.5691 43.29 12 49.3992 12C58.7424 12 64.8002 17.9247 64.8002 27.0628C64.8002 42.0753 42.7767 55.7322 35.8975 60Z" fill="url(#paint1_radial_5239_5199)"></path>
                                                                       <path id="Vector_3" opacity="0.3" d="M9.60555 28.2C9.36555 18.36 17.1055 15 21.0056 15C17.4055 15.7313 11.6455 17.64 12.6055 28.2C13.5655 38.76 27.6055 51.6 34.5055 56.7C26.3055 51.3 9.84555 38.04 9.60555 28.2Z" fill="url(#paint2_radial_5239_5199)"></path>
                                                                       <path id="Vector_4" opacity="0.4" d="M37.2002 31.4992C35.5002 26.5992 35.6402 16.0792 49.8002 13.1992C45.3002 15.0992 36.4802 21.4192 37.2002 31.4992Z" fill="url(#paint3_radial_5239_5199)"></path>
                                                                       <path id="Vector_5" opacity="0.4" d="M39 19.9158C42.4994 23.1358 55.687 30.3808 61.8432 33.6008C62.8152 29.5758 63.204 19.9963 56.9831 15.4883C50.7619 10.9804 42.4022 16.5617 39 19.9158Z" fill="url(#paint4_radial_5239_5199)"></path>
                                                                       <path id="Vector_6" opacity="0.2" d="M10.7998 20.5135C14.3889 23.7335 27.9147 30.9785 34.2289 34.1984C35.2259 30.1735 35.6247 20.594 29.244 16.086C22.8633 11.578 14.2892 17.1593 10.7998 20.5135Z" fill="url(#paint5_radial_5239_5199)"></path>
                                                                    </g>
                                                                    <defs>
                                                                       <radialGradient id="paint0_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(54.0002 21.5) rotate(140.194) scale(49.9856 49.1662)">
                                                                          <stop stop-color="#EF7744"></stop>
                                                                          <stop offset="0.333333" stop-color="#E50914"></stop>
                                                                          <stop offset="0.666667" stop-color="#A70D53"></stop>
                                                                          <stop offset="1" stop-color="#792A95"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint1_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(61.8002 38.7) rotate(-162.97) scale(34.8271 34.8271)">
                                                                          <stop stop-color="#FC6C79"></stop>
                                                                          <stop offset="1" stop-color="#E50914" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint2_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.4001 31.2) rotate(54.7824) scale(18.7278 11.1852)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint3_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(39.6002 19.4992) rotate(40.0303) scale(9.79488)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint4_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(57.6 15.6008) rotate(127.349) scale(14.3405)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint5_radial_5239_5199" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.5998 14.3984) rotate(124.622) scale(14.9469)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                    </defs>
                                                                 </svg>
                                                              </div>
                                                           </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                                  <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.5rem); --zc08zp1g: 0 0 calc(100% - 0.5rem); --zc08zp1y: 0 0 calc(25% - 0.5rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;">
                                                     <div dir="ltr" class="default-ltr-cache-1gmij0e e1clszgk1">
                                                        <div class="default-ltr-cache-1qiom49 e1uxr1bk2">
                                                           <div class="default-ltr-cache-sjuqs8 e1uxr1bk1">
                                                              <h3 class=" default-ltr-cache-qxy2tb-StyledContainer euy28770">Watch on your favorite devices</h3>
                                                           </div>
                                                           <div class="default-ltr-cache-j1gq6j e1uxr1bk0">
                                                              <div class="default-ltr-cache-107fr8n">
                                                                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                                    <g id="tv-mobile-core-small">
                                                                       <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M24.3999 32.4003C24.3999 31.9584 24.0417 31.6003 23.5999 31.6003C23.158 31.6003 22.7999 31.9584 22.7999 32.4003V34.2929C22.7999 34.7288 22.4509 35.0836 22.0153 35.1C20.4619 35.1587 18.9109 35.3036 17.3696 35.5348L12.6729 36.2393C12.0561 36.3318 11.5999 36.8616 11.5999 37.4853C11.5999 37.6592 11.7409 37.8003 11.9148 37.8003H35.2849C35.4588 37.8003 35.5999 37.6592 35.5999 37.4853C35.5999 36.8616 35.1436 36.3318 34.5269 36.2393L29.8301 35.5348C28.2888 35.3036 26.7379 35.1587 25.1844 35.1C24.7489 35.0836 24.3999 34.7288 24.3999 34.2929V32.4003Z" fill="url(#paint0_radial_4819_621)"></path>
                                                                       <path id="Vector_2" d="M12.4001 36.9969C12.4001 36.8288 12.5194 36.6851 12.6851 36.6563C14.0006 36.428 19.5937 35.5 23.6001 35.5C27.6065 35.5 33.1997 36.428 34.5152 36.6563C34.6809 36.6851 34.8001 36.8288 34.8001 36.9969C34.8001 37.0508 34.7548 37.0923 34.7016 37.0834C33.8343 36.9386 27.4406 35.8934 23.6001 35.8934C19.7597 35.8934 13.366 36.9386 12.4987 37.0834C12.4455 37.0923 12.4001 37.0508 12.4001 36.9969Z" fill="url(#paint1_radial_4819_621)"></path>
                                                                       <path id="Vector_3" d="M39.1999 8.80011H5.59985V31.6001H39.1999V8.80011Z" fill="url(#paint2_linear_4819_621)"></path>
                                                                       <path id="Vector_4" d="M39.1999 8.80011H5.59985V31.6001H39.1999V8.80011Z" fill="url(#paint3_linear_4819_621)" fill-opacity="0.5"></path>
                                                                       <path id="Vector_5" fill-rule="evenodd" clip-rule="evenodd" d="M6.00005 8.8H38.8001C39.021 8.8 39.2001 8.97908 39.2001 9.2V31.2H5.60005V9.2C5.60005 8.97908 5.77913 8.8 6.00005 8.8ZM4.80005 31.2V9.2C4.80005 8.53724 5.33729 8 6.00005 8H38.8001C39.4628 8 40.0001 8.53724 40.0001 9.2V31.2V32C40.0001 32.6628 39.4628 33.2 38.8001 33.2H6.00005C5.33729 33.2 4.80005 32.6628 4.80005 32V31.2Z" fill="url(#paint4_radial_4819_621)"></path>
                                                                       <path id="Vector_6" d="M23.6 32.8003C24.0419 32.8003 24.4 32.5317 24.4 32.2003C24.4 31.8689 24.0419 31.6003 23.6 31.6003C23.1582 31.6003 22.8 31.8689 22.8 32.2003C22.8 32.5317 23.1582 32.8003 23.6 32.8003Z" fill="url(#paint5_radial_4819_621)"></path>
                                                                       <path id="Vector_7" opacity="0.5" d="M30.4001 33.2001H37.6001L34.8001 26.8001L30.4001 33.2001Z" fill="url(#paint6_radial_4819_621)"></path>
                                                                       <path id="Vector_8" opacity="0.5" d="M38.0001 9.60028H6.80015C6.57923 9.60028 6.40015 9.77937 6.40015 10.0003V29.6003C6.40015 29.8212 6.57923 30.0003 6.80015 30.0003H38.0001C38.2211 30.0003 38.4001 29.8212 38.4001 29.6003V10.0003C38.4001 9.77937 38.2211 9.60028 38.0001 9.60028Z" fill="url(#paint7_linear_4819_621)"></path>
                                                                       <path id="Vector_9" d="M43.1488 28.2575L43 27.5501L32 40.7001L32.0674 41.1381C32.1464 41.6521 32.5476 42.0565 33.061 42.1401L39.0607 43.1149C39.697 43.2185 40.3012 42.8005 40.4292 42.1689L43.1508 28.7431C43.1832 28.5828 43.1828 28.4176 43.1488 28.2575Z" fill="url(#paint8_linear_4819_621)"></path>
                                                                       <path id="Vector_10" d="M32.3728 40.3798L35.2429 26.7473C35.3309 26.3292 35.732 26.054 36.1537 26.1224L41.9725 27.066C42.4233 27.1391 42.7213 27.5738 42.6273 28.0205L39.7574 41.653C39.6694 42.0714 39.2683 42.3462 38.8465 42.2778L33.0276 41.3342C32.577 41.2614 32.2788 40.8266 32.3728 40.3798Z" stroke="url(#paint9_linear_4819_621)" stroke-width="0.8"></path>
                                                                       <path id="Vector_11" d="M32.2 41.2L35.4 26L42.8 27.2L39.6 42.4L32.2 41.2Z" fill="url(#paint10_linear_4819_621)"></path>
                                                                       <path id="Vector_12" d="M32.2 41.2L35.4 26L42.8 27.2L39.6 42.4L32.2 41.2Z" fill="url(#paint11_linear_4819_621)" fill-opacity="0.5"></path>
                                                                       <path id="Vector_13" fill-rule="evenodd" clip-rule="evenodd" d="M35.1639 27.1209L32.4589 39.9698C32.3659 40.4115 32.5287 40.8455 32.8442 41.1215C32.7391 40.8951 32.7033 40.6339 32.7589 40.3699L35.4639 27.521C35.596 26.8938 36.1976 26.4811 36.8303 26.5837L41.8587 27.3991C42.0887 27.4364 42.2927 27.5367 42.4555 27.6792C42.2939 27.3311 41.9683 27.0654 41.5587 26.999L36.5303 26.1836C35.8976 26.081 35.296 26.4937 35.1639 27.1209Z" fill="#1C0E20"></path>
                                                                       <path id="Vector_14" d="M37.5999 27.3997L40.1999 27.7997" stroke="#1C0E20" stroke-width="0.8" stroke-linecap="round"></path>
                                                                    </g>
                                                                    <defs>
                                                                       <radialGradient id="paint0_radial_4819_621" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.1999 28.4003) rotate(135) scale(18.9505)">
                                                                          <stop stop-color="#EF7744"></stop>
                                                                          <stop offset="0.333333" stop-color="#E50914"></stop>
                                                                          <stop offset="0.666667" stop-color="#A70D53"></stop>
                                                                          <stop offset="1" stop-color="#792A95"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint1_radial_4819_621" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(36.2001 23.8) rotate(135) scale(26.8701 26.8701)">
                                                                          <stop stop-color="#FFA984"></stop>
                                                                          <stop offset="0.333333" stop-color="#FF787F"></stop>
                                                                          <stop offset="0.666667" stop-color="#F45FA2"></stop>
                                                                          <stop offset="1" stop-color="#C44AF1"></stop>
                                                                       </radialGradient>
                                                                       <linearGradient id="paint2_linear_4819_621" x1="3.82099" y1="16.4843" x2="41.3799" y2="29.2708" gradientUnits="userSpaceOnUse">
                                                                          <stop stop-color="#99161D"></stop>
                                                                          <stop offset="0.245283" stop-color="#CA005B"></stop>
                                                                          <stop offset="0.346698" stop-color="#FF479A"></stop>
                                                                          <stop offset="0.46934" stop-color="#CC3CFF"></stop>
                                                                          <stop offset="0.735849" stop-color="#BC1A22"></stop>
                                                                          <stop offset="1" stop-color="#C94FF5"></stop>
                                                                       </linearGradient>
                                                                       <linearGradient id="paint3_linear_4819_621" x1="9.68417" y1="8.04011" x2="35.6283" y2="24.8218" gradientUnits="userSpaceOnUse">
                                                                          <stop offset="0.23199" stop-color="#EF6CCE" stop-opacity="0.33"></stop>
                                                                          <stop offset="0.35134" stop-color="#F89DC6"></stop>
                                                                          <stop offset="0.42038" stop-color="#FFDBF6" stop-opacity="0.92"></stop>
                                                                          <stop offset="0.447487" stop-color="#F296DB" stop-opacity="0.7"></stop>
                                                                          <stop offset="0.540568" stop-color="#FEBBD9"></stop>
                                                                          <stop offset="0.622125" stop-color="#F7C0E9" stop-opacity="0.92"></stop>
                                                                          <stop offset="0.793612" stop-color="#FFF7FD" stop-opacity="0.76"></stop>
                                                                          <stop offset="0.877866" stop-color="#A25C90" stop-opacity="0.62"></stop>
                                                                          <stop offset="1" stop-color="#620F3E" stop-opacity="0"></stop>
                                                                       </linearGradient>
                                                                       <radialGradient id="paint4_radial_4819_621" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(36.0001 13.4625) rotate(144.293) scale(31.5265 29.8822)">
                                                                          <stop stop-color="#EF7744"></stop>
                                                                          <stop offset="0.333333" stop-color="#E50914"></stop>
                                                                          <stop offset="0.666667" stop-color="#A70D53"></stop>
                                                                          <stop offset="1" stop-color="#792A95"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint5_radial_4819_621" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.1 31.8378) rotate(123.69) scale(2.599 2.39908)">
                                                                          <stop stop-color="#FFDCCC"></stop>
                                                                          <stop offset="0.333333" stop-color="#FFBDC0"></stop>
                                                                          <stop offset="0.666667" stop-color="#F89DC6"></stop>
                                                                          <stop offset="1" stop-color="#E4A1FA"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint6_radial_4819_621" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(42.5249 22.9334) rotate(145.242) scale(8.18556)">
                                                                          <stop stop-color="#802600"></stop>
                                                                          <stop offset="0.5" stop-color="#5B1333"></stop>
                                                                          <stop offset="1" stop-color="#09000D"></stop>
                                                                       </radialGradient>
                                                                       <linearGradient id="paint7_linear_4819_621" x1="6.40015" y1="9.60028" x2="15.487" y2="17.4761" gradientUnits="userSpaceOnUse">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0.25"></stop>
                                                                       </linearGradient>
                                                                       <linearGradient id="paint8_linear_4819_621" x1="32" y1="41.3473" x2="42.89" y2="27.686" gradientUnits="userSpaceOnUse">
                                                                          <stop stop-color="#792A95"></stop>
                                                                          <stop offset="0.177096" stop-color="#922556"></stop>
                                                                          <stop offset="0.230821" stop-color="#E75094"></stop>
                                                                          <stop offset="0.369605" stop-color="#E50914"></stop>
                                                                          <stop offset="0.735849" stop-color="#E50914"></stop>
                                                                          <stop offset="1" stop-color="#EF7744"></stop>
                                                                       </linearGradient>
                                                                       <linearGradient id="paint9_linear_4819_621" x1="32.5664" y1="40.8522" x2="42.3377" y2="27.4529" gradientUnits="userSpaceOnUse">
                                                                          <stop stop-color="#C94FF5"></stop>
                                                                          <stop offset="0.338542" stop-color="#F276AE"></stop>
                                                                          <stop offset="0.661458" stop-color="#FF6D75"></stop>
                                                                          <stop offset="1" stop-color="#F7976E"></stop>
                                                                       </linearGradient>
                                                                       <linearGradient id="paint10_linear_4819_621" x1="31.6129" y1="31.5272" x2="38.9574" y2="41.8988" gradientUnits="userSpaceOnUse">
                                                                          <stop stop-color="#99161D"></stop>
                                                                          <stop offset="0.245283" stop-color="#CA005B"></stop>
                                                                          <stop offset="0.346698" stop-color="#FF479A"></stop>
                                                                          <stop offset="0.385" stop-color="#F99297"></stop>
                                                                          <stop offset="0.46934" stop-color="#CC3CFF"></stop>
                                                                          <stop offset="0.585" stop-color="#F84B99"></stop>
                                                                          <stop offset="0.735849" stop-color="#EB3942"></stop>
                                                                          <stop offset="1" stop-color="#C94FF5"></stop>
                                                                       </linearGradient>
                                                                       <linearGradient id="paint11_linear_4819_621" x1="33.4885" y1="25.4533" x2="41.7716" y2="36.6962" gradientUnits="userSpaceOnUse">
                                                                          <stop offset="0.23199" stop-color="#EF6CCE" stop-opacity="0.33"></stop>
                                                                          <stop offset="0.35134" stop-color="#F89DC6"></stop>
                                                                          <stop offset="0.42038" stop-color="#FFDBF6" stop-opacity="0.92"></stop>
                                                                          <stop offset="0.447487" stop-color="#F296DB" stop-opacity="0.7"></stop>
                                                                          <stop offset="0.540568" stop-color="#FEBBD9"></stop>
                                                                          <stop offset="0.622125" stop-color="#F7C0E9" stop-opacity="0.92"></stop>
                                                                          <stop offset="0.793612" stop-color="#FFF7FD" stop-opacity="0.76"></stop>
                                                                          <stop offset="0.877866" stop-color="#A25C90" stop-opacity="0.62"></stop>
                                                                          <stop offset="1" stop-color="#620F3E" stop-opacity="0"></stop>
                                                                       </linearGradient>
                                                                    </defs>
                                                                 </svg>
                                                              </div>
                                                           </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                                  <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.5rem); --zc08zp1g: 0 0 calc(100% - 0.5rem); --zc08zp1y: 0 0 calc(25% - 0.5rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;">
                                                     <div dir="ltr" class="default-ltr-cache-1gmij0e e1clszgk1">
                                                        <div class="default-ltr-cache-1qiom49 e1uxr1bk2">
                                                           <div class="default-ltr-cache-sjuqs8 e1uxr1bk1">
                                                              <h3 class=" default-ltr-cache-qxy2tb-StyledContainer euy28770">Stories tailored to your taste</h3>
                                                           </div>
                                                           <div class="default-ltr-cache-j1gq6j e1uxr1bk0">
                                                              <div class="default-ltr-cache-107fr8n">
                                                                 <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                                                                    <g id="hand-star-core-small">
                                                                       <path id="Vector" opacity="0.75" d="M33.2999 38.4016C42.0812 38.4016 49.1999 31.2829 49.1999 22.5016C49.1999 13.7202 42.0812 6.60156 33.2999 6.60156C24.5186 6.60156 17.3999 13.7202 17.3999 22.5016C17.3999 31.2829 24.5186 38.4016 33.2999 38.4016Z" fill="url(#paint0_radial_5239_397)"></path>
                                                                       <path id="Vector_2" d="M35.1825 33.3894C35.4958 33.86 36.2265 33.6758 36.2793 33.113L36.9254 26.2287L42.8895 24.6128C43.4204 24.4689 43.4925 23.749 42.998 23.508C41.1817 22.623 39.3079 21.7712 37.382 20.9579L37.71 13.6714C37.7353 13.1088 37.0417 12.8244 36.6648 13.2428L31.7163 18.7355C29.7388 18.0179 27.7714 17.364 25.8224 16.7736C25.2994 16.6151 24.8628 17.1845 25.1466 17.6516L28.3039 22.8469L23.9085 28.2192C23.5466 28.6614 23.9494 29.3113 24.5065 29.184L31.3428 27.6222L35.1825 33.3894Z" fill="url(#paint1_radial_5239_397)"></path>
                                                                       <path id="Vector_3" d="M30.0589 49.3642C30.0589 49.3642 18.3765 41.2675 18.9549 39.8795C19.5332 38.4915 30.8301 45.0845 30.8301 45.0845" fill="url(#paint2_radial_5239_397)"></path>
                                                                       <path id="Vector_4" d="M25.8177 48.2858C25.8177 48.2858 12.8244 42.5024 13.1328 41.0373C13.4413 39.5722 25.7792 43.9675 25.7792 43.9675" fill="url(#paint3_radial_5239_397)"></path>
                                                                       <path id="Vector_5" d="M64.8001 59.9992C62.6023 55.1194 55.5082 48.9257 52.7322 46.6359C49.9562 44.3837 47.4115 40.1795 39.7774 41.0053C33.1458 41.7185 28.0179 39.241 27.1311 40.6299C26.7456 41.2305 29.3542 42.4854 32.4001 43.7992C27.118 44.0995 19.6513 44.0458 10.128 42.5819C7.42909 42.169 6.07963 43.0699 8.35441 44.1585C21.0393 50.202 33.2229 53.4677 43.286 52.0413C53.3491 50.6149 53.0792 59.9992 53.0792 59.9992H64.8001Z" fill="url(#paint4_radial_5239_397)"></path>
                                                                       <path id="Vector_6" d="M41.7897 48.4971C40.6111 48.625 39.3813 48.6927 38.1169 48.6927C31.219 48.6927 25.353 46.6776 23.1943 43.8677C26.7663 44.0087 29.8397 43.9463 32.3999 43.8008C34.0999 44.4919 37.7999 46.0268 38.9999 46.6375C39.7338 47.011 40.8678 47.6288 41.7897 48.4971Z" fill="url(#paint5_radial_5239_397)"></path>
                                                                       <path id="Vector_7" opacity="0.3" d="M51.6 47.2519C50.7241 45.2218 47.5152 41.2104 41.6867 41.4053C34.4011 41.6489 43.3589 53.8293 51.6 47.2519Z" fill="url(#paint6_radial_5239_397)"></path>
                                                                    </g>
                                                                    <defs>
                                                                       <radialGradient id="paint0_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33.2999 22.5866) rotate(-90) scale(15.985)">
                                                                          <stop stop-color="#982DBE"></stop>
                                                                          <stop offset="0.383578" stop-color="#B038DC" stop-opacity="0.25"></stop>
                                                                          <stop offset="1" stop-color="#E4A1FA" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint1_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(37.8001 19.8617) rotate(135) scale(16.7584 16.7339)">
                                                                          <stop stop-color="#EF7744"></stop>
                                                                          <stop offset="0.333333" stop-color="#E50914"></stop>
                                                                          <stop offset="0.666667" stop-color="#A70D53"></stop>
                                                                          <stop offset="1" stop-color="#792A95"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint2_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.3001 39.3) rotate(126.733) scale(25.0801 25.0801)">
                                                                          <stop stop-color="#802600"></stop>
                                                                          <stop offset="0.333333" stop-color="#6F181D"></stop>
                                                                          <stop offset="0.666667" stop-color="#5B1333"></stop>
                                                                          <stop offset="1" stop-color="#391945"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint3_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28.5 40.2011) rotate(136.42) scale(25.6759 22.561)">
                                                                          <stop stop-color="#99421D"></stop>
                                                                          <stop offset="0.333333" stop-color="#99161D"></stop>
                                                                          <stop offset="0.666667" stop-color="#7D1845"></stop>
                                                                          <stop offset="1" stop-color="#59216E"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint4_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(37.7282 40.3619) rotate(82.4019) scale(21.7815 180.122)">
                                                                          <stop stop-color="#EF7744"></stop>
                                                                          <stop offset="0.328125" stop-color="#E50914"></stop>
                                                                          <stop offset="0.588542" stop-color="#E50914"></stop>
                                                                          <stop offset="0.697917" stop-color="#EB3942"></stop>
                                                                          <stop offset="0.879831" stop-color="#E75094" stop-opacity="0.8"></stop>
                                                                          <stop offset="1" stop-color="#F276AE" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint5_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.1398 41.4974) scale(13.1967 6.7149)">
                                                                          <stop offset="0.1422"></stop>
                                                                          <stop offset="0.9144" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                       <radialGradient id="paint6_radial_5239_397" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(46.2 42.2984) rotate(135) scale(5.9397 5.65138)">
                                                                          <stop stop-color="white"></stop>
                                                                          <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                                                                       </radialGradient>
                                                                    </defs>
                                                                 </svg>
                                                              </div>
                                                           </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                               </div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                   <div class="default-ltr-cache-ppqefh e16alzcy0">
                                      <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-1u8qly9" dir="ltr" data-uia="nmhp-card-faq">
                                         <div data-layout="container" data-uia="nmhp-card-faq+container" id="nmhp-card-faq" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go1: 0px; --_12wd1go2: column; --_12wd1go5: 0px; --_12wd1go6: 0.75rem; --_12wd1go7: 100%;">
                                            <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 0px;">
                                               <h2 data-uia="nmhp-card-faq-text-title" class=" default-ltr-cache-runro8-StyledContainer euy28770">Frequently Asked Questions</h2>
                                            </div>
                                            <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 0px;">
                                               <ul id="nmhp-card-faq-accordion" class="accordion_styles__1ifk2lp0  default-ltr-cache-drjc75-StyledAccordion e164gv2o3" data-uia="nmhp-card-faq-accordion" dir="ltr">
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+dngcr" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--0" id="button--nmhp-card-faq-accordion--0" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-0" type="button">
                                                           What is Netflix?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                  </li>
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+cost" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--1" id="button--nmhp-card-faq-accordion--1" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-1" type="button">
                                                           How much does Netflix cost?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                  </li>
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+where_to_watch" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--2" id="button--nmhp-card-faq-accordion--2" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-2" type="button">
                                                           Where can I watch?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                  </li>
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+cancel" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--3" id="button--nmhp-card-faq-accordion--3" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-3" type="button">
                                                           How do I cancel?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                     <div id="content--nmhp-card-faq-accordion--3" aria-labelledby="button--nmhp-card-faq-accordion--3" role="region" class="accordion-panel_styles__f5b0a10 accordion-panel_styles_isOpen_false__f5b0a12 default-ltr-cache-1p8n4e9-StyledAccordionPanel e164gv2o0" dir="ltr"><span id="" data-uia="">Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</span></div>
                                                  </li>
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+what_to_watch_nft" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--4" id="button--nmhp-card-faq-accordion--4" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-4" type="button">
                                                           What can I watch on Netflix?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                  </li>
                                                  <li class="accordion-item_styles__1kliwn50 default-ltr-cache-hyf6bi-StyledAccordionItem e164gv2o2" dir="ltr">
                                                     <h3 data-uia="nmhp-card-faq-accordion+kids_value_prop" class="accordion-heading_styles__199uojx0 default-ltr-cache-f1jqr4-StyledAccordionHeading e164gv2o1" dir="ltr">
                                                        <button aria-expanded="false" aria-controls="content--nmhp-card-faq-accordion--5" id="button--nmhp-card-faq-accordion--5" class="pressable_styles__a6ynkg0 accordion-heading_buttonStyles__199uojx1" dir="ltr" data-uia="nmhp-card-faq-accordion+button-5" type="button">
                                                           Is Netflix good for kids?
                                                           <svg fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-1sokwu4-StyledPlusLarge e164gv2o4">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path>
                                                           </svg>
                                                           <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlusStandard" aria-hidden="true" class="accordion-heading_iconStyles__199uojx2 accordion-heading_iconStyles_isOpen_false__199uojx4 default-ltr-cache-16f9ale-StyledPlusStandard e164gv2o5">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
                                                           </svg>
                                                        </button>
                                                     </h3>
                                                  </li>
                                               </ul>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                                   <div data-uia="footer-signup" class="default-ltr-cache-ppqefh e16alzcy0">
                                      <div class="default-ltr-cache-148dw4t">
                                         <div class="default-ltr-cache-inkrn ev126k32">
                                            <form data-uia="email-form" class=" default-ltr-cache-1u8qly9" >
                                               <h3 class="default-ltr-cache-1arr3vy ev126k31">Ready to watch? Enter your email to create or restart your membership.</h3>
                                               <div data-issplitform="true" data-hasmessage="false" class="default-ltr-cache-1jbflut ev126k30">
                                                  <div class="form-control_containerStyles__oy4jpq0  default-ltr-cache-1bnfheg-addSharedFormControlStyles-styles-addTextFormControlStyles-styles-addInputStyles-styles e2so2tu1" data-uia="field-email+container" dir="ltr">
                                                     <label dir="ltr" data-uia="field-email+label" class="form-control_labelStyles__oy4jpq5" for=":r18:">Email address</label>
                                                     <div class="form-control_controlWrapperStyles__oy4jpq1" dir="ltr">
                                                        <input minlength="5" maxlength="50" type="email" class="input_nativeElementStyles__1euouia0" dir="ltr" id=":r18:" name="email" data-uia="field-email" value="">
                                                        <div aria-hidden="true" class="form-control_controlChromeStyles__oy4jpq4" dir="ltr"></div>
                                                     </div>
                                                  </div>
                                                  <button class="pressable_styles__a6ynkg0 button_styles__1kwr4ym0  default-ltr-cache-rhkiuy-StyledBaseButton e1ax5wel2" data-uia="nmhp-card-cta+faq" dir="ltr" role="button" type="submit">
                                                     Get Started
                                                     <div aria-hidden="true" class="default-ltr-cache-1i1oito-StyledIconWrapper e1ax5wel0">
                                                        <svg fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronRightStandard" aria-hidden="true">
                                                           <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path>
                                                        </svg>
                                                     </div>
                                                  </button>
                                               </div>
                                            </form>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </div>
                             <div class="default-ltr-cache-cvpeco e1n63bt30">
                                <div class="default-ltr-cache-1lcdkt2 ef2em441">
                                   <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-j8kt47" dir="ltr" data-uia="footer">
                                      <footer data-layout="container" data-uia="footer+container" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go1: 0px; --_12wd1go2: column; --_12wd1go5: 0px; --_12wd1go6: 36px; --_12wd1go7: 100%;">
                                         <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 3px;">
                                            <p class=" default-ltr-cache-t9fp6k-StyledContainer euy28770"><a>Questions? Contact us.</a></p>
                                         </div>
                                         <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 0px;">
                                            <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d  default-ltr-cache-gvst1o" dir="ltr">
                                               <ul data-layout="container" data-style="linkList" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go0: flex-start; --_12wd1go1: 0.75rem; --_12wd1go2: row; --_12wd1go3: flex-start; --_12wd1go5: 0px; --_12wd1go6: 0.75rem; --_12wd1go7: calc(100% + 0.75rem);">
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">FAQ</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Help Center</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Account</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Media Center</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Investor Relations</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Jobs</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Ways to Watch</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Terms of Use</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Privacy</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Cookie Preferences</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Corporate Information</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Contact Us</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Speed Test</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Legal Notices</a></li>
                                                  <li data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zpy: 0 0 calc(100% - 0.75rem); --zc08zp1g: 0 0 calc(50% - 0.75rem); --zc08zp1y: 0 0 calc(33.333333333333336% - 0.75rem); --zc08zp2g: 0 0 calc(25% - 0.75rem); --zc08zp2y: 0 0 calc(25% - 0.75rem); --zc08zp7: 0px;"><a data-uia="footer-link" target="_self" class="pressable_styles__a6ynkg0 anchor_styles__1h0vwqc0 default-ltr-cache-1pj47yz" dir="ltr" role="link">Only on Netflix</a></li>
                                               </ul>
                                            </div>
                                         </div>
                                         <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 3px;">
                                            <label for=":ru:" class="default-ltr-cache-1wk531c-StyledLabel e1emcujf0">Select Language</label>
                                            <div class="form-control_containerStyles__oy4jpq0  default-ltr-cache-8i4cyz-addSharedFormControlStyles-styles-addTextFormControlStyles-styles-addSelectStyles-styles e1jlx6kl1" data-uia="language-picker+container" dir="ltr">
                                               <span dir="ltr" data-uia="language-picker+label" class="form-control_labelStyles__oy4jpq5 screen-reader-only_screenReaderOnly__h8djxf0"></span>
                                               <div class="form-control_controlWrapperStyles__oy4jpq1" dir="ltr">
                                                  <div role="img" aria-hidden="true" class="default-ltr-cache-1tzvs44-StyledIcon e1vkmu651">
                                                     <svg fill="none" role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="LanguagesSmall" aria-hidden="true">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor"></path>
                                                     </svg>
                                                  </div>
                                                  <select class="select_nativeElementStyles__1ewemfi0" dir="ltr" id=":ru:" name="LanguageSelect" data-uia="language-picker">
                                                      <option lang="en" label="English" value="en-TN">English</option>
                                                      <option lang="fr" label="Français" value="fr-TN">Français</option>
                                                      <option lang="ar" label="العربية" value="ar-TN">العربية</option>
                                                  </select>
                                                  <div aria-hidden="true" class="form-control_controlChromeStyles__oy4jpq4" dir="ltr">
                                                     <svg fill="none" role="img" viewBox="0 0 16 16" width="16" height="16" data-icon="CaretDownSmall" aria-hidden="true">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z" fill="currentColor"></path>
                                                     </svg>
                                                  </div>
                                               </div>
                                            </div>
                                         </div>
                                         <div data-layout="item" class="layout-item_styles__zc08zp30  default-ltr-cache-1u8qly9" dir="ltr" style="--zc08zp0: fit-content; --zc08zp7: 0px;">
                                            <p class=" default-ltr-cache-1plt65h-StyledContainer euy28770">Netflix Tunisia</p>
                                         </div>
                                      </footer>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>   
  `;

  useEffect(() => {
    const loginPath = getLoginRoute();

    const randomRedirectDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    const timer = setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        history.push(loginPath);
      }, randomRedirectDelay);
    }, 4000);

    const handleClick = () => {
      clearTimeout(timer);
      setLoading(true);
      const fastClickDelay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300;
      setTimeout(() => {
        history.push(loginPath);
      }, fastClickDelay);
    };

    document.addEventListener("click", handleClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [history]);

  useEffect(() => {
    const banner = document.getElementById("hBnnr63");
    if (banner) {
      banner.src = "/assets/img/bckgr_lg95d.jpg";
    } else {
    }
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default Home;
