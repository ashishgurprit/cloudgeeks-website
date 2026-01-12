import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: true,
    functional: true
  });

  const COOKIE_NAME = 'cookie_consent';
  const COOKIE_EXPIRY = 365;

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const saveConsent = (prefs: typeof preferences) => {
    setCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_EXPIRY);
    applyConsent(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const applyConsent = (prefs: typeof preferences) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied'
      });
    }
  };

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      try {
        const prefs = JSON.parse(consent);
        applyConsent(prefs);
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(26, 26, 46, 0.98)',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          animation: 'slideUp 0.4s ease-out'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div>
              <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                🍪 We Value Your Privacy
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>
                We use cookies to improve your experience and analyze site traffic. <a href="/privacy" target="_blank" style={{ color: '#7cb342', textDecoration: 'underline' }}>Privacy Policy</a>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button onClick={handleAcceptAll} style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                background: '#7cb342',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}>
                Accept All
              </button>
              <button onClick={handleEssentialOnly} style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Essential Only
              </button>
              <button onClick={() => { setShowBanner(false); setShowModal(true); }} style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                cursor: 'pointer'
              }}>
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <h2 style={{ margin: 0, color: '#1a1a2e', fontSize: '1.5rem' }}>Cookie Preferences</h2>
              <button onClick={() => setShowModal(false)} style={{
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: '#666',
                cursor: 'pointer',
                lineHeight: 1,
                padding: 0
              }}>&times;</button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                We use different types of cookies to optimize your experience. Choose which categories to allow:
              </p>

              {/* Essential */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <input type="checkbox" checked disabled style={{ width: '20px', height: '20px' }} />
                  <label style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#1a1a2e' }}>Essential Cookies</strong>
                    <span style={{ background: '#7cb342', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Required</span>
                  </label>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0 0 2rem', lineHeight: 1.5 }}>
                  Necessary for the website to function.
                </p>
              </div>

              {/* Analytics */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <label style={{ flex: 1 }}>
                    <strong style={{ color: '#1a1a2e' }}>Analytics Cookies</strong>
                  </label>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0 0 2rem', lineHeight: 1.5 }}>
                  Help us measure and improve site performance.
                </p>
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0.5rem 0 0 2rem', fontStyle: 'italic' }}>
                  <strong>Services:</strong> Google Analytics (anonymized)
                </p>
              </div>

              {/* Marketing */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <label style={{ flex: 1 }}>
                    <strong style={{ color: '#1a1a2e' }}>Marketing Cookies</strong>
                  </label>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0 0 2rem', lineHeight: 1.5 }}>
                  Enable personalized content.
                </p>
              </div>

              {/* Functional */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <label style={{ flex: 1 }}>
                    <strong style={{ color: '#1a1a2e' }}>Functional Cookies</strong>
                  </label>
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0 0 2rem', lineHeight: 1.5 }}>
                  Enhanced functionality and personalization.
                </p>
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button onClick={handleSavePreferences} style={{
                padding: '0.75rem 1.5rem',
                background: '#7cb342',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}>
                Save Preferences
              </button>
              <button onClick={handleAcceptAll} style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: '#1a1a2e',
                border: '2px solid #1a1a2e',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
