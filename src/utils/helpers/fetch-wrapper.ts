import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return (url: any, body?: any) => {
        const requestOptions: any = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

// Dentro de tu función handleResponse o similar en fetch-wrapper.ts
function handleResponse(response: Response) {
    if (!(response instanceof Response)) {
        throw new Error('Response is not an instance of the Response class');
    }

    if (!response.ok) {
        // Opción para manejar respuestas no exitosas
        throw new Error('Network response was not ok');
    }

    const dataPromise = response.text().then((text) => {
        try {
            // Intenta parsear el texto como JSON
            return JSON.parse(text);
        } catch (error) {
            // Si el texto no es JSON, simplemente retorna el texto crudo
            return text;
        }
    });

    // Crea un objeto que imita la respuesta de la Fetch API incluyendo los métodos .json() y .text()
    return {
        ok: response.ok,
        status: response.status,
        json: () => dataPromise.then((data) => (typeof data === 'string' ? JSON.parse(data) : data)),
        text: () => dataPromise
    };
}
