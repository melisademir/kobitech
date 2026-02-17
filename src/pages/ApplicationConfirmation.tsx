import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ApplicationConfirmation = () => {
  const appId = `BAYI-2024-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md space-y-8">
        <div className="mx-auto w-28 h-28 rounded-full gradient-primary flex items-center justify-center text-5xl">
          ✉️
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">Başvurunuz Alındı!</h1>
          <p className="text-lg">
            Başvuru numaranız: <span className="font-bold text-primary">#{appId}</span>
          </p>
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-5 text-left text-sm text-muted-foreground space-y-2">
          <p>Param ekibimiz başvurunuzu 2 iş günü içinde değerlendirecek.</p>
          <p>Onay sürecinde sorularınız için:</p>
          <p className="font-medium text-foreground">bayi@param.com | 0850 XXX XX XX</p>
        </div>

        <Button asChild size="lg">
          <Link to="/">Ana Sayfaya Dön</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ApplicationConfirmation;
