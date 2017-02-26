namespace AngularOne.Host.Server.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Web.Http;
    using AngularOne.Host.Server.Models;
    using Easy.Common.Extensions;

    [RoutePrefix("api/system")]
    public sealed class FileSystemController : ApiController
    {
        [HttpGet]
        [Route("files")]
        public IEnumerable<FileSystemResult> GetFiles(
            string directory, string searchPattern, uint skip, uint take)
        {
            try
            {
                Trace.TraceInformation($"Getting files from: {directory} with pattern: {searchPattern} skipping: {skip.ToString()} taking: {take.ToString()}");
                return new DirectoryInfo(directory)
                .EnumerateFilesSafe(searchPattern, SearchOption.AllDirectories)
                .Select(f => new FileSystemResult(f))
                .Skip((int)skip)
                .Take((int)take);
            } catch (Exception e)
            {
                Trace.TraceError("Error when getting files: " + e.Message);
                throw;
            }
        }

        [HttpGet]
        [Route("fileSearch")]
        public IEnumerable<FileSystemResult> SearchFiles(string query)
        {
            try
            {
                Trace.TraceInformation($"Searching files with query: {query}");
                return new DirectoryInfo("D:\\")
                .EnumerateFilesSafe("*.*", SearchOption.AllDirectories)
                .Take(1000)
                .Where(f => f.FullName.Contains(query))
                .Select(f => new FileSystemResult(f));
            } catch (Exception e)
            {
                Trace.TraceError("Error when searching for files: " + e.Message);
                throw;
            }
        }
    }
}