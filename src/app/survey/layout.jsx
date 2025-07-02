// AdSense优化SEO元数据 - 银发族MBTI测试
export const metadata = {
  title: '银发族MBTI性格测试 | 中老年心理测试问卷 | 退休后自我发现',
  description: '专为60岁以上银发族设计的24题MBTI性格类型测试。退休后新生活和生活方式的专业心理分析。针对银发族定制化问题，提供精准性格诊断。',
  keywords: '银发族MBTI测试, 中老年心理测试, 60岁性格分析, 退休后心理检查, 银发族自我发现, 黄金年华性格诊断, 中老年心理咨询, 银发族生活指导',
  openGraph: {
    title: '银发族MBTI性格测试 - 24题了解您的性格类型',
    description: '专为60岁以上银发族设计的专业MBTI测试。通过24个简单问题了解您的性格类型和匹配度。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey',
    siteName: '银发族MBTI',
    images: [
      {
        url: '/images/senior-mbti-survey-zh.jpg',
        width: 1200,
        height: 630,
        alt: '银发族MBTI性格测试问卷 - 24题了解您的性格类型'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '银发族MBTI性格测试 - 24题了解您的性格类型',
    description: '专为60岁以上银发族设计的专业MBTI测试。通过24个简单问题了解您的性格类型和匹配度。',
    images: ['/images/senior-mbti-survey-zh.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey',
    languages: {
      'ko-KR': 'https://senior-mbti-qwnq47jj8-seniormbtis-projects.vercel.app/survey',
      'en-US': 'https://senior-mbti-l3zee5a4g-seniormbtis-projects.vercel.app/survey',
      'zh-CN': 'https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey',
      'ja-JP': 'https://senior-mbti-nkth90d1y-seniormbtis-projects.vercel.app/survey'
    }
  }
};

export default function SurveyLayout({ children }) {
  return (
    <>
      {/* Google AdSense脚本 */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossOrigin="anonymous"
      />
      
      {/* Google AdSense自动广告激活 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true,
              page_level_ads_config: {
                level: "minor"
              }
            });
          `
        }}
      />
      
      {/* 结构化数据 - 问卷Quiz Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "银发族MBTI性格类型测试",
            "description": "专为60岁以上中老年人设计的24题MBTI性格类型测试",
            "about": {
              "@type": "Thing",
              "name": "MBTI性格类型",
              "description": "迈尔斯-布里格斯性格类型指标"
            },
            "numberOfQuestions": 24,
            "timeRequired": "PT5M",
            "educationalLevel": "Adult",
            "audience": {
              "@type": "Audience",
              "audienceType": "银发族, 中老年人, 60岁以上"
            },
            "provider": {
              "@type": "Organization",
              "name": "银发族MBTI专业研究团队",
              "url": "https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "CNY",
              "availability": "https://schema.org/InStock"
            },
            "inLanguage": "zh-CN",
            "isAccessibleForFree": true,
            "learningResourceType": "Assessment",
            "assesses": [
              "性格类型",
              "MBTI性格分析",
              "人际关系匹配",
              "生活方式适配"
            ]
          })
        }}
      />
      
      {/* BreadcrumbList结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "银发族MBTI首页",
                "item": "https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "性格测试问卷",
                "item": "https://senior-mbti-k71r0f94e-seniormbtis-projects.vercel.app/survey"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}