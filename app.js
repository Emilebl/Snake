document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // first div in our grid
    let appleIndex = 0 // first div in our grid
    let currentSnake = [2,1,0] // div in our grid being 2 (head), 
    // and 0 being the end (tail) and all 1s being the body

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function that deals with All the move outcomes of the Snake
    function moveOutcomes() {

        // deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snakes hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snakes hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snakes hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snakes hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snakes hits itself
        ) {
            return clearInterval(interval)
        }

        const tail = currentSnake.pop() // removes last item of the array and shows it
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array




        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }


    // generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) //making sure apple doesnt show in snake
        squares[appleIndex].classList.add('apple')
    }

    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if (e.keyCode === 39) {
            direction = 1 // snake goes right
        } else if (e.keyCode === 38) {
            direction = -width // snake goes up, going 10 divs back
        } else if (e.keyCode === 37) {
            direction = -1 // snake goes left
        } else if (e.keyCode === 40) {
            direction = +width // snake goes down, going 10 divs forward
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})