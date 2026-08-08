import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, seoConfig } from "../data/seo";

const BASE_URL = "https://bpn.07032004.xyz";

export default function Seo() {
  const { pathname } = useLocation();

  const seo = seoConfig[pathname] || DEFAULT_SEO;
  const url = BASE_URL + pathname;

  return (
    <Helmet prioritizeSeoTags>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
