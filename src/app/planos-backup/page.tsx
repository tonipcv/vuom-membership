import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import PlansInterface from "@/app/components/PlansInterface";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Planos | Voom",
  description: "Escolha o plano ideal para você",
};

const defaultPlans = [
  {
    name: "Plano Iniciante",
    price: "R$ 19",
    pricePerDay: "R$ 0,63 por dia",
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

// Server Component para verificar a sessão e obter a região do usuário
async function SessionCheck() {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.isPremium) {
    redirect("/dashboard");
  }

  if (!session?.user?.email) {
    return { userRegion: 'OTHER' as const, userId: '' };
  }

  // Buscar a região do usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { region: true, id: true }
  });

  if (!user) {
    return { userRegion: 'OTHER' as const, userId: '' };
  }

  return {
    userRegion: (user.region || 'OTHER') as 'US' | 'UK' | 'EU' | 'BR' | 'OTHER',
    userId: user.id
  };
}

// Componente principal que combina os dois
export default async function PlansPage() {
  const { userRegion, userId } = await SessionCheck();
  
  if (!userId) {
    redirect('/login');
  }
  
  return (
    <PlansInterface userRegion={userRegion} userId={userId} />
  );
} 