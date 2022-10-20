# Phonebook

Phonebook is app to store and manage phone numbers.
App have been deployed to _fly.io_.

Live here: http://kchn9-phonebook.fly.dev

![Phonebook demo](https://media.giphy.com/media/Vwx0QkWLgUKFJEcjUf/giphy.gif)

## Tech Stack

**front-end:** React, ChakraUI
**back-end:** Node, Express, MongoDB (mongoose)

## Installation

Install phonebook-app with npm

```bash
  git clone https://github.com/kchn9/phonebook-app.git
  cd phonebook-app
  npm i
```

Create .env file:

_(example)_

```j
  PORT=3001
  MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.oxt5nnb.mongodb.net/?retryWrites=true&w=majority
```

Then simply run dev:

```bash
  npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
