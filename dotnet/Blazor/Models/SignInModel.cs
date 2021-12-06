using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace Blazor.Models;

public class SignInModel
{
    public string? Email { get; set; }

    public string? FullName { get; set; }
}
