import axios from "axios";

/**
 * Fetch problem data from LeetCode by number or URL
 * @param {string} input - Problem number or full LeetCode URL
 * @returns {Promise<Object>} Problem info
 */
export async function fetchProblemData(input) {
  let slug;

  if (isNumber(input)) {
    // Get slug dynamically by number
    slug = await slugFromNumberDynamic(input);
  } else {
    slug = extractSlug(input);
  }

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

  if (!data?.data?.question) {
    throw new Error("❌ Could not fetch problem. Check the input.");
  }

  const q = data.data.question;

  return {
    id: q.questionId,
    title: q.title,
    difficulty: q.difficulty,
    tags: q.topicTags.map(t => t.name),
    description: htmlToText(q.content)
  };
}

/* ------------------ HELPERS ------------------ */

function extractSlug(url) {
  const m = url.match(/problems\/([^/]+)/);
  if (!m) throw new Error("Invalid LeetCode URL");
  return m[1];
}

function isNumber(val) {
  return /^\d+$/.test(val);
}

/**
 * Dynamically get slug from problem number
 * @param {string} num - problem number
 */
async function slugFromNumberDynamic(num) {
  // LeetCode question list API
  const { data } = await axios.get("https://leetcode.com/api/problems/all/");
  const questions = data.stat_status_pairs;

  const problem = questions.find(q => q.stat.question_id.toString() === num);
  if (!problem) throw new Error("❌ Problem number not found on LeetCode");

  return problem.stat.question__title_slug;
}

function htmlToText(html) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
