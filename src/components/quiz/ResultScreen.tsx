import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { QuizResult } from "@/data/quizData";

interface ResultScreenProps {
  result: QuizResult;
  pct: number;
}

const ResultScreen = ({ result, pct }: ResultScreenProps) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="pt-[52px] animate-fade-up">
      <div className="inline-flex items-center gap-2 border border-primary/35 text-primary text-[11px] tracking-[0.15em] uppercase px-4 py-[7px] rounded-full mb-7">
        ✦ Seu diagnóstico
      </div>

      <h2 className="font-display text-[clamp(28px,5vw,42px)] leading-[1.15] font-black mb-5 text-foreground">
        {result.title} <span className="text-primary">{result.titleHighlight}</span>
      </h2>

      <p className="text-base leading-[1.8] text-muted-foreground mb-10 font-light">{result.description}</p>

      <div className="bg-foreground/[0.03] border border-foreground/[0.07] rounded-lg p-7 mb-9">
        <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-2.5">
          Seu índice de estrutura financeira
        </p>
        <div className="h-2 bg-foreground/[0.07] rounded overflow-hidden mb-3.5">
          <div
            className="h-full gradient-gold-horizontal rounded transition-all duration-[1200ms]"
            style={{ width: `${barWidth}%`, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
          />
        </div>
        <p className="font-display text-[32px] font-bold text-primary">{pct}% de estrutura</p>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        {result.insights.map((ins, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 bg-foreground/[0.03] border border-foreground/[0.06] rounded-md px-5 py-4 animate-fade-up"
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            <span className="text-xl flex-shrink-0 mt-px">{ins.icon}</span>
            <div className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-semibold block mb-1">{ins.title}</strong>
              {ins.text}
            </div>
          </div>
        ))}
      </div>

      <div className="relative border border-primary/30 rounded-lg px-8 py-9 text-center bg-gradient-to-br from-primary/[0.06] to-transparent overflow-hidden">
        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-3/5 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <h3 className="font-display text-[22px] font-bold mb-3 text-foreground">O próximo passo é aqui.</h3>
        <p className="text-sm text-muted-foreground mb-7 leading-[1.7]">{result.ctaText}</p>
        <a
          href="https://pay.hotmart.com/SEU_LINK_HOTMART"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 gradient-gold text-primary-foreground border-none px-11 py-[18px] text-[15px] font-bold tracking-wider uppercase rounded cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,168,76,0.35)] active:translate-y-0 group no-underline w-full justify-center"
        >
          Quero o Autodomínio Financeiro
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default ResultScreen;
