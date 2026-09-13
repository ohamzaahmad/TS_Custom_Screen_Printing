import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SITE_URL = 'https://stcsprinting.com';

export const useSEO = (data: SEOData) => {
  useEffect(() => {
    const {
      title,
      description,
      canonical = window.location.pathname,
      ogTitle = title,
      ogDescription = description,
    } = data;

    // Title
    document.title = `${title} | ST Custom Screen Printing`;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalTag) {
      canonicalTag.href = `${SITE_URL}${canonical}`;
    } else {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.href = `${SITE_URL}${canonical}`;
      document.head.appendChild(canonicalTag);
    }

    // Open Graph title
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', `${ogTitle} | ST Custom Screen Printing`);
    } else {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      ogTitleTag.setAttribute('content', `${ogTitle} | ST Custom Screen Printing`);
      document.head.appendChild(ogTitleTag);
    }

    // Open Graph description
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', ogDescription);
    } else {
      ogDescTag = document.createElement('meta');
      ogDescTag.setAttribute('property', 'og:description');
      ogDescTag.setAttribute('content', ogDescription);
      document.head.appendChild(ogDescTag);
    }

    // Open Graph URL
    let ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) {
      ogUrlTag.setAttribute('content', `${SITE_URL}${canonical}`);
    } else {
      ogUrlTag = document.createElement('meta');
      ogUrlTag.setAttribute('property', 'og:url');
      ogUrlTag.setAttribute('content', `${SITE_URL}${canonical}`);
      document.head.appendChild(ogUrlTag);
    }

    // Twitter title
    let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute('content', `${ogTitle} | ST Custom Screen Printing`);
    } else {
      twitterTitleTag = document.createElement('meta');
      twitterTitleTag.setAttribute('name', 'twitter:title');
      twitterTitleTag.setAttribute('content', `${ogTitle} | ST Custom Screen Printing`);
      document.head.appendChild(twitterTitleTag);
    }

    // Twitter description
    let twitterDescTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescTag) {
      twitterDescTag.setAttribute('content', ogDescription);
    } else {
      twitterDescTag = document.createElement('meta');
      twitterDescTag.setAttribute('name', 'twitter:description');
      twitterDescTag.setAttribute('content', ogDescription);
      document.head.appendChild(twitterDescTag);
    }
  }, [data.title, data.description, data.canonical]);
};
