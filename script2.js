// Function to change the sport and load quiz questions
function changeSport() {
    var selectedSport = document.getElementById("sports-select").value;
    var quizQuestionsContainer = document.getElementById("quiz-questions-container");

    // Remove existing quiz questions
    quizQuestionsContainer.innerHTML = "";

    // Load quiz questions based on the selected sport
    switch (selectedSport) {
        case "football":
            // Add football quiz questions
            quizQuestionsContainer.innerHTML = `
            <div id="quiz-questions-container"></div>
            <h3>Football Question 1:</h3>
            <p>Which country won the FIFA World Cup in 2018?</p>
            <ul class="quiz-options">
                <li><input type="radio" name="football-q1" value="a"> a) France</li>
                <li><input type="radio" name="football-q1" value="b"> b) Brazil</li>
                <li><input type="radio" name="football-q1" value="c"> c) Germany</li>
            </ul>
            <p class="correct-answer">Correct Answer: a) France</p>
        </div>

        <div class="quiz-question">
            <h3>Football Question 2:</h3>
            <p>Which player has won the most Ballon d'Or awards?</p>
            <ul class="quiz-options">
                <li><input type="radio" name="football-q2" value="a"> a) Lionel Messi</li>
                <li><input type="radio" name="football-q2" value="b"> b) Cristiano Ronaldo</li>
                <li><input type="radio" name="football-q2" value="c"> c) Pelé</li>
            </ul>
            <p class="correct-answer">Correct Answer: a) Lionel Messi</p>
        </div>

        <div class="quiz-question">
            <h3>Football Question 3:</h3>
            <p>Which club has won the most UEFA Champions League titles?</p>
            <ul class="quiz-options">
                <li><input type="radio" name="football-q3" value="a"> a) Real Madrid</li>
                <li><input type="radio" name="football-q3" value="b"> b) FC Barcelona</li>
                <li><input type="radio" name="football-q3" value="c"> c) AC Milan</li>
            </ul>
            <p class="correct-answer">Correct Answer: a) Real Madrid</p>
        </div>

        <div class="quiz-question">
            <h3>Football Question 4:</h3>
            <p>Who is the all-time top scorer in the FIFA World Cup?</p>
            <ul class="quiz-options">
                <li><input type="radio" name="football-q4" value="a"> a) Miroslav Klose</li>
                <li><input type="radio" name="football-q4" value="b"> b) Ronaldo Nazário</li>
                <li><input type="radio" name="football-q4" value="c"> c) Pelé</li>
            </ul>
            <p class="correct-answer">Correct Answer: a) Miroslav Klose</p>
        </div>


                <!-- Add more football questions as needed -->

                <button onclick="submitAnswers()">Submit Answers</button>
            `;
            break;
        // Add cases for more sports as needed
        default:
            // Handle default case
            break;
    }
}

// Function to submit answers and show feedback
function submitAnswers() {
    var correctAnswers = 0;

    // Check answers for each question
    var questions = document.querySelectorAll(".quiz-question");
    questions.forEach(function (question) {
        var selectedOption = question.querySelector("input:checked");
        if (selectedOption) {
            var correctAnswer = question.querySelector(".correct-answer");
            var resultMessage = "";

            // Check if the answer is correct
            if (selectedOption.value === "a" && correctAnswer.textContent.includes("a)")) {
                correctAnswers++;
                resultMessage = "Correct! Well done!";
            } else if (selectedOption.value === "b" && correctAnswer.textContent.includes("b)")) {
                correctAnswers++;
                resultMessage = "Correct! Great job!";
            } else if (selectedOption.value === "c" && correctAnswer.textContent.includes("c)")) {
                correctAnswers++;
                resultMessage = "Correct! Excellent!";
            } else {
                resultMessage = "Incorrect. Try again!";
            }

            // Display the result message
            var feedbackMessage = document.createElement("p");
            feedbackMessage.textContent = resultMessage;
            feedbackMessage.classList.add(resultMessage.includes("Correct") ? "correct-answer" : "incorrect-answer");
            question.appendChild(feedbackMessage);

            // Display the correct answer after submission if the user's answer is incorrect
            if (!resultMessage.includes("Correct")) {
                correctAnswer.style.display = "block";
            }
        }
    });

    // Disable the submit button after submission
    var submitButton = document.querySelector("button");
    submitButton.disabled = false;

    // Show total correct answers
    alert("You answered " + correctAnswers + " questions correctly out of " + questions.length);
}