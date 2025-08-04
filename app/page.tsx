'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter',sans-serif]">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              PowerOfAum API
            </h1>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/callmeumair/candidate-00X-powerofaum-module-subscription" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding for fixed nav */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse"></div>
          
          <div className="relative z-10 container mx-auto px-6 py-16">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-gradient">
                PowerOfAum API
              </h1>
              <p className="text-xl text-gray-300 mb-8 animate-slide-up">
                Modern SaaS API backend with Stripe integration and Connect split payments
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                  Stripe Integration
                </span>
                <span className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                  Connect Split
                </span>
                <span className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 text-sm">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* API Modules Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-100 animate-fade-in">
              API Modules
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Module A */}
              <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-500 animate-slide-in-left hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-purple-400">A</span>
                  </div>
                  <h3 className="text-3xl font-bold text-purple-400">Subscription Management</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { method: 'POST', path: '/api/create-subscription-session', desc: 'Create Stripe checkout session for subscriptions' },
                    { method: 'POST', path: '/api/webhook-stripe', desc: 'Handle Stripe webhooks for subscription events' },
                    { method: 'GET', path: '/api/vendor-sales-status', desc: 'Get vendor subscription sales analytics' }
                  ].map((route, index) => (
                    <div 
                      key={route.path}
                      className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          route.method === 'GET' ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                        }`}>
                          {route.method}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-green-400 font-mono text-sm mb-1">{route.path}</h4>
                          <p className="text-gray-300 text-sm">{route.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module B */}
              <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500 animate-slide-in-right hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-400">B</span>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-400">Add-On Purchase</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { method: 'POST', path: '/api/create-addon-session', desc: 'Create add-on purchase session (Blessing PDF)' },
                    { method: 'GET', path: '/api/addon-purchase-status', desc: 'Get add-on sales analytics' },
                    { method: 'POST', path: '/api/addon-webhook', desc: 'Handle add-on purchase webhooks' }
                  ].map((route, index) => (
                    <div 
                      key={route.path}
                      className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          route.method === 'GET' ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                        }`}>
                          {route.method}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-green-400 font-mono text-sm mb-1">{route.path}</h4>
                          <p className="text-gray-300 text-sm">{route.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Environment Variables Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 animate-slide-up max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-yellow-400">Environment Variables</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  'STRIPE_SECRET_KEY',
                  'STRIPE_PUBLISHABLE_KEY', 
                  'STRIPE_WEBHOOK_SECRET',
                  'STRIPE_PLATFORM_ACCOUNT_ID',
                  'NEXTAUTH_URL',
                  'NEXTAUTH_SECRET'
                ].map((envVar, index) => (
                  <div 
                    key={envVar}
                    className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 animate-fade-in border border-gray-700 hover:border-yellow-500/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <code className="text-green-400 font-mono text-sm">{envVar}</code>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-300 text-sm">
                  Copy <code className="bg-gray-700 px-2 py-1 rounded text-green-400 font-mono">env.example</code> to{' '}
                  <code className="bg-gray-700 px-2 py-1 rounded text-green-400 font-mono">.env.local</code> and fill in your Stripe credentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
              <a 
                href="/api/health" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check API Health
              </a>
              
              <a 
                href="https://github.com/callmeumair/candidate-00X-powerofaum-module-subscription" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700 hover:border-gray-600"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 PowerOfAum API. Built with Next.js & Stripe.
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://github.com/callmeumair/candidate-00X-powerofaum-module-subscription" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                GitHub Repository
              </a>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm">Made with ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 