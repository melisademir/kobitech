import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const Welcome = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-8">
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg text-center space-y-8">
      <div className="w-20 h-20 rounded-2xl gradient-primary mx-auto flex items-center justify-center">
        <Rocket className="h-10 w-10 text-primary-foreground" />
      </div>
      <h1 className="text-3xl font-extrabold text-foreground">
        Dijital Dönüşüm Yolculuğuna<br />Hoş Geldiniz! 🚀
      </h1>
      <p className="text-muted-foreground text-lg">3 kısa adımda işletmenizi tanıyalım ve size özel dijital dönüşüm yol haritanızı oluşturalım</p>
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-8 rounded-full bg-primary" />
        <div className="h-2 w-8 rounded-full bg-border" />
        <div className="h-2 w-8 rounded-full bg-border" />
      </div>
      <p className="text-sm text-muted-foreground">Adım 1/3</p>
      <Button asChild variant="hero" size="lg">
        <Link to="/kobi/step-1">Başlayalım</Link>
      </Button>
    </motion.div>
  </div>
);

export default Welcome;
