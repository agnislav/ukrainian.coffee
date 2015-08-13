/**
 * Created by Agnislav Onufrijchuk on 25.07.2015.
 */
'use strict';

angular
  .module('uc')

  .value('points', {
    '9bar': {
      title: '9 Bar',
      description: 'Кав\'ярня/ресторан здорового харчування',
      location: {
        town: 'Київ',
        district: 'Хрещатик',
        address: 'вул. Басейна, 2-4, підземний торговий центр',
        lat: '50.440818',
        lng: '30.522322'
      },
      chain: false,
      sell: true,
      verified: false,
      roasters: {
        cafeboutique: {
          brew: [
            'colombia-supremo-india-malabar-aa'
          ],
          sell: [
            'colombia-supremo-india-malabar-aa'
          ]
        }
      }
    },
    'come-and-stay': {
      title: 'Come and stay',
      description: 'Кав\'ярня',
      location: {
        town: 'Київ',
        district: 'Площа Льва Толстого',
        address: 'вул. Червоноармійска, 23а',
        lat: '50.439102',
        lng: '30.517513'
      },
      chain: false,
      sell: true,
      verified: false,
      roasters: {
        'funt-kofe': {
          brew: true,
          sell: false
        }
      }
    },

    cafeboutique: {
      title: 'CafeBoutique',
      description: 'Кафе/магазин',
      location: {
        town: 'Київ',
        district: 'Поділ',
        address: 'вул. Хорива, 4',
        lat: '50.464492',
        lng: '30.513288'
      },
      chain: false,
      sell: true,
      verified: false,
      roasters: {
        cafeboutique: true
      }
    },

    'espresso-kimnata': {
      title: 'Еспресо-кімната',
      description: 'Кав\'ярня',
      location: {
        town: 'Київ',
        district: 'Хрещатик',
        address: 'вул. Хрещатик, 40/1',
        lat: '50.444665',
        lng: '30.520671'
      },
      chain: false,
      sell: true,
      verified: false,
      roasters: {
        'espresso-kimnata': true
      }
    },

    'chashka-kyiv-khreschatyk': {
      title: 'Чашка',
      description: 'Эспресо-бар',
      location: {
        town: 'Київ',
        district: 'Хрещатик',
        address: 'вул. Червоноармійска, 1-3',
        lat: '50.441863',
        lng: '30.521330'
      },
      contacts: {
        tel: ['0504163416']
      },
      chain: true,
      sell: true,
      verified: false,
      roasters: {
        'chashka': true
      }
    },

    'chashka-kyiv-darnytsia': {
      title: 'Чашка',
      description: 'Эспресо-бар',
      location: {
        town: 'Київ',
        district: 'Дарниця',
        address: 'вул. Андрія Малишка, 3',
        lat: '50.458350',
        lng: '30.613799'
      },
      chain: true,
      sell: true,
      verified: false,
      roasters: {
        'chashka': true
      }
    }
  })

  .value('roasters', {
    cafeboutique: {
      title: 'CafeBoutique',
      description: '',
      location: {
        town: 'Київ',
        district: 'Поділ',
        address: 'вул. Хорива, 4',
        lat: '50.464492',
        lng: '30.513288'
      },
      coffee: {
        'brazil-peaberry-pearl': {
          title: 'Brazil Peaberry Pearl',
          grade: {
            'SCAA': 84,
            'UTZ': true,
            'ISO 14001': true
          }
        },
        'colombia-supremo-india-malabar-aa': {
          title: 'Colombia Supremo + India Malabar AA'
        },
        'ethiopia-yirgacheffe': {
          title: 'Ethiopia Yirgacheffe'
        },
        'guatemala-huehuetenango-shb-ep': {
          title: 'Guatemala Huehuetenango SHB EP'
        },
        'honduras-yobany-paz': {
          title: 'Honduras Yobany Paz'
        },
        'india-monsooned-malabar-aa': {
          title: 'India Monsooned Malabar AA'
        }
      }
    },
    'espresso-kimnata': {
      title: 'Еспресо-кімната',
      description: '',
      location: {
        town: 'Київ',
        district: 'Хрещатик',
        address: 'вул. Хрещатик, 40/1',
        lat: '50.444665',
        lng: '30.520671'
      },
      coffee: {
        'honduras': {
          title: 'Honduras'
        }
      }
    },
    'chashka': {
      title: 'Чашка',
      location: {
        town: 'Київ'
      },
      coffee: {}

    },
    'funt-kofe': {
      title: 'Фунт Кофе',
      location: {
        town: 'Дніпропетровськ'
      },
      contacts: {
        url: 'https://www.facebook.com/pages/Фунт-Кофе/209303262475013'
      },
      coffee: {
        'honduras': {
          title: 'Honduras'
        }
      }
    },
    'tiko-chako': {
      title: 'Тіко-Чако',
      location: {
        town: 'Кам\'янець-Подільский'
      },
      contacts: {
        tel: ['0969593474', '0979731847'],
        url: 'https://www.tiko-chako.com/'
      },
      logo: 'https://www.tiko-chako.com/images/2_0/logo_02_ru.png',
      coffee: {
        'gotica': {
          title: 'Готика'
        },
        'estetica': {
          title: 'Эстетика'
        },
        'tempica': {
          title: 'Темпика'
        }
      }
    }
  });
