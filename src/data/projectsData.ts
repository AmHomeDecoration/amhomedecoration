
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
    title: "Décoration villa méditerranéenne",
    category: "decoration",
    image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    description: "Ambiance bord de mer pour cette villa familiale",
    location: "Argelès-sur-Mer",
    hasBeforeAfter: false,
    challenge: "Les propriétaires souhaitaient insuffler une atmosphère méditerranéenne contemporaine à leur villa, en évitant les clichés trop typiques du style bord de mer.",
    solutions: "Nous avons opté pour une palette de couleurs douces inspirées de la mer et du sable, ponctuée de bleus plus profonds. Des matériaux naturels comme le lin, le bois flotté et la pierre locale ont été intégrés à une décoration épurée mais chaleureuse.",
    results: "La villa offre désormais une ambiance apaisante qui évoque subtilement l'environnement méditerranéen. L'espace est à la fois élégant pour recevoir et confortable pour la vie quotidienne de cette famille avec enfants.",
    gallery: [
      "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
      "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    ]
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    title: "Aménagement bureau à domicile",
    category: "decoration",
    image: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    description: "Création d'un espace de travail inspirant et fonctionnel",
    location: "Canet-en-Roussillon",
    hasBeforeAfter: false,
    challenge: "Suite à la généralisation du télétravail, ce client avait besoin d'un véritable bureau à domicile, à la fois professionnel et en harmonie avec le reste de son intérieur.",
    solutions: "Nous avons transformé une chambre d'amis peu utilisée en bureau fonctionnel. Un mobilier sur-mesure a permis d'optimiser l'espace tout en intégrant de nombreux rangements. L'acoustique et l'éclairage ont fait l'objet d'une attention particulière.",
    results: "Le client dispose maintenant d'un espace de travail professionnel qui favorise sa concentration et sa productivité, tout en restant cohérent avec l'esthétique générale de sa maison.",
  },
  {
    id: 5,
    title: "Réaménagement loft industriel",
    category: "renovation",
    image: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
    description: "Transformation d'un ancien atelier en espace de vie contemporain",
    location: "Perpignan",
    hasBeforeAfter: false,
    challenge: "Cet ancien atelier offrait un beau volume mais présentait des défis en termes d'isolation, de distribution des espaces et d'intégration des éléments techniques.",
    solutions: "Tout en préservant l'esprit industriel du lieu (poutres apparentes, hauteur sous plafond), nous avons créé des zones distinctes sans cloisonner complètement. Les matériaux bruts ont été conservés et mis en valeur par des éléments plus contemporains.",
    results: "Le loft offre désormais un cadre de vie unique qui respecte l'histoire du bâtiment tout en offrant un confort optimal. Les différents espaces de vie cohabitent harmonieusement dans ce volume ouvert.",
  },
  {
    id: 6,
    title: "Décoration appartement de vacances",
    category: "decoration",
    image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    description: "Ambiance décontractée pour cet appartement face à la mer",
    location: "Argelès-sur-Mer",
    hasBeforeAfter: false,
    challenge: "Cet appartement de vacances devait être à la fois pratique, facile d'entretien et offrir une atmosphère relaxante qui marque une vraie rupture avec le quotidien des propriétaires.",
    solutions: "Nous avons privilégié des matériaux résistants et des textiles lavables, tout en créant une décoration inspirée par la mer toute proche. Les couleurs apaisantes et les textures naturelles invitent à la détente.",
    results: "L'appartement est devenu un véritable havre de paix où les propriétaires et leurs invités se sentent immédiatement en vacances. La décoration évoque subtilement l'environnement maritime sans tomber dans les clichés.",
  },
  {
    id: 7,
    title: "Projet de rénovation globale",
    category: "turnkey",
    image: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    description: "Refonte complète d'une villa des années 80",
    location: "Canohès",
    beforeImage: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
    afterImage: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
    hasBeforeAfter: true,
    challenge: "Cette villa n'avait jamais été rénovée depuis sa construction dans les années 80. Outre une distribution obsolète, elle présentait des problèmes d'isolation et des installations techniques vétustes.",
    solutions: "Nous avons coordonné un projet de rénovation globale incluant la refonte complète des espaces, la rénovation énergétique et la modernisation de tous les équipements, tout en respectant le budget défini.",
    results: "Les propriétaires bénéficient désormais d'une maison entièrement repensée qui répond aux standards actuels de confort et d'efficacité énergétique, tout en reflétant leur style de vie et leurs goûts personnels.",
  },
  {
    id: 8,
    title: "Rénovation d'une maison de village",
    category: "canohes",
    image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
    description: "Modernisation respectueuse d'une demeure traditionnelle",
    location: "Canohès",
    hasBeforeAfter: false,
    challenge: "Cette maison de village ancienne présentait des contraintes structurelles importantes et nécessitait une mise aux normes complète, tout en préservant son caractère authentique.",
    solutions: "Nous avons travaillé avec des artisans spécialisés dans la rénovation du bâti ancien pour respecter l'âme de cette maison, tout en y intégrant discrètement les éléments de confort modernes.",
    results: "La maison a retrouvé son charme d'antan tout en offrant un niveau de confort contemporain. Les matériaux traditionnels ont été préservés ou remplacés à l'identique, créant une continuité historique tout en répondant aux attentes actuelles.",
  },
];
