import { Phone, MessageCircle } from 'lucide-react';
import productImage from 'figma:asset/64d481b04d5ad2e13f065d859f615bbf93fc239b.png';
import { useState } from 'react';
import { OrderModal } from './OrderModal';

export function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl">
                Бугуноқ буюртма беринг!
              </h2>
              <p className="text-xl text-green-50">
                Махсус таклиф: биринчи харидорларга 30% чегирма
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-white text-green-600 hover:bg-green-50 py-4 rounded-lg transition-colors mb-4"
                >
                  Буюртма бериш
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-green-100">Телефон орқали</p>
                    <p className="text-xl">+998 90 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-green-100">Telegram орқали</p>
                    <p className="text-xl">@nutva_complex</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Бепул етказиб бериш
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Махсулотни олганингиздан кейин тўланг
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Расмий кафолат
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={productImage} 
                alt="Nutva Complex" 
                className="w-full max-w-sm drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}