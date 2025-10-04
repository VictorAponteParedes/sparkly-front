export interface UserProfile {
    id: number;
    name: string;
    age: number;
    location: string;
    bio: string;
    interests: string[];
    principalPhoto: string;
    photosGalery: string[];
    distance?: string;
}

export const slidesMatchMock: UserProfile[] = [
    {
        id: 1,
        name: "Sofia",
        age: 28,
        location: "Barcelona, España",
        bio: "Amante de los viajes, el arte y las buenas conversaciones. Me encanta descubrir nuevos lugares y compartir experiencias únicas. Siempre en busca de aventuras y momentos especiales.",
        interests: ["Viajar", "Fotografía", "Yoga", "Música", "Arte", "Cocina"],
        principalPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        photosGalery: [
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
        ],
        distance: "2 km"
    },
    {
        id: 2,
        name: "Carlos",
        age: 32,
        location: "Madrid, España",
        bio: "Desarrollador apasionado por la tecnología y los deportes al aire libre. Me encanta el senderismo, el fútbol y probar nuevas cafeterías los fines de semana.",
        interests: ["Tecnología", "Senderismo", "Fútbol", "Café", "Videojuegos", "Cine"],
        principalPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        photosGalery: [
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
        ],
        distance: "5 km"
    },
    {
        id: 3,
        name: "Laura",
        age: 25,
        location: "Valencia, España",
        bio: "Artista y amante de la naturaleza. Disfruto pintando paisajes, practicando yoga al amanecer y explorando mercados locales los domingos.",
        interests: ["Pintura", "Yoga", "Naturaleza", "Mercados", "Lectura", "Meditación"],
        principalPhoto: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400",
        photosGalery: [
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400"
        ],
        distance: "8 km"
    },
    {
        id: 4,
        name: "Miguel",
        age: 30,
        location: "Sevilla, España",
        bio: "Chef profesional con amor por la gastronomía y el flamenco. Me apasiona crear platos innovadores y bailar sevillanas los viernes por la noche.",
        interests: ["Cocina", "Flamenco", "Vino", "Baile", "Fotografía", "Viajes"],
        principalPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
        photosGalery: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400",
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400"
        ],
        distance: "3 km"
    }
];