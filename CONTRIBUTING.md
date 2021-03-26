# Contributing

You want to contribute to the project? Amazing!

## Things to know

**Working on your first Pull Request?** [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## How to

* Found a bug?
  [Let me know!](https://github.com/Worthy-Alpaca/SpeasierJS/issues)

* Patched a bug?
  [Make a PR!](https://github.com/Worthy-Alpaca/SpeasierJS/compare/)

* Adding a new feature?
  Please, *please*, ***please*** get some feedback from me. I don't want you to waste your time writing code on something that was struck down already.


### How to set everything up

* First you need to install Node.js

    - For linux systems: 
    ```
    sudo apt-get install nodejs
    ```
    * Download for Windows systems [here](https://nodejs.org/en/download/)

- Then you need to install the Node Package Manager (only on linux)
```
sudo apt-get install npm
```

- Now clone the repository
```
git clone https://github.com/Worthy-Alpaca/SpeasierJS.git
```

- Now install the dependencies from package.json
```
npm install
```

- Lastly you need to put some things into the included `.env.copy` file and rename it to `.env`
    - Your discord Token
    - Your AWS credentials

*Note: You may receive an error message about npm not finding a python installation.*
*If that happens you need to do two things*

1. Make sure you have a python installation and if not [install](https://www.python.org/) it.

2. Point npm to your python installation
```
npm config --python="PATH TO PYTHON"
```