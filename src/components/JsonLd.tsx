import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const createBlogPostingSchema = ({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  publisherName,
  publisherLogo,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherLogo: string;
  keywords?: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    keywords: keywords?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
};

export const createWebSiteSchema = ({
  name,
  description,
  url,
  authorName,
}: {
  name: string;
  description: string;
  url: string;
  authorName: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    description: description,
    url: url,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

export const createBreadcrumbSchema = ({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const createPersonSchema = ({
  name,
  url,
  imageUrl,
  jobTitle,
  description,
  sameAs,
}: {
  name: string;
  url: string;
  imageUrl: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    url: url,
    image: imageUrl,
    jobTitle: jobTitle,
    description: description,
    sameAs: sameAs,
  };
};
