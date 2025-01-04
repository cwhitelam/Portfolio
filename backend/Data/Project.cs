using System;

namespace backend.Data
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public string ProjectUrl { get; set; } = "";
    }
}
