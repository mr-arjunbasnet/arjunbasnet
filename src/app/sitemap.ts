import { MetadataRoute } from "next";

const siteUrl = "https://arjun-basnet.com.np";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/research`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
