import productImage from 'figma:asset/64d481b04d5ad2e13f065d859f615bbf93fc239b.png';
import { useState } from 'react';
import { X, Check, User, Phone, Send, Shield, Star, Truck } from 'lucide-react';
import { sendToGoogleSheet } from '../lib/googleSheet';

export function Hero() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Telefon raqam formatlash funksiyasi
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = numbers;
    if (!formatted.startsWith('998')) {
      if (formatted.length > 0) {
        formatted = '998' + formatted;
      }
    }
    if (formatted.length === 0) return '';
    if (formatted.length <= 3) return `+${formatted}`;
    if (formatted.length <= 5) return `+${formatted.slice(0, 3)} ${formatted.slice(3)}`;
    if (formatted.length <= 8) return `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5)}`;
    if (formatted.length <= 10) return `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8)}`;
    return `+${formatted.slice(0, 3)} ${formatted.slice(3, 5)} ${formatted.slice(5, 8)} ${formatted.slice(8, 10)} ${formatted.slice(10, 12)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Telefon raqam validatsiyasi
    const phoneNumbers = phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 12) {
      alert('Iltimos, to\'liq telefon raqamini kiriting');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await sendToGoogleSheet({
        name,
        phone,
        sheet: "Complex",
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-white py-16 md:py-24 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-full shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              100% Табиий маҳсулот
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-600 leading-tight">
                Операция шарт эмас!
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
              
              <p className="text-xl md:text-2xl text-gray-800 mt-4">
                Суяк емирилиши ва грижа муаммоларига <span className="inline-flex items-center gap-1 text-green-600"><Check className="w-5 h-5" /> табиий ечим</span> бор!
              </p>
            </div>
            
            {/* Statistics */}
            <div className="bg-white/60 backdrop-blur-sm border border-green-100 rounded-xl p-4 shadow-md">
              <p className="text-gray-700 text-center">
                Nutva Complex минглаб одамларга оғриқсиз юриш ва нормал ҳаётга қайтишига ёрдам берди.
              </p>
            </div>
            
            {/* Order Form */}
            {!isSubmitted ? (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-green-100">
                <h3 className="text-xl text-gray-900 mb-4">
                  Буюртма бериш
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Исмингиз"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="+998 90 123 45 67"
                      maxLength={18}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Юборилмоқда...</span>
                      </>
                    ) : (
                      <>
                        <span>Юбориш</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Бепул етказиб бериш • Олганингиздан кейин тўланг
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border border-green-200 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-2">
                  Раҳмат!
                </h3>
                <p className="text-gray-600">
                  Тез орада сиз билан боғланамиз
                </p>
              </div>
            )}
          </div>
          
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200/30 rounded-full blur-3xl scale-75"></div>
              <img 
                src={productImage} 
                alt="Nutva Complex" 
                className="relative w-full max-w-md md:max-w-lg drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}