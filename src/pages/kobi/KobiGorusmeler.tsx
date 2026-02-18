import { useState } from "react";
import KobiLayout from "@/components/layout/KobiLayout";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockConversations = [
  { id: 1, name: "Admin", lastMessage: "Teklifiniz hazırlandı", time: "14:30", unread: 1 },
  { id: 2, name: "Ahmet Yılmaz (Bayi)", lastMessage: "POS kurulumu hakkında", time: "Dün", unread: 0 },
];

const mockMessages = [
  { id: 1, sender: "them", text: "Merhaba, teklifiniz hazırlandı. İncelemenizi bekliyoruz.", time: "14:30" },
  { id: 2, sender: "me", text: "Teşekkürler, inceliyorum.", time: "14:35" },
  { id: 3, sender: "them", text: "Sorularınız olursa yazabilirsiniz.", time: "14:36" },
];

const KobiGorusmeler = () => {
  const [selectedConv, setSelectedConv] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <KobiLayout>
      <div className="h-[calc(100vh-140px)] flex rounded-2xl border border-border overflow-hidden bg-card">
        {/* Left - Conversations */}
        <div className="w-80 border-r border-border flex-col hidden md:flex">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-foreground">Görüşmeler</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(c => (
              <button key={c.id} onClick={() => setSelectedConv(c.id)} className={`w-full text-left p-4 border-b border-border transition-colors ${selectedConv === c.id ? "bg-primary/5" : "hover:bg-background"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  {c.unread > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{c.unread}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-foreground">{mockConversations.find(c => c.id === selectedConv)?.name}</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map(m => (
              <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${m.sender === "me" ? "gradient-primary text-primary-foreground" : "bg-background border border-border text-foreground"}`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <button className="text-muted-foreground hover:text-primary"><Paperclip className="h-5 w-5" /></button>
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Mesajınızı yazın..." className="flex-1 h-10 px-4 rounded-full bg-background border border-border text-sm focus:border-primary focus:outline-none" />
              <Button size="icon" variant="hero" className="rounded-full"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </KobiLayout>
  );
};

export default KobiGorusmeler;
