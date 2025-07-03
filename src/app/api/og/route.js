import { ImageResponse } from 'next/og';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'INTJ';
    const name = searchParams.get('name') || '建筑师';
    const subtitle = searchParams.get('subtitle') || '独立而系统的思考';

    // MBTI 类型表情符号
    const typeEmojis = {
      'INTJ': '🧠', 'INTP': '🔬', 'ENTJ': '👑', 'ENTP': '💡',
      'INFJ': '🌟', 'INFP': '🎨', 'ENFJ': '🤝', 'ENFP': '🌈',
      'ISTJ': '📊', 'ISFJ': '🤲', 'ESTJ': '📋', 'ESFJ': '💕',
      'ISTP': '🔧', 'ISFP': '🌸', 'ESTP': '⚡', 'ESFP': '🎭'
    };

    const emoji = typeEmojis[type] || '🧠';

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
            fontFamily: 'Inter',
            color: 'white',
            padding: '80px',
          }}
        >
          {/* 背景图案 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* 主要内容 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '800px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* 表情符号 */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
                display: 'block',
              }}
            >
              {emoji}
            </div>
            
            {/* MBTI 类型 */}
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {type}
            </div>
            
            {/* 类型名称 */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: '600',
                marginBottom: '30px',
                color: '#ffffff',
              }}
            >
              {name}
            </div>
            
            {/* 副标题 */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.4',
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </div>
          </div>
          
          {/* 底部品牌 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              fontSize: '28px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            银发族 MBTI
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}