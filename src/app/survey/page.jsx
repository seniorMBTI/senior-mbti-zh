'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function SurveyPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const { t } = useLanguage();

  // 银发族优化24道题目 (2选1)
  const questions = [
    // E/I 维度 - 6道题
    {
      id: 1,
      category: 'E/I',
      text: '平时您更喜欢与朋友或熟人如何度过时间？',
      choices: [
        { id: 'A', text: '和很多人聚在一起聊天活动比较好', type: 'E' },
        { id: 'B', text: '和少数关系亲密的人安静地交谈比较舒服', type: 'I' }
      ]
    },
    {
      id: 2,
      category: 'E/I',
      text: '一天结束感到疲倦时，您如何转换心情？',
      choices: [
        { id: 'A', text: '和家人或朋友对话，一起度过时间', type: 'E' },
        { id: 'B', text: '拥有独处的时间，安静地休息', type: 'I' }
      ]
    },
    {
      id: 3,
      category: 'E/I',
      text: '遇到新朋友时，您是什么样子？',
      choices: [
        { id: 'A', text: '主动走过去打招呼，开始对话', type: 'E' },
        { id: 'B', text: '等对方先开口说话', type: 'I' }
      ]
    },
    {
      id: 4,
      category: 'E/I',
      text: '周末或节假日您更喜欢什么样的活动？',
      choices: [
        { id: 'A', text: '和朋友或家人一起外出或参加聚会', type: 'E' },
        { id: 'B', text: '在家读书、看电影等独自享受的事情', type: 'I' }
      ]
    },
    {
      id: 5,
      category: 'E/I',
      text: '您对电话通话的偏好如何？',
      choices: [
        { id: 'A', text: '喜欢通过电话聊天，经常通话', type: 'E' },
        { id: 'B', text: '除非紧急事情，否则更喜欢通过文字或消息联系', type: 'I' }
      ]
    },
    {
      id: 6,
      category: 'E/I',
      text: '在讲座或聚会上您是什么样子？',
      choices: [
        { id: 'A', text: '积极发言，与其他人分享意见', type: 'E' },
        { id: 'B', text: '主要是倾听，仔细思考后再说话', type: 'I' }
      ]
    },
    
    // S/N 维度 - 6道题
    {
      id: 7,
      category: 'S/N',
      text: '学习新东西时，您更喜欢哪种方式？',
      choices: [
        { id: 'A', text: '通过具体的事实和实际经验逐步学习', type: 'S' },
        { id: 'B', text: '先把握整体的意义和可能性', type: 'N' }
      ]
    },
    {
      id: 8,
      category: 'S/N',
      text: '解决问题时您喜欢哪种方法？',
      choices: [
        { id: 'A', text: '运用过去的经验和已验证的方法', type: 'S' },
        { id: 'B', text: '寻找新的想法和创造性的解决方案', type: 'N' }
      ]
    },
    {
      id: 9,
      category: 'S/N',
      text: '聊天时您更喜欢什么话题？',
      choices: [
        { id: 'A', text: '分享日常的具体故事或实用信息', type: 'S' },
        { id: 'B', text: '分享对未来的梦想或哲学思考', type: 'N' }
      ]
    },
    {
      id: 10,
      category: 'S/N',
      text: '制定旅行计划时您更重视什么？',
      choices: [
        { id: 'A', text: '喜欢去过的地方或知名景点', type: 'S' },
        { id: 'B', text: '期待第一次去的地方或意外的发现', type: 'N' }
      ]
    },
    {
      id: 11,
      category: 'S/N',
      text: '工作时您更喜欢哪种方式？',
      choices: [
        { id: 'A', text: '逐步进行，检查细节', type: 'S' },
        { id: 'B', text: '把握整体流程，先画大方向', type: 'N' }
      ]
    },
    {
      id: 12,
      category: 'S/N',
      text: '读书或看电影时您更喜欢什么内容？',
      choices: [
        { id: 'A', text: '喜欢现实的、处理实际经验的内容', type: 'S' },
        { id: 'B', text: '喜欢刺激想象力、展现新世界的内容', type: 'N' }
      ]
    },
    
    // T/F 维度 - 6道题
    {
      id: 13,
      category: 'T/F',
      text: '做重要决定时，您认为什么最重要？',
      choices: [
        { id: 'A', text: '基于客观事实和逻辑分析进行判断', type: 'T' },
        { id: 'B', text: '优先考虑相关人员的心情和关系', type: 'F' }
      ]
    },
    {
      id: 14,
      category: 'T/F',
      text: '当别人犯错时您如何回应？',
      choices: [
        { id: 'A', text: '专注于问题的原因和解决方案并指出', type: 'T' },
        { id: 'B', text: '关注对方的心情，先给予鼓励和安慰', type: 'F' }
      ]
    },
    {
      id: 15,
      category: 'T/F',
      text: '在争论或冲突情况下您采取什么态度？',
      choices: [
        { id: 'A', text: '基于事实和逻辑做出公正的判断', type: 'T' },
        { id: 'B', text: '关注所有人的心情，努力达成和谐', type: 'F' }
      ]
    },
    {
      id: 16,
      category: 'T/F',
      text: '给别人建议时您用什么方式帮助？',
      choices: [
        { id: 'A', text: '提出对未来有帮助的实用解决方案', type: 'T' },
        { id: 'B', text: '共感对方的情感，给予安慰和鼓励', type: 'F' }
      ]
    },
    {
      id: 17,
      category: 'T/F',
      text: '评价别人时您认为什么更重要？',
      choices: [
        { id: 'A', text: '冷静评价那个人的能力、成果和客观成就', type: 'T' },
        { id: 'B', text: '首先考虑那个人的意图、努力和人性的一面', type: 'F' }
      ]
    },
    {
      id: 18,
      category: 'T/F',
      text: '决定重要事情时您更重视什么标准？',
      choices: [
        { id: 'A', text: '重视公正性、原则和一致性标准', type: 'T' },
        { id: 'B', text: '优先考虑人性情感和个人情况', type: 'F' }
      ]
    },
    
    // J/P 维度 - 6道题
    {
      id: 19,
      category: 'J/P',
      text: '您更喜欢如何管理日常生活？',
      choices: [
        { id: 'A', text: '提前制定计划，按照日程系统性地进行', type: 'J' },
        { id: 'B', text: '根据情况灵活应对，让一切自然进行', type: 'P' }
      ]
    },
    {
      id: 20,
      category: 'J/P',
      text: '还有未完成的工作时心情如何？',
      choices: [
        { id: 'A', text: '想要快点结束，心情不舒服很在意', type: 'J' },
        { id: 'B', text: '不用着急，慢慢进行也没关系', type: 'P' }
      ]
    },
    {
      id: 21,
      category: 'J/P',
      text: '对约定或计划您怎么看？',
      choices: [
        { id: 'A', text: '认为约定是必须遵守的重要承诺', type: 'J' },
        { id: 'B', text: '认为是可以根据情况改变的灵活指南', type: 'P' }
      ]
    },
    {
      id: 22,
      category: 'J/P',
      text: '去旅行时您喜欢什么风格？',
      choices: [
        { id: 'A', text: '事先预订好行程、住宿和景点再出发', type: 'J' },
        { id: 'B', text: '只制定大概计划，在旅行地即兴决定', type: 'P' }
      ]
    },
    {
      id: 23,
      category: 'J/P',
      text: '进行工作时您更喜欢哪种方式？',
      choices: [
        { id: 'A', text: '从第一步到最后按顺序逐步进行', type: 'J' },
        { id: 'B', text: '从我想做的部分开始自由地进行', type: 'P' }
      ]
    },
    {
      id: 24,
      category: 'J/P',
      text: '需要做选择的情况下您是什么样子？',
      choices: [
        { id: 'A', text: '充分思考后决定就不再改变', type: 'J' },
        { id: 'B', text: '拖延选择，在最后时刻才决定的情况很多', type: 'P' }
      ]
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = '银发族MBTI性格测试';
    }
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const handleNext = () => {
    if (selectedChoice) {
      const newAnswers = [...answers, {
        questionId: questions[currentQuestion].id,
        choice: selectedChoice.id,
        type: selectedChoice.type,
        category: questions[currentQuestion].category
      }];
      
      setAnswers(newAnswers);
      setSelectedChoice(null);

      if (currentQuestion === questions.length - 1) {
        // 测试完成，计算结果
        calculateAndRedirect(newAnswers);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedChoice(null);
    }
  };

  const calculateAndRedirect = async (finalAnswers) => {
    setIsSubmitting(true);
    
    try {
      // 计算MBTI类型
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      
      finalAnswers.forEach(answer => {
        scores[answer.type]++;
      });

      const mbtiType = 
        (scores.E > scores.I ? 'E' : 'I') +
        (scores.S > scores.N ? 'S' : 'N') +
        (scores.T > scores.F ? 'T' : 'F') +
        (scores.J > scores.P ? 'J' : 'P');

      // 生成结果ID
      const resultId = Date.now().toString();
      
      // 保存到localStorage
      const resultData = {
        mbtiType,
        scores,
        answers: finalAnswers,
        completedAt: new Date().toISOString(),
        language: 'zh'
      };
      
      localStorage.setItem(`mbti-result-${resultId}`, JSON.stringify(resultData));
      
      // 重定向到结果页面
      router.push(`/result/${resultId}`);
      
    } catch (error) {
      console.error('Error calculating results:', error);
      alert('结果计算出现错误，请重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="survey-container">
      {/* 进度条 */}
      <div className="progress-header">
        <div className="progress-info">
          <span className="progress-text">第 {currentQuestion + 1} 题 / 共 {questions.length} 题</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 问题卡片 */}
      <div className="question-card">
        <div className="question-category">
          {currentQ.category} 维度 · 第 {currentQuestion + 1} 题
        </div>
        
        <h2 className="question-text">
          {currentQ.text}
        </h2>

        <div className="choices-container">
          {currentQ.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice-button ${selectedChoice?.id === choice.id ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(choice)}
            >
              <div className="choice-label">{choice.id}</div>
              <div className="choice-text">{choice.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="navigation-buttons">
        <button
          className="nav-button prev-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          上一题
        </button>
        
        <button
          className="nav-button next-button"
          onClick={handleNext}
          disabled={!selectedChoice || isSubmitting}
        >
          {isSubmitting ? '计算中...' : 
           currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}
        </button>
      </div>

      <style jsx>{`
        .survey-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .survey-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .progress-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          position: relative;
          z-index: 10;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .progress-text {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          background: linear-gradient(45deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .progress-percent {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(45deg, #4F46E5, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: rgba(229, 231, 235, 0.8);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899);
          border-radius: 12px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 0 20px rgba(79, 70, 229, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }

        .question-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          padding: 48px;
          margin-bottom: 32px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          flex: 1;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .question-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.5), transparent);
        }

        .question-category {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 32px;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .question-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: categoryShine 3s infinite;
        }

        @keyframes categoryShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .question-text {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #1F2937, #4F46E5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.3;
          margin-bottom: 48px;
          position: relative;
        }

        .choices-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .choice-button {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(229, 231, 235, 0.8);
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .choice-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .choice-button:hover {
          border-color: rgba(79, 70, 229, 0.5);
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(79, 70, 229, 0.15),
            0 0 0 1px rgba(79, 70, 229, 0.1);
        }

        .choice-button:hover::before {
          opacity: 1;
        }

        .choice-button.selected {
          border-color: #4F46E5;
          background: linear-gradient(135deg, 
            rgba(238, 242, 255, 0.9), 
            rgba(243, 232, 255, 0.9));
          box-shadow: 
            0 0 0 2px rgba(79, 70, 229, 0.3),
            0 20px 40px rgba(79, 70, 229, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transform: translateY(-2px) scale(1.01);
        }

        .choice-button.selected::before {
          opacity: 1;
        }

        .choice-label {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
        }

        .choice-label::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2));
        }

        .choice-text {
          font-size: 20px;
          font-weight: 600;
          color: #374151;
          line-height: 1.5;
          flex: 1;
        }

        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          z-index: 10;
        }

        .nav-button {
          flex: 1;
          padding: 20px 32px;
          border: none;
          border-radius: 20px;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .prev-button {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #6B7280;
          border: 2px solid rgba(229, 231, 235, 0.8);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .prev-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.95);
          border-color: #D1D5DB;
          color: #374151;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
        }

        .prev-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .next-button {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          box-shadow: 
            0 8px 25px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .next-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .next-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #4338CA, #6D28D9);
          transform: translateY(-4px);
          box-shadow: 
            0 16px 40px rgba(79, 70, 229, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .next-button:hover:not(:disabled)::before {
          opacity: 1;
        }

        .next-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .survey-container {
            padding: 16px;
          }

          .progress-header {
            padding: 24px;
            margin-bottom: 24px;
          }

          .question-card {
            padding: 32px 24px;
          }

          .question-text {
            font-size: 26px;
          }

          .choice-button {
            padding: 24px 20px;
            gap: 20px;
          }

          .choice-label {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .choice-text {
            font-size: 18px;
          }

          .navigation-buttons {
            flex-direction: column;
            gap: 16px;
          }

          .nav-button {
            font-size: 18px;
            padding: 18px 24px;
          }
        }

        /* 无障碍支持 */
        @media (prefers-reduced-motion: reduce) {
          .choice-button,
          .nav-button,
          .progress-fill,
          .question-category::before,
          .progress-fill::after {
            animation: none;
            transition: none;
          }
        }

        /* 高对比度模式 */
        @media (prefers-contrast: high) {
          .choice-button {
            border-width: 3px;
          }
          
          .choice-button.selected {
            border-width: 4px;
          }
          
          .progress-header,
          .question-card {
            border-width: 2px;
          }
        }

        /* 深色模式支持 */
        @media (prefers-color-scheme: dark) {
          .progress-header,
          .question-card {
            background: rgba(17, 24, 39, 0.95);
            border-color: rgba(75, 85, 99, 0.3);
          }
          
          .choice-button {
            background: rgba(31, 41, 55, 0.9);
            border-color: rgba(75, 85, 99, 0.5);
          }
          
          .choice-text {
            color: #E5E7EB;
          }
          
          .progress-text {
            color: #E5E7EB;
          }
        }
      `}</style>
    </div>
  );
}