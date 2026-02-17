import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { sectorList, sectorIcons, needsList, existingSystemsList, employeeSizes, turkishCities } from "@/data/sectors";

export interface CustomerProfile {
  companyName: string;
  sector: string;
  employeeSize: string;
  city: string;
  needs: string[];
  existingSystems: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface Props {
  onSubmit: (profile: CustomerProfile) => void;
  hasResults: boolean;
  loading: boolean;
}

const CustomerForm = ({ onSubmit, hasResults, loading }: Props) => {
  const [profile, setProfile] = useState<CustomerProfile>({
    companyName: "", sector: "", employeeSize: "", city: "",
    needs: [], existingSystems: [],
    contactName: "", contactEmail: "", contactPhone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [systemsOpen, setSystemsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const update = (key: keyof CustomerProfile, val: string) => {
    setProfile(p => ({ ...p, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  };

  const toggleNeed = (n: string) =>
    setProfile(p => ({ ...p, needs: p.needs.includes(n) ? p.needs.filter(x => x !== n) : [...p.needs, n] }));

  const toggleSystem = (s: string) => {
    if (s === "Hiçbiri yok") {
      setProfile(p => ({ ...p, existingSystems: p.existingSystems.includes(s) ? [] : [s] }));
    } else {
      setProfile(p => ({
        ...p,
        existingSystems: p.existingSystems.includes(s)
          ? p.existingSystems.filter(x => x !== s)
          : [...p.existingSystems.filter(x => x !== "Hiçbiri yok"), s],
      }));
    }
  };

  const isValid = profile.companyName && profile.sector && profile.employeeSize;

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!profile.companyName) newErrors.companyName = "Şirket adı gerekli";
    if (!profile.sector) newErrors.sector = "Sektör seçimi zorunlu";
    if (!profile.employeeSize) newErrors.employeeSize = "Çalışan sayısı gerekli";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit(profile);
  };

  return (
    <div className="bg-card rounded-2xl shadow-premium p-7 sticky top-[90px]">
      <h2 className="text-xl font-bold text-foreground border-b-[3px] border-primary pb-3 mb-5">
        Müşteri Bilgileri
      </h2>

      {/* Tab (MVP: single) */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
          Yeni Müşteri
        </button>
        <button className="px-4 py-2 rounded-lg border-2 border-border text-muted-foreground text-sm font-medium opacity-50 cursor-not-allowed">
          Mevcut Müşteri
        </button>
      </div>

      {/* Temel Bilgiler */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Temel Bilgiler</p>

      <div className="space-y-4">
        {/* Şirket Adı */}
        <div>
          <label className="text-sm font-semibold text-foreground">
            Şirket Adı <span className="text-destructive">*</span>
          </label>
          <Input
            value={profile.companyName}
            onChange={e => update("companyName", e.target.value)}
            placeholder="Örn: ABC Tekstil Ltd. Şti."
            className={`mt-1 h-12 border-2 rounded-lg ${errors.companyName ? "border-destructive" : "focus:border-primary"}`}
          />
          {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName}</p>}
        </div>

        {/* Sektör */}
        <div>
          <label className="text-sm font-semibold text-foreground flex items-center gap-1">
            ⭐ Sektör <span className="text-destructive text-xs">(Zorunlu)</span>
          </label>
          <Select
            value={profile.sector}
            onValueChange={v => {
              update("sector", v);
              toast({ title: `Sektör seçildi: ${v} ✓`, duration: 2000 });
            }}
          >
            <SelectTrigger className="mt-1 h-12 border-2 border-primary rounded-lg font-medium">
              <SelectValue placeholder="Sektör seçiniz..." />
            </SelectTrigger>
            <SelectContent className="bg-card z-50 max-h-[300px]">
              {sectorList.map(s => (
                <SelectItem key={s} value={s}>
                  <span className="flex items-center gap-2">
                    <span>{sectorIcons[s]}</span> {s}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sector && <p className="text-xs text-destructive mt-1">{errors.sector}</p>}
          <div className="bg-primary/5 rounded-lg p-2 mt-2 text-xs text-primary">
            💡 Sektör seçimi ürün önerilerini doğrudan etkiler. Doğru seçim yapın!
          </div>
        </div>

        {/* Çalışan Sayısı */}
        <div>
          <label className="text-sm font-semibold text-foreground">
            Çalışan Sayısı <span className="text-destructive">*</span>
          </label>
          <Select value={profile.employeeSize} onValueChange={v => update("employeeSize", v)}>
            <SelectTrigger className="mt-1 h-12 border-2 rounded-lg focus:border-primary">
              <SelectValue placeholder="Seçiniz..." />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              {employeeSizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.employeeSize && <p className="text-xs text-destructive mt-1">{errors.employeeSize}</p>}
        </div>

        {/* Şehir */}
        <div>
          <label className="text-sm font-semibold text-foreground">Şehir</label>
          <Select value={profile.city} onValueChange={v => update("city", v)}>
            <SelectTrigger className="mt-1 h-12 border-2 rounded-lg focus:border-primary">
              <SelectValue placeholder="Seçiniz (opsiyonel)" />
            </SelectTrigger>
            <SelectContent className="bg-card z-50 max-h-[250px]">
              {turkishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* İhtiyaç Analizi */}
      <div className="mt-7">
        <h3 className="text-base font-bold text-foreground mb-1">Müşterinin İhtiyaçları</h3>
        <p className="text-xs text-muted-foreground italic mb-3">Birden fazla seçebilirsiniz</p>
        <div className="space-y-2.5">
          {needsList.map(n => (
            <label
              key={n}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <Checkbox
                checked={profile.needs.includes(n)}
                onCheckedChange={() => toggleNeed(n)}
                className="h-5 w-5 border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium text-foreground">{n}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mevcut Sistemler - Collapsible */}
      <div className="mt-6 border-t border-border pt-4">
        <button
          onClick={() => setSystemsOpen(!systemsOpen)}
          className={`flex items-center justify-between w-full text-sm font-medium ${systemsOpen ? "text-primary" : "text-muted-foreground"}`}
        >
          <span>Mevcut Sistemleri (opsiyonel)</span>
          {systemsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {systemsOpen && (
          <div className="mt-3 space-y-2.5">
            <p className="text-xs text-muted-foreground">Varsa işaretleyin, daha iyi öneri alırsınız</p>
            {existingSystemsList.map(s => (
              <label key={s} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors">
                <Checkbox
                  checked={profile.existingSystems.includes(s)}
                  onCheckedChange={() => toggleSystem(s)}
                  className="h-5 w-5 border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm font-medium text-foreground">{s}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* İletişim - Collapsible */}
      <div className="mt-4 border-t border-border pt-4">
        <button
          onClick={() => setContactOpen(!contactOpen)}
          className={`flex items-center justify-between w-full text-sm font-medium ${contactOpen ? "text-primary" : "text-muted-foreground"}`}
        >
          <span>İletişim Bilgileri (teklif için)</span>
          {contactOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {!contactOpen && <p className="text-xs text-muted-foreground mt-1">Teklif hazırlarken gerekli olacak</p>}
        {contactOpen && (
          <div className="mt-3 space-y-3">
            <Input placeholder="İletişim Kişisi" value={profile.contactName} onChange={e => update("contactName", e.target.value)} className="h-11 border-2 rounded-lg focus:border-primary" />
            <Input type="email" placeholder="E-posta" value={profile.contactEmail} onChange={e => update("contactEmail", e.target.value)} className="h-11 border-2 rounded-lg focus:border-primary" />
            <Input placeholder="Telefon" value={profile.contactPhone} onChange={e => update("contactPhone", e.target.value)} className="h-11 border-2 rounded-lg focus:border-primary" />
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        size="lg"
        className="w-full mt-6"
        disabled={!isValid || loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Öneriler hazırlanıyor...
          </span>
        ) : hasResults ? "Önerileri Yenile 🎯" : "ÖNERİLERİ GÖSTER 🎯"}
      </Button>

      {/* Info Box */}
      <div className="mt-5 bg-primary/5 border-l-4 border-primary rounded-lg p-4 flex gap-3">
        <span className="text-lg">💡</span>
        <p className="text-sm text-foreground">
          <strong>Sektör seçimi çok önemli!</strong> Müşterinizin sektörünü doğru seçtiğinizden emin olun. Sektör, ürün önerilerini ve eşleşme skorlarını doğrudan etkiler.
        </p>
      </div>
    </div>
  );
};

export default CustomerForm;
