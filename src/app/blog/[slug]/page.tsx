'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Simulated blog post data (in a real app, you'd fetch this data based on the slug)
  const post = {
    title: "Aumentando a produtividade com IA",
    description: "Descubra como a inteligência artificial está revolucionando o ambiente de trabalho e impulsionando a produtividade em diversas indústrias.",
    author: "Maria Silva",
    date: "Mar 16, 2023",
    category: "Tecnologia",
    readTime: "5 min",
    content: `
      <p>A inteligência artificial (IA) está transformando rapidamente o modo como trabalhamos, oferecendo novas ferramentas e métodos para aumentar a produtividade em diversos setores. Neste artigo, exploraremos como a IA está sendo aplicada para otimizar processos, automatizar tarefas repetitivas e fornecer insights valiosos que impulsionam a eficiência no ambiente de trabalho.</p>

      <h2>Automação de tarefas rotineiras</h2>
      <p>Uma das principais maneiras pelas quais a IA está aumentando a produtividade é através da automação de tarefas rotineiras e repetitivas. Algoritmos de aprendizado de máquina podem ser treinados para realizar uma variedade de tarefas, desde a classificação de e-mails até a entrada de dados, liberando os funcionários para se concentrarem em trabalhos mais estratégicos e criativos.</p>

      <h2>Assistentes virtuais inteligentes</h2>
      <p>Assistentes virtuais alimentados por IA, como chatbots e assistentes de voz, estão se tornando cada vez mais sofisticados. Eles podem ajudar os funcionários a agendar reuniões, encontrar informações rapidamente e até mesmo fornecer suporte ao cliente 24 horas por dia, 7 dias por semana, melhorando significativamente a eficiência operacional.</p>

      <h2>Análise preditiva e tomada de decisões</h2>
      <p>A IA pode processar e analisar grandes volumes de dados muito mais rapidamente do que os humanos. Isso permite que as empresas obtenham insights valiosos e façam previsões precisas, auxiliando na tomada de decisões estratégicas e na otimização de processos de negócios.</p>

      <h2>Personalização e experiência do cliente</h2>
      <p>Algoritmos de IA podem analisar o comportamento e as preferências dos clientes para oferecer experiências altamente personalizadas. Isso não apenas melhora a satisfação do cliente, mas também aumenta a eficiência das equipes de vendas e marketing.</p>

      <h2>Conclusão</h2>
      <p>À medida que a tecnologia de IA continua a evoluir, seu impacto na produtividade do local de trabalho só tende a crescer. Empresas que adotam e integram soluções de IA de maneira eficaz estarão bem posicionadas para prosperar no ambiente de trabalho do futuro, aproveitando o poder da automação e da análise inteligente para impulsionar a inovação e o crescimento.</p>
    `,
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Home className="h-8 w-8 text-gray-300" />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/blog" className="border-gray-300 text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="flex items-center text-gray-400 hover:text-gray-300 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o blog
        </Link>

        <article>
          <header className="mb-8">
            <Badge variant="secondary" className="mb-2 bg-gray-700 text-gray-300">{post.category}</Badge>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
              {post.title}
            </h1>
            <p className="text-xl text-gray-400 mb-4">{post.description}</p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-200">{post.author}</p>
                <p className="text-sm text-gray-400">{post.date} · {post.readTime} de leitura</p>
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Share buttons */}
        <div className="mt-12">
          <h3 className="text-lg font-medium mb-4">Compartilhe este artigo</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
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

export default BlogPost;
