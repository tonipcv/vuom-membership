'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Home, BarChart2, Shield, HeadphonesIcon, Facebook, Instagram, Twitter } from 'lucide-react';

const HomePage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Básico',
      monthlyPrice: 'R$ 29',
      annualPrice: 'R$ 290',
      features: [
        '5 usuários incluídos',
        'Até 10 GB de armazenamento',
        'Suporte por email',
        'Acesso a recursos básicos',
      ],
    },
    {
      name: 'Pro',
      monthlyPrice: 'R$ 59',
      annualPrice: 'R$ 590',
      features: [
        '10 usuários incluídos',
        'Até 30 GB de armazenamento',
        'Suporte prioritário',
        'Acesso a recursos avançados',
      ],
    },
    {
      name: 'Empresarial',
      monthlyPrice: 'R$ 139',
      annualPrice: 'R$ 1390',
      features: [
        'Usuários ilimitados',
        'Armazenamento ilimitado',
        'Suporte 24/7',
        'Acesso a todos os recursos',
      ],
    },
  ];

  return (
    <div className="bg-black text-gray-100">
      {/* Navegação */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Home className="h-8 w-8 text-gray-300" />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="border-gray-300 text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/features" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Recursos
                </Link>
                <Link href="/pricing" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Preços
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/login" className="text-gray-300 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link href="/register" className="bg-gray-700 text-gray-100 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600">
                Registrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-800 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                    Sua solução tech para o futuro
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Descubra como nossa plataforma pode revolucionar sua experiência digital e impulsionar seu negócio para o próximo nível.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button asChild size="lg" className="bg-gray-700 text-gray-100 hover:bg-gray-600">
                      <Link href="/register">Comece agora</Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button asChild variant="outline" size="lg" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                      <Link href="/features">Saiba mais</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <Badge variant="secondary" className="mb-2 bg-gray-700 text-gray-300">Recursos</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
              Uma melhor maneira de trabalhar
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Nossa plataforma oferece uma série de recursos projetados para otimizar seu fluxo de trabalho e aumentar sua produtividade.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Integração perfeita',
                description: 'Conecte-se facilmente com suas ferramentas favoritas e mantenha tudo sincronizado.',
                icon: BarChart2, // Substituindo Zap por BarChart2
              },
              {
                name: 'Análises avançadas',
                description: 'Obtenha insights valiosos com nossos relatórios e dashboards personalizáveis.',
                icon: BarChart2,
              },
              {
                name: 'Segurança de nível empresarial',
                description: 'Mantenha seus dados seguros com nossa criptografia de ponta e controles de acesso.',
                icon: Shield,
              },
              {
                name: 'Suporte 24/7',
                description: 'Nossa equipe de suporte está sempre disponível para ajudar com qualquer problema.',
                icon: HeadphonesIcon,
              },
            ].map((feature) => (
              <Card key={feature.name} className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-gray-300 mb-2" />
                  <CardTitle className="text-gray-100">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
              Escolha o plano ideal para você
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Oferecemos planos flexíveis para atender às suas necessidades, com opções de pagamento mensal ou anual.
            </p>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-2 gap-0.5 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-gray-800">
              <button 
                className={`rounded-full px-4 py-2 ${!isAnnual ? 'bg-gray-700 text-gray-100' : 'text-gray-400'}`}
                onClick={() => setIsAnnual(false)}
              >
                Mensal
              </button>
              <button 
                className={`rounded-full px-4 py-2 ${isAnnual ? 'bg-gray-700 text-gray-100' : 'text-gray-400'}`}
                onClick={() => setIsAnnual(true)}
              >
                Anual
              </button>
            </div>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-3xl bg-gray-800 p-8 ring-1 ring-gray-700 xl:p-10">
                <h3 className="text-lg font-semibold leading-8 text-gray-100">{plan.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  <span className="text-xs">/{isAnnual ? 'ano' : 'mês'}</span>
                </p>
                <Button asChild className="mt-6 block w-full bg-gray-700 hover:bg-gray-600">
                  <Link href="/register">Comece agora</Link>
                </Button>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Shield className="h-6 w-5 flex-none text-gray-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <blockquote className="mt-10">
              <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                <p>
                  &ldquo;Esta plataforma transformou completamente a maneira como gerenciamos nossos projetos. A produtividade da nossa equipe aumentou significativamente desde que começamos a usá-la.&rdquo;
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-center justify-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/testimonial-avatar.jpg" alt="Maria Silva" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex items-center">
                    <div className="text-base font-medium text-gray-100">Maria Silva</div>
                    <svg className="mx-1 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                    <div className="text-base font-medium text-gray-400">CEO, TechCorp</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">Nosso Blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Aprenda mais sobre tecnologia, produtividade e inovação.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: "Aumentando a produtividade com IA",
                description: "Descubra como a inteligência artificial está revolucionando o ambiente de trabalho.",
                author: "Maria Silva",
                date: "Mar 16, 2023",
              },
              {
                title: "O futuro do trabalho remoto",
                description: "Explorando as tendências e desafios do trabalho à distância nos próximos anos.",
                author: "João Santos",
                date: "Fev 22, 2023",
              },
              {
                title: "Segurança cibernética para empresas",
                description: "Dicas essenciais para proteger sua empresa contra ameaças digitais.",
                author: "Ana Rodrigues",
                date: "Jan 5, 2023",
              },
            ].map((post) => (
              <article key={post.title} className="flex flex-col items-start justify-between">
                <div className="relative w-full">
                  <div className="aspect-[16/9] w-full rounded-2xl bg-gray-700 flex items-center justify-center">
                    {/* Removendo o ícone Zap */}
                  </div>
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-400">
                      {post.date}
                    </time>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">Artigo</Badge>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-100 group-hover:text-gray-300">
                      <Link href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">{post.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <Avatar>
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-100">
                        <Link href="#">
                          <span className="absolute inset-0" />
                          {post.author}
                        </Link>
                      </p>
                      <p className="text-gray-400">Autor</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="relative sm:py-16">
          <div aria-hidden="true" className="hidden sm:block">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-800 rounded-r-3xl"></div>
            <svg className="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
              <defs>
                <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-700" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
            </svg>
          </div>
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative rounded-2xl px-6 py-10 bg-gray-800 overflow-hidden sm:px-12 sm:py-20">
              <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                  <path className="text-gray-700 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                  <path className="text-gray-600 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                    Receba nossas novidades
                  </h2>
                  <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-300">
                    Inscreva-se em nossa newsletter para receber as últimas atualizações e dicas sobre nossa plataforma.
                  </p>
                </div>
                <form action="#" className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                  <div className="min-w-0 flex-1">
                    <Input type="email" id="cta-email" placeholder="Digite seu e-mail" className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <Button type="submit" className="bg-gray-700 text-gray-100 hover:bg-gray-600">Inscrever-se</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
            <span className="block">Pronto para começar?</span>
            <span className="block">Crie sua conta hoje.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            Junte-se a milhares de usuários satisfeitos e leve sua produtividade ao próximo nível.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gray-700 text-gray-100 hover:bg-gray-600">
            <Link href="/register">Registre-se gratuitamente</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 Sua Empresa Tech. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
