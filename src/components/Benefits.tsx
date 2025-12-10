import { Leaf, Shield, Award, Heart } from 'lucide-react';
import halalLogo from '../assets/Halal_logo.png';

const benefits = [
  {
    icon: Leaf,
    title: 'Табиий таркиб',
    description: '100% ўсимлик асосидаги компонентлар, кимёвий қўшимчаларсиз',
    type: 'icon' as const
  },
  {
    icon: Shield,
    title: 'Хавфсиз',
    description: 'Тиббий текширувлардан ўтган, ёш чеклови йўқ',
    type: 'icon' as const
  },
  {
    icon: Award,
    title: 'Самарали',
    description: 'Биринчи ойдан кейин натижа кўринади',
    type: 'icon' as const
  },
  {
    icon: Heart,
    title: 'Халол сертификатли',
    description: 'Халқаро сифат стандартларига мос',
    type: 'image' as const,
    image: halalLogo
  }
];

export function Benefits() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Нима учун Nutva Complex?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Суяклар ва буғимларнинг саломатлиги учун мукаммал ечим
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                {benefit.type === 'image' ? (
                  <img src={benefit.image} alt={benefit.title} className="w-10 h-10 object-contain" />
                ) : (
                  <benefit.icon className="w-8 h-8 text-green-600" />
                )}
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
