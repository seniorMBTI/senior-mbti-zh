'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

// MBTI 유형별 상성 정보 - moved outside component
const mbtiCompatibility = {
  'INTJ': {
    bestMatch: ['ENFP', 'ENTP', 'INFJ'],
    goodMatch: ['INTJ', 'INFP', 'ENTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'INTP': {
    bestMatch: ['ENFJ', 'ENTJ', 'INFJ'],
    goodMatch: ['INTP', 'ENTP', 'INTJ'],
    challengingMatch: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  'ENTJ': {
    bestMatch: ['INFP', 'INTP', 'ENFP'],
    goodMatch: ['ENTJ', 'INTJ', 'ENTP'],
    challengingMatch: ['ISFP', 'INFP', 'ESFP']
  },
  'ENTP': {
    bestMatch: ['INFJ', 'INTJ', 'ENFJ'],
    goodMatch: ['ENTP', 'ENFP', 'ENTJ'],
    challengingMatch: ['ISTJ', 'ISFJ', 'ESTJ']
  },
  'INFJ': {
    bestMatch: ['ENTP', 'ENFP', 'INTJ'],
    goodMatch: ['INFJ', 'INFP', 'ENFJ'],
    challengingMatch: ['ESTP', 'ESFP', 'ISTP']
  },
  'INFP': {
    bestMatch: ['ENFJ', 'ENTJ', 'ENFP'],
    goodMatch: ['INFP', 'INFJ', 'ISFP'],
    challengingMatch: ['ESTJ', 'ENTJ', 'ESTP']
  },
  'ENFJ': {
    bestMatch: ['INFP', 'ISFP', 'INTP'],
    goodMatch: ['ENFJ', 'ENFP', 'INFJ'],
    challengingMatch: ['ISTP', 'ESTP', 'ISTJ']
  },
  'ENFP': {
    bestMatch: ['INTJ', 'INFJ', 'ENFJ'],
    goodMatch: ['ENFP', 'ENTP', 'INFP'],
    challengingMatch: ['ISTJ', 'ESTJ', 'ISTP']
  },
  'ISTJ': {
    bestMatch: ['ESFP', 'ESTP', 'ISFP'],
    goodMatch: ['ISTJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['ENFP', 'ENTP', 'INFP']
  },
  'ISFJ': {
    bestMatch: ['ESFP', 'ESTP', 'ENFP'],
    goodMatch: ['ISFJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['ENTP', 'ENTJ', 'INTP']
  },
  'ESTJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESTJ', 'ISTJ', 'ESFJ'],
    challengingMatch: ['INFP', 'ENFP', 'INTP']
  },
  'ESFJ': {
    bestMatch: ['ISFP', 'INFP', 'ISTP'],
    goodMatch: ['ESFJ', 'ISFJ', 'ESTJ'],
    challengingMatch: ['INTP', 'INTJ', 'ENTP']
  },
  'ISTP': {
    bestMatch: ['ESFJ', 'ESTJ', 'ENFJ'],
    goodMatch: ['ISTP', 'ESTP', 'ISFP'],
    challengingMatch: ['ENFJ', 'INFJ', 'ENFP']
  },
  'ISFP': {
    bestMatch: ['ENFJ', 'ESFJ', 'ESTJ'],
    goodMatch: ['ISFP', 'INFP', 'ESFP'],
    challengingMatch: ['ENTJ', 'ESTJ', 'ENTP']
  },
  'ESTP': {
    bestMatch: ['ISFJ', 'ISTJ', 'INFJ'],
    goodMatch: ['ESTP', 'ESFP', 'ISTP'],
    challengingMatch: ['INFJ', 'INTJ', 'INFP']
  },
  'ESFP': {
    bestMatch: ['ISTJ', 'ISFJ', 'INTJ'],
    goodMatch: ['ESFP', 'ENFP', 'ISFP'],
    challengingMatch: ['INTJ', 'ENTJ', 'INTP']
  }
};

// 완전한 16개 MBTI 유형 데이터 (중국어 번역) - moved outside component
const mbtiTypes = {
  'INTJ': {
    type: 'INTJ',
    title: '银发族战略设计师',
    subtitle: '洞察未来的智慧战略家',
    description: '凭借丰富的人生阅历和深厚的智慧，您具备系统性和逻辑性的思维方式，拥有洞察未来的卓越能力。',
    strengths: ['卓越的战略思维', '独立判断能力', '系统性规划能力', '深刻的洞察力', '目标导向的执行力'],
    challenges: ['完美主义倾向', '情感表达困难', '过度批判性', '对变化的抗拒'],
    careers: ['咨询顾问', '研究员', '规划师', '作家', '投资专家'],
    relationships: '偏好少数值得信赖的深度关系，重视智力上的交流和共鸣。',
    seniorTips: ['定期进行智力活动以保持大脑健康', '通过阅读和学习维持认知功能', '制定长期计划来实现目标', '与志同道合的人建立深度联系'],
    healthTips: ['通过规律读书保持认知功能', '适度的体力活动改善血液循环', '充足的睡眠对大脑健康至关重要', '社交活动有助于精神健康'],
    emoji: '🔮',
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  'INTP': {
    type: 'INTP', 
    title: '银发族思考学者',
    subtitle: '充满好奇心的知识探索者',
    description: '通过终生的学习和探索，您积累了深厚的知识底蕴，享受探索新思想和理念的过程。',
    strengths: ['卓越的分析能力', '创造性思维', '逻辑推理能力', '强烈的求知欲', '客观判断力'],
    challenges: ['实际应用困难', '情感沟通不足', '犹豫不决', '忽视细节'],
    careers: ['研究员', '教授', '分析师', '哲学家', '发明家'],
    relationships: '偏好能够进行深度智力对话的伙伴，非常重视个人空间。',
    seniorTips: ['保持对新知识的好奇心和学习热情', '通过研究兴趣领域保持头脑活跃', '与具有相似兴趣的人建立联系', '记录并整理您的想法和见解'],
    healthTips: ['定期进行深度阅读以刺激大脑', '通过解谜游戏保持认知敏锐', '适度运动以改善血液循环', '保持充足睡眠以促进思维清晰'],
    emoji: '🤔',
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)'
  },
  'ENTJ': {
    type: 'ENTJ',
    title: '银发族执行领导者',
    subtitle: '经验丰富的领导典范',
    description: '凭借丰富的经验积累的领导力，您能够引导周围的人，为实现明确的目标而系统性地行动。',
    strengths: ['强大的领导力', '战略性思维', '果断决策力', '组织运营能力', '高效执行力'],
    challenges: ['过于强硬', '缺乏情感考虑', '权威主义倾向', '忽视细节'],
    careers: ['企业高管', '项目经理', '讲师', '顾问', '团体领导'],
    relationships: '追求目标导向且能够相互成长的关系，偏好坦诚的沟通。',
    seniorTips: ['通过指导年轻人分享您的经验和智慧', '参与社区活动发挥领导作用', '制定清晰的长期计划并坚持执行', '与他人合作实现共同目标'],
    healthTips: ['保持规律的运动习惯以维持活力', '通过团体活动促进社交健康', '定期体检以预防疾病', '适度工作避免过度压力'],
    emoji: '👑',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
  },
  'ENTP': {
    type: 'ENTP',
    title: '银发族创新家',
    subtitle: '创意思想的源泉',
    description: '基于丰富的经验，您不断创造新的想法，通过变化和创新获得活力。',
    strengths: ['创造性构想', '适应能力', '说服力', '挑战精神', '广泛的兴趣'],
    challenges: ['注意力不集中', '缺乏一致性', '忽视细节', '现实性不足'],
    careers: ['创业家', '发明家', '演讲者', '策划师', '文化艺术活动家'],
    relationships: '享受与能够提供智力刺激的各种人的交流，喜欢分享新想法。',
    seniorTips: ['不断探索新的兴趣领域保持活力', '与年轻人交流获得新鲜想法', '通过创新项目发挥创造力', '参与多样化的社交活动'],
    healthTips: ['通过多样化活动保持身心活跃', '学习新技能以刺激大脑发展', '保持乐观心态促进身心健康', '定期户外活动增进健康'],
    emoji: '💡',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
  },
  'INFJ': {
    type: 'INFJ',
    title: '银发族智者',
    subtitle: '具有深刻洞察力的人生导师',
    description: '凭借一生积累的深刻洞察力，您致力于理解和帮助他人，追求有意义的价值。',
    strengths: ['深刻的洞察力', '同理心', '理想主义', '献身精神', '创造性思维'],
    challenges: ['过度完美主义', '倦怠风险', '回避冲突', '现实性不足'],
    careers: ['心理咨询师', '教育工作者', '作家', '社会志愿者', '艺术家'],
    relationships: '追求真诚的深度关系，真心希望对方的成长和幸福。',
    seniorTips: ['通过写作或艺术创作表达内心想法', '为年轻人提供人生指导和智慧', '参与有意义的志愿活动', '保持内省习惯促进个人成长'],
    healthTips: ['通过冥想或瑜珈缓解内心压力', '保持充足睡眠以维持情绪平衡', '适度的社交活动促进精神健康', '定期体检关注身体健康'],
    emoji: '🌟',
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
  },
  'INFP': {
    type: 'INFP',
    title: '银发族调解者',
    subtitle: '温暖心灵的和平主义者',
    description: '凭借对人类终生的深刻理解，您致力于创造和谐的环境，珍视个人的价值和信念。',
    strengths: ['高度同理心', '创造性', '追求个人价值', '适应力', '追求和谐'],
    challenges: ['过度理想主义', '回避冲突', '优柔寡断', '现实逃避'],
    careers: ['作家', '艺术家', '心理咨询师', '教育工作者', '社会工作者'],
    relationships: '重视真实且有意义的关系，尊重对方的个性和价值。',
    seniorTips: ['通过创作活动表达个人情感和价值观', '参与和平和慈善活动传播爱心', '为他人提供情感支持和理解', '始终保持内心平静和平衡'],
    healthTips: ['通过艺术活动缓解情绪压力', '保持与亲友的深度联系', '定期户外散步接触大自然', '通过静思或冥想保持心灵平静'],
    emoji: '🕊️',
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)'
  },
  'ENFJ': {
    type: 'ENFJ',
    title: '银发族人生导师',
    subtitle: '温暖心灵的人生指导者',
    description: '基于丰富的人生经验，您帮助他人成长，为社区的和谐与发展而奉献。',
    strengths: ['卓越的沟通能力', '对他人的关心', '领导力', '同理心', '激励能力'],
    challenges: ['自我牺牲倾向', '对批评敏感', '过度干预', '难以设定界限'],
    careers: ['教育工作者', '心理咨询师', '社会志愿者', '讲师', '宗教人士'],
    relationships: '以引导他人潜力和帮助其成长为乐，创造温暖且支持性的关系。',
    seniorTips: ['利用您的经验培养后辈或经营教育项目', '参与社区发展活动或委员会', '从事帮助弱势邻居的志愿活动'],
    healthTips: ['注意不要在帮助他人时过度伸展自己', '确保自己的时间和空间以进行充电', '通过定期运动和社交活动维持活力'],
    emoji: '🌻',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)'
  },
  'ENFP': {
    type: 'ENFP',
    title: '银发族活动家',
    subtitle: '充满热情的人生鼓舞者',
    description: '以满溢的热情和正能量给周围的人带来灵感，在发现和实现新可能性方面表现卓越。',
    strengths: ['卓越的沟通', '创造性问题解决', '热情和活力', '激励他人', '适应力'],
    challenges: ['注意力不集中', '缺乏一致性', '过度乐观主义', '实务处理困难'],
    careers: ['演讲者', '文化策划人', '心理咨询师', '教育工作者', '艺术家'],
    relationships: '与各种人分享能量，偏好相互给予灵感的活力关系。',
    seniorTips: ['通过与多样的人群会面和交流获得活力', '开始新的爱好或活动以获得持续刺激', '以积极的能量激励他人发挥作用'],
    healthTips: ['通过积极的社交活动预防孤独和抑郁', '通过各种身体活动维持健康并释放能量', '通过新的体验和挑战保持大脑活跃'],
    emoji: '🎪',
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
  },
  'ISTJ': {
    type: 'ISTJ',
    title: '银发族守护者',
    subtitle: '值得信赖的传统守护者',
    description: '凭借终生的诚实和责任感，您是周围人可靠的依靠，追求稳定且系统性的生活。',
    strengths: ['高度责任感', '系统性方法', '可靠性', '细致入微', '耐心'],
    challenges: ['对变化的抵制', '缺乏灵活性', '情感表达困难', '难以接受新想法'],
    careers: ['管理人员', '会计师', '公务员', '教育工作者', '专业技术人员'],
    relationships: '重视基于信任和稳定性的长期深度关系，认为遵守承诺很重要。',
    seniorTips: ['将通过长期经验积累的专业知识传授给后辈', '维持稳定且系统的日常生活', '发挥传统价值和智慧的保存和传承作用'],
    healthTips: ['通过规律的生活模式稳定身体节律', '通过渐进式变化适应新环境', '通过定期健康检查专注于预防医学'],
    emoji: '🏛️',
    color: '#374151',
    bgGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)'
  },
  'ISFJ': {
    type: 'ISFJ',
    title: '银发族保护者',
    subtitle: '温暖心灵的守护者',
    description: '凭借终生的奉献和服务照顾家庭和社区，拥有优先考虑他人需要的温暖之心。',
    strengths: ['卓越的照护能力', '细心关怀', '责任感', '合作态度', '重视传统'],
    challenges: ['缺乏自我主张', '过度自我牺牲', '难以适应变化', '回避冲突'],
    careers: ['护理人员', '社会工作者', '教育工作者', '心理咨询师', '宗教人士'],
    relationships: '以细心关怀和支持对方为乐，追求稳定且值得信赖的关系。',
    seniorTips: ['通过为家庭和社区的照护活动获得满足感', '将传统料理或手工艺技能传授给年轻一代', '在安静和平的环境中维持稳定的日常生活'],
    healthTips: ['避免过度自我牺牲，也要照顾好自己的健康', '充分休息以减少压力', '通过与亲近的人的情感纽带获得心理稳定'],
    emoji: '🤱',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  },
  'ESTJ': {
    type: 'ESTJ',
    title: '银发族管理者',
    subtitle: '经验丰富的组织支柱',
    description: '凭借丰富经验积累的组织运营能力，您创造和管理高效的系统，追求实用且现实的方法。',
    strengths: ['卓越的组织力', '实用性思维', '领导力', '果断力', '责任感'],
    challenges: ['顽固', '缺乏情感考虑', '抵制变化', '拘泥于细节'],
    careers: ['管理人员', '企业家', '公务员', '教育行政人员', '团体运营者'],
    relationships: '偏好基于明确角色和责任的系统性关系，重视相互尊重和信任。',
    seniorTips: ['利用组织运营经验担任团体或组织的顾问', '考虑创造高效系统和程序的咨询活动', '以实用的问题解决能力为社区做贡献'],
    healthTips: ['避免过度压力，平衡工作和休息', '通过定期运动管理身心健康', '通过缓解完美主义倾向减少心理负担'],
    emoji: '📊',
    color: '#b91c1c',
    bgGradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
  },
  'ESFJ': {
    type: 'ESFJ',
    title: '银发族协调者',
    subtitle: '社区温暖的中心',
    description: '凭借丰富的人际关系经验促进社区和谐，细心关怀让所有人都感到舒适和幸福。',
    strengths: ['卓越的人际关系', '合作态度', '责任感', '实用性帮助', '追求和谐'],
    challenges: ['对批评敏感', '冲突压力', '缺乏自我主张', '难以适应变化'],
    careers: ['教育工作者', '心理咨询师', '社会志愿者', '活动策划人', '服务业'],
    relationships: '重视创造所有人都被包容和珍视的温暖和谐关系。',
    seniorTips: ['利用团结人群和创造和谐的能力策划聚会或活动', '在帮助各代之间沟通方面发挥桥梁作用', '基于温暖的关系维持人际网络'],
    healthTips: ['设定适当的界限以避免过度压力', '通过积极的社交活动获得精神满足', '追求远离冲突情况的和平环境'],
    emoji: '🤗',
    color: '#d97706',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  'ISTP': {
    type: 'ISTP',
    title: '银发族工匠',
    subtitle: '实用智慧的拥有者',
    description: '凭借终生的实务经验具备实用的问题解决能力，享受亲手制作和修理的过程。',
    strengths: ['卓越的问题解决力', '实用性思维', '手工技能', '独立性', '沉着冷静'],
    challenges: ['情感表达困难', '缺乏长期规划', '团队合作困难', '常规工作无聊'],
    careers: ['技术人员', '维修专家', '工艺师', '农业人员', '机械操作员'],
    relationships: '通过实际帮助表达关心，偏好尊重对方独立性的舒适关系。',
    seniorTips: ['通过利用手工技能的工艺或维修活动获得成就感', '将实用技能或诀窍传授给年轻一代', '维持独立且自由的生活方式'],
    healthTips: ['充分享受独处时间以充电精神能量', '通过手工活动促进大脑活性化', '通过规律的身体活动维持健康，但不要过度'],
    emoji: '🔧',
    color: '#7c2d12',
    bgGradient: 'linear-gradient(135deg, #a3a3a3 0%, #525252 100%)'
  },
  'ISFP': {
    type: 'ISFP',
    title: '银发族艺术家',
    subtitle: '宁静美丽的创造者',
    description: '凭借终生的美感和细腻感性创造美丽，追求个人价值和和谐的生活。',
    strengths: ['艺术感性', '同理心', '灵活性', '追求个人价值', '细心观察力'],
    challenges: ['缺乏自我主张', '回避冲突', '现实问题解决困难', '对压力敏感'],
    careers: ['艺术家', '设计师', '音乐家', '作家', '治疗师'],
    relationships: '重视真实且深刻的情感连接，细心关怀对方的个性和情感。',
    seniorTips: ['通过艺术创作或文化活动追求美丽', '在维持个人价值和信念的同时尊重他人生活', '在安静和平的环境中充分休息'],
    healthTips: ['由于对压力敏感，创造平静的环境', '通过创作活动或艺术欣赏获得情感稳定', '通过亲近自然的时间获得心灵平静'],
    emoji: '🎨',
    color: '#7c3aed',
    bgGradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
  },
  'ESTP': {
    type: 'ESTP',
    title: '银发族冒险家',
    subtitle: '活跃的人生享受者',
    description: '基于丰富的人生经验享受当下时光，以实用且灵活的方法解决问题。',
    strengths: ['卓越的适应力', '实用性问题解决', '社交能力', '现实感觉', '行动力'],
    challenges: ['缺乏计划性', '冲动行为', '缺乏长期观点', '忽视细节'],
    careers: ['销售人员', '服务业', '运动教练', '活动策划人', '应急响应人员'],
    relationships: '享受分享活跃且有趣经验的过程，偏好自然且舒适的关系。',
    seniorTips: ['维持活跃的生活方式，享受新体验', '以实用的问题解决能力帮助周围的人', '享受当下时光并保持积极心态'],
    healthTips: ['通过定期身体活动维持体力和活力', '考虑健康做出慎重选择而非冲动决定', '通过社交活动预防孤独并获得活力'],
    emoji: '🏃',
    color: '#dc2626',
    bgGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)'
  },
  'ESFP': {
    type: 'ESFP',
    title: '银发族表演者',
    subtitle: '温暖心灵的氛围制造者',
    description: '以满溢的能量和温暖之心给周围的人带来喜悦，珍视并享受当下时光。',
    strengths: ['卓越的社交性', '积极能量', '同理心', '灵活性', '实用性帮助'],
    challenges: ['缺乏计划性', '对批评敏感', '冲突压力', '难以设定长期目标'],
    careers: ['教育工作者', '心理咨询师', '演艺人员', '活动策划人', '服务业'],
    relationships: '以看到所有人都幸福快乐为乐，创造温暖且活跃的关系。',
    seniorTips: ['以积极的能量给周围的人带来活力发挥作用', '通过与多样的人群见面获得持续刺激', '享受当下时光，创造许多幸福的回忆'],
    healthTips: ['通过积极的社交活动预防抑郁', '通过各种兴趣活动维持精神刺激', '避免过度压力，专注于愉快的活动'],
    emoji: '🌈',
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)'
  }
};

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [resultData, setResultData] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const shareButtonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });

  // 服务器端兼容的数据处理
  useEffect(() => {
    // 从URL参数直接获取MBTI类型
    const mbtiType = params.type?.toUpperCase();
    
    if (mbtiType) {
      // 检查是否为有效的MBTI类型
      const validTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
                         'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
      
      if (validTypes.includes(mbtiType)) {
        // 检查localStorage中的现有结果（仅客户端）
        let storedResult = null;
        try {
          if (typeof window !== 'undefined') {
            storedResult = localStorage.getItem(`mbti-result-${mbtiType}`);
            if (storedResult) {
              storedResult = JSON.parse(storedResult);
            }
          }
        } catch (error) {
          console.warn('Error reading localStorage:', error);
        }
        
        // 从MBTI类型参数生成结果数据
        setResultData({
          mbtiType: mbtiType,
          timestamp: storedResult?.timestamp || Date.now(),
          isDirectLink: true,
          scores: storedResult?.scores || null,
          answers: storedResult?.answers || null
        });
      } else {
        // 如果MBTI类型无效则重定向到首页
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [params.type, router]);

  // 客户端元标签更新（服务器端兼容）
  useEffect(() => {
    if (resultData && typeof window !== 'undefined') {
      const mbtiType = resultData.mbtiType;
      const mbtiInfo = mbtiTypes[mbtiType];
      
      if (mbtiInfo) {
        // 更新页面标题
        document.title = `${mbtiType} ${mbtiInfo.title} - 银发族MBTI结果`;
        
        // 元标签更新函数
        const updateMetaTag = (property, content) => {
          try {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('property', property);
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
          } catch (error) {
            console.warn('Meta tag update failed:', error);
          }
        };

        const updateNameMetaTag = (name, content) => {
          try {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
              meta = document.createElement('meta');
              meta.setAttribute('name', name);
              document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
          } catch (error) {
            console.warn('Name meta tag update failed:', error);
          }
        };

        // 使用MBTI类型专用内容更新元标签
        updateMetaTag('og:title', `${mbtiType} ${mbtiInfo.title} - 银发族MBTI结果`);
        updateMetaTag('og:description', `您的MBTI是${mbtiType} ${mbtiInfo.title}。${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateMetaTag('og:image', `https://cn.seniormbti.com/${mbtiType}-cn.png`);
        updateMetaTag('og:url', window.location.href);
        updateMetaTag('og:type', 'website');
        
        updateNameMetaTag('description', `您的MBTI是${mbtiType} ${mbtiInfo.title}。${mbtiInfo.subtitle} ${mbtiInfo.description.substring(0, 100)}...`);
        updateNameMetaTag('twitter:title', `${mbtiType} ${mbtiInfo.title} - 银发族MBTI结果`);
        updateNameMetaTag('twitter:description', `您的MBTI是${mbtiType} ${mbtiInfo.title}。${mbtiInfo.subtitle}`);
        updateNameMetaTag('twitter:image', `https://cn.seniormbti.com/${mbtiType}-cn.png`);
        updateNameMetaTag('twitter:card', 'summary_large_image');
      }
    }
  }, [resultData]);

  const handleShareClick = () => {
    if (shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // 모바일에서도 버튼 중심으로 표시하되, 화면 경계 고려
      let top = rect.top + scrollTop + rect.height / 2;
      let left = rect.left + scrollLeft + rect.width / 2;
      
      // 모바일 화면에서 경계를 벗어나지 않도록 조정
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const modalWidth = Math.min(400, window.innerWidth - 40);
        const modalHeight = 200; // 대략적인 모달 높이
        
        // 좌우 경계 체크
        if (left - modalWidth / 2 < 20) {
          left = modalWidth / 2 + 20;
        } else if (left + modalWidth / 2 > window.innerWidth - 20) {
          left = window.innerWidth - modalWidth / 2 - 20;
        }
        
        // 상하 경계 체크
        if (top - modalHeight / 2 < 20) {
          top = modalHeight / 2 + 20;
        } else if (top + modalHeight / 2 > window.innerHeight + scrollTop - 20) {
          top = window.innerHeight + scrollTop - modalHeight / 2 - 20;
        }
      }
      
      setModalPosition({ top, left });
    }
    setShowShareDialog(true);
  };

  const copyResultLink = () => {
    if (typeof window !== 'undefined' && resultData) {
      // 使用简洁的MBTI类型URL进行分享
      const shareUrl = `${window.location.origin}/result/${resultData.mbtiType.toLowerCase()}`;
      navigator.clipboard.writeText(shareUrl);
      setShowCopySuccess(true);
      setTimeout(() => {
        setShowCopySuccess(false);
        setShowShareDialog(false);
      }, 2000);
    }
  };

  if (!resultData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在加载结果...</p>
        
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const typeInfo = mbtiTypes[resultData?.mbtiType] || mbtiTypes['INTJ'];

  return (
    <>
      <div className="result-container">
      {/* 히어로 섹션 */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="type-badge">
            <span className="type-emoji">{typeInfo.emoji}</span>
            <div className="type-info">
              <h1 className="type-title">{typeInfo.type}</h1>
              <p className="type-subtitle">{typeInfo.title}</p>
            </div>
          </div>
          
          <h2 className="hero-title">{typeInfo.subtitle}</h2>
          <p className="hero-description">{typeInfo.description}</p>
          
          <div className="action-buttons">
            <button 
              ref={shareButtonRef}
              className="share-button"
              onClick={handleShareClick}
            >
              <span>🔗</span> 分享结果
            </button>
            <button 
              className="home-button"
              onClick={() => router.push('/')}
            >
              <span>🏠</span> 重新测试
            </button>
          </div>
        </div>
      </div>

      {/* 상세 분석 섹션 */}
      <div className="analysis-section">
        <div className="analysis-grid">
          {/* 강점 카드 */}
          <div className="analysis-card strengths-card">
            <div className="card-header">
              <h3>💪 主要优势</h3>
            </div>
            <div className="card-content">
              {typeInfo.strengths.map((strength, index) => (
                <div key={index} className="strength-item">
                  <span className="bullet">✨</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 도전과제 카드 */}
          <div className="analysis-card challenges-card">
            <div className="card-header">
              <h3>🎯 成长要点</h3>
            </div>
            <div className="card-content">
              {typeInfo.challenges.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <span className="bullet">🔍</span>
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 활동 카드 */}
          <div className="analysis-card careers-card">
            <div className="card-header">
              <h3>🌟 推荐活动</h3>
            </div>
            <div className="card-content">
              {typeInfo.careers.map((career, index) => (
                <div key={index} className="career-item">
                  <span className="bullet">🎨</span>
                  <span>{career}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 관계 카드 */}
          <div className="analysis-card relationships-card">
            <div className="card-header">
              <h3>❤️ 人际关系</h3>
            </div>
            <div className="card-content">
              <p className="relationship-text">{typeInfo.relationships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 상성 정보 섹션 */}
      <div className="compatibility-section">
        <div className="section-header">
          <h2>💕 MBTI 相性分析</h2>
          <p>了解您与其他MBTI类型的相性情况</p>
        </div>
        
        <div className="compatibility-grid">
          <div className="compatibility-card best-match">
            <div className="compatibility-header">
              <h3>💖 最佳搭配</h3>
              <p>相互补充并激发最佳潜力</p>
            </div>
            <div className="match-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.bestMatch.map((type, index) => (
                <span key={index} className="type-badge-small best">{type}</span>
              ))}
            </div>
          </div>

          <div className="compatibility-card good-match">
            <div className="compatibility-header">
              <h3>💚 良好搭配</h3>
              <p>理解且支持彼此的成长</p>
            </div>
            <div className="match-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.goodMatch.map((type, index) => (
                <span key={index} className="type-badge-small good">{type}</span>
              ))}
            </div>
          </div>

          <div className="compatibility-card challenging-match">
            <div className="compatibility-header">
              <h3>🤝 成长搭配</h3>
              <p>需要努力和理解的关系</p>
            </div>
            <div className="match-types">
              {resultData?.mbtiType && mbtiCompatibility[resultData.mbtiType]?.challengingMatch.map((type, index) => (
                <span key={index} className="type-badge-small challenging">{type}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 시니어 조언 섹션 */}
      <div className="senior-advice-section">
        <div className="section-header">
          <h2>🌸 银发族专属建议</h2>
          <p>针对您的人生阶段特别定制的建议</p>
        </div>
        
        <div className="advice-grid">
          <div className="advice-card lifestyle-advice">
            <div className="advice-header">
              <h3>🌱 生活方式建议</h3>
            </div>
            <div className="advice-content">
              {typeInfo.seniorTips?.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="advice-bullet">🎯</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="advice-card health-advice">
            <div className="advice-header">
              <h3>💚 健康管理建议</h3>
            </div>
            <div className="advice-content">
              {typeInfo.healthTips?.map((tip, index) => (
                <div key={index} className="advice-item">
                  <span className="advice-bullet">⚡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 공유 모달 */}
      {showShareDialog && (
        <>
          <div className="share-overlay" onClick={() => setShowShareDialog(false)} />
          <div 
            className="share-modal"
            style={{
              position: 'absolute',
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="modal-header">
              <h3>📤 分享您的结果</h3>
              <button className="close-button" onClick={() => setShowShareDialog(false)}>×</button>
            </div>
            
            {showCopySuccess ? (
              <div className="success-message">
                <span>✅</span>
                <p>链接已复制到剪贴板！</p>
              </div>
            ) : (
              <div className="modal-content">
                <p>与朋友分享您的MBTI结果</p>
                <button className="copy-button" onClick={copyResultLink}>
                  <span>📋</span> 复制链接
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        .result-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .result-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 120, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        /* 히어로 섹션 */
        .hero-section {
          padding: 60px 24px 40px;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .type-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 32px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 32px 48px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .type-emoji {
          font-size: 64px;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1));
        }

        .type-info {
          text-align: left;
        }

        .type-title {
          font-size: 48px;
          font-weight: 900;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, ${typeInfo.color}, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
        }

        .type-subtitle {
          font-size: 18px;
          color: #64748b;
          font-weight: 600;
          margin: 0;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin: 0 0 24px 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin: 0 0 40px 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .action-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .share-button, .home-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .share-button {
          background: rgba(255, 255, 255, 0.9);
          color: #1e293b;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .share-button:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
        }

        .home-button {
          background: rgba(30, 41, 59, 0.8);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .home-button:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        /* 분석 섹션 */
        .analysis-section {
          padding: 40px 24px;
          position: relative;
          z-index: 1;
        }

        .analysis-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .analysis-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .analysis-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${typeInfo.color}, #667eea);
        }

        .analysis-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .card-header h3 {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 20px 0;
          color: #1e293b;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .strength-item, .challenge-item, .career-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 1.5;
          color: #334155;
        }

        .bullet {
          flex-shrink: 0;
          font-size: 16px;
        }

        .relationship-text {
          font-size: 16px;
          line-height: 1.6;
          color: #334155;
          margin: 0;
        }

        /* 상성 정보 섹션 */
        .compatibility-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 60px 24px;
          margin: 40px 0;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 900;
          margin: 0 0 16px 0;
          background: linear-gradient(135deg, ${typeInfo.color}, #667eea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-header p {
          font-size: 18px;
          color: #64748b;
          margin: 0;
        }

        .compatibility-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .compatibility-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .compatibility-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
        }

        .compatibility-header h3 {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 8px 0;
          color: #1e293b;
        }

        .compatibility-header p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 20px 0;
        }

        .match-types {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .type-badge-small {
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
        }

        .type-badge-small.best {
          background: linear-gradient(135deg, #ec4899, #f472b6);
          color: white;
        }

        .type-badge-small.good {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
        }

        .type-badge-small.challenging {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: white;
        }

        /* 시니어 조언 섹션 */
        .senior-advice-section {
          background: linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%);
          padding: 60px 24px;
          margin: 40px 0 0 0;
          position: relative;
          z-index: 1;
        }

        .advice-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }

        .advice-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .advice-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
        }

        .advice-header h3 {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 24px 0;
          color: #1e293b;
        }

        .advice-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .advice-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 1.6;
          color: #334155;
        }

        .advice-bullet {
          flex-shrink: 0;
          font-size: 16px;
        }

        /* 공유 모달 */
        .share-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          z-index: 1000;
        }

        .share-modal {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          min-width: 300px;
          max-width: 400px;
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          z-index: 1001;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 800;
          margin: 0;
          color: #1e293b;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
          padding: 4px;
        }

        .modal-content p {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 16px 0;
          text-align: center;
        }

        .copy-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, ${typeInfo.color}, #667eea);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .success-message {
          text-align: center;
          padding: 20px;
        }

        .success-message span {
          font-size: 32px;
          display: block;
          margin-bottom: 12px;
        }

        .success-message p {
          font-size: 16px;
          font-weight: 600;
          color: #059669;
          margin: 0;
        }

        /* 반응형 */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 16px 32px;
          }

          .type-badge {
            flex-direction: column;
            gap: 16px;
            padding: 24px;
          }

          .type-info {
            text-align: center;
          }

          .type-title {
            font-size: 36px;
          }

          .hero-title {
            font-size: 24px;
          }

          .hero-description {
            font-size: 16px;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .share-button, .home-button {
            width: 100%;
            max-width: 300px;
          }

          .analysis-section, .compatibility-section, .senior-advice-section {
            padding: 40px 16px;
          }

          .section-header h2 {
            font-size: 28px;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .compatibility-grid {
            grid-template-columns: 1fr;
          }

          .advice-grid {
            grid-template-columns: 1fr;
          }

          .share-modal {
            min-width: calc(100vw - 40px);
            max-width: calc(100vw - 40px);
          }
        }
      `}</style>
    </div>
    </>
  );
}