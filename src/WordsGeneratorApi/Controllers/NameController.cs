using Microsoft.AspNetCore.Mvc;

namespace WordsGeneratorApi.Controllers
{
    [ApiController]
    [Route("name")]
    public class NameController : ControllerBase
    {
        private readonly ILogger<NameController> _logger;
        private readonly IWordsGenerator _wordsGenerator;

        public NameController(
            ILogger<NameController> logger,
            IWordsGenerator wordsGenerator)
        {
            _logger = logger;
            _wordsGenerator = wordsGenerator;
        }

        [HttpGet]
        public string Get([FromQuery] WordParams wordParams)
        {
            return _wordsGenerator.Generate(null, wordParams.MinLength, wordParams.MaxLength, wordParams.BeginWith);
        }
    }
}