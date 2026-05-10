import { ArrowRight } from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <div className="flex flex-col min-h-[100dvh] pt-8 pb-6 text-center animate-fade-up px-4">
      <div className="flex justify-center mb-5">
        <div className="inline-block border border-primary/40 text-primary text-[11px] tracking-[0.18em] uppercase px-[18px] py-1.5 rounded-full">
          ✦ Diagnóstico Financeiro Pessoal
        </div>
      </div>

      <h1 className="font-display text-[clamp(28px,6vw,52px)] leading-[1.08] font-black mb-4 text-gradient-hero">
        Por que o seu dinheiro some todo mês?
      </h1>

      <p className="text-[15px] text-muted-foreground leading-[1.6] max-w-[480px] mx-auto mb-6 font-light">
        7 perguntas diretas para identificar exatamente o que está bloqueando sua estrutura financeira.
      </p>

      <div className="flex justify-center gap-8 mb-6 flex-wrap">
        {[
          { num: "7", label: "Perguntas" },
          { num: "3min", label: "Duração" },
          { num: "100%", label: "Gratuito" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="font-display text-[24px] font-bold text-primary block">{stat.num}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-auto">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2.5 gradient-gold text-primary-foreground border-none px-10 py-[18px] text-[15px] font-bold tracking-wider uppercase rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] active:translate-y-0 group w-full max-w-sm justify-center"
        >
          Descobrir meu diagnóstico
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
