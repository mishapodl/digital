interface IItmem {
  id: string | number
  item: string
  link: string
}

interface IMenuBar {
  id: string | number
  item: string
  link: string
  subMenu?: IItmem[]
}

export const menuBar: IMenuBar[] = [
  { id: 0, item: 'Головна', link: '/admin/main-page' },
  { id: 1, item: 'Хто ми', link: '/admin/about-us' },
  { id: 2, item: 'Команда', link: '/admin/our-team' },
  { id: 3, item: 'Кейси', link: '/admin/cases' },
  {
    id: 4,
    item: 'Послуги',
    link: '/admin/services-main',
    subMenu: [
      { id: 0, item: 'Вступ', link: '/admin/services-main' },
      { id: 1, item: 'Пакети послуг', link: '/admin/services-packages' },
      { id: 2, item: 'Кнопка', link: '/admin/services-button' },
      { id: 3, item: 'Всі послуги', link: '/admin/services-list' },
    ],
  },
  {
    id: 5,
    item: 'Форма',
    link: '/admin/career',
    subMenu: [
      { id: 0, item: 'Кар’єра', link: '/admin/career' },
      { id: 1, item: 'Консультація', link: '/admin/go-there' },
    ],
  },
  { id: 6, item: 'Контакти', link: '/admin/footer' },
  { id: 7, item: 'Соцмережі', link: '/admin/social-networks' },
  {
    id: 8,
    item: 'Запити',
    link: '/admin/cv/requests',
    subMenu: [
      { id: 0, item: 'Резюме', link: '/admin/cv/requests' },
      { id: 1, item: 'Консультація', link: '/admin/go-there/requests' },
    ],
  },
]
