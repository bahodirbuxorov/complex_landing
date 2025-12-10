export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl mb-4">Nutva Complex</h3>
            <p className="text-gray-400">
              Суяк ва грижа саломатлиги учун табиий ечим
            </p>
          </div>
          <div>
            <h4 className="text-white mb-4">Алоқа</h4>
            <p className="mb-2">Телефон: +998 90 123 45 67</p>
            <p className="mb-2">Telegram: @nutva_complex</p>
            <p>Email: info@nutvacomplex.uz</p>
          </div>
          <div>
            <h4 className="text-white mb-4">Маълумот</h4>
            <p className="mb-2">Ишлаш вақти: 9:00 - 21:00</p>
            <p className="mb-2">Ҳар куни, дам олиш кунлари ҳам</p>
            <p>Етказиб бериш: Ўзбекистон бўйлаб</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p className="mb-2">
            &copy; 2025 Nutva Complex. Барча ҳуқуқлар ҳимояланган.
          </p>
          <p className="text-sm">
            Диққат: Бу маҳсулот касалликларни даволаш учун эмас. Истеъмол қилишдан олdin шифокор билан маслаҳатлашинг.
          </p>
        </div>
      </div>
    </footer>
  );
}
