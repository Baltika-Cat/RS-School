class Loader {
    private baseLink: string;
    private options: object;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: {endpoint: string, options: object},
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string): string {
        const urlOptions: object = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]: [key: string | undefined, value: string]): void => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Function, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;