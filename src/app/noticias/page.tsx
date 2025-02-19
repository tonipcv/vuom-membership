'use client';

import { Navigation } from '../components/Navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OptimizedImage from 'next/image';
import { useSession } from "next-auth/react";

interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  video?: string;
  publishedAt: string;
  isPro: boolean;
}

export default function NoticiasPage() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (!session) {
        router.push('/');
      } else {
        fetchNews();
      }
    };

    checkUser();
  }, [router, session]);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://adm-news.vercel.app/api/v1/news');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      // A API retorna os dados dentro da propriedade 'data'
      if (result.success && Array.isArray(result.data)) {
        setNews(result.data);
      } else {
        console.error('Formato de dados inválido:', result);
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calcula o índice inicial e final para a página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll para o topo quando mudar de página
    window.scrollTo(0, 0);
  };

  const handleReadMore = async (news: News) => {
    setSelectedNews(news); // Mostra o modal imediatamente com o resumo
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://adm-news.vercel.app/api/v1/news/${news.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      if (result.success && result.data) {
        // Atualiza o modal com todos os dados da notícia
        setSelectedNews({
          ...news,
          title: result.data.title || news.title,
          summary: result.data.summary || news.summary,
          content: result.data.content || news.content,
          image: result.data.image || news.image,
          video: result.data.video || news.video,
          publishedAt: result.data.publishedAt || news.publishedAt,
          isPro: result.data.isPro || news.isPro
        });
      }
    } catch (error) {
      console.error('Error fetching full news:', error);
      // Mantém os dados atuais se houver erro
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center">
            <OptimizedImage src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
        </div>
      </header>

      <main className="pt-16 pb-32">
        <div className="w-full md:w-1/2 lg:w-1/2 md:mx-auto lg:mx-auto h-[calc(100vh-8.5rem)]">
          <div className="flex justify-between items-center mb-4 px-4 md:px-0">
            <div className="flex items-center gap-2">
              <h1 className="font-helvetica text-xl">Relatórios</h1>
              <span className="bg-green-500/20 text-green-400 text-[8px] px-1.5 py-0.5 rounded-full border border-green-500/20">
                BETA
              </span>
            </div>
            <button
              onClick={fetchNews}
              disabled={isLoading}
              className="p-2 text-white hover:text-green-300 focus:outline-none transition-colors duration-200"
              title="Atualizar notícias"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
            </button>
          </div>

          <div className="rounded-lg shadow-md p-4 overflow-y-auto mx-4 md:mx-0 h-[calc(100%-3rem)]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-300"></div>
              </div>
            ) : news.length > 0 ? (
              <>
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-[#1a1a1a] hover:bg-[#222] p-4 md:p-6 rounded-xl mb-6 border border-gray-800 shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <h2 className="text-base md:text-lg font-bold text-green-400 hover:text-green-300 transition-colors leading-tight">{item.title}</h2>
                      {item.isPro && (
                        <span className="bg-green-500/20 text-green-400 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full border border-green-500/20 whitespace-nowrap ml-2">
                          PRO
                        </span>
                      )}
                    </div>
                    
                    {item.image && (
                      <div className="relative w-full h-40 md:h-48 mt-3 md:mt-4">
                        <OptimizedImage
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
                          priority={false}
                          quality={75}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <p className="text-xs md:text-sm text-gray-400 mt-3 md:mt-4 leading-relaxed line-clamp-3">{item.summary}</p>
                    
                    {item.video && (
                      <div className="mt-3 md:mt-4">
                        <video 
                          src={item.video} 
                          controls 
                          className="w-full rounded-xl"
                          poster={item.image}
                        />
                      </div>
                    )}
                    
                    <div className="mt-4 md:mt-6 flex items-center justify-between border-t border-gray-800 pt-4">
                      <p className="text-[10px] md:text-xs text-gray-500">
                        {formatDate(item.publishedAt)}
                      </p>
                      <button 
                        onClick={() => handleReadMore(item)}
                        className="text-[10px] md:text-xs bg-[#2a2a2a] text-green-400 hover:bg-[#333] px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300"
                      >
                        Ler mais
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Paginação */}
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-[#2a2a2a] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] transition-all duration-300"
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentPage === pageNumber
                          ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                          : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full bg-[#2a2a2a] text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] transition-all duration-300"
                  >
                    Próxima
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>Nenhuma notícia encontrada</p>
                <button
                  onClick={fetchNews}
                  className="mt-2 text-sm text-green-300 hover:text-green-400"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>

          {/* Modal de Leitura */}
          {selectedNews && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-800 shadow-xl">
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-medium text-white">{selectedNews.title}</h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {selectedNews.image && (
                    <div className="relative w-full h-48 md:h-56 mb-6">
                      <OptimizedImage
                        src={selectedNews.image}
                        alt={selectedNews.title}
                        fill
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-300"></div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Resumo */}
                        <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                          {selectedNews.summary}
                        </div>

                        {/* Conteúdo Principal */}
                        {selectedNews.content && (
                          <div>
                            {selectedNews.content.split('\n\n').map((section, index) => {
                              const cleanSection = section.trim();
                              if (!cleanSection) return null;

                              // Se for título (começa com #)
                              if (cleanSection.startsWith('#')) {
                                return (
                                  <h3 key={index} className="text-white font-medium text-lg md:text-xl mt-8 mb-4">
                                    {cleanSection.replace('#', '').trim()}
                                  </h3>
                                );
                              }

                              // Se for tópico numerado (começa com número seguido de ponto)
                              if (/^\d+\./.test(cleanSection)) {
                                const [number, ...rest] = cleanSection.split('.');
                                return (
                                  <div key={index} className="flex gap-2 mt-12 mb-6">
                                    <span className="text-green-400 font-medium">{number}.</span>
                                    <span className="text-gray-200">{rest.join('.').trim()}</span>
                                  </div>
                                );
                              }

                              // Se for lista
                              if (cleanSection.includes('\n')) {
                                const lines = cleanSection.split('\n').map(line => line.trim()).filter(Boolean);
                                return (
                                  <div key={index} className="space-y-2 my-4">
                                    {lines.map((line, i) => {
                                      // Se for número em uma lista
                                      if (/^\d+[:]/.test(line)) {
                                        const [num, ...content] = line.split(':');
                                        return (
                                          <div key={i} className="flex gap-3 mt-8 mb-4">
                                            <span className="text-green-400">{num}:</span>
                                            <span className="text-gray-300">{content.join(':').trim()}</span>
                                          </div>
                                        );
                                      }
                                      
                                      return (
                                        <div key={i} className="flex gap-3 pl-4">
                                          <span className="text-green-400">•</span>
                                          <span className="text-gray-300">{line.replace(/^[-•]/, '').trim()}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              // Se for número isolado
                              if (/^\d+%?$/.test(cleanSection)) {
                                return (
                                  <div key={index} className="text-center my-12">
                                    <span className="text-2xl text-green-400 font-medium">
                                      {cleanSection}
                                    </span>
                                  </div>
                                );
                              }

                              // Parágrafo normal
                              return (
                                <p key={index} className="text-gray-300 my-4">
                                  {cleanSection}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    {formatDate(selectedNews.publishedAt)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
} 