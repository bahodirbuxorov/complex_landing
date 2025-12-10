import { CheckCircle } from 'lucide-react';

const features = [
  'Суяклар зичлигини оширади',
  'Грижа оғриғини камайтирadi',
  'Хуштагини тиклайди',
  'Яллиғланишга қарши таъсир кўрсатади',
  'Ҳаракатчанликни яхшилайди',
  'Метаболизмни тартибга солади',
  'Иммунитетни мустаҳкамлайди',
  'Умумий соғлиқни яхшилайди'
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Nutva Complex таъсири
            </h2>
            <p className="text-lg text-gray-600">
              Маҳсулот танангизга қандай ёрдам беради
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-white p-4 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
