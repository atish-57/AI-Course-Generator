import React from 'react'

const plans = [
  {
    name: 'Starter',
    price: 9,
    original: 19,
    features: [
      'Create up to 3 courses',
      'Basic AI features',
      'Email support',
    ],
    cta: 'Upgrade to Starter',
  },
  {
    name: 'Pro',
    price: 29,
    original: 49,
    features: [
      'Unlimited courses',
      'Advanced AI features',
      'Priority support',
      'Access to new features',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    original: 199,
    features: [
      'Team access',
      'Custom AI models',
      'Dedicated support',
      'Onboarding & training',
    ],
    cta: 'Contact Sales',
  },
];

const Upgrade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 flex flex-col items-center">
      <h2 className="font-bold text-3xl md:text-4xl text-center mb-2 text-purple-800">Upgrade Your Experience</h2>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">Unlock unlimited course creation, advanced AI features, and more. Choose the plan that fits your needs and get exclusive discounts!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 transition-transform duration-200 hover:scale-105 ${plan.highlight ? 'border-purple-500 shadow-purple-200' : 'border-gray-200'}`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">Most Popular</span>
            )}
            <h3 className="text-2xl font-semibold mb-2 text-purple-700">{plan.name}</h3>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold text-purple-800">${plan.price}</span>
              <span className="text-lg text-gray-400 line-through ml-2">${plan.original}</span>
              <span className="ml-2 text-green-600 font-semibold text-sm">{Math.round(100 - (plan.price / plan.original) * 100)}% OFF</span>
            </div>
            <ul className="mb-6 space-y-2 w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${plan.highlight ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-500 hover:bg-blue-600'}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Upgrade