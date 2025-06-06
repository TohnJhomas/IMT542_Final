# IMT542_Final

This project is a Node.js script that allows you to search for a term, select a result from a list, and generate a Markdown file with information about the selected entity from DBpedia.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

1. **Clone or Download the Repository**

   ```bash
   git clone <repository-url>
   cd IMT542_Final
   ```

2. **Install Dependencies**

   This project uses a few Node.js modules. Install them with:

   ```bash
   npm install 
   ```

## Running the Project

From the project directory, run:

```bash
node Main.js
```

## Usage

1. When you run the script, it will prompt you for a search term. Enter your desired term and hit Enter.
2. The script will display a numbered list of possible matches.
3. Enter the number corresponding to your preferred option and press Enter.
4. The script will fetch information about the selected entity and generate a Markdown file named `output.md` in the project directory.

## Customization

- The output file name can be changed in `Main.js`. 

## Troubleshooting

- If you get a "module not found" error, make sure you have installed all required dependencies.
- If you encounter issues with the script not responding to input, ensure you are running it in a standard terminal (not in an IDE's output pane).

## License

This project is for educational purposes.