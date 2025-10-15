# Minesweeper Game

This is a simple single-page web application implementing the classic Minesweeper game.

## Features

*   **8x8 Grid:** A standard sized game board.
*   **10 Mines:** Ten randomly placed mines on the board.
*   **Neighbor Count Logic:** Clicking a non-mine square reveals the number of adjacent mines (0-8).
*   **CSS Styling:** Basic styling to differentiate hidden, revealed, and mine cells.

## How to Play

1.  Open `index.html` in your web browser.
2.  Click on any square to reveal it.
3.  If you click on a mine, the game ends (an alert will pop up, and the mine will be revealed).
4.  If you click on a non-mine square, it will reveal a number indicating how many mines are adjacent to it.

## File Structure

*   `index.html`: The main HTML file that structures the game.
*   `style.css`: Provides the visual styling for the game board and cells.
*   `script.js`: Contains the core game logic, including board generation, mine placement, neighbor counting, and click handling.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)
