import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer id="contact" className="bg-secondary text-secondary-foreground py-14 mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-lg font-extrabold tracking-tight">
            Param<span className="text-accent">TECH</span>
          </span>
          <p className="text-sm text-secondary-foreground/60 mt-3">
            KOBİ'lerin dijital dönüşüm platformu.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Ürünler</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <p className="hover:text-accent cursor-pointer transition-colors">Ödeme Çözümleri</p>
            <p className="hover:text-accent cursor-pointer transition-colors">E-Ticaret</p>
            <p className="hover:text-accent cursor-pointer transition-colors">Muhasebe</p>
            <p className="hover:text-accent cursor-pointer transition-colors">ERP Yazılımı</p>
            <p className="hover:text-accent cursor-pointer transition-colors">Lojistik</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Hızlı Linkler</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <Link to="/kobi/signup" className="block hover:text-accent transition-colors">KOBİ Kaydı</Link>
            <Link to="/login" className="block hover:text-accent transition-colors">Bayi Girişi</Link>
            <a href="#how" className="block hover:text-accent transition-colors">Nasıl Çalışır?</a>
            <a href="#solutions" className="block hover:text-accent transition-colors">Çözümler</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">İletişim</h4>
          <div className="space-y-2.5 text-sm text-secondary-foreground/60">
            <p>info@paramtech.com.tr</p>
            <p>+90 212 XXX XX XX</p>
            <p>İstanbul, Türkiye</p>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 mt-10 pt-8 text-center text-xs text-secondary-foreground/40">
        © 2026 ParamTech. Tüm hakları saklıdır.
      </div>
    </div>
  </footer>
);

export default FooterSection;
