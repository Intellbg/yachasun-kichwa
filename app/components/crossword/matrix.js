export const generateCrosswordMatrix = (words) => {
    const size = 15;
    const matrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill({ letter: null, number: null }));
  
    const clues = { across: [], down: [] };
    let clueNumber = 1;
  
    const placeWordAt = (wordObj, row, col, direction, number) => {
      const { word } = wordObj;
      for (let i = 0; i < word.length; i++) {
        const r = row + (direction === "down" ? i : 0);
        const c = col + (direction === "across" ? i : 0);
        matrix[r][c] = {
          letter: word[i],
          number: i === 0 ? number : matrix[r][c].number,
        };
      }
    };
  
    const canPlaceWord = (matrix, word, row, col, direction) => {
      const size = matrix.length;
      for (let i = 0; i < word.length; i++) {
        const r = row + (direction === "down" ? i : 0);
        const c = col + (direction === "across" ? i : 0);
        if (r < 0 || r >= size || c < 0 || c >= size) return false;
        if (matrix[r][c].letter && matrix[r][c].letter !== word[i]) return false;
      }
      return true;
    };
  
    const middle = Math.floor(size / 2);
    placeWordAt(words[0], middle, middle - Math.floor(words[0].word.length / 2), "across", clueNumber++);
    clues.across.push({ number: clueNumber - 1, question: words[0].question });
  
    for (let i = 1; i < words.length; i++) {
      const { word, question } = words[i];
      let placed = false;
      for (let r = 0; r < size && !placed; r++) {
        for (let c = 0; c < size && !placed; c++) {
          if (matrix[r][c].letter && word.includes(matrix[r][c].letter)) {
            const intersectionIndex = word.indexOf(matrix[r][c].letter);
            if (canPlaceWord(matrix, word, r - intersectionIndex, c, "down")) {
              placeWordAt(words[i], r - intersectionIndex, c, "down", clueNumber++);
              clues.down.push({ number: clueNumber - 1, question });
              placed = true;
            } else if (canPlaceWord(matrix, word, r, c - intersectionIndex, "across")) {
              placeWordAt(words[i], r, c - intersectionIndex, "across", clueNumber++);
              clues.across.push({ number: clueNumber - 1, question });
              placed = true;
            }
          }
        }
      }
    }
  
    return { matrix, clues };
  };
  