import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, MapPin, Target, TrendingUp, Utensils, Shield, Users, ShoppingBag, Mail, Phone, X, Star, Lock, Timer, Award, Zap, ThumbsUp, Clock } from 'lucide-react';

export default function MyFitFoodsFunnel() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    zipCode: '',
    goal: '',
    obstacle: '',
    proteins: [],
    avoidances: [],
    whoEating: '',
    mealPlan: '',
    email: '',
    phone: '',
    selectedMeals: []
  });
  const [isServiceable, setIsServiceable] = useState(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes countdown
  const [activePeople, setActivePeople] = useState(47);

  // Smooth scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate active people counter
  useEffect(() => {
    const peopleTimer = setInterval(() => {
      setActivePeople(prev => 43 + Math.floor(Math.random() * 8));
    }, 5000);
    return () => clearInterval(peopleTimer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const checkZipCode = (zip) => {
    const serviceableZips = [
      '77', // Houston, TX
      '78', // Austin/San Antonio, TX
      '79', // West Texas
      '75', // Dallas, TX
      '80', // Denver, CO
      '97'  // Portland, OR
    ];
    const isInArea = serviceableZips.some(prefix => zip.startsWith(prefix));
    setIsServiceable(isInArea);
    return isInArea;
  };

  // Mock meal data
  const meals = [
    { id: 1, name: "Grilled Chicken & Sweet Potato", protein: 42, calories: 420, tags: ["chicken", "comfort"], image: "🍗", popular: true },
    { id: 2, name: "Beef Taco Bowl", protein: 38, calories: 450, tags: ["beef", "tex-mex"], image: "🌮", popular: true },
    { id: 3, name: "Salmon & Asparagus", protein: 40, calories: 380, tags: ["seafood", "light"], image: "🐟" },
    { id: 4, name: "Turkey Meatballs", protein: 35, calories: 410, tags: ["chicken", "italian"], image: "🍝" },
    { id: 5, name: "Breakfast Power Bowl", protein: 32, calories: 390, tags: ["eggs", "breakfast"], image: "🍳", popular: true },
    { id: 6, name: "Bison Burger Bowl", protein: 45, calories: 460, tags: ["beef", "comfort"], image: "🍔" },
    { id: 7, name: "Shrimp Stir Fry", protein: 36, calories: 370, tags: ["seafood", "asian"], image: "🍤" },
    { id: 8, name: "Chicken Fajita Bowl", protein: 40, calories: 425, tags: ["chicken", "tex-mex"], image: "🌯", popular: true },
    { id: 9, name: "Turkey Quinoa Bowl", protein: 38, calories: 400, tags: ["chicken", "healthy"], image: "🥗" },
    { id: 10, name: "Beef & Broccoli", protein: 41, calories: 440, tags: ["beef", "asian"], image: "🥦" },
    { id: 11, name: "Garlic Shrimp Zoodles", protein: 34, calories: 360, tags: ["seafood", "light"], image: "🦐" },
    { id: 12, name: "Chicken Teriyaki", protein: 39, calories: 430, tags: ["chicken", "asian"], image: "🍱" },
    { id: 13, name: "Steak & Eggs", protein: 44, calories: 470, tags: ["beef", "eggs", "breakfast"], image: "🥩" },
    { id: 14, name: "Grilled Salmon Bowl", protein: 42, calories: 395, tags: ["seafood", "healthy"], image: "🐠" },
    { id: 15, name: "BBQ Chicken", protein: 37, calories: 415, tags: ["chicken", "comfort"], image: "🍗" },
    { id: 16, name: "Turkey Chili", protein: 36, calories: 385, tags: ["chicken", "comfort"], image: "🌶️" },
  ];

  // Auto-select meals based on user preferences
  useEffect(() => {
    if (step === 10 && formData.selectedMeals.length === 0) {
      const mealCount = 
        formData.mealPlan === 'starter' ? 10 :
        formData.mealPlan === 'results' ? 15 :
        formData.mealPlan === 'commit' ? 20 :
        formData.mealPlan === 'shared' ? 30 : 45;
      
      let filteredMeals = meals.filter(meal => {
        const matchesProtein = formData.proteins.length === 0 || 
          formData.proteins.some(pref => meal.tags.includes(pref)) ||
          formData.proteins.includes('any');
        
        const matchesAvoidances = !formData.avoidances.some(avoid => {
          if (avoid.includes('No beef')) return meal.tags.includes('beef');
          if (avoid.includes('No seafood')) return meal.tags.includes('seafood');
          if (avoid.includes('No pork')) return meal.tags.includes('pork');
          return false;
        });
        
        return matchesProtein && matchesAvoidances;
      });
      
      if (filteredMeals.length < mealCount) {
        filteredMeals = [...filteredMeals, ...meals.filter(m => !filteredMeals.includes(m))];
      }
      
      const selectedIds = filteredMeals.slice(0, mealCount).map(m => m.id);
      updateFormData('selectedMeals', selectedIds);
    }
  }, [step]);

  const transformations = [
    { name: "Maddie", lost: "231 lbs", fatLoss: "36%", image: "👩", rating: 5 },
    { name: "Blake", lost: "20 lbs fat", gained: "20 lbs muscle", fatLoss: "10.6%", image: "🧔", rating: 5 },
    { name: "Bethany", lost: "83 lbs", quote: "I've gained so much mental clarity", image: "👩‍🦰", rating: 5 },
    { name: "Jamil", lost: "106 lbs", fatLoss: "26%", image: "🧑", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EE] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .btn-primary {
          background: #6B7B5E;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .btn-primary:hover:before {
          width: 300px;
          height: 300px;
        }
        
        .btn-primary:hover {
          background: #5A6A4D;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(107, 123, 94, 0.3);
        }
        
        .card-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #6B7B5E 0%, #8B9B7E ${(step / 10) * 100}%);
          transition: all 0.5s ease;
        }
        
        @media (max-width: 768px) {
          .meal-card-mobile {
            font-size: 0.875rem;
          }
          .meal-card-mobile .meal-emoji {
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* Sticky Urgency Bar */}
      {step > 0 && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 z-50 text-center text-sm font-semibold">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Timer className="w-4 h-4" />
            <span>40% OFF expires in {formatTime(timeLeft)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {activePeople} people claiming this offer now
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {step > 0 && (
        <div className="fixed top-10 left-0 w-full h-1.5 bg-[#E5E3DE] z-40">
          <div className="progress-bar h-full" style={{ width: `${(step / 10) * 100}%` }} />
        </div>
      )}

      {/* Step 0: Hero */}
      {step === 0 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-5xl w-full">
            <div className="text-center space-y-6 animate-fadeInUp">
              {/* Social Proof Banner */}
              <div className="flex items-center justify-center gap-2 text-sm text-[#5A5A5A] mb-2">
                <div className="flex -space-x-2">
                  {['👨', '👩', '🧔', '👩‍🦰'].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#6B7B5E] flex items-center justify-center border-2 border-white">
                      <span className="text-xs">{emoji}</span>
                    </div>
                  ))}
                </div>
                <span className="font-semibold">Join 15,000+ people who transformed their health</span>
              </div>

              <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-full text-base font-bold tracking-wide mb-4 animate-pulse">
                ⚡ LIMITED TIME: 40% OFF YOUR FIRST ORDER
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-[#2C2C2C] leading-tight">
                Get a Custom Eating Plan<br />
                <span className="text-[#6B7B5E]">Tailored To Your Goals</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-[#5A5A5A] max-w-2xl mx-auto font-medium">
                Answer 6 quick questions and get access to <span className="font-bold text-[#6B7B5E]">40g+ protein</span> meals for as low as <span className="font-bold text-green-600">$6.75 each!</span>
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#5A5A5A] mt-6">
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Fresh Daily</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>40g+ Protein</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Never Frozen</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>No Seed Oils</span>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#2C2C2C]">4.9/5 from 3,247 reviews</span>
                </div>
                <p className="text-sm text-[#5A5A5A] italic">"Life-changing meals. Lost 40 lbs in 3 months!" - Sarah M.</p>
              </div>
              
              <button
                onClick={handleNext}
                className="btn-primary text-white px-10 sm:px-16 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold inline-flex items-center gap-3 mt-6 shadow-xl"
              >
                Get My Custom Plan Now
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-[#5A5A5A] mt-4">⏱️ Takes only 60 seconds • 🔒 No credit card required</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: ZIP Code */}
      {step === 1 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-2xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            {/* Progress Indicator */}
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 1 of 6 • {Math.round((1/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#6B7B5E] rounded-full mb-4">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                First, where are we<br className="hidden sm:block" /> fueling you?
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A]">
                We use your ZIP to show accurate delivery and pickup options near you.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <input
                type="text"
                placeholder="Enter ZIP code"
                value={formData.zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                  updateFormData('zipCode', value);
                  if (value.length === 5) {
                    checkZipCode(value);
                  }
                }}
                className="w-full text-center text-2xl sm:text-3xl font-bold px-4 sm:px-6 py-3 sm:py-4 border-2 border-[#E5E3DE] rounded-2xl focus:border-[#6B7B5E] focus:outline-none transition-colors"
                maxLength={5}
                autoFocus
              />
              
              {isServiceable !== null && (
                <div className={`mt-6 p-4 rounded-xl ${isServiceable ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                  <p className={`text-center font-semibold ${isServiceable ? 'text-green-800' : 'text-red-800'}`}>
                    {isServiceable 
                      ? '🎉 Great news! We deliver fresh meals daily or you can pick up in-store.'
                      : '😔 We\'re sorry: We don\'t deliver to your area yet! Join our waitlist...'
                    }
                  </p>
                </div>
              )}
            </div>
            
            {/* Trust Signal */}
            <div className="text-center text-sm text-[#5A5A5A]">
              <Lock className="w-4 h-4 inline mr-1" />
              Your information is secure and private
            </div>
            
            <button
              onClick={handleNext}
              disabled={formData.zipCode.length !== 5 || !isServiceable}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold inline-flex items-center justify-center gap-3 shadow-xl"
            >
              Continue to My Custom Plan
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Goals */}
      {step === 2 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 2 of 6 • {Math.round((2/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#6B7B5E] rounded-full mb-4">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                What's your #1 goal over<br className="hidden sm:block" />the next 30-90 days?
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A]">Choose the goal that resonates most with you</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: 'fat-loss', label: 'Lose body fat / see the scale move', icon: TrendingUp, popular: true },
                { value: 'recomp', label: 'Tone up / recomposition', icon: Target },
                { value: 'muscle', label: 'Build muscle & strength', icon: TrendingUp },
                { value: 'energy', label: 'Eat healthier & have more energy', icon: Star, popular: true },
                { value: 'convenience', label: 'Stop relying on takeout', icon: Utensils },
                { value: 'health', label: 'Support overall health markers', icon: Shield },
              ].map((goal, idx) => (
                <button
                  key={goal.value}
                  onClick={() => {
                    updateFormData('goal', goal.value);
                    setTimeout(handleNext, 300);
                  }}
                  className={`card-hover bg-white p-4 sm:p-6 rounded-2xl text-left border-2 transition-all relative animate-slideInRight stagger-${idx + 1} ${
                    formData.goal === goal.value ? 'border-[#6B7B5E] bg-[#F8F9F7]' : 'border-[#E5E3DE]'
                  }`}
                >
                  {goal.popular && (
                    <div className="absolute -top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#6B7B5E] bg-opacity-10 rounded-xl flex items-center justify-center">
                      <goal.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7B5E]" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-[#2C2C2C] flex-1">{goal.label}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleBack}
              className="w-full bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Obstacles */}
      {step === 3 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 3 of 6 • {Math.round((3/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                What's held you back<br className="hidden sm:block" />from your goals?
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A]">We'll help you overcome this obstacle</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { text: 'Meals that didn\'t taste good', emoji: '😞' },
                { text: 'Inconsistency from busy schedule', emoji: '⏰' },
                { text: 'Diets that were too restrictive', emoji: '🚫' },
                { text: 'Stress or emotional eating', emoji: '😰' },
                { text: 'Overwhelmed by meal prep', emoji: '😵' },
                { text: 'Not knowing what to eat', emoji: '❓' },
              ].map((obstacle, idx) => (
                <button
                  key={obstacle.text}
                  onClick={() => {
                    updateFormData('obstacle', obstacle.text);
                    setTimeout(handleNext, 300);
                  }}
                  className={`card-hover bg-white p-4 sm:p-6 rounded-2xl text-left border-2 transition-all animate-slideInRight stagger-${idx + 1} ${
                    formData.obstacle === obstacle.text ? 'border-[#6B7B5E] bg-[#F8F9F7]' : 'border-[#E5E3DE]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl">{obstacle.emoji}</span>
                    <span className="text-base sm:text-lg font-semibold text-[#2C2C2C]">{obstacle.text}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleBack}
              className="w-full bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Protein Preferences */}
      {step === 4 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 4 of 6 • {Math.round((4/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                What proteins do you<br className="hidden sm:block" />like best?
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A]">Select all that apply - we'll personalize your menu</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: 'chicken', label: 'Chicken & turkey', emoji: '🍗' },
                { value: 'beef', label: 'Beef & bison', emoji: '🥩' },
                { value: 'seafood', label: 'Seafood (salmon, shrimp)', emoji: '🐟' },
                { value: 'eggs', label: 'Eggs & breakfast-style', emoji: '🍳' },
                { value: 'any', label: 'I\'m open to anything!', emoji: '💪' },
              ].map((protein, idx) => (
                <button
                  key={protein.value}
                  onClick={() => {
                    const current = formData.proteins.includes(protein.value)
                      ? formData.proteins.filter(p => p !== protein.value)
                      : [...formData.proteins, protein.value];
                    updateFormData('proteins', current);
                  }}
                  className={`card-hover bg-white p-4 sm:p-6 rounded-2xl text-left border-2 transition-all animate-slideInRight stagger-${idx + 1} ${
                    formData.proteins.includes(protein.value) ? 'border-[#6B7B5E] bg-[#F8F9F7]' : 'border-[#E5E3DE]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-3xl sm:text-4xl">{protein.emoji}</span>
                    <span className="text-base sm:text-lg font-semibold text-[#2C2C2C] flex-1">{protein.label}</span>
                    {formData.proteins.includes(protein.value) && (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7B5E]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={formData.proteins.length === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold inline-flex items-center justify-center gap-3"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Avoidances */}
      {step === 5 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 5 of 6 • {Math.round((5/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                Any food preferences?
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A]">Select all that apply or skip</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'Dairy-free or mostly dairy-free',
                'Gluten-sensitive',
                'No pork',
                'No beef',
                'No seafood',
                'Lower sodium preferred',
                'I eat everything',
              ].map((avoidance, idx) => (
                <button
                  key={avoidance}
                  onClick={() => {
                    const current = formData.avoidances.includes(avoidance)
                      ? formData.avoidances.filter(a => a !== avoidance)
                      : [...formData.avoidances, avoidance];
                    updateFormData('avoidances', current);
                  }}
                  className={`card-hover bg-white p-4 sm:p-5 rounded-2xl text-left border-2 transition-all animate-slideInRight stagger-${idx + 1} ${
                    formData.avoidances.includes(avoidance) ? 'border-[#6B7B5E] bg-[#F8F9F7]' : 'border-[#E5E3DE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-semibold text-[#2C2C2C]">{avoidance}</span>
                    {formData.avoidances.includes(avoidance) && (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7B5E]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-[#6B7B5E] bg-opacity-10 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-xs sm:text-sm font-medium text-[#2C2C2C]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Fresh daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>40g+ protein</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Never frozen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>No seed oils</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 btn-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold inline-flex items-center justify-center gap-3"
              >
                Almost Done!
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Who's Eating (Combined with Plan Selection for faster conversion) */}
      {step === 6 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-4xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center text-sm text-[#5A5A5A] font-semibold">
              Step 6 of 6 • {Math.round((6/6) * 100)}% Complete
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#6B7B5E] rounded-full mb-4">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                Choose Your Perfect<br className="hidden sm:block" />Weekly Plan
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A]">Most popular choice: <span className="font-bold text-[#6B7B5E]">15 meals/week</span></p>
            </div>
            
            <div className="grid gap-4 sm:gap-6">
              {[
                { 
                  value: 'starter', 
                  name: 'Starter Plan', 
                  meals: 10, 
                  description: 'Replace 1-2 meals daily',
                  price: '$6.75',
                  savings: '$45',
                  peopleIcon: '👤'
                },
                { 
                  value: 'results', 
                  name: 'Results Plan', 
                  meals: 15, 
                  description: '#1 choice for transformations',
                  price: '$6.50',
                  savings: '$67.50',
                  recommended: true,
                  peopleIcon: '👤'
                },
                { 
                  value: 'commit', 
                  name: 'Commit To Fit', 
                  meals: 20, 
                  description: 'For people done starting over',
                  price: '$6.25',
                  savings: '$90',
                  peopleIcon: '👤'
                },
                { 
                  value: 'shared', 
                  name: 'Shared Plan', 
                  meals: 30, 
                  description: 'Perfect for couples',
                  price: '$6.00',
                  savings: '$135',
                  peopleIcon: '👥'
                },
              ].map((plan, idx) => (
                <button
                  key={plan.value}
                  onClick={() => {
                    updateFormData('mealPlan', plan.value);
                    setTimeout(handleNext, 300);
                  }}
                  className={`card-hover bg-white p-4 sm:p-6 rounded-2xl text-left border-2 transition-all relative animate-fadeInUp stagger-${idx + 1} ${
                    formData.mealPlan === plan.value ? 'border-[#6B7B5E] bg-[#F8F9F7]' : 'border-[#E5E3DE]'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-4xl sm:text-5xl">{plan.peopleIcon}</div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-1">{plan.name}</h3>
                      <p className="text-sm text-[#5A5A5A] mb-2">{plan.description}</p>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-bold text-[#6B7B5E]">{plan.meals}</span>
                        <span className="text-xs sm:text-sm text-[#5A5A5A]">meals/week</span>
                        <span className="text-xs sm:text-sm text-[#5A5A5A]">•</span>
                        <span className="text-sm sm:text-base font-bold text-[#6B7B5E]">{plan.price}/meal</span>
                      </div>
                      <div className="text-xs sm:text-sm text-green-600 font-bold mt-1">💰 Save {plan.savings} on first order</div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#6B7B5E]" />
                  </div>
                </button>
              ))}
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-800 font-bold">
                <Shield className="w-5 h-5" />
                <span>100% Money-Back Guarantee - Love it or get a full refund!</span>
              </div>
            </div>
            
            <button
              onClick={handleBack}
              className="w-full bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Transformations Showcase */}
      {step === 7 && (
        <div className="min-h-screen px-4 py-16 sm:py-12">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 animate-fadeInUp">
            <div className="text-center space-y-4">
              <div className="inline-block bg-yellow-100 border-2 border-yellow-400 text-yellow-800 px-6 py-2 rounded-full text-sm font-bold mb-2">
                ⭐ REAL RESULTS FROM REAL CUSTOMERS
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                Join Thousands Who<br />
                <span className="text-[#6B7B5E]">Transformed Their Lives</span>
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A]">These results speak for themselves</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {transformations.map((person, idx) => (
                <div 
                  key={person.name} 
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeInUp stagger-${idx + 1}`}
                >
                  <div className="bg-gradient-to-br from-[#6B7B5E] to-[#8B9B7E] p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl sm:text-6xl">{person.image}</div>
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold">{person.name}</h3>
                        <div className="flex gap-1 mt-1">
                          {[...Array(person.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    {person.quote && (
                      <p className="text-sm opacity-90 italic">"{person.quote}"</p>
                    )}
                  </div>
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-[#6B7B5E]" />
                      <span className="font-semibold text-[#2C2C2C]">Lost: <span className="text-[#6B7B5E] text-lg">{person.lost}</span></span>
                    </div>
                    {person.gained && (
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-[#6B7B5E]" />
                        <span className="font-semibold text-[#2C2C2C]">Gained: <span className="text-[#6B7B5E] text-lg">{person.gained}</span></span>
                      </div>
                    )}
                    {person.fatLoss && (
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-[#6B7B5E]" />
                        <span className="font-semibold text-[#2C2C2C]">Body fat reduced: <span className="text-[#6B7B5E] text-lg">{person.fatLoss}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof Counter */}
            <div className="bg-[#6B7B5E] rounded-2xl p-6 sm:p-8 text-white text-center">
              <div className="text-4xl sm:text-5xl font-bold mb-2">15,000+</div>
              <div className="text-lg sm:text-xl">People Have Already Transformed With My Fit Foods</div>
              <div className="mt-4 text-sm opacity-90">Join them today and get 40% off your first order!</div>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleNext}
                className="btn-primary text-white px-10 sm:px-16 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold inline-flex items-center gap-3 shadow-xl"
              >
                Claim My 40% OFF & Select Meals
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={handleBack}
              className="w-full max-w-md mx-auto block bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 8: Email Capture */}
      {step === 8 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:py-12">
          <div className="max-w-2xl w-full space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#6B7B5E] to-[#8B9B7E] rounded-full mb-4">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                Claim Your 40% OFF<br className="hidden sm:block" />Discount Code! 🎉
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A]">
                Enter your email to unlock your personalized meal plan and exclusive discount
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#2C2C2C] mb-2">Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-[#E5E3DE] rounded-xl focus:border-[#6B7B5E] focus:outline-none transition-colors text-base sm:text-lg"
                  required
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#2C2C2C] mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-[#E5E3DE] rounded-xl focus:border-[#6B7B5E] focus:outline-none transition-colors text-base sm:text-lg"
                />
                <p className="text-xs sm:text-sm text-[#5A5A5A] mt-2 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Get delivery updates & exclusive VIP offers
                </p>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center justify-center gap-4 text-xs text-[#5A5A5A] pt-4 border-t border-[#E5E3DE]">
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span>Secure & Private</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>No Spam Guarantee</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={!formData.email || !formData.email.includes('@')}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold inline-flex items-center justify-center gap-3 shadow-xl"
            >
              🎉 Unlock My 40% OFF & See My Meals
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-center text-[#5A5A5A]">
              By continuing, you agree to receive emails about your order and special offers.
            </p>
            
            <button
              onClick={handleBack}
              className="w-full bg-white text-[#6B7B5E] border-2 border-[#6B7B5E] px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#F5F3EE] transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Step 9: Meal Selection - MOBILE OPTIMIZED */}
      {step === 9 && (
        <div className="min-h-screen px-4 py-16 sm:py-12 pb-32">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fadeInUp">
            <div className="text-center space-y-4">
              <div className="inline-block bg-green-100 border-2 border-green-500 text-green-800 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold mb-2">
                ✓ MEALS PRE-SELECTED BASED ON YOUR PREFERENCES
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C]">
                Your Custom Meal Plan<br className="hidden sm:block" />
                <span className="text-[#6B7B5E]">Is Ready!</span>
              </h2>
              <p className="text-sm sm:text-base text-[#5A5A5A] max-w-2xl mx-auto">
                Don't like something? Remove it and browse below to swap in your favorites.
              </p>
            </div>
            
            {/* Plan Summary */}
            <div className="bg-gradient-to-br from-[#6B7B5E] to-[#8B9B7E] rounded-2xl p-4 sm:p-6 text-white">
              <h3 className="font-display text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Your Personalized Plan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="opacity-80 mb-1">Your Goal</div>
                  <div className="font-semibold capitalize">{formData.goal?.replace('-', ' ') || 'Not specified'}</div>
                </div>
                <div>
                  <div className="opacity-80 mb-1">Proteins</div>
                  <div className="font-semibold capitalize">{formData.proteins.slice(0, 2).join(', ') || 'All'}</div>
                </div>
                <div>
                  <div className="opacity-80 mb-1">Weekly Meals</div>
                  <div className="font-semibold text-lg sm:text-xl">
                    {formData.mealPlan === 'starter' ? '10' : 
                     formData.mealPlan === 'results' ? '15' : 
                     formData.mealPlan === 'commit' ? '20' : 
                     formData.mealPlan === 'shared' ? '30' : '45'} meals
                  </div>
                </div>
              </div>
            </div>
            
            {/* Selected Meals Section - MOBILE OPTIMIZED */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-3">
                <span className="bg-[#6B7B5E] text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm">
                  {formData.selectedMeals.length}
                </span>
                Your Selected Meals
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {meals
                  .filter(meal => formData.selectedMeals.includes(meal.id))
                  .map((meal, idx) => (
                  <div 
                    key={meal.id}
                    className="meal-card-mobile bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-[#6B7B5E] transition-all"
                  >
                    <div className="bg-gradient-to-br from-[#F5F3EE] to-[#E5E3DE] p-4 sm:p-6 text-center relative">
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      {meal.popular && (
                        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                          TOP
                        </div>
                      )}
                      <div className="meal-emoji text-4xl sm:text-6xl mb-2">{meal.image}</div>
                      <div className="inline-block bg-[#6B7B5E] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                        {meal.protein}g
                      </div>
                    </div>
                    <div className="p-2 sm:p-4 space-y-2">
                      <h3 className="font-bold text-xs sm:text-base text-[#2C2C2C] leading-tight line-clamp-2">{meal.name}</h3>
                      <div className="text-[10px] sm:text-sm text-[#5A5A5A]">
                        {meal.calories} cal
                      </div>
                      <button
                        onClick={() => {
                          const current = formData.selectedMeals.filter(id => id !== meal.id);
                          updateFormData('selectedMeals', current);
                        }}
                        className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs sm:text-sm"
                      >
                        <span className="flex items-center justify-center gap-1">
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          Remove
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Meals to Add - MOBILE OPTIMIZED */}
            {meals.filter(meal => !formData.selectedMeals.includes(meal.id)).length > 0 && (
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-4">
                  Browse & Swap Meals
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {meals
                    .filter(meal => !formData.selectedMeals.includes(meal.id))
                    .map((meal, idx) => (
                    <div 
                      key={meal.id}
                      className="meal-card-mobile bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-2 border-[#E5E3DE] transition-all card-hover"
                    >
                      <div className="bg-gradient-to-br from-[#F5F3EE] to-[#E5E3DE] p-4 sm:p-6 text-center relative">
                        {meal.popular && (
                          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                            TOP
                          </div>
                        )}
                        <div className="meal-emoji text-4xl sm:text-6xl mb-2">{meal.image}</div>
                        <div className="inline-block bg-[#6B7B5E] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                          {meal.protein}g
                        </div>
                      </div>
                      <div className="p-2 sm:p-4 space-y-2">
                        <h3 className="font-bold text-xs sm:text-base text-[#2C2C2C] leading-tight line-clamp-2">{meal.name}</h3>
                        <div className="text-[10px] sm:text-sm text-[#5A5A5A]">
                          {meal.calories} cal
                        </div>
                        <button
                          onClick={() => {
                            const current = [...formData.selectedMeals, meal.id];
                            updateFormData('selectedMeals', current);
                          }}
                          className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all bg-[#F5F3EE] text-[#6B7B5E] hover:bg-[#6B7B5E] hover:text-white text-xs sm:text-sm"
                        >
                          Add to Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quote Section */}
            <div className="bg-[#6B7B5E] bg-opacity-10 rounded-2xl p-4 sm:p-8 text-center">
              <p className="font-display text-lg sm:text-2xl md:text-3xl text-[#2C2C2C] italic">
                "Consistency beats willpower. The easiest way to stay on track is having meals ready that you actually enjoy."
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4 sm:mt-6 text-xs sm:text-sm font-medium text-[#2C2C2C]">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Fresh daily</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>40g+ protein</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B5E]" />
                  <span>Never frozen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Summary Footer - MOBILE OPTIMIZED */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-[#E5E3DE] p-3 sm:p-6 shadow-2xl z-40">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="text-center flex-1">
                  <div className="text-[10px] sm:text-sm text-[#5A5A5A]">Meals</div>
                  <div className="text-xl sm:text-3xl font-bold text-[#2C2C2C]">
                    {formData.selectedMeals.length}
                    <span className="text-xs sm:text-lg text-[#5A5A5A] ml-1">
                      / {formData.mealPlan === 'starter' ? '10' : 
                         formData.mealPlan === 'results' ? '15' : 
                         formData.mealPlan === 'commit' ? '20' : 
                         formData.mealPlan === 'shared' ? '30' : '45'}
                    </span>
                  </div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-[10px] sm:text-sm text-[#5A5A5A]">Total (40% OFF)</div>
                  <div className="text-xl sm:text-3xl font-bold text-[#6B7B5E]">
                    ${(formData.selectedMeals.length * 6.75).toFixed(2)}
                  </div>
                  <div className="text-[9px] sm:text-xs text-green-600">Save ${(formData.selectedMeals.length * 4.50).toFixed(2)}</div>
                </div>
                <button
                  onClick={() => alert('🎉 Proceeding to secure checkout...')}
                  disabled={formData.selectedMeals.length === 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-lg font-bold inline-flex items-center gap-2 flex-1 justify-center"
                >
                  <span className="hidden sm:inline">Continue to Checkout</span>
                  <span className="sm:hidden">Checkout</span>
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
