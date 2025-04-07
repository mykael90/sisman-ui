import React from 'react';
import {
  Home,
  ListChecks,
  Users,
  Building2,
  Truck,
  UserRound,
  ArrowRight
} from 'lucide-react'; // Import icons from Lucide

export default function HomePage() {
  interface CardData {
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<any>; // Icon component type
  }

  const cardData: CardData[] = [
    {
      title: 'Materiais',
      description: 'Gerencie seus materiais de forma eficiente.',
      href: '/material',
      icon: ListChecks
    },
    {
      title: 'Colaboradores',
      description: 'Acompanhe seus colaboradores e suas funções.',
      href: '/colaboradores',
      icon: Users
    },
    {
      title: 'Equipamentos',
      description: 'Controle seus equipamentos e seus status.',
      href: '/equipamentos',
      icon: Building2
    },
    {
      title: 'Infraestrutura',
      description: 'Gerencie suas infraestruturas.',
      href: '/infraestrutura',
      icon: Home
    },
    {
      title: 'Fornecedores',
      description: 'Gerencie seus fornecedores.',
      href: '/fornecedores',
      icon: UserRound
    },
    {
      title: 'Frota',
      description: 'Gerencie sua frota.',
      href: '/frota',
      icon: Truck
    }
  ];

  return (
    <main className='flex w-full flex-1 flex-col items-center justify-center p-8'>
      <h1 className='mb-8 text-4xl font-bold text-gray-800 dark:text-gray-200'>
        Bem-vindo ao SisMan!
      </h1>
      {/* Cards Section */}
      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='group relative m-3 rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105 dark:bg-gray-800'
          >
            <div className='bg-sisman-green group-hover:bg-sisman-blue dark:bg-sisman-blue dark:group-hover:bg-sisman-green absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-colors'>
              <card.icon className='h-6 w-6' />
            </div>
            <h3 className='mt-8 mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300'>
              {card.title}
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              {card.description}
            </p>
            <a
              href={card.href}
              className='mt-4 inline-flex items-center text-blue-500 hover:underline'
            >
              Ver Mais
              <ArrowRight className='ml-1 h-4 w-4' />
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
