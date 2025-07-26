using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace WordsGeneratorApi.Controllers
{
    public class WordParams : IValidatableObject
    {
        [FromQuery(Name = "min")]
        [Required]
        [Range(4, 10)]

        public int MinLength { get; set; }

        [FromQuery(Name = "max")]
        [Required]
        [Range(4, 10)]
        public int MaxLength { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (MaxLength < MinLength) {
                yield return new ValidationResult($"{nameof(MaxLength)} can`t be less than {nameof(MinLength)}.");
            }
        }
    }
}