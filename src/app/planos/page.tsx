import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import PlansInterface from "@/app/components/PlansInterface";

export const metadata: Metadata = {
  title: "Planos | Voom",
  description: "Escolha o plano ideal para você",
};

const defaultPlans = [
  {
    name: "Plano Iniciante",
    price: "R$ 97",
    pricePerDay: "R$ 3,23 por dia",
    period: "mês",
    popular: false,
    features: [
      "Acesso a todos os exercícios",
      "Acesso ao grupo exclusivo",
      "Suporte via chat",
      "Garantia de 7 dias",
    ],
  },
  {
    name: "Plano Pro",
    price: "R$ 197",
    pricePerDay: "R$ 6,57 por dia",
    period: "mês",
    popular: true,
    features: [
      "Tudo do plano Iniciante",
      "Acesso a conteúdos exclusivos",
      "Suporte prioritário",
      "Mentoria individual",
      "Garantia estendida de 15 dias",
    ],
  },
];

// Server Component para verificar a sessão
async function SessionCheck() {
  const session = await getServerSession(authOptions);
  if (session?.user?.isPremium) {
    redirect("/dashboard");
  }
  return null;
}

// Componente principal que combina os dois
export default async function PlansPage() {
  return (
    <>
      <SessionCheck />
      <PlansInterface plans={defaultPlans} />
    </>
  );
} 