'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import LanguageSelector from '../../../components/LanguageSelector';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    setMounted(true);
    
    // localStorage에서 결과 데이터 로드
    const resultId = params.id;
    if (resultId && typeof window !== 'undefined') {
      const storedData = localStorage.getItem(`mbti-result-${resultId}`);
      if (storedData) {
        setResultData(JSON.parse(storedData));
      }
    }
  }, [params.id]);

  // 完整的16个MBTI类型详细分析
  const mbtiTypes = {
    'INTJ': {
      type: 'INTJ',
      title: '银发族战略设计师',
      subtitle: '洞察未来的智慧战略家',
      emoji: '🔮',
      color: '#6366f1',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: '凭借丰富的人生阅历和深厚的智慧，您具备系统性和逻辑性的思维方式，拥有洞察未来的卓越能力。',
      strengths: ['卓越的战略思维', '独立判断能力', '系统性规划能力', '深刻的洞察力', '目标导向的执行力'],
      challenges: ['完美主义倾向', '情感表达困难', '过度批判性', '对变化的抗拒'],
      careers: ['咨询顾问', '研究员', '规划师', '作家', '投资专家'],
      relationships: '偏好少数值得信赖的深度关系，重视智力上的交流和共鸣。',
      scores: { E: 15, I: 85, S: 25, N: 75, T: 80, F: 20, J: 85, P: 15 }
    },
    'INTP': {
      type: 'INTP',
      title: '银发族思考学者',
      subtitle: '充满好奇心的知识探索者',
      emoji: '🤔',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      description: '通过终生的学习和探索，您积累了深厚的知识底蕴，享受探索新思想和理念的过程。',
      strengths: ['卓越的分析能力', '创造性思维', '逻辑推理能力', '强烈的求知欲', '客观判断力'],
      challenges: ['实际应用困难', '情感沟通不足', '犹豫不决', '忽视细节'],
      careers: ['研究员', '教授', '分析师', '哲学家', '发明家'],
      relationships: '偏好能够进行深度智力对话的伙伴，非常重视个人空间。',
      scores: { E: 20, I: 80, S: 30, N: 70, T: 75, F: 25, J: 35, P: 65 }
    },
    'ENTJ': {
      type: 'ENTJ',
      title: '银发族执行领导者',
      subtitle: '天生的组织领导者',
      emoji: '👑',
      color: '#059669',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
      description: '您是天生的领导者，具备卓越的组织能力和决策力，能够有效地指导和激励他人。',
      strengths: ['卓越的领导能力', '强烈的目标意识', '优秀的组织能力', '果断的决策力', '高效的执行力'],
      challenges: ['过于强势', '缺乏耐心', '忽视他人感受', '控制欲强'],
      careers: ['企业高管', '项目经理', '政府官员', '律师', '企业家'],
      relationships: '在关系中也倾向于承担领导角色，重视效率和目标导向的互动。',
      scores: { E: 85, I: 15, S: 30, N: 70, T: 80, F: 20, J: 85, P: 15 }
    },
    'ENTP': {
      type: 'ENTP',
      title: '银发族创新探索者',
      subtitle: '充满活力的创意发明家',
      emoji: '💡',
      color: '#dc2626',
      bgGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
      description: '您具备丰富的创造力和无穷的好奇心，善于发现新的可能性和机会。',
      strengths: ['创新思维', '高度适应性', '优秀的人际交往能力', '快速学习能力', '乐观积极'],
      challenges: ['难以坚持长期项目', '缺乏关注细节', '容易分心', '避免常规工作'],
      careers: ['创业家', '营销专家', '顾问', '演讲者', '创意总监'],
      relationships: '喜欢充满活力和刺激的关系，重视智力上的挑战和成长。',
      scores: { E: 80, I: 20, S: 25, N: 75, T: 70, F: 30, J: 30, P: 70 }
    },
    'INFJ': {
      type: 'INFJ',
      title: '银发族智慧守护者',
      subtitle: '温暖而有洞察力的理想主义者',
      emoji: '🌟',
      color: '#7c3aed',
      bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
      description: '您具备深刻的直觉和同理心，总是能够理解他人的需求并提供温暖的支持。',
      strengths: ['深刻的洞察力', '强烈的同理心', '理想主义精神', '创造性思维', '坚定的价值观'],
      challenges: ['过度理想化', '容易疲劳', '避免冲突', '完美主义'],
      careers: ['心理咨询师', '作家', '社会工作者', '教师', '宗教领袖'],
      relationships: '寻求深度的情感连接，重视相互理解和精神上的共鸣。',
      scores: { E: 25, I: 75, S: 30, N: 70, T: 35, F: 65, J: 75, P: 25 }
    },
    'INFP': {
      type: 'INFP',
      title: '银发族理想主义者',
      subtitle: '追求真实与和谐的调解者',
      emoji: '🕊️',
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #67e8f9 0%, #06b6d4 100%)',
      description: '您是真正的理想主义者，总是寻找生活中美好的一面，致力于让世界变得更美好。',
      strengths: ['强烈的价值观', '创造性表达', '深度同理心', '适应能力强', '真诚待人'],
      challenges: ['过于敏感', '缺乏实用性', '避免冲突', '自我批评'],
      careers: ['艺术家', '写作者', '心理学家', '非营利组织工作者', '音乐家'],
      relationships: '重视真诚和深度的情感连接，需要理解和接纳的环境。',
      scores: { E: 30, I: 70, S: 35, N: 65, T: 30, F: 70, J: 40, P: 60 }
    },
    'ENFJ': {
      type: 'ENFJ',
      title: '银发族人生导师',
      subtitle: '鼓舞人心的指导者',
      emoji: '🌈',
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      description: '您是天生的领导者和导师，总是能够激发他人的潜能，帮助他们实现个人成长。',
      strengths: ['卓越的人际技巧', '强烈的责任感', '鼓舞他人的能力', '组织协调能力', '理想主义'],
      challenges: ['过度奉献', '忽视自己需求', '过于理想化', '难以做艰难决定'],
      careers: ['教师', '培训师', '社区领导者', '心理咨询师', '人力资源专家'],
      relationships: '致力于帮助伴侣成长和发展，重视和谐的人际关系。',
      scores: { E: 75, I: 25, S: 35, N: 65, T: 25, F: 75, J: 70, P: 30 }
    },
    'ENFP': {
      type: 'ENFP',
      title: '银发族热情活动家',
      subtitle: '充满热情的鼓舞者',
      emoji: '🎭',
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
      description: '您是真正的自由精神，充满热情和创造力，总是能够给周围的人带来正能量。',
      strengths: ['强烈的热情', '卓越的人际关系', '创造性思维', '适应能力强', '乐观积极'],
      challenges: ['容易分心', '缺乏持久力', '过度敏感', '压力下表现不佳'],
      careers: ['艺术家', '演员', '营销专家', '社会活动家', '治疗师'],
      relationships: '寻求充满激情和成长的关系，重视情感上的连接和理解。',
      scores: { E: 80, I: 20, S: 30, N: 70, T: 35, F: 65, J: 35, P: 65 }
    },
    'ISTJ': {
      type: 'ISTJ',
      title: '银发族稳重管理者',
      subtitle: '可靠的传统守护者',
      emoji: '🏛️',
      color: '#374151',
      bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)',
      description: '您是社会的基石，具备强烈的责任感和可靠性，总是能够完成承诺的任务。',
      strengths: ['高度的责任感', '可靠性', '注重细节', '实用性强', '坚持不懈'],
      challenges: ['抗拒变化', '过于严格', '缺乏灵活性', '忽视他人情感'],
      careers: ['会计师', '管理员', '公务员', '工程师', '法官'],
      relationships: '重视稳定和承诺，倾向于传统的关系模式。',
      scores: { E: 20, I: 80, S: 80, N: 20, T: 70, F: 30, J: 85, P: 15 }
    },
    'ISFJ': {
      type: 'ISFJ',
      title: '银发族守护支持者',
      subtitle: '温暖的保护者',
      emoji: '🤗',
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
      description: '您是真正的利他主义者，总是准备保护和支持您所关心的人。',
      strengths: ['强烈的同理心', '可靠性', '细致入微', '支持他人', '忠诚度高'],
      challenges: ['过度自我牺牲', '避免冲突', '抗拒变化', '缺乏自信'],
      careers: ['护士', '教师', '社会工作者', '图书馆员', '人力资源'],
      relationships: '非常重视家庭和传统，总是将他人的需求放在首位。',
      scores: { E: 25, I: 75, S: 75, N: 25, T: 30, F: 70, J: 80, P: 20 }
    },
    'ESTJ': {
      type: 'ESTJ',
      title: '银发族执行管理者',
      subtitle: '高效的组织领导者',
      emoji: '📋',
      color: '#b91c1c',
      bgGradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      description: '您是优秀的管理者和组织者，具备将想法转化为行动的卓越能力。',
      strengths: ['卓越的组织能力', '强烈的责任感', '实用性强', '决策果断', '领导能力'],
      challenges: ['过于严格', '缺乏灵活性', '忽视他人感受', '抗拒变化'],
      careers: ['企业经理', '政府官员', '项目主管', '军事领导', '银行家'],
      relationships: '重视传统和稳定，倾向于在关系中承担领导责任。',
      scores: { E: 75, I: 25, S: 75, N: 25, T: 80, F: 20, J: 85, P: 15 }
    },
    'ESFJ': {
      type: 'ESFJ',
      title: '银发族社交协调者',
      subtitle: '温暖的人际关系专家',
      emoji: '💝',
      color: '#be185d',
      bgGradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      description: '您是真正的人民人，总是热心帮助他人，致力于创造和谐的环境。',
      strengths: ['优秀的人际技巧', '强烈的同理心', '组织协调能力', '忠诚可靠', '关爱他人'],
      challenges: ['过度关注他人认可', '避免冲突', '忽视自己需求', '对批评敏感'],
      careers: ['护士', '教师', '人力资源', '社会工作者', '活动策划'],
      relationships: '非常重视和谐的人际关系，总是努力满足他人的需求。',
      scores: { E: 80, I: 20, S: 70, N: 30, T: 25, F: 75, J: 75, P: 25 }
    },
    'ISTP': {
      type: 'ISTP',
      title: '银发族实践专家',
      subtitle: '灵活的问题解决者',
      emoji: '🔧',
      color: '#0d9488',
      bgGradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      description: '您是天生的工匠和问题解决者，具备实用的技能和冷静的判断力。',
      strengths: ['实用技能强', '适应能力强', '冷静分析', '独立性强', '危机处理能力'],
      challenges: ['情感表达困难', '缺乏长期规划', '避免承诺', '过于独立'],
      careers: ['工程师', '技师', '飞行员', '外科医生', '警察'],
      relationships: '重视行动胜过言语，通过实际行动表达关爱。',
      scores: { E: 30, I: 70, S: 80, N: 20, T: 75, F: 25, J: 25, P: 75 }
    },
    'ISFP': {
      type: 'ISFP',
      title: '银发族艺术家',
      subtitle: '温和的艺术创作者',
      emoji: '🎨',
      color: '#7c2d12',
      bgGradient: 'linear-gradient(135deg, #f97316 0%, #7c2d12 100%)',
      description: '您是真正的艺术家，具备敏锐的美感和深刻的情感表达能力。',
      strengths: ['艺术敏感性', '强烈的价值观', '适应能力强', '关爱他人', '创造性表达'],
      challenges: ['过于敏感', '避免冲突', '缺乏组织性', '自我批评'],
      careers: ['艺术家', '音乐家', '设计师', '治疗师', '环保主义者'],
      relationships: '重视深度的情感连接，需要理解和支持的环境。',
      scores: { E: 25, I: 75, S: 65, N: 35, T: 30, F: 70, J: 35, P: 65 }
    },
    'ESTP': {
      type: 'ESTP',
      title: '银发族活力实干家',
      subtitle: '充满活力的行动派',
      emoji: '⚡',
      color: '#ca8a04',
      bgGradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      description: '您是真正的实干家，总是准备迎接新的挑战和机会。',
      strengths: ['高度的适应性', '实际行动力', '人际交往能力', '危机处理能力', '乐观积极'],
      challenges: ['缺乏长期规划', '容易冲动', '避免理论学习', '忽视他人感受'],
      careers: ['销售代表', '企业家', '运动员', '急救人员', '娱乐业者'],
      relationships: '喜欢充满活力和刺激的关系，重视现在胜过未来。',
      scores: { E: 85, I: 15, S: 80, N: 20, T: 65, F: 35, J: 20, P: 80 }
    },
    'ESFP': {
      type: 'ESFP',
      title: '银发族欢乐使者',
      subtitle: '热情的娱乐者',
      emoji: '🎉',
      color: '#c026d3',
      bgGradient: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)',
      description: '您是天生的娱乐者，总是能够为周围的人带来欢乐和正能量。',
      strengths: ['强烈的热情', '优秀的人际关系', '实用性强', '适应能力强', '乐观积极'],
      challenges: ['容易分心', '避免冲突', '缺乏长期规划', '对批评敏感'],
      careers: ['演员', '销售人员', '活动策划', '社会工作者', '旅游向导'],
      relationships: '重视和谐快乐的关系，总是努力让每个人都感到快乐。',
      scores: { E: 80, I: 20, S: 75, N: 25, T: 30, F: 70, J: 30, P: 70 }
    }
  };

  if (!mounted) {
    return <div>加载中...</div>;
  }

  const currentType = resultData?.mbtiType || params.id?.toString().toUpperCase();
  const typeInfo = mbtiTypes[currentType];

  if (!typeInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">未找到结果</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: '性格概述', icon: '📋' },
    { id: 'strengths', label: '优势分析', icon: '💪' },
    { id: 'careers', label: '适合领域', icon: '💼' },
    { id: 'relationships', label: '人际关系', icon: '❤️' }
  ];

  const shareResult = () => {
    const shareText = `我的MBTI性格类型是 ${typeInfo.type} - ${typeInfo.title}！快来测试你的性格类型吧！`;
    if (navigator.share) {
      navigator.share({
        title: '银发族MBTI性格测试结果',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setShowShareDialog(true);
      setTimeout(() => setShowShareDialog(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: typeInfo.bgGradient }}>
      {/* 语言选择器 */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-6">
            <div className="text-6xl mb-4">{typeInfo.emoji}</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {typeInfo.type}
            </h1>
            <h2 className="text-2xl font-semibold text-white/90 mb-2">
              {typeInfo.title}
            </h2>
            <p className="text-lg text-white/80">
              {typeInfo.subtitle}
            </p>
          </div>

          {/* 分享按钮 */}
          <button
            onClick={shareResult}
            className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-medium"
          >
            分享我的结果 📤
          </button>
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">📋</span>
                性格概述
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {typeInfo.description}
              </p>
              
              {/* 性格维度分数 */}
              <div className="grid md:grid-cols-2 gap-6">
                {['E/I', 'S/N', 'T/F', 'J/P'].map((dimension) => {
                  const [first, second] = dimension.split('/');
                  const firstScore = typeInfo.scores[first];
                  const secondScore = typeInfo.scores[second];
                  const total = firstScore + secondScore;
                  const firstPercentage = (firstScore / total) * 100;
                  
                  return (
                    <div key={dimension} className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-800">{dimension} 维度</span>
                        <span className="text-sm text-gray-600">
                          {firstScore}% / {secondScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${firstPercentage}%`,
                            background: typeInfo.bgGradient
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>{first}</span>
                        <span>{second}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'strengths' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">💪</span>
                优势与挑战
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-green-600 mb-4">✅ 核心优势</h4>
                  <ul className="space-y-3">
                    {typeInfo.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-orange-600 mb-4">⚠️ 需要注意</h4>
                  <ul className="space-y-3">
                    {typeInfo.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'careers' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">💼</span>
                适合的领域
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {typeInfo.careers.map((career, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4"
                    style={{ borderLeftColor: typeInfo.color }}
                  >
                    <span className="font-medium text-gray-800">{career}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">💡 职业建议</h4>
                <p className="text-blue-700">
                  根据您的性格特点，建议选择能够发挥您天赋的领域。记住，最重要的是找到与您的价值观和兴趣相符的工作。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'relationships' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-3">❤️</span>
                人际关系
              </h3>
              
              <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-pink-800 mb-3">💝 关系特点</h4>
                <p className="text-pink-700 leading-relaxed">
                  {typeInfo.relationships}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">🤝 人际优势</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• 真诚的沟通方式</li>
                    <li>• 深度的情感连接</li>
                    <li>• 可靠的支持系统</li>
                    <li>• 相互尊重的关系</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 改善建议</h4>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• 保持开放的沟通</li>
                    <li>• 理解不同的观点</li>
                    <li>• 给予个人空间</li>
                    <li>• 表达感激之情</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="text-center mt-8 space-y-4">
          <button
            onClick={() => router.push('/')}
            className="bg-white/20 backdrop-blur-lg text-white px-8 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-medium mr-4"
          >
            重新测试
          </button>
          
          <button
            onClick={shareResult}
            className="bg-white text-gray-800 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
          >
            分享结果
          </button>
        </div>
      </div>

      {/* 分享提示 */}
      {showShareDialog && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
          ✅ 链接已复制到剪贴板！
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}