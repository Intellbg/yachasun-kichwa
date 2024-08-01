export default function handler(req, res) {
    const crosswordData = {
      words: [
        { word: "react", clue: "A popular JavaScript library for building user interfaces" },
        { word: "nextjs", clue: "A React framework for production" },
      ],
      size: { rows: 10, columns: 10 }
    };
  
    res.status(200).json(crosswordData);
  }
  