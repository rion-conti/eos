import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50", className)}>{children}</h1>
  );
}
