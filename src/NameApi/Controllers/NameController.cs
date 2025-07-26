using Microsoft.AspNetCore.Mvc;

namespace NameApi.Controllers
{
    [ApiController]
    [Route("name")]
    public class NameController : ControllerBase
    {
        private readonly ILogger<NameController> _logger;

        public NameController(ILogger<NameController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get([FromQuery] WordParams wordParams)
        {
            string result = $"wordParams: {wordParams.MinLength}, {wordParams.MaxLength}";
            return result;
        }
    }
}