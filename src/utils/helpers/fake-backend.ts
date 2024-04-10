export { fakeBackend };

function fakeBackend() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let realFetch = window.fetch;
    window.fetch = function (url: any, opts: any) {
        return new Promise((resolve: any, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/risk-percentages') && opts.method === 'GET':
                        return getRiskPercentages();
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return registerUser();

                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                }
            }

            // route functions

            function authenticate(): any {
                const { username, password } = body();
                const user: any = users.find(
                    (x: { username: string; password: string }) => x.username === username && x.password === password
                );

                if (!user) return error('Username or password is incorrect');

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body: any) {
                // Crea un nuevo objeto Blob con el cuerpo JSON y luego crea una respuesta con él
                const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
                const init = { status: 200, statusText: 'OK' };
                const myResponse = new Response(blob, init);
                resolve(myResponse);
            }
            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message: string) {
                alert(message);
                resolve({
                    ok: false,
                    status: 400,
                    json: () => Promise.resolve({ message }) // Directamente devuelve el objeto
                });
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            // Función para manejar el registro de usuarios
            function registerUser() {
                const newUser = body();

                const userExists = users.find((x: { username: string }) => x.username === newUser.username);
                if (userExists) {
                    console.log('Username "' + newUser.username + '" is already taken');
                    return error('Username "' + newUser.username + '" is already taken');
                }

                newUser.id = users.length + 1;
                users.push(newUser);

                // Actualiza localStorage con la nueva lista de usuarios
                localStorage.setItem('users', JSON.stringify(users));

                return ok(newUser);
            }

            function getRiskPercentages() {
                console.log('entre');
                const riskDataByLabel = {
                    // Ejemplo de estructura para la etiqueta "Mortalidad"
                    mortalidad: {
                        progressPercentage: 10, // Supongamos que este es el porcentaje de progreso
                        yourRisk: '3.6%', // Tu Riesgo
                        averageRisk: '5.6%', // Riesgo Promedio
                        chanceOfOutcome: 'Below Average' // Probabilidad de Resultado
                    },
                    complicaciones_mayores: {
                        progressPercentage: 50,
                        yourRisk: '8.6%',
                        averageRisk: '6.6%',
                        chanceOfOutcome: 'Above Average'
                    },
                    reintervencion_quirurgica: {
                        progressPercentage: 80,
                        yourRisk: '12.6%',
                        averageRisk: '10.6%',
                        chanceOfOutcome: 'Above Average'
                    },
                    infeccion_sitio_operatorio: {
                        progressPercentage: 100,
                        yourRisk: '15.6%',
                        averageRisk: '20.6%',
                        chanceOfOutcome: 'Below Average'
                    },
                    infeccion_via_urinaria: {
                        progressPercentage: 20,
                        yourRisk: '5.6%',
                        averageRisk: '3.6%',
                        chanceOfOutcome: 'Above Average'
                    },
                    neumotonia: {
                        progressPercentage: 20,
                        yourRisk: '5.6%',
                        averageRisk: '3.6%',
                        chanceOfOutcome: 'Above Average'
                    },
                    lesion_renal_aguda: {
                        progressPercentage: 100,
                        yourRisk: '15.6%',
                        averageRisk: '20.6%',
                        chanceOfOutcome: 'Below Average'
                    }
                };

                return ok(riskDataByLabel);
            }
        });
    };
}
