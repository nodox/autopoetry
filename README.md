# Autopoetry: Automatically install missing dependencies with Python Poetry

The most convenient way to install missing dependencies and automatically append the necessary import statements to the top of your Python files for projects using [Poetry](https://python-poetry.org/) as the dependency manager

<img src="https://raw.githubusercontent.com/nodox/autopoetry/main/images/demo.gif">

## Caveats

- **Alpha Stage:** Please note that this extension is currently in the alpha stage, and there may be breaking changes at any time.
- **Limited Testing:** While the extension has been designed to solve specific problems encountered during the development of single-file Python programs in new codebases, its behavior in large codebases, nested directories, or monorepos is uncertain.


## Getting Started
- Install extension.

- Open a Python file in Visual Studio Code.

- Ensure that your project has a valid Poetry configuration (`pyproject.toml`).

- On save, if any missing dependencies are detected in your Python file, you will be prompted to install them. Confirm to proceed.

- The necessary `import` statements will be automatically appended to the top of your file, helping you manage your dependencies more effectively.

## Features

- Automatically installs missing dependencies for your Python programs using Poetry.
- Appends the required import statements to the top of your Python files, making it easier to manage dependencies.
- Streamlines the development process for single-file Python programs, especially in new codebases.

## Requirements

- Poetry
- Pylint

## Feedback and Support

We appreciate your interest in this extension! As it is currently in alpha stage, your feedback and suggestions are valuable in helping us improve its functionality and reliability.

- **Twitter:** You can reach out to the extension's author, Steven Natera, on Twitter [@stevennatera](https://twitter.com/stevennatera).
- **LinkedIn:** Connect with Steven Natera on LinkedIn at [linkedin.com/in/snatera](https://www.linkedin.com/in/snatera).

Feel free to report any bugs, issues, or feature requests using my social media handles.