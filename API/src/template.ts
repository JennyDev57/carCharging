const template = ({body, title}:{body:string, title:string}) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="./output.css" rel="stylesheet">
            <title>${title}</title>
        </head>
        
        <body>
          <div id="root">${body}</div>
        </body>
      </html>
    `;
  };

  export default template