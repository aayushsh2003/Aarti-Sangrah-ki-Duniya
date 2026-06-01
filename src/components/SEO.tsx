import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
  keywords?: string;
  image?: string;
}

const SITE_NAME = "Aarti Sangrah ki Duniya";
const SITE_NAME_HI = "आरती संग्रह की दुनिया";
const BASE_URL = "https://aarti-sangrah-ki-duniya.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/preview.png`;
const DEFAULT_KEYWORDS = "aarti sangrah ki duniya, aarti sangrah, आरती संग्रह की दुनिया, आरती संग्रह, hindu aarti, ganesh aarti, shiv aarti, lakshmi aarti, hanuman chalisa, durga aarti, krishna aarti, ram aarti, sai baba aarti, aarti lyrics in hindi, hindi bhajan, devotional songs, daily aarti";

const SEO = ({
  title,
  description = "Complete collection of Hindu aartis with Hindi lyrics, English transliteration, translation & audio for Ganesh, Shiv, Lakshmi, Hanuman, Durga & more.",
  canonical,
  type = "website",
  jsonLd,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - ${SITE_NAME_HI}`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_NAME_HI,
    url: BASE_URL,
    description,
    inLanguage: ["hi", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="hi_IN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} - ${SITE_NAME_HI}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@aayushSh2003" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Hindi, English" />
      <meta name="geo.region" content="IN" />
      <meta name="revisit-after" content="3 days" />
      <meta name="author" content="Aayush Sharma" />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
