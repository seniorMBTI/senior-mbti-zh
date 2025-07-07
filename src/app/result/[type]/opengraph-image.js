import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MBTI人格类型结果 - 银发族MBTI'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// MBTI Type 정보
const mbtiInfo = {
  'INTJ': { emoji: '🏛️', name: '建筑师', color: '#6C5CE7' },
  'INTP': { emoji: '🔬', name: '逻辑学家', color: '#A29BFE' },
  'ENTJ': { emoji: '👑', name: '指挥官', color: '#E17055' },
  'ENTP': { emoji: '🚀', name: '辩论家', color: '#00B894' },
  'INFJ': { emoji: '🌟', name: '提倡者', color: '#00CEC9' },
  'INFP': { emoji: '🎨', name: '调停者', color: '#FD79A8' },
  'ENFJ': { emoji: '🤝', name: '主人公', color: '#FDCB6E' },
  'ENFP': { emoji: '🎭', name: '竞选者', color: '#E84393' },
  'ISTJ': { emoji: '🛡️', name: '物流师', color: '#2D3436' },
  'ISFJ': { emoji: '💝', name: '守护者', color: '#636E72' },
  'ESTJ': { emoji: '💼', name: '总经理', color: '#74B9FF' },
  'ESFJ': { emoji: '❤️', name: '执政官', color: '#FF7675' },
  'ISTP': { emoji: '🔧', name: '鉴赏家', color: '#00B894' },
  'ISFP': { emoji: '🌸', name: '探险家', color: '#FD79A8' },
  'ESTP': { emoji: '⚡', name: '企业家', color: '#FDCB6E' },
  'ESFP': { emoji: '🎪', name: '表演者', color: '#E84393' }
}

export default async function Image({ params }) {
  const mbtiType = params.type.toUpperCase()
  const typeInfo = mbtiInfo[mbtiType] || { emoji: '🌟', name: '人格类型', color: '#667eea' }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50px',
            padding: '12px 24px',
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            fontSize: '18px',
            color: 'white',
            fontWeight: '500',
          }}
        >
          银发族MBTI结果
        </div>

        {/* MBTI Type with Emoji */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div style={{ fontSize: '80px', marginRight: '20px' }}>
            {typeInfo.emoji}
          </div>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: typeInfo.color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {mbtiType}
          </div>
        </div>

        {/* Type Name */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {typeInfo.name}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: '1.4',
          }}
        >
          发现相配和需要注意的MBTI类型，建立有意义的关系
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}