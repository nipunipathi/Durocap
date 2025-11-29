import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterImage?: string;
  canonical?: string;
}

export default function SEO({
  title = "Durocap Roofing Solutions | Roofing Sheets & Accessories Kerala",
  description = "Trusted roofing sheet suppliers in Kerala. We deliver durable roofing materials, accessories, and custom roofing solutions for homes and commercial buildings.",
  keywords = "Roofing Kerala, Roofing sheets, Metal roofing, Durocap, Roofing solutions India, Roofing materials thiruvanthapuram, TVM",
  ogImage = "https://durocap.com/og-image.jpg",
  ogUrl = "https://durocap.com/",
  twitterImage = "https://durocap.com/twitter-image.jpg",
  canonical,
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={twitterImage} />
    </Helmet>
  );
}
