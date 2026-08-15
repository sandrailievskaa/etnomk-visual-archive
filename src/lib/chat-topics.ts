import type { TranslationKey } from "./i18n/dictionary";

export type ChatTopicId =
  | "whatIsEtnomk"
  | "howSimilarity"
  | "howContribute"
  | "patchLevel"
  | "whoSupports"
  | "browseArchive";

type ChatTopic = {
  id: ChatTopicId;
  questionKey: TranslationKey;
  answerKey: TranslationKey;
  followUps: ChatTopicId[];
};

export const CHAT_TOPIC_ORDER: ChatTopicId[] = [
  "whatIsEtnomk",
  "howSimilarity",
  "browseArchive",
  "howContribute",
  "patchLevel",
  "whoSupports",
];

export const CHAT_TOPICS: Record<ChatTopicId, ChatTopic> = {
  whatIsEtnomk: {
    id: "whatIsEtnomk",
    questionKey: "chat.topic.whatIsEtnomk.question",
    answerKey: "chat.topic.whatIsEtnomk.answer",
    followUps: ["howSimilarity", "browseArchive", "whoSupports"],
  },
  howSimilarity: {
    id: "howSimilarity",
    questionKey: "chat.topic.howSimilarity.question",
    answerKey: "chat.topic.howSimilarity.answer",
    followUps: ["patchLevel", "howContribute", "whatIsEtnomk"],
  },
  howContribute: {
    id: "howContribute",
    questionKey: "chat.topic.howContribute.question",
    answerKey: "chat.topic.howContribute.answer",
    followUps: ["browseArchive", "howSimilarity"],
  },
  patchLevel: {
    id: "patchLevel",
    questionKey: "chat.topic.patchLevel.question",
    answerKey: "chat.topic.patchLevel.answer",
    followUps: ["howSimilarity", "whatIsEtnomk"],
  },
  whoSupports: {
    id: "whoSupports",
    questionKey: "chat.topic.whoSupports.question",
    answerKey: "chat.topic.whoSupports.answer",
    followUps: ["whatIsEtnomk", "howContribute"],
  },
  browseArchive: {
    id: "browseArchive",
    questionKey: "chat.topic.browseArchive.question",
    answerKey: "chat.topic.browseArchive.answer",
    followUps: ["howSimilarity", "howContribute"],
  },
};
