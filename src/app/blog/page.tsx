'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Home, Search, Facebook, Instagram, Twitter } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Aumentando a produtividade com IA",
      description: "Descubra como a inteligência artificial está revolucionando o ambiente de trabalho e impulsionando a produtividade em diversas indústrias.",
      author: "Maria Silva",
      date: "Mar 16, 2023",
      category: "Tecnologia",
      readTime: "5 min",
    },
    {
      title: "O futuro do trabalho remoto",
      description: "Explorando as tendências e desafios do trabalho à distância nos próximos anos, e como as empresas podem se adaptar a essa nova realidade.",
      author: "João Santos",
      date: "Fev 22, 2023",
      category: "Trabalho",
      readTime: "7 min",
    },
    {
      title: "Segurança cibernética para empresas",
      description: "Dicas essenciais para proteger sua empresa contra ameaças digitais e garantir a segurança dos dados de seus clientes e colaboradores.",
      author: "Ana Rodrigues",
      date: "Jan 5, 2023",
      category: "Segurança",
      readTime: "6 min",
    },
    {
      title: "Tendências de design para 2023",
      description: "Um olhar sobre as principais tendências de design de interface e experiência do usuário que dominarão o cenário digital este ano.",
      author: "Carlos Mendes",
      date: "Abr 3, 2023",
      category: "Design",
      readTime: "4 min",
    },
    {
      title: "Blockchain além das criptomoedas",
      description: "Explorando as aplicações práticas da tecnologia blockchain em diferentes setores, além do mercado financeiro.",
      author: "Fernanda Lima",
      date: "Mar 28, 2023",
      category: "Tecnologia",
      readTime: "8 min",
    },
    {
      title: "Estratégias de marketing digital para startups",
      description: "Dicas e táticas eficazes para startups que desejam aumentar sua visibilidade online e atrair mais clientes.",
      author: "Ricardo Oliveira",
      date: "Fev 10, 2023",
      category: "Marketing",
      readTime: "6 min",
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
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Nosso Blog
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore nossos artigos sobre tecnologia, produtividade e inovação para manter-se atualizado no mundo digital.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">{post.category}</Badge>
                    <div className="text-sm text-gray-400">{post.readTime} de leitura</div>
                  </div>
                  <CardTitle className="mt-2 text-xl font-semibold text-gray-100">
                    <Link href="#" className="hover:text-gray-300">{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-gray-400">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-200">{post.author}</p>
                      <p className="text-sm text-gray-400">{post.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gray-900 px-6 py-10 sm:py-16 sm:px-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                Fique por dentro das novidades
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Inscreva-se em nossa newsletter para receber os últimos artigos e atualizações.
              </p>
            </div>
            <form className="mt-8 sm:flex justify-center">
              <Input
                type="email"
                required
                placeholder="Seu e-mail"
                className="w-full px-5 py-3 bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
              />
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button type="submit" className="w-full bg-gray-700 text-gray-100 hover:bg-gray-600">
                  Inscrever-se
                </Button>
              </div>
            </form>
          </div>
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

export default BlogPage;
