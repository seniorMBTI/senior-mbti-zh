'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { 
    code: 'ko', 
    name: 'KR',
    localName: '한국어',
    flag: '🇰🇷',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    hoverColor: 'hover:bg-red-100'
  },
  { 
    code: 'en', 
    name: 'US',
    localName: 'English',
    flag: '🇺🇸',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200', 
    hoverColor: 'hover:bg-blue-100'
  },
  { 
    code: 'zh', 
    name: 'CN',
    localName: '中文',
    flag: '🇨🇳',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    hoverColor: 'hover:bg-yellow-100'
  },
  { 
    code: 'ja', 
    name: 'JP',
    localName: '日本語',
    flag: '🇯🇵',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    hoverColor: 'hover:bg-pink-100'
  }
];

// 언어별 헤더 텍스트
const headerTexts = {
  ko: '언어 선택',
  en: 'Language',
  zh: '语言选择',
  ja: '言語選択'
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  
  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode) => {
    setIsOpen(false);
    
    // 도메인별 리디렉션
    const domainMap = {
      'ko': 'https://kr.seniormbti.com',
      'en': 'https://seniormbti.com',
      'zh': 'https://cn.seniormbti.com', 
      'ja': 'https://jp.seniormbti.com'
    };
    
    if (domainMap[langCode]) {
      window.location.href = domainMap[langCode];
    } else {
      setLanguage(langCode);
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    
    // 포커스 복원
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="language-selector-container">
      {/* 현재 선택된 언어 버튼 */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          language-selector-button
          ${currentLanguage?.bgColor}
          ${currentLanguage?.borderColor}
          ${currentLanguage?.hoverColor}
        `}
        aria-label={`현재 언어: ${currentLanguage?.localName}. 클릭하여 언어 변경`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="language-button-content">
          <span className="language-flag">{currentLanguage?.flag}</span>
          <div className="language-text">
            <span className="language-name">{currentLanguage?.name}</span>
            <span className="language-local">{currentLanguage?.localName}</span>
          </div>
          <svg 
            className={`language-arrow ${isOpen ? 'language-arrow-open' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 언어 선택 오버레이 */}
      {isOpen && (
        <>
          <div 
            className="language-overlay" 
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
          <div 
            ref={modalRef}
            className="language-dropdown"
            role="dialog"
            aria-modal="true"
            aria-label="언어 선택"
          >
            <div className="language-dropdown-header">
              <h3>{headerTexts[language] || headerTexts.ko}</h3>
              <button
                className="language-close-button"
                onClick={handleClose}
                aria-label="언어 선택 닫기"
                type="button"
              >
                ✕
              </button>
            </div>
            
            <div className="language-grid">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`
                    language-option
                    ${lang.bgColor}
                    ${lang.borderColor}
                    ${lang.hoverColor}
                    ${language === lang.code ? 'language-option-selected' : ''}
                  `}
                  role="option"
                  aria-selected={language === lang.code}
                  aria-label={`${lang.localName} 선택`}
                  type="button"
                >
                  <div className="language-option-content">
                    <span className="language-option-flag">{lang.flag}</span>
                    <div className="language-option-text">
                      <span className="language-option-name">{lang.name} {lang.localName}</span>
                    </div>
                    {language === lang.code && (
                      <div className="language-check">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .language-selector-container {
          position: relative;
          z-index: 999999;
        }

        .language-selector-button {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: 2px solid;
          border-radius: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-size: 14px;
          font-weight: 600;
          position: relative;
          z-index: 999999;
        }

        .language-selector-button:focus {
          outline: 3px solid #3B82F6;
          outline-offset: 2px;
        }

        .language-button-content {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
        }

        .language-flag {
          font-size: 20px;
          line-height: 1;
        }

        .language-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .language-name {
          font-size: 14px;
          font-weight: 700;
          color: #1F2937;
          line-height: 1.2;
        }

        .language-local {
          font-size: 11px;
          color: #6B7280;
          font-weight: 500;
        }

        .language-arrow {
          width: 16px;
          height: 16px;
          color: #6B7280;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .language-arrow-open {
          transform: rotate(180deg);
        }

        .language-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999998;
          cursor: pointer;
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 2px solid #E5E7EB;
          min-width: 240px;
          max-width: 280px;
          z-index: 999999;
          overflow: hidden;
        }

        .language-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 2px solid #F3F4F6;
          background: #F9FAFB;
        }

        .language-dropdown-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1F2937;
          margin: 0;
        }

        .language-close-button {
          width: 28px;
          height: 28px;
          border: none;
          background: #E5E7EB;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #6B7280;
          transition: all 0.2s ease;
          z-index: 1000000;
          position: relative;
        }

        .language-close-button:hover {
          background: #D1D5DB;
          color: #374151;
          transform: scale(1.05);
        }

        .language-close-button:active {
          transform: scale(0.95);
        }

        .language-grid {
          padding: 12px;
          display: grid;
          gap: 8px;
        }

        .language-option {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border: 2px solid;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
          z-index: 1000000;
          position: relative;
        }

        .language-option:focus {
          outline: 3px solid #3B82F6;
          outline-offset: 2px;
        }

        .language-option:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .language-option-selected {
          border-color: #3B82F6 !important;
          background: #EFF6FF !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .language-option-content {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
        }

        .language-option-flag {
          font-size: 24px;
          line-height: 1;
        }

        .language-option-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .language-option-name {
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
          line-height: 1.3;
        }

        .language-check {
          width: 20px;
          height: 20px;
          color: #3B82F6;
          flex-shrink: 0;
        }

        /* 모바일 최적화 */
        @media (max-width: 768px) {
          .language-dropdown {
            right: -8px;
            left: -8px;
            min-width: auto;
            max-width: none;
          }

          .language-selector-button {
            min-width: 120px;
            padding: 10px 12px;
          }

          .language-flag, .language-option-flag {
            font-size: 18px;
          }

          .language-name {
            font-size: 13px;
          }

          .language-option-name {
            font-size: 13px;
          }
        }

        /* 높은 대비 모드 지원 */
        @media (prefers-contrast: high) {
          .language-selector-button,
          .language-option {
            border-width: 3px;
          }
        }

        /* 애니메이션 줄이기 선호 사용자 */
        @media (prefers-reduced-motion: reduce) {
          .language-selector-button,
          .language-option,
          .language-arrow,
          .language-close-button {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}