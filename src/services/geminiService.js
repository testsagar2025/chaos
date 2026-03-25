import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not configured. AI features will be disabled.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const geminiService = {
  async generateText(prompt) {
    if (!genAI) {
      throw new Error('Gemini API not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  },

  async generateStudyPlan(subject, topics, duration) {
    const prompt = `Create a detailed study plan for ${subject} covering these topics: ${topics}.
    Duration: ${duration} days.
    Include daily breakdown with specific topics to cover, recommended resources, and practice problems to solve.
    Format the response in a clear, structured way.`;

    return this.generateText(prompt);
  },

  async generateQuiz(chapter, difficulty = 'medium') {
    const prompt = `Generate a ${difficulty} level quiz for the chapter "${chapter}".
    Create 5 multiple choice questions with options A, B, C, D and provide the correct answers with brief explanations.
    Format as JSON with questions array.`;

    const response = await this.generateText(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return { questions: [], error: 'Failed to parse quiz response' };
    }
  },

  async analyzeErrors(errors) {
    const errorList = errors.map(e => `${e.topic}: ${e.description}`).join('\n');
    const prompt = `Analyze these study errors and provide personalized recommendations:
    ${errorList}

    Provide insights on:
    1. Common patterns in the errors
    2. Root causes
    3. Specific strategies to avoid these errors
    4. Topics to review`;

    return this.generateText(prompt);
  },

  async generateNotes(topic) {
    const prompt = `Generate comprehensive study notes for the topic: "${topic}".
    Include:
    1. Key concepts and definitions
    2. Important formulas (if applicable)
    3. Real-world examples
    4. Common misconceptions
    5. Practice tips

    Keep the notes concise but thorough.`;

    return this.generateText(prompt);
  },
};
