using System.ComponentModel;
using WordsGenerator;

namespace WordsGeneratorApi
{
    public class WordsGeneratorWrapper : IWordsGenerator, ISupportInitialize
    {
        private readonly Generator _generator;

        public WordsGeneratorWrapper()
        {
            _generator = new Generator("абвгдеёжзийклмнопрстуфхцчшщьыъэюя-");
            var text = File.ReadAllText(@"Resources\russia-cities.txt");
            _generator.Load(text);
        }

        public void BeginInit()
        {
        }

        public void EndInit()
        {
        }

        public string Generate(
            string dictionaryId,
            int minLength,
            int maxLength,
            string beginWith = null)
        {
            return TryToGenerateWord(minLength, maxLength, beginWith);  
        }

        private String TryToGenerateWord(int minLength, int maxLength, string beginWith = null)
        {
            for (int i = 0; i < 100; i++)
            {
                String _word = _generator.GenerateWordRandomly(maxLength, beginWith);
                if ((_word.Length >= minLength) && (_word.Length <= maxLength))
                    return _word;
            }
            return "Не удалось сгенерировать слово.";
        }
    }
}