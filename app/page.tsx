'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 animate-pulse opacity-20"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with animation */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-gradient">
            PowerOfAum API
          </h1>
          <p className="text-xl text-gray-300 animate-slide-up">
            Welcome to the PowerOfAum SaaS API backend with Stripe integration
          </p>
        </div>

        {/* Modules Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Module A */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 animate-slide-in-left">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Module A: Subscription Management</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">POST /api/create-subscription-session</h3>
                <p className="text-gray-300">Create Stripe checkout session for subscriptions</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">POST /api/webhook-stripe</h3>
                <p className="text-gray-300">Handle Stripe webhooks for subscription events</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">GET /api/vendor-sales-status</h3>
                <p className="text-gray-300">Get vendor subscription sales analytics</p>
              </div>
            </div>
          </div>

          {/* Module B */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 animate-slide-in-right">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Module B: Add-On Purchase</h2>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">POST /api/create-addon-session</h3>
                <p className="text-gray-300">Create add-on purchase session (Blessing PDF)</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">GET /api/addon-purchase-status</h3>
                <p className="text-gray-300">Get add-on sales analytics</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                <h3 className="text-green-400 font-semibold mb-2">POST /api/addon-webhook</h3>
                <p className="text-gray-300">Handle add-on purchase webhooks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 animate-slide-up">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Environment Variables Required</h2>
          <div className="grid md:grid-cols-2 gap-4">
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
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <code className="text-green-400 font-mono">{envVar}</code>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-300">
            Copy <code className="bg-gray-800 px-2 py-1 rounded">env.example</code> to{' '}
            <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> and fill in your Stripe credentials.
          </p>
        </div>

        {/* Health Check */}
        <div className="text-center mt-12 animate-fade-in">
          <a 
            href="/api/health" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Check API Health
          </a>
        </div>
      </div>
    </div>
  );
} 