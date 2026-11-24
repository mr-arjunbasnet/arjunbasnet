/*
 * The phone quiz for the Sagarmatha College session. SERVER-ONLY answers:
 * the browser gets `q` and `options`; `answer` and `why` come back only after
 * the student submits. The projector slides read live per-option counts.
 */
export type Question = { id: string; q: string; options: string[]; answer: number; why: string };

export const QUIZZES: Record<string, { title: string; questions: Question[] }> = {
  final: {
    title: "Lightning quiz",
    questions: [
      {
        id: "q1",
        q: "“Writing becomes editing” means…",
        options: [
          "You should never write anything yourself again",
          "AI gives a first draft; your job is to make it correct and right for the situation",
          "AI edits your writing, so you don't need to check it",
        ],
        answer: 1,
        why: "AI gives a good first draft. Making it correct is still your job, and your name is on it.",
      },
      {
        id: "q2",
        q: "In TEACH, “a first-year student who has never used pointers” is which letter?",
        options: ["T · Task", "A · Audience", "H · How"],
        answer: 1,
        why: "Audience: who reads it and what they already know. It's the letter that fixes the level of the answer.",
      },
      {
        id: "q3",
        q: "AI tells you to pip install a package you can't find anywhere online. What's most likely?",
        options: [
          "It's very new. Install it anyway",
          "The AI invented it, and installing a lookalike could be an attack",
          "Ask the AI if it's sure, and trust its answer",
        ],
        answer: 1,
        why: "AI sometimes makes up package names, and attackers publish fake packages with those names. Check the official package page. Asking AI if it's sure is not checking.",
      },
      {
        id: "q4",
        q: "You pasted code with your API key into a chatbot. What first?",
        options: [
          "Ask the chatbot to forget it",
          "Revoke the key, make a new one, and delete the chat",
          "Nothing: chats are encrypted",
        ],
        answer: 1,
        why: "Asking AI to forget removes nothing, and encryption doesn't hide it from the company. Revoke it right away.",
      },
      {
        id: "q5",
        q: "Which statement is true?",
        options: [
          "Git and GitHub are the same thing",
          "GitHub works offline; Git needs the internet",
          "Git tracks changes on your laptop; GitHub hosts them online for sharing",
        ],
        answer: 2,
        why: "The camera and the online album.",
      },
      {
        id: "q6",
        q: "You changed three files and want them on GitHub. What's the right order?",
        options: ["commit → add → push", "add → commit → push", "push → add → commit"],
        answer: 1,
        why: "Pack the box (add), seal and label it (commit), ship it (push).",
      },
    ],
  },
};

export function publicQuiz(id: string) {
  const qz = QUIZZES[id];
  if (!qz) return null;
  return { id, title: qz.title, questions: qz.questions.map(({ id, q, options }) => ({ id, q, options })) };
}
