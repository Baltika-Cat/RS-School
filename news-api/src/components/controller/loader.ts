import { Everything, NewsSourcesResponse } from '../../types/interfaces';

export type CallbackTypes = Everything | NewsSourcesResponse | void;

export type Callback<T> = (data?: T) => T;

class Loader {
    private baseLink: string;
    private options: object;
    public constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: object },
        callback: Callback<CallbackTypes> = (data?: CallbackTypes): CallbackTypes => {
            if (data) {
                return data;
            } else {
                console.error('No callback for GET response');
            }
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: object, endpoint: string): string {
        const urlOptions: object = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]: [key: string | undefined, value: string]): void => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<CallbackTypes>, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: CallbackTypes) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
