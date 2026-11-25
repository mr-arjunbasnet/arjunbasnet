/*
 * The phone quiz for the Sagarmatha College session. SERVER-ONLY answers:
 * the browser gets `q` and `options` only once the student starts (and the
 * server's clock starts); `answer` and `why` come back only after submit.
 * The phone shuffles question and option order, so a neighbour's "it's B"
 * doesn't help. Ten questions, in the order the session teaches them.
 */
export type Question = { id: string; q: string; options: string[]; answer: number; why: string };

/** Per question, on the phone. The server allows the total plus a little grace. */
export const QUIZ_SECONDS_PER_QUESTION = 30;

export const QUIZZES: Record<string, { title: string; questions: Question[] }> = {
  final: {
    title: "Lightning quiz",
    questions: [
      {
        id: "git-vs-github",
        q: "Which statement is true?",
        options: [
          "Git and GitHub are the same thing",
          "GitHub works offline; Git needs the internet",
          "Git tracks changes on your laptop; GitHub keeps them online so you can share them",
        ],
        answer: 2,
        why: "The camera and the online photo album.",
      },
      {
        id: "order",
        q: "You changed three files and want them on GitHub. What's the right order?",
        options: ["add → commit → push", "commit → add → push", "push → add → commit"],
        answer: 0,
        why: "Pack the box (add), seal and label it (commit), ship it (push).",
      },
      {
        id: "ssh",
        q: "You're connecting your laptop to GitHub with an SSH key. What do you paste into GitHub?",
        options: [
          "id_ed25519, the private key",
          "id_ed25519.pub, the public key",
          "Your GitHub password",
        ],
        answer: 1,
        why: "Only the file ending in .pub is shared. The private key never leaves your laptop.",
      },
      {
        id: "next-word",
        q: "When an AI chatbot writes an answer, what is it really doing?",
        options: [
          "Looking the answer up in a database of facts",
          "Copying the top Google result",
          "Guessing the next word, again and again, from patterns it learned",
        ],
        answer: 2,
        why: "Its one job is to guess the next word. That's why it can sound sure and still be wrong.",
      },
      {
        id: "person",
        q: "Why tell AI who to be and who you are at the start of a chat?",
        options: [
          "It starts at zero about you. Once told, it holds that and plays the part for the chat",
          "It makes the AI answer faster",
          "You must, or the AI won't answer at all",
        ],
        answer: 0,
        why: "Treat it like a person who knows nothing about you. Tell it once, and it uses that for the rest of the chat.",
      },
      {
        id: "teach",
        q: "In TEACH, “a first-year student who has never used pointers” is which letter?",
        options: ["T · Task", "A · Audience", "H · How"],
        answer: 1,
        why: "Audience: who reads it and what they already know. It's the letter that fixes the level of the answer.",
      },
      {
        id: "aaa",
        q: "AAA, “Ask AI to Ask”, means…",
        options: [
          "Ask the same question to three different AIs",
          "Ask the AI to act like an expert",
          "Let the AI ask you questions first, then answer",
        ],
        answer: 2,
        why: "In a hurry? Tell AI what you want and ask it to ask you what it needs to know first.",
      },
      {
        id: "editing",
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
        id: "package",
        q: "AI tells you to pip install a package you can't find anywhere online. What's most likely?",
        options: [
          "The AI invented it, and installing a lookalike could be an attack",
          "It's very new. Install it anyway",
          "Ask the AI if it's sure, and trust its answer",
        ],
        answer: 0,
        why: "AI sometimes makes up package names, and attackers publish fake packages with those names. Check the official package page. Asking AI if it's sure is not checking.",
      },
      {
        id: "api-key",
        q: "You pasted code with your API key into a chatbot. What first?",
        options: [
          "Ask the chatbot to forget it",
          "Revoke the key, make a new one, and delete the chat",
          "Nothing: chats are encrypted",
        ],
        answer: 1,
        why: "Asking AI to forget removes nothing, and encryption doesn't hide it from the company. Revoke it right away.",
      },
    ],
  },
};

export function publicQuiz(id: string) {
  const qz = Object.hasOwn(QUIZZES, id) ? QUIZZES[id] : undefined;
  if (!qz) return null;
  return {
    id, title: qz.title, secondsPerQuestion: QUIZ_SECONDS_PER_QUESTION,
    questions: qz.questions.map(({ id, q, options }) => ({ id, q, options })),
  };
}
