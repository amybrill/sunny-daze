import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, X, Sparkles, Star, Clover, CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';


const affirmations = {
  confidence: [
    "You radiate confidence and inner strength. The universe sees your power!",
    "Every step you take is filled with purpose and self-assurance.",
    "You are worthy of all the success and happiness coming your way.",
    "Your confidence grows stronger with each passing moment.",
    "You have the power to create positive change in your life."
  ],
  love: [
    "Love flows to you and through you effortlessly.",
    "You are deserving of deep, meaningful connections.",
    "Your heart is open to giving and receiving unconditional love.",
    "The universe is bringing beautiful relationships into your life.",
    "You are surrounded by love in all its forms."
  ],
  success: [
    "Success is your birthright, and you claim it now!",
    "Every challenge you face is an opportunity for growth.",
    "Abundance flows to you from expected and unexpected sources.",
    "You are aligned with the energy of prosperity and achievement.",
    "Your dreams are manifesting into reality as we speak."
  ],
  peace: [
    "Inner peace washes over you like a gentle wave.",
    "You release all worry and embrace tranquility.",
    "Calm and serenity are your natural state of being.",
    "You are centered, grounded, and at peace with the universe.",
    "Every breath brings you deeper relaxation and harmony."
  ],
  health: [
    "Your body is healing and growing stronger every day.",
    "Vibrant health and energy flow through every cell of your being.",
    "You honor your body with love, care, and nourishment.",
    "Perfect health is your divine right, and you embrace it fully.",
    "Your mind, body, and spirit are in perfect harmony."
  ]
};

type AffirmationType = keyof typeof affirmations;

interface FavoriteAffirmation {
  text: string;
  category: AffirmationType;
  savedAt: string;
}

interface LotteryType {
  value: string;
  label: string;
  mainNumbers: number;
  maxMain: number;
  bonusNumbers?: number;
  maxBonus?: number;
  icon: string;
}

interface SavedLotteryNumbers {
  numbers: number[];
  bonusNumbers?: number[];
  type: string;
  savedAt: string;
}

const lotteryTypes: LotteryType[] = [
  { value: 'pick3', label: 'Pick 3', mainNumbers: 3, maxMain: 9, icon: '3️⃣' },
  { value: 'pick4', label: 'Pick 4', mainNumbers: 4, maxMain: 9, icon: '4️⃣' },
  { value: 'pick5', label: 'Pick 5', mainNumbers: 5, maxMain: 39, icon: '5️⃣' },
  { value: 'pick6', label: 'Pick 6', mainNumbers: 6, maxMain: 49, icon: '6️⃣' },
  { value: 'powerball', label: 'Powerball', mainNumbers: 5, maxMain: 69, bonusNumbers: 1, maxBonus: 26, icon: '⚡' },
  { value: 'megamillions', label: 'Mega Millions', mainNumbers: 5, maxMain: 70, bonusNumbers: 1, maxBonus: 25, icon: '💰' },
];

const FAVORITES_STORAGE_KEY = 'sunnyDaze_favorites';
const LOTTERY_STORAGE_KEY = 'sunnyDaze_luckyNumbers';
const PAID_READINGS_KEY = 'sunnyDaze_paidReadings';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  
  // Affirmation state
  const [selectedCategory, setSelectedCategory] = useState<AffirmationType>('confidence');
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteAffirmation[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Lottery state
  const [selectedLottery, setSelectedLottery] = useState<string>('pick6');
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);
  const [bonusNumbers, setBonusNumbers] = useState<number[]>([]);
  const [isGeneratingNumbers, setIsGeneratingNumbers] = useState(false);
  const [hasGeneratedNumbers, setHasGeneratedNumbers] = useState(false);
  const [savedLotteryNumbers, setSavedLotteryNumbers] = useState<SavedLotteryNumbers[]>([]);
  const [showSavedNumbers, setShowSavedNumbers] = useState(false);
  const [justSavedNumbers, setJustSavedNumbers] = useState(false);

  // Payment state
  const [paidReadings, setPaidReadings] = useState<number>(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Check for payment success/cancel in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      // Payment was successful
      const storedReadings = localStorage.getItem(PAID_READINGS_KEY);
      const currentReadings = storedReadings ? parseInt(storedReadings, 10) : 0;
      const newReadings = currentReadings + 1;
      localStorage.setItem(PAID_READINGS_KEY, newReadings.toString());
      setPaidReadings(newReadings);
      setPaymentSuccess(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setPaymentSuccess(false), 5000);
    }
    if (urlParams.get('canceled') === 'true') {
      setPaymentError('Payment was canceled. Try again when you\'re ready!');
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setPaymentError(null), 5000);
    }
  }, []);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites from localStorage');
      }
    }
    
    const storedLottery = localStorage.getItem(LOTTERY_STORAGE_KEY);
    if (storedLottery) {
      try {
        setSavedLotteryNumbers(JSON.parse(storedLottery));
      } catch (e) {
        console.error('Failed to parse lottery numbers from localStorage');
      }
    }

    const storedReadings = localStorage.getItem(PAID_READINGS_KEY);
    if (storedReadings) {
      setPaidReadings(parseInt(storedReadings, 10));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOTTERY_STORAGE_KEY, JSON.stringify(savedLotteryNumbers));
  }, [savedLotteryNumbers]);

  const categories: { value: AffirmationType; label: string; icon: string }[] = [
    { value: 'confidence', label: 'Confidence', icon: '💪' },
    { value: 'love', label: 'Love', icon: '💜' },
    { value: 'success', label: 'Success', icon: '⭐' },
    { value: 'peace', label: 'Peace', icon: '🕊️' },
    { value: 'health', label: 'Health', icon: '🌿' },
  ];

  const getRandomAffirmation = () => {
    const categoryAffirmations = affirmations[selectedCategory];
    const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
    return categoryAffirmations[randomIndex];
  };

  const revealAffirmation = () => {
    setIsRevealing(true);
    setHasRevealed(false);
    setJustSaved(false);
    
    setTimeout(() => {
      setCurrentAffirmation(getRandomAffirmation());
      setIsRevealing(false);
      setHasRevealed(true);
    }, 2000);
  };

  const isCurrentFavorite = () => {
    return favorites.some(fav => fav.text === currentAffirmation);
  };

  const toggleFavorite = () => {
    if (!currentAffirmation) return;

    if (isCurrentFavorite()) {
      setFavorites(prev => prev.filter(fav => fav.text !== currentAffirmation));
      setJustSaved(false);
    } else {
      const newFavorite: FavoriteAffirmation = {
        text: currentAffirmation,
        category: selectedCategory,
        savedAt: new Date().toISOString()
      };
      setFavorites(prev => [newFavorite, ...prev]);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const removeFavorite = (text: string) => {
    setFavorites(prev => prev.filter(fav => fav.text !== text));
  };

  const getCategoryIcon = (category: AffirmationType) => {
    return categories.find(c => c.value === category)?.icon || '✨';
  };

  // Lottery functions
  const generateUniqueNumbers = (count: number, max: number, allowDuplicates: boolean = false): number[] => {
    if (allowDuplicates) {
      // For Pick 3/4 style where duplicates are allowed
      return Array.from({ length: count }, () => Math.floor(Math.random() * (max + 1)));
    }
    
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    // Stripe Payment Link URL - replace with your live payment link
    // You can create a Payment Link in Stripe Dashboard > Payment Links
    const handlePay = async () => {
      try {
        const response = await fetch("http://192.168.1.207:8081/create-checkout-session", { method: "POST" });
        const data = await response.json();
        if (data.url) window.location.href = data.url;
      } catch (e) { alert("Connection Error: " + e.message); }
    };
    handlePay();
  };





  const generateLuckyNumbers = () => {
    // Check if user has paid readings available
    if (paidReadings <= 0) {
      setShowPaymentModal(true);
      return;
    }

    // Deduct a reading
    const newReadings = paidReadings - 1;
    setPaidReadings(newReadings);
    localStorage.setItem(PAID_READINGS_KEY, newReadings.toString());

    setIsGeneratingNumbers(true);
    setHasGeneratedNumbers(false);
    setJustSavedNumbers(false);
    
    const lottery = lotteryTypes.find(l => l.value === selectedLottery)!;
    
    setTimeout(() => {
      const allowDuplicates = ['pick3', 'pick4'].includes(selectedLottery);
      const mainNums = generateUniqueNumbers(lottery.mainNumbers, lottery.maxMain, allowDuplicates);
      setLuckyNumbers(mainNums);
      
      if (lottery.bonusNumbers && lottery.maxBonus) {
        const bonus = generateUniqueNumbers(lottery.bonusNumbers, lottery.maxBonus);
        setBonusNumbers(bonus);
      } else {
        setBonusNumbers([]);
      }
      
      setIsGeneratingNumbers(false);
      setHasGeneratedNumbers(true);
    }, 2500);
  };

  const isCurrentNumbersSaved = () => {
    return savedLotteryNumbers.some(
      saved => 
        saved.type === selectedLottery &&
        JSON.stringify(saved.numbers) === JSON.stringify(luckyNumbers) &&
        JSON.stringify(saved.bonusNumbers || []) === JSON.stringify(bonusNumbers)
    );
  };

  const saveLuckyNumbers = () => {
    if (!hasGeneratedNumbers) return;
    
    if (isCurrentNumbersSaved()) {
      setSavedLotteryNumbers(prev => 
        prev.filter(saved => 
          !(saved.type === selectedLottery &&
            JSON.stringify(saved.numbers) === JSON.stringify(luckyNumbers) &&
            JSON.stringify(saved.bonusNumbers || []) === JSON.stringify(bonusNumbers))
        )
      );
      setJustSavedNumbers(false);
    } else {
      const newSaved: SavedLotteryNumbers = {
        numbers: luckyNumbers,
        bonusNumbers: bonusNumbers.length > 0 ? bonusNumbers : undefined,
        type: selectedLottery,
        savedAt: new Date().toISOString()
      };
      setSavedLotteryNumbers(prev => [newSaved, ...prev]);
      setJustSavedNumbers(true);
      setTimeout(() => setJustSavedNumbers(false), 2000);
    }
  };

  const removeSavedNumbers = (index: number) => {
    setSavedLotteryNumbers(prev => prev.filter((_, i) => i !== index));
  };

  const getLotteryLabel = (type: string) => {
    return lotteryTypes.find(l => l.value === type)?.label || type;
  };

  const getLotteryIcon = (type: string) => {
    return lotteryTypes.find(l => l.value === type)?.icon || '🎱';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Payment Success Toast */}
      {paymentSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Payment Successful!</p>
              <p className="text-sm text-emerald-100">Your cosmic reading is ready. Generate your lucky numbers now!</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Error Toast */}
      {paymentError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <X className="w-6 h-6" />
            <div>
              <p className="font-semibold">Payment Issue</p>
              <p className="text-sm text-red-100">{paymentError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
          />
          <div className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => !isProcessingPayment && setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-purple-400 hover:text-white hover:bg-white/10 transition-all"
              disabled={isProcessingPayment}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Cosmic Reading</h2>
              <p className="text-purple-300 mb-6">
                Let Sunny channel the mystical energies and reveal your personalized lucky lottery numbers!
              </p>

              {/* Price display */}
              <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-amber-400">$0.99</span>
                  <span className="text-purple-400">per reading</span>
                </div>

                <ul className="text-left text-sm text-purple-200 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Personalized cosmic number generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Works with all major lottery games
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Save your lucky numbers forever
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Instant delivery after payment
                  </li>
                </ul>
              </div>

              {/* Payment button */}
              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isProcessingPayment
                    ? 'bg-purple-700/50 text-purple-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-purple-900 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 hover:shadow-amber-400/30 hover:shadow-xl'
                }`}
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay with Card
                  </>
                )}
              </button>

              {/* Security note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-purple-400/60 text-xs">
                <Lock className="w-3 h-3" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-lg mb-2">
            Sunny Daze
          </h1>
          <p className="text-purple-300 text-lg md:text-xl font-light tracking-wide">
            Your mystical guide to affirmations & lucky numbers
          </p>
        </div>

        {/* Readings Counter */}
        {paidReadings > 0 && (
          <div className="mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-200 text-sm">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              You have {paidReadings} cosmic reading{paidReadings !== 1 ? 's' : ''} available!
            </span>
          </div>
        )}

        {/* Favorites Toggle Button */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`mb-6 flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            showFavorites
              ? 'bg-pink-500/30 border border-pink-400/50 text-pink-200'
              : 'bg-white/10 border border-white/20 text-purple-200 hover:bg-white/20'
          }`}
        >
          <Heart className={`w-5 h-5 ${showFavorites ? 'fill-pink-400 text-pink-400' : ''}`} />
          <span>My Favorites</span>
          {favorites.length > 0 && (
            <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
              {favorites.length}
            </span>
          )}
        </button>

        {/* Favorites Section */}
        {showFavorites && (
          <div className="w-full max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-pink-400/30">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                <h2 className="text-xl font-semibold text-pink-200">My Favorite Affirmations</h2>
              </div>
              
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
                  <p className="text-purple-300/70">No favorites yet!</p>
                  <p className="text-purple-400/50 text-sm mt-1">
                    Tap the heart icon on any affirmation to save it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {favorites.map((fav, index) => (
                    <div
                      key={index}
                      className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getCategoryIcon(fav.category)}</span>
                            <span className="text-xs text-purple-400 capitalize">{fav.category}</span>
                          </div>
                          <p className="text-purple-100 text-sm leading-relaxed">"{fav.text}"</p>
                        </div>
                        <button
                          onClick={() => removeFavorite(fav.text)}
                          className="p-2 rounded-full text-purple-400/50 hover:text-pink-400 hover:bg-pink-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          title="Remove from favorites"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crystal Ball Container */}
        <div className="relative mb-8">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl scale-150" />
          
          {/* Crystal Ball */}
          <div 
            className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full cursor-pointer transition-all duration-500 ${isRevealing ? 'scale-105' : 'hover:scale-105'}`}
            onClick={revealAffirmation}
          >
            {/* Ball background with swirling effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/40 via-purple-600/50 to-blue-800/60 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
              {/* Animated swirl inside */}
              <div className={`absolute inset-4 rounded-full bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-400/30 ${isRevealing ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
              <div className={`absolute inset-8 rounded-full bg-gradient-to-bl from-indigo-400/20 via-transparent to-purple-500/20 ${isRevealing ? 'animate-spin' : ''}`} style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/10 via-transparent to-transparent" />
              
              {/* Reflection highlight */}
              <div className="absolute top-4 left-8 w-16 h-8 md:w-20 md:h-10 bg-white/30 rounded-full blur-md transform -rotate-45" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {isRevealing ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-purple-300/50 border-t-yellow-300 rounded-full animate-spin" />
                    <p className="text-purple-200 mt-4 text-sm animate-pulse">Sunny is gazing...</p>
                  </div>
                ) : hasRevealed ? (
                  <p className="text-center text-white/90 text-sm md:text-base font-medium leading-relaxed px-4">
                    "{currentAffirmation}"
                  </p>
                ) : (
                  <p className="text-purple-200/80 text-center text-sm md:text-base">
                    Tap the crystal ball to receive your affirmation
                  </p>
                )}
              </div>
            </div>
            
            {/* Stand */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-6 bg-gradient-to-b from-amber-600 via-amber-500 to-amber-700 rounded-t-full shadow-lg" />
              <div className="w-40 h-4 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-b-lg shadow-xl mx-auto -mt-1" style={{ marginLeft: '-4px' }} />
            </div>
          </div>

          {/* Heart/Favorite Button */}
          {hasRevealed && currentAffirmation && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
              className={`absolute -right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
                isCurrentFavorite()
                  ? 'bg-pink-500/30 border border-pink-400/50 scale-110'
                  : 'bg-white/10 border border-white/20 hover:bg-pink-500/20 hover:border-pink-400/30'
              }`}
              title={isCurrentFavorite() ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-6 h-6 transition-all duration-300 ${
                  isCurrentFavorite()
                    ? 'fill-pink-400 text-pink-400'
                    : 'text-pink-300 hover:text-pink-400'
                }`}
              />
            </button>
          )}
        </div>

        {/* Saved notification */}
        {justSaved && (
          <div className="mb-4 px-4 py-2 bg-pink-500/20 border border-pink-400/30 rounded-full text-pink-200 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              Saved to favorites!
            </span>
          </div>
        )}

        {/* Sunny's greeting */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-md mx-auto border border-white/20 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
              ☀️
            </div>
            <div>
              <p className="text-yellow-300 font-semibold mb-1">Sunny says:</p>
              <p className="text-purple-100 text-sm leading-relaxed">
                "Welcome, beautiful soul! I'm Sunny, your mystical guide. Choose a category below, then tap my crystal ball to receive a personalized affirmation just for you. The universe has wonderful messages waiting!"
              </p>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="w-full max-w-lg mx-auto">
          <h3 className="text-center text-purple-200 mb-4 font-medium">Choose your affirmation category:</h3>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-purple-600/50 to-indigo-600/50 border border-purple-400/50 shadow-lg'
                      : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={selectedCategory === category.value}
                    onChange={(e) => setSelectedCategory(e.target.value as AffirmationType)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedCategory === category.value
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-purple-400/50'
                  }`}>
                    {selectedCategory === category.value && (
                      <div className="w-2 h-2 rounded-full bg-purple-900" />
                    )}
                  </div>
                  <span className="text-2xl">{category.icon}</span>
                  <span className={`font-medium ${
                    selectedCategory === category.value ? 'text-white' : 'text-purple-200'
                  }`}>
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={revealAffirmation}
          disabled={isRevealing}
          className={`mt-8 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl ${
            isRevealing
              ? 'bg-purple-700/50 text-purple-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-purple-900 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-300 hover:scale-105 hover:shadow-amber-400/30 hover:shadow-2xl'
          }`}
        >
          {isRevealing ? 'Consulting the cosmos...' : 'Reveal My Affirmation'}
        </button>

        {/* Divider */}
        <div className="w-full max-w-2xl mx-auto my-16">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Lucky Numbers</span>
              <Star className="w-5 h-5" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
        </div>

        {/* Lottery Section */}
        <div className="w-full max-w-2xl mx-auto">
          {/* Sunny's Lottery Message */}
          <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-green-900/30 backdrop-blur-md rounded-2xl p-6 mb-8 border border-emerald-500/30 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                🍀
              </div>
              <div>
                <p className="text-emerald-300 font-semibold mb-1">Sunny's Lucky Numbers:</p>
                <p className="text-green-100 text-sm leading-relaxed">
                  "Feeling lucky? Let me channel the cosmic energies and reveal YOUR winning lottery numbers! Select your game type below, and I'll gaze into the mystical realm to find the numbers aligned with your fortune today!"
                </p>
              </div>
            </div>
          </div>

          {/* Premium Feature Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 text-sm font-medium">Premium Cosmic Reading - $0.99</span>
            </div>
          </div>


          {/* Saved Numbers Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowSavedNumbers(!showSavedNumbers)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                showSavedNumbers
                  ? 'bg-emerald-500/30 border border-emerald-400/50 text-emerald-200'
                  : 'bg-white/10 border border-white/20 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Star className={`w-5 h-5 ${showSavedNumbers ? 'fill-emerald-400 text-emerald-400' : ''}`} />
              <span>My Lucky Numbers</span>
              {savedLotteryNumbers.length > 0 && (
                <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {savedLotteryNumbers.length}
                </span>
              )}
            </button>
          </div>

          {/* Saved Numbers Section */}
          {showSavedNumbers && (
            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                  <h2 className="text-xl font-semibold text-emerald-200">My Saved Lucky Numbers</h2>
                </div>
                
                {savedLotteryNumbers.length === 0 ? (
                  <div className="text-center py-8">
                    <Clover className="w-12 h-12 text-emerald-400/50 mx-auto mb-3" />
                    <p className="text-emerald-300/70">No lucky numbers saved yet!</p>
                    <p className="text-emerald-400/50 text-sm mt-1">
                      Generate some numbers and tap the star to save them.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {savedLotteryNumbers.map((saved, index) => (
                      <div
                        key={index}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg">{getLotteryIcon(saved.type)}</span>
                              <span className="text-xs text-emerald-400">{getLotteryLabel(saved.type)}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {saved.numbers.map((num, i) => (
                                <div
                                  key={i}
                                  className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                >
                                  {num}
                                </div>
                              ))}
                              {saved.bonusNumbers && saved.bonusNumbers.map((num, i) => (
                                <div
                                  key={`bonus-${i}`}
                                  className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeSavedNumbers(index)}
                            className="p-2 rounded-full text-purple-400/50 hover:text-red-400 hover:bg-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lottery Type Selection */}
          <div className="mb-8">
            <h3 className="text-center text-emerald-200 mb-4 font-medium">Choose your lottery game:</h3>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lotteryTypes.map((lottery) => (
                  <label
                    key={lottery.value}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedLottery === lottery.value
                        ? 'bg-gradient-to-br from-emerald-600/50 to-green-600/50 border border-emerald-400/50 shadow-lg'
                        : 'bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="lottery"
                      value={lottery.value}
                      checked={selectedLottery === lottery.value}
                      onChange={(e) => setSelectedLottery(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-3xl">{lottery.icon}</span>
                    <span className={`font-medium text-sm text-center ${
                      selectedLottery === lottery.value ? 'text-white' : 'text-purple-200'
                    }`}>
                      {lottery.label}
                    </span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedLottery === lottery.value
                        ? 'border-emerald-400 bg-emerald-400'
                        : 'border-purple-400/50'
                    }`}>
                      {selectedLottery === lottery.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-green-900" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Lottery Ball Display */}
          <div className="relative mb-8">
            <div className="bg-gradient-to-br from-slate-900/80 via-green-950/50 to-slate-900/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-500/30 shadow-2xl min-h-[200px] flex flex-col items-center justify-center">
              {/* Mystical glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 pointer-events-none" />
              
              {isGeneratingNumbers ? (
                <div className="flex flex-col items-center">
                  <div className="flex gap-3 mb-4">
                    {[...Array(lotteryTypes.find(l => l.value === selectedLottery)?.mainNumbers || 6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-emerald-600/50 to-green-700/50 animate-pulse flex items-center justify-center"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <span className="text-2xl animate-spin" style={{ animationDuration: '0.5s' }}>?</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-emerald-300 animate-pulse">Channeling cosmic energies...</p>
                </div>
              ) : hasGeneratedNumbers ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-wrap justify-center gap-3 mb-4">
                    {luckyNumbers.map((num, i) => (
                      <div
                        key={i}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-emerald-500/30 animate-in zoom-in duration-300"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {num}
                      </div>
                    ))}
                    {bonusNumbers.length > 0 && (
                      <>
                        <div className="flex items-center px-2">
                          <span className="text-emerald-400 text-2xl">+</span>
                        </div>
                        {bonusNumbers.map((num, i) => (
                          <div
                            key={`bonus-${i}`}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg shadow-amber-500/30 animate-in zoom-in duration-300"
                            style={{ animationDelay: `${(luckyNumbers.length + i) * 0.1}s` }}
                          >
                            {num}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <p className="text-emerald-300 text-sm">Your lucky numbers for {getLotteryLabel(selectedLottery)}!</p>
                  
                  {/* Save button */}
                  <button
                    onClick={saveLuckyNumbers}
                    className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isCurrentNumbersSaved()
                        ? 'bg-emerald-500/30 border border-emerald-400/50 text-emerald-200'
                        : 'bg-white/10 border border-white/20 text-purple-200 hover:bg-emerald-500/20 hover:border-emerald-400/30'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${isCurrentNumbersSaved() ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                    <span>{isCurrentNumbersSaved() ? 'Saved!' : 'Save Numbers'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex justify-center gap-3 mb-4 opacity-30">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-emerald-600/30 to-green-700/30 border border-emerald-500/20"
                      />
                    ))}
                  </div>
                  <p className="text-emerald-300/60">Select a game and click below to reveal your lucky numbers</p>
                </div>
              )}
            </div>
          </div>

          {/* Saved notification for numbers */}
          {justSavedNumbers && (
            <div className="flex justify-center mb-4">
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-200 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  Lucky numbers saved!
                </span>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={generateLuckyNumbers}
              disabled={isGeneratingNumbers}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl flex items-center gap-3 ${
                isGeneratingNumbers
                  ? 'bg-green-700/50 text-green-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 text-white hover:from-emerald-400 hover:via-green-400 hover:to-emerald-400 hover:scale-105 hover:shadow-emerald-400/30 hover:shadow-2xl'
              }`}
            >
              {isGeneratingNumbers ? (
                'Reading the stars...'
              ) : paidReadings > 0 ? (
                <>🍀 Generate Lucky Numbers</>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Unlock Cosmic Reading - $0.99
                </>

              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-purple-400/60 text-sm">
          <p>Made with mystical energy by Sunny Daze</p>
          <p className="mt-1">✨ Spread positivity & good fortune ✨</p>
          <p className="mt-2 text-xs text-purple-500/40">For entertainment purposes only. Please play responsibly.</p>
        </footer>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
