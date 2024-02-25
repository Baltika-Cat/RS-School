type Status = 'ok' | 'error';

enum Language {
    AR = 'ar',
    DE = 'de',
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    HE = 'he',
    IT = 'it',
    NL = 'nl',
    NO = 'no',
    PT = 'pt',
    RU = 'ru',
    SV = 'sv',
    UD = 'ud',
    ZH = 'zh'
}

enum Category {
    Business = 'business',
    Entertaiment = 'entertaiment',
    General = 'general',
    Health = 'health',
    Science = 'science',
    Sports = 'sports',
    Technology = 'technology'
}

interface Articles {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

interface Everything {
    status: Status,
    totalResults: number,
    articles: Articles[];
}

interface NewsSources {
    id: string,
    name: string,
    description: string,
    url: string,
    category: Category,
    language: Language,
    country: string
}

interface NewsSourcesResponse {
    status: Status,
    sources: NewsSources[]
}

export { Articles, Everything, NewsSources, NewsSourcesResponse };