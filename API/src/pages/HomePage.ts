import * as React from "react";


// const HomePage: React.ReactNode = (
//     '<div>
//         <h1 className="text-3xl font-bold underline">HOME PAGE</h1>
//         <div><p>Hello World</p><a href='/api-docs'>API DOCS</a></div>
//     </div>'
// )

const HomePage = React.createElement('div', { className: 'text-3xl font-bold underline' }, 
    React.createElement('h1', null, 'HOME PAGE'),
    React.createElement('div', null, React.createElement('a', { href: "/api-docs" }, "Car Chaging API DOCS")),
    React.createElement('br'),
    React.createElement('div', null, React.createElement('a', { href: "/api/auth/reference" }, "Better Auth DOCS")),
);


export default HomePage;