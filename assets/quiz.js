// Shared quiz widget for teaching lessons.
//
// Usage: a <div class="quiz"> containing
//   - one element with class "q"     -> the question text
//   - one or more <button data-answer="correct|wrong">  -> answers
//   - one element with class "feedback" -> optional feedback slot
//
// On click, all buttons lock; the correct one is highlighted green and a
// clicked wrong answer red. Feedback reads from data-feedback on the .quiz
// (shown only after an answer is chosen).
//
// Answers should be similar length so formatting doesn't give the answer away.

(function attachQuizzes() {
  document.querySelectorAll('.quiz').forEach((quiz) => {
    const feedback = quiz.querySelector('.feedback')
    const buttons = quiz.querySelectorAll('button[data-answer]')

    quiz.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-answer]')
      if (!button || button.disabled) return

      buttons.forEach((b) => {
        b.disabled = true
        if (b === button && button.dataset.answer !== 'correct') {
          b.classList.add('wrong')
        }
        if (b.dataset.answer === 'correct') {
          b.classList.add('correct')
        }
      })

      const message = quiz.dataset.feedback
      if (feedback && message) {
        feedback.textContent = message
        feedback.classList.add(button.dataset.answer === 'correct' ? 'ok' : 'no')
      }
    })
  })
})()
