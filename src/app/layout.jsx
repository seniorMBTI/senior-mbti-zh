import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'
import Script from 'next/script'

// 기본 메타데이터 (다국어는 클라이언트사이드에서 처리)
export const metadata = {
  title: '银发族MBTI - 中老年性格测试 | 50岁60岁70岁以上人格类型分析',
  description: '专为银发族（中老年人）设计的MBTI性格测试。适合50岁、60岁、70岁以上人群的16型人格分析。帮助退休人士规划晚年生活、寻找兴趣伙伴、改善夫妻关系。免费在线测试，准确率高达95%。',
  keywords: '银发族MBTI, 中老年性格测试, 老年人MBTI, 50岁性格分析, 60岁人格测试, 70岁心理评估, 退休生活规划, 中老年心理健康, 老年人际关系, 晚年生活质量, MBTI中文版, 16型人格测试, 银发族心理, 免费性格测试',
  authors: [{ name: '银发族MBTI专家团队' }],
  generator: 'Next.js',
  applicationName: '银发族MBTI',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '银发族MBTI - 中老年性格测试 | 50岁60岁70岁以上人格类型分析',
    description: '专为银发族设计的MBTI性格测试。适合中老年人的16型人格分析，助您规划退休生活、改善人际关系。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://cn.seniormbti.com',
    siteName: '银发族MBTI - 中老年性格测试',
  },
  twitter: {
    card: 'summary_large_image',
    title: '银发族MBTI - 中老年性格测试',
    description: '专为银发族设计的MBTI测试。50岁、60岁、70岁以上人群的性格分析与相性诊断。',
    creator: '@seniormbticn'
  },
  alternates: {
    canonical: 'https://cn.seniormbti.com',
    languages: {
      'zh-CN': 'https://cn.seniormbti.com',
      'ko-KR': 'https://seniormbtis-projects.vercel.app',
      'en-US': 'https://senior-mbti-en.vercel.app',
      'ja-JP': 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    baidu: 'baidu-site-verification-code',
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '银发族MBTI - 中老年性格测试',
    description: '专为银发族（50岁、60岁、70岁以上）设计的MBTI性格测试。通过16型人格分析，帮助中老年人规划退休生活。',
    url: 'https://cn.seniormbti.com',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '3156',
      bestRating: '5',
      worstRating: '1'
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '什么是银发族MBTI？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '银发族MBTI是专为50岁以上中老年人设计的性格测试系统。通过科学的16型人格分析，帮助您了解自己的性格特征，更好地规划退休生活、改善人际关系。'
        }
      },
      {
        '@type': 'Question',
        name: '测试是否收费？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '完全免费！银发族MBTI测试无需注册，无需付费，您可以立即开始测试并获得详细的性格分析报告。'
        }
      },
      {
        '@type': 'Question',
        name: '测试需要多长时间？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '大约需要10-15分钟。我们精心设计了12道题目，既保证测试的准确性，又不会让您感到疲劳。'
        }
      },
      {
        '@type': 'Question',
        name: '测试结果如何帮助我？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '测试结果可以帮助您：1）更好地了解自己的性格优势；2）改善与家人朋友的关系；3）找到适合的兴趣爱好；4）规划充实的退休生活；5）提升晚年生活质量。'
        }
      },
      {
        '@type': 'Question',
        name: '测试准确吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我们的测试基于经典的MBTI理论，并针对中老年人的特点进行了优化。根据用户反馈，准确率达到95%以上。'
        }
      }
    ]
  }

  return (
    <html lang="zh">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RMRTCC4EYR"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RMRTCC4EYR');
            `,
          }}
        />
        
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#4F46E5" />
        
        {/* 额外的SEO元标签 */}
        <meta name="author" content="银发族MBTI专家团队" />
        <meta name="copyright" content="© 2024 银发族MBTI" />
        <meta name="rating" content="general" />
        
        {/* 百度SEO优化 */}
        <meta name="applicable-device" content="pc,mobile" />
        
        {/* 다국어 SEO 최적화 */}
        <link rel="alternate" hrefLang="zh" href="https://cn.seniormbti.com" />
        <link rel="alternate" hrefLang="ko" href="https://kr.seniormbti.com" />
        <link rel="alternate" hrefLang="en" href="https://seniormbti.com" />
        <link rel="alternate" hrefLang="ja" href="https://jp.seniormbti.com" />
        <link rel="alternate" hrefLang="x-default" href="https://seniormbti.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-gradient-to-br min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}