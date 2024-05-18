import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from "natural";
import { removeStopwords } from "stopword";

export function getSentiment(text: string) {
  /**
   * Importing libraries:
   *  - SentimentAnalyzer: This function helps determine the sentiment (positive, negative, neutral) of a text.
   *  - PorterStemmer: This function helps reduce words to their root form (e.g., "running" -> "run").
   *  - WordTokenizer: This function splits the text into individual words.
   *  - removeStopwords: This function removes commonly used words (e.g., "the", "a") that don't contribute to sentiment analysis.
   */

  /**
   * Preprocessing the text:
   *  - alphaOnlyReview: This variable stores the text after removing non-alphabetical characters and special characters except for whitespace.
   *      This ensures the sentiment analysis focuses on the core words.
   *      The `[^a-zA-Z\s]+` regex pattern matches any character that's not a letter (a-z, A-Z) or whitespace (\s) and replaces them with an empty string using `g` flag for global replacement.
   */
  const alphaOnlyReview = text.replace(/[^a-zA-Z\s]+/g, "");

  /**
   * Tokenization:
   *  - tokenizer: This creates a new instance of WordTokenizer to split the text into individual words.
   *  - tokenizedText: This variable stores the list of words created by splitting the preprocessed text (alphaOnlyReview).
   */
  const tokenizer = new WordTokenizer();
  const tokenizedText = tokenizer.tokenize(alphaOnlyReview);

  /**
   * Removing stop words:
   *  - filteredText: This variable stores the list of words after removing stopwords from the tokenized text.
   *      Stopwords are common words that don't affect the sentiment much (e.g., "the", "a").
   *      The removeStopwords function (assumed to be imported from a separate library) performs this filtering.
   */
  const filteredText = removeStopwords(tokenizedText);

  /**
   * Sentiment analysis:
   *  - analyzer: This creates a new SentimentAnalyzer object for English text, using PorterStemmer for stemming and 'afinn' for the sentiment lexicon.
   *      - PorterStemmer helps reduce words to their base form (e.g., "running" -> "run").
   *      - 'afinn' is likely a built-in sentiment lexicon (a list of words with predefined sentiment scores).
   *  - return analyzer.getSentiment(filteredText): This line calls the getSentiment method on the analyzer object.
   *      It passes the filtered text (without stop words) for sentiment analysis.
   *      The function likely returns a sentiment score (positive, negative, or neutral) based on the lexicon and stemming.
   */
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  return analyzer.getSentiment(filteredText);
}
