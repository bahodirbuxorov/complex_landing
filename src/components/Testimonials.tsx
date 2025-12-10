import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Фарида Усмонова',
    age: 58,
    city: 'Тошкент',
    text: '3 йил давомида тизза оғриғи билан яшадим. Операция қилишдан қўрқардим. Nutva Complex ичишни бошлаганимдан кейин 1 ойда яхшиланишларни сездим. Энди оғриқсиз юраман!',
    rating: 5
  },
  {
    name: 'Баҳодир Раҳимов',
    age: 45,
    city: 'Самарқанд',
    text: 'Спортчи бўлганим учун грижаларимга катта юк тушар эди. Nutva Complex мени тиклашга жуда ёрдам берди. Ҳамма спортчиларга тавсия қиламан!',
    rating: 5
  },
  {
    name: 'Нодира Аҳмедова',
    age: 62,
    city: 'Бухоро',
    text: 'Остеопороз ташхиси қўйилган эди. Шифокор Nutva Complex ичишни маслаҳат берди. 3 ой ичиб, тиббий текширувда суяк зичлиги яхшиланганини кўрдик. Миннатдорман!',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Мижозларимиз фикри
          </h2>
          <p className="text-lg text-gray-600">
            Минглаб одамлар Nutva Complex билан саломатликларини тиклади
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-green-50 p-6 rounded-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">&quot;{testimonial.text}&quot;</p>
              <div className="border-t border-green-200 pt-4">
                <p className="text-gray-900">{testimonial.name}, {testimonial.age} ёш</p>
                <p className="text-gray-600">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
