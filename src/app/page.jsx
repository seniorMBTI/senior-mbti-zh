'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 언어별 타이틀 동적 설정
  useEffect(() => {
    const titles = {
      ko: '시니어 MBTI - 성격 유형 테스트',
      en: 'Senior MBTI - Personality Type Test',
      zh: '银发族MBTI - 性格类型测试',
      ja: 'シニアMBTI - 성격タイプテスト'
    };
    
    if (typeof document !== 'undefined') {
      document.title = titles[language] || titles.ko;
    }
  }, [language]);

  const handleStartTest = () => {
    setIsStarting(true);
    setTimeout(() => {
      router.push('/survey');
    }, 500);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const features = [
    {
      icon: '⏱️',
      titleKey: 'landing.time.title',
      descKey: 'landing.time.desc'
    },
    {
      icon: '💡',
      titleKey: 'landing.method.title', 
      descKey: 'landing.method.desc'
    },
    {
      icon: '🎯',
      titleKey: 'landing.types.title',
      descKey: 'landing.types.desc'
    },
    {
      icon: '🔒',
      titleKey: 'landing.privacy.title',
      descKey: 'landing.privacy.desc'
    }
  ];

  return (
    <div className="landing-container">
      {/* SEO 최적화 메인 헤더 */}
      <header className="seo-header">
        <h1 className="visually-hidden">银发族MBTI | 中老年性格类型测试 | 退休后人生规划指南</h1>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
          </div>
        </div>

        <div className="container">
          {/* Language Selector */}
          <div className="language-selector-wrapper">
            <LanguageSelector />
          </div>

          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">✨ 60岁+ 银发族专属性格分析</span>
            </div>
            
            <h2 className="hero-title">
              <span className="title-highlight">银发族MBTI性格类型测试</span>
            </h2>
            
            <p className="hero-tagline">
              为退休后的新生活和理想人际关系提供专业心理分析
            </p>
            
            <p className="hero-description">
              专为60岁以上中老年人特别设计的MBTI性格类型测试，帮您找到最适合的人生伴侣。通过免费心理测试，发现黄金年代人生的新可能性。
            </p>
            
            <div className="hero-seo-hook">
              <p className="seo-hook-main">
                <strong>🔍 确认我的MBTI并找到相性最佳的MBTI类型！</strong>
              </p>
              <p className="seo-hook-sub">
                在今后的人生中，找到与您性格相合的人生伴侣！为银发族的生活方式提供专业的个性化相性分析。
              </p>
            </div>

            <div className="cta-section">
              <button
                onClick={handleStartTest}
                disabled={isStarting}
                className={`cta-button ${isStarting ? 'cta-button-loading' : ''}`}
                aria-label={isStarting ? t('landing.starting') : t('landing.start')}
              >
                <span className="cta-icon">🚀</span>
                <span className="cta-text">
                  {isStarting ? t('landing.starting') : t('landing.start')}
                </span>
                {isStarting && (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
              
              <div className="trust-indicators">
                <span className="trust-item">
                  <span className="trust-icon">👥</span>
                  <span className="trust-text">100% 匿名</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">🏆</span>
                  <span className="trust-text">专家制作</span>
                </span>
                <span className="trust-item">
                  <span className="trust-icon">⚡</span>
                  <span className="trust-text">2分钟完成</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">
              银发族MBTI为中老年人特别的原因
            </h2>
            <p className="features-subtitle">
              专为60岁以上退休后的人生设计的专业性格分析和生活方式指南
            </p>
            <div className="seo-benefits">
              <h3 className="seo-benefits-title">银发族专属MBTI测试的特别优势</h3>
              <ul className="benefits-list">
                <li>✅ <strong>中老年心理专家</strong>设计的银发族专项问题</li>
                <li>✅ <strong>退休后人生规划</strong>的个性化建议提供</li>
                <li>✅ <strong>60岁以上人际关系</strong>改善的相性分析</li>
                <li>✅ <strong>黄金年华生活方式</strong>优化的性格解读</li>
                <li>✅ <strong>银发族健康管理</strong>相关的生活指南</li>
              </ul>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card card-${index + 1}`}>
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="feature-description">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MBTI Compatibility Showcase Section */}
      <section className="compatibility-showcase-section">
        <div className="container">
          <div className="showcase-header">
            <h2 className="showcase-title">
              💕 MBTI相性分析预览
            </h2>
            <p className="showcase-subtitle">
              提前确认与您最佳匹配和相冲的MBTI类型
            </p>
          </div>

          <div className="compatibility-examples">
            <div className="example-card best-match-example">
              <div className="example-header">
                <h3 className="example-title">💖 最佳匹配示例</h3>
                <p className="example-subtitle">INTJ × ENFP 组合</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">策略家</div>
                  <div className="mbti-traits">
                    <span className="trait">系统思维</span>
                    <span className="trait">独立性强</span>
                    <span className="trait">长期规划</span>
                  </div>
                </div>
                <div className="compatibility-indicator">
                  <div className="heart-icon">💖</div>
                  <div className="compatibility-text">完美和谐</div>
                </div>
                <div className="mbti-card enfp-card">
                  <div className="mbti-type">ENFP</div>
                  <div className="mbti-name">活动家</div>
                  <div className="mbti-traits">
                    <span className="trait">热情洋溢</span>
                    <span className="trait">富有创意</span>
                    <span className="trait">善于社交</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>系统化的INTJ和创意型的ENFP相互补充优势，基于深度理解形成关系。</p>
              </div>
            </div>

            <div className="example-card challenging-match-example">
              <div className="example-header">
                <h3 className="example-title">💛 需要理解的示例</h3>
                <p className="example-subtitle">INTJ × ESFJ 组合</p>
              </div>
              <div className="mbti-cards">
                <div className="mbti-card intj-card">
                  <div className="mbti-type">INTJ</div>
                  <div className="mbti-name">策略家</div>
                  <div className="mbti-traits">
                    <span className="trait">逻辑思维</span>
                    <span className="trait">独立性强</span>
                    <span className="trait">计划性强</span>
                  </div>
                </div>
                <div className="compatibility-indicator challenging">
                  <div className="heart-icon">💛</div>
                  <div className="compatibility-text">需要努力</div>
                </div>
                <div className="mbti-card esfj-card">
                  <div className="mbti-type">ESFJ</div>
                  <div className="mbti-name">执政官</div>
                  <div className="mbti-traits">
                    <span className="trait">体贴关怀</span>
                    <span className="trait">善于社交</span>
                    <span className="trait">合作精神</span>
                  </div>
                </div>
              </div>
              <div className="compatibility-reason">
                <p>虽然有着不同的处事方式，但通过相互理解和关怀可以建立平衡的关系。</p>
              </div>
            </div>
          </div>

          <div className="showcase-cta">
            <button
              onClick={handleStartTest}
              className="showcase-cta-button"
            >
              <span>🎯</span>
              确认我的MBTI与相性
            </button>
          </div>
        </div>
      </section>

      {/* Sample Question Section */}
      <section className="sample-section">
        <div className="container">
          <div className="sample-card">
            <div className="sample-header">
              <h3 className="sample-title">
                {t('landing.questions.title')}
              </h3>
            </div>
            <div className="sample-content">
              <div className="sample-question">
                <h4 className="question-label">
                  {t('landing.questions.example')}
                </h4>
                <p className="question-text">
                  {t('landing.questions.sample')}
                </p>
              </div>
              <div className="sample-choices">
                <div className="choice-option choice-a">
                  <span className="choice-label">A</span>
                  <span className="choice-text">
                    {t('landing.questions.choice1')}
                  </span>
                </div>
                <div className="choice-option choice-b">
                  <span className="choice-label">B</span>
                  <span className="choice-text">
                    {t('landing.questions.choice2')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO 컨텐츠 섹션 */}
      <section className="seo-content-section">
        <div className="container">
          <div className="seo-content">
            <h2 className="seo-content-title">老年人MBTI性格类型测试完整指南</h2>
            
            <div className="content-grid">
              <div className="content-block">
                <h3>💎 什么是老年人MBTI？</h3>
                <p>老年人MBTI是专为60岁以上中老年人的独特人生经历和价值观而特别开发的性格类型测试。与一般MBTI不同，它考虑到退休后的生活、健康管理、家庭关系、社会角色变化等老年人面临的特殊情况，提供心理分析。</p>
              </div>
              
              <div className="content-block">
                <h3>🎯 退休后人生规划的新起点</h3>
                <p>退休不是人生的终点，而是新的开始。通过老年人MBTI准确了解自己的性格类型，发现能让黄金时期生活更加丰富的活动、爱好和人际关系。为中老年人提供定制化的生活方式指南。</p>
              </div>
              
              <div className="content-block">
                <h3>💕 老年人相性分析的科学依据</h3>
                <p>基于60年以上人生经验的性格分析更加准确和深入。老年人MBTI帮助您找到最适合的伴侣、朋友和活动伙伴。基于科学验证的心理学理论，提供可靠的相性分析。</p>
              </div>
            </div>
            
            <div className="faq-section">
              <h3 className="faq-title">常见问题 (FAQ)</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4 className="faq-question">Q: 老年人MBTI测试真的免费吗？</h4>
                  <p className="faq-answer">A: 是的，完全免费。您可以无需注册或付费，直接参加测试，结果分析和相性信息都是免费提供的。</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 一般MBTI与老年人MBTI的区别是什么？</h4>
                  <p className="faq-answer">A: 老年人MBTI专门考虥60岁以上中老年人的特殊人生阶段。它反映了退休、健康管理、家庭关系变化等老年人特有情况的问题和解释。</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 测试需要多长时间？</h4>
                  <p className="faq-answer">A: 大约5分钟左右。由24个简单问题组成，您可以轻松完成。</p>
                </div>
                
                <div className="faq-item">
                  <h4 className="faq-question">Q: 结果有多准确？</h4>
                  <p className="faq-answer">A: 这是由心理学专家和老年生活专家共同开发的经过验证的测试。通过数千名老年测试者验证了其可靠性。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MBTI 유형별 내부 링크 섹션 */}
      <section className="internal-links-section">
        <div className="container">
          <div className="internal-links-header">
            <h2 className="internal-links-title">
              🔍 探索六种MBTI性格类型
            </h2>
            <p className="internal-links-subtitle">
              与您相似性格的老年人有什么特点呢？
            </p>
          </div>
          
          <div className="mbti-grid">
            <div className="mbti-category analyst">
              <h3 className="category-title">💼 分析家群体 (NT)</h3>
              <div className="mbti-types">
                <a href="/result/intj" className="mbti-link intj">
                  <span className="mbti-code">INTJ</span>
                  <span className="mbti-name">战略家</span>
                  <span className="mbti-desc">系统性思维和独立生活</span>
                </a>
                <a href="/result/intp" className="mbti-link intp">
                  <span className="mbti-code">INTP</span>
                  <span className="mbti-name">思考者</span>
                  <span className="mbti-desc">分析性思维和智力好奇心</span>
                </a>
                <a href="/result/entj" className="mbti-link entj">
                  <span className="mbti-code">ENTJ</span>
                  <span className="mbti-name">统率者</span>
                  <span className="mbti-desc">领导力和挑战精神</span>
                </a>
                <a href="/result/entp" className="mbti-link entp">
                  <span className="mbti-code">ENTP</span>
                  <span className="mbti-name">发明家</span>
                  <span className="mbti-desc">创意思维和新挑战</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category diplomat">
              <h3 className="category-title">🌈 外交家群体 (NF)</h3>
              <div className="mbti-types">
                <a href="/result/infj" className="mbti-link infj">
                  <span className="mbti-code">INFJ</span>
                  <span className="mbti-name">倡导者</span>
                  <span className="mbti-desc">深刻的洞察力和有意义的关系</span>
                </a>
                <a href="/result/infp" className="mbti-link infp">
                  <span className="mbti-code">INFP</span>
                  <span className="mbti-name">中介者</span>
                  <span className="mbti-desc">对价值观忠实和自由的灵魂</span>
                </a>
                <a href="/result/enfj" className="mbti-link enfj">
                  <span className="mbti-code">ENFJ</span>
                  <span className="mbti-name">先导者</span>
                  <span className="mbti-desc">对他人的关心和社会贡献</span>
                </a>
                <a href="/result/enfp" className="mbti-link enfp">
                  <span className="mbti-code">ENFP</span>
                  <span className="mbti-name">活动家</span>
                  <span className="mbti-desc">热情和积极的能量</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category sentinel">
              <h3 className="category-title">🛡️ 管理者群体 (SJ)</h3>
              <div className="mbti-types">
                <a href="/result/istj" className="mbti-link istj">
                  <span className="mbti-code">ISTJ</span>
                  <span className="mbti-name">管理者</span>
                  <span className="mbti-desc">责任感和系统性生活</span>
                </a>
                <a href="/result/isfj" className="mbti-link isfj">
                  <span className="mbti-code">ISFJ</span>
                  <span className="mbti-name">守护者</span>
                  <span className="mbti-desc">奉献和温暖的关怀</span>
                </a>
                <a href="/result/estj" className="mbti-link estj">
                  <span className="mbti-code">ESTJ</span>
                  <span className="mbti-name">督导者</span>
                  <span className="mbti-desc">高效和组织能力</span>
                </a>
                <a href="/result/esfj" className="mbti-link esfj">
                  <span className="mbti-code">ESFJ</span>
                  <span className="mbti-name">执政官</span>
                  <span className="mbti-desc">温暖的社交和关怀</span>
                </a>
              </div>
            </div>
            
            <div className="mbti-category explorer">
              <h3 className="category-title">🎭 探险家群体 (SP)</h3>
              <div className="mbti-types">
                <a href="/result/istp" className="mbti-link istp">
                  <span className="mbti-code">ISTP</span>
                  <span className="mbti-name">工匠</span>
                  <span className="mbti-desc">实用和逻辑性方法</span>
                </a>
                <a href="/result/isfp" className="mbti-link isfp">
                  <span className="mbti-code">ISFP</span>
                  <span className="mbti-name">冒险家</span>
                  <span className="mbti-desc">艺术感和自由的灵魂</span>
                </a>
                <a href="/result/estp" className="mbti-link estp">
                  <span className="mbti-code">ESTP</span>
                  <span className="mbti-name">企业家</span>
                  <span className="mbti-desc">享受当下和积极的生活</span>
                </a>
                <a href="/result/esfp" className="mbti-link esfp">
                  <span className="mbti-code">ESFP</span>
                  <span className="mbti-name">表演者</span>
                  <span className="mbti-desc">享受快乐和社交活动</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="related-links">
            <h3 className="related-title">老年生活相关信息</h3>
            <div className="related-grid">
              <a href="/mbti-compatibility" className="related-link">
                <span className="related-icon">💕</span>
                <span className="related-text">MBTI相性分析指南</span>
              </a>
              <a href="/senior-lifestyle" className="related-link">
                <span className="related-icon">🌿</span>
                <span className="related-text">老年生活方式提示</span>
              </a>
              <a href="/retirement-planning" className="related-link">
                <span className="related-icon">🏡</span>
                <span className="related-text">退休后人生规划</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2 className="final-cta-title">
              现在就开始！您的老年MBTI之旅
            </h2>
            <p className="final-cta-description">
              免费获取能让您60岁以上黄金年华更加丰富的性格分析
            </p>
            <button
              onClick={handleStartTest}
              disabled={isStarting}
              className={`final-cta-button ${isStarting ? 'final-cta-loading' : ''}`}
            >
              <span className="final-cta-icon">✨</span>
              <span className="final-cta-text">
                {isStarting ? '测试开始中...' : '开始免费老年MBTI测试'}
              </span>
            </button>
            <div className="final-guarantees">
              <span className="guarantee-item">✅ 完全免费</span>
              <span className="guarantee-item">✅ 2分钟完成</span>
              <span className="guarantee-item">✅ 即时结果</span>
              <span className="guarantee-item">✅ 隐私保护</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.9) 0%, 
            rgba(118, 75, 162, 0.9) 100%);
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 25%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .language-selector-wrapper {
          position: relative;
          z-index: 999999;
          display: flex;
          justify-content: flex-end;
          padding: 24px 0;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-text {
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          color: white;
          margin: 0 0 24px 0;
          line-height: 1.1;
        }

        .title-highlight {
          background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        .hero-tagline {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 24px 0;
          font-weight: 500;
          line-height: 1.4;
        }

        .hero-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 48px 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cta-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
          transform: translateY(0);
          min-width: 280px;
          justify-content: center;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
        }

        .cta-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
          transform: translateY(0);
        }

        .cta-icon {
          font-size: 24px;
        }

        .loading-spinner {
          margin-left: 8px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .trust-indicators {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          font-weight: 600;
        }

        .trust-icon {
          font-size: 16px;
        }

        /* Features Section */
        .features-section {
          background: white;
          padding: 100px 0;
        }

        .features-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .features-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .features-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: white;
          border-radius: 24px;
          padding: 40px 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #F3F4F6;
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-1 { border-top: 4px solid #FF6B6B; }
        .card-2 { border-top: 4px solid #4ECDC4; }
        .card-3 { border-top: 4px solid #45B7D1; }
        .card-4 { border-top: 4px solid #96CEB4; }

        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #F8FAFC, #E2E8F0);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          font-size: 36px;
        }

        .feature-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 16px 0;
        }

        .feature-description {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Sample Section */
        .sample-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .sample-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .sample-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          padding: 32px 40px;
          text-align: center;
        }

        .sample-title {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .sample-content {
          padding: 40px;
        }

        .sample-question {
          margin-bottom: 32px;
        }

        .question-label {
          color: #4F46E5;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .question-text {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin: 0;
          line-height: 1.5;
        }

        .sample-choices {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .choice-option {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #F8FAFC;
          border: 2px solid #E5E7EB;
          border-radius: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .choice-option:hover {
          border-color: #4F46E5;
          background: #EEF2FF;
        }

        .choice-label {
          width: 32px;
          height: 32px;
          background: #4F46E5;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }

        .choice-text {
          font-size: 16px;
          color: #374151;
          font-weight: 500;
          line-height: 1.5;
        }

        /* SEO Header */
        .seo-header {
          position: absolute;
          top: 0;
          left: 0;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* SEO Benefits */
        .seo-benefits {
          margin-top: 40px;
          padding: 32px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 16px;
          border-left: 4px solid #667eea;
        }

        .seo-benefits-title {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 20px;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .benefits-list li {
          font-size: 16px;
          color: #374151;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        /* SEO Content Section */
        .seo-content-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .seo-content-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          text-align: center;
          margin-bottom: 60px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .content-block {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #667eea;
        }

        .content-block h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .content-block p {
          font-size: 16px;
          color: #374151;
          line-height: 1.7;
          margin: 0;
        }

        /* FAQ Section */
        .faq-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .faq-title {
          font-size: 32px;
          font-weight: 800;
          color: #1F2937;
          text-align: center;
          margin-bottom: 40px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .faq-item {
          padding: 24px;
          background: #F8FAFC;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .faq-question {
          font-size: 18px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .faq-answer {
          font-size: 16px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        /* Final CTA Section */
        .final-cta-section {
          background: linear-gradient(135deg, #1F2937 0%, #374151 100%);
          padding: 100px 0;
          text-align: center;
        }

        .final-cta-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 20px 0;
          line-height: 1.3;
        }

        .final-cta-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .final-guarantees {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .guarantee-item {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
        }

        .final-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(45deg, #F59E0B, #EAB308);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 20px 40px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        }

        .final-cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(245, 158, 11, 0.6);
        }

        .final-cta-icon {
          font-size: 24px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }

          .hero-content {
            padding: 20px 0;
          }

          .features-section,
          .sample-section,
          .final-cta-section {
            padding: 60px 0;
          }

          .features-grid {
            gap: 24px;
          }

          .feature-card {
            padding: 32px 24px;
          }

          .sample-content {
            padding: 32px 24px;
          }

          .trust-indicators {
            gap: 16px;
          }

          .choice-option {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        /* Hero SEO Hook Styles */
        .hero-seo-hook {
          margin: 24px 0;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .seo-hook-main {
          font-size: 18px;
          color: white;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .seo-hook-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.6;
        }

        /* Compatibility Showcase Section */
        .compatibility-showcase-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .showcase-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .showcase-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.6;
        }

        .compatibility-examples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .example-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease;
        }

        .example-card:hover {
          transform: translateY(-8px);
        }

        .example-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .example-title {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .example-subtitle {
          font-size: 16px;
          color: #6B7280;
          margin: 0;
        }

        .mbti-cards {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
        }

        .mbti-card {
          flex: 1;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .mbti-type {
          font-size: 24px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .mbti-name {
          font-size: 16px;
          color: #374151;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .mbti-traits {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
        }

        .trait {
          font-size: 12px;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .compatibility-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }

        .heart-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .compatibility-text {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          text-align: center;
        }

        .compatibility-indicator.challenging .compatibility-text {
          color: #D97706;
        }

        .compatibility-reason {
          padding: 16px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .compatibility-reason p {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        .showcase-cta {
          text-align: center;
        }

        .showcase-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .showcase-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
        }

        /* Mobile responsiveness for new sections */
        @media (max-width: 768px) {
          .hero-seo-hook {
            margin: 16px 0;
            padding: 16px;
          }

          .seo-hook-main {
            font-size: 16px;
          }

          .seo-hook-sub {
            font-size: 14px;
          }

          .compatibility-showcase-section {
            padding: 60px 0;
          }

          .showcase-title {
            font-size: 28px;
          }

          .showcase-subtitle {
            font-size: 16px;
          }

          .compatibility-examples {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 40px;
          }

          .example-card {
            padding: 24px;
          }

          .mbti-cards {
            flex-direction: column;
            gap: 12px;
          }

          .compatibility-indicator {
            min-width: auto;
            flex-direction: row;
            gap: 8px;
          }

          .heart-icon {
            font-size: 24px;
            margin-bottom: 0;
          }

          /* SEO Content Mobile */
          .seo-content-section {
            padding: 60px 0;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 60px;
          }

          .content-block {
            padding: 24px;
          }

          .faq-section {
            padding: 24px;
          }

          .faq-item {
            padding: 20px;
          }

          .final-guarantees {
            gap: 12px;
          }

          .benefits-list li {
            font-size: 14px;
          }

          .seo-benefits {
            padding: 24px;
          }
        }

        /* 내부 링크 섹션 */
        .internal-links-section {
          background: #F8FAFC;
          padding: 100px 0;
        }

        .internal-links-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .internal-links-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          color: #1F2937;
          margin-bottom: 16px;
        }

        .internal-links-subtitle {
          font-size: 18px;
          color: #6B7280;
          margin: 0;
          line-height: 1.6;
        }

        .mbti-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .mbti-category {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }

        .mbti-category:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .mbti-category.analyst {
          border-top: 4px solid #8B5CF6;
        }

        .mbti-category.diplomat {
          border-top: 4px solid #F59E0B;
        }

        .mbti-category.sentinel {
          border-top: 4px solid #3B82F6;
        }

        .mbti-category.explorer {
          border-top: 4px solid #10B981;
        }

        .category-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 24px;
          text-align: center;
        }

        .mbti-types {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mbti-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          background: #F8FAFC;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          color: inherit;
        }

        .mbti-link:hover {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
          border-color: #667eea;
          transform: translateX(4px);
        }

        .mbti-code {
          font-size: 18px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mbti-name {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .mbti-desc {
          font-size: 12px;
          color: #6B7280;
          line-height: 1.4;
        }

        .related-links {
          text-align: center;
        }

        .related-title {
          font-size: 28px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 32px;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .related-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: white;
          border: 2px solid #E5E7EB;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .related-link:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .related-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .related-text {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        /* 내부 링크 모바일 반응형 */
        @media (max-width: 768px) {
          .internal-links-section {
            padding: 60px 0;
          }

          .mbti-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 60px;
          }

          .mbti-category {
            padding: 24px;
          }

          .related-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .related-link {
            padding: 20px;
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        /* Animation for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .floating-circle,
          .cta-button,
          .feature-card,
          .choice-option,
          .final-cta-button,
          .example-card,
          .showcase-cta-button,
          .mbti-category,
          .mbti-link,
          .related-link {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}