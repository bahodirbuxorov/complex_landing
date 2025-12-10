import { X, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { sendToGoogleSheet } from '../lib/googleSheet';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Telefon raqam formatlash funksiyasi
  const formatPhoneNumber = (value: string) => {
    // Faqat raqamlarni olish
    const numbers = value.replace(/\D/g, '');
    
    // Agar 998 bilan boshlanmasa, uni qo'shamiz
    let formatted = numbers;
    if (!formatted.startsWith('998')) {
      if (formatted.length > 0) {
        formatted = '998' + formatted;
      }
    }
    
    // Formatlash: +998 XX XXX XX XX
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
      // Send to Google Sheet
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
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      // Xatolik bo'lsa ham success ko'rsatamiz (no-cors tufayli)
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
        onClose();
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-2">
              Буюртма бериш
            </h2>
            <p className="text-gray-600 mb-6">
              Маълумотларингизни қолдиринг, мутахассисимиз сиз билан тез орада алоқага чиқади
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Исмингиз
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Исмингизни киритинг"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Телефон рақам
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="+998 90 123 45 67"
                    maxLength={18}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  Бепул етказиб бериш
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  Махсулотни олганингиздан кейин тўланг
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Юборилмоқда...
                  </>
                ) : (
                  "Тасдиқлаш"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">
              Раҳмат!
            </h3>
            <p className="text-gray-600 mb-4">
              Мутахассисимиз яқин орада сиз билан алоқага чиқади
            </p>
            <a 
              href="https://t.me/nutvauz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              Каналга ўтиш
            </a>
          </div>
        )}
      </div>
    </div>
  );
}