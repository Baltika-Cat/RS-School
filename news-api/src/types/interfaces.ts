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
    status: string,
    totalResults: number,
    articles: Articles[];
}

interface NewsSources {
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string
}

interface NewsSourcesResponse {
    status: string,
    sources: NewsSources[]
}

export { Articles, Everything, NewsSources, NewsSourcesResponse };