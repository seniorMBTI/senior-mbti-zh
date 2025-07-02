export default function sitemap() {
  const baseUrl = 'https://k71r0f94e.vercel.app';
  
  // 基础页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/survey`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 16种MBTI性格类型结果页面
  const mbtiTypes = [
    'intj', 'intp', 'entj', 'entp', // NT（分析家）
    'infj', 'infp', 'enfj', 'enfp', // NF（外交官）
    'istj', 'isfj', 'estj', 'esfj', // SJ（管理者）
    'istp', 'isfp', 'estp', 'esfp'  // SP（探索者）
  ];

  const resultPages = mbtiTypes.map(type => ({
    url: `${baseUrl}/result/${type}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 其他相关页面（为将来实现预留）
  const additionalPages = [
    {
      url: `${baseUrl}/compatibility`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lifestyle`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...resultPages, ...additionalPages];
}