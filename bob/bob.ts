type Pred = (input: string) => boolean;

const isQuestion: Pred = (input) => input[input.length - 1] === "?";

const hasAlpha: Pred = (input) => !!input.replace(/[^a-zA-Z]/gi, "").length;

const isYell: Pred = (input) =>
  hasAlpha(input) && input === input.toUpperCase();

export const hey = (message: string): string => {
  const trimmed = message.trim();

  if (!trimmed.length) {
    return "Fine. Be that way!";
  }

  const isQ = isQuestion(trimmed);
  const isY = isYell(trimmed);

  if (isQ && isY) {
    return "Calm down, I know what I'm doing!";
  }

  if (isQ) {
    return "Sure.";
  }

  if (isY) {
    return "Whoa, chill out!";
  }

  return "Whatever.";
};
