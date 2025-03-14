
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  beforeImage?: string;
  afterImage?: string;
  hasBeforeAfter: boolean;
  challenge?: string;
  solutions?: string;
  results?: string;
  gallery?: string[];
  beforeAfterGallery?: Array<{before: string; after: string}>;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Rénovation appartement haussmannien",
    category: "renovation",
    image: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
    description: "Transformation complète d'un appartement ancien en espace contemporain",
    location: "Perpignan",
    beforeImage: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
    afterImage: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    hasBeforeAfter: true,
    challenge: "Cet appartement haussmannien avait conservé son charme d'origine mais souffrait d'un agencement obsolète, avec des pièces cloisonnées et sombres qui ne correspondaient plus aux standards de vie actuels.",
    solutions: "Nous avons préservé les éléments architecturaux d'époque (moulures, parquet) tout en créant une circulation plus fluide entre les espaces. La cuisine a été ouverte sur le séjour et les matériaux nobles ont été mis en valeur par un éclairage repensé.",
    results: "L'appartement a retrouvé son élégance d'antan tout en offrant le confort moderne. Les propriétaires bénéficient désormais d'un espace lumineux qui respecte l'âme du lieu tout en répondant à leurs besoins contemporains.",
    gallery: [
      "/lovable-uploads/461611f7-d247-4387-9721-44288ae1f7cc.png",
      "/lovable-uploads/f35a5805-7552-4b9e-963e-fa11284f5948.png",
      "/lovable-uploads/29c8eca6-4f17-459d-928e-87e25d8fa3ef.png", 
      "/lovable-uploads/52765a0d-9fe5-4d4b-8e0e-d138a0e4010c.png",
      "/lovable-uploads/999575d9-e90d-4481-8598-f539cad82f82.png"
    ],
    beforeAfterGallery: [
      {
        before: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        after: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg"
      },
      {
        before: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        after: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png"
      },
      {
        before: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        after: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg"
      },
      {
        before: "/lovable-uploads/8c3d50c4-1ff5-4a3e-b708-282bbe766927.png",
        after: "/lovable-uploads/e306d00a-1f2a-44f2-be3c-c713b0947533.png"
      }
    ]
  },
  {
    id: 2,
    title: "Rénovation cuisine contemporaine",
    category: "renovation",
    image: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png",
    description: "Une cuisine fonctionnelle et design pour cette maison de village",
    location: "Collioure",
    beforeImage: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    afterImage: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png",
    hasBeforeAfter: true,
    challenge: "La cuisine existante, vétuste et peu pratique, ne correspondait plus aux besoins des propriétaires qui aiment recevoir et cuisiner. L'espace était mal optimisé et manquait cruellement de rangements.",
    solutions: "Nous avons conçu un agencement sur-mesure qui maximise chaque centimètre carré. Les matériaux (plan de travail en quartz, façades laquées) ont été choisis pour leur durabilité et leur facilité d'entretien, tout en apportant une touche contemporaine.",
    results: "La nouvelle cuisine combine esthétique et praticité avec de nombreux rangements, un îlot central qui favorise la convivialité et des équipements haut de gamme qui facilitent le quotidien des propriétaires.",
    beforeAfterGallery: [
      {
        before: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        after: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png"
      },
      {
        before: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        after: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg"
      }
    ]
  },
  {
    id: 3,
    title: "Aménagement salon familial",
    category: "decoration",
    image: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    description: "Création d'un espace convivial pour toute la famille",
    location: "Perpignan",
    beforeImage: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    afterImage: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
    hasBeforeAfter: true,
    challenge: "Cette famille souhaitait transformer leur salon en espace multifonctionnel adapté à tous les membres, des plus jeunes aux plus âgés, tout en créant une atmosphère chaleureuse.",
    solutions: "Nous avons opté pour un mobilier modulable et des zones dédiées aux différentes activités. Les matériaux ont été choisis pour leur durabilité et leur facilité d'entretien, parfaits pour une famille avec enfants.",
    results: "Le salon est désormais le cœur de la maison, où chacun trouve sa place. L'espace permet aussi bien la détente que les jeux ou le travail, tout en offrant une esthétique soignée qui satisfait les parents.",
    beforeAfterGallery: [
      {
        before: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        after: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg"
      },
      {
        before: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        after: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg"
      }
    ],
    gallery: [
      "/lovable-uploads/461611f7-d247-4387-9721-44288ae1f7cc.png",
      "/lovable-uploads/f35a5805-7552-4b9e-963e-fa11284f5948.png"
    ]
  },
  {
    id: 4,
    title: "Rénovation salle de bain",
    category: "renovation",
    image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    description: "Transformation d'une salle de bain vieillissante en espace bien-être",
    location: "Argelès-sur-Mer",
    beforeImage: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    afterImage: "/lovable-uploads/461611f7-d247-4387-9721-44288ae1f7cc.png",
    hasBeforeAfter: true,
    challenge: "Cette salle de bain n'avait pas été rénovée depuis les années 90 et présentait des problèmes d'humidité et d'agencement peu pratique.",
    solutions: "Nous avons entièrement repensé l'espace pour intégrer une douche à l'italienne spacieuse et un meuble vasque avec de nombreux rangements. Une attention particulière a été portée à l'étanchéité et à la ventilation.",
    results: "La nouvelle salle de bain offre désormais une ambiance spa avec des matériaux nobles et un éclairage travaillé. L'espace est maximisé et les problèmes d'humidité sont résolus.",
    beforeAfterGallery: [
      {
        before: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        after: "/lovable-uploads/461611f7-d247-4387-9721-44288ae1f7cc.png"
      },
      {
        before: "/lovable-uploads/8c3d50c4-1ff5-4a3e-b708-282bbe766927.png",
        after: "/lovable-uploads/e306d00a-1f2a-44f2-be3c-c713b0947533.png"
      }
    ]
  }
];
