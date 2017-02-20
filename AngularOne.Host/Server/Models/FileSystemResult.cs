namespace AngularOne.Host.Server.Models
{
    using System.IO;

    public sealed class FileSystemResult
    {
        public FileSystemResult(FileInfo fileInfo)
        {
            Size = (uint) fileInfo.Length;
            FullName = fileInfo.FullName;
            FileName = fileInfo.Name;
            Extension = fileInfo.Extension;
            Directory = fileInfo.DirectoryName;
        }

        public uint Size { get; set; }
        public string FullName { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public string Directory { get; set; }
    }
}