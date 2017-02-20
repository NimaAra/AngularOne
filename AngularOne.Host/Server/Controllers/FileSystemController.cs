namespace AngularOne.Host.Server.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Http;
    using AngularOne.Host.Server.Models;
    using Easy.Common.Extensions;

    [RoutePrefix("api/system")]
    public sealed class FileSystemController : ApiController
    {
        private readonly string _value;

        public FileSystemController(IValueProvider valueProvider)
        {
            _value = valueProvider.Value;
        }

        [HttpGet]
        [Route("files")]
        public IEnumerable<FileSystemResult> GetFiles(
            string directory, string searchPattern, uint skip, uint take)
        {
            return new DirectoryInfo(directory)
                .EnumerateFilesSafe(searchPattern, SearchOption.AllDirectories)
                .Select(f => new FileSystemResult(f))
                .Skip((int)skip)
                .Take((int)take);
        }

        [HttpGet]
        [Route("fileSearch")]
        public IEnumerable<FileSystemResult> SearchFiles(string query)
        {
            return new DirectoryInfo("C:\\")
                .EnumerateFilesSafe("*.*", SearchOption.AllDirectories)
                .Take(1000)
                .Where(f => f.FullName.Contains(query))
                .Select(f => new FileSystemResult(f));
        }
    }
}