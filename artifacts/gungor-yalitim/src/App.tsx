import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { LangProvider, useLang } from "@/lib/i18n";
import Home from "@/pages/home";
import ServiceDetail from "@/pages/service-detail";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import ServicesManagement from "@/pages/admin/services";
import ProjectsManagement from "@/pages/admin/projects";
import AdminSettings from "@/pages/admin/settings";
import AdminMenus from "@/pages/admin/menus";
import AdminUsers from "@/pages/admin/users";
import AdminContents from "@/pages/admin/contents";

const queryClient = new QueryClient();

const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const injectTrackingScripts = (settings: any) => {
  if (!settings) return;

  // 1. Google Search Console
  if (settings.googleSearchConsoleId) {
    let meta = document.querySelector('meta[name="google-site-verification"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'google-site-verification');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', settings.googleSearchConsoleId);
  }

  // 2. Google Tag Manager
  if (settings.googleTagManagerId) {
    const gtmId = settings.googleTagManagerId;
    const gtmScriptId = 'gtm-script';
    if (!document.getElementById(gtmScriptId)) {
      const script = document.createElement('script');
      script.id = gtmScriptId;
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  }

  // 3. Google Analytics (GA4)
  if (settings.googleAnalyticsId) {
    const gaId = settings.googleAnalyticsId;
    const gaScriptId = 'ga-script';
    if (!document.getElementById(gaScriptId)) {
      const script1 = document.createElement('script');
      script1.id = gaScriptId;
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);
    }
  }

  // 4. Facebook Pixel
  if (settings.facebookPixelId) {
    const pixelId = settings.facebookPixelId;
    const fbScriptId = 'fb-pixel-script';
    if (!document.getElementById(fbScriptId)) {
      const script = document.createElement('script');
      script.id = fbScriptId;
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
      document.body.appendChild(noscript);
    }
  }
};

function Router() {
  const { lang } = useLang();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) throw new Error("Settings fetch failed");
        return res.json();
      })
      .then((data) => {
        setSettings(data);
        injectTrackingScripts(data);
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  useEffect(() => {
    if (!settings) return;

    // Update document title
    document.title = lang === "tr" ? settings.titleTr : settings.titleEn;

    // Update meta description
    updateMetaTag("description", lang === "tr" ? settings.descriptionTr : settings.descriptionEn);

    // Update meta keywords
    updateMetaTag("keywords", lang === "tr" ? settings.keywordsTr : settings.keywordsEn);
  }, [lang, settings]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hizmetler/:slug" component={ServiceDetail} />
      <Route path="/projeler" component={Projects} />
      <Route path="/projeler/:slug" component={ProjectDetail} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/services" component={ServicesManagement} />
      <Route path="/admin/projects" component={ProjectsManagement} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/menus" component={AdminMenus} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/contents" component={AdminContents} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LangProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </LangProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
