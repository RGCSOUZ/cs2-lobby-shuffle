import cutiaLogo from "@/assets/cutia-logo.png";

const Footer = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo CSGO Cotia */}
        <div className="flex items-center gap-3">
          <img 
            src={cutiaLogo} 
            alt="CSGO Cotia Logo" 
            className="w-10 h-10 rounded-full object-cover border border-primary/30"
          />
          <span className="font-orbitron text-sm text-primary font-bold tracking-wider">
            CSGO COTIA
          </span>
        </div>

        {/* Assinatura */}
        <div className="text-muted-foreground text-xs font-mono">
          <span className="opacity-60">by</span>{" "}
          <span className="text-primary/80 font-semibold">rgcs</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
