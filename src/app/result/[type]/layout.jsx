// 银发族MBTI人格类型关键词
const mbtiKeywords = {
  'INTJ': '建筑师INTJ, 银发族INTJ, 60+INTJ, 退休INTJ, INTJ性格, INTJ特点, INTJ职业, INTJ相性, INTJ关系',
  'INTP': '思想家INTP, 银发族INTP, 60+INTP, 退休INTP, INTP性格, INTP特点, INTP职业, INTP相性, INTP关系',
  'ENTJ': '指挥官ENTJ, 银发族ENTJ, 60+ENTJ, 退休ENTJ, ENTJ性格, ENTJ特点, ENTJ职业, ENTJ相性, ENTJ关系',
  'ENTP': '辩论家ENTP, 银发族ENTP, 60+ENTP, 退休ENTP, ENTP性格, ENTP特点, ENTP职业, ENTP相性, ENTP关系',
  'INFJ': '提倡者INFJ, 银发族INFJ, 60+INFJ, 退休INFJ, INFJ性格, INFJ特点, INFJ职业, INFJ相性, INFJ关系',
  'INFP': '调停者INFP, 银发族INFP, 60+INFP, 退休INFP, INFP性格, INFP特点, INFP职业, INFP相性, INFP关系',
  'ENFJ': '主人公ENFJ, 银发族ENFJ, 60+ENFJ, 退休ENFJ, ENFJ性格, ENFJ特点, ENFJ职业, ENFJ相性, ENFJ关系',
  'ENFP': '竞选者ENFP, 银发族ENFP, 60+ENFP, 退休ENFP, ENFP性格, ENFP特点, ENFP职业, ENFP相性, ENFP关系',
  'ISTJ': '物流师ISTJ, 银发族ISTJ, 60+ISTJ, 退休ISTJ, ISTJ性格, ISTJ特点, ISTJ职业, ISTJ相性, ISTJ关系',
  'ISFJ': '守护者ISFJ, 银发族ISFJ, 60+ISFJ, 退休ISFJ, ISFJ性格, ISFJ特点, ISFJ职业, ISFJ相性, ISFJ关系',
  'ESTJ': '总经理ESTJ, 银发族ESTJ, 60+ESTJ, 退休ESTJ, ESTJ性格, ESTJ特点, ESTJ职业, ESTJ相性, ESTJ关系',
  'ESFJ': '执政官ESFJ, 银发族ESFJ, 60+ESFJ, 退休ESFJ, ESFJ性格, ESFJ特点, ESFJ职业, ESFJ相性, ESFJ关系',
  'ISTP': '鉴赏家ISTP, 银发族ISTP, 60+ISTP, 退休ISTP, ISTP性格, ISTP特点, ISTP职业, ISTP相性, ISTP关系',
  'ISFP': '探险家ISFP, 银发族ISFP, 60+ISFP, 退休ISFP, ISFP性格, ISFP特点, ISFP职业, ISFP相性, ISFP关系',
  'ESTP': '企业家ESTP, 银发族ESTP, 60+ESTP, 退休ESTP, ESTP性格, ESTP特点, ESTP职业, ESTP相性, ESTP关系',
  'ESFP': '表演者ESFP, 银发族ESFP, 60+ESFP, 退休ESFP, ESFP性格, ESFP特点, ESFP职业, ESFP相性, ESFP关系'
};

// MBTI人格类型详细描述
const mbtiDescriptions = {
  'INTJ': '60+银发族INTJ建筑师人格类型详细分析。探索退休后INTJ系统性思维和独立生活方式偏好。了解他们的特点、优势和相性分析。',
  'INTP': '60+银发族INTP思想家人格类型详细分析。了解INTP在退休后保持的分析思维和知识好奇心。查看他们的特点、优势和相性分析。',
  'ENTJ': '60+银发族ENTJ指挥官人格类型详细分析。理解ENTJ在退休后仍保持的领导力和挑战精神。探索他们的特点、优势和相性分析。',
  'ENTP': '60+银发族ENTP辩论家人格类型详细分析。发现ENTP在退休中享受的创意思维和新挑战热爱。查看他们的特点、优势和相性分析。',
  'INFJ': '60+银发族INFJ提倡者人格类型详细分析。了解INFJ在退休时追求的深刻洞察和有意义关系。探索他们的特点、优势和相性分析。',
  'INFP': '60+银发族INFP调停者人格类型详细分析。理解INFP在退休后保持的价值驱动和自由精神天性。查看他们的特点、优势和相性分析。',
  'ENFJ': '60+银发族ENFJ主人公人格类型详细分析。发现ENFJ在退休时继续的关爱他人和社会贡献。探索他们的特点、优势和相性分析。',
  'ENFP': '60+银发族ENFP竞选者人格类型详细分析。了解ENFP即使在退休后仍保持的热情和积极能量。查看他们的特点、优势和相性分析。',
  'ISTJ': '60+银发族ISTJ物流师人格类型详细分析。理解ISTJ在退休时展现的责任感和系统化生活偏好。探索他们的特点、优势和相性分析。',
  'ISFJ': '60+银发族ISFJ守护者人格类型详细分析。发现ISFJ在退休时提供的专注和温暖关怀。查看他们的特点、优势和相性分析。',
  'ESTJ': '60+银发族ESTJ总经理人格类型详细分析。了解ESTJ即使在退休后仍展现的效率和组织技能。探索他们的特点、优势和相性分析。',
  'ESFJ': '60+银发族ESFJ执政官人格类型详细分析。理解ESFJ在退休时继续的温暖社交和关怀。查看他们的特点、优势和相性分析。',
  'ISTP': '60+银发族ISTP鉴赏家人格类型详细分析。发现ISTP在退休时偏好的实用和逻辑方法。探索他们的特点、优势和相性分析。',
  'ISFP': '60+银发族ISFP探险家人格类型详细分析。了解ISFP在退休后保持的艺术感和自由精神天性。查看他们的特点、优势和相性分析。',
  'ESTP': '60+银发族ESTP企业家人格类型详细分析。理解ESTP在退休时过的专注当下享受和积极生活方式。探索他们的特点、优势和相性分析。',
  'ESFP': '60+银发族ESFP表演者人格类型详细分析。发现ESFP即使在退休后仍享受的快乐和社交活动。查看他们的特点、优势和相性分析。'
};

export async function generateMetadata({ params }) {
  const resultId = params.type.toUpperCase();
  const keywords = mbtiKeywords[resultId] || `${resultId}, MBTI结果, 银发族MBTI, 性格类型, MBTI相性, 黄金年华`;
  const description = mbtiDescriptions[resultId] || `${resultId} 性格类型的详细分析结果。了解与您相配和需要磨合的MBTI类型，为您余生寻找理想的人生伴侣。`;
  
  return {
    title: `银发族MBTI ${resultId} 性格类型结果 | 60+ ${resultId} 特点及相性分析`,
    description,
    keywords,
    openGraph: {
      title: `银发族MBTI结果 - ${resultId} 类型`,
      description: `${resultId} 性格类型详细分析结果。了解与您相配和需要磨合的MBTI类型，建立有意义的关系。`,
      type: 'website',
      locale: 'zh_CN',
      url: `https://cn.seniormbti.com/result/${resultId}`,
      siteName: '银发族MBTI',
    },
    twitter: {
      card: 'summary_large_image',
      title: `银发族MBTI结果 - ${resultId} 类型`,
      description: `${resultId} 性格类型详细分析结果。了解与您相配和需要磨合的MBTI类型，建立有意义的关系。`,
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
  }
}

export default function ResultLayout({ children, params }) {
  const resultId = params.type.toUpperCase();
  
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3506846365049386"
        crossOrigin="anonymous"
      />
      
      {/* 结构化数据 - TestResults Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TestResults",
            "name": `银发族MBTI ${resultId} 性格类型结果`,
            "description": mbtiDescriptions[resultId] || `${resultId} 性格类型结果`,
            "result": {
              "@type": "PsychologicalTrait",
              "name": `MBTI ${resultId} 类型`,
              "description": `迈尔斯-布里格斯性格类型 ${resultId}`
            },
            "mainEntity": {
              "@type": "Person",
              "description": `具有${resultId}性格类型的银发族`
            },
            "provider": {
              "@type": "Organization",
              "name": "银发族MBTI专业研究团队",
              "url": "https://cn.seniormbti.com"
            },
            "datePublished": new Date().toISOString(),
            "inLanguage": "zh-CN",
            "isAccessibleForFree": true
          })
        }}
      />
      
      {/* BreadcrumbList 结构化数据 */}
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
                "item": "https://cn.seniormbti.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "性格测试问卷调查",
                "item": "https://cn.seniormbti.com/survey"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": `${resultId} 类型结果`,
                "item": `https://cn.seniormbti.com/result/${resultId.toLowerCase()}`
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}