# Online Questionary Platform
An online quiz platform for university admission tests. 

This is one of my greatest web development projects so far, and it consists of connecting some endpoints designed for saving data related to questionnaires that the admin
can create when needed. 

It still has some breakpoints that do not let the application be deployed and it needs to adjust some backend design, specfically just one endpoint called getQuestion
that is the one in charge of rendering data to the user directly. It crashes when multiple questions are added to the same questionary. 

For future jobs, consider that you need to change the google secrets in order to make sendMail controller work, otherwise, it will not let any user register or login.


## How to run it on your local server?

1. First of all, cd into both folders apis and client.
2. Run npm install on both folders.
3. After installing node modules, go to apis folder and run npm run dev (remember to change the google secrets on google.console.com
4. Later on, cd into client directory and run npm start on terminal. A localhost should open on your browser.


