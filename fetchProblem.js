import axios from "axios";

export async function fetchProblemData(input) {
  const slug = isNumber(input)
    ? await slugFromNumber(input)
    : extractSlug(input);

  const query = {
    query: `
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          difficulty
          content
          topicTags { name }
        }
      }
    `,
    variables: { titleSlug: slug }
  };

  const { data } = await axios.post(
    "https://leetcode.com/graphql",
    query,
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://leetcode.com/"
      }
    }
  );

  const q = data.data.question;

  return {
    id: q.questionId,
    title: q.title,
    difficulty: q.difficulty,
    tags: q.topicTags.map(t => t.name),
    description: htmlToText(q.content)
  };
}

function extractSlug(url) {
  const m = url.match(/problems\/([^/]+)/);
  if (!m) throw new Error("Invalid LeetCode URL");
  return m[1];
}

function isNumber(val) {
  return /^\d+$/.test(val);
}

/* Minimal mapping (extend later) */
async function slugFromNumber(num) {
  const map = {
    "121": "best-time-to-buy-and-sell-stock"
  };
  if (!map[num]) throw new Error("Problem number not mapped yet");
  return map[num];
}

function htmlToText(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
