namespace WordsGeneratorApi
{
	public interface IWordsGenerator
	{
		string Generate(
			string dictionaryId,
			int minLength,
			int maxLength,
			string beginWith = null);
	}
}